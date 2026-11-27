import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import EmptyState from "@/core/ui-states/EmptyState";
import ErrorState from "@/core/ui-states/ErrorState";

import { useGetDashboard } from "../hooks/useGetDashboard";
import ActiveProjectsCard from "../molecule/ActiveProjectCard";
import AskAICard from "../molecule/AskAiCard";
import DashboardSkeleton from "../molecule/DashBoardSkelton";
import MeetingsCard from "../molecule/MeetingsCard";
import ProjectOverviewChart from "../molecule/ProjectOverflow";
import RecentFilesCard from "../molecule/RecentFileCard";
import StatsRow from "../molecule/StateRow";
import TasksCard from "../molecule/TasksCard";
import TeamsCard from "../molecule/TeemCard";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetDashboard();

  const dashboard = data?.data;

  const hasData =
    !!dashboard &&
    (dashboard.project_overview.data.some((item) => item.projects > 0) ||
      dashboard.active_projects.items.length > 0 ||
      dashboard.recent_files.items.length > 0 ||
      dashboard.tasks.items.length > 0 ||
      dashboard.teams.items.length > 0 ||
      dashboard.upcoming_meetings.items.length > 0);

  useEffect(() => {
    if (dashboard && !hasData) {
      navigate("/projects", { replace: true });
    }
  }, [dashboard, hasData, navigate]);

  if (isLoading) return <DashboardSkeleton />;

  if (isError) return <ErrorState />;

  if (!dashboard) return <EmptyState />;

  if (!hasData) return null;

  return (
    <div className="flex flex-col gap-5 md:gap-8">
      <StatsRow data={dashboard.overview} />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        <ProjectOverviewChart data={dashboard.project_overview.data} />
        <ActiveProjectsCard data={dashboard.active_projects.items} />
        <RecentFilesCard data={dashboard.recent_files.items} />
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <TasksCard data={dashboard.tasks.items} />
        <TeamsCard data={dashboard.teams.items} />
        <MeetingsCard data={dashboard.upcoming_meetings.items} />
        <AskAICard />
      </div>
    </div>
  );
};

export default DashboardPage;
