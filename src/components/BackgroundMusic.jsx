import React, { useRef, useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function BackgroundMusic() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.5;
    audio.loop = true;

    const unlockAndPlay = () => {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(() => {});

      // Remove listener after first unlock
      window.removeEventListener("click", unlockAndPlay);
    };

    // Browser allows audio only after click
    window.addEventListener("click", unlockAndPlay);

    return () => {
      window.removeEventListener("click", unlockAndPlay);
    };
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/music/romantic.mp3" preload="auto" />

      {/* Optional Music Button */}
      <button
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-[9999] bg-white/80 backdrop-blur px-4 py-3 rounded-full shadow-lg hover:scale-105 transition"
      >
        {isPlaying ? (
          <Volume2 className="text-pink-600 w-6 h-6" />
        ) : (
          <VolumeX className="text-gray-600 w-6 h-6" />
        )}
      </button>
    </>
  );
}
