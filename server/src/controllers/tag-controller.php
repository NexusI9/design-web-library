<?php
class Tag_Controller
{

    private $svg_cache;
    private $content_cache;

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

}
