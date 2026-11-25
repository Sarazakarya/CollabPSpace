import DashboardPage from "@/components/modules/Dashboard/components/organisms/DashboardPage";
import Seo from "@/core/seo/Seo";

const Dashboard = () => {
  return (
    <>
      <Seo
        title="Dashboard | Collabspace"
        description="Manage your projects, tasks, meetings and teams in one place."
        keywords={["Dashboard", "Projects", "Tasks", "Teams", "Collabspace"]}
        noIndex
      />

      <DashboardPage />
    </>
  );
};

export default Dashboard;
