import ProjectDescriptionCard from "../molecule/ProjectDescriptionCard";
import { useOverViewProject } from "../hooks/useOverViewProject";
import TeamMembersCard from "../molecule/TeamMembersCard";
import ProjectProgressCard from "../molecule/ProjectProgressCard";
import ProjectChartCard from "../molecule/ProjectChartCard";
import ProjectDetailsCard from "../molecule/ProjectDetailsCard";
import ProjectOverviewSkeleton from "../molecule/ProjectOverviewSkeleton";
import Seo from "@/core/seo/Seo";

const ProjectOverview = () => {
  const { project, isLoading } = useOverViewProject();

  if (isLoading) return <ProjectOverviewSkeleton />;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <Seo
        title="Projects OverView | Collabspace"
        description="Manage your projects, tasks, meetings and teams in one place."
        keywords={["Dashboard", "Projects", "Tasks", "Teams", "Meeting"]}
        noIndex
      />
      <div className="space-y-6 lg:col-span-2">
        <ProjectDescriptionCard description={project.description} />
        <ProjectChartCard chart={project.chart} />
        <ProjectDetailsCard project={project} />
      </div>

      <div className="space-y-6">
        <ProjectProgressCard
          progress={project.progress_percentage}
          stats={project.tasks_statistics}
        />
        <TeamMembersCard members={project.direct_members} />
      </div>
    </div>
  );
};

export default ProjectOverview;
