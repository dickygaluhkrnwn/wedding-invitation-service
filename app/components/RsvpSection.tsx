"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageCircle, Check } from 'lucide-react';

export default function RsvpSection() {
  const [formState, setFormState] = useState({
    name: '',
    attendance: 'hadir',
    guests: 1,
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulasi submit
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section className="py-20 px-6 w-full max-w-5xl mx-auto space-y-16 relative z-20">
      
      {/* Judul Section */}
      <div className="text-center space-y-4">
        <span className="text-gold-600 tracking-[0.3em] text-sm uppercase font-bold">
          RSVP & Wishes
        </span>
        <h2 className="font-serif text-4xl md:text-5xl text-sage-800 font-bold">
          Konfirmasi & Doa
        </h2>
        <p className="text-sage-600 max-w-md mx-auto">
          Kehadiran dan doa restu Anda merupakan kehormatan bagi kami.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
        
        {/* --- FORMULIR RSVP --- */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-ethereal p-8 rounded-3xl border border-white/50 shadow-xl"
        >
          <h3 className="font-serif text-2xl text-sage-900 font-bold mb-6 flex items-center gap-2">
            <Send size={24} className="text-gold-600" />
            Formulir Kehadiran
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nama */}
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wider text-sage-500 font-bold ml-2">Nama</label>
              <input 
                type="text" 
                required
                className="w-full bg-white/50 border border-sage-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-400 text-sage-900 placeholder:text-sage-300 transition-all"
                placeholder="Masukkan nama Anda"
                value={formState.name}
                onChange={(e) => setFormState({...formState, name: e.target.value})}
              />
            </div>

            {/* Kehadiran */}
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wider text-sage-500 font-bold ml-2">Konfirmasi</label>
              <div className="flex gap-4">
                {['hadir', 'tidak'].map((option) => (
                  <label key={option} className="flex-1 cursor-pointer">
                    <input 
                      type="radio" 
                      name="attendance" 
                      value={option}
                      checked={formState.attendance === option}
                      onChange={(e) => setFormState({...formState, attendance: e.target.value})}
                      className="hidden peer"
                    />
                    <div className="text-center py-3 rounded-xl border border-sage-200 bg-white/30 text-sage-600 peer-checked:bg-sage-600 peer-checked:text-white peer-checked:border-sage-600 transition-all capitalize">
                      {option === 'hadir' ? 'Hadir' : 'Maaf, Tidak'}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Jumlah Tamu */}
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wider text-sage-500 font-bold ml-2">Jumlah Tamu</label>
              <select 
                className="w-full bg-white/50 border border-sage-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-400 text-sage-900"
                value={formState.guests}
                onChange={(e) => setFormState({...formState, guests: parseInt(e.target.value)})}
              >
                {[1, 2, 3, 4].map(num => (
                  <option key={num} value={num}>{num} Orang</option>
                ))}
              </select>
            </div>

            {/* Pesan */}
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wider text-sage-500 font-bold ml-2">Ucapan & Doa</label>
              <textarea 
                rows={3}
                className="w-full bg-white/50 border border-sage-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-400 text-sage-900 placeholder:text-sage-300 transition-all resize-none"
                placeholder="Tuliskan doa restu Anda..."
                value={formState.message}
                onChange={(e) => setFormState({...formState, message: e.target.value})}
              />
            </div>

            {/* Tombol Submit */}
            <button 
              type="submit"
              disabled={isSubmitted}
              className="w-full py-4 bg-gold-500 hover:bg-gold-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitted ? (
                <>
                  <Check size={20} /> Terkirim
                </>
              ) : (
                "Kirim Konfirmasi"
              )}
            </button>
          </form>
        </motion.div>

        {/* --- LIST UCAPAN (WISHES) --- */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-ethereal p-8 rounded-3xl border border-white/50 shadow-xl h-full max-h-[600px] flex flex-col"
        >
          <h3 className="font-serif text-2xl text-sage-900 font-bold mb-6 flex items-center gap-2">
            <MessageCircle size={24} className="text-gold-600" />
            Doa Restu
          </h3>

          <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
             {/* Dummy Data Wishes */}
             {[1, 2, 3, 4, 5].map((item) => (
               <div key={item} className="bg-white/40 p-4 rounded-xl border border-white/60">
                 <div className="flex justify-between items-start mb-2">
                   <span className="font-bold text-sage-800 text-sm">Teman Romeo</span>
                   <span className="text-[10px] text-sage-400">2 jam yang lalu</span>
                 </div>
                 <p className="text-sage-600 text-sm leading-relaxed">
                   "Selamat menempuh hidup baru Romeo & Juliet! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Bahagia selalu!"
                 </p>
               </div>
             ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}