import axios from "axios"
import { supabase } from "@/services/supabase"
axios.defaults.baseURL = import.meta.env.VITE_API_URL

axios.interceptors.request.use(async (config) => {
  const { data } = await supabase.auth.getSession()
  const token = data.session?.access_token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default axios    