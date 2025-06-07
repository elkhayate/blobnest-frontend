import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useUser } from "@/hooks/useUser";
import FallbackComponent from "../general/Fallback";

const RequireAuth = () => {
  const location = useLocation();
  const { user, loading } = useUser();

  if (loading) return <FallbackComponent />;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default RequireAuth;
