import { useTranslation } from "react-i18next";
import DashboardCard from "./DashboardCard";
import TaskItem from "./TaskItem";
import type { TaskProps } from "../types/DashboardType";

export default function TasksCard({ data }: TaskProps) {
  const { t } = useTranslation();

  return (
    <DashboardCard title={t("dashboard.tasks.title")} viewAll>
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
    </DashboardCard>
  );
}
