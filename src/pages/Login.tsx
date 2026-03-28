import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { Music, Disc3, Headphones } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const floatingIcons = [
  { Icon: Music, x: "15%", y: "20%", delay: 0, size: 18 },
  { Icon: Disc3, x: "75%", y: "15%", delay: 0.8, size: 22 },
  { Icon: Headphones, x: "60%", y: "70%", delay: 1.6, size: 20 },
  { Icon: Music, x: "30%", y: "80%", delay: 2.4, size: 16 },
  { Icon: Disc3, x: "85%", y: "45%", delay: 0.4, size: 14 },
  { Icon: Music, x: "45%", y: "35%", delay: 1.2, size: 20 },
];

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      navigate("/app");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await login("google@nhaccuatu.vn", "google");
      navigate("/app");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left - image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/20" />
        <div className="absolute bottom-12 left-12">
          <h2 className="font-display text-4xl text-foreground/90 leading-tight">
            Âm nhạc<br />
            <span className="italic text-gradient-gold">cho tâm hồn.</span>
          </h2>
        </div>
      </div>

      {/* Right - form with decorative elements */}
      <div className="flex-1 relative overflow-hidden bg-background">
        {/* Floating music icons */}
        {floatingIcons.map((item, i) => (
          <motion.div
            key={i}
            className="absolute text-primary/10"
            style={{ left: item.x, top: item.y }}
            animate={{
              y: [0, -15, 0],
              rotate: [0, 10, -10, 0],
              opacity: [0.08, 0.15, 0.08],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: item.delay,
              ease: "easeInOut",
            }}
          >
            <item.Icon size={item.size} />
          </motion.div>
        ))}

        {/* Decorative circles */}
        <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-primary/5" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-accent/5" />
        <div className="absolute top-1/3 right-10 w-1 h-32 bg-gradient-to-b from-transparent via-primary/10 to-transparent" />

        {/* Form */}
        <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-sm"
          >
            <a href="/" className="font-display text-2xl tracking-[0.3em] text-foreground block mb-12">
              NHACCUATU
            </a>

            <h1 className="font-display text-3xl mb-2">Đăng nhập</h1>
            <p className="text-foreground/60 text-sm mb-8 font-body">Chào mừng trở lại</p>

            {/* Google OAuth */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 border border-border px-4 py-3 text-sm font-body hover:bg-card/60 transition-colors rounded-lg mb-6 disabled:opacity-50"
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Đăng nhập với Google
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-foreground/40 font-body tracking-wider">HOẶC</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs tracking-wider text-foreground/60 block mb-2 font-body">EMAIL</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border border-border px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none transition-colors rounded-lg font-body"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <label className="text-xs tracking-wider text-foreground/60 block mb-2 font-body">MẬT KHẨU</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border border-border px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none transition-colors rounded-lg font-body"
                  placeholder="••••••••"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-foreground text-background py-3 text-sm tracking-wider hover:bg-foreground/90 transition-colors disabled:opacity-50 rounded-lg font-body"
              >
                {loading ? "ĐANG XỬ LÝ..." : "ĐĂNG NHẬP"}
              </button>
            </form>

            <p className="text-center text-sm text-foreground/60 mt-6 font-body">
              Chưa có tài khoản?{" "}
              <Link to="/register" className="text-foreground hover:text-primary transition-colors border-b border-foreground/30">
                Đăng ký
              </Link>
            </p>

            {/* Bottom decorative text */}
            <p className="text-center text-[10px] tracking-[0.4em] text-foreground/20 mt-12 font-body">
              MUSIC · SOUL · HARMONY
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
