import { useTranslation } from "react-i18next";
import DashboardCard from "./DashboardCard";
import ProjectItem from "./ProjextItem";
import EmptyMessage from "./EmptyMessage";

type Props = {
  data: {
    id: number;
    name: string;
    progress: number;
    tasks_total: number | null;
    tasks_completed: number | null;
  }[];
};

export default function ActiveProjectsCard({ data }: Props) {
  const { t } = useTranslation();

  return (
    <DashboardCard title={t("dashboard.activeProjects.title")} viewAll>
      {data.length === 0 ? (
        <EmptyMessage
          title={t("dashboard.activeProjects.emptyTitle")}
          message={t("dashboard.activeProjects.empty")}
        />
      ) : (
        <ul className="flex max-h-80 flex-col gap-5 overflow-y-auto pr-2">
          {data.map((project) => (
            <ProjectItem
              key={project.id}
              name={project.name}
              done={project.tasks_completed ?? 0}
              total={project.tasks_total ?? 0}
              tone="info"
            />
          ))}
        </ul>
      )}
    </DashboardCard>
  );
}
