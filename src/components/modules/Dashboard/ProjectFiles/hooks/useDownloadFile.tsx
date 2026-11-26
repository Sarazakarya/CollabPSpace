import { useState } from "react";
import { downloadFile } from "../api/getDownload";

const useDownloadFile = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async (fileId: number, fileName: string) => {
    try {
      setIsDownloading(true);

      const blob = await downloadFile(fileId);
      const fileUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = fileName;

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.setTimeout(() => {
        window.URL.revokeObjectURL(fileUrl);
      }, 1000);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return {
    handleDownload,
    isDownloading,
  };
};

export default useDownloadFile;