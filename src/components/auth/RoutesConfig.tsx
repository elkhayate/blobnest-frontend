import { Routes, Route } from 'react-router-dom';
import Settings from '@/pages/internal/Settings';
import Login from '@/pages/auth/Login';
import SignUp from '@/pages/auth/SignUp';
import ForgotPassword from '@/pages/auth/ForgotPassword';
import ResetPassword from '@/pages/auth/ResetPassword';
import NotFound from '@/components/general/NotFound';
import RequireAuth from './RequireAuth';
import Confirmation from '../general/Confirmation';
import DashboardLayout from "@/layouts/DashboardLayout";
import Dashboard from '@/pages/maintenance/Dashboard';
import Containers from '@/pages/maintenance/Containers';
import Files from '@/pages/maintenance/Files';
import AuditLogs from '@/pages/maintenance/AuditLogs';
import Users from '@/pages/internal/Users';
import LandingPage from '@/pages/landing/LandingPage';
import { AuthRedirect } from './AuthRedirect';
import { ProtectedRoute } from '../ProtectedRoute';
import Unauthorized from '../general/Unauthorized';
import { Suspense, type JSX } from 'react';
import FallbackComponent from '../general/Fallback';

interface RouteConfig {
  path: string;
  element: JSX.Element;
  roles?: string[];
}

const publicRoutes: RouteConfig[] = [
  { path: '/', element: <AuthRedirect><LandingPage /></AuthRedirect> },
  { path: '*', element: <NotFound /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  { path: '/forgot-password', element: <ForgotPassword /> },
  { path: '/reset-password', element: <ResetPassword /> },
  { path: '/confirmation', element: <Confirmation /> },
  { path: '/unauthorized', element: <Unauthorized /> }
];

const protectedRoutes: RouteConfig[] = [
  { path: '/dashboard', element: <Dashboard />, roles: ['viewer', 'admin', 'uploader'] },
  { path: '/settings', element: <Settings />, roles: ['admin', 'uploader', 'viewer'] },
  { path: '/containers', element: <Containers />, roles: ['viewer', 'admin', 'uploader'] },
  { path: '/files', element: <Files />, roles: ['viewer', 'admin', 'uploader'] },
  { path: '/audit-logs', element: <AuditLogs />, roles: ['admin', 'uploader', 'viewer'] },
  { path: '/users', element: <Users />, roles: ['admin'] },
];

const RoutesConfig: React.FC = () => {
  return (
    <Suspense fallback={<FallbackComponent />}>
    <Routes>
      {publicRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}

      <Route element={<RequireAuth />}>
        <Route element={<DashboardLayout />}>
          {protectedRoutes.map(({ path, element, roles }) => (
            <Route
              key={path}
              path={path}
              element={
                <ProtectedRoute allowedRoles={roles || []}>
                  {element}
                </ProtectedRoute>
              }
            />
          ))}
        </Route>
      </Route>
    </Routes>
    </Suspense>
  );
};

export default RoutesConfig;