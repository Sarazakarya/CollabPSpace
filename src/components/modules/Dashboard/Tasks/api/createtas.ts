import apiClient from "@/services/ApiClient";
import type { CreateTaskPayload } from "../types/Taskstype";

export const createTask = (values: CreateTaskPayload) => {
  return apiClient.post("/tasks", values);
};