import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { getProjectTasks } from "../api/getProjectTasks";

const useGetProjectTasks = (id: string) => {
  return useApiQuery({
    queryKey: ["projects", id, "tasks"],
    queryFn: () => getProjectTasks(id),
    options: {
      enabled: !!id,
    },
  });
};

export default useGetProjectTasks;
