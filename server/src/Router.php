<?php
class Router{

    private $routes = [];

    function __construct(){}

    function get($path, $callback){
        $this->routes['GET'][$path] = $callback;
    }

    function dispatch($reqUri, $reqMethod){

        foreach($this->routes[$reqMethod] as $path => $callback){
            if(preg_match("#$path$#", $reqUri, $matches)){
                array_shift($matches);
                return call_user_func_array($callback, $matches);
            }

        }
        http_response_code(404);
        echo json_encode(["message" => "Endpoint not found"]);
    }

}
