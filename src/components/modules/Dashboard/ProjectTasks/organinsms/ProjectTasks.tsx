import { useParams } from "react-router-dom";
import ErrorState from "@/core/ui-states/ErrorState";
import useGetProjectTasks from "../hooks/usegetProjectTasks";
import KanbanBoard from "../molecule/KanbanBoard";
import ProjectTasSkeleton from "../molecule/ProjectTasSkeleton";
import Seo from "@/core/seo/Seo";

const ProjectTasks = () => {
  const { id = "" } = useParams();
  const { data, isLoading, isError } = useGetProjectTasks(id);

  const columns = data?.data?.columns;

  if (isLoading) {
    return <ProjectTasSkeleton />;
  }

  if (isError || !columns) {
    return <ErrorState />;
  }

  return (
    <>
      {" "}
      <Seo
        title="Projects tasks | Collabspace"
        description="Manage your projects, tasks, meetings and teams in one place."
        keywords={["Dashboard", "Projects", "Tasks", "Teams", "Meeting"]}
        noIndex
      />
      <KanbanBoard columns={columns} />;
    </>
  );
};

export default ProjectTasks;
