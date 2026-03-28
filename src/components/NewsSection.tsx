import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const newsItems = [
  {
    title: "SONO Featured in Rolling Stone's 'Labels to Watch'",
    date: "2026/03/15",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
  },
  {
    title: "New Single 'Golden Hour' Now Streaming Everywhere",
    date: "2026/02/28",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=300&fit=crop",
  },
  {
    title: "Summer Tour 2026 Dates Announced — Tickets On Sale",
    date: "2026/02/10",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400&h=300&fit=crop",
  },
];

const NewsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="news" ref={ref} className="py-24 md:py-32 px-6 md:px-12">
      <div className="flex items-start justify-between mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-display text-sm tracking-[0.3em] text-muted-foreground"
        >
          LATEST NEWS
        </motion.h2>
        <motion.a
          href="#"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm tracking-wider text-foreground/60 hover:text-primary transition-colors border-b border-foreground/20 hover:border-primary pb-0.5"
        >
          View All News
        </motion.a>
      </div>

      {/* News list */}
      <div className="border-t border-border">
        {newsItems.map((item, i) => (
          <motion.a
            key={i}
            href="#"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 * i }}
            className="block border-b border-border py-6 md:py-8 group"
          >
            <div className="flex items-center justify-between gap-6">
              <p className="font-display text-lg md:text-xl text-foreground group-hover:text-primary transition-colors flex-1">
                {item.title}
              </p>
              <span className="text-muted-foreground text-xs tracking-wider flex-shrink-0">
                {item.date}
              </span>
            </div>
          </motion.a>
        ))}
      </div>

      {/* News images row */}
      <div className="flex gap-4 mt-8 overflow-x-auto no-scrollbar">
        {newsItems.map((item, i) => (
          <motion.a
            key={i}
            href="#"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 + 0.1 * i }}
            className="flex-shrink-0 w-64 md:w-72 overflow-hidden group"
          >
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default NewsSection;
