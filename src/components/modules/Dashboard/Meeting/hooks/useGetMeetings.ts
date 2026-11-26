import { useQuery } from "@tanstack/react-query";
import { getMeetings } from "../api/getMeetings";
import { meetingKeys } from "./meetingKeys";

const useGetMeetings = () =>
  useQuery({ queryKey: meetingKeys.list, queryFn: getMeetings });

export default useGetMeetings;
