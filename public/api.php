<?php
include_once "./lib/Router.php";
include_once "./lib/controllers/ResourceController.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json");

$router = new Router();
$controller = new ResourceController();

$router->get('/resources/([\w\W]+)/category/all',[$controller, 'getAllCategories']);
$router->get('/resources/([\w\W]+)/category/([\w\W]+)',[$controller, 'getCategory']);


$router->dispatch($_SERVER['REQUEST_URI'], $_SERVER['REQUEST_METHOD']);



