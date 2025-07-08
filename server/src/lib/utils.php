<?php

/**
  TEMPORARY
  In the meantime of having a proper backend implementation the function
  returns the right resource filename (document, tool...) depending on
  the input ID.

  This method is not robust and temporary and will be replaced when the
  backend will be properly implemented.
 */
function resource_filename_from_id($id){
    
    $resource_files = array("document","module", "plugin", "template", "tool");

    if($id > count($resource_files)){
        return $resource_files[0];
    }
    
    return $resource_files[$id - 1];
    
}
