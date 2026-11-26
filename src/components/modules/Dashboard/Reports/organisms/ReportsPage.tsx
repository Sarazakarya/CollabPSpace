import React from "react";
import { useGetReportsData } from "../hooks/useGetReportsData";

import { normalizeSeriesData } from "../utils/reportFormatters";
import {
  DEFAULT_PROJECT_SERIES,
  DEFAULT_TASK_SERIES,
  DEFAULT_WORKER_SERIES,
} from "../utils/reportsData";
import { ReportsChartsSection } from "../molecules/ReportsChartsSection";
import { ReportsStatsGrid } from "../molecules/ReportsStatsGrid";

const ReportsPage: React.FC = () => {
  const {
    selectedProjectId,
    setSelectedProjectId,
    activityPeriod,
    setActivityPeriod,
    projectsQuery,
    tasksQuery,
    teamsQuery,
    usersQuery,
  } = useGetReportsData();

  const projectData = projectsQuery.data?.data;
  const taskData = tasksQuery.data?.data;
  const teamData = teamsQuery.data?.data;
  const userData = usersQuery.data?.data;

  const taskSeries = normalizeSeriesData(
    taskData?.completion_vs_deadline,
    DEFAULT_TASK_SERIES,
  );
  const projectSeries = normalizeSeriesData(
    projectData?.progress_timeline,
    DEFAULT_PROJECT_SERIES,
  );
  const workerSeries = normalizeSeriesData(
    userData?.activity_timeline,
    DEFAULT_WORKER_SERIES,
  );

  return (
    <main className="min-h-screen bg-[#F5F7FA] p-6">
      <div className="mx-auto max-w-7xl space-y-5">
        <ReportsStatsGrid
          taskCompletionRate={taskData?.completion_rate ?? 70}
          taskDelta={taskData?.change_percentage ?? 3}
          isTasksLoading={tasksQuery.isLoading}
          projectCompletionRate={projectData?.completion_rate ?? 88}
          projectDelta={projectData?.change_percentage ?? 6}
          isProjectsLoading={projectsQuery.isLoading}
          teamActivityRate={teamData?.activity_rate ?? 67}
          teamDelta={teamData?.change_percentage ?? -4}
          isTeamsLoading={teamsQuery.isLoading}
        />

        <ReportsChartsSection
          taskSeries={taskSeries}
          isTasksLoading={tasksQuery.isLoading}
          projectSeries={projectSeries}
          isProjectsLoading={projectsQuery.isLoading}
          workerSeries={workerSeries}
          isUsersLoading={usersQuery.isLoading}
          selectedProject={selectedProjectId}
          onProjectChange={setSelectedProjectId}
          projectsList={projectData?.projects}
          activityPeriod={activityPeriod}
          onPeriodChange={setActivityPeriod}
        />
      </div>
    </main>
  );
};

export default ReportsPage;
