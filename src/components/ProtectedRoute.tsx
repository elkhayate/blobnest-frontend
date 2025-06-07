import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: string[];
  fallbackPath?: string;
}

export function ProtectedRoute({
  children,
  allowedRoles,
  fallbackPath = "/unauthorized"
}: ProtectedRouteProps) {
  const { user, loading, hasRole } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || !hasRole(allowedRoles)) {
    return <Navigate to={fallbackPath} replace />;
  }

  return <>{children}</>;
} 