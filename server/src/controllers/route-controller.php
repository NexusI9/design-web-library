<?php
class Route_Controller
{

    private $page_cache;

    function __construct()
    {

    }

    function get_page_by_name($lang, $page_name){

        $this->load_pages($lang);
        echo json_encode($this->page_cache);
        
    }

    private function load_pages($lang){

        $this->page_cache = json_decode(file_get_contents(__DIR__."/../../locale/$lang/page/page.json"), true);
    }
    
}
