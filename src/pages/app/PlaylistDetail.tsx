import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Play, ArrowLeft, Clock, MoreHorizontal } from "lucide-react";
import { playlists, formatDuration } from "@/data/mockData";
import { usePlayer } from "@/contexts/PlayerContext";

const PlaylistDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { playSong, currentSong, isPlaying } = usePlayer();

  const playlist = playlists.find((p) => p.id === id);
  if (!playlist) return <div className="p-10 text-muted-foreground">Không tìm thấy playlist</div>;

  const totalDuration = playlist.songs.reduce((sum, s) => sum + s.duration, 0);

  return (
    <div>
      {/* Header */}
      <div className="relative h-64 md:h-80 overflow-hidden rounded-b-3xl">
        <img src={playlist.image} alt={playlist.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-10 pb-8">
          <button onClick={() => navigate(-1)} className="mb-4 text-foreground/60 hover:text-foreground transition-colors">
            <ArrowLeft size={18} />
          </button>
          <p className="text-[10px] tracking-[0.3em] text-muted-foreground mb-2">PLAYLIST</p>
          <h1 className="font-display text-3xl md:text-5xl font-light">{playlist.name}</h1>
          <p className="text-sm text-muted-foreground mt-2">
            {playlist.songs.length} bài · {formatDuration(totalDuration)} · {playlist.createdBy}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="px-6 md:px-10 py-4 flex items-center gap-4">
        <button
          onClick={() => playSong(playlist.songs[0], playlist.songs)}
          className="w-11 h-11 rounded-full bg-foreground text-background flex items-center justify-center hover:scale-105 transition-transform shadow-md"
        >
          <Play size={16} className="ml-0.5" />
        </button>
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* Song list */}
      <div className="px-6 md:px-10 pb-8">
        <div className="flex items-center gap-4 py-3 px-4 text-[10px] tracking-wider text-muted-foreground">
          <span className="w-5">#</span>
          <span className="flex-1">TIÊU ĐỀ</span>
          <span className="hidden md:block w-32">ALBUM</span>
          <Clock size={12} />
        </div>
        <div className="bg-card/30 backdrop-blur-sm rounded-2xl overflow-hidden">
          {playlist.songs.map((song, i) => {
            const isActive = currentSong?.id === song.id;
            return (
              <motion.button
                key={song.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                onClick={() => playSong(song, playlist.songs)}
                className={`w-full flex items-center gap-4 py-3.5 px-4 border-b border-border/30 last:border-b-0 hover:bg-card/50 transition-colors group text-left ${isActive ? "text-primary" : ""}`}
              >
                <span className="text-sm font-display text-muted-foreground w-5">{String(i + 1).padStart(2, "0")}</span>
                <img src={song.album.image} alt="" className="w-11 h-11 object-cover flex-shrink-0 rounded-lg" />
                <div className="flex-1 min-w-0">
                  <p className={`text-sm truncate ${isActive ? "text-primary" : "group-hover:text-primary"} transition-colors`}>{song.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{song.artist.name}</p>
                </div>
                <span className="hidden md:block text-xs text-muted-foreground w-32 truncate">{song.album.title}</span>
                <span className="text-xs text-muted-foreground">{formatDuration(song.duration)}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PlaylistDetail;
