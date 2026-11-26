import { useQuery } from "@tanstack/react-query";
import { getMeeting } from "../api/getMeeting";
import { meetingKeys } from "./meetingKeys";

const useGetMeeting = (meetingId: number) =>
  useQuery({
    queryKey: meetingKeys.detail(meetingId),
    queryFn: () => getMeeting(meetingId),
    enabled: Number.isFinite(meetingId),
  });

export default useGetMeeting;
