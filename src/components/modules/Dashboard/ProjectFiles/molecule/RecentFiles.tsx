import { useTranslation } from "react-i18next";
import type { RecentFileProps } from "../types/FileType";
import FileCard from "./FileCard";
import EmptyState from "@/core/ui-states/EmptyState";

const RecentFiles = ({ files }: RecentFileProps) => {
  const { t } = useTranslation();

  const recentFiles = files.slice(0, 3);

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">
        {t("projects.files.recentFiles")}
      </h2>

      {recentFiles.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {recentFiles.map((file) => (
            <FileCard key={file.id} file={file} />
          ))}
        </div>
      )}
    </section>
  );
};

export default RecentFiles;
