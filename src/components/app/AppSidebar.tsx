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
  { title: "Trang chủ", url: "/app", icon: Home },
  { title: "Tìm kiếm", url: "/app/search", icon: Search },
  { title: "Thư viện", url: "/app/library", icon: Library },
];

const settingsNav = [
  { title: "Cài đặt", url: "/app/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar collapsible="icon" className="border-r border-border bg-card/50">
      <SidebarContent className="pt-6">
        {/* Logo */}
        <div className="px-4 mb-8">
          <a
            href="/app"
            className="font-display text-xl tracking-[0.2em] text-foreground block"
          >
            {collapsed ? "N" : "NHACCUATU"}
          </a>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] tracking-[0.3em] text-muted-foreground font-body">
            {!collapsed && "MENU"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/app"}
                      className={`hover:bg-muted/50 ${isActive(item.url) ? "bg-muted text-primary" : ""}`}
                      activeClassName="bg-muted text-primary font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] tracking-[0.3em] text-muted-foreground font-body">
            {!collapsed && "KHÁC"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className="hover:bg-muted/50"
                      activeClassName="bg-muted text-primary font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Premium upsell */}
        {user?.plan === "free" && !collapsed && (
          <div className="mx-3 mt-6 p-4 border border-primary/20 bg-primary/5">
            <div className="flex items-center gap-2 mb-2">
              <Crown size={14} className="text-primary" />
              <span className="text-xs font-medium text-foreground">Nâng cấp Premium</span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed mb-3">
              Nghe nhạc không giới hạn, không quảng cáo
            </p>
            <button
              onClick={() => navigate("/app/settings")}
              className="w-full text-xs py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors tracking-wider"
            >
              TÌM HIỂU THÊM
            </button>
          </div>
        )}
      </SidebarContent>

      <SidebarFooter className="p-3">
        {user && (
          <div className="flex items-center gap-3">
            <img src={user.avatar} alt="" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground truncate">{user.name}</p>
                <p className="text-[10px] text-muted-foreground truncate">{user.plan === "premium" ? "Premium" : "Free"}</p>
              </div>
            )}
            {!collapsed && (
              <button onClick={logout} className="text-muted-foreground hover:text-foreground transition-colors">
                <LogOut size={14} />
              </button>
            )}
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
