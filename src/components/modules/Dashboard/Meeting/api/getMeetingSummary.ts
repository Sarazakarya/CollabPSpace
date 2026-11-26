import { isAxiosError } from "axios";
import apiClient from "@/services/ApiClient";
import type { ApiBody, MeetingSummary } from "../types/MeetingTypes";
import { toSummary } from "../utils/meetingMappers";

export const getMeetingSummary = async (meetingId: number): Promise<MeetingSummary | null> => {
  try {
    const res = (await apiClient.get(`/meetings/${meetingId}/summary`)) as unknown as ApiBody;
    return toSummary(res);
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 404) return null;
    throw error;
  }
};
