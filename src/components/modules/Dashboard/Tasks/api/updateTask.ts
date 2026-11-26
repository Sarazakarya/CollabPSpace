import apiClient from "@/services/ApiClient";
import type { CreateTaskFormValues } from "../types/Taskstype";

export const updateTask = (taskId: number, values: CreateTaskFormValues) => {
  return apiClient.put(`/tasks/${taskId}`, {
    name: values.name,
    priority: values.priority,
    status: values.status,
    assigned_to: values.assigned_to ?? undefined,
    ...(values.description && { description: values.description }),
    ...(values.due_date && { due_date: values.due_date }),
  });
};
