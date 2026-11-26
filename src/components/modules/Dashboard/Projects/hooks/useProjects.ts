import { getProjects } from "../api/getProjects";
import type { GetProjectsParams } from "../types/Projecttypes";
import { useApiQuery } from "@/shared/hooks/useApiQuery";

export function useProjects(params: GetProjectsParams) {
  return useApiQuery({
    queryKey: ["projects", params],
    queryFn: () => getProjects(params),
  });
}
