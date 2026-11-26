import apiClient from "@/services/ApiClient";
import type { CreateTaskPayload } from "../types/TaskType";

export const updateTask = (taskId: number, values: CreateTaskPayload) => {
  return apiClient.put(`/tasks/${taskId}`, values);
};
