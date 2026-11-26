import apiClient from "@/services/ApiClient";
import type { ApiBody, CurrentUser } from "../types/ChatTypes";

export const getCurrentUser = async (): Promise<CurrentUser> => {
  const res = (await apiClient.get("/auth/me")) as unknown as ApiBody;
  const user = res?.data?.user ?? res?.data ?? {};

  const roles: string[] = (user.roles ?? []).map((role: string | { name: string }) =>
    typeof role === "string" ? role : role.name,
  );

  return { id: user.id, isAdmin: roles.includes("Administrator") };
};
