import { LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TokenService } from "@/services/tokenService";
import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { getProfileMe } from "@/components/modules/Dashboard/Profile/api/getProfileMe";
import { useQueryClient } from "@tanstack/react-query";

export function useUserMenu() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading } = useApiQuery({
    queryKey: ["ProfileMe"],
    queryFn: getProfileMe,
  });

  const profile = data?.data?.user;

  const user = {
    name: profile?.name || "User",
    role: profile?.job_title || "",
    avatar: profile?.avatar_url || null,
    initials: (profile?.name || "U")
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((word: string) => word[0])
      .join("")
      .toUpperCase(),
  };

  const logout = () => {
    TokenService.removeToken();
    queryClient.clear();

    navigate("/sign-in", { replace: true });
  };

  const items = [
    {
      key: "profile",
      icon: User,
      onSelect: () => navigate("/profile"),
      destructive: false,
    },
    {
      key: "logout",
      icon: LogOut,
      onSelect: logout,
      destructive: true,
    },
  ] as const;

  return { user, items, isLoading };
}
