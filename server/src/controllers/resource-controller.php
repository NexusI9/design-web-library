<?php
class Resource_Controller
{
    private $tags;
    private $resource_cache;

    function __construct()
    {
        
    }

    /**
      Return a specific resource with a given category id (filtered).
     */
    function get_by_tag_id($lang, $filename, $tag)
    {
        // update tags language
        $this->get_tags_lang($lang);

        // retrieve resource data (tool, documents...)
        $data = $this->load_resource_data($lang, $filename);

        // get category
        $tag = urldecode($tag);

        $result = [];

        // go through each resources entry and check if entry tag correspond to category tag
        foreach ($data as &$value) {
            
            // if category is 0 (all), then add by default
            // else if resource has same tag as category, push in respective array entry if it matches the tag
            if ($tag == 0 || $value['tag_id'] == $tag){

                // get tag name from its id
                $tag_name = $this->get_tag_name($value['tag_id']);
            
                // create new entry if doesn't exists, else just push in existing entry
                if(!isset($result[$tag_name])){
                    $result[$tag_name] = [$value];
                }else{
                    array_push($result[$tag_name], $value);
                }
            }
        }


       echo json_encode($result);
    }

    /**
      Update controller tags based on the input language
     */
    private function get_tags_lang($lang){
        $this->tags = json_decode(file_get_contents(__DIR__."/../../locale/$lang/tag/tag.json"), true);
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
            $this->resource_cache[$filename] = json_decode(file_get_contents(__DIR__."/../../locale/$lang/resource/$filename.json"), true);
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
