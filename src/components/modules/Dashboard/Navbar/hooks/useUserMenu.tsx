import { LogOut, Pencil, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TokenService } from "@/services/tokenService";

const user = { name: "Mohamed Salah", role: "UI/UX", initials: "MS" };

export function useUserMenu() {
  const navigate = useNavigate();

  const logout = () => {
    TokenService.removeToken();
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
      key: "edit",
      icon: Pencil,
      onSelect: () => navigate("/profile/edit"),
      destructive: false,
    },
    { key: "logout", icon: LogOut, onSelect: logout, destructive: true },
  ] as const;

  return { user, items };
}
