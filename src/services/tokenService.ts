import Cookies from "js-cookie";
import { ENV } from "@/config/env";

const TOKEN_KEY = ENV.ACCESS_TOKEN_KEY;
export const TokenService = {
  setToken: (token: string, remember: boolean) => {
    Cookies.set(TOKEN_KEY, token, {
      ...(remember && { expires: 7 }),
      path: "/",
      secure: location.protocol === "https:",
      sameSite: "lax",
    });
  },
  getToken: () => Cookies.get(TOKEN_KEY),
  removeToken: () => Cookies.remove(TOKEN_KEY, { path: "/" }),
  hasToken: () => !!Cookies.get(TOKEN_KEY),
};
