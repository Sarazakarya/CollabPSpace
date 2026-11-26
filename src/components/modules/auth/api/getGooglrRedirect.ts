import apiClient from "@/services/ApiClient";
import type { GoogleRedirectResponse } from "../types/Logintype";

export const getGoogleRedirect = async () => {
  return apiClient.get<GoogleRedirectResponse>("auth/social/google/redirect");
};
