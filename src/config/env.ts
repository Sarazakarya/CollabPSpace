export const ENV = {
  API_URL: import.meta.env.VITE_API_URL || "https://collabspace.huma-volve.com",

  API_TIMEOUT: Number(import.meta.env.VITE_API_TIMEOUT || 10000),

  APP_NAME: import.meta.env.VITE_APP_NAME || "Gather",
  APP_VERSION: import.meta.env.VITE_APP_VERSION || "v1.0",
  APP_ENV: import.meta.env.MODE,

  ACCESS_TOKEN_KEY: import.meta.env.VITE_ACCESS_TOKEN_KEY || "accessToken",
  REFRESH_TOKEN_KEY: import.meta.env.VITE_REFRESH_TOKEN_KEY || "refreshToken",
} as const;
