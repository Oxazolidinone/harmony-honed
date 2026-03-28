import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import aboutBg from "@/assets/about-bg.jpg";

const AboutSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="relative min-h-screen flex items-center section-fade-top section-fade-bottom">
      {/* Background image - left side */}
      <div className="absolute inset-0 grid md:grid-cols-2">
        <div className="relative overflow-hidden">
          <motion.img
            src={aboutBg}
            alt="Recording studio"
            loading="lazy"
            width={1280}
            height={960}
            className="w-full h-full object-cover"
            initial={{ scale: 1.2 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
          />
          <div className="absolute inset-0 bg-background/10" />
        </div>
        <div className="bg-background" />
      </div>

      {/* Content */}
      <div className="relative w-full px-6 md:px-12 py-24">
        <div className="grid md:grid-cols-2 gap-12 md:gap-24">
          <div /> {/* Spacer for image side */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-8"
            >
              Sound Crafted
              <br />
              With Soul.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-foreground/70 text-base md:text-lg leading-relaxed mb-4 max-w-lg"
            >
              SONO is an independent music label dedicated to discovering and
              nurturing extraordinary talent. We believe in the power of authentic
              sound to move people.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-foreground/70 text-base md:text-lg leading-relaxed mb-10 max-w-lg"
            >
              From intimate acoustic sessions to genre-defying productions,
              every release is a journey into the heart of music.
            </motion.p>

            <motion.a
              href="#releases"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="inline-flex items-center gap-3 text-foreground hover:text-primary transition-colors group"
            >
              <span className="text-sm tracking-wider border-b border-foreground/30 pb-1 group-hover:border-primary transition-colors">
                About Us
              </span>
              <div className="w-8 h-8 rounded-full border border-foreground/30 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 transition-all">
                <ArrowRight size={14} />
              </div>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
