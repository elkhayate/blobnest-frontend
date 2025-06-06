import { Routes, Route } from 'react-router-dom'
import Home from '@/pages/dashboard/Home'
import Login from '@/pages/auth/Login'
import SignUp from '@/pages/auth/SignUp'
import ForgotPassword from '@/pages/auth/ForgotPassword'
import ResetPassword from '@/pages/auth/ResetPassword'
import NotFound from '@/components/general/NotFound'
import RequireAuth from './RequireAuth'
import Confirmation from '../general/Confirmation'

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
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  )
}

export default RoutesConfig