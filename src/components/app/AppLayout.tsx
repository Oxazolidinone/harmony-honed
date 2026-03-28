import { useState, useCallback } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app/AppSidebar";
import MusicPlayer from "@/components/app/MusicPlayer";
import { useAuth } from "@/contexts/AuthContext";
import { usePlayer } from "@/contexts/PlayerContext";
import AppMainPage from "@/pages/app/MainPage";

const sectionLabels: Record<string, string> = {
  home: "Trang chủ",
  discover: "Khám phá",
  artists: "Nghệ sĩ",
  search: "Tìm kiếm",
  charts: "Xếp hạng",
  library: "Thư viện",
};

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
          <header className="h-11 flex items-center justify-between border-b border-border/15 px-5 bg-background/50 backdrop-blur-xl sticky top-0 z-40">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-foreground/40 hover:text-foreground transition-colors" />
              {isMainPage && (
                <span className="text-[10px] tracking-[0.3em] text-foreground/30 font-body hidden md:block">
                  {sectionLabels[activeSection]?.toUpperCase()}
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[9px] tracking-[0.3em] text-muted-foreground/30 font-body">NHACCUATU</span>
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
