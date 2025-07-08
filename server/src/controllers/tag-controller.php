<?php
class Tag_Controller
{

    // cached svg strings
    private $svg_cache;

    // cached tags content
    private $content_cache;

    // cached tags by resources type
    private $resource_cache;

    function __construct()
    {
        $this->svg_cache = array();
    }

    /**
      Return a specific resource with a given category (filtered).
     */
    function get_by_name($lang, $name)
    {
        $tag = [];
        
        // retrieve tags file based on the language
        $this->load_content($lang);

        // get the tag by name
        foreach($this->content_cache as $t){
            if($name == 'all' || (isset($t['name']) && $t["name"] === $name)){

                // load the svg icon as a string and replace the entry
                if(isset($t['icon'])){
                    $t['icon'] = $this->load_svg($t['icon']);
                }else{
                    $t['icon'] = "<!-- No icon -->";
                }
      

                // push to result array
                array_push($tag, $t);
            }
        }

        
       echo json_encode($tag);
    }

    /**
      Retrieve the unique tags on each resource type (document, tags...)
     */
    function get_by_resource($lang, $resource_name){

        $resource_name = strtolower($resource_name);
        
        // load in cache if doesn't exists
        if(!isset($this->resource_cache[$resource_name])){

            $this->resource_cache[$resource_name] = array();
            
            // load relative resource content
            $resource_content = json_decode(file_get_contents(__DIR__."/../../locale/$lang/$resource_name.json"), true);
            
            // retrieve tag from resource id
            foreach($resource_content as $resource){
          
                if(isset($resource['tag'])){
                    $resource_tag = $this->tag_from_id($resource['tag'], $lang);

                    // check if tag is already listed in the resource cache
                    $exists = false;
                    foreach($this->resource_cache[$resource_name] as $existing_tag){
                        if($existing_tag['id'] == $resource_tag['id'])
                            $exists = true;   
                        
                    }
                    // if doesn't exists, push tag to the resource entry
                    if($exists == false){
                        // replace the icon with file string
                        if(isset($resource_tag['icon'])){
                            $resource_tag['icon'] = $this->load_svg($resource_tag['icon']);
                        }else{
                            $resource_tag['icon'] = "<!-- No icon -->";
                        }
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
      Cache the svg strings in private variable.
      Return the svg string either from the cache on file_get_content and not cached.
      If not cached, the string gets added.
     */
    private function load_svg($name){

        // check if key name doesn't exists, load content in the cache
        if(!isset($this->svg_cache[$name])){
            $this->svg_cache[$name] = file_get_contents(__DIR__."/../assets/icons/$name.svg");
        }

        // return cache value
        return $this->svg_cache[$name];
    }

    /**
      Cache the json content in private variable.
      Actually don't do anything if called and content is already loaded. Prevent multiple hit.
     */
    private function load_content($lang){
        if(!isset($this->content_cache)){
            // cache the content if not loaded
            $this->content_cache = json_decode(file_get_contents(__DIR__."/../../locale/$lang/tag.json"), true);
        }
    }

    /**
      Returns the tag from its id
     */
    private function tag_from_id($id, $lang){

        // make sure cache is loaded first
        if(!isset($this->content_cache)){
            $this->load_content($lang);
        }

        foreach($this->content_cache as $tag){
            if($tag['id'] == $id){
                return $tag;
            }
        }

        return null;
    }

}
