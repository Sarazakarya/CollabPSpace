import { FileImage, FileText, Download, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import type { ProjectFile } from "../types/FileType";
import useDeleteFile from "../hooks/useDeletefile";
import useDeleteFileDialog from "../hooks/useDeleteFileDialog";
import useDownloadFile from "../hooks/useDownloadFile";
import DeleteFileModal from "./DeleteFileModal";

interface Props {
  file: ProjectFile;
}

const FileCard = ({ file }: Props) => {
  const { i18n } = useTranslation();

  const { handleDownload, isDownloading } = useDownloadFile();

  const {
    openDelete,
    setOpenDelete,
    selectedFile,
    handleOpenDelete,
    handleCloseDelete,
  } = useDeleteFileDialog();

  const { mutate: deleteMutation, isPending: isDeleting } = useDeleteFile(
    String(file.project_id),
    handleCloseDelete,
  );

  const isImage = file.mime_type.startsWith("image/");

  const fileDate = new Date(file.created_at).toLocaleDateString(
    i18n.language === "ar" ? "ar-EG" : "en-US",
  );

  const handleDelete = () => {
    if (!selectedFile) return;

    deleteMutation(selectedFile.id, {
      onSuccess: () => {
     
        handleCloseDelete();
      },
    });
  };

  return (
    <>
      <div className="flex min-w-0 items-center gap-3 rounded-xl border bg-white p-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-md text-red-500">
          {isImage ? <FileImage size={28} /> : <FileText size={28} />}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{file.name}</p>

          <p className="truncate text-xs text-muted-foreground">
            {file.uploaded_by}
          </p>

          <p className="mt-1 text-[11px] text-muted-foreground">
            {file.file_size_formatted} • {fileDate}
          </p>
        </div>

        <div className="flex shrink-0 items-center">
          <Button
            type="button"
            variant="ghost"
            className={"cursor-pointer"}
            size="icon"
            onClick={() => handleDownload(file.id, file.name)}
            disabled={isDownloading || isDeleting}
          >
            <Download size={18} />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => handleOpenDelete(file)}
            disabled={isDeleting || isDownloading}
            className="text-red-500 hover:text-red-600 cursor-pointer"
          >
            <Trash2 size={18} />
          </Button>
        </div>
      </div>

      <DeleteFileModal
        open={openDelete}
        setOpen={setOpenDelete}
        file={selectedFile}
        onConfirm={handleDelete}
        isPending={isDeleting}
      />
    </>
  );
};

export default FileCard;
