import apiClient from "@/services/ApiClient";
import type { LoginPayload, LoginResponse } from "../types/Logintype";

export async function getSignin({ data }: { data: LoginPayload }) {
  return await apiClient.post<LoginResponse>("/auth/login", data);
}
