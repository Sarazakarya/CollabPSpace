import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { getProjectOverview } from "../api/getProjectOverview";

const useGetProjectOverview = (id: string) => {
  return useApiQuery({
    queryKey: ["projects", "overview", id],
    queryFn: () => getProjectOverview(id),
    options: {
      enabled: !!id,
    },
  });
};

export default useGetProjectOverview;
