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
  duration: number; // seconds
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
];

const songTitles: Record<string, string[]> = {
  al1: ["Golden Hour", "Forest Lullaby", "Sunlit Path", "River Song", "Amber Glow", "Wildflower", "Dawn Chorus", "Meadow Dream"],
  al2: ["Neon Rain", "City Pulse", "After Dark", "Rooftop Echoes", "Velvet Night", "Digital Sunrise"],
  al3: ["Smoky Room", "Blue Note", "Satin Dress", "Wine & Jazz", "Midnight Cafe", "Old Piano", "Gentle Sway"],
  al4: ["Street Poetry", "Flow State", "Concrete Dreams", "Night Ride", "Real Talk", "Beat Drop", "City Lights", "Grind"],
  al5: ["First Light", "Dew Drops", "Birdsong", "Warm Breeze", "Horizon", "Gentle Rain"],
  al6: ["Deep Calm", "Reflection", "Moonlit Bay", "Whisper", "Tidal", "Serenity", "Drift"],
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
