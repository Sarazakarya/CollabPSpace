import { useQuery } from "@tanstack/react-query";
import { getProjectMembers } from "../api/getProjectMembers";
import { meetingKeys } from "./meetingKeys";

const useGetProjectMembers = (projectId: number) =>
  useQuery({
    queryKey: meetingKeys.members(projectId),
    queryFn: () => getProjectMembers(projectId),
    enabled: projectId > 0,
  });

export default useGetProjectMembers;
