"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

interface OpeningGateProps {
  onOpen: () => void;
}

export default function OpeningGate({ onOpen }: OpeningGateProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    // Delay agar animasi zoom selesai sebelum komponen di-unmount
    setTimeout(() => {
      onOpen();
    }, 1500); 
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, pointerEvents: "none" }}
      transition={{ duration: 1 }} // Fade out container utama
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-paper-50"
    >
      {/* --- LAYER 1: BACKGROUND TEXTURE (STATIC) --- */}
      <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] mix-blend-multiply pointer-events-none" />
      
      {/* --- LAYER 1.5: ELEGANT FRAME (BINGKAI BARU) --- */}
      {/* Bingkai Luar Tipis */}
      <div className="absolute inset-3 md:inset-5 border border-gold-300/30 z-0 pointer-events-none" />
      
      {/* Bingkai Dalam dengan Sudut Dekoratif */}
      <div className="absolute inset-5 md:inset-8 border border-gold-500/50 z-0 pointer-events-none flex flex-col justify-between">
        <div className="flex justify-between">
            {/* Sudut Kiri Atas */}
            <div className="w-6 h-6 md:w-10 md:h-10 border-t-2 border-l-2 border-gold-600 -mt-[1px] -ml-[1px]" />
            {/* Sudut Kanan Atas */}
            <div className="w-6 h-6 md:w-10 md:h-10 border-t-2 border-r-2 border-gold-600 -mt-[1px] -mr-[1px]" />
        </div>
        <div className="flex justify-between">
            {/* Sudut Kiri Bawah */}
            <div className="w-6 h-6 md:w-10 md:h-10 border-b-2 border-l-2 border-gold-600 -mb-[1px] -ml-[1px]" />
            {/* Sudut Kanan Bawah */}
            <div className="w-6 h-6 md:w-10 md:h-10 border-b-2 border-r-2 border-gold-600 -mb-[1px] -mr-[1px]" />
        </div>
      </div>

      {/* --- LAYER 2: AMBIENT GLOW (ANIMATED) --- */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1], 
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 90, 0] 
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-20%] left-[-20%] w-[80vw] h-[80vw] bg-sage-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-30"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1], 
          opacity: [0.2, 0.4, 0.2],
          rotate: [0, -60, 0] 
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[-20%] right-[-20%] w-[80vw] h-[80vw] bg-gold-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-30"
      />

      {/* --- LAYER 3: MAIN CONTENT (SCALES UP ON OPEN) --- */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-10 p-4 text-center max-w-md w-full"
        animate={isOpening ? { scale: 20, opacity: 0 } : { scale: 1, opacity: 1 }}
        transition={{ 
          duration: 1.5, 
          ease: [0.64, 0, 0.78, 0],
        }}
      >
        {/* Teks Pengantar */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="space-y-4"
        >
          <div className="flex flex-col items-center gap-2">
            <Sparkles size={16} className="text-gold-400 opacity-80" />
            <p className="font-serif text-sage-600 italic tracking-[0.2em] text-xs md:text-sm uppercase">
                The Wedding Celebration
            </p>
          </div>
          
          <div className="relative py-2">
             <h1 className="font-serif text-5xl md:text-7xl font-bold text-sage-900 tracking-tighter leading-none relative z-10">
               Romeo <span className="text-gold-500 font-light italic text-4xl md:text-6xl">&</span> Juliet
             </h1>
          </div>

          <p className="text-sage-500 text-[10px] md:text-xs tracking-widest font-sans border-y border-gold-200/50 py-2 inline-block px-6">
            MINGGU, 24 AGUSTUS 2025
          </p>
        </motion.div>

        {/* WAX SEAL BUTTON (INTERACTIVE) */}
        <div className="relative mt-2 group cursor-pointer" onClick={handleOpen}>
          
          {/* Efek Ripple/Glow saat Hover */}
          <div className="absolute inset-0 bg-gold-400 rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 scale-150" />
          <div className="absolute inset-0 border border-gold-300/30 rounded-full scale-110 opacity-0 group-hover:scale-150 group-hover:opacity-100 transition-all duration-700" />
          
          {/* Fisik Segel Lilin */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-28 h-28 md:w-32 md:h-32 bg-gradient-to-br from-gold-500 via-gold-600 to-gold-700 rounded-full shadow-2xl flex items-center justify-center border-[6px] border-gold-400/50 wax-seal-shadow z-20"
          >
            {/* Tekstur Kasar pada Lilin */}
            <div className="absolute inset-0 rounded-full bg-[url('https://www.transparenttextures.com/patterns/stucco.png')] opacity-20 mix-blend-overlay" />

            {/* Ring Dalam Segel */}
            <div className="absolute inset-3 rounded-full border-2 border-gold-800/20 opacity-60" />
            
            {/* Icon Hati di Tengah */}
            <div className="text-white/90 drop-shadow-md relative z-10">
              <Heart fill="#fbf7e6" className="w-10 h-10 md:w-12 md:h-12 text-gold-100" />
            </div>

            {/* Kilau Cahaya */}
            <div className="absolute top-5 left-6 w-6 h-4 bg-white opacity-40 rounded-full blur-[3px] -rotate-45" />
          </motion.div>

          {/* Label "Buka Undangan" */}
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-6 w-max"
          >
            <p className="text-[10px] md:text-xs font-sans font-bold uppercase tracking-[0.4em] text-sage-500 group-hover:text-gold-600 transition-colors">
              Buka Undangan
            </p>
            <div className="w-[1px] h-8 bg-gradient-to-b from-sage-300 to-transparent mx-auto mt-2" />
          </motion.div>
        </div>
      </motion.div>

      {/* --- LAYER 4: FLASH EFFECT --- */}
      <motion.div 
        className="absolute inset-0 bg-paper-50 z-20 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={isOpening ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 1 }} 
      />

    </motion.div>
  );
}