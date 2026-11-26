import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { getProjectTeams } from "../api/getProjectTeams";

const useGetProjectTeams = (projectId: string) => {
  return useApiQuery({
    queryKey: ["projects", projectId, "teams"],
    queryFn: () => getProjectTeams(projectId),
    options: {
      enabled: !!projectId,
    },
  });
};

export default useGetProjectTeams;
