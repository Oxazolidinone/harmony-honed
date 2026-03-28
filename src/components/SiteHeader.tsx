import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "HOME", href: "#" },
  { label: "ABOUT", href: "#about" },
  { label: "RELEASES", href: "#releases" },
];

const menuLinks = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Releases", href: "#releases" },
  { label: "News", href: "#news" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { label: "Spotify", href: "#" },
  { label: "Apple Music", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "Twitter", href: "#" },
];

const SiteHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-6">
        <a href="#" className="font-display text-2xl tracking-[0.3em] text-foreground">
          SONO
        </a>

        <div className="flex items-center gap-6">
          <a
            href="#"
            className="hidden md:flex items-center gap-2 text-sm tracking-wider text-foreground hover:text-primary transition-colors"
          >
            Listen Now
          </a>
          <button
            onClick={() => setMenuOpen(true)}
            className="w-12 h-12 rounded-full border border-foreground/20 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
          >
            <Menu size={18} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-md"
          >
            <div className="flex flex-col h-full px-6 md:px-12 py-6">
              <div className="flex items-center justify-between">
                <a href="#" className="font-display text-2xl tracking-[0.3em] text-foreground">
                  SONO
                </a>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-12 h-12 rounded-full border border-foreground/20 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <nav className="flex-1 flex flex-col justify-center">
                <div className="grid md:grid-cols-2 gap-8 md:gap-16">
                  <div>
                    {menuLinks.map((link, i) => (
                      <motion.a
                        key={link.label}
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.05, duration: 0.5 }}
                        className="block font-display text-4xl md:text-6xl py-3 text-foreground hover:text-primary transition-colors"
                      >
                        {link.label}
                      </motion.a>
                    ))}
                  </div>

                  <div className="flex flex-col justify-end">
                    <p className="text-muted-foreground text-sm tracking-wider mb-4">FOLLOW US</p>
                    {socialLinks.map((link, i) => (
                      <motion.a
                        key={link.label}
                        href={link.href}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 + i * 0.05 }}
                        className="text-foreground/70 hover:text-primary transition-colors py-1 text-sm tracking-wider"
                      >
                        {link.label}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SiteHeader;
