import { Home, Search, Library, Settings, LogOut, Crown, Disc3, TrendingUp, Music } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

const mainNav = [
  { title: "Trang chủ", id: "home", icon: Home },
  { title: "Khám phá", id: "discover", icon: Disc3 },
  { title: "Nghệ sĩ", id: "artists", icon: Music },
  { title: "Tìm kiếm", id: "search", icon: Search },
  { title: "Xếp hạng", id: "charts", icon: TrendingUp },
  { title: "Thư viện", id: "library", icon: Library },
];

interface AppSidebarProps {
  activeSection?: string;
}

export function AppSidebar({ activeSection }: AppSidebarProps) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const scrollToSection = (id: string) => {
    // If we're on a detail page, navigate back to main first
    if (window.location.pathname !== "/app") {
      navigate("/app");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-border/30 bg-card/20 backdrop-blur-sm">
      <SidebarContent className="pt-6">
        {/* Logo */}
        <div className="px-4 mb-8">
          <button
            onClick={() => scrollToSection("home")}
            className="font-display text-lg tracking-[0.3em] text-foreground block text-left"
          >
            {collapsed ? "N" : "NHACCUATU"}
          </button>
          {!collapsed && (
            <p className="text-[9px] tracking-[0.2em] text-muted-foreground/40 font-body mt-1">Where Sound Becomes Art</p>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-[9px] tracking-[0.4em] text-muted-foreground/50 font-body mb-1">
            {!collapsed && "MENU"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => scrollToSection(item.id)}
                    className={`rounded-xl hover:bg-muted/40 transition-all cursor-pointer ${
                      activeSection === item.id ? "bg-muted/60 text-primary" : ""
                    }`}
                  >
                    <item.icon className="mr-3 h-4 w-4" />
                    {!collapsed && <span className="text-sm font-body">{item.title}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Decorative separator */}
        {!collapsed && (
          <div className="mx-4 my-4 flex items-center gap-3">
            <div className="flex-1 h-[0.5px] bg-border/20" />
            <span className="text-[8px] text-primary/20">✦</span>
            <div className="flex-1 h-[0.5px] bg-border/20" />
          </div>
        )}

        <SidebarGroup>
          <SidebarGroupLabel className="text-[9px] tracking-[0.4em] text-muted-foreground/50 font-body mb-1">
            {!collapsed && "OTHER"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => navigate("/app/settings")}
                  className="rounded-xl hover:bg-muted/40 transition-all cursor-pointer"
                >
                  <Settings className="mr-3 h-4 w-4" />
                  {!collapsed && <span className="text-sm font-body">Cài đặt</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Premium upsell */}
        {user?.plan === "free" && !collapsed && (
          <div className="mx-3 mt-6 p-4 border border-primary/15 bg-primary/5 rounded-2xl">
            <div className="flex items-center gap-2 mb-2">
              <Crown size={14} className="text-primary" />
              <span className="text-xs font-display italic text-foreground">Nâng cấp Premium</span>
            </div>
            <p className="text-[10px] text-muted-foreground/60 leading-relaxed mb-3 font-body">
              Nghe nhạc không giới hạn, không quảng cáo
            </p>
            <button
              onClick={() => navigate("/app/settings")}
              className="w-full text-[10px] py-2.5 bg-foreground text-background hover:bg-foreground/90 transition-colors tracking-[0.2em] rounded-xl font-body"
            >
              TÌM HIỂU THÊM
            </button>
          </div>
        )}
      </SidebarContent>

      <SidebarFooter className="p-3 border-t border-border/15">
        {user && (
          <div className="flex items-center gap-3 p-2">
            <img src={user.avatar} alt="" className="w-8 h-8 rounded-full object-cover flex-shrink-0 ring-1 ring-border/20" />
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-display italic text-foreground truncate">{user.name}</p>
                <p className="text-[9px] text-muted-foreground/40 font-body tracking-wider truncate">{user.plan === "premium" ? "PREMIUM" : "FREE"}</p>
              </div>
            )}
            {!collapsed && (
              <button onClick={logout} className="text-muted-foreground/40 hover:text-foreground transition-colors">
                <LogOut size={13} />
              </button>
            )}
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
