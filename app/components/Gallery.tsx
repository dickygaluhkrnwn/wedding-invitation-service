"use client";

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

// Data Foto Lokal
const photos = [
  "/images/gallery-1.png",
  "/images/gallery-2.png",
  "/images/gallery-3.png",
  "/images/gallery-4.png",
  "/images/gallery-5.png",
  "/images/gallery-6.png",
];

export default function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll Progress untuk Parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax Transformations (Kecepatan berbeda tiap kolom)
  const ySlow = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]); 
  const yFast = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]); 
  const yMedium = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  // --- LOGIC PEMBAGIAN KOLOM ---
  // Desktop (3 Kolom)
  const desktopCol1 = photos.filter((_, i) => i % 3 === 0);
  const desktopCol2 = photos.filter((_, i) => i % 3 === 1);
  const desktopCol3 = photos.filter((_, i) => i % 3 === 2);

  // Mobile (2 Kolom) - Memastikan semua foto masuk
  const mobileCol1 = photos.filter((_, i) => i % 2 === 0);
  const mobileCol2 = photos.filter((_, i) => i % 2 === 1);

  return (
    <section ref={containerRef} className="py-24 px-4 w-full bg-sage-100/30 relative overflow-hidden">
      
      {/* Dekorasi Background (Blur Orbs) */}
      <div className="absolute top-20 left-[-10%] w-96 h-96 bg-gold-300/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 right-[-10%] w-96 h-96 bg-sage-400/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Judul */}
      <div className="text-center mb-16 space-y-4 relative z-10">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-gold-600 tracking-[0.4em] text-xs md:text-sm uppercase font-bold"
        >
          Our Moments
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="font-serif text-4xl md:text-6xl text-sage-800 font-bold"
        >
          Galeri Bahagia
        </motion.h2>
      </div>

      {/* --- DESKTOP GRID (3 COLUMNS) --- */}
      {/* Hanya tampil di layar medium (md) ke atas */}
      <div className="hidden md:grid grid-cols-3 gap-6 max-w-7xl mx-auto min-h-[600px]">
        <motion.div style={{ y: ySlow }} className="space-y-6">
          {desktopCol1.map((src, i) => (
            <GalleryItem 
              key={`d1-${i}`} src={src} index={i * 3} 
              setHoveredIndex={setHoveredIndex} hoveredIndex={hoveredIndex} 
              onClick={() => setSelectedPhoto(src)}
            />
          ))}
        </motion.div>
        <motion.div style={{ y: yFast }} className="space-y-6 pt-20">
          {desktopCol2.map((src, i) => (
            <GalleryItem 
              key={`d2-${i}`} src={src} index={i * 3 + 1} 
              setHoveredIndex={setHoveredIndex} hoveredIndex={hoveredIndex} 
              onClick={() => setSelectedPhoto(src)}
            />
          ))}
        </motion.div>
        <motion.div style={{ y: yMedium }} className="space-y-6 pt-10">
          {desktopCol3.map((src, i) => (
            <GalleryItem 
              key={`d3-${i}`} src={src} index={i * 3 + 2} 
              setHoveredIndex={setHoveredIndex} hoveredIndex={hoveredIndex} 
              onClick={() => setSelectedPhoto(src)}
            />
          ))}
        </motion.div>
      </div>

      {/* --- MOBILE GRID (2 COLUMNS) --- */}
      {/* Hanya tampil di layar kecil */}
      <div className="grid md:hidden grid-cols-2 gap-4 min-h-[400px]">
        <motion.div style={{ y: ySlow }} className="space-y-4">
          {mobileCol1.map((src, i) => (
            <GalleryItem 
              key={`m1-${i}`} src={src} index={i * 2} 
              setHoveredIndex={setHoveredIndex} hoveredIndex={hoveredIndex} 
              onClick={() => setSelectedPhoto(src)}
            />
          ))}
        </motion.div>
        <motion.div style={{ y: yFast }} className="space-y-4 pt-12">
          {mobileCol2.map((src, i) => (
            <GalleryItem 
              key={`m2-${i}`} src={src} index={i * 2 + 1} 
              setHoveredIndex={setHoveredIndex} hoveredIndex={hoveredIndex} 
              onClick={() => setSelectedPhoto(src)}
            />
          ))}
        </motion.div>
      </div>

      {/* LIGHTBOX (Popup Foto Full Screen) */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
            onClick={() => setSelectedPhoto(null)}
          >
            <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-10 p-2 bg-white/10 rounded-full">
              <X size={24} />
            </button>

            <motion.div
              layoutId={`photo-${selectedPhoto}`} 
              className="relative w-full h-full max-w-5xl max-h-[85vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image 
                src={selectedPhoto}
                alt="Full Size"
                fill
                className="object-contain rounded-lg shadow-2xl"
                priority
                quality={100}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}

// Komponen Item Galeri Terpisah
function GalleryItem({ src, index, setHoveredIndex, hoveredIndex, onClick }: any) {
  const isDimmed = hoveredIndex !== null && hoveredIndex !== index;

  return (
    <motion.div
      layoutId={`photo-${src}`}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      className={`relative group overflow-hidden rounded-xl cursor-zoom-in transition-all duration-500 w-full ${
        isDimmed ? 'opacity-40 blur-[2px] scale-95 grayscale-[50%]' : 'opacity-100 scale-100 grayscale-0'
      }`}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      onClick={onClick}
    >
      {/* Rasio aspek foto dijaga agar tidak gepeng */}
      <div className="relative w-full aspect-[3/4]">
        <Image
          src={src}
          alt={`Gallery ${index + 1}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          sizes="(max-width: 768px) 50vw, 33vw"
        />
      </div>
      
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <motion.div 
            initial={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            className="bg-white/90 p-3 rounded-full backdrop-blur-sm text-sage-900 shadow-lg"
          >
              <ZoomIn size={20} />
          </motion.div>
      </div>
    </motion.div>
  );
}