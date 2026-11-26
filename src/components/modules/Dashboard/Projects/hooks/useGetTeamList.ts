import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { getListTeams } from "../api/getListTeam";

export function useGetTeamList() {
  return useApiQuery({
    queryKey: ["TeamsList"],
    queryFn: getListTeams,
  });
}
