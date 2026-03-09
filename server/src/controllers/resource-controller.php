<?php

include_once __DIR__ . "/../lib/utils.php";
include_once __DIR__ . "/../lib/resolver.php";
include_once __DIR__ . "/../lib/constants.php";
include_once __DIR__ . "/../lib/translator.php";

class Resource_Controller
{
    private $tags;
    private $resource_cache;
    private $translator;

    function __construct()
    {
        $this->translator = new Translator();
    }

    /**
      Return a specific resource with a given category id (filtered).
     */
    function get_by_tag_id($lang, $resource_id, $tag_id)
    {

        // update tags language
        $this->get_tags_lang($lang);

        // retrieve resource data (tool, documents...)
        $data = $this->load_resource_data($lang, $resource_id);

        // get category
        $tag_id = urldecode($tag_id);

        $result = [];

        // go through each resources entry and check if entry tag correspond to category tag
        foreach ($data as &$value) {
            // if category is 0 (all), then add by default
            // else if resource has same tag as category, push in respective array entry if it matches the tag
            if ($tag_id == 0 || $value['tag_id'] == $tag_id) {

                // get tag name from its id
                $tag_name = $this->get_tag_name($value['tag_id']);

                // create new entry if doesn't exists, else just push in existing entry
                if (!isset($result[$tag_name])) {
                    $result[$tag_name] = [$value];
                } else {
                    array_push($result[$tag_name], $value);
                }
            }
        }


        echo json_encode($result);
    }

    /**
      Update controller tags based on the input language
     */
    private function get_tags_lang($lang)
    {
        $this->tags = json_decode(file_get_contents(PATH_CONTENT . "/tag/tag.json"), true);
    }

    /**
      Return the resource data based on the language and resource type. (tool, module...)
      Cache the data if not already cached.
     */
    private function load_resource_data($lang, $resource_id)
    {
        // Get the filename from the resource id
        // TODO: dirty/ temporary method before final backend implementation
        $filename = resource_filename_from_id($resource_id);

        // cache resources
        // check if lang entry exists
        if (!isset($this->resource_cache[$lang]))
            $this->resource_cache[$lang] = array();

        // check if filename is loaded
        if (!isset($this->resource_cache[$lang][$filename])) {
            $this->resource_cache[$lang][$filename] = json_decode(file_get_contents(PATH_CONTENT . "/resource/$filename.json"), true);

            // filter resources that have the resource id
            $this->resource_cache[$lang][$filename] = array_filter(
                $this->resource_cache[$lang][$filename],
                function ($item) use ($resource_id) {
                    return isset($item['resource_id']) && $item['resource_id'] == $resource_id;
                }
            );

            // translate entries
            $this->translator->translate_resources($this->resource_cache[$lang][$filename], $lang);

            // resolve enries
            resolve_array($this->resource_cache[$lang][$filename]);
        }

        // return cached value
        return $this->resource_cache[$lang][$filename];
    }

    /**
      Return the tag name from its id
     */
    private function get_tag_name($id)
    {

        foreach ($this->tags as &$value) {
            if ($value['id'] == $id)
                return $value['name'];
        }

        return "";
    }

    /**
      Return the tag id from its name
     */
    private function get_tag_ID($name)
    {
        foreach ($this->tags as &$value) {
            if (strtolower($value['name']) == strtolower($name))
                return $value['id'];
        }

        return 0;
    }
}
