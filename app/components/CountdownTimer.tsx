"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CountdownTimer() {
  // UPDATE: Saya set ke 31 Desember 2025 agar timer berjalan (karena sekarang mungkin sudah lewat Agustus)
  const weddingDate = new Date("2025-12-31T08:00:00").getTime();
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      if (distance < 0) {
        // Jika waktu habis, biarkan 0
        clearInterval(interval);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [weddingDate]);

  // Komponen Angka dengan Animasi Slide
  const NumberBox = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center gap-2">
      <div className="relative glass-ethereal w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-2xl border border-white/60 shadow-lg overflow-hidden">
        {/* Dekorasi Shine */}
        <div className="absolute -top-10 -left-10 w-20 h-20 bg-white/20 blur-xl rounded-full pointer-events-none" />
        
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="text-2xl md:text-4xl font-serif font-bold text-sage-800 absolute"
          >
            {value < 10 ? `0${value}` : value}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-sage-600 font-bold">
        {label}
      </span>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="flex flex-wrap justify-center gap-4 md:gap-6 py-8"
    >
      <NumberBox value={timeLeft.days} label="Hari" />
      <NumberBox value={timeLeft.hours} label="Jam" />
      <NumberBox value={timeLeft.minutes} label="Menit" />
      <NumberBox value={timeLeft.seconds} label="Detik" />
    </motion.div>
  );
}