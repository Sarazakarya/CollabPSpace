import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { getProfileMe } from "../api/getProfileMe";
import { getProfileTasks } from "../api/getProfileTasks";
import { getProfileFiles } from "../api/getProfileFiles";

export function useGetProfileData() {
  const meQuery = useApiQuery({
    queryKey: ["ProfileMe"],
    queryFn: getProfileMe,
  });

  const tasksQuery = useApiQuery({
    queryKey: ["ProfileTasks"],
    queryFn: getProfileTasks,
  });

  const filesQuery = useApiQuery({
    queryKey: ["ProfileFiles"],
    queryFn: getProfileFiles,
  });

  return {
    meQuery,
    tasksQuery,
    filesQuery,
    isLoading:
      meQuery.isLoading || tasksQuery.isLoading || filesQuery.isLoading,
  };
}
