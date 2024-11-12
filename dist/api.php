<?php
include_once "./lib/Router.php";
include_once "./lib/controllers/ResourceController.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json");

$router = new Router("./data/data.json");
$data = $router->data();

$controller = new ResourceController($data);


$router->get('/resources/category/all',[$controller, 'getAllCategories']);
$router->get('/resources/category/([a-zA-Z0-9]+)',[$controller, 'getCategory']);


$router->dispatch($_SERVER['REQUEST_URI'], $_SERVER['REQUEST_METHOD']);



