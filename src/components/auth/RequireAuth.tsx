import { useLocation, Navigate, Outlet } from "react-router-dom";
import { supabase } from "../../services/supabase";
import { useState, useEffect } from "react";
import FallbackComponent from "../general/Fallback";

const RequireAuth = () => {
  const location = useLocation();
  const [checking, setChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setIsAuthenticated(!!session);
      setChecking(false);
    });

    supabase.auth.getSession().then(({ data }) => {
      setIsAuthenticated(!!data.session);
      setChecking(false);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  if (checking) return <FallbackComponent />

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default RequireAuth;
