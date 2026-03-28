import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      {/* Parallax Background */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0"
      >
        <img
          src={heroBg}
          alt="Concert stage"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/40" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative h-full flex flex-col justify-between px-6 md:px-12 pt-24 pb-12"
      >
        {/* Vertical text - like QINO's キノ */}
        <div className="absolute left-6 md:left-12 top-1/3">
          <p className="writing-vertical text-sm tracking-[0.5em] text-foreground/60">
            SOUND
          </p>
        </div>

        {/* Main heading */}
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
            className="text-center"
          >
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light tracking-wider leading-tight">
              Where Sound
              <br />
              <span className="italic text-gradient-gold">Becomes Art.</span>
            </h1>
          </motion.div>
        </div>

        {/* Bottom bar - like QINO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex items-end justify-between"
        >
          <div className="border border-foreground/20 px-6 py-4 flex gap-12">
            <p className="text-sm text-foreground/60">
              Independent Music Label
              <br />
              Est. 2024
            </p>
            <div className="flex flex-col gap-1">
              <a href="#about" className="text-sm text-foreground/80 hover:text-primary transition-colors">About</a>
              <a href="#releases" className="text-sm text-foreground/80 hover:text-primary transition-colors">Releases</a>
              <a href="#news" className="text-sm text-foreground/80 hover:text-primary transition-colors">News</a>
            </div>
          </div>

          {/* Scroll indicator */}
          <a
            href="#about"
            className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-foreground/10 backdrop-blur-sm border border-foreground/20 flex flex-col items-center justify-center hover:bg-primary/20 hover:border-primary transition-all group"
          >
            <span className="text-xs tracking-wider text-foreground/60 group-hover:text-primary transition-colors">Scroll to</span>
            <span className="text-xs tracking-wider text-foreground/80 group-hover:text-primary transition-colors">Discover</span>
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
