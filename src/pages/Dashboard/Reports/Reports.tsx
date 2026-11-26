import ReportsPage from "@/components/modules/Dashboard/Reports/organisms/ReportsPage";
import Seo from "@/core/seo/Seo";

const Reports = () => {
  return (
    <>
      <Seo
        title="Reports | Collabspace"
        description="Manage your projects, tasks, meetings and teams in one place."
        keywords={["Dashboard", "Projects", "Tasks", "Teams", "Meeting"]}
        noIndex
      />
      <ReportsPage />
    </>
  );
};

export default Reports;
