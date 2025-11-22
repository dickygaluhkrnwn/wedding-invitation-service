"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
    icon: <Gem size={20} />, 
  },
];

export default function OurStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mengambil progress scroll dari kontainer timeline
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Tinggi garis timeline mengikuti scroll (0% -> 100%)
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-24 px-6 w-full max-w-5xl mx-auto relative">
      
      {/* Judul Section */}
      <div className="text-center mb-20 space-y-4">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-gold-600 tracking-[0.4em] text-xs md:text-sm uppercase font-bold"
        >
          Love Story
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-serif text-4xl md:text-6xl text-sage-800 font-bold"
        >
          Kisah Kami
        </motion.h2>
      </div>

      {/* Timeline Container */}
      <div ref={containerRef} className="relative">
        
        {/* --- THE RED STRING (Scroll-Triggered Line) --- */}
        {/* Garis Abu-abu (Base) */}
        <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-sage-200/50 rounded-full" />
        
        {/* Garis Emas (Progress) */}
        <motion.div 
          style={{ height: lineHeight }}
          className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 w-[2px] bg-gradient-to-b from-gold-300 via-gold-500 to-gold-300 rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)] z-0"
        />

        <div className="space-y-16 md:space-y-24 pb-12">
          {stories.map((story, index) => (
            <StoryCard key={index} story={story} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Komponen Story Card Terpisah agar animasi lebih rapi
function StoryCard({ story, index }: { story: any, index: number }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.4 }}
      viewport={{ once: true, margin: "-100px" }}
      className={`relative flex flex-col md:flex-row items-center ${
        isEven ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Spacer */}
      <div className="hidden md:block w-1/2" />

      {/* --- ICON MARKER (ALIVE) --- */}
      <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center z-10">
        {/* Lingkaran Luar (Pulse Effect) */}
        <div className="absolute w-12 h-12 rounded-full border border-gold-400/30 animate-ping opacity-20" />
        
        {/* Lingkaran Utama */}
        <div className="w-10 h-10 bg-paper-50 border-2 border-gold-500 rounded-full flex items-center justify-center text-gold-600 shadow-lg ring-4 ring-paper-50">
          {story.icon}
        </div>
      </div>

      {/* --- KONTEN KARTU --- */}
      <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${
        isEven ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"
      }`}>
        <motion.div 
          whileHover={{ y: -5 }}
          className="glass-ethereal p-8 rounded-2xl border border-white/60 hover:border-gold-300/50 transition-colors duration-300 relative group"
        >
          {/* Dekorasi Sudut (Corner Flower/Leaf) - Opsional */}
          <div className={`absolute top-0 w-16 h-16 border-t-2 border-gold-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isEven ? 'right-0 border-r-2 rounded-tr-2xl' : 'left-0 border-l-2 rounded-tl-2xl'}`} />

          <span className="inline-block px-4 py-1 bg-sage-100/80 text-sage-700 text-xs font-bold rounded-full mb-4 tracking-wider shadow-sm backdrop-blur-sm">
            {story.year}
          </span>
          
          <h3 className="font-serif text-2xl text-sage-900 font-bold mb-3 group-hover:text-gold-700 transition-colors">
            {story.title}
          </h3>
          
          <p className="text-sage-600 text-sm md:text-base leading-relaxed">
            {story.description}
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}