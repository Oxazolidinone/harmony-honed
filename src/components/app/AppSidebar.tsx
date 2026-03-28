import { Home, Search, Library, Settings, LogOut, Crown } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation, useNavigate } from "react-router-dom";
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
  { title: "Trang chủ", sub: "ホーム", url: "/app", icon: Home },
  { title: "Tìm kiếm", sub: "検索", url: "/app/search", icon: Search },
  { title: "Thư viện", sub: "図書館", url: "/app/library", icon: Library },
];

const settingsNav = [
  { title: "Cài đặt", sub: "設定", url: "/app/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar collapsible="icon" className="border-r border-border/30 bg-card/20 backdrop-blur-sm">
      <SidebarContent className="pt-6">
        {/* Logo */}
        <div className="px-4 mb-10">
          <a
            href="/app"
            className="font-display text-lg tracking-[0.3em] text-foreground block"
          >
            {collapsed ? "N" : "NHACCUATU"}
          </a>
          {!collapsed && (
            <p className="text-[9px] tracking-[0.3em] text-muted-foreground/50 font-body mt-1">音楽の旅 · SOUND JOURNEY</p>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-[9px] tracking-[0.4em] text-muted-foreground/60 font-body mb-1">
            {!collapsed && "NAVIGATE · ナビ"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/app"}
                      className={`rounded-xl hover:bg-muted/40 transition-all ${isActive(item.url) ? "bg-muted/60 text-primary" : ""}`}
                      activeClassName="bg-muted/60 text-primary"
                    >
                      <item.icon className="mr-3 h-4 w-4" />
                      {!collapsed && (
                        <div className="flex flex-col">
                          <span className="text-sm font-body">{item.title}</span>
                          <span className="text-[8px] tracking-wider text-muted-foreground/50">{item.sub}</span>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Decorative separator */}
        {!collapsed && (
          <div className="mx-4 my-4 flex items-center gap-3">
            <div className="flex-1 h-[0.5px] bg-border/30" />
            <span className="text-[8px] text-primary/30">✦</span>
            <div className="flex-1 h-[0.5px] bg-border/30" />
          </div>
        )}

        <SidebarGroup>
          <SidebarGroupLabel className="text-[9px] tracking-[0.4em] text-muted-foreground/60 font-body mb-1">
            {!collapsed && "OTHER · 他"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className="rounded-xl hover:bg-muted/40 transition-all"
                      activeClassName="bg-muted/60 text-primary"
                    >
                      <item.icon className="mr-3 h-4 w-4" />
                      {!collapsed && (
                        <div className="flex flex-col">
                          <span className="text-sm font-body">{item.title}</span>
                          <span className="text-[8px] tracking-wider text-muted-foreground/50">{item.sub}</span>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
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
            <p className="text-[10px] text-muted-foreground/70 leading-relaxed mb-3 font-body">
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

        {/* Vertical text decoration */}
        {!collapsed && (
          <div className="mt-auto px-5 py-6">
            <p className="text-[8px] tracking-[0.5em] text-foreground/10 font-body">WHERE SOUND BECOMES ART</p>
          </div>
        )}
      </SidebarContent>

      <SidebarFooter className="p-3 border-t border-border/20">
        {user && (
          <div className="flex items-center gap-3 p-2">
            <img src={user.avatar} alt="" className="w-8 h-8 rounded-full object-cover flex-shrink-0 ring-1 ring-border/20" />
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-display italic text-foreground truncate">{user.name}</p>
                <p className="text-[9px] text-muted-foreground/50 font-body tracking-wider truncate">{user.plan === "premium" ? "PREMIUM" : "FREE"}</p>
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
