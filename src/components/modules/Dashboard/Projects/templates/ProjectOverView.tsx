import { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import ProjectOverViewHeader from "../../ProjectOverView/molecule/ProjectOverViewHeader";
import useGetProjectOverview from "../../ProjectOverView/hooks/useGetProjectOverview";
import EmptyState from "@/core/ui-states/EmptyState";

const ProjectOverView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetProjectOverview(id ?? "");

  const project = data?.data;

  useEffect(() => {
    navigate(".", { replace: true });
  }, []);

  if (isError) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-6">
     
      {project && <ProjectOverViewHeader project={project} />}

      <Outlet context={{ project, isLoading }} />
    </div>
  );
};

export default ProjectOverView;
