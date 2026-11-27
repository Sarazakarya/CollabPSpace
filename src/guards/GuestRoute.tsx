import { TokenService } from "@/services/tokenService";
import { Navigate, Outlet } from "react-router-dom";

export default function GuestRoute() {
  if (TokenService.hasToken()) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
