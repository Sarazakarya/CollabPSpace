import { useTranslation } from "react-i18next";
import DashboardCard from "./DashboardCard";
import FileItem from "./FileItem";
import type { RecentProps } from "../types/DashboardType";
import EmptyMessage from "./EmptyMessage";

export default function RecentFilesCard({ data }: { data: RecentProps }) {
  const { t } = useTranslation();

  return (
    <DashboardCard title={t("dashboard.recentFiles.title")} viewAll>
      {data.length > 0 ? (
        <ul className="flex max-h-80 flex-col gap-4 overflow-y-auto pr-2">
          {data.map((file) => (
            <FileItem
              key={file.id}
              name={file.name}
              by={file.uploaded_by.name}
              time={file.created_at}
              tone="info"
            />
          ))}
        </ul>
      ) : (
        <EmptyMessage
          title={t("dashboard.recentFiles.emptyTitle")}
          message={t("dashboard.recentFiles.emptyMessage")}
        />
      )}
    </DashboardCard>
  );
}
