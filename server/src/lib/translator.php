<?php

include_once __DIR__ . "/../lib/constants.php";
include_once __DIR__ . "/../lib/utils.php";


class Translator
{

    private $translations_cache = [];

    /**
     * Decide whether a string looks like a translation key.
     */
    private function is_translation_key(string $value): bool
    {
        return preg_match('/^[a-z0-9_.-]+$/i', $value) === 1;
        //&& str_contains($value, '.');

        // TODO improve the slug detection system, currently we check all the keys and check if it matches any of the ditionary key.
    }

    /**
     * Flatten nested locale array into dot-notation map.
     *
     * Example:
     * [
     *   'tool' => [
     *     'figma' => [
     *       'title' => 'Figma'
     *     ]
     *   ]
     * ]
     *
     * becomes:
     * [
     *   'tool.figma.title' => 'Figma'
     * ]
     */
    private function flatten_array(array $data, string $prefix = ''): array
    {
        $flat = [];

        foreach ($data as $key => $value) {
            $full_key = $prefix === '' ? (string)$key : $prefix . '.' . $key;

            if (is_array($value)) {
                $flat += $this->flatten_array($value, $full_key);
            } elseif (is_string($value)) {
                $flat[$full_key] = $value;
            }
        }

        return $flat;
    }


    /**
     * Recursively translate values in arrays/objects using a flat lookup map.
     */
    private function translate_mixed(&$value, array $translations): void
    {
        if (is_string($value)) {
            if ($this->is_translation_key($value) && isset($translations[$value])) {
                $value = $translations[$value];
            }
            return;
        }

        if (is_array($value)) {
            foreach ($value as &$child) {
                $this->translate_mixed($child, $translations);
            }
            unset($child);
            return;
        }

        if (is_object($value)) {
            foreach ($value as &$child) {
                $this->translate_mixed($child, $translations);
            }
            unset($child);
        }
    }

    private function translate_core(&$entry, string $dictionary): void
    {

        if (!isset($this->translations_cache[$dictionary])) {
            // load file and flattens it
            $decoded_file = load_locale_file($dictionary);
            $this->translations_cache[$dictionary] = $this->flatten_array($decoded_file);
        }

        $this->translate_mixed($entry, $this->translations_cache[$dictionary]);
    }

    private function path_from_locale(string $locale, string $path): string
    {
        return  rtrim(PATH_LOCALE, '/')
            . '/'
            . $locale
            . $path;
    }

    /**
     * Translate an array of entries according to:
     * PATH_LOCALE . '/' . $locale . $path_map[$resource_id]
     */
    function translate_resources(array &$entries, string $locale): void
    {
        $path_map = [
            1 => '/resource/template.json',
            2 => '/resource/module.json',
            3 => '/resource/plugin.json',
            4 => '/resource/template.json',
            5 => '/resource/tool.json',
        ];

        foreach ($entries as &$entry) {
            $resource_id = null;

            if (is_object($entry) && isset($entry->resource_id)) {
                $resource_id = $entry->resource_id;
            } elseif (is_array($entry) && isset($entry['resource_id'])) {
                $resource_id = $entry['resource_id'];
            }

            if (!$resource_id || !isset($path_map[$resource_id])) {
                continue;
            }

            $file_path = $this->path_from_locale($locale, $path_map[$resource_id]);

            $this->translate_core($entry, $file_path);
        }

        unset($entry);
    }

    function translate(array &$entries, string $locale, string $dictionary): void
    {
        foreach ($entries as &$entry) {
            $file_path = $this->path_from_locale($locale, $dictionary);

            $this->translate_core($entry, $file_path);
        }

        unset($entry);
    }
}
