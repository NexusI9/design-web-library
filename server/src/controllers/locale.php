<?php

include_once __DIR__ . "/../lib/constants.php";

class LocaleController
{
    /**
     * Locale label map
     */
    private array $locale_labels = [
        'en-US' => 'EN (US)',
        'en-GB' => 'EN (UK)',
        'zh-TW' => '繁體中文',
        'zh-CN' => '简体中文',
        'ja-JP' => '日本語',
        'ko-KR' => '한국어',
    ];

    function get_locales()
    {
        if (!defined('PATH_LOCALE') || !is_dir(PATH_LOCALE)) {
            http_response_code(500);
            header('Content-Type: application/json');
            echo json_encode([
                'error' => 'Locale directory not configured'
            ], JSON_UNESCAPED_UNICODE);
            return;
        }

        $entries = scandir(PATH_LOCALE);
        $locales = [];

        foreach ($entries as $entry) {
            // skip hidden files/folders like . .. .DS_Store
            if ($entry[0] === '.') {
                continue;
            }

            $full_path = rtrim(PATH_LOCALE, '/') . '/' . $entry;

            // only include directories
            if (!is_dir($full_path)) {
                continue;
            }

            $locales[] = [
                'label' => $this->locale_labels[$entry] ?? $entry,
                'value' => $entry,
            ];
        }

        usort($locales, function ($a, $b) {
            return strcmp($a['value'], $b['value']);
        });

        header('Content-Type: application/json');
        echo json_encode([
            'locales' => $locales,
            'default' => $locales[0],
        ], JSON_UNESCAPED_UNICODE);
    }
}


