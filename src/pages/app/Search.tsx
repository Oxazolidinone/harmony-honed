import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search as SearchIcon, Play } from "lucide-react";
import { usePlayer } from "@/contexts/PlayerContext";
import { allSongs, albums, artists, genres, formatDuration } from "@/data/mockData";
import { useNavigate } from "react-router-dom";
import bgSearch from "@/assets/bg-search.jpg";

const AppSearch = () => {
  const [query, setQuery] = useState("");
  const [activeGenre, setActiveGenre] = useState("Tất cả");
  const { playSong } = usePlayer();
  const navigate = useNavigate();

  const results = useMemo(() => {
    const q = query.toLowerCase();
    if (!q && activeGenre === "Tất cả") return { songs: [], albums: [], artists: [] };
    
    let filteredSongs = allSongs;
    let filteredAlbums = albums;
    let filteredArtists = artists;

    if (activeGenre !== "Tất cả") {
      filteredSongs = filteredSongs.filter(s => s.album.genre === activeGenre);
      filteredAlbums = filteredAlbums.filter(a => a.genre === activeGenre);
      filteredArtists = filteredArtists.filter(a => a.genres.includes(activeGenre));
    }

    if (q) {
      filteredSongs = filteredSongs.filter(s => s.title.toLowerCase().includes(q) || s.artist.name.toLowerCase().includes(q));
      filteredAlbums = filteredAlbums.filter(a => a.title.toLowerCase().includes(q) || a.artist.name.toLowerCase().includes(q));
      filteredArtists = filteredArtists.filter(a => a.name.toLowerCase().includes(q));
    }

    return { songs: filteredSongs.slice(0, 10), albums: filteredAlbums, artists: filteredArtists };
  }, [query, activeGenre]);

  const hasResults = results.songs.length > 0 || results.albums.length > 0 || results.artists.length > 0;

  return (
    <div
      className="min-h-full relative"
      style={{
        backgroundImage: `linear-gradient(hsl(40 20% 96% / 0.58), hsl(40 20% 96% / 0.65)), url(${bgSearch})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Vertical accent */}
      <div className="absolute right-4 top-24 hidden lg:block">
        <p className="writing-vertical text-xs tracking-[0.5em] text-foreground/15 font-body">探索 · EXPLORE</p>
      </div>

      <div className="px-6 md:px-10 py-8">
      <p className="text-[10px] tracking-[0.4em] text-muted-foreground font-body mb-6">検索 · SEARCH</p>

      {/* Search bar */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative mb-8">
        <SearchIcon size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tìm bài hát, nghệ sĩ, album..."
          className="w-full bg-card/60 backdrop-blur-md border border-border/50 rounded-2xl pl-14 pr-5 py-4 text-base text-foreground font-body focus:border-primary focus:outline-none focus:bg-card/80 transition-all shadow-sm"
        />
      </motion.div>

      {/* Genre pills */}
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

      {!hasResults && !query && activeGenre === "Tất cả" && (
        <div className="text-center py-24">
          <p className="font-display text-5xl text-foreground/30 italic mb-3">Khám phá</p>
          <p className="text-base text-foreground/40 font-body">Tìm kiếm hoặc chọn thể loại để bắt đầu</p>
        </div>
      )}

      {/* Artists */}
      {results.artists.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-primary/40 font-body text-xs">01</span>
            <h2 className="text-xs tracking-[0.3em] text-muted-foreground font-body">NGHỆ SĨ</h2>
          </div>
          <div className="flex gap-5 overflow-x-auto no-scrollbar">
            {results.artists.map((artist) => (
              <div
                key={artist.id}
                onClick={() => navigate(`/app/artist/${artist.id}`)}
                className="flex-shrink-0 w-36 text-center group cursor-pointer"
              >
                <img src={artist.image} alt={artist.name} className="w-28 h-28 rounded-full object-cover mx-auto mb-3 group-hover:scale-105 transition-transform shadow-md ring-2 ring-card/50" />
                <p className="text-sm font-display italic group-hover:text-primary transition-colors">{artist.name}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Albums */}
      {results.albums.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-primary/40 font-body text-xs">02</span>
            <h2 className="text-xs tracking-[0.3em] text-muted-foreground font-body">ALBUM</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {results.albums.map((album) => (
              <div
                key={album.id}
                onClick={() => navigate(`/app/album/${album.id}`)}
                className="group cursor-pointer"
              >
                <div className="relative aspect-square overflow-hidden mb-2 rounded-xl shadow-sm">
                  <img src={album.image} alt={album.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <p className="text-sm font-display italic group-hover:text-primary transition-colors truncate">{album.title}</p>
                <p className="text-xs text-muted-foreground font-body truncate">{album.artist.name}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Songs */}
      {results.songs.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-primary/40 font-body text-xs">03</span>
            <h2 className="text-xs tracking-[0.3em] text-muted-foreground font-body">BÀI HÁT</h2>
          </div>
          <div className="bg-card/40 backdrop-blur-md rounded-2xl overflow-hidden">
            {results.songs.map((song) => (
              <button
                key={song.id}
                onClick={() => playSong(song, results.songs)}
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
        </section>
      )}
      </div>
    </div>
  );
};

export default AppSearch;
