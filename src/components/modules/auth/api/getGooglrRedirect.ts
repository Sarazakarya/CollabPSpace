import apiClient from "@/services/ApiClient";

export interface GoogleRedirectResponse {
  success: boolean;
  message: string;
  data: {
    provider: string;
    authorization_url: string;
  };
}

export const getGoogleRedirect = async () => {
  return apiClient.get<GoogleRedirectResponse>("auth/social/google/redirect");
};
