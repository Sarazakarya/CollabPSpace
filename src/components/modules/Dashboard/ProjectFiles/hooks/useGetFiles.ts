import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { getFiles } from "../api/getFiles";

const useGetFiles = (projectId: string) => {
  return useApiQuery({
    queryKey: ["projects", projectId, "files"],
    queryFn: () => getFiles(projectId),
    options: {
      enabled: !!projectId,
    },
  });
};

export default useGetFiles;
