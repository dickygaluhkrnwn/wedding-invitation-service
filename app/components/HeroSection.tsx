"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center text-center">
      
      {/* --- 1. BACKGROUND PHOTO --- */}
      <div className="absolute inset-0 z-0">
        {/* Menggunakan foto lokal hero-couple.png dari folder public/images/ */}
        <Image
          src="/images/hero-couple.png" 
          alt="Wedding Couple"
          fill
          className="object-cover"
          priority
          quality={100} // Kualitas maksimal untuk hero image
        />
        
        {/* Overlay Gelap (Supaya teks terbaca) */}
        {/* Gradient dari Sage gelap di bawah ke transparan di atas */}
        <div className="absolute inset-0 bg-gradient-to-t from-sage-900/80 via-sage-900/20 to-transparent mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/20" /> 
      </div>

      {/* --- 2. KONTEN TEKS (FLOATING) --- */}
      <div className="relative z-10 px-6 space-y-8 pt-20">
        
        {/* The Wedding Of... */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-col items-center gap-3"
        >
          <span className="tracking-[0.3em] text-xs md:text-sm text-gold-200 uppercase font-sans">
            The Wedding of
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-gold-300"></div>
        </motion.div>

        {/* Nama Mempelai Besar */}
        <div className="space-y-2 md:space-y-4">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="font-serif text-6xl md:text-8xl text-white drop-shadow-lg text-gold-glow"
          >
            Romeo
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.5, type: "spring" }}
            className="font-serif text-3xl md:text-4xl text-gold-300 italic"
          >
            &
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 2 }}
            className="font-serif text-6xl md:text-8xl text-white drop-shadow-lg text-gold-glow"
          >
            Juliet
          </motion.h1>
        </div>

        {/* Tanggal Acara */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="border-t border-b border-white/30 py-3 px-8 inline-block backdrop-blur-sm bg-white/5 rounded-full mt-4"
        >
          <p className="text-white/90 font-serif text-lg md:text-xl tracking-wide">
            Sunday, 24 August 2025
          </p>
        </motion.div>
      </div>

      {/* --- 3. SCROLL INDICATOR --- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 2, delay: 3, repeat: Infinity }}
        className="absolute bottom-8 z-10 text-white/70 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest">Scroll Down</span>
        <ChevronDown className="w-6 h-6" />
      </motion.div>

    </section>
  );
}