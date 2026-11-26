import { useTranslation } from "react-i18next";
import { Download, FileText } from "lucide-react";
import type { ProfileFileItem } from "../types/profile.types";
import useDownloadFile from "../../ProjectFiles/hooks/useDownloadFile";

interface ProfileFileCardProps {
  file: ProfileFileItem;
}

export const ProfileFileCard: React.FC<ProfileFileCardProps> = ({ file }) => {
  const { t } = useTranslation();
  const { handleDownload, isDownloading } = useDownloadFile();

  return (
    <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:border-gray-200">
      <div className="flex items-center gap-3.5 overflow-hidden">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-500">
          <FileText className="h-5 w-5" />
        </div>
        <div className="truncate">
          <h4 className="truncate text-sm font-semibold text-gray-800">
            {file.name}
          </h4>
          <p className="text-xs text-gray-500">
            {t("profile.files.byAuthor", {
              author: file.uploader?.name || "Ahmed Hassan",
            })}
          </p>
          <p className="mt-0.5 text-[11px] text-gray-400">
            {file.size_formatted || "6.4 MB"} • {file.time_ago || "1h ago"}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => handleDownload(file.id, file.name)}
        disabled={isDownloading}
        aria-label={t("profile.files.download")}
        className="cursor-pointer ml-3 rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800 disabled:opacity-50"
      >
        <Download className="h-4 w-4" />
      </button>
    </div>
  );
};
