import { useQuery } from "@tanstack/react-query";
import { getMeetingProjects } from "../api/getMeetingProjects";
import { meetingKeys } from "./meetingKeys";

const useGetMeetingProjects = (enabled = true) =>
  useQuery({ queryKey: meetingKeys.projects, queryFn: getMeetingProjects, enabled });

export default useGetMeetingProjects;
