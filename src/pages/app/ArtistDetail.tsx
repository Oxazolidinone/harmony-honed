import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Play, ArrowLeft } from "lucide-react";
import { artists, albums, allSongs, formatDuration, formatNumber } from "@/data/mockData";
import { usePlayer } from "@/contexts/PlayerContext";

const ArtistDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { playSong, currentSong } = usePlayer();

  const artist = artists.find((a) => a.id === id);
  if (!artist) return <div className="p-10 text-muted-foreground">Không tìm thấy nghệ sĩ</div>;

  const artistAlbums = albums.filter((a) => a.artist.id === artist.id);
  const artistSongs = allSongs.filter((s) => s.artist.id === artist.id).sort((a, b) => b.playCount - a.playCount);
  const topSongs = artistSongs.slice(0, 5);

  return (
    <div>
      {/* Hero */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img src={artist.image} alt={artist.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-10 pb-8">
          <button onClick={() => navigate(-1)} className="mb-4 text-foreground/60 hover:text-foreground transition-colors">
            <ArrowLeft size={18} />
          </button>
          <p className="text-[10px] tracking-[0.3em] text-muted-foreground mb-2">NGHỆ SĨ</p>
          <h1 className="font-display text-4xl md:text-6xl font-light">{artist.name}</h1>
          <p className="text-sm text-muted-foreground mt-2">
            {formatNumber(artist.monthlyListeners)} người nghe hàng tháng · {artist.genres.join(", ")}
          </p>
        </div>
      </div>

      {/* Bio */}
      <div className="px-6 md:px-10 py-6 border-b border-border">
        <p className="text-sm text-foreground/70 leading-relaxed max-w-2xl">{artist.bio}</p>
      </div>

      {/* Top songs */}
      <section className="px-6 md:px-10 py-8">
        <h2 className="text-xs tracking-[0.3em] text-muted-foreground mb-4">BÀI HÁT PHỔ BIẾN</h2>
        <div className="border-t border-border">
          {topSongs.map((song, i) => {
            const isActive = currentSong?.id === song.id;
            return (
              <motion.button
                key={song.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => playSong(song, artistSongs)}
                className={`w-full flex items-center gap-4 py-3 px-2 border-b border-border hover:bg-card/50 transition-colors group text-left ${isActive ? "text-primary" : ""}`}
              >
                <span className="text-xs text-muted-foreground w-5">{String(i + 1).padStart(2, "0")}</span>
                <img src={song.album.image} alt="" className="w-10 h-10 object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className={`text-sm truncate ${isActive ? "text-primary" : "group-hover:text-primary"} transition-colors`}>{song.title}</p>
                </div>
                <span className="text-[11px] text-muted-foreground">{formatNumber(song.playCount)}</span>
                <span className="text-[11px] text-muted-foreground">{formatDuration(song.duration)}</span>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Albums */}
      <section className="px-6 md:px-10 pb-8">
        <h2 className="text-xs tracking-[0.3em] text-muted-foreground mb-4">ALBUM</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {artistAlbums.map((album) => (
            <div
              key={album.id}
              onClick={() => navigate(`/app/album/${album.id}`)}
              className="group cursor-pointer"
            >
              <div className="aspect-square overflow-hidden mb-2">
                <img src={album.image} alt={album.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <p className="text-sm font-medium group-hover:text-primary transition-colors">{album.title}</p>
              <p className="text-[11px] text-muted-foreground">{album.year} · {album.genre}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ArtistDetail;
