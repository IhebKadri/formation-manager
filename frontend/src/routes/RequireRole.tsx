import { useProfile } from "@/features/profile/hooks";
import { Loader2 } from "lucide-react";
import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import type { UserRole } from "@/types";

interface RequireRoleProps {
  roles: UserRole[];
  children: ReactNode;
}

export const RequireRole = ({ roles, children }: RequireRoleProps) => {
  const { data: user, isLoading } = useProfile();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};
