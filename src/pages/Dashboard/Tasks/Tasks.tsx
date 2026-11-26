import TasksPage from "@/components/modules/Dashboard/Tasks/organisms/TasksPage";
import Seo from "@/core/seo/Seo";

const Tasks = () => {
  return (
    <>
      <Seo
        title=" Tasks | Collabspace"
        description="Manage your projects, tasks, meetings and teams in one place."
        keywords={["Dashboard", "Projects", "Tasks", "Teams", "Meeting"]}
        noIndex
      />
      <TasksPage />
    </>
  );
};

export default Tasks;
