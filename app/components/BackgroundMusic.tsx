"use client";

import React, { useEffect, useRef } from 'react';

interface BackgroundMusicProps {
  isPlaying: boolean;
}

export default function BackgroundMusic({ isPlaying }: BackgroundMusicProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Inisialisasi audio saat komponen dimuat
    // Ganti src dengan file mp3 di folder public/audio/lagu-anda.mp3 nantinya
    if (audioRef.current) {
      audioRef.current.volume = 0.5; // Set volume awal 50% agar tidak kaget
    }
  }, []);

  useEffect(() => {
    // Mengontrol Play/Pause berdasarkan props dari parent
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.log("Autoplay prevented:", error);
          // Browser modern memblokir autoplay tanpa interaksi.
          // Karena kita trigger ini setelah user klik "Buka Undangan", 
          // harusnya aman.
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <audio 
      ref={audioRef} 
      loop 
      // Lagu Placeholder: Beautiful Piano (Royalty Free)
      // Nanti ganti dengan: src="/audio/wedding-song.mp3"
      src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" 
    />
  );
}