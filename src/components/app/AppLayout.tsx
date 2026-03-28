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
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-12 flex items-center justify-between border-b border-border/30 px-5 bg-background/60 backdrop-blur-md sticky top-0 z-40">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-foreground/60 hover:text-foreground transition-colors" />
              <span className="text-[9px] tracking-[0.4em] text-muted-foreground/60 font-body hidden md:block">音楽プレーヤー</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[9px] tracking-[0.3em] text-muted-foreground/50 font-body">NHACCUATU</span>
              <div className="w-[1px] h-3 bg-border/40" />
              <span className="text-[9px] tracking-wider text-muted-foreground/40 font-body">2024</span>
            </div>
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
