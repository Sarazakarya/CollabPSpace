import { useState } from "react";
import type { ProjectFile } from "../types/FileType";

const useDeleteFileDialog = () => {
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedFile, setSelectedFile] = useState<ProjectFile | null>(null);

  const handleOpenDelete = (file: ProjectFile) => {
    setSelectedFile(file);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setSelectedFile(null);
  };

  return {
    openDelete,
    setOpenDelete,
    selectedFile,
    handleOpenDelete,
    handleCloseDelete,
  };
};

export default useDeleteFileDialog;
