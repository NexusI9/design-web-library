<?php

include_once __DIR__."/../lib/resolver.php";

class Route_Controller
{

    private $page_cache;

    function __construct()
    {

    }

    function get_page_by_name($lang, $page_name){

        $data = $this->load_pages($lang);  
        echo json_encode($data);
        
    }

    private function load_pages($lang){

        if(!isset($this->page_cache[$lang])){
            
            // load content in cache
            $this->page_cache[$lang] = json_decode(file_get_contents(__DIR__."/../../locale/$lang/page/page.json"), true);

            // replace cached icons by svg file content
            resolve_array($this->page_cache[$lang]);
        }
        

        return $this->page_cache[$lang];
    }
    
}
