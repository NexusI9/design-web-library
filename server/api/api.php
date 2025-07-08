<?php
include_once "../src/router.php";
include_once "../src/controllers/resource-controller.php";
include_once "../src/controllers/tag-controller.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json");

$router = new Router();
$resources_controller = new Resource_Controller();
$tag_controller =  new Tag_Controller();


/**
  Rest API structure:


                                                                        .-------------------------.
    .----------.       .---------.      .-----------.            .-----|  Controller A  |  Func ß |
    |  client  | ---> |  api.php | ---> |   Router  | - [GET] --|      |----------------|---------|
    '----------'      '---------'       '-----------'           '------|  Controller B  |  Func ∂ |
                                                                       '--------------------------'

                                                                       
 */

// First push new "pattern" => [callback, args] to the router
$router->get('/([a-zA-Z-]+)/resources/([a-zA-Z0-9_-]+)/category/([a-zA-Z0-9_-]+)', [$resources_controller, 'get_by_tag']);
$router->get('/([a-zA-Z-]+)/tags/resource/([a-zA-Z0-9_-]+)', [$tag_controller, 'get_by_resource']);
$router->get('/([a-zA-Z-]+)/tags/name/([a-zA-Z0-9_-]+)', [$tag_controller, 'get_by_name']);

// Then dispatch the method by mapping the URI to the previously entered pattens 
$router->dispatch($_SERVER['REQUEST_URI'], $_SERVER['REQUEST_METHOD']);
