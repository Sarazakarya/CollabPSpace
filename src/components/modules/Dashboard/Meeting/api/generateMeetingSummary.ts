import apiClient from "@/services/ApiClient";
export const generateMeetingSummary = (meetingId: number) => {
  return apiClient.post(`/meetings/${meetingId}/summary/generate`);
};
