"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, Variants } from 'framer-motion'; 
import { ChevronDown } from 'lucide-react';

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  
  // Setup Parallax Effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Background bergerak lebih lambat (y: 0 -> 30%)
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  // Teks bergerak sedikit lebih cepat ke atas (y: 0 -> 50%) dan fade out
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Konfigurasi animasi teks (Huruf per huruf)
  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5 + (i * 0.1), // UPDATED: Delay dipercepat (dari 1.8 jadi 0.5) karena komponen baru mount setelah gate
        duration: 1,
        ease: [0.2, 0.65, 0.3, 0.9] as const,
      },
    }),
  };

  const splitText = (text: string) => {
    return text.split("").map((char, i) => (
      <motion.span key={i} custom={i} variants={titleVariants} className="inline-block">
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ));
  };

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center text-center">
      
      {/* --- 1. PARALLAX BACKGROUND PHOTO --- */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 z-0 h-[120%] w-full -top-[10%]">
        <Image
          src="/images/hero-couple.png" 
          alt="Wedding Couple"
          fill
          className="object-cover"
          priority
          quality={100} 
        />
        
        {/* Overlay Gelap & Grain */}
        <div className="absolute inset-0 bg-gradient-to-t from-sage-900/90 via-sage-900/30 to-transparent mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/20" /> 
      </motion.div>

      {/* --- 2. FLOATING ORNAMENTS (DEKORASI) --- */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-10 w-32 h-32 bg-gold-400/20 rounded-full blur-[80px] z-10 pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-20 right-10 w-40 h-40 bg-sage-400/20 rounded-full blur-[80px] z-10 pointer-events-none"
      />

      {/* --- 3. KONTEN TEKS (PARALLAX & ANIMATED) --- */}
      <motion.div 
        style={{ y: yText, opacity: opacityText }}
        className="relative z-10 px-6 space-y-8 pt-20"
      >
        
        {/* The Wedding Of... */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }} // UPDATED: Lebih cepat
          className="flex flex-col items-center gap-3"
        >
          <span className="tracking-[0.4em] text-xs md:text-sm text-gold-200 uppercase font-sans font-bold">
            The Wedding of
          </span>
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: 48 }}
            transition={{ duration: 1, delay: 0.2 }} // UPDATED: Lebih cepat
            className="w-[1px] bg-gradient-to-b from-transparent via-gold-300 to-transparent"
          />
        </motion.div>

        {/* Nama Mempelai Besar (Staggered Animation) */}
        <motion.div 
          initial="hidden"
          animate="visible"
          className="space-y-2 md:space-y-6"
        >
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-white drop-shadow-2xl text-gold-glow overflow-hidden">
            {splitText("Romeo")}
          </h1>
          
          <motion.div
            initial={{ opacity: 0, scale: 0, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.5, delay: 1.2, type: "spring", bounce: 0.5 }} // UPDATED
            className="font-serif text-4xl md:text-5xl text-gold-300 italic py-2"
          >
            &
          </motion.div>

          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-white drop-shadow-2xl text-gold-glow overflow-hidden">
            {splitText("Juliet")}
          </h1>
        </motion.div>

        {/* Tanggal Acara */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }} // UPDATED
          className="mt-8"
        >
          <div className="inline-block relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-gold-400/0 via-gold-400/50 to-gold-400/0 rounded-lg blur opacity-20 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative border-y border-white/20 py-3 px-8 backdrop-blur-sm bg-white/5">
              <p className="text-white/90 font-serif text-lg md:text-2xl tracking-[0.1em]">
                Sunday, 24 August 2025
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* --- 4. SCROLL INDICATOR --- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 2, delay: 2, repeat: Infinity }} // UPDATED
        className="absolute bottom-10 z-10 text-white/50 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-light">Scroll to Begin</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent"></div>
      </motion.div>

    </section>
  );
}