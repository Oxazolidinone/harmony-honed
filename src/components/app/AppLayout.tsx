import { useState, useCallback } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app/AppSidebar";
import MusicPlayer from "@/components/app/MusicPlayer";
import { useAuth } from "@/contexts/AuthContext";
import { usePlayer } from "@/contexts/PlayerContext";
import AppMainPage from "@/pages/app/MainPage";

const AppLayout = () => {
  const { isAuthenticated } = useAuth();
  const { currentSong } = usePlayer();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("home");

  const handleActiveSection = useCallback((id: string) => {
    setActiveSection(id);
  }, []);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  const isMainPage = location.pathname === "/app";

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar activeSection={isMainPage ? activeSection : undefined} />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-12 flex items-center justify-between border-b border-border/20 px-5 bg-background/60 backdrop-blur-md sticky top-0 z-40">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-foreground/60 hover:text-foreground transition-colors" />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[9px] tracking-[0.3em] text-muted-foreground/40 font-body">NHACCUATU</span>
              <div className="w-[1px] h-3 bg-border/30" />
              <span className="text-[9px] tracking-wider text-muted-foreground/30 font-body">2024</span>
            </div>
          </header>
          <main className={`flex-1 overflow-y-auto scroll-smooth ${currentSong ? "pb-24" : ""}`}>
            {isMainPage ? (
              <AppMainPage onActiveSection={handleActiveSection} />
            ) : (
              <Outlet />
            )}
          </main>
        </div>
      </div>
      <MusicPlayer />
    </SidebarProvider>
  );
};

export default AppLayout;
