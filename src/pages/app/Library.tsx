import { useState } from "react";
import { motion } from "framer-motion";
import { Music, ListMusic, Clock, Heart, Plus } from "lucide-react";
import { playlists, recentlyPlayed, allSongs, formatDuration } from "@/data/mockData";
import { usePlayer } from "@/contexts/PlayerContext";
import { useNavigate } from "react-router-dom";
import bgLibrary from "@/assets/bg-library.jpg";

type Tab = "playlists" | "liked" | "history";

const AppLibrary = () => {
  const [tab, setTab] = useState<Tab>("playlists");
  const { playSong } = usePlayer();
  const navigate = useNavigate();

  const likedSongs = allSongs.slice(0, 12); // mock liked

  const tabs: { key: Tab; label: string; icon: React.ElementType }[] = [
    { key: "playlists", label: "Playlists", icon: ListMusic },
    { key: "liked", label: "Yêu thích", icon: Heart },
    { key: "history", label: "Lịch sử", icon: Clock },
  ];

  return (
    <div
      className="min-h-full"
      style={{
        backgroundImage: `linear-gradient(hsl(40 20% 95% / 0.4), hsl(40 20% 95% / 0.5)), url(${bgLibrary})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="px-6 md:px-10 py-8">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-display text-4xl md:text-5xl font-light mb-8"
      >
        Thư viện
      </motion.h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-8">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex items-center gap-2 px-5 py-2.5 text-xs tracking-wider rounded-full transition-all ${
              tab === t.key
                ? "bg-foreground text-background shadow-md"
                : "bg-card/50 backdrop-blur-sm border border-border/50 text-muted-foreground hover:text-foreground hover:bg-card/70"
            }`}
          >
            <t.icon size={14} />
            {t.label}
          </button>
        ))}
      </div>

      {/* Playlists */}
      {tab === "playlists" && (
        <div>
          {/* Create new */}
          <button className="flex items-center gap-4 w-full p-5 border border-dashed border-border/60 rounded-2xl hover:border-primary/50 hover:bg-card/30 transition-all mb-6 group">
            <div className="w-14 h-14 flex items-center justify-center bg-muted/60 rounded-xl">
              <Plus size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium">Tạo playlist mới</p>
              <p className="text-xs text-foreground/50">Bắt đầu bộ sưu tập của bạn</p>
            </div>
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {playlists.map((pl, i) => (
              <motion.div
                key={pl.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => navigate(`/app/playlist/${pl.id}`)}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-card/60 backdrop-blur-sm transition-all hover:scale-[1.01] cursor-pointer group"
              >
                <img src={pl.image} alt={pl.name} className="w-16 h-16 object-cover flex-shrink-0 rounded-xl shadow-sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium group-hover:text-primary transition-colors truncate">{pl.name}</p>
                  <p className="text-xs text-foreground/50">{pl.songs.length} bài · {pl.createdBy}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Liked songs */}
      {tab === "liked" && (
        <div className="bg-card/40 backdrop-blur-md rounded-2xl overflow-hidden">
          {likedSongs.map((song, i) => (
            <motion.button
              key={song.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => playSong(song, likedSongs)}
              className="w-full flex items-center gap-4 py-3.5 px-5 border-b border-border/30 last:border-b-0 hover:bg-card/60 transition-colors group text-left"
            >
              <Heart size={12} className="text-primary flex-shrink-0" fill="currentColor" />
              <img src={song.album.image} alt="" className="w-11 h-11 object-cover flex-shrink-0 rounded-lg" />
              <div className="flex-1 min-w-0">
                <p className="text-sm group-hover:text-primary transition-colors truncate">{song.title}</p>
                <p className="text-xs text-foreground/50 truncate">{song.artist.name}</p>
              </div>
              <span className="text-xs text-foreground/40">{formatDuration(song.duration)}</span>
            </motion.button>
          ))}
        </div>
      )}

      {/* History */}
      {tab === "history" && (
        <div className="bg-card/40 backdrop-blur-md rounded-2xl overflow-hidden">
          {recentlyPlayed.map((song, i) => (
            <motion.button
              key={song.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => playSong(song, recentlyPlayed)}
              className="w-full flex items-center gap-4 py-3.5 px-5 border-b border-border/30 last:border-b-0 hover:bg-card/60 transition-colors group text-left"
            >
              <span className="text-sm font-display text-muted-foreground w-6">{String(i + 1).padStart(2, "0")}</span>
              <img src={song.album.image} alt="" className="w-11 h-11 object-cover flex-shrink-0 rounded-lg" />
              <div className="flex-1 min-w-0">
                <p className="text-sm group-hover:text-primary transition-colors truncate">{song.title}</p>
                <p className="text-xs text-foreground/50 truncate">{song.artist.name}</p>
              </div>
              <span className="text-xs text-foreground/40">{formatDuration(song.duration)}</span>
            </motion.button>
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

export default AppLibrary;
