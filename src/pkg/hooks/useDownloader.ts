const useDownloader = () => {
  const download = (
    filename: string,
    content: string,
    type = "application/json",
  ) => {
    const blob = new Blob([content], { type: type });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return { download };
};

export default useDownloader;
