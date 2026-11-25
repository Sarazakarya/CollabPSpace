import { ENV } from "@/config/env";
import axios, { type AxiosInstance, type AxiosResponse } from "axios";
import { TokenService } from "./tokenService";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${ENV.API_URL}/api/v1`,
  timeout: ENV.API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = TokenService.getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response?.status === 401) {
      TokenService.removeToken();

      if (location.pathname !== "/sign-in") {
        window.location.href = "/sign-in";
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
