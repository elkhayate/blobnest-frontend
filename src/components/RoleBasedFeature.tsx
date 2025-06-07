import { ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";

interface RoleBasedFeatureProps {
  children: ReactNode;
  allowedRoles: string | string[];
  fallback?: ReactNode;
}

export function RoleBasedFeature({
  children,
  allowedRoles,
  fallback = null
}: RoleBasedFeatureProps) {
  const { hasRole } = useAuth();

  if (!hasRole(allowedRoles)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

// Example usage:
// <RoleBasedFeature allowedRoles={["admin"]}>
//   <button>Admin Only Action</button>
// </RoleBasedFeature> 