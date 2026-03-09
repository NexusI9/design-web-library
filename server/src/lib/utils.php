<?php

require __DIR__ . '/env.php';

/**
  TEMPORARY
  In the meantime of having a proper backend implementation the function
  returns the right resource filename (document, tool...) depending on
  the input ID.

  This method is not robust and temporary and will be replaced when the
  backend will be properly implemented.
 */
function resource_filename_from_id($id)
{

    $resource_files = array(
        1 => "template",
        2 => "module",
        3 => "plugin",
        4 => "template",
        5 => "tool"
    );

    if ($id > count($resource_files)) {
        return $resource_files[1];
    }

    return $resource_files[$id];
}

function base_url()
{
    // $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? "https" : "http";
    // $host = $_SERVER['HTTP_HOST'];
    // $base_url = $protocol . "://" . $host;
    return $_ENV['CLIENT_URL'];
}

/*
  - http://myresources.com -> start with HTTP -> EXTERNAL
  - myresource.docx -> ends with .ext -> FILE
  - myresrouce -> INTERNAL path 
 */
function get_url_type($url)
{
    if (str_starts_with($url, 'http')) {
        return 'EXTERNAL';
    } elseif (preg_match('/\.[a-zA-Z0-9]+$/', $url)) {
        return 'FILE';
    } else {
        return 'INTERNAL';
    }
}

/**
 * Load locale JSON and flatten it once.
 */
function load_locale_file(string $file_path): array
{
    if (!file_exists($file_path)) {
        return [];
    }

    $json = file_get_contents($file_path);
    if ($json === false) {
        return [];
    }

    $decoded = json_decode($json, true);
    if (!is_array($decoded)) {
        return [];
    }

    return $decoded;
}
