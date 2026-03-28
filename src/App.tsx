import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { PlayerProvider } from "@/contexts/PlayerContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AppLayout from "./components/app/AppLayout";
import PlaylistDetail from "./pages/app/PlaylistDetail";
import AlbumDetail from "./pages/app/AlbumDetail";
import ArtistDetail from "./pages/app/ArtistDetail";
import AppSettings from "./pages/app/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <PlayerProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/app" element={<AppLayout />}>
                <Route index element={<></>} />
                <Route path="playlist/:id" element={<PlaylistDetail />} />
                <Route path="album/:id" element={<AlbumDetail />} />
                <Route path="artist/:id" element={<ArtistDetail />} />
                <Route path="settings" element={<AppSettings />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </PlayerProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
