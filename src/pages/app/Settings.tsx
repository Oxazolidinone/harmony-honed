import { motion } from "framer-motion";
import { User, Crown, Bell, Shield, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const AppSettings = () => {
  const { user, logout } = useAuth();

  return (
    <div className="px-6 md:px-10 py-8 max-w-2xl">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-display text-4xl mb-8"
      >
        Cài đặt
      </motion.h1>

      {/* Profile */}
      <section className="mb-10">
        <h2 className="text-xs tracking-[0.3em] text-muted-foreground mb-4">HỒ SƠ</h2>
        <div className="flex items-center gap-4 p-5 bg-card/40 backdrop-blur-sm rounded-2xl">
          <img src={user?.avatar} alt="" className="w-16 h-16 rounded-full object-cover ring-2 ring-border/30" />
          <div>
            <p className="font-medium">{user?.name}</p>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
          <button className="ml-auto text-xs tracking-wider text-primary hover:text-primary/80 transition-colors">
            Chỉnh sửa
          </button>
        </div>
      </section>

      {/* Subscription */}
      <section className="mb-10">
        <h2 className="text-xs tracking-[0.3em] text-muted-foreground mb-4">GÓI ĐĂNG KÝ</h2>
        <div className="bg-card/40 backdrop-blur-sm rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Crown size={18} className={user?.plan === "premium" ? "text-primary" : "text-muted-foreground"} />
            <span className="font-medium">{user?.plan === "premium" ? "Premium" : "Free"}</span>
          </div>
          {user?.plan === "free" ? (
            <div>
              <p className="text-sm text-muted-foreground mb-4">
                Nâng cấp để nghe nhạc không giới hạn, không quảng cáo, chất lượng cao và tải nhạc offline.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="border border-primary/30 p-5 rounded-xl hover:border-primary transition-colors cursor-pointer bg-primary/5">
                  <p className="font-medium text-sm">Individual</p>
                  <p className="text-primary font-display text-2xl my-1">59.000₫</p>
                  <p className="text-xs text-muted-foreground">/tháng · 1 tài khoản</p>
                </div>
                <div className="border border-border/50 p-5 rounded-xl hover:border-primary transition-colors cursor-pointer">
                  <p className="font-medium text-sm">Family</p>
                  <p className="font-display text-2xl my-1">89.000₫</p>
                  <p className="text-xs text-muted-foreground">/tháng · tối đa 6 tài khoản</p>
                </div>
              </div>
              <button className="mt-4 w-full bg-foreground text-background py-3 text-sm tracking-wider hover:bg-foreground/90 transition-colors rounded-xl">
                NÂNG CẤP NGAY
              </button>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Bạn đang sử dụng gói Premium. Gia hạn tiếp theo: 15/04/2026.
            </p>
          )}
        </div>
      </section>

      {/* Settings list */}
      <section className="mb-10">
        <h2 className="text-xs tracking-[0.3em] text-muted-foreground mb-4">TÙY CHỌN</h2>
        <div className="bg-card/40 backdrop-blur-sm rounded-2xl overflow-hidden">
          {[
            { icon: Bell, label: "Thông báo", desc: "Quản lý thông báo push và email" },
            { icon: Shield, label: "Bảo mật", desc: "Đổi mật khẩu và xác thực 2 bước" },
            { icon: User, label: "Quyền riêng tư", desc: "Quản lý dữ liệu cá nhân" },
          ].map((item, i) => (
            <button
              key={item.label}
              className="w-full flex items-center gap-4 py-4 px-5 border-b border-border/30 last:border-b-0 hover:bg-card/50 transition-colors text-left group"
            >
              <item.icon size={16} className="text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm group-hover:text-primary transition-colors">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <button
        onClick={logout}
        className="flex items-center gap-2 text-sm text-destructive hover:text-destructive/80 transition-colors"
      >
        <LogOut size={14} />
        Đăng xuất
      </button>
    </div>
  );
};

export default AppSettings;
