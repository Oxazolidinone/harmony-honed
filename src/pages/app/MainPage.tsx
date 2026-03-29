import { useRef, useEffect, useState, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { Play, Clock, TrendingUp, Search as SearchIcon, ListMusic, Heart, Plus, Music, Disc3, Headphones, Mic2, Sparkles, Radio, BarChart3, Star, ArrowRight, Podcast } from "lucide-react";
import { usePlayer } from "@/contexts/PlayerContext";
import { useTheme } from "@/contexts/ThemeContext";
import { getThemeBackgrounds } from "@/lib/themeBackgrounds";
import { albums, playlists, recentlyPlayed, allSongs, artists, genres, formatDuration, formatNumber, moodPlaylists, podcastEpisodes, trendingTags, genreCards } from "@/data/mockData";
import { useNavigate } from "react-router-dom";

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
              backgroundImage: `linear-gradient(hsl(var(--section-overlay) / 0.58), hsl(var(--section-overlay) / 0.65)), url(${bgImage})`,
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

// ─── Subheader ───────────────────────────────────────
const SectionHeader = ({ num, icon: Icon, label }: { num: string; icon: React.ElementType; label: string }) => (
  <div className="flex items-center gap-3 mb-4">
    <span className="text-primary/60 text-xs font-body">{num}</span>
    <Icon size={14} className="text-foreground/70" />
    <h2 className="text-xs tracking-[0.3em] text-foreground/70 font-body">{label}</h2>
  </div>
);

// ─── Main Combined Page ──────────────────────────────
interface AppMainPageProps {
  onActiveSection?: (id: string) => void;
}

const AppMainPage = ({ onActiveSection }: AppMainPageProps) => {
  const { playSong, currentSong } = usePlayer();
  const { theme } = useTheme();
  const backgrounds = getThemeBackgrounds(theme);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeGenre, setActiveGenre] = useState("Tất cả");
  const [libraryTab, setLibraryTab] = useState<"playlists" | "liked" | "history">("playlists");
  const [chartsTab, setChartsTab] = useState<"daily" | "weekly" | "monthly">("daily");

  const topSongs = useMemo(() => [...allSongs].sort((a, b) => b.playCount - a.playCount).slice(0, 10), []);
  const topArtists = useMemo(() => [...artists].sort((a, b) => b.monthlyListeners - a.monthlyListeners), []);
  const likedSongs = allSongs.slice(0, 12);
  const dailyMix = useMemo(() => allSongs.slice(5, 11), []);
  const newReleases = useMemo(() => albums.filter(a => a.year >= 2026), []);
  const risingArtists = useMemo(() => artists.filter(a => a.monthlyListeners < 800000), []);

  const chartSongs = useMemo(() => {
    const sorted = [...allSongs].sort((a, b) => b.playCount - a.playCount);
    if (chartsTab === "daily") return sorted.slice(0, 10);
    if (chartsTab === "weekly") return [...sorted.slice(3, 13)];
    return [...sorted.slice(5, 15)];
  }, [chartsTab]);

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
      <Section id="home" bgImage={backgrounds.sections.home} onVisible={onActiveSection}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="font-display text-4xl md:text-6xl font-light italic mb-2">{greetingTime()}</h1>
          <p className="text-foreground/80 text-base font-body">Tiếp tục hành trình âm nhạc của bạn</p>
        </motion.div>

        {/* Recently played */}
        <div className="mt-10">
          <SectionHeader num="01" icon={Clock} label="NGHE GẦN ĐÂY" />
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
                  <p className="text-xs text-foreground/70 truncate">{song.artist.name}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Daily Mix */}
        <div className="mt-12">
          <SectionHeader num="02" icon={Sparkles} label="DAILY MIX · DÀNH CHO BẠN" />
          <div className="bg-card/40 backdrop-blur-md rounded-2xl overflow-hidden">
            {dailyMix.map((song, i) => (
              <button
                key={song.id}
                onClick={() => playSong(song, dailyMix)}
                className="w-full flex items-center gap-4 py-3 px-5 border-b border-border/30 last:border-b-0 hover:bg-card/60 transition-colors group text-left"
              >
                <span className="text-sm font-display text-primary/40 w-6">{String(i + 1).padStart(2, "0")}</span>
                <img src={song.album.image} alt="" className="w-11 h-11 object-cover flex-shrink-0 rounded-lg" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-display italic group-hover:text-primary transition-colors truncate">{song.title}</p>
                  <p className="text-xs text-foreground/70 font-body truncate">{song.artist.name}</p>
                </div>
                <span className="text-xs text-foreground/80 font-body">{formatDuration(song.duration)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Mood Playlists */}
        <div className="mt-12">
          <SectionHeader num="03" icon={Headphones} label="TÂM TRẠNG" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {moodPlaylists.map((mood, i) => (
              <motion.button
                key={mood.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04 }}
                className={`bg-gradient-to-br ${mood.color} backdrop-blur-md border border-border/30 rounded-2xl p-4 text-left hover:scale-[1.03] transition-all group`}
              >
                <span className="text-2xl">{mood.emoji}</span>
                <p className="font-display text-base italic mt-2 group-hover:text-primary transition-colors">{mood.name}</p>
                <p className="text-[10px] text-foreground/60 font-body mt-0.5">{mood.description}</p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Playlists */}
        <div className="mt-12">
          <SectionHeader num="04" icon={ListMusic} label="PLAYLIST NỔI BẬT" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
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
                <h3 className="font-display text-base italic group-hover:text-primary transition-colors">{pl.name}</h3>
                <p className="text-[10px] text-foreground/70 font-body mt-0.5">{pl.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══════════ DISCOVER ═══════════ */}
      <Section id="discover" bgImage={backgrounds.sections.discover} onVisible={onActiveSection}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h1 className="font-display text-4xl md:text-5xl font-light italic mb-2">Khám phá</h1>
          <p className="text-foreground/80 text-base font-body mb-8">Tìm kiếm âm nhạc mới mỗi ngày</p>
        </motion.div>

        {/* New Releases */}
        <SectionHeader num="01" icon={Disc3} label="MỚI PHÁT HÀNH" />
        <div className="flex gap-5 overflow-x-auto no-scrollbar pb-4">
          {newReleases.map((album, i) => (
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
              <p className="text-xs text-foreground/70 font-body">{album.artist.name} · {album.year}</p>
            </motion.div>
          ))}
        </div>

        {/* Genre Cards */}
        <div className="mt-12">
          <SectionHeader num="02" icon={Radio} label="THỂ LOẠI" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {genreCards.map((genre, i) => (
              <motion.button
                key={genre.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                onClick={() => {
                  setActiveGenre(genre.name);
                  document.getElementById("search")?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`bg-gradient-to-br ${genre.color} rounded-2xl p-5 text-left hover:scale-[1.03] transition-all group relative overflow-hidden`}
              >
                <span className="text-3xl absolute top-3 right-3 opacity-40 group-hover:opacity-70 transition-opacity">{genre.icon}</span>
                <p className="font-display text-lg italic text-background font-semibold relative z-10">{genre.name}</p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Podcasts */}
        <div className="mt-12">
          <SectionHeader num="03" icon={Podcast} label="PODCAST · CÂU CHUYỆN ÂM NHẠC" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {podcastEpisodes.map((ep, i) => (
              <motion.div
                key={ep.id}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 bg-card/50 backdrop-blur-md rounded-2xl p-4 hover:bg-card/70 transition-all group cursor-pointer"
              >
                <img src={ep.image} alt="" className="w-20 h-20 rounded-xl object-cover flex-shrink-0 shadow-sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-primary/60 font-body tracking-wider mb-1">{ep.show}</p>
                  <p className="font-display text-base italic group-hover:text-primary transition-colors truncate">{ep.title}</p>
                  <p className="text-[10px] text-foreground/60 font-body mt-1 line-clamp-2">{ep.description}</p>
                  <p className="text-[10px] text-foreground/80 font-body mt-1">{formatDuration(ep.duration)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* All albums */}
        <div className="mt-12">
          <SectionHeader num="04" icon={Disc3} label="TẤT CẢ ALBUM" />
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
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
                <p className="text-xs text-foreground/70 font-body truncate">{album.artist.name}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══════════ ARTISTS ═══════════ */}
      <Section id="artists" bgImage={backgrounds.sections.artists} onVisible={onActiveSection}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h1 className="font-display text-4xl md:text-5xl font-light italic mb-2">Nghệ sĩ</h1>
          <p className="text-foreground/80 text-base font-body mb-8">Khám phá những tài năng âm nhạc</p>
        </motion.div>

        {/* Featured Artist Spotlight */}
        <SectionHeader num="01" icon={Star} label="NGHỆ SĨ NỔI BẬT" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onClick={() => navigate(`/app/artist/${topArtists[0]?.id}`)}
          className="relative rounded-3xl overflow-hidden mb-12 cursor-pointer group"
        >
          <div className="flex flex-col md:flex-row items-center gap-8 bg-card/50 backdrop-blur-md p-8 rounded-3xl border border-border/30">
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden shadow-xl ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all flex-shrink-0">
              <img src={topArtists[0]?.image} alt={topArtists[0]?.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="text-center md:text-left flex-1">
              <p className="text-xs tracking-[0.3em] text-primary/60 font-body mb-2">SPOTLIGHT</p>
              <h3 className="font-display text-3xl md:text-4xl italic group-hover:text-primary transition-colors">{topArtists[0]?.name}</h3>
              <p className="text-sm text-foreground/70 font-body mt-2 max-w-lg">{topArtists[0]?.bio}</p>
              <div className="flex items-center gap-4 mt-4 justify-center md:justify-start">
                <span className="text-xs text-foreground/80 font-body">{formatNumber(topArtists[0]?.monthlyListeners || 0)} listeners/tháng</span>
                <span className="text-xs text-foreground/80 font-body">{topArtists[0]?.genres.join(" · ")}</span>
              </div>
              <button className="mt-4 flex items-center gap-2 text-xs tracking-wider text-primary hover:text-primary/80 transition-colors font-body mx-auto md:mx-0">
                <Play size={14} /> PHÁT NHẠC
              </button>
            </div>
          </div>
        </motion.div>

        {/* All Artists Grid */}
        <SectionHeader num="02" icon={Music} label="TẤT CẢ NGHỆ SĨ" />
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
              <p className="text-xs text-foreground/70 font-body mt-1">{formatNumber(artist.monthlyListeners)} listeners</p>
              <p className="text-[10px] text-foreground/80 font-body mt-0.5">{artist.genres.join(" · ")}</p>
            </motion.div>
          ))}
        </div>

        {/* Rising Artists */}
        <div className="mt-12">
          <SectionHeader num="03" icon={TrendingUp} label="NGHỆ SĨ MỚI NỔI" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {risingArtists.map((artist, i) => (
              <motion.div
                key={artist.id}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                onClick={() => navigate(`/app/artist/${artist.id}`)}
                className="flex items-center gap-4 bg-card/40 backdrop-blur-sm rounded-2xl p-4 hover:bg-card/60 transition-all group cursor-pointer"
              >
                <img src={artist.image} alt={artist.name} className="w-16 h-16 rounded-full object-cover flex-shrink-0 shadow-sm ring-2 ring-border/30" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-display text-lg italic group-hover:text-primary transition-colors">{artist.name}</h4>
                  <p className="text-xs text-foreground/70 font-body">{artist.genres.join(" · ")}</p>
                  <p className="text-[10px] text-foreground/60 font-body mt-1">{formatNumber(artist.monthlyListeners)} listeners</p>
                </div>
                <ArrowRight size={16} className="text-foreground/30 group-hover:text-primary transition-colors" />
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══════════ SEARCH ═══════════ */}
      <Section id="search" bgImage={backgrounds.sections.search} onVisible={onActiveSection}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h1 className="font-display text-4xl md:text-5xl font-light italic mb-2">Tìm kiếm</h1>
          <p className="text-foreground/80 text-base font-body mb-6">Tìm mọi thứ bạn muốn nghe</p>
        </motion.div>

        <div className="relative mb-6">
          <SearchIcon size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-foreground/70" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm bài hát, nghệ sĩ, album..."
            className="w-full bg-card/60 backdrop-blur-md border border-border/50 rounded-2xl pl-14 pr-5 py-4 text-base text-foreground font-body focus:border-primary focus:outline-none focus:bg-card/80 transition-all shadow-sm"
          />
        </div>

        {/* Trending Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {trendingTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSearchQuery(tag.replace("#", ""))}
              className="px-3 py-1.5 text-[10px] tracking-wider bg-card/40 backdrop-blur-sm border border-border/30 rounded-full text-foreground/60 hover:text-primary hover:border-primary/30 transition-all"
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-8 pb-1">
          {genres.map((g) => (
            <button
              key={g}
              onClick={() => setActiveGenre(g)}
              className={`flex-shrink-0 px-5 py-2.5 text-xs tracking-wider rounded-full transition-all ${
                activeGenre === g
                  ? "bg-foreground text-background shadow-md"
                  : "bg-card/50 backdrop-blur-sm border border-border/50 text-foreground/70 hover:text-foreground hover:bg-card/70"
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        {!hasSearchResults && !searchQuery && activeGenre === "Tất cả" && (
          <div className="text-center py-12">
            <SearchIcon size={48} className="mx-auto text-foreground/10 mb-4" />
            <p className="font-display text-3xl text-foreground/20 italic mb-3">Khám phá</p>
            <p className="text-sm text-foreground/80 font-body">Tìm kiếm hoặc chọn thể loại phía trên</p>

            {/* Quick browse genre cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8 max-w-3xl mx-auto">
              {genreCards.slice(0, 8).map((genre, i) => (
                <motion.button
                  key={genre.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => setActiveGenre(genre.name)}
                  className={`bg-gradient-to-br ${genre.color} rounded-xl p-4 text-left hover:scale-[1.03] transition-all relative overflow-hidden`}
                >
                  <span className="text-xl absolute top-2 right-2 opacity-40">{genre.icon}</span>
                  <p className="font-display text-sm italic text-background font-semibold">{genre.name}</p>
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {searchResults.artists.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xs tracking-[0.3em] text-foreground/70 font-body mb-4">NGHỆ SĨ</h3>
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
            <h3 className="text-xs tracking-[0.3em] text-foreground/70 font-body mb-4">ALBUM</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {searchResults.albums.map((album) => (
                <div key={album.id} onClick={() => navigate(`/app/album/${album.id}`)} className="group cursor-pointer">
                  <div className="aspect-square overflow-hidden mb-2 rounded-xl shadow-sm">
                    <img src={album.image} alt={album.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <p className="text-sm font-display italic group-hover:text-primary transition-colors truncate">{album.title}</p>
                  <p className="text-xs text-foreground/70 font-body truncate">{album.artist.name}</p>
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
                  <p className="text-xs text-foreground/70 font-body truncate">{song.artist.name}</p>
                </div>
                <span className="text-xs text-foreground/80 font-body">{formatDuration(song.duration)}</span>
              </button>
            ))}
          </div>
        )}
      </Section>

      {/* ═══════════ CHARTS ═══════════ */}
      <Section id="charts" bgImage={backgrounds.sections.charts} onVisible={onActiveSection}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h1 className="font-display text-4xl md:text-5xl font-light italic mb-2">Xếp hạng</h1>
          <p className="text-foreground/80 text-base font-body mb-8">Những bài hát được nghe nhiều nhất</p>
        </motion.div>

        {/* Chart period tabs */}
        <div className="flex gap-2 mb-8">
          {([
            { key: "daily" as const, label: "Hôm nay" },
            { key: "weekly" as const, label: "Tuần này" },
            { key: "monthly" as const, label: "Tháng này" },
          ]).map((t) => (
            <button
              key={t.key}
              onClick={() => setChartsTab(t.key)}
              className={`px-5 py-2.5 text-xs tracking-wider rounded-full transition-all ${
                chartsTab === t.key
                  ? "bg-foreground text-background shadow-md"
                  : "bg-card/50 backdrop-blur-sm border border-border/50 text-foreground/70 hover:text-foreground hover:bg-card/70"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Top chart */}
        <div className="bg-card/40 backdrop-blur-md rounded-2xl overflow-hidden">
          {chartSongs.map((song, i) => (
            <motion.button
              key={`${chartsTab}-${song.id}`}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              onClick={() => playSong(song, chartSongs)}
              className="w-full flex items-center gap-4 py-5 px-5 hover:bg-card/60 transition-colors group text-left border-b border-border/30 last:border-b-0"
            >
              <span className={`text-2xl font-display w-10 ${i < 3 ? "text-primary" : "text-primary/30"}`}>{String(i + 1).padStart(2, "0")}</span>
              <img src={song.album.image} alt="" className="w-14 h-14 object-cover flex-shrink-0 rounded-lg shadow-sm" />
              <div className="flex-1 min-w-0">
                <p className="text-lg font-display italic group-hover:text-primary transition-colors truncate">{song.title}</p>
                <p className="text-xs text-foreground/70 font-body truncate">{song.artist.name} · {song.album.title}</p>
              </div>
              <span className="text-xs text-foreground/80 font-body hidden md:block">{formatNumber(song.playCount)}</span>
              <span className="text-xs text-foreground/80 font-body">{formatDuration(song.duration)}</span>
            </motion.button>
          ))}
        </div>

        {/* Top artists by plays */}
        <div className="mt-12">
          <SectionHeader num="02" icon={BarChart3} label="NGHỆ SĨ THỊNH HÀNH" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {topArtists.slice(0, 4).map((artist, i) => (
              <motion.div
                key={artist.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                onClick={() => navigate(`/app/artist/${artist.id}`)}
                className="bg-card/40 backdrop-blur-sm rounded-2xl p-4 text-center hover:bg-card/60 transition-all group cursor-pointer"
              >
                <div className="relative inline-block mb-3">
                  <img src={artist.image} alt={artist.name} className="w-20 h-20 rounded-full object-cover shadow-md" />
                  <span className="absolute -top-1 -right-1 w-6 h-6 bg-primary text-background rounded-full flex items-center justify-center text-[10px] font-bold">
                    {i + 1}
                  </span>
                </div>
                <p className="font-display text-base italic group-hover:text-primary transition-colors">{artist.name}</p>
                <p className="text-[10px] text-foreground/60 font-body mt-1">{formatNumber(artist.monthlyListeners)} listeners</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Rising songs */}
        <div className="mt-8">
          <SectionHeader num="03" icon={TrendingUp} label="ĐANG LÊN" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...allSongs].sort((a, b) => b.playCount - a.playCount).slice(10, 18).map((song) => (
              <button
                key={song.id}
                onClick={() => playSong(song, allSongs)}
                className="flex items-center gap-3 bg-card/40 backdrop-blur-sm rounded-xl p-3 hover:bg-card/60 transition-all group text-left"
              >
                <img src={song.album.image} alt="" className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-display italic truncate group-hover:text-primary transition-colors">{song.title}</p>
                  <p className="text-[10px] text-foreground/70 font-body truncate">{song.artist.name}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══════════ LIBRARY ═══════════ */}
      <Section id="library" bgImage={backgrounds.sections.library} onVisible={onActiveSection}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h1 className="font-display text-4xl md:text-5xl font-light italic mb-2">Thư viện</h1>
          <p className="text-foreground/80 text-base font-body mb-8">Bộ sưu tập âm nhạc của bạn</p>
        </motion.div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            { label: "Bài yêu thích", value: likedSongs.length, icon: Heart, color: "text-rose-400" },
            { label: "Playlist", value: playlists.length, icon: ListMusic, color: "text-blue-400" },
            { label: "Đã nghe", value: recentlyPlayed.length, icon: Headphones, color: "text-emerald-400" },
            { label: "Nghệ sĩ theo dõi", value: artists.length, icon: Mic2, color: "text-purple-400" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-card/50 backdrop-blur-md border border-border/30 rounded-2xl p-4 text-center"
            >
              <stat.icon size={20} className={`mx-auto mb-2 ${stat.color}`} />
              <p className="font-display text-2xl italic">{stat.value}</p>
              <p className="text-[10px] text-foreground/60 font-body tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>

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
                  : "bg-card/50 backdrop-blur-sm border border-border/50 text-foreground/70 hover:text-foreground hover:bg-card/70"
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
                <Plus size={20} className="text-foreground/70 group-hover:text-primary transition-colors" />
              </div>
              <div className="text-left">
                <p className="text-sm font-display italic">Tạo playlist mới</p>
                <p className="text-xs text-foreground/70 font-body">Bắt đầu bộ sưu tập của bạn</p>
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
                    <p className="text-xs text-foreground/70 font-body">{pl.songs.length} bài · {pl.createdBy}</p>
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
                  <p className="text-xs text-foreground/70 font-body truncate">{song.artist.name}</p>
                </div>
                <span className="text-xs text-foreground/80 font-body">{formatDuration(song.duration)}</span>
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
                <span className="text-sm font-display text-primary/60 w-6">{String(i + 1).padStart(2, "0")}</span>
                <img src={song.album.image} alt="" className="w-11 h-11 object-cover flex-shrink-0 rounded-lg" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-display italic group-hover:text-primary transition-colors truncate">{song.title}</p>
                  <p className="text-xs text-foreground/70 font-body truncate">{song.artist.name}</p>
                </div>
                <span className="text-xs text-foreground/80 font-body">{formatDuration(song.duration)}</span>
              </button>
            ))}
          </div>
        )}
      </Section>
    </div>
  );
};

export default AppMainPage;
