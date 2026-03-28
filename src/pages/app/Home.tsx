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
    <div className="relative min-h-full">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <img src={bgHome} alt="" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-background/60" />
      </div>
      <div className="px-6 md:px-10 py-8 relative">
      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="font-display text-3xl md:text-4xl font-light mb-1">{greetingTime()}</h1>
        <p className="text-muted-foreground text-sm">Tiếp tục hành trình âm nhạc của bạn</p>
      </motion.div>

      {/* Recently played */}
      <section className="mt-10">
        <div className="flex items-center gap-2 mb-4">
          <Clock size={14} className="text-muted-foreground" />
          <h2 className="text-xs tracking-[0.3em] text-muted-foreground font-body">NGHE GẦN ĐÂY</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {recentlyPlayed.map((song, i) => (
            <motion.button
              key={song.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              onClick={() => playSong(song, recentlyPlayed)}
              className="flex items-center gap-3 bg-card/60 hover:bg-card transition-colors group text-left"
            >
              <img src={song.album.image} alt="" className="w-12 h-12 object-cover flex-shrink-0" />
              <div className="min-w-0 flex-1 pr-2">
                <p className="text-xs font-medium truncate group-hover:text-primary transition-colors">{song.title}</p>
                <p className="text-[10px] text-muted-foreground truncate">{song.artist.name}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Playlists for you */}
      <section className="mt-12">
        <h2 className="text-xs tracking-[0.3em] text-muted-foreground font-body mb-4">DÀNH CHO BẠN</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {playlists.map((pl, i) => (
            <motion.div
              key={pl.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
              onClick={() => navigate(`/app/playlist/${pl.id}`)}
              className="group cursor-pointer"
            >
              <div className="relative aspect-square overflow-hidden mb-3">
                <img src={pl.image} alt={pl.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-foreground/80 text-background flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play size={16} className="ml-0.5" />
                  </div>
                </div>
              </div>
              <h3 className="text-sm font-medium group-hover:text-primary transition-colors">{pl.name}</h3>
              <p className="text-[11px] text-muted-foreground mt-0.5">{pl.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* New releases */}
      <section className="mt-12">
        <h2 className="text-xs tracking-[0.3em] text-muted-foreground font-body mb-4">ALBUM MỚI</h2>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {albums.filter(a => a.year >= 2026).map((album, i) => (
            <motion.div
              key={album.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.05, duration: 0.4 }}
              onClick={() => navigate(`/app/album/${album.id}`)}
              className="flex-shrink-0 w-48 group cursor-pointer"
            >
              <div className="aspect-square overflow-hidden mb-3">
                <img src={album.image} alt={album.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <h3 className="text-sm font-medium group-hover:text-primary transition-colors">{album.title}</h3>
              <p className="text-[11px] text-muted-foreground">{album.artist.name} · {album.year}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="mt-12 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={14} className="text-muted-foreground" />
          <h2 className="text-xs tracking-[0.3em] text-muted-foreground font-body">THỊNH HÀNH</h2>
        </div>
        <div className="border-t border-border">
          {topSongs.map((song, i) => (
            <motion.button
              key={song.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.05, duration: 0.4 }}
              onClick={() => playSong(song, topSongs)}
              className="w-full flex items-center gap-4 py-3 px-2 border-b border-border hover:bg-card/50 transition-colors group text-left"
            >
              <span className="text-xs text-muted-foreground w-5">{String(i + 1).padStart(2, "0")}</span>
              <img src={song.album.image} alt="" className="w-10 h-10 object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm group-hover:text-primary transition-colors truncate">{song.title}</p>
                <p className="text-[11px] text-muted-foreground truncate">{song.artist.name}</p>
              </div>
              <span className="text-[11px] text-muted-foreground">{formatNumber(song.playCount)}</span>
              <span className="text-[11px] text-muted-foreground">{formatDuration(song.duration)}</span>
            </motion.button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AppHome;
