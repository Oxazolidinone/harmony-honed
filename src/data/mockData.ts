import album1 from "@/assets/album-1.jpg";
import album2 from "@/assets/album-2.jpg";
import album3 from "@/assets/album-3.jpg";
import album4 from "@/assets/album-4.jpg";
import album5 from "@/assets/album-5.jpg";
import album6 from "@/assets/album-6.jpg";

export interface Artist {
  id: string;
  name: string;
  image: string;
  bio: string;
  monthlyListeners: number;
  genres: string[];
}

export interface Song {
  id: string;
  title: string;
  artist: Artist;
  album: Album;
  duration: number;
  playCount: number;
  audioUrl?: string;
}

export interface Album {
  id: string;
  title: string;
  artist: Artist;
  image: string;
  year: number;
  songs: Song[];
  genre: string;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  image: string;
  songs: Song[];
  createdBy: string;
  isPublic: boolean;
}

export interface MoodPlaylist {
  id: string;
  name: string;
  emoji: string;
  color: string;
  description: string;
}

export interface PodcastEpisode {
  id: string;
  title: string;
  show: string;
  image: string;
  duration: number;
  description: string;
}

export const artists: Artist[] = [
  {
    id: "a1",
    name: "Linh Nguyễn",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop",
    bio: "Ca sĩ indie folk với giọng hát đầy cảm xúc, kết hợp âm nhạc truyền thống Việt Nam với phong cách acoustic hiện đại.",
    monthlyListeners: 1245000,
    genres: ["Indie Folk", "Acoustic"],
  },
  {
    id: "a2",
    name: "Minh Trần",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
    bio: "Producer và nhạc sĩ electronic, nổi tiếng với những bản remix mang đậm chất Việt.",
    monthlyListeners: 890000,
    genres: ["Electronic", "Lo-fi"],
  },
  {
    id: "a3",
    name: "Hương Lê",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop",
    bio: "Nghệ sĩ jazz-soul với phong cách biểu diễn đầy quyến rũ và sáng tạo.",
    monthlyListeners: 567000,
    genres: ["Jazz", "Soul"],
  },
  {
    id: "a4",
    name: "Đức Phạm",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
    bio: "Rapper và songwriter, mang đến những câu chuyện đời thường qua từng track nhạc.",
    monthlyListeners: 2100000,
    genres: ["Hip-hop", "R&B"],
  },
  {
    id: "a5",
    name: "Thanh Vũ",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&h=300&fit=crop",
    bio: "Giọng ca ballad trữ tình, mỗi bài hát là một câu chuyện tình yêu được kể bằng giai điệu.",
    monthlyListeners: 3200000,
    genres: ["Pop", "Ballad"],
  },
  {
    id: "a6",
    name: "Mai Anh",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=300&fit=crop",
    bio: "Nữ nghệ sĩ R&B với phong cách âm nhạc đậm chất retro kết hợp hiện đại.",
    monthlyListeners: 780000,
    genres: ["R&B", "Soul"],
  },
  {
    id: "a7",
    name: "Khải Nguyên",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop",
    bio: "Producer nhạc điện tử thử nghiệm, luôn tìm cách phá vỡ giới hạn âm thanh.",
    monthlyListeners: 450000,
    genres: ["Electronic", "Experimental"],
  },
  {
    id: "a8",
    name: "Bảo Trâm",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&h=300&fit=crop",
    bio: "Ca sĩ trẻ thế hệ mới với giọng hát trong trẻo và phong cách indie pop đầy cá tính.",
    monthlyListeners: 620000,
    genres: ["Indie Pop", "Lo-fi"],
  },
];

const createAlbumShell = (id: string, title: string, artistIdx: number, image: string, year: number, genre: string) => ({
  id,
  title,
  artist: artists[artistIdx],
  image,
  year,
  genre,
  songs: [] as Song[],
});

