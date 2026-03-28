import { motion } from "framer-motion";
import { Play, Clock, TrendingUp } from "lucide-react";
import { usePlayer } from "@/contexts/PlayerContext";
import { albums, playlists, recentlyPlayed, allSongs, formatDuration, formatNumber } from "@/data/mockData";
import { useNavigate } from "react-router-dom";
import bgHome from "@/assets/bg-home.jpg";

const greetingTime = () => {
  const h = new Date().getHours();
  if (h < 12) return "Chào buổi sáng";
  if (h < 18) return "Chào buổi chiều";
  return "Chào buổi tối";
};

const AppHome = () => {
  const { playSong } = usePlayer();
  const navigate = useNavigate();

  const topSongs = [...allSongs].sort((a, b) => b.playCount - a.playCount).slice(0, 5);

  return (
    <div
      className="min-h-full relative"
      style={{
        backgroundImage: `linear-gradient(hsl(40 20% 95% / 0.45), hsl(40 20% 95% / 0.5)), url(${bgHome})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Vertical accent text */}
      <div className="absolute right-4 top-24 hidden lg:block">
        <p className="writing-vertical text-xs tracking-[0.5em] text-foreground/15 font-body">NHACCUATU · 音楽</p>
      </div>

      <div className="px-6 md:px-10 py-8">
      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-[10px] tracking-[0.4em] text-muted-foreground font-body mb-3">ホーム · HOME</p>
        <h1 className="font-display text-4xl md:text-5xl font-light mb-2 italic">{greetingTime()}</h1>
        <p className="text-foreground/60 text-base">Tiếp tục hành trình âm nhạc của bạn</p>
      </motion.div>

      {/* Recently played */}
      <section className="mt-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-primary/40 font-body text-xs">01</span>
          <Clock size={14} className="text-muted-foreground" />
          <h2 className="text-xs tracking-[0.3em] text-foreground/50 font-body font-medium">NGHE GẦN ĐÂY</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {recentlyPlayed.map((song, i) => (
            <motion.button
              key={song.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              onClick={() => playSong(song, recentlyPlayed)}
              className="flex items-center gap-3 bg-card/60 backdrop-blur-md rounded-xl hover:bg-card/80 transition-all hover:scale-[1.02] group text-left overflow-hidden"
            >
              <img src={song.album.image} alt="" className="w-14 h-14 object-cover flex-shrink-0 rounded-l-xl" />
              <div className="min-w-0 flex-1 pr-3">
                <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">{song.title}</p>
                <p className="text-xs text-muted-foreground truncate">{song.artist.name}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Playlists for you */}
      <section className="mt-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-primary/40 font-body text-xs">02</span>
          <h2 className="text-xs tracking-[0.3em] text-foreground/50 font-body font-medium">DÀNH CHO BẠN</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {playlists.map((pl, i) => (
            <motion.div
              key={pl.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
              onClick={() => navigate(`/app/playlist/${pl.id}`)}
              className="group cursor-pointer"
            >
              <div className="relative aspect-square overflow-hidden mb-3 rounded-2xl shadow-md">
                <img src={pl.image} alt={pl.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors flex items-center justify-center rounded-2xl">
                  <div className="w-12 h-12 rounded-full bg-foreground/80 text-background flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100 shadow-lg">
                    <Play size={18} className="ml-0.5" />
                  </div>
                </div>
              </div>
              <h3 className="font-display text-lg italic group-hover:text-primary transition-colors">{pl.name}</h3>
              <p className="text-xs text-foreground/50 mt-0.5">{pl.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* New releases */}
      <section className="mt-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-primary/40 font-body text-xs">03</span>
          <h2 className="text-xs tracking-[0.3em] text-foreground/50 font-body font-medium">ALBUM MỚI</h2>
        </div>
        <div className="flex gap-5 overflow-x-auto no-scrollbar pb-2">
          {albums.filter(a => a.year >= 2026).map((album, i) => (
            <motion.div
              key={album.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.05, duration: 0.4 }}
              onClick={() => navigate(`/app/album/${album.id}`)}
              className="flex-shrink-0 w-48 group cursor-pointer"
            >
              <div className="aspect-square overflow-hidden mb-3 rounded-2xl shadow-md">
                <img src={album.image} alt={album.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <h3 className="font-display text-lg italic group-hover:text-primary transition-colors">{album.title}</h3>
              <p className="text-xs text-foreground/50">{album.artist.name} · {album.year}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="mt-12 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-primary/40 font-body text-xs">04</span>
          <TrendingUp size={14} className="text-muted-foreground" />
          <h2 className="text-xs tracking-[0.3em] text-foreground/50 font-body font-medium">THỊNH HÀNH</h2>
        </div>
        <div className="bg-card/40 backdrop-blur-md rounded-2xl overflow-hidden">
          {topSongs.map((song, i) => (
            <motion.button
              key={song.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.05, duration: 0.4 }}
              onClick={() => playSong(song, topSongs)}
              className="w-full flex items-center gap-4 py-4 px-5 hover:bg-card/60 transition-colors group text-left border-b border-border/30 last:border-b-0"
            >
              <span className="text-sm font-display text-primary/40 w-6">{String(i + 1).padStart(2, "0")}</span>
              <img src={song.album.image} alt="" className="w-12 h-12 object-cover flex-shrink-0 rounded-lg" />
              <div className="flex-1 min-w-0">
                <p className="text-base font-display italic group-hover:text-primary transition-colors truncate">{song.title}</p>
                <p className="text-xs text-foreground/50 font-body truncate">{song.artist.name}</p>
              </div>
              <span className="text-xs text-foreground/40">{formatNumber(song.playCount)}</span>
              <span className="text-xs text-foreground/40">{formatDuration(song.duration)}</span>
            </motion.button>
          ))}
        </div>
      </section>
      </div>
    </div>
  );
};

export default AppHome;
