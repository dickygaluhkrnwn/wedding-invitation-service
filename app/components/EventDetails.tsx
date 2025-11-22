"use client";

import React from 'react';
import { motion } from 'framer-motion';
// --- PERBAIKAN DI SINI: Menambahkan 'Music' ke dalam import ---
import { MapPin, Clock, Calendar, ExternalLink, Music } from 'lucide-react';
import CountdownTimer from './CountdownTimer';

export default function EventDetails() {
  return (
    <section className="py-20 px-6 w-full max-w-6xl mx-auto space-y-16">
      
      {/* --- JUDUL SECTION --- */}
      <div className="text-center space-y-4">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-gold-600 tracking-[0.3em] text-sm uppercase font-bold"
        >
          Save The Date
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="font-serif text-4xl md:text-5xl text-sage-800 font-bold"
        >
          Waktu & Tempat
        </motion.h2>
        
        <div className="pt-6">
            <CountdownTimer />
        </div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sage-600 max-w-lg mx-auto leading-relaxed"
        >
          Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan pernikahan kami pada:
        </motion.p>
      </div>

      {/* --- CARDS CONTAINER (Grid) --- */}
      <div className="grid md:grid-cols-2 gap-8">
        
        {/* KARTU 1: AKAD NIKAH */}
        <EventCard 
          title="Akad Nikah"
          date="Minggu, 24 Agustus 2025"
          time="08:00 WIB - Selesai"
          location="Masjid Agung Al-Azhar"
          address="Jl. Sisingamangaraja, Kebayoran Baru, Jakarta Selatan"
          delay={0.2}
        />

        {/* KARTU 2: RESEPSI */}
        <EventCard 
          title="Resepsi"
          date="Minggu, 24 Agustus 2025"
          time="11:00 WIB - 13:00 WIB"
          location="Glass House Ballroom"
          address="Jl. Sudirman Kav 52-53, Jakarta Selatan"
          delay={0.4}
        />

      </div>

      {/* Tombol Peta Global */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        viewport={{ once: true }}
        className="text-center pt-8"
      >
        <a 
          href="https://goo.gl/maps/placeholder" // Ganti link maps asli nanti
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 bg-sage-700 text-white rounded-full hover:bg-sage-800 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
        >
          <MapPin size={18} />
          <span>Lihat Lokasi di Google Maps</span>
        </a>
      </motion.div>

    </section>
  );
}

// Sub-Komponen Kartu (Biar rapi)
function EventCard({ title, date, time, location, address, delay }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: delay, duration: 0.8 }}
      viewport={{ once: true }}
      className="glass-ethereal p-8 rounded-3xl border border-white/50 text-center space-y-6 hover:border-gold-300/50 transition-colors duration-300"
    >
        {/* Icon Header */}
        <div className="w-16 h-16 mx-auto bg-paper-100 rounded-full flex items-center justify-center text-gold-600 shadow-inner">
            {title.includes("Akad") ? <ExternalLink /> : <Music />} 
            {/* Icon bisa diganti cincin/gelas nanti */}
        </div>

        <h3 className="font-serif text-3xl text-sage-900 font-bold">{title}</h3>
        
        <div className="space-y-4 text-sage-700">
            <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-2 text-gold-600 mb-1">
                    <Calendar size={16} />
                    <span className="font-bold text-sm uppercase tracking-wider">Tanggal</span>
                </div>
                <p className="font-serif text-lg">{date}</p>
            </div>

            <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-2 text-gold-600 mb-1">
                    <Clock size={16} />
                    <span className="font-bold text-sm uppercase tracking-wider">Waktu</span>
                </div>
                <p className="font-sans">{time}</p>
            </div>

            <div className="w-full h-px bg-sage-200 my-4"></div>

            <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-2 text-gold-600 mb-1">
                    <MapPin size={16} />
                    <span className="font-bold text-sm uppercase tracking-wider">Lokasi</span>
                </div>
                <p className="font-bold text-sage-800">{location}</p>
                <p className="text-sm text-sage-500 px-4">{address}</p>
            </div>
        </div>

        <button className="text-xs text-gold-600 font-bold uppercase tracking-widest border-b border-gold-400 pb-1 hover:text-gold-800 hover:border-gold-600 transition-all">
            Simpan ke Kalender
        </button>
    </motion.div>
  );
}