export const albums: Album[] = [
  createAlbumShell("al1", "Echoes of Gold", 0, album1, 2025, "Indie Folk"),
  createAlbumShell("al2", "Midnight Walk", 1, album2, 2025, "Electronic"),
  createAlbumShell("al3", "Vintage Soul", 2, album3, 2024, "Jazz"),
  createAlbumShell("al4", "Waveforms", 3, album4, 2024, "Hip-hop"),
  createAlbumShell("al5", "Morning Light", 0, album5, 2026, "Acoustic"),
  createAlbumShell("al6", "Still Waters", 2, album6, 2026, "Soul"),
  createAlbumShell("al7", "Heartstrings", 4, album1, 2026, "Pop"),
  createAlbumShell("al8", "Velvet Dreams", 5, album3, 2025, "R&B"),
  createAlbumShell("al9", "Neon Horizon", 6, album2, 2026, "Electronic"),
  createAlbumShell("al10", "Paper Moon", 7, album5, 2025, "Indie Pop"),
];

const songTitles: Record<string, string[]> = {
  al1: ["Golden Hour", "Forest Lullaby", "Sunlit Path", "River Song", "Amber Glow", "Wildflower", "Dawn Chorus", "Meadow Dream"],
  al2: ["Neon Rain", "City Pulse", "After Dark", "Rooftop Echoes", "Velvet Night", "Digital Sunrise"],
  al3: ["Smoky Room", "Blue Note", "Satin Dress", "Wine & Jazz", "Midnight Cafe", "Old Piano", "Gentle Sway"],
  al4: ["Street Poetry", "Flow State", "Concrete Dreams", "Night Ride", "Real Talk", "Beat Drop", "City Lights", "Grind"],
  al5: ["First Light", "Dew Drops", "Birdsong", "Warm Breeze", "Horizon", "Gentle Rain"],
  al6: ["Deep Calm", "Reflection", "Moonlit Bay", "Whisper", "Tidal", "Serenity", "Drift"],
  al7: ["Heartbeat", "Summer Haze", "Falling Stars", "Photograph", "Closer", "Daydream", "Carousel"],
  al8: ["Silk Road", "Midnight Rose", "Afterglow", "Purple Rain", "Velvet Touch", "Slow Dance"],
  al9: ["Circuit", "Neon Dust", "Data Stream", "Pulse Wave", "Voltage", "Binary Sun", "Glitch Garden"],
  al10: ["Paper Crane", "Stargazer", "Cloudburst", "Petal", "Moonwalk", "Firefly"],
};

// Populate songs
albums.forEach((album) => {
  const titles = songTitles[album.id] || [];
  album.songs = titles.map((title, i) => ({
    id: `${album.id}-s${i + 1}`,
    title,
    artist: album.artist,
    album,
    duration: 180 + Math.floor(Math.random() * 120),
    playCount: Math.floor(Math.random() * 5000000),
  }));
});

export const allSongs: Song[] = albums.flatMap((a) => a.songs);

export const playlists: Playlist[] = [
  {
    id: "p1",
    name: "Chill Morning",
    description: "Những giai điệu nhẹ nhàng cho buổi sáng yên bình",
    image: album1,
    songs: [allSongs[0], allSongs[8], allSongs[14], allSongs[20], allSongs[2]],
    createdBy: "Nhaccuatu",
    isPublic: true,
  },
  {
    id: "p2",
    name: "Night Vibes",
    description: "Âm nhạc cho những đêm dài không ngủ",
    image: album2,
    songs: [allSongs[6], allSongs[10], allSongs[17], allSongs[3], allSongs[22]],
    createdBy: "Nhaccuatu",
    isPublic: true,
  },
  {
    id: "p3",
    name: "Vietnamese Indie",
    description: "Tinh hoa indie Việt Nam",
    image: album5,
    songs: [allSongs[1], allSongs[4], allSongs[12], allSongs[24], allSongs[7]],
    createdBy: "Nhaccuatu",
    isPublic: true,
  },
  {
    id: "p4",
    name: "Focus Flow",
    description: "Tập trung làm việc với nhạc nền hoàn hảo",
    image: album6,
    songs: [allSongs[15], allSongs[9], allSongs[21], allSongs[5], allSongs[26]],
    createdBy: "user",
    isPublic: false,
  },
  {
    id: "p5",
    name: "Workout Energy",
    description: "Năng lượng tối đa cho mỗi buổi tập",
    image: album4,
    songs: [allSongs[25], allSongs[30], allSongs[18], allSongs[35], allSongs[40]],
    createdBy: "Nhaccuatu",
    isPublic: true,
  },
  {
    id: "p6",
    name: "Acoustic Sessions",
    description: "Những bản acoustic mộc mạc và chân thật",
    image: album5,
    songs: [allSongs[0], allSongs[28], allSongs[33], allSongs[2], allSongs[38]],
    createdBy: "Nhaccuatu",
    isPublic: true,
  },
];

