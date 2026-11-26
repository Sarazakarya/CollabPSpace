import React from "react";
import { useTranslation } from "react-i18next";
import { TaskCompletionBarChart } from "./TaskCompletionBarChart";
import { ProjectsProgressAreaChart } from "./ProjectsProgressAreaChart";
import { WorkerActivityLineChart } from "./WorkerActivityLineChart";
import { SubmitDetailedReportCard } from "./SubmitDetailedReportCard";
import type { ReportsChartsSectionProps } from "../types/report.types";

export const ReportsChartsSection: React.FC<ReportsChartsSectionProps> = ({
  taskSeries,
  isTasksLoading = false,
  projectSeries,
  isProjectsLoading = false,
  workerSeries,
  isUsersLoading = false,
  selectedProject,
  onProjectChange,
  projectsList,
  activityPeriod,
  onPeriodChange,
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <TaskCompletionBarChart
            title={t(
              "reports.charts.taskCompletionVsDeadline",
              "Task Completion Time vs Deadline",
            )}
            data={taskSeries}
            isLoading={isTasksLoading}
          />
        </div>
        <div className="lg:col-span-7">
          <ProjectsProgressAreaChart
            title={t("reports.charts.projectsProgress", "Projects Progress")}
            data={projectSeries}
            selectedProject={selectedProject}
            onProjectChange={onProjectChange}
            projects={projectsList}
            isLoading={isProjectsLoading}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <WorkerActivityLineChart
            title={t(
              "reports.charts.workerActivityRate",
              "Worker Activity Rate",
            )}
            data={workerSeries}
            period={activityPeriod}
            onPeriodChange={onPeriodChange}
            isLoading={isUsersLoading}
          />
        </div>
        <div className="lg:col-span-7">
          <SubmitDetailedReportCard />
        </div>
      </div>
    </div>
  );
};
