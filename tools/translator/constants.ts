import { Method, RecordFilter } from "./types";

export const LOCALES = ["zh-TW", "fr-FR"];
export const SOURCE_LANG = "en";

export const METHOD: Method = "GOOGLE_TRANSLATE";

export const INPUT_FOLDER = "server/locale";
export const CACHE_FOLDER = "tools/translator/cache";
export const LOG_FOLDER = "tools/translator/logs";

export const BATCH_SIZE = 25;

export const JSON_KEY_BLACKLIST = ["href", "picture", "value", "path", "icon", "filter", "resource_id", "type", "tag_id"];
export const REGEXP_URL = /^https?:\/\//i; // http://...
export const REGEXP_PATH = /^\/[^\s]+\.[a-z0-9]+$/i; // /my/path/to/file.docx
export const REGEXP_HTML_DATA = /^data-[a-z0-9_-]+$/i; // data-something
export const REGEXP_CONSTANT = /^[A-Z0-9_\s-]+$/; // CONSTANTS
export const REGEXP_PROTECTED_ONLY = /^\[\[.*\]\]$/; // [[value]]
export const REGEXP_PROTECTED = /\[\[(.*?)\]\]/g; // ... [[value]] ...
export const REGEXP_VARIABLE = /\{.*?\}/g; // ... {variable} ... 


export const TRANSLATION_FILTERS: RecordFilter[] = [
	{ type: "PRESET", rule: "FILTER_EMPTY_STRING", target: "VALUE" },
	{ type: "PRESET", rule: "FILTER_NUMBER", target: "VALUE" },
	{ type: "REGEXP", rule: REGEXP_URL, target: "VALUE" },
	{ type: "REGEXP", rule: REGEXP_PATH, target: "VALUE" },
	{ type: "REGEXP", rule: REGEXP_HTML_DATA, target: "VALUE" },
	{ type: "REGEXP", rule: REGEXP_CONSTANT, target: "VALUE" },
	{ type: "REGEXP", rule: REGEXP_PROTECTED_ONLY, target: "VALUE" },
	{ type: "LIST", rule: JSON_KEY_BLACKLIST, target: "KEY" }
];

export const KEY_SPLIT_CHAR = "/";
