import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Repeat1, Volume2, VolumeX } from "lucide-react";
import { usePlayer } from "@/contexts/PlayerContext";
import { formatDuration } from "@/data/mockData";
import { Slider } from "@/components/ui/slider";
import { motion, AnimatePresence } from "framer-motion";

const MusicPlayer = () => {
  const {
    currentSong, isPlaying, currentTime, volume, shuffle, repeat,
    togglePlay, nextSong, prevSong, setCurrentTime, setVolume, toggleShuffle, toggleRepeat,
  } = usePlayer();

  if (!currentSong) return null;

  const progress = currentSong.duration > 0 ? (currentTime / currentSong.duration) * 100 : 0;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
        className="fixed bottom-0 left-0 right-0 z-50"
      >
        <div className="mx-3 mb-3 bg-card/95 backdrop-blur-2xl rounded-2xl border border-border/30 shadow-2xl">
          {/* Progress bar */}
          <div className="absolute top-0 left-5 right-5 h-[1.5px] bg-border/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between px-5 md:px-6 h-[72px]">
            {/* Song info */}
            <div className="flex items-center gap-3.5 flex-1 min-w-0">
              <img
                src={currentSong.album.image}
                alt={currentSong.title}
                className="w-11 h-11 object-cover flex-shrink-0 rounded-lg shadow-sm"
              />
              <div className="min-w-0">
                <p className="text-sm font-display italic text-foreground truncate">{currentSong.title}</p>
                <p className="text-[11px] text-muted-foreground font-body truncate">{currentSong.artist.name}</p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col items-center gap-1 flex-1">
              <div className="flex items-center gap-5">
                <button
                  onClick={toggleShuffle}
                  className={`hidden md:block transition-colors ${shuffle ? "text-primary" : "text-muted-foreground/50 hover:text-foreground"}`}
                >
                  <Shuffle size={13} />
                </button>
                <button onClick={prevSong} className="text-foreground/60 hover:text-foreground transition-colors">
                  <SkipBack size={16} />
                </button>
                <button
                  onClick={togglePlay}
                  className="w-9 h-9 rounded-full bg-foreground text-background flex items-center justify-center hover:scale-105 transition-transform shadow-md"
                >
                  {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
                </button>
                <button onClick={nextSong} className="text-foreground/60 hover:text-foreground transition-colors">
                  <SkipForward size={16} />
                </button>
                <button
                  onClick={toggleRepeat}
                  className={`hidden md:block transition-colors ${repeat !== "off" ? "text-primary" : "text-muted-foreground/50 hover:text-foreground"}`}
                >
                  {repeat === "one" ? <Repeat1 size={13} /> : <Repeat size={13} />}
                </button>
              </div>
              <div className="hidden md:flex items-center gap-2 w-full max-w-md">
                <span className="text-[9px] text-muted-foreground/60 w-8 text-right font-body">{formatDuration(currentTime)}</span>
                <Slider
                  value={[currentTime]}
                  max={currentSong.duration}
                  step={1}
                  onValueChange={([v]) => setCurrentTime(v)}
                  className="flex-1"
                />
                <span className="text-[9px] text-muted-foreground/60 w-8 font-body">{formatDuration(currentSong.duration)}</span>
              </div>
            </div>

            {/* Volume */}
            <div className="hidden md:flex items-center gap-2 flex-1 justify-end">
              <button
                onClick={() => setVolume(volume === 0 ? 80 : 0)}
                className="text-muted-foreground/50 hover:text-foreground transition-colors"
              >
                {volume === 0 ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
              <Slider
                value={[volume]}
                max={100}
                step={1}
                onValueChange={([v]) => setVolume(v)}
                className="w-20"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MusicPlayer;
