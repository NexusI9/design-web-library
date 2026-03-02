<?php

include_once "utils.php";

/**
  Resolver functions takes in a value from the database and return
  it as a "usable" version for the system:

  ƒ("home") = "./assets/uploads/home.webp"


  Overall flow:
  .---------------.    .-----------------.     .---------.    .------.
  | Fetch content | => | Resolve entries | =>  |  Cache  | => | Send |
  '---------------'    '-----------------'     '---------'    '------'
  
 */


/**
  Traverse and array of objects and resolve it's values according to a mapping process.
 */
function resolve_array(&$entries){

    $resolve_map = array(
        "icon" => 'resolve_icon',
        "banner" => 'resolve_page_banner',
        "picture" => 'resolve_resource_thumbnail',
        "href" => 'resolve_href'
    );
    
    // traverse array
    foreach($entries as &$entry){

        if (is_array($entry)) 
            resolve_array($entry);
        

        if(is_array($entry) && array_values($entry) !== $entry){            
            // traverse map array
            foreach ($resolve_map as $key => $callback) {
                if(isset($entry[$key])) {
                    // execute callback with emtry relative value
                    $entry[$key] = $callback($entry[$key]);
                }
            }   
        }

    }
        
    unset($entry);

}

/**
  Returns the path directory for the thumbnails
 */
function resolve_resource_thumbnail($filename){
    return base_url()."/uploads/pictures/resources/$filename.webp";
}

/**
  Returns the path directory for the page banners
 */
function resolve_page_banner($filename){
    return base_url()."/uploads/pictures/pages/$filename.webp";
}


function resolve_icon($filename){
    return file_get_contents(__DIR__."/../assets/icons/$filename.svg");
}


/**
  Returns the path directory for downloadable resources
 */
function resolve_href($filename){

    $type = get_url_type($filename);
    
    if($type == "FILE")
        return base_url()."/uploads/documents/$filename";
        
    return $filename;
}


/**
  Returns the path directory for GLM modules
 */
function resolve_module($filename){
    return base_url()."/modules/glm/$filename/index.php";
}
