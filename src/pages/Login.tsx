import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { getThemeBackgrounds } from "@/lib/themeBackgrounds";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { theme } = useTheme();
  const backgrounds = getThemeBackgrounds(theme);
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

  const isDark = theme === "dark-fantasy";

  return (
    <div className="min-h-screen relative overflow-hidden">
      <img src={backgrounds.auth} alt="" className="absolute inset-0 w-full h-full object-cover" />
      
      {/* Theme-aware overlay */}
      {theme === "default" && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(25,15%,8%)/0.82] via-[hsl(25,15%,8%)/0.55] to-[hsl(25,15%,8%)/0.25] lg:from-[hsl(25,15%,8%)/0.3] lg:via-[hsl(25,15%,8%)/0.45] lg:to-[hsl(25,15%,8%)/0.88]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(28,50%,15%)/0.3] to-transparent" />
        </>
      )}
      {theme === "japanese" && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(220,30%,10%)/0.75] via-[hsl(220,30%,10%)/0.45] to-[hsl(220,30%,10%)/0.15] lg:from-[hsl(220,30%,10%)/0.2] lg:via-[hsl(220,30%,10%)/0.4] lg:to-[hsl(220,30%,10%)/0.82]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(0,60%,20%)/0.15] to-transparent" />
        </>
      )}
      {theme === "dark-fantasy" && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(230,20%,5%)/0.78] via-[hsl(230,20%,5%)/0.50] to-[hsl(230,20%,5%)/0.20] lg:from-[hsl(230,20%,5%)/0.15] lg:via-[hsl(230,20%,5%)/0.45] lg:to-[hsl(230,20%,5%)/0.85]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(42,70%,20%)/0.15] to-transparent" />
        </>
      )}

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

          <h1 className="font-display text-4xl mb-2 text-white drop-shadow-lg">
            {theme === "japanese" ? "ログイン" : theme === "dark-fantasy" ? "Enter the Realm" : "Đăng nhập"}
          </h1>
          <p className="text-white/60 text-sm mb-8 font-body">
            {theme === "japanese" ? "おかえりなさい" : theme === "dark-fantasy" ? "The flame awaits, Tarnished" : "Chào mừng trở lại"}
          </p>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-3.5 text-sm font-body text-white/90 hover:bg-white/20 transition-all rounded-xl mb-6 disabled:opacity-50 shadow-lg"
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            {theme === "japanese" ? "Googleでログイン" : theme === "dark-fantasy" ? "Sign in with Google" : "Đăng nhập với Google"}
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-white/20" />
            <span className="text-xs text-white/40 font-body tracking-wider">
              {theme === "japanese" ? "または" : theme === "dark-fantasy" ? "OR" : "HOẶC"}
            </span>
            <div className="flex-1 h-px bg-white/20" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
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
              <label className="text-xs tracking-wider text-white/50 block mb-2 font-body">
                {theme === "japanese" ? "パスワード" : theme === "dark-fantasy" ? "PASSWORD" : "MẬT KHẨU"}
              </label>
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
              className={`w-full py-3.5 text-sm tracking-wider font-medium transition-colors disabled:opacity-50 rounded-xl font-body shadow-lg ${
                isDark
                  ? "bg-[hsl(42,70%,50%)] text-[hsl(230,20%,8%)] hover:bg-[hsl(42,70%,55%)]"
                  : "bg-white/90 text-[hsl(25,15%,10%)] hover:bg-white"
              }`}
            >
              {loading ? "..." : theme === "japanese" ? "ログイン" : theme === "dark-fantasy" ? "ENTER" : "ĐĂNG NHẬP"}
            </button>
          </form>

          <p className="text-center text-sm text-white/50 mt-6 font-body">
            {theme === "japanese" ? "アカウントをお持ちでないですか？" : theme === "dark-fantasy" ? "No soul bound yet?" : "Chưa có tài khoản?"}{" "}
            <Link to="/register" className="text-white/90 hover:text-white transition-colors border-b border-white/30">
              {theme === "japanese" ? "新規登録" : theme === "dark-fantasy" ? "Create one" : "Đăng ký"}
            </Link>
          </p>

          <p className="text-center text-[10px] tracking-[0.4em] text-white/15 mt-10 font-body">
            {theme === "japanese" ? "音楽 · 魂 · 調和" : theme === "dark-fantasy" ? "FIRE · SOUL · GRACE" : "MUSIC · SOUL · HARMONY"}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
