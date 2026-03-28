import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { getThemeBackgrounds } from "@/lib/themeBackgrounds";

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const backgrounds = getThemeBackgrounds(theme);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const isDark = theme === "dark-fantasy";

  return (
    <section ref={ref} className="relative h-screen overflow-hidden section-fade-bottom">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img src={backgrounds.hero} alt="Hero" width={1920} height={1080} className="w-full h-full object-cover" />
        <div className={`absolute inset-0 ${
          isDark ? "bg-background/40" : theme === "japanese" ? "bg-background/25" : "bg-background/20"
        }`} />
      </motion.div>

      <motion.div style={{ opacity }} className="relative h-full flex flex-col justify-between px-6 md:px-12 pt-24 pb-12">
        <div className="absolute left-6 md:left-12 top-1/3">
          <p className="writing-vertical text-sm tracking-[0.5em] text-foreground/60">
            {theme === "japanese" ? "音楽" : theme === "dark-fantasy" ? "GRACE" : "SOUND"}
          </p>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
            className="text-center"
          >
            <h1 className={`font-display text-5xl md:text-7xl lg:text-8xl font-light tracking-wider leading-tight ${
              isDark ? "drop-shadow-[0_2px_20px_hsl(42,70%,50%,0.3)]" : ""
            }`}>
              {theme === "japanese" ? (
                <>音が芸術に<br /><span className="italic text-gradient-gold">なる場所。</span></>
              ) : theme === "dark-fantasy" ? (
                <>Where Sound<br /><span className="italic text-gradient-gold">Becomes Legend.</span></>
              ) : (
                <>Where Sound<br /><span className="italic text-gradient-gold">Becomes Art.</span></>
              )}
            </h1>
            <div className="flex items-center justify-center gap-4 mt-8">
              <a href="/register"
                className={`px-8 py-3 text-sm tracking-wider transition-colors ${
                  isDark
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-foreground text-background hover:bg-foreground/90"
                }`}
              >
                {theme === "japanese" ? "無料登録" : theme === "dark-fantasy" ? "Begin Journey" : "Đăng ký miễn phí"}
              </a>
              <a href="/login"
                className="px-8 py-3 border border-foreground/30 text-sm tracking-wider text-foreground hover:border-foreground transition-colors"
              >
                {theme === "japanese" ? "ログイン" : theme === "dark-fantasy" ? "Enter" : "Đăng nhập"}
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex items-end justify-between"
        >
          <div className="border border-foreground/20 px-6 py-4 flex gap-12">
            <p className="text-sm text-foreground/60">
              {theme === "japanese" ? "インディーズ音楽レーベル" : theme === "dark-fantasy" ? "Arcane Music Guild" : "Independent Music Label"}
              <br />Est. 2024
            </p>
            <div className="flex flex-col gap-1">
              <a href="#about" className="text-sm text-foreground/80 hover:text-primary transition-colors">
                {theme === "japanese" ? "概要" : "About"}
              </a>
              <a href="#releases" className="text-sm text-foreground/80 hover:text-primary transition-colors">
                {theme === "japanese" ? "リリース" : "Releases"}
              </a>
              <a href="#news" className="text-sm text-foreground/80 hover:text-primary transition-colors">
                {theme === "japanese" ? "ニュース" : "News"}
              </a>
            </div>
          </div>

          <a href="#about"
            className={`w-24 h-24 md:w-28 md:h-28 rounded-full flex flex-col items-center justify-center transition-all group ${
              isDark
                ? "bg-primary/10 backdrop-blur-sm border border-primary/30 hover:bg-primary/20 hover:border-primary/50"
                : "bg-foreground/10 backdrop-blur-sm border border-foreground/20 hover:bg-primary/20 hover:border-primary"
            }`}
          >
            <span className="text-xs tracking-wider text-foreground/60 group-hover:text-primary transition-colors">Scroll to</span>
            <span className="text-xs tracking-wider text-foreground/80 group-hover:text-primary transition-colors">
              {theme === "japanese" ? "発見" : "Discover"}
            </span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-[1px] h-4 bg-foreground/40 mt-1"
            />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
