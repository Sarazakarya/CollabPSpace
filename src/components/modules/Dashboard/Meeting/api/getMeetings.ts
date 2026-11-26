import apiClient from "@/services/ApiClient";
import type { ApiBody, Meeting } from "../types/MeetingTypes";
import { extractList, toMeeting } from "../utils/meetingMappers";

export const getMeetings = async (): Promise<Meeting[]> => {
  const res = (await apiClient.get("/meetings?per_page=100")) as unknown as ApiBody;
  return extractList(res).map(toMeeting);
};
