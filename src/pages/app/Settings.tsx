import { motion } from "framer-motion";
import { User, Crown, Bell, Shield, LogOut, Headphones, Palette } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const AppSettings = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-full relative">
      {/* Vertical accent */}
      <div className="absolute right-4 top-24 hidden lg:block">
        <p className="writing-vertical text-xs tracking-[0.5em] text-foreground/10 font-body">SETTINGS</p>
      </div>

      <div className="px-6 md:px-10 py-10 max-w-2xl">
        <p className="text-[10px] tracking-[0.4em] text-muted-foreground/60 font-body mb-3">ACCOUNT</p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl md:text-5xl font-light italic mb-10"
        >
          Cài đặt
        </motion.h1>

        {/* Profile */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-primary/40 text-xs font-body">01</span>
            <h2 className="text-xs tracking-[0.3em] text-foreground/50 font-body">HỒ SƠ</h2>
          </div>
          <div className="flex items-center gap-4 p-5 bg-card/40 backdrop-blur-sm rounded-2xl">
            <img src={user?.avatar} alt="" className="w-16 h-16 rounded-full object-cover ring-2 ring-border/20" />
            <div className="flex-1 min-w-0">
              <p className="font-display text-lg italic">{user?.name}</p>
              <p className="text-sm text-muted-foreground font-body">{user?.email}</p>
            </div>
            <button className="text-xs tracking-[0.2em] text-primary hover:text-primary/80 transition-colors font-body">
              CHỈNH SỬA
            </button>
          </div>
        </section>

        {/* Subscription */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-primary/40 text-xs font-body">02</span>
            <Crown size={14} className="text-muted-foreground" />
            <h2 className="text-xs tracking-[0.3em] text-foreground/50 font-body">GÓI ĐĂNG KÝ</h2>
          </div>
          <div className="bg-card/40 backdrop-blur-sm rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-display text-xl italic">{user?.plan === "premium" ? "Premium" : "Free"}</span>
              {user?.plan === "premium" && (
                <span className="text-[9px] tracking-[0.3em] text-primary bg-primary/10 px-2 py-0.5 rounded-full font-body">ACTIVE</span>
              )}
            </div>
            {user?.plan === "free" ? (
              <div>
                <p className="text-sm text-muted-foreground mb-5 font-body leading-relaxed">
                  Nâng cấp để nghe nhạc không giới hạn, không quảng cáo, chất lượng cao và tải nhạc offline.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="border border-primary/30 p-5 rounded-2xl hover:border-primary transition-colors cursor-pointer bg-primary/5 group">
                    <p className="font-display text-sm italic">Individual</p>
                    <p className="text-primary font-display text-3xl italic my-2">59.000₫</p>
                    <p className="text-xs text-muted-foreground font-body">/tháng · 1 tài khoản</p>
                  </div>
                  <div className="border border-border/40 p-5 rounded-2xl hover:border-primary transition-colors cursor-pointer group">
                    <p className="font-display text-sm italic">Family</p>
                    <p className="font-display text-3xl italic my-2">89.000₫</p>
                    <p className="text-xs text-muted-foreground font-body">/tháng · tối đa 6 tài khoản</p>
                  </div>
                </div>
                <button className="mt-5 w-full bg-foreground text-background py-3.5 text-[11px] tracking-[0.3em] hover:bg-foreground/90 transition-colors rounded-xl font-body">
                  NÂNG CẤP NGAY
                </button>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground font-body">
                Bạn đang sử dụng gói Premium. Gia hạn tiếp theo: 15/04/2026.
              </p>
            )}
          </div>
        </section>

        {/* Decorative separator */}
        <div className="flex items-center gap-3 my-8">
          <div className="flex-1 h-[0.5px] bg-border/20" />
          <span className="text-[8px] text-primary/20">✦</span>
          <div className="flex-1 h-[0.5px] bg-border/20" />
        </div>

        {/* Settings list */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-primary/40 text-xs font-body">03</span>
            <h2 className="text-xs tracking-[0.3em] text-foreground/50 font-body">TÙY CHỌN</h2>
          </div>
          <div className="bg-card/40 backdrop-blur-sm rounded-2xl overflow-hidden">
            {[
              { icon: Headphones, label: "Chất lượng âm thanh", desc: "Thiết lập chất lượng phát và tải xuống" },
              { icon: Bell, label: "Thông báo", desc: "Quản lý thông báo push và email" },
              { icon: Shield, label: "Bảo mật", desc: "Đổi mật khẩu và xác thực 2 bước" },
              { icon: User, label: "Quyền riêng tư", desc: "Quản lý dữ liệu cá nhân" },
              { icon: Palette, label: "Giao diện", desc: "Tùy chỉnh theme và hiển thị" },
            ].map((item) => (
              <button
                key={item.label}
                className="w-full flex items-center gap-4 py-4 px-5 border-b border-border/20 last:border-b-0 hover:bg-card/50 transition-colors text-left group"
              >
                <item.icon size={16} className="text-muted-foreground/60" />
                <div className="flex-1">
                  <p className="text-sm font-display italic group-hover:text-primary transition-colors">{item.label}</p>
                  <p className="text-xs text-muted-foreground font-body">{item.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        <button
          onClick={logout}
          className="flex items-center gap-2 text-sm text-destructive/70 hover:text-destructive transition-colors font-body"
        >
          <LogOut size={14} />
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default AppSettings;
