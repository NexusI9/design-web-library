<?php
class ResourceController{

    private $data;

    function __construct($data){
        $this->data = $data;
    }

    function getAllCategories(){
        echo json_encode(["message" => "slt"]);

    }

}