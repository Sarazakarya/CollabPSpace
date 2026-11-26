import apiClient from "@/services/ApiClient";
import type { ApiBody, Meeting } from "../types/MeetingTypes";
import { toMeeting } from "../utils/meetingMappers";

export const getMeeting = async (meetingId: number): Promise<Meeting> => {
  const res = (await apiClient.get(`/meetings/${meetingId}`)) as unknown as ApiBody;
  return toMeeting(res?.data?.meeting ?? res?.data ?? {});
};
