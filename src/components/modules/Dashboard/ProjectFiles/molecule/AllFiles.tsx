import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import type { ProjectFile } from "../types/FileType";
import FileCard from "./FileCard";
import EmptyState from "@/core/ui-states/EmptyState";
import useUploadFile from "../hooks/useUploadFile";
import useFileUpload from "../hooks/useFileUpload";

interface Props {
  files: ProjectFile[];
  projectId: string;
}

const AllFiles = ({ files, projectId }: Props) => {
  const { t } = useTranslation();

  const { fileInputRef, handleOpenUpload } = useFileUpload();

  const { mutate: uploadMutation, isPending } = useUploadFile(projectId);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    uploadMutation({
      name: selectedFile.name,
      project_id: Number(projectId),
      file: selectedFile,
    });

    event.target.value = "";
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          {t("projects.files.allFiles")}
        </h2>

        <div>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />

          <Button
            size="sm"
            onClick={handleOpenUpload}
            disabled={isPending}
            className={"cursor-pointer"}
          >
            {isPending
              ? t("projects.files.uploading")
              : t("projects.files.uploadFile")}
            <Plus size={16} />
          </Button>
        </div>
      </div>

      {files.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {files.map((file) => (
            <FileCard key={file.id} file={file} />
          ))}
        </div>
      )}
    </section>
  );
};

export default AllFiles;
