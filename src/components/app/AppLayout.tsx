import { Outlet, Navigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app/AppSidebar";
import MusicPlayer from "@/components/app/MusicPlayer";
import { useAuth } from "@/contexts/AuthContext";
import { usePlayer } from "@/contexts/PlayerContext";

const AppLayout = () => {
  const { isAuthenticated } = useAuth();
  const { currentSong } = usePlayer();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center border-b border-border px-4 bg-background/80 backdrop-blur-sm sticky top-0 z-40">
            <SidebarTrigger className="mr-4" />
          </header>
          <main className={`flex-1 overflow-y-auto ${currentSong ? "pb-24" : ""}`}>
            <Outlet />
          </main>
        </div>
      </div>
      <MusicPlayer />
    </SidebarProvider>
  );
};

export default AppLayout;
