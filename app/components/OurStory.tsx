"use client";

import React from 'react';
import { motion } from 'framer-motion';
// --- PERBAIKAN: Ganti 'Ring' dengan 'Gem' (Ikon Permata/Cincin) ---
import { Heart, Coffee, Gem } from 'lucide-react'; 

const stories = [
  {
    year: "2018",
    title: "Pertemuan Pertama",
    description: "Kami bertemu di sebuah kedai kopi kecil di Jakarta Selatan. Berawal dari teman diskusi tentang buku, berakhir dengan diskusi tentang masa depan.",
    icon: <Coffee size={20} />,
  },
  {
    year: "2020",
    title: "Mulai Melangkah",
    description: "Setelah 2 tahun berteman, kami memutuskan untuk berkomitmen. Menjalani hari-hari penuh tawa dan saling mendukung impian masing-masing.",
    icon: <Heart size={20} />,
  },
  {
    year: "2024",
    title: "Lamaran",
    description: "Di bawah senja pantai Bali, Romeo berlutut dan meminta Juliet untuk menjadi teman hidupnya selamanya. She said Yes!",
    // --- PERBAIKAN: Gunakan <Gem /> di sini ---
    icon: <Gem size={20} />, 
  },
];

export default function OurStory() {
  return (
    <section className="py-20 px-6 w-full max-w-4xl mx-auto relative">
      
      {/* Judul Section */}
      <div className="text-center mb-16 space-y-4">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-gold-600 tracking-[0.3em] text-sm uppercase font-bold"
        >
          Love Story
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-4xl md:text-5xl text-sage-800 font-bold"
        >
          Kisah Kami
        </motion.h2>
      </div>

      {/* Timeline Container */}
      <div className="relative">
        {/* Garis Tengah Vertikal */}
        <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold-400 to-transparent h-full"></div>

        <div className="space-y-12">
          {stories.map((story, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`relative flex flex-col md:flex-row items-center ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* KOSONG (Spacer untuk layout zigzag) */}
              <div className="hidden md:block w-1/2" />

              {/* ICON BULAT DI TENGAH */}
              <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-10 h-10 bg-paper-50 border-2 border-gold-400 rounded-full flex items-center justify-center text-gold-600 z-10 shadow-md">
                {story.icon}
              </div>

              {/* KONTEN KARTU */}
              <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${
                index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"
              }`}>
                <div className="glass-ethereal p-6 rounded-2xl border border-white/40 hover:border-gold-300/50 transition-colors duration-300">
                  <span className="inline-block px-3 py-1 bg-sage-100 text-sage-600 text-xs font-bold rounded-full mb-3">
                    {story.year}
                  </span>
                  <h3 className="font-serif text-xl text-sage-800 font-bold mb-2">
                    {story.title}
                  </h3>
                  <p className="text-sage-600 text-sm leading-relaxed">
                    {story.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}