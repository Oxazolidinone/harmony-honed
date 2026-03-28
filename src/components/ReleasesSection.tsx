import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import album1 from "@/assets/album-1.jpg";
import album2 from "@/assets/album-2.jpg";
import album3 from "@/assets/album-3.jpg";
import album4 from "@/assets/album-4.jpg";

const albums = [
  {
    num: "01",
    title: "Echoes of Gold",
    subtitle: "A sonic journey through amber landscapes",
    image: album1,
  },
  {
    num: "02",
    title: "Midnight Walk",
    subtitle: "Urban nocturnes and city whispers",
    image: album2,
  },
  {
    num: "03",
    title: "Vintage Soul",
    subtitle: "Classic warmth, modern resonance",
    image: album3,
  },
  {
    num: "04",
    title: "Waveforms",
    subtitle: "Electronic textures and organic beats",
    image: album4,
  },
];

const ReleasesSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeAlbum, setActiveAlbum] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  return (
    <section id="releases" ref={ref} className="relative py-24 md:py-32 section-fade-top section-fade-bottom">
      {/* Section header */}
      <div className="px-6 md:px-12 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-sm tracking-[0.3em] text-muted-foreground mb-4">
            OUR RELEASES
          </h2>
          <p className="font-display text-2xl md:text-3xl font-light text-foreground/80 max-w-2xl">
            From studio to soul. Discover our curated collection of releases
            that push the boundaries of sound.
          </p>
        </motion.div>
      </div>

      {/* Albums list - numbered like QINO projects */}
      <div className="px-6 md:px-12 mb-16">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Left: album list */}
          <div className="border-t border-border">
            {albums.map((album, i) => (
              <motion.div
                key={album.num}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * i }}
                className={`border-b border-border py-6 md:py-8 cursor-pointer group transition-colors ${
                  activeAlbum === i ? "bg-secondary/30" : ""
                }`}
                onMouseEnter={() => setActiveAlbum(i)}
              >
                <div className="flex items-start gap-6 px-4">
                  <span className="text-primary/60 font-body text-xs tracking-wider mt-1">
                    {album.num}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl md:text-3xl text-foreground group-hover:text-primary transition-colors">
                      {album.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1">
                      {album.subtitle}
                    </p>
                  </div>
                  <a
                    href="#"
                    className="ml-auto text-sm tracking-wider text-foreground/50 group-hover:text-primary transition-colors border-b border-transparent group-hover:border-primary pb-0.5"
                  >
                    Listen
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: active album image */}
          <div className="hidden md:flex items-center justify-center p-12">
            <motion.div
              key={activeAlbum}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-md aspect-square overflow-hidden"
            >
              <img
                src={albums[activeAlbum].image}
                alt={albums[activeAlbum].title}
                loading="lazy"
                width={800}
                height={800}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Draggable carousel - like QINO */}
      <div className="relative">
        <motion.div
          ref={carouselRef}
          className="flex gap-6 px-6 md:px-12 overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing"
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
        >
          {albums.map((album, i) => (
            <motion.a
              key={album.num}
              href="#"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i + 0.3 }}
              className="flex-shrink-0 w-72 md:w-80 group"
              onClick={(e) => isDragging && e.preventDefault()}
            >
              <div className="aspect-square overflow-hidden mb-4">
                <img
                  src={album.image}
                  alt={album.title}
                  loading="lazy"
                  width={800}
                  height={800}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary/50 text-xs">{album.num}</span>
                <span className="text-foreground text-sm group-hover:text-primary transition-colors">
                  {album.title}
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Drag indicator */}
        <div className="flex justify-center mt-8">
          <span className="text-muted-foreground text-xs tracking-[0.3em]">DRAG</span>
        </div>
      </div>
    </section>
  );
};

export default ReleasesSection;
