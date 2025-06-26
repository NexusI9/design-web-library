export const downloadZIP = async (module: string, params: URLSearchParams) => {
  // request download with module name and stringified params
  const response = await fetch(
    `${process.env.API_DOWNLOAD_URL}?module=${module}&${params.toString()}`,
  );

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
