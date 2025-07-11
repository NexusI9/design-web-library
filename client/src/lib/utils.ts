import { redirect } from "@tanstack/react-router";
import { TValidLang, validLang } from "@components/Language/Language";

export const downloadZIP = async (module: string, params: URLSearchParams) => {
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
