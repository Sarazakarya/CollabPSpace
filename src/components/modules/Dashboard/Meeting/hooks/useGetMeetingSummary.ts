import { useQuery } from "@tanstack/react-query";
import { getMeetingSummary } from "../api/getMeetingSummary";
import { meetingKeys } from "./meetingKeys";

const useGetMeetingSummary = (meetingId: number) =>
  useQuery({
    queryKey: meetingKeys.summary(meetingId),
    queryFn: () => getMeetingSummary(meetingId),
    retry: false,
  });

export default useGetMeetingSummary;
