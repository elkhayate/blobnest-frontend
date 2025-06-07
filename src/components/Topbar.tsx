import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, Settings } from "lucide-react";
import { supabase } from "@/services/supabase";
import { useNavigate } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";
import { useUser } from "@/hooks/useUser";

export default function Topbar() {
  const { user } = useUser();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "uploader":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  };

  return (
    <header className="w-full flex justify-end items-center gap-4 p-4 border-b bg-background">
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src={user.user_metadata?.avatar_url || ''} alt={user.user_metadata?.display_name || user.email || ''} />
                <AvatarFallback>{(user.user_metadata?.display_name || user.email || 'U')[0].toUpperCase()}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex items-center justify-between">
                <span>{user.user_metadata?.display_name || user.email || 'User'}</span>
                <span className={`text-xs px-2 py-1 rounded-full capitalize ${getRoleBadgeColor(user.user_metadata?.role || 'viewer')}`}>
                  {user.user_metadata?.role || 'viewer'}
                </span>
              </div>
              <span className="font-normal text-xs">{user.email}</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/settings")}><Settings className="w-4 h-4 mr-2" />Settings</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={handleSignOut}><LogOut className="w-4 h-4 mr-2" />Sign Out</DropdownMenuItem>
            <DropdownMenuSeparator />
            <div className="px-2 py-1.5 flex items-center gap-2">
              <ModeToggle />
              <span className="text-xs text-muted-foreground">Theme</span>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
      )}
    </header>
  );
} 