import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Song } from "@/data/mockData";

interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  queue: Song[];
  currentTime: number;
  volume: number;
  shuffle: boolean;
  repeat: "off" | "all" | "one";
}

interface PlayerContextType extends PlayerState {
  playSong: (song: Song, queue?: Song[]) => void;
  togglePlay: () => void;
  nextSong: () => void;
  prevSong: () => void;
  setCurrentTime: (time: number) => void;
  setVolume: (vol: number) => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  addToQueue: (song: Song) => void;
}

const PlayerContext = createContext<PlayerContextType | null>(null);

export const usePlayer = () => {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within PlayerProvider");
  return ctx;
};

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<PlayerState>({
    currentSong: null,
    isPlaying: false,
    queue: [],
    currentTime: 0,
    volume: 80,
    shuffle: false,
    repeat: "off",
  });

  const playSong = useCallback((song: Song, queue?: Song[]) => {
    setState((prev) => ({
      ...prev,
      currentSong: song,
      isPlaying: true,
      currentTime: 0,
      queue: queue || prev.queue,
    }));
  }, []);

  const togglePlay = useCallback(() => {
    setState((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
  }, []);

  const nextSong = useCallback(() => {
    setState((prev) => {
      if (!prev.currentSong || prev.queue.length === 0) return prev;
      const idx = prev.queue.findIndex((s) => s.id === prev.currentSong!.id);
      const nextIdx = prev.shuffle
        ? Math.floor(Math.random() * prev.queue.length)
        : (idx + 1) % prev.queue.length;
      return { ...prev, currentSong: prev.queue[nextIdx], currentTime: 0, isPlaying: true };
    });
  }, []);

  const prevSong = useCallback(() => {
    setState((prev) => {
      if (!prev.currentSong || prev.queue.length === 0) return prev;
      const idx = prev.queue.findIndex((s) => s.id === prev.currentSong!.id);
      const prevIdx = idx <= 0 ? prev.queue.length - 1 : idx - 1;
      return { ...prev, currentSong: prev.queue[prevIdx], currentTime: 0, isPlaying: true };
    });
  }, []);

  const setCurrentTime = useCallback((time: number) => {
    setState((prev) => ({ ...prev, currentTime: time }));
  }, []);

  const setVolume = useCallback((vol: number) => {
    setState((prev) => ({ ...prev, volume: vol }));
  }, []);

  const toggleShuffle = useCallback(() => {
    setState((prev) => ({ ...prev, shuffle: !prev.shuffle }));
  }, []);

  const toggleRepeat = useCallback(() => {
    setState((prev) => ({
      ...prev,
      repeat: prev.repeat === "off" ? "all" : prev.repeat === "all" ? "one" : "off",
    }));
  }, []);

  const addToQueue = useCallback((song: Song) => {
    setState((prev) => ({ ...prev, queue: [...prev.queue, song] }));
  }, []);

  return (
    <PlayerContext.Provider
      value={{ ...state, playSong, togglePlay, nextSong, prevSong, setCurrentTime, setVolume, toggleShuffle, toggleRepeat, addToQueue }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
