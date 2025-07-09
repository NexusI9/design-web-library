<?php

include_once __DIR__."/../lib/utils.php";
include_once __DIR__."/../lib/resolver.php";


class Tag_Controller
{

    // cached tags content
    private $content_cache;

    // cached tags by resources type
    private $resource_cache;

    function __construct()
    {
    }

    /**
      Return a specific resource with a given category (filtered).
     */
    function get_by_name($lang, $name)
    {
        $tag = [];
        
        // retrieve tags file based on the language
        $data = $this->load_content($lang);

        // get the tag by name
        foreach($data as $t){
            if($name == 'all' || (isset($t['name']) && $t["name"] === $name)){
                // push to result array
                array_push($tag, $t);
            }
        }

        
       echo json_encode($tag);
    }

    /**
      Retrieve the unique tags on each resource type (document, tags...)
     */
    function get_by_resource($lang, $resource_id){

        $resource_name = resource_filename_from_id($resource_id);
        
        // load in cache if doesn't exists
        if(!isset($this->resource_cache[$resource_name])){

            // create a new array and put the tag "All" as first entry
            $this->resource_cache[$resource_name] = array(
                $this->tag_from_id(0, $lang)
            );
            
            // load relative resource content
            $resource_content = json_decode(file_get_contents(__DIR__."/../../locale/$lang/resource/$resource_name.json"), true);
            
            // retrieve tag from resource id
            foreach($resource_content as $resource){
          
                if(isset($resource['tag_id'])){
                    $resource_tag = $this->tag_from_id($resource['tag_id'], $lang);

                    // check if tag is already listed in the resource cache
                    $exists = false;
                    foreach($this->resource_cache[$resource_name] as $existing_tag){
                        if($existing_tag['id'] == $resource_tag['id'])
                            $exists = true;   
                        
                    }
                    // if doesn't exists, push tag to the resource entry
                    if($exists == false){
                        // finally push to cache
                        array_push($this->resource_cache[$resource_name], $resource_tag);
                    }
                    
                }else{
                    continue;
                }
            }
            
        }

        echo json_encode($this->resource_cache[$resource_name]);
    }


    /**
      Cache the json content in private variable.
      Actually don't do anything if called and content is already loaded. Prevent multiple hit.
     */
    private function load_content($lang){

        if(!isset($this->content_cache[$lang])){
            // cache the content if not loaded
            $this->content_cache[$lang] = json_decode(file_get_contents(__DIR__."/../../locale/$lang/tag/tag.json"), true);

            // converts content icons to svg content
            foreach($this->content_cache[$lang] as &$tag){

                // load the svg icon as a string and replace the entry
                if(isset($tag['icon'])){
                    $tag['icon'] = resolve_icon($tag['icon']);
                }
                
            }
        }

        return $this->content_cache[$lang];
    }

    /**
      Returns the tag from its id
     */
    private function tag_from_id($id, $lang){

        // make sure cache is loaded first
        if(!isset($this->content_cache[$lang])){
            $this->load_content($lang);
        }

        foreach($this->content_cache[$lang] as $tag){
            if($tag['id'] == $id){
                return $tag;
            }
        }

        return null;
    }

}
