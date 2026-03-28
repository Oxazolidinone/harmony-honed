import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import bgAuthDock from "@/assets/bg-auth-dock.jpg";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { register, login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(name, email, password);
      navigate("/app");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setLoading(true);
    try {
      await login("google@nhaccuatu.vn", "google");
      navigate("/app");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Full background image */}
      <img src={bgAuthDock} alt="" className="absolute inset-0 w-full h-full object-cover" />
      
      {/* Gradient overlay — form side darker */}
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(25,15%,8%)/0.82] via-[hsl(25,15%,8%)/0.55] to-[hsl(25,15%,8%)/0.25] lg:from-[hsl(25,15%,8%)/0.3] lg:via-[hsl(25,15%,8%)/0.45] lg:to-[hsl(25,15%,8%)/0.88]" />
      
      {/* Warm color tint */}
      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(28,50%,15%)/0.3] to-transparent" />

      {/* Form container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center lg:justify-end px-6 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-sm"
        >
          <a href="/" className="font-display text-2xl tracking-[0.3em] text-white/90 block mb-10 drop-shadow-lg">
            NHACCUATU
          </a>

          <h1 className="font-display text-4xl mb-2 text-white drop-shadow-lg">Tạo tài khoản</h1>
          <p className="text-white/60 text-sm mb-8 font-body">Bắt đầu hành trình âm nhạc</p>

          {/* Google OAuth */}
          <button
            type="button"
            onClick={handleGoogleRegister}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-3.5 text-sm font-body text-white/90 hover:bg-white/20 transition-all rounded-xl mb-6 disabled:opacity-50 shadow-lg"
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Đăng ký với Google
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-white/20" />
            <span className="text-xs text-white/40 font-body tracking-wider">HOẶC</span>
            <div className="flex-1 h-px bg-white/20" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs tracking-wider text-white/50 block mb-2 font-body">HỌ TÊN</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/8 backdrop-blur-lg border border-white/15 px-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:border-white/40 focus:bg-white/12 focus:outline-none transition-all rounded-xl font-body"
                placeholder="Nguyễn Văn A"
                required
              />
            </div>
            <div>
              <label className="text-xs tracking-wider text-white/50 block mb-2 font-body">EMAIL</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/8 backdrop-blur-lg border border-white/15 px-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:border-white/40 focus:bg-white/12 focus:outline-none transition-all rounded-xl font-body"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="text-xs tracking-wider text-white/50 block mb-2 font-body">MẬT KHẨU</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/8 backdrop-blur-lg border border-white/15 px-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:border-white/40 focus:bg-white/12 focus:outline-none transition-all rounded-xl font-body"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white/90 text-[hsl(25,15%,10%)] py-3.5 text-sm tracking-wider font-medium hover:bg-white transition-colors disabled:opacity-50 rounded-xl font-body shadow-lg"
            >
              {loading ? "ĐANG XỬ LÝ..." : "ĐĂNG KÝ"}
            </button>
          </form>

          <p className="text-center text-sm text-white/50 mt-6 font-body">
            Đã có tài khoản?{" "}
            <Link to="/login" className="text-white/90 hover:text-white transition-colors border-b border-white/30">
              Đăng nhập
            </Link>
          </p>

          <p className="text-center text-[10px] tracking-[0.4em] text-white/15 mt-10 font-body">
            DISCOVER · CREATE · ENJOY
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
