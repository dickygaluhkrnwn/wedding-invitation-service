"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, VolumeX } from 'lucide-react';
import OpeningGate from './components/OpeningGate';
import HeroSection from './components/HeroSection';
import EventDetails from './components/EventDetails';
import OurStory from './components/OurStory';
import Gallery from './components/Gallery';
import RsvpSection from './components/RsvpSection';
import GiftSection from './components/GiftSection';
import BackgroundMusic from './components/BackgroundMusic';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [showContent, setShowContent] = useState(false); // State baru untuk delay mounting

  const handleOpenInvitation = () => {
    setIsOpen(true);
    setIsMusicPlaying(true);
    // Delay sedikit mounting konten agar transisi white flash OpeningGate menutupi proses loading
    setTimeout(() => {
        setShowContent(true);
    }, 500);
  };

  const toggleMusic = () => {
    setIsMusicPlaying(!isMusicPlaying);
  };

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden bg-paper-50">
      
      {/* --- KOMPONEN MUSIK (Hidden) --- */}
      <BackgroundMusic isPlaying={isMusicPlaying} />

      {/* 1. GERBANG PEMBUKA */}
      <AnimatePresence>
        {!isOpen && (
          <OpeningGate onOpen={handleOpenInvitation} />
        )}
      </AnimatePresence>

      {/* 2. KONTEN UTAMA (Mounting Conditionally) */}
      {/* Konten hanya akan dirender jika showContent = true */}
      {/* Ini akan memaksa animasi HeroSection berjalan dari awal */}
      {showContent && (
        <motion.main 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }} // Fade in halus
            className="relative w-full"
        >
            
            <HeroSection />

            <div className="relative z-20 -mt-10 md:-mt-20 pb-10 bg-gradient-to-b from-transparent via-paper-50 to-paper-50"> 
                <EventDetails />
            </div>

            <div className="relative z-20 bg-paper-50">
                <OurStory />
            </div>

            <div className="relative z-20 bg-paper-50">
                <Gallery />
            </div>

            <div className="relative z-20 bg-paper-50 border-t border-sage-100">
                <RsvpSection />
            </div>

            <div className="relative z-20 bg-paper-50 pb-24">
                <GiftSection />
            </div>

            <div className="relative z-20 py-8 text-center text-sage-400 text-xs bg-sage-50">
                <p>© 2025 Romeo & Juliet Wedding.</p>
                <p>Created with Love by Wedding Service.</p>
            </div>

            {/* Floating Music Control Button */}
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }} 
                className="fixed bottom-6 right-6 z-50"
            >
                <button 
                    onClick={toggleMusic}
                    className={`p-3 rounded-full backdrop-blur-md border border-sage-200 shadow-lg transition-all duration-500 hover:scale-110 ${
                    isMusicPlaying 
                        ? "bg-gold-100/80 text-gold-600 animate-spin-slow" 
                        : "bg-white/80 text-sage-400"
                    }`}
                    title={isMusicPlaying ? "Matikan Musik" : "Putar Musik"}
                >
                    {isMusicPlaying ? <Music size={20} /> : <VolumeX size={20} />}
                </button>
            </motion.div>

        </motion.main>
      )}
    </div>
  );
}