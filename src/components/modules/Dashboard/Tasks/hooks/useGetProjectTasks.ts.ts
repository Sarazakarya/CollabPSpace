import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { getProjectTasks } from "../api/getProjectsTasks";


const useGetProjectTasks = (projectId: number) => {
  return useApiQuery({
    queryKey: ["projects", projectId, "tasks"],
    queryFn: () =>
      getProjectTasks({
        project_id: projectId,
        per_page: 100,
      }),
    options: {
      enabled: !!projectId,
    },
  });
};

export default useGetProjectTasks;
