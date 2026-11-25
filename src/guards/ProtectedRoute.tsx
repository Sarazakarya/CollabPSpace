// guards/ProtectedRoute.tsx
import { TokenService } from "@/services/tokenService";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoute() {
  const location = useLocation();

  if (!TokenService.hasToken()) {
    return <Navigate to="/sign-in" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
