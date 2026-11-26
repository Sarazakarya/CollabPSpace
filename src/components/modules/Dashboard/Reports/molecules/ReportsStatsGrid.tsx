import React from "react";
import { useTranslation } from "react-i18next";
import { StatKpiCard } from "../molecules/StatKpiCard";

interface ReportsStatsGridProps {
  taskCompletionRate?: number;
  taskDelta?: number;
  isTasksLoading?: boolean;
  projectCompletionRate?: number;
  projectDelta?: number;
  isProjectsLoading?: boolean;
  teamActivityRate?: number;
  teamDelta?: number;
  isTeamsLoading?: boolean;
}

export const ReportsStatsGrid: React.FC<ReportsStatsGridProps> = ({
  taskCompletionRate = 70,
  taskDelta = 3,
  isTasksLoading = false,
  projectCompletionRate = 88,
  projectDelta = 6,
  isProjectsLoading = false,
  teamActivityRate = 67,
  teamDelta = -4,
  isTeamsLoading = false,
}) => {
  const { t } = useTranslation();

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-3">
      <StatKpiCard
        title={t("reports.kpi.taskCompletionRate", "Task Completion Rate")}
        percentage={taskCompletionRate}
        delta={taskDelta}
        isLoading={isTasksLoading}
      />
      <StatKpiCard
        title={t(
          "reports.kpi.projectsCompletionRate",
          "Projects Completion Rate"
        )}
        percentage={projectCompletionRate}
        delta={projectDelta}
        isLoading={isProjectsLoading}
      />
      <StatKpiCard
        title={t("reports.kpi.teamsActivityRate", "Teams Activity Rate")}
        percentage={teamActivityRate}
        delta={teamDelta}
        isLoading={isTeamsLoading}
      />
    </section>
  );
};
