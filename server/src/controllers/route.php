<?php

include_once __DIR__ . "/../lib/resolver.php";
include_once __DIR__ . "/../lib/constants.php";
include_once __DIR__ . "/../lib/translator.php";

class RouteController
{

    private $page_cache;
    private $translator;

    function __construct() {

        $this->translator = new Translator();
        
    }

    function get_page_by_name($lang, $page_name)
    {

        // if all page name, concat all pages
        $data = array();

        if ($page_name == 'all') {

            // traverse page directory
            $files = glob(PATH_CONTENT . "/page/*.json");

            // cache each page
            foreach ($files as $file) {

                $filename = pathinfo($file, PATHINFO_FILENAME);
                $file_content = $this->load_page($lang, $filename);

                // concat
                $data = array_merge($data, $file_content);
            }
        } else {
            $data = $this->load_page($lang, $page_name);
        }


        echo json_encode($data);
    }

    private function load_page($lang, $name)
    {

        // check if cache lang is set
        if (!isset($this->page_cache[$lang]))
            $this->page_cache[$lang] = array();


        // cache page content by name
        if (!isset($this->page_cache[$lang][$name])) {

            // load content in cache
            $this->page_cache[$lang][$name] = json_decode(file_get_contents(PATH_CONTENT . "/page/$name.json"), true);


            // replace slugs by real text
            $this->translator->translate($this->page_cache[$lang], $lang, "/page/$name.json");
            
            // replace cached icons by svg file content
            resolve_array($this->page_cache[$lang]);
        }


        return $this->page_cache[$lang][$name];
    }
}
