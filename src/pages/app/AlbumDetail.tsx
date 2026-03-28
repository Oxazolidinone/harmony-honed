import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Play, ArrowLeft, Clock } from "lucide-react";
import { albums, formatDuration } from "@/data/mockData";
import { usePlayer } from "@/contexts/PlayerContext";

const AlbumDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { playSong, currentSong } = usePlayer();

  const album = albums.find((a) => a.id === id);
  if (!album) return <div className="p-10 text-muted-foreground">Không tìm thấy album</div>;

  const totalDuration = album.songs.reduce((sum, s) => sum + s.duration, 0);

  return (
    <div>
      {/* Header */}
      <div className="px-6 md:px-10 py-8 flex flex-col md:flex-row gap-8 items-end border-b border-border/50">
        <button onClick={() => navigate(-1)} className="absolute top-4 left-4 text-foreground/60 hover:text-foreground transition-colors">
          <ArrowLeft size={18} />
        </button>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-48 h-48 md:w-56 md:h-56 overflow-hidden flex-shrink-0 shadow-xl rounded-2xl"
        >
          <img src={album.image} alt={album.title} className="w-full h-full object-cover" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <p className="text-[10px] tracking-[0.3em] text-muted-foreground mb-2">ALBUM · {album.year}</p>
          <h1 className="font-display text-3xl md:text-5xl font-light mb-2">{album.title}</h1>
          <p
            onClick={() => navigate(`/app/artist/${album.artist.id}`)}
            className="text-sm text-foreground hover:text-primary transition-colors cursor-pointer"
          >
            {album.artist.name}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {album.songs.length} bài · {formatDuration(totalDuration)} · {album.genre}
          </p>
        </motion.div>
      </div>

      {/* Play button */}
      <div className="px-6 md:px-10 py-4 flex items-center gap-4 border-b border-border/50">
        <button
          onClick={() => playSong(album.songs[0], album.songs)}
          className="w-11 h-11 rounded-full bg-foreground text-background flex items-center justify-center hover:scale-105 transition-transform shadow-md"
        >
          <Play size={16} className="ml-0.5" />
        </button>
      </div>

      {/* Tracks */}
      <div className="px-6 md:px-10 pb-8">
        <div className="flex items-center gap-4 py-3 px-4 text-[10px] tracking-wider text-muted-foreground">
          <span className="w-5">#</span>
          <span className="flex-1">TIÊU ĐỀ</span>
          <Clock size={12} />
        </div>
        <div className="bg-card/30 backdrop-blur-sm rounded-2xl overflow-hidden">
          {album.songs.map((song, i) => {
            const isActive = currentSong?.id === song.id;
            return (
              <motion.button
                key={song.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                onClick={() => playSong(song, album.songs)}
                className={`w-full flex items-center gap-4 py-4 px-4 hover:bg-card/50 transition-colors group text-left border-b border-border/30 last:border-b-0 ${isActive ? "text-primary" : ""}`}
              >
                <span className="text-sm font-display text-muted-foreground w-5">{String(i + 1).padStart(2, "0")}</span>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm truncate ${isActive ? "text-primary" : "group-hover:text-primary"} transition-colors`}>{song.title}</p>
                </div>
                <span className="text-xs text-muted-foreground">{formatDuration(song.duration)}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AlbumDetail;
