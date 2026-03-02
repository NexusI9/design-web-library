<?php
// env.php

function load_env($file) {
    if (!file_exists($file)) return;

    $lines = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        // Skip comments
        if (strpos(trim($line), '#') === 0) continue;

        // Split at first '='
        $parts = explode('=', $line, 2);
        if (count($parts) != 2) continue;

        $name = trim($parts[0]);
        $value = trim($parts[1], "\"'"); // remove quotes
        $_ENV[$name] = $value;
        putenv("$name=$value"); // optional
    }
}

load_env(dirname(__DIR__, 3) . '/.env');
