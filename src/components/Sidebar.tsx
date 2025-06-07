import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FileText, UploadCloud, Archive, List, LayoutDashboard, File, BookOpen, Users, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate, useLocation } from "react-router-dom";

const menu = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/" },
  { label: "Users", icon: Users, path: "/users" },
  { label: "My Files", icon: FileText, path: "/my-files" },
  { label: "Files", icon: File, path: "/files" },
  { label: "Shared Files", icon: BookOpen, path: "/shared-files" },
  { label: "Upload", icon: UploadCloud, path: "/upload" },
  { label: "Containers", icon: Archive, path: "/containers" },
  { label: "Audit Logs", icon: List, path: "/audit-logs" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Mobile sidebar overlay
  return (
    <>
      {/* Hamburger menu for mobile */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-40 md:hidden"
        onClick={() => setOpen(true)}
      >
        <Menu className="w-6 h-6" />
      </Button>
      {/* Sidebar overlay for mobile */}
      <div
        className={cn(
          "fixed inset-0 z-30 md:hidden transition-all",
          open ? "block" : "hidden"
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setOpen(false)}
        />
        {/* Sidebar panel */}
        <aside
          className={cn(
            "absolute left-0 top-0 h-full bg-background border-r shadow-lg w-64 flex flex-col z-40 transition-transform duration-300",
            open ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex items-center justify-between p-4">
            <span className="font-bold text-lg">BlobNest</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(false)}
              className="ml-2"
            >
              &#10005;
            </Button>
          </div>
          <Separator />
          <nav className="flex-1 overflow-y-auto mt-2">
            {menu.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-2 rounded-none justify-start transition-all",
                  location.pathname === item.path && "bg-primary/10 text-primary"
                )}
                onClick={() => { navigate(item.path); setOpen(false); }}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Button>
            ))}
          </nav>
          <div className="p-4 mt-auto">
            <Separator />
            <div className="mt-4 text-xs text-muted-foreground text-center">BlobNest v1.0.0 - 2025</div>
          </div>
        </aside>
      </div>
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "h-screen bg-background border-r transition-all duration-300 flex-col hidden md:flex",
          collapsed ? "w-20" : "w-64"
        )}
      >
        <div className="flex items-center justify-between p-4">
          {!collapsed && <span className={cn("font-bold text-lg transition-opacity", collapsed && "opacity-0 pointer-events-none")}>BlobNest</span>}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed((c) => !c)}
            className="ml-2"
          >
            {collapsed ? <span>&#9654;</span> : <span>&#9664;</span>}
          </Button>
        </div>
        <Separator />
        <nav className="flex-1 overflow-y-auto mt-2">
          {menu.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              className={cn(
                "w-full flex items-center gap-3 px-4 py-2 rounded-none justify-start transition-all",
                collapsed && "justify-center px-2",
                location.pathname === item.path && "bg-primary/10 text-primary"
              )}
              onClick={() => navigate(item.path)}
            >
              <item.icon className="w-5 h-5" />
              {!collapsed && <span className={cn("transition-opacity", collapsed && "opacity-0 pointer-events-none")}>{item.label}</span>}
            </Button>
          ))}
        </nav>
        {!collapsed && <div className="p-4 mt-auto">
          <Separator />
          <div className={cn("mt-4 text-xs text-muted-foreground transition-opacity text-center", collapsed && "opacity-0 pointer-events-none")}>BlobNest v1.0.0 - 2025</div>
        </div>}
      </aside>
    </>
  );
}