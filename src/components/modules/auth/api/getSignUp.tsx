import apiClient from "@/services/ApiClient";
import type { RegisterPayload, RegisterResponse } from "../types/SignUptype";

export async function getSignUp({ data }: { data: RegisterPayload }) {
  return await apiClient.post<RegisterResponse>("/auth/register", data);
}
