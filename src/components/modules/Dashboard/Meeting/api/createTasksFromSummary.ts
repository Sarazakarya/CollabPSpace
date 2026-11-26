import apiClient from "@/services/ApiClient";

export const createTasksFromSummary = (meetingId: number) => {
  return apiClient.post(`/meetings/${meetingId}/summary/create-tasks`, {
    default_priority: "Medium",
  });
};
