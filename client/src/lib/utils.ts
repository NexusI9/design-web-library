import { redirect } from "@tanstack/react-router";
import { TValidLang, validLang } from "@components/Language/Language";

export const downloadModule = async (module: string, params: URLSearchParams) => {

	// strip index.php from the module url, infer the source path from the iframe source
	// /modules/elite/slideshow/index.php => /modules/elites/slideshow
	module = module.replace(/\/index.*/, "");

	// request download with module name and stringified params
	const url = `${process.env.API_DOWNLOAD_URL}?module=${module}&${new URLSearchParams(params).toString()}`;
	console.log(url);
	const response = await fetch(url);
	if (response.ok) {
		const blob = await response.blob();
		console.log(blob);
		const link = document.createElement("a");
		link.href = URL.createObjectURL(blob);
		link.download = `${module}.zip`;
		link.click();
		URL.revokeObjectURL(link.href);
	}
};

export const locationUpdateLang = (lang: TValidLang) => {
	const segments = location.pathname.split("/").filter(Boolean);
	const newPath = [lang, ...segments.slice(1)].join("/");
	return newPath;
};

export const locationLang = () => {
	const segments = location.pathname.split("/").filter(Boolean);
	const maybeLang = segments[0]?.toLowerCase();
	return maybeLang;
};

export const langRedirect = (location: string) => {
	const segments = location.split("/").filter(Boolean);
	const maybeLang = segments[0]?.toLowerCase();

	if (!validLang.includes(maybeLang as TValidLang)) {
		const newPath = ["/en", ...segments.slice(1)].join("/");
		throw redirect({
			to: newPath,
			replace: true,
		});
	}
};

export const urlType = (url: string) => {
	if (!url) return 'INTERNAL'; // fallback for empty href

	// External: starts with http or https
	if (url.startsWith('http://') || url.startsWith('https://')) {
		return 'EXTERNAL';
	}

	// File: has an extension like .xd, .pptx, .zip
	// This regex looks for a dot followed by 1+ alphanumeric characters at the end
	if (/\.[a-zA-Z0-9]+$/.test(url)) {
		return 'FILE';
	}

	// Otherwise, assume internal route/link
	return 'INTERNAL';
}

export const cFetch = async (url: string) => {

	const res = await fetch(url);
	const text = await res.text();

	try {
		const data = JSON.parse(text);
		return data;
	} catch (err) {
		console.error("Server returned non-JSON response:");
		console.error("Query:" + url);
		console.error(text);
		return {};
	}

}
