"use client";

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MapPin, Clock, Calendar, ExternalLink, Music } from 'lucide-react';
import CountdownTimer from './CountdownTimer';

export default function EventDetails() {
  return (
    <section className="py-24 px-6 w-full max-w-7xl mx-auto space-y-20">
      
      {/* --- JUDUL SECTION --- */}
      <div className="text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-gold-600 tracking-[0.4em] text-xs md:text-sm uppercase font-bold">
            Save The Date
          </span>
          <h2 className="font-serif text-4xl md:text-6xl text-sage-800 font-bold">
            Waktu & Tempat
          </h2>
        </motion.div>
        
        <div className="pt-4">
            <CountdownTimer />
        </div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sage-600 max-w-lg mx-auto leading-relaxed text-sm md:text-base"
        >
          Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan pernikahan kami pada:
        </motion.p>
      </div>

      {/* --- CARDS CONTAINER (3D TILT) --- */}
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 perspective-1000">
        
        <TiltCard 
          title="Akad Nikah"
          date="Minggu, 24 Agustus 2025"
          time="08:00 WIB - Selesai"
          location="Masjid Agung Al-Azhar"
          address="Jl. Sisingamangaraja, Kebayoran Baru, Jakarta Selatan"
          icon={<ExternalLink size={32} />}
          delay={0.2}
        />

        <TiltCard 
          title="Resepsi"
          date="Minggu, 24 Agustus 2025"
          time="11:00 WIB - 13:00 WIB"
          location="Glass House Ballroom"
          address="Jl. Sudirman Kav 52-53, Jakarta Selatan"
          icon={<Music size={32} />}
          delay={0.4}
        />

      </div>

      {/* Tombol Peta Global */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        viewport={{ once: true }}
        className="text-center pt-4"
      >
        <a 
          href="https://goo.gl/maps/placeholder" 
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center gap-3 px-8 py-4 bg-sage-800 text-white rounded-full overflow-hidden transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
        >
          {/* Hover Effect Background (UPDATED) */}
          {/* Menambahkan 'transform' eksplisit dan memastikan urutan layer benar */}
          <div className="absolute inset-0 bg-gold-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out will-change-transform" />
          
          {/* Teks (UPDATED: z-10 agar selalu di atas background emas) */}
          <span className="relative z-10 flex items-center gap-2 font-medium tracking-wide">
            <MapPin size={18} />
            Lihat Lokasi di Google Maps
          </span>
        </a>
      </motion.div>

    </section>
  );
}

// --- KOMPONEN KARTU 3D TILT ---
function TiltCard({ title, date, time, location, address, icon, delay }: any) {
  const ref = useRef<HTMLDivElement>(null);

  // Motion Values untuk Rotasi
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth Spring Physics
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ delay, duration: 0.8, type: "spring" }}
      viewport={{ once: true, margin: "-100px" }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full"
    >
      <div className="glass-ethereal p-8 md:p-10 rounded-[2rem] border border-white/60 text-center space-y-6 h-full flex flex-col items-center transform-gpu transition-shadow duration-300 hover:shadow-gold-500/20 hover:shadow-2xl group bg-white/40">
        
        {/* Depth Effect Element (Icon Floating) */}
        <div 
          className="w-20 h-20 bg-gradient-to-br from-sage-100 to-white rounded-full flex items-center justify-center text-gold-600 shadow-inner mb-2 group-hover:scale-110 transition-transform duration-500"
          style={{ transform: "translateZ(50px)" }}
        >
            {icon}
        </div>

        <div style={{ transform: "translateZ(30px)" }} className="space-y-6">
            <h3 className="font-serif text-3xl md:text-4xl text-sage-900 font-bold tracking-tight">
                {title}
            </h3>
            
            <div className="space-y-5 text-sage-700">
                <div className="flex flex-col items-center gap-1 group-hover:text-sage-900 transition-colors">
                    <div className="flex items-center gap-2 text-gold-600 mb-1">
                        <Calendar size={18} />
                        <span className="font-bold text-xs uppercase tracking-widest">Tanggal</span>
                    </div>
                    <p className="font-serif text-xl">{date}</p>
                </div>

                <div className="flex flex-col items-center gap-1 group-hover:text-sage-900 transition-colors">
                    <div className="flex items-center gap-2 text-gold-600 mb-1">
                        <Clock size={18} />
                        <span className="font-bold text-xs uppercase tracking-widest">Waktu</span>
                    </div>
                    <p className="font-sans text-lg">{time}</p>
                </div>

                <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto opacity-50"></div>

                <div className="flex flex-col items-center gap-1 group-hover:text-sage-900 transition-colors">
                    <div className="flex items-center gap-2 text-gold-600 mb-1">
                        <MapPin size={18} />
                        <span className="font-bold text-xs uppercase tracking-widest">Lokasi</span>
                    </div>
                    <p className="font-bold text-lg text-sage-800">{location}</p>
                    <p className="text-sm text-sage-500 px-4 leading-relaxed">{address}</p>
                </div>
            </div>

            <button className="mt-4 text-xs font-bold uppercase tracking-widest border-b-2 border-gold-400/30 pb-1 text-gold-700 hover:text-gold-900 hover:border-gold-600 transition-all">
                Simpan ke Kalender
            </button>
        </div>
      </div>
    </motion.div>
  );
}