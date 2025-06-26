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
