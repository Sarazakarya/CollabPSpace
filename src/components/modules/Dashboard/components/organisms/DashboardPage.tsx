
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
import ErrorState from "@/core/ui-states/ErrorState";

const DashboardPage = () => {
  const { data, isLoading, isError } = useGetDashboard();

  if (isLoading)
    return (
      <div>
        <DashboardSkeleton />
      </div>
    );

  if (isError || !data) return <ErrorState />;
  return (
    <div className="flex flex-col gap-5 md:gap-8">
      <StatsRow data={data?.data.overview} />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        <ProjectOverviewChart data={data?.data.project_overview.data} />
        <ActiveProjectsCard data={data.data.active_projects.items} />
        <RecentFilesCard data={data.data.recent_files.items} />
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <TasksCard data={data.data.tasks.items} />

        <TeamsCard data={data.data.teams.items} />

        <MeetingsCard data={data.data.upcoming_meetings.items} />
        <AskAICard />
      </div>
    </div>
  );
};

export default DashboardPage;
