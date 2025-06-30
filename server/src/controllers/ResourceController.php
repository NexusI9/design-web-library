<?php
class ResourceController
{
    private $tags;

    function __construct()
    {
        $this->tags = json_decode(file_get_contents(__DIR__.'/../../lang/en/tag.json'), true);
    }

    function getAllCategories($file)
    {

        $data = $this->resourceData($file);
        $categories = [];
        foreach ($data as &$value) {
            $tag = $this->getTagName($value['tag']);
            if (!isset($categories[$tag]))
                $categories[$tag] = [$value];
            else
                array_push($categories[$tag], $value);
        }

        echo json_encode($categories);
    }

    function getCategory($file, $category)
    {
        $data = $this->resourceData($file);

        $category = urldecode($category);
        $resources = [];
        $resources[$category] = [];

        $tag = $this->getTagID($category);
        foreach ($data as &$value) {
            if ($value['tag'] == $tag)
                array_push($resources[$category], $value);
        }

        if (count($resources[$category]) > 0) {
            echo json_encode($resources);
        } else {
            $this->getAllCategories($file);
        }
    }

    private function resourceData($name)
    {
        $name = strtolower($name);
        return json_decode(file_get_contents(__DIR__."/../../lang/en/$name.json"), true);
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
