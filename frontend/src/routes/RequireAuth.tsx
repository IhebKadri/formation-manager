import { tokenStorage } from "@/services";
import { Navigate, Outlet } from "react-router-dom";

export const RequireAuth = () => {
  const accessToken = tokenStorage.getAccessToken();

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
