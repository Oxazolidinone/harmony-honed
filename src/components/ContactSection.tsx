import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import contactBg from "@/assets/contact-bg.jpg";

const ContactSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" ref={ref} className="relative section-fade-top">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={contactBg}
          alt="Contact background"
          loading="lazy"
          width={1920}
          height={800}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/40" />
      </div>

      {/* Marquee - like QINO's GET IN TOUCH */}
      <div className="relative py-16 md:py-24 overflow-hidden">
        <a href="#" className="block group">
          <div className="animate-marquee whitespace-nowrap flex">
            {[...Array(4)].map((_, i) => (
              <span
                key={i}
                className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-foreground/80 group-hover:text-primary transition-colors mx-8 inline-flex items-center gap-8"
              >
                GET
                <span className="text-primary/40">•</span>
                IN
                <span className="text-primary/40">•</span>
                TOUCH
                <span className="text-primary/40 mx-4">—</span>
              </span>
            ))}
          </div>
        </a>
      </div>

      {/* Contact image */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative px-6 md:px-12 pb-12"
      >
        <div className="max-w-md">
          <p className="text-foreground/60 text-sm leading-relaxed">
            For bookings, press inquiries, or collaborations — 
            we'd love to hear from you.
          </p>
          <a
            href="mailto:hello@sono.music"
            className="inline-block mt-4 text-primary text-sm tracking-wider border-b border-primary/30 hover:border-primary pb-0.5 transition-colors"
          >
            hello@sono.music
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
