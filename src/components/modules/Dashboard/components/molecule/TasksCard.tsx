import { useTranslation } from "react-i18next";
import DashboardCard from "./DashboardCard";
import TaskItem from "./TaskItem";
import type { TaskProps } from "../types/DashboardType";

export default function TasksCard({ data }: TaskProps) {
  const { t } = useTranslation();

  return (
    <DashboardCard title={t("dashboard.tasks.title")} viewAll>
      {data.length === 0 ? (
        <div className="flex h-56 flex-col items-center justify-center gap-2 text-center">
          <p className="ds-text-sm font-semibold">
            {t("dashboard.tasks.emptyTitle")}
          </p>
          <p className="ds-text-xs ds-text-secondary">
            {t("dashboard.tasks.empty")}
          </p>
        </div>

        
      ) : (
        <ul className="flex max-h-80 flex-col gap-5 overflow-y-auto pr-2">
          {data.map((task) => (
            <TaskItem
              key={task.id}
              title={task.name}
              priority={task.priority}
              due={task.due_date}
            />
          ))}
        </ul>
      )}
    </DashboardCard>
  );
}
