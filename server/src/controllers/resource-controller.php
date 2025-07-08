<?php
class Resource_Controller
{
    private $tags;
    private $resource_cache;

    function __construct()
    {
        
    }

    /**
      Return a specific resource with a given category (filtered).
     */
    function get_by_tag($lang, $filename, $category)
    {
        // update tags language
        $this->get_tags_lang($lang);

        // retrieve resource data (tool, documents...)
        $data = $this->load_resource_data($lang, $filename);

        // get category
        $category = urldecode($category);

        $resources = [];

        // convert tage name to id
        $cateogry_tag = $this->get_tag_ID($category);

        // go through each resources entry and check if entry tag correspond to category tag
        foreach ($data as &$value) {

            // Get entry tag from id
            $entry_tag = $this->get_tag_name($value['tag']);

            // if category is all, then add by default
            // else if resource has same tag as category, push in respective array entry if it matches the tag
            if ($category == "all" || $value['tag'] == $cateogry_tag){
                
                // create new entry if doesn't exists, else just push in existing entry
                if(!isset($resources[$entry_tag])){
                    $resources[$entry_tag] = [$value];
                }else{
                    array_push($resources[$entry_tag], $value);
                }
            }
        }


       echo json_encode($resources);
    }

    /**
      Update controller tags based on the input language
     */
    private function get_tags_lang($lang){
        $this->tags = json_decode(file_get_contents(__DIR__."/../../locale/$lang/tag.json"), true);
    }

    /**
      Return the resource data based on the language and resource type. (tool, module...)
      Cache the data if not already cached.
     */
    private function load_resource_data($lang, $filename)
    {
        // sanitize filename
        $filename = strtolower($filename);

        // cache resources
        if(!isset($this->resource_cache[$filename])){
            $this->resource_cache[$filename] = json_decode(file_get_contents(__DIR__."/../../locale/$lang/$filename.json"), true);
        }
        
        
        // return cached value
        return $this->resource_cache[$filename];
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
