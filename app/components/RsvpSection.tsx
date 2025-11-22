"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MessageCircle, Check, Loader2 } from 'lucide-react';

export default function RsvpSection() {
  const [formState, setFormState] = useState({
    name: '',
    attendance: 'hadir',
    guests: 1,
    message: ''
  });
  
  // State status pengiriman: 'idle' | 'submitting' | 'success'
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mulai loading
    setStatus('submitting');

    // Simulasi delay network (2 detik)
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Sukses
    setStatus('success');

    // Reset form setelah 3 detik sukses
    setTimeout(() => {
      setStatus('idle');
      setFormState({ ...formState, message: '' }); // Clear pesan saja contohnya
    }, 3000);
  };

  return (
    <section className="py-24 px-6 w-full max-w-6xl mx-auto space-y-16 relative z-20">
      
      {/* Judul Section */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-gold-600 tracking-[0.4em] text-xs md:text-sm uppercase font-bold">
            RSVP & Wishes
          </span>
          <h2 className="font-serif text-4xl md:text-6xl text-sage-800 font-bold mt-2">
            Konfirmasi & Doa
          </h2>
        </motion.div>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-sage-600 max-w-md mx-auto leading-relaxed"
        >
          Kehadiran dan doa restu Anda merupakan kehormatan bagi kami.
        </motion.p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
        
        {/* --- FORMULIR RSVP --- */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-ethereal p-8 rounded-3xl border border-white/50 shadow-2xl relative overflow-hidden"
        >
          {/* Dekorasi Background Form */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold-100 rounded-bl-full opacity-20 pointer-events-none" />

          <h3 className="font-serif text-2xl text-sage-900 font-bold mb-8 flex items-center gap-3">
            <div className="p-3 bg-sage-100 rounded-full text-sage-600">
                <Send size={20} />
            </div>
            Formulir Kehadiran
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nama */}
            <div className="space-y-2 group">
              <label className="text-xs uppercase tracking-widest text-sage-500 font-bold ml-1 group-focus-within:text-gold-600 transition-colors">Nama Lengkap</label>
              <input 
                type="text" 
                required
                className="w-full bg-white/40 border border-sage-200 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 text-sage-900 placeholder:text-sage-400 transition-all shadow-sm hover:bg-white/60"
                placeholder="Masukkan nama Anda"
                value={formState.name}
                onChange={(e) => setFormState({...formState, name: e.target.value})}
              />
            </div>

            {/* Kehadiran */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-sage-500 font-bold ml-1">Konfirmasi Kehadiran</label>
              <div className="flex gap-4">
                {['hadir', 'tidak'].map((option) => (
                  <label key={option} className="flex-1 cursor-pointer relative">
                    <input 
                      type="radio" 
                      name="attendance" 
                      value={option}
                      checked={formState.attendance === option}
                      onChange={(e) => setFormState({...formState, attendance: e.target.value})}
                      className="hidden peer"
                    />
                    <div className="text-center py-3 px-4 rounded-xl border border-sage-200 bg-white/40 text-sage-600 font-medium peer-checked:bg-sage-700 peer-checked:text-white peer-checked:border-sage-700 peer-checked:shadow-md transition-all capitalize hover:bg-white/60">
                      {option === 'hadir' ? 'Berhadir' : 'Maaf, Tidak'}
                    </div>
                    {/* Icon Check di sudut */}
                    {formState.attendance === option && (
                        <motion.div 
                            layoutId="check-badge"
                            className="absolute -top-2 -right-2 bg-gold-500 text-white rounded-full p-1 shadow-sm"
                        >
                            <Check size={12} />
                        </motion.div>
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* Jumlah Tamu */}
            <div className="space-y-2 group">
              <label className="text-xs uppercase tracking-widest text-sage-500 font-bold ml-1 group-focus-within:text-gold-600 transition-colors">Jumlah Tamu</label>
              <div className="relative">
                <select 
                    className="w-full bg-white/40 border border-sage-200 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 text-sage-900 appearance-none cursor-pointer hover:bg-white/60 transition-all"
                    value={formState.guests}
                    onChange={(e) => setFormState({...formState, guests: parseInt(e.target.value)})}
                >
                    {[1, 2, 3, 4].map(num => (
                    <option key={num} value={num}>{num} Orang</option>
                    ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-sage-500">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>
            </div>

            {/* Pesan */}
            <div className="space-y-2 group">
              <label className="text-xs uppercase tracking-widest text-sage-500 font-bold ml-1 group-focus-within:text-gold-600 transition-colors">Ucapan & Doa</label>
              <textarea 
                rows={4}
                className="w-full bg-white/40 border border-sage-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 text-sage-900 placeholder:text-sage-400 transition-all resize-none shadow-sm hover:bg-white/60"
                placeholder="Tuliskan doa restu Anda..."
                value={formState.message}
                onChange={(e) => setFormState({...formState, message: e.target.value})}
              />
            </div>

            {/* Tombol Submit Interaktif */}
            <button 
              type="submit"
              disabled={status === 'submitting' || status === 'success'}
              className={`w-full py-4 font-bold rounded-xl shadow-lg hover:shadow-xl transform transition-all flex items-center justify-center gap-2 overflow-hidden relative
                ${status === 'success' 
                    ? 'bg-green-600 text-white cursor-default' 
                    : 'bg-sage-800 hover:bg-sage-900 text-white hover:-translate-y-1'
                }
              `}
            >
              <AnimatePresence mode='wait'>
                {status === 'submitting' ? (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex items-center gap-2"
                    >
                        <Loader2 size={20} className="animate-spin" /> 
                        Mengirim...
                    </motion.div>
                ) : status === 'success' ? (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                    >
                        <Check size={20} /> Terkirim! Terima Kasih
                    </motion.div>
                ) : (
                    <motion.div
                        key="idle"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex items-center gap-2 tracking-wide"
                    >
                        Kirim Konfirmasi <Send size={18} />
                    </motion.div>
                )}
              </AnimatePresence>
            </button>
          </form>
        </motion.div>

        {/* --- LIST UCAPAN (WISHES WALL) --- */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-ethereal p-8 rounded-3xl border border-white/50 shadow-xl h-[650px] flex flex-col relative"
        >
          <h3 className="font-serif text-2xl text-sage-900 font-bold mb-6 flex items-center gap-3">
            <div className="p-3 bg-gold-100 rounded-full text-gold-600">
                <MessageCircle size={20} />
            </div>
            Doa Restu
          </h3>

          <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar relative">
             {/* List Ucapan dengan Staggered Animation */}
             {[1, 2, 3, 4, 5, 6].map((item, idx) => (
               <motion.div 
                 key={item}
                 initial={{ opacity: 0, x: 20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: idx * 0.1 }}
                 className="bg-white/60 p-5 rounded-2xl border border-white/60 shadow-sm hover:shadow-md transition-shadow"
               >
                 <div className="flex justify-between items-start mb-3">
                   <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-sage-200 rounded-full flex items-center justify-center text-sage-600 font-bold text-xs">
                            {/* Avatar Inisial */}
                            R
                        </div>
                        <span className="font-bold text-sage-800 text-sm">Rizky & Partner</span>
                   </div>
                   <span className="text-[10px] font-mono text-sage-400 bg-sage-50 px-2 py-1 rounded-full">2j lalu</span>
                 </div>
                 <p className="text-sage-700 text-sm leading-relaxed italic">
                   "Selamat menempuh hidup baru Romeo & Juliet! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Bahagia selalu ya kalian!"
                 </p>
               </motion.div>
             ))}
          </div>
          
          {/* Gradient Fade di Bawah agar terlihat seamless */}
          <div className="absolute bottom-8 left-0 right-0 h-12 bg-gradient-to-t from-white/80 to-transparent pointer-events-none rounded-b-3xl" />
        </motion.div>
      </div>
    </section>
  );
}