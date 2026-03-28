import { useRef, useEffect, useState, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { Play, Clock, TrendingUp, Search as SearchIcon, ListMusic, Heart, Plus, Music, Disc3 } from "lucide-react";
import { usePlayer } from "@/contexts/PlayerContext";
import { albums, playlists, recentlyPlayed, allSongs, artists, genres, formatDuration, formatNumber } from "@/data/mockData";
import { useNavigate } from "react-router-dom";
import bgHome from "@/assets/bg-home.jpg";
import bgSearch from "@/assets/bg-search.jpg";
import bgLibrary from "@/assets/bg-library.jpg";

// ─── Greeting ────────────────────────────────────────
const greetingTime = () => {
  const h = new Date().getHours();
  if (h < 12) return "Chào buổi sáng";
  if (h < 18) return "Chào buổi chiều";
  return "Chào buổi tối";
};

// ─── Section wrapper ─────────────────────────────────
const Section = ({
  id,
  bgImage,
  children,
  onVisible,
}: {
  id: string;
  bgImage?: string;
  children: React.ReactNode;
  onVisible?: (id: string) => void;
}) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount: 0.3 });

  useEffect(() => {
    if (isInView) onVisible?.(id);
  }, [isInView, id, onVisible]);

  return (
    <section
      ref={ref}
      id={id}
      className="min-h-screen relative"
      style={
        bgImage
          ? {
              backgroundImage: `linear-gradient(hsl(40 20% 95% / 0.45), hsl(40 20% 95% / 0.55)), url(${bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
            }
          : undefined
      }
    >
      <div className="px-6 md:px-10 py-12">{children}</div>
    </section>
  );
};

// ─── Main Combined Page ──────────────────────────────
interface AppMainPageProps {
  onActiveSection?: (id: string) => void;
}

const AppMainPage = ({ onActiveSection }: AppMainPageProps) => {
  const { playSong, currentSong } = usePlayer();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeGenre, setActiveGenre] = useState("Tất cả");
  const [libraryTab, setLibraryTab] = useState<"playlists" | "liked" | "history">("playlists");

  const topSongs = useMemo(() => [...allSongs].sort((a, b) => b.playCount - a.playCount).slice(0, 5), []);
  const topArtists = useMemo(() => [...artists].sort((a, b) => b.monthlyListeners - a.monthlyListeners), []);
  const likedSongs = allSongs.slice(0, 12);

  const searchResults = useMemo(() => {
    const q = searchQuery.toLowerCase();
    if (!q && activeGenre === "Tất cả") return { songs: [], albums: [], artists: [] };
    let fs = allSongs, fa = albums, far = artists;
    if (activeGenre !== "Tất cả") {
      fs = fs.filter(s => s.album.genre === activeGenre);
      fa = fa.filter(a => a.genre === activeGenre);
      far = far.filter(a => a.genres.includes(activeGenre));
    }
    if (q) {
      fs = fs.filter(s => s.title.toLowerCase().includes(q) || s.artist.name.toLowerCase().includes(q));
      fa = fa.filter(a => a.title.toLowerCase().includes(q) || a.artist.name.toLowerCase().includes(q));
      far = far.filter(a => a.name.toLowerCase().includes(q));
    }
    return { songs: fs.slice(0, 10), albums: fa, artists: far };
  }, [searchQuery, activeGenre]);

  const hasSearchResults = searchResults.songs.length > 0 || searchResults.albums.length > 0 || searchResults.artists.length > 0;

  return (
    <div className="scroll-smooth">
      {/* ═══════════ HOME ═══════════ */}
      <Section id="home" bgImage={bgHome} onVisible={onActiveSection}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="font-display text-4xl md:text-6xl font-light italic mb-2">{greetingTime()}</h1>
          <p className="text-foreground/60 text-base font-body">Tiếp tục hành trình âm nhạc của bạn</p>
        </motion.div>

        {/* Recently played */}
        <div className="mt-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-primary/40 text-xs font-body">01</span>
            <Clock size={14} className="text-muted-foreground" />
            <h2 className="text-xs tracking-[0.3em] text-foreground/50 font-body">NGHE GẦN ĐÂY</h2>
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
        </div>

        {/* Playlists */}
        <div className="mt-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-primary/40 text-xs font-body">02</span>
            <h2 className="text-xs tracking-[0.3em] text-foreground/50 font-body">DÀNH CHO BẠN</h2>
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
                <p className="text-xs text-foreground/50 font-body mt-0.5">{pl.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══════════ DISCOVER ═══════════ */}
      <Section id="discover" onVisible={onActiveSection}>
        <div className="section-fade-top" />
        <div className="flex items-center gap-3 mb-6">
          <span className="text-primary/40 text-xs font-body">03</span>
          <Disc3 size={14} className="text-muted-foreground" />
          <h2 className="text-xs tracking-[0.3em] text-foreground/50 font-body">KHÁM PHÁ · ALBUM MỚI</h2>
        </div>

        <div className="flex gap-5 overflow-x-auto no-scrollbar pb-4">
          {albums.filter(a => a.year >= 2026).map((album, i) => (
            <motion.div
              key={album.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => navigate(`/app/album/${album.id}`)}
              className="flex-shrink-0 w-48 group cursor-pointer"
            >
              <div className="aspect-square overflow-hidden mb-3 rounded-2xl shadow-md">
                <img src={album.image} alt={album.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <h3 className="font-display text-lg italic group-hover:text-primary transition-colors">{album.title}</h3>
              <p className="text-xs text-foreground/50 font-body">{album.artist.name} · {album.year}</p>
            </motion.div>
          ))}
        </div>

        {/* All albums */}
        <div className="mt-12">
          <h3 className="text-xs tracking-[0.3em] text-foreground/50 font-body mb-4">TẤT CẢ ALBUM</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {albums.map((album) => (
              <div
                key={album.id}
                onClick={() => navigate(`/app/album/${album.id}`)}
                className="group cursor-pointer"
              >
                <div className="aspect-square overflow-hidden mb-2 rounded-xl shadow-sm">
                  <img src={album.image} alt={album.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <p className="text-sm font-display italic group-hover:text-primary transition-colors truncate">{album.title}</p>
                <p className="text-xs text-muted-foreground font-body truncate">{album.artist.name}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══════════ ARTISTS ═══════════ */}
      <Section id="artists" onVisible={onActiveSection}>
        <div className="flex items-center gap-3 mb-8">
          <span className="text-primary/40 text-xs font-body">04</span>
          <Music size={14} className="text-muted-foreground" />
          <h2 className="text-xs tracking-[0.3em] text-foreground/50 font-body">NGHỆ SĨ</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {topArtists.map((artist, i) => (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => navigate(`/app/artist/${artist.id}`)}
              className="group cursor-pointer text-center"
            >
              <div className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full overflow-hidden shadow-md mb-4 ring-2 ring-card/50 group-hover:ring-primary/30 transition-all">
                <img src={artist.image} alt={artist.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <h3 className="font-display text-xl italic group-hover:text-primary transition-colors">{artist.name}</h3>
              <p className="text-xs text-muted-foreground font-body mt-1">{formatNumber(artist.monthlyListeners)} listeners</p>
              <p className="text-[10px] text-foreground/30 font-body mt-0.5">{artist.genres.join(" · ")}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ═══════════ SEARCH ═══════════ */}
      <Section id="search" bgImage={bgSearch} onVisible={onActiveSection}>
        <div className="flex items-center gap-3 mb-6">
          <span className="text-primary/40 text-xs font-body">05</span>
          <SearchIcon size={14} className="text-muted-foreground" />
          <h2 className="text-xs tracking-[0.3em] text-foreground/50 font-body">TÌM KIẾM</h2>
        </div>

        <div className="relative mb-8">
          <SearchIcon size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm bài hát, nghệ sĩ, album..."
            className="w-full bg-card/60 backdrop-blur-md border border-border/50 rounded-2xl pl-14 pr-5 py-4 text-base text-foreground font-body focus:border-primary focus:outline-none focus:bg-card/80 transition-all shadow-sm"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-8 pb-1">
          {genres.map((g) => (
            <button
              key={g}
              onClick={() => setActiveGenre(g)}
              className={`flex-shrink-0 px-5 py-2.5 text-xs tracking-wider rounded-full transition-all ${
                activeGenre === g
                  ? "bg-foreground text-background shadow-md"
                  : "bg-card/50 backdrop-blur-sm border border-border/50 text-muted-foreground hover:text-foreground hover:bg-card/70"
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        {!hasSearchResults && !searchQuery && activeGenre === "Tất cả" && (
          <div className="text-center py-16">
            <p className="font-display text-5xl text-foreground/20 italic mb-3">Khám phá</p>
            <p className="text-base text-foreground/30 font-body">Tìm kiếm hoặc chọn thể loại</p>
          </div>
        )}

        {searchResults.artists.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xs tracking-[0.3em] text-muted-foreground font-body mb-4">NGHỆ SĨ</h3>
            <div className="flex gap-5 overflow-x-auto no-scrollbar">
              {searchResults.artists.map((artist) => (
                <div key={artist.id} onClick={() => navigate(`/app/artist/${artist.id}`)} className="flex-shrink-0 w-36 text-center group cursor-pointer">
                  <img src={artist.image} alt={artist.name} className="w-28 h-28 rounded-full object-cover mx-auto mb-3 group-hover:scale-105 transition-transform shadow-md" />
                  <p className="text-sm font-display italic group-hover:text-primary transition-colors">{artist.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {searchResults.albums.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xs tracking-[0.3em] text-muted-foreground font-body mb-4">ALBUM</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {searchResults.albums.map((album) => (
                <div key={album.id} onClick={() => navigate(`/app/album/${album.id}`)} className="group cursor-pointer">
                  <div className="aspect-square overflow-hidden mb-2 rounded-xl shadow-sm">
                    <img src={album.image} alt={album.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <p className="text-sm font-display italic group-hover:text-primary transition-colors truncate">{album.title}</p>
                  <p className="text-xs text-muted-foreground font-body truncate">{album.artist.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {searchResults.songs.length > 0 && (
          <div className="bg-card/40 backdrop-blur-md rounded-2xl overflow-hidden">
            {searchResults.songs.map((song) => (
              <button
                key={song.id}
                onClick={() => playSong(song, searchResults.songs)}
                className="w-full flex items-center gap-4 py-3.5 px-5 border-b border-border/30 last:border-b-0 hover:bg-card/60 transition-colors group text-left"
              >
                <div className="w-11 h-11 relative flex-shrink-0 rounded-lg overflow-hidden">
                  <img src={song.album.image} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 flex items-center justify-center transition-colors">
                    <Play size={12} className="opacity-0 group-hover:opacity-100 text-background transition-opacity" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-display italic group-hover:text-primary transition-colors truncate">{song.title}</p>
                  <p className="text-xs text-foreground/50 font-body truncate">{song.artist.name}</p>
                </div>
                <span className="text-xs text-foreground/40 font-body">{formatDuration(song.duration)}</span>
              </button>
            ))}
          </div>
        )}
      </Section>

      {/* ═══════════ CHARTS ═══════════ */}
      <Section id="charts" onVisible={onActiveSection}>
        <div className="flex items-center gap-3 mb-8">
          <span className="text-primary/40 text-xs font-body">06</span>
          <TrendingUp size={14} className="text-muted-foreground" />
          <h2 className="text-xs tracking-[0.3em] text-foreground/50 font-body">XẾP HẠNG · THỊNH HÀNH</h2>
        </div>

        <div className="bg-card/40 backdrop-blur-md rounded-2xl overflow-hidden">
          {topSongs.map((song, i) => (
            <motion.button
              key={song.id}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => playSong(song, topSongs)}
              className="w-full flex items-center gap-4 py-5 px-5 hover:bg-card/60 transition-colors group text-left border-b border-border/30 last:border-b-0"
            >
              <span className="text-2xl font-display text-primary/30 w-10">{String(i + 1).padStart(2, "0")}</span>
              <img src={song.album.image} alt="" className="w-14 h-14 object-cover flex-shrink-0 rounded-lg shadow-sm" />
              <div className="flex-1 min-w-0">
                <p className="text-lg font-display italic group-hover:text-primary transition-colors truncate">{song.title}</p>
                <p className="text-xs text-foreground/50 font-body truncate">{song.artist.name} · {song.album.title}</p>
              </div>
              <span className="text-xs text-foreground/40 font-body">{formatNumber(song.playCount)}</span>
              <span className="text-xs text-foreground/40 font-body">{formatDuration(song.duration)}</span>
            </motion.button>
          ))}
        </div>

        {/* More trending from all songs */}
        <div className="mt-8">
          <h3 className="text-xs tracking-[0.3em] text-foreground/50 font-body mb-4">ĐANG LÊN</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...allSongs].sort((a, b) => b.playCount - a.playCount).slice(5, 13).map((song) => (
              <button
                key={song.id}
                onClick={() => playSong(song, allSongs)}
                className="flex items-center gap-3 bg-card/40 backdrop-blur-sm rounded-xl p-3 hover:bg-card/60 transition-all group text-left"
              >
                <img src={song.album.image} alt="" className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-display italic truncate group-hover:text-primary transition-colors">{song.title}</p>
                  <p className="text-[10px] text-muted-foreground font-body truncate">{song.artist.name}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══════════ LIBRARY ═══════════ */}
      <Section id="library" bgImage={bgLibrary} onVisible={onActiveSection}>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-primary/40 text-xs font-body">07</span>
          <ListMusic size={14} className="text-muted-foreground" />
          <h2 className="text-xs tracking-[0.3em] text-foreground/50 font-body">THƯ VIỆN</h2>
        </div>
        <h2 className="font-display text-4xl md:text-5xl font-light italic mb-8">Thư viện</h2>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {([
            { key: "playlists" as const, label: "Playlists", icon: ListMusic },
            { key: "liked" as const, label: "Yêu thích", icon: Heart },
            { key: "history" as const, label: "Lịch sử", icon: Clock },
          ]).map((t) => (
            <button
              key={t.key}
              onClick={() => setLibraryTab(t.key)}
              className={`flex items-center gap-2 px-5 py-2.5 text-xs tracking-wider rounded-full transition-all ${
                libraryTab === t.key
                  ? "bg-foreground text-background shadow-md"
                  : "bg-card/50 backdrop-blur-sm border border-border/50 text-muted-foreground hover:text-foreground hover:bg-card/70"
              }`}
            >
              <t.icon size={14} />
              {t.label}
            </button>
          ))}
        </div>

        {libraryTab === "playlists" && (
          <div>
            <button className="flex items-center gap-4 w-full p-5 border border-dashed border-border/60 rounded-2xl hover:border-primary/50 hover:bg-card/30 transition-all mb-6 group">
              <div className="w-14 h-14 flex items-center justify-center bg-muted/60 rounded-xl">
                <Plus size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div className="text-left">
                <p className="text-sm font-display italic">Tạo playlist mới</p>
                <p className="text-xs text-foreground/50 font-body">Bắt đầu bộ sưu tập của bạn</p>
              </div>
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {playlists.map((pl, i) => (
                <motion.div
                  key={pl.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => navigate(`/app/playlist/${pl.id}`)}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-card/60 backdrop-blur-sm transition-all hover:scale-[1.01] cursor-pointer group"
                >
                  <img src={pl.image} alt={pl.name} className="w-16 h-16 object-cover flex-shrink-0 rounded-xl shadow-sm" />
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-base italic group-hover:text-primary transition-colors truncate">{pl.name}</p>
                    <p className="text-xs text-foreground/50 font-body">{pl.songs.length} bài · {pl.createdBy}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {libraryTab === "liked" && (
          <div className="bg-card/40 backdrop-blur-md rounded-2xl overflow-hidden">
            {likedSongs.map((song, i) => (
              <button
                key={song.id}
                onClick={() => playSong(song, likedSongs)}
                className="w-full flex items-center gap-4 py-3.5 px-5 border-b border-border/30 last:border-b-0 hover:bg-card/60 transition-colors group text-left"
              >
                <Heart size={12} className="text-primary flex-shrink-0" fill="currentColor" />
                <img src={song.album.image} alt="" className="w-11 h-11 object-cover flex-shrink-0 rounded-lg" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-display italic group-hover:text-primary transition-colors truncate">{song.title}</p>
                  <p className="text-xs text-foreground/50 font-body truncate">{song.artist.name}</p>
                </div>
                <span className="text-xs text-foreground/40 font-body">{formatDuration(song.duration)}</span>
              </button>
            ))}
          </div>
        )}

        {libraryTab === "history" && (
          <div className="bg-card/40 backdrop-blur-md rounded-2xl overflow-hidden">
            {recentlyPlayed.map((song, i) => (
              <button
                key={song.id}
                onClick={() => playSong(song, recentlyPlayed)}
                className="w-full flex items-center gap-4 py-3.5 px-5 border-b border-border/30 last:border-b-0 hover:bg-card/60 transition-colors group text-left"
              >
                <span className="text-sm font-display text-primary/40 w-6">{String(i + 1).padStart(2, "0")}</span>
                <img src={song.album.image} alt="" className="w-11 h-11 object-cover flex-shrink-0 rounded-lg" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-display italic group-hover:text-primary transition-colors truncate">{song.title}</p>
                  <p className="text-xs text-foreground/50 font-body truncate">{song.artist.name}</p>
                </div>
                <span className="text-xs text-foreground/40 font-body">{formatDuration(song.duration)}</span>
              </button>
            ))}
          </div>
        )}
      </Section>
    </div>
  );
};

export default AppMainPage;
