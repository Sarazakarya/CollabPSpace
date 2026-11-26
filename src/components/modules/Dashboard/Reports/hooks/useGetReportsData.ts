import { useState } from "react";
import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { getProjectReports } from "../api/getProjectReports";
import { getTaskReports } from "../api/getTaskReports";
import { getTeamReports } from "../api/getTeamReports";
import { getUserReports } from "../api/getUserReports";

export function useGetReportsData() {
  const [selectedProjectId, setSelectedProjectId] = useState<string>("all");
  const [activityPeriod, setActivityPeriod] = useState<string>("monthly");

  const projectParams =
    selectedProjectId !== "all" ? { project_id: selectedProjectId } : undefined;

  const projectsQuery = useApiQuery({
    queryKey: ["ReportsProjects", selectedProjectId],
    queryFn: () => getProjectReports(projectParams),
  });

  const tasksQuery = useApiQuery({
    queryKey: ["ReportsTasks"],
    queryFn: () => getTaskReports(),
  });

  const teamsQuery = useApiQuery({
    queryKey: ["ReportsTeams"],
    queryFn: () => getTeamReports(),
  });

  const usersQuery = useApiQuery({
    queryKey: ["ReportsUsers", activityPeriod],
    queryFn: () => getUserReports({ period: activityPeriod }),
  });

  return {
    selectedProjectId,
    setSelectedProjectId,
    activityPeriod,
    setActivityPeriod,
    projectsQuery,
    tasksQuery,
    teamsQuery,
    usersQuery,
    isLoading:
      projectsQuery.isLoading ||
      tasksQuery.isLoading ||
      teamsQuery.isLoading ||
      usersQuery.isLoading,
  };
}
