"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CountdownTimer() {
  // Set Tanggal Pernikahan di sini (Format: YYYY-MM-DD)
  const weddingDate = new Date("2025-08-24T08:00:00").getTime();
  
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

  // Komponen Kotak Waktu Kecil
  const TimeBox = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="glass-ethereal w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-2xl border border-white/60 shadow-lg">
        <span className="text-2xl md:text-3xl font-serif font-bold text-sage-800">
          {value}
        </span>
      </div>
      <span className="mt-2 text-xs uppercase tracking-widest text-sage-600 font-medium">
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
      className="flex flex-wrap justify-center gap-4 md:gap-8 py-8"
    >
      <TimeBox value={timeLeft.days} label="Hari" />
      <TimeBox value={timeLeft.hours} label="Jam" />
      <TimeBox value={timeLeft.minutes} label="Menit" />
      <TimeBox value={timeLeft.seconds} label="Detik" />
    </motion.div>
  );
}