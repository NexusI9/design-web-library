<?php
class Router{

    private $data;
    private $routes = [];
    private $controllers = [];

    function __construct($datapath){
        $this->data = json_decode(file_get_contents($datapath), true);
    }

    function data(){
        return $this->data;
    }

    function get($path, $callback){
        $this->routes['GET'][$path] = $callback;
    }

    function dispatch($reqUri, $reqMethod){

        foreach($this->routes[$reqMethod] as $path => $callback){
            if($match = strstr($reqUri, $path)){
                return call_user_func_array($callback, [$match]);
            }

        }
        http_response_code(404);
        echo json_encode(["message" => "Endpoint not found"]);
    }


}