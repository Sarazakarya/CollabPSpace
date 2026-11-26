import { useRef } from "react";

const useFileUpload = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleOpenUpload = () => {
    fileInputRef.current?.click();
  };

  return {
    fileInputRef,
    handleOpenUpload,
  };
};

export default useFileUpload;
