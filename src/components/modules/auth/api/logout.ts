
import apiClient from "@/services/ApiClient";
import type { LogoutResponse } from "../types/logOuttype";


export const logout = async (): Promise<LogoutResponse> => {
  return await apiClient.post<LogoutResponse>("/auth/logout");

};