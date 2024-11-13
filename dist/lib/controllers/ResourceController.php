<?php
class ResourceController
{

    private $data;
    private $tags;

    function __construct($data)
    {
        $this->data = $data;
        $this->tags = json_decode(file_get_contents('./data/tag.json'), true);
    }

    function getAllCategories()
    {

        $categories = [];
        foreach ($this->data as &$value) {
            $tag = $this->getTagName($value['tag']);
            if (!isset($categories[$tag]))
                $categories[$tag] = [$value];
            else
                array_push($categories[$tag], $value);
        }

        echo json_encode($categories);
    }

    function getCategory($category)
    {

        $category = urldecode($category);
        $resources = [];
        $resources[$category] = [];
        
        $tag = $this->getTagID($category);
        foreach ($this->data as &$value) {
            if ($value['tag'] == $tag)
                array_push($resources[$category], $value);
        }

        if (count($resources[$category]) > 0) {
            echo json_encode($resources);
        } else {
            $this->getAllCategories();
        }
    }

    private function getTagName($id)
    {

        foreach ($this->tags as &$value) {
            if ($value['id'] == $id)
                return $value['name'];
        }

        return "";
    }


    private function getTagID($name)
    {
        foreach ($this->tags as &$value) {
            if (strtolower($value['name']) == strtolower($name))
                return $value['id'];
        }

        return 0;
    }

}