import AllProjects from "@/components/modules/Dashboard/Projects/organisms/AllProjects";
import Seo from "@/core/seo/Seo";

const Projects = () => {
  return (
    <>
      <Seo
        title="Projects | Collabspace"
        description="Manage your projects, tasks, meetings and teams in one place."
        keywords={["Dashboard", "Projects", "Tasks", "Teams", "Meeting"]}
        noIndex
      />
      <AllProjects />
    </>
  );
};

export default Projects;
