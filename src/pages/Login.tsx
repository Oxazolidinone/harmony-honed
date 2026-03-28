import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

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

      {/* Right - form */}
      <div className="flex-1 flex items-center justify-center px-6 bg-background">
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
          <p className="text-muted-foreground text-sm mb-8">Chào mừng trở lại</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs tracking-wider text-muted-foreground block mb-2">EMAIL</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border border-border px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none transition-colors"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="text-xs tracking-wider text-muted-foreground block mb-2">MẬT KHẨU</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border border-border px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none transition-colors"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-foreground text-background py-3 text-sm tracking-wider hover:bg-foreground/90 transition-colors disabled:opacity-50"
            >
              {loading ? "ĐANG XỬ LÝ..." : "ĐĂNG NHẬP"}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Chưa có tài khoản?{" "}
            <Link to="/register" className="text-foreground hover:text-primary transition-colors border-b border-foreground/30">
              Đăng ký
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
