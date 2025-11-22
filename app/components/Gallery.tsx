"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

// Data Foto Lokal (Sesuai file yang kamu generate)
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

  return (
    <section className="py-20 px-4 w-full bg-sage-100/30">
      
      {/* Judul */}
      <div className="text-center mb-12 space-y-2">
        <span className="text-gold-600 tracking-[0.3em] text-sm uppercase font-bold">
          Our Moments
        </span>
        <h2 className="font-serif text-4xl md:text-5xl text-sage-800 font-bold">
          Galeri Bahagia
        </h2>
      </div>

      {/* Grid Masonry */}
      <div className="columns-2 md:columns-3 gap-4 max-w-6xl mx-auto space-y-4">
        {photos.map((src, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative group break-inside-avoid overflow-hidden rounded-xl cursor-zoom-in"
            onClick={() => setSelectedPhoto(src)}
          >
            <Image
              src={src}
              alt={`Gallery ${index + 1}`}
              width={600}
              height={800}
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
              // Menambahkan placeholder blur jika perlu, tapi untuk lokal biasanya cepat
            />
            
            {/* Overlay Hover */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-white/80 p-2 rounded-full backdrop-blur-sm text-sage-800">
                    <ZoomIn size={20} />
                </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* LIGHTBOX (Popup Foto Full Screen) */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)} // Klik luar untuk tutup
          >
            <button className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors">
              <X size={32} />
            </button>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()} // Klik gambar tidak menutup
            >
              {/* Gambar di Lightbox harus 'contain' agar tidak terpotong */}
              <Image 
                src={selectedPhoto}
                alt="Full Size"
                fill
                className="object-contain rounded-md"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}