export const moodPlaylists: MoodPlaylist[] = [
  { id: "m1", name: "Thư giãn", emoji: "🌿", color: "from-emerald-500/20 to-teal-500/20", description: "Nhẹ nhàng, bình yên" },
  { id: "m2", name: "Năng lượng", emoji: "⚡", color: "from-amber-500/20 to-orange-500/20", description: "Sôi động, phấn khích" },
  { id: "m3", name: "Lãng mạn", emoji: "🌹", color: "from-rose-500/20 to-pink-500/20", description: "Tình yêu, cảm xúc" },
  { id: "m4", name: "Tập trung", emoji: "🎯", color: "from-blue-500/20 to-indigo-500/20", description: "Làm việc, học tập" },
  { id: "m5", name: "Buồn", emoji: "🌧️", color: "from-slate-500/20 to-gray-500/20", description: "Trầm lắng, suy tư" },
  { id: "m6", name: "Hạnh phúc", emoji: "☀️", color: "from-yellow-500/20 to-amber-500/20", description: "Vui vẻ, tích cực" },
];

export const podcastEpisodes: PodcastEpisode[] = [
  {
    id: "pod1",
    title: "Câu chuyện đằng sau 'Echoes of Gold'",
    show: "Behind the Music",
    image: album1,
    duration: 2400,
    description: "Linh Nguyễn chia sẻ hành trình sáng tác album đầu tay",
  },
  {
    id: "pod2",
    title: "Xu hướng nhạc Việt 2026",
    show: "Nhạc Việt Today",
    image: album3,
    duration: 1800,
    description: "Phân tích xu hướng âm nhạc nổi bật trong năm",
  },
  {
    id: "pod3",
    title: "Lo-fi và văn hóa café Việt Nam",
    show: "Sound Culture",
    image: album2,
    duration: 3000,
    description: "Mối liên hệ giữa nhạc lo-fi và không gian café",
  },
  {
    id: "pod4",
    title: "Từ underground đến mainstream",
    show: "Rap Việt Talk",
    image: album4,
    duration: 2700,
    description: "Đức Phạm kể về hành trình từ underground đến mainstream",
  },
];

export const trendingTags = [
  "#VPop2026", "#IndieViệt", "#LofiStudy", "#AcousticCover",
  "#RapViệt", "#ChillVibes", "#NewRelease", "#LiveSession",
];

export const genres = [
  "Tất cả",
  "Indie Folk",
  "Electronic",
  "Jazz",
  "Hip-hop",
  "Acoustic",
  "Soul",
  "R&B",
  "Lo-fi",
  "Pop",
  "Ballad",
  "Indie Pop",
  "Experimental",
];

export const genreCards = [
  { name: "Pop", color: "from-pink-500 to-rose-600", icon: "🎤" },
  { name: "Hip-hop", color: "from-purple-600 to-violet-700", icon: "🎧" },
  { name: "Jazz", color: "from-amber-600 to-yellow-700", icon: "🎷" },
  { name: "Electronic", color: "from-cyan-500 to-blue-600", icon: "🎛️" },
  { name: "Indie Folk", color: "from-emerald-500 to-green-600", icon: "🎸" },
  { name: "R&B", color: "from-fuchsia-500 to-pink-600", icon: "🎵" },
  { name: "Lo-fi", color: "from-slate-500 to-zinc-600", icon: "☕" },
  { name: "Acoustic", color: "from-orange-500 to-amber-600", icon: "🪕" },
  { name: "Soul", color: "from-red-500 to-rose-700", icon: "❤️‍🔥" },
  { name: "Ballad", color: "from-indigo-500 to-blue-700", icon: "🌙" },
];

export const recentlyPlayed: Song[] = [allSongs[0], allSongs[8], allSongs[14], allSongs[20], allSongs[3], allSongs[17]];

export const formatDuration = (seconds: number): string => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
};

export const formatNumber = (n: number): string => {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toString();
};
