<?php
include_once "./lib/router.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json");

$router = new Router("./data/data.json");
$router->init();
