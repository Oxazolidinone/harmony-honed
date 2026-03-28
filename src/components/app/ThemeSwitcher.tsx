import { Palette } from "lucide-react";
import { useTheme, ThemeName } from "@/contexts/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const themes: { id: ThemeName; label: string; desc: string; icon: string }[] = [
  { id: "default", label: "Cổ điển", desc: "Ấm áp, trang nhã", icon: "🎵" },
  { id: "japanese", label: "Nhật Bản cổ", desc: "Tranh ukiyo-e, washi", icon: "🏯" },
  { id: "dark-fantasy", label: "Dark Fantasy", desc: "Tối huyền bí, vàng rực", icon: "⚔️" },
];

export default function ThemeSwitcher({ compact = false }: { compact?: boolean }) {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  if (compact) {
    return (
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="text-muted-foreground/60 hover:text-foreground transition-colors p-1"
        >
          <Palette size={15} />
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -4, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.95 }}
              className="absolute right-0 top-8 z-50 bg-card/95 backdrop-blur-xl border border-border/30 rounded-xl shadow-xl p-2 min-w-[180px]"
            >
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => { setTheme(t.id); setOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all text-sm ${
                    theme === t.id ? "bg-primary/10 text-primary" : "hover:bg-muted/40"
                  }`}
                >
                  <span className="text-base">{t.icon}</span>
                  <div>
                    <p className="font-display italic text-sm">{t.label}</p>
                    <p className="text-[10px] text-muted-foreground font-body">{t.desc}</p>
                  </div>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => setTheme(t.id)}
          className={`flex items-center gap-4 p-4 rounded-2xl border transition-all text-left ${
            theme === t.id
              ? "border-primary bg-primary/10 ring-1 ring-primary/20"
              : "border-border/30 bg-card/40 hover:border-primary/30"
          }`}
        >
          <span className="text-2xl">{t.icon}</span>
          <div>
            <p className="font-display italic text-base">{t.label}</p>
            <p className="text-xs text-muted-foreground font-body">{t.desc}</p>
          </div>
        </button>
      ))}
    </div>
  );
}
