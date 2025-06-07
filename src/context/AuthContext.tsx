import { createContext, useContext, type ReactNode } from "react";
import { useUser, type UserWithRole } from "@/hooks/useUser";

interface AuthContextType {
  user: UserWithRole | null;
  loading: boolean;
  hasRole: (roles: string | string[]) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { user, loading } = useUser();

  const hasRole = (roles: string | string[]) => {
    if (!user?.user_metadata?.role) return false;
    const userRole = user.user_metadata.role;
    return Array.isArray(roles) ? roles.includes(userRole) : roles === userRole;
  };

  return (
    <AuthContext.Provider value={{ user, loading, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
} 