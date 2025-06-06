import { Routes, Route } from 'react-router-dom'
import Settings from '@/pages/internal/Settings'
import Login from '@/pages/auth/Login'
import SignUp from '@/pages/auth/SignUp'
import ForgotPassword from '@/pages/auth/ForgotPassword'
import ResetPassword from '@/pages/auth/ResetPassword'
import NotFound from '@/components/general/NotFound'
import RequireAuth from './RequireAuth'
import Confirmation from '../general/Confirmation'
import DashboardLayout from "@/layouts/DashboardLayout";
import Dashboard from '@/pages/maintenance/Dashboard'
import Containers from '@/pages/maintenance/Containers'
import MyFiles from '@/pages/maintenance/MyFiles'
import Files from '@/pages/maintenance/Files'
import Upload from '@/pages/maintenance/Upload'
import SharedFiles from '@/pages/maintenance/SharedFiles'

const RoutesConfig: React.FC = () => {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/confirmation" element={<Confirmation />} />
      
      <Route element={<RequireAuth />}>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/containers" element={<Containers />} />
          <Route path="/files" element={<Files />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/shared-files" element={<SharedFiles />} />
          <Route path="/my-files" element={<MyFiles />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default RoutesConfig