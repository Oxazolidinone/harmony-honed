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
        className="font-display text-3xl mb-6"
      >
        Thư viện
      </motion.h1>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border mb-8">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex items-center gap-2 px-4 py-3 text-xs tracking-wider transition-colors border-b-2 ${
              tab === t.key
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
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
          <button className="flex items-center gap-3 w-full p-4 border border-dashed border-border hover:border-primary/50 transition-colors mb-6 group">
            <div className="w-12 h-12 flex items-center justify-center bg-muted">
              <Plus size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
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
                className="flex items-center gap-4 p-3 hover:bg-card/60 transition-colors cursor-pointer group"
              >
                <img src={pl.image} alt={pl.name} className="w-14 h-14 object-cover flex-shrink-0" />
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
        <div className="border-t border-border">
          {likedSongs.map((song, i) => (
            <motion.button
              key={song.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => playSong(song, likedSongs)}
              className="w-full flex items-center gap-4 py-3 px-2 border-b border-border hover:bg-card/50 transition-colors group text-left"
            >
              <Heart size={12} className="text-primary flex-shrink-0" fill="currentColor" />
              <img src={song.album.image} alt="" className="w-10 h-10 object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm group-hover:text-primary transition-colors truncate">{song.title}</p>
                <p className="text-xs text-foreground/50 truncate">{song.artist.name}</p>
              </div>
              <span className="text-xs text-foreground/50">{formatDuration(song.duration)}</span>
            </motion.button>
          ))}
        </div>
      )}

      {/* History */}
      {tab === "history" && (
        <div className="border-t border-border">
          {recentlyPlayed.map((song, i) => (
            <motion.button
              key={song.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => playSong(song, recentlyPlayed)}
              className="w-full flex items-center gap-4 py-3 px-2 border-b border-border hover:bg-card/50 transition-colors group text-left"
            >
              <span className="text-xs text-muted-foreground w-5">{String(i + 1).padStart(2, "0")}</span>
              <img src={song.album.image} alt="" className="w-10 h-10 object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm group-hover:text-primary transition-colors truncate">{song.title}</p>
                <p className="text-xs text-foreground/50 truncate">{song.artist.name}</p>
              </div>
              <span className="text-xs text-foreground/50">{formatDuration(song.duration)}</span>
            </motion.button>
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

export default AppLibrary;
