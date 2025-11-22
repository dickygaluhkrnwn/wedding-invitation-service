"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

interface OpeningGateProps {
  onOpen: () => void;
}

export default function OpeningGate({ onOpen }: OpeningGateProps) {
  const [isMelting, setIsMelting] = useState(false);

  const handleOpen = () => {
    setIsMelting(true);
    // Tunggu animasi segel "meleleh" selesai baru trigger onOpen parent
    setTimeout(() => {
      onOpen();
    }, 800); // 0.8 detik delay
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-paper-50 text-sage-900 overflow-hidden"
    >
      {/* --- BACKGROUND DEKORATIF --- */}
      {/* Pattern Kertas */}
      <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] mix-blend-multiply pointer-events-none" />
      
      {/* Orbs Blur untuk nuansa Ethereal */}
      <div className="absolute top-[-20%] left-[-20%] w-[80vw] h-[80vw] bg-sage-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-30 animate-pulse-slow" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[80vw] h-[80vw] bg-gold-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-30 animate-pulse-slow" />

      {/* --- KONTEN TENGAH (AMPLOP & SEGEL) --- */}
      <div className="relative z-10 flex flex-col items-center gap-8 p-4">
        
        {/* Teks Pengantar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-center space-y-2"
        >
          <p className="font-serif text-sage-600 italic tracking-wide text-lg">
            You are invited to
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-sage-800 tracking-tighter">
            The Wedding
          </h2>
        </motion.div>

        {/* WAX SEAL BUTTON (TOMBOL UTAMA) */}
        <div className="relative group cursor-pointer" onClick={handleOpen}>
          {/* Glow Efek di belakang segel */}
          <div className="absolute inset-0 bg-gold-400 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
          
          {/* Fisik Segel Lilin */}
          <motion.div
            animate={isMelting ? "melt" : "idle"}
            variants={{
              idle: { scale: 1 },
              melt: { scale: 1.5, opacity: 0, filter: "blur(10px)" }
            }}
            transition={{ duration: 0.8 }}
            className="relative w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full shadow-xl flex items-center justify-center border-4 border-gold-300/50 wax-seal-shadow"
          >
            {/* Ring Dalam Segel */}
            <div className="absolute inset-2 rounded-full border border-gold-700/20 opacity-50" />
            
            {/* Icon / Inisial di Tengah */}
            <div className="text-white drop-shadow-md">
              <Heart fill="currentColor" className="w-8 h-8 md:w-10 md:h-10 text-gold-100" />
            </div>

            {/* Efek Kilau Cahaya (Glassy reflection) */}
            <div className="absolute top-4 left-6 w-4 h-4 bg-white opacity-30 rounded-full blur-[2px]" />
          </motion.div>

          {/* Label "Buka" */}
          <motion.p
            animate={{ opacity: isMelting ? 0 : 1 }}
            className="mt-6 text-center text-xs font-sans font-bold uppercase tracking-[0.3em] text-sage-500 group-hover:text-gold-600 transition-colors"
          >
            Buka Undangan
          </motion.p>
        </div>

        {/* Nama Mempelai (Preview) */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 text-center w-full"
        >
          <p className="font-serif text-sage-400 text-sm">
            Romeo & Juliet
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}