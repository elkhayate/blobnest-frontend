import { Button } from "@/components/ui/button";
import { supabase } from "@/services/supabase"
import { useNavigate } from "react-router-dom"

export default function Home() {
  const navigate = useNavigate()
  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate("/login")
  }
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Welcome to BlobNest</h1>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    );
  }
  