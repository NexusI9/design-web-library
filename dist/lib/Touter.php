<?php
class Router{

    private $data;
    function __construct($datapath){
        $this->data = json_decode(file_get_contents($datapath), true);
    }

    function data(){
        return $this->data;
    }

    function init(){
        echo json_encode($this->data);
    }


}