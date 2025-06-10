import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 overflow-y-auto bg-muted/50 px-4 pt-2"><Outlet /></main>
      </div>
    </div>
  );
} 