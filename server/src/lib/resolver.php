<?php

include_once "utils.php";

/**
  Resolver functions takes in a value from the database and return
  it as a "usable" version for the system:

  ƒ("home") = "./assets/uploads/home.webp"
 */


/**
  Traverse and array of objects and resolve it's values according to a mapping process.
 */
function resolve_array(&$entries){

    $resolve_map = array(
        "icon" => 'resolve_icon',
        "banner" => 'resolve_page_banner',
        "picture" => 'resolve_resource_thumbnail',
        "href" => 'resolve_upload'
    );
    
    // traverse array
    foreach($entries as &$entry){
        // traverse map array
        foreach($resolve_map as $key => $callback){

            // if input array has a key from the map
            // edge case for DOWNLOAD link, need to check if link type if Download first before resolving
            if(
                ($key == "href"
                 && isset($entry["link"])
                 && $entry["link"] == "DOWNLOAD")
                    || ($key != "href"
                        && isset($entry[$key])) ){
                
                // execute callback with emtry relative value
                $entry[$key] = $callback($entry[$key]);
            }
            

        }
    }

    unset($entry);
}

/**
  Returns the path directory for the thumbnails
 */
function resolve_resource_thumbnail($filename){
    return base_url()."/public/uploads/pictures/resources/$filename.webp";
}

/**
  Returns the path directory for the page banners
 */
function resolve_page_banner($filename){
    return base_url()."/public/uploads/pictures/pages/$filename.webp";
}


function resolve_icon($filename){
    return file_get_contents(__DIR__."/../assets/icons/$filename.svg");
}


/**
  Returns the path directory for downloadable resources
 */
function resolve_upload($filename){
    return base_url()."/public/uploads/documents/$filename";
}
