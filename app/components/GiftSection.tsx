"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Copy, Check, CreditCard } from 'lucide-react';

export default function GiftSection() {
  return (
    <section className="py-24 px-6 w-full max-w-5xl mx-auto relative z-20 mb-20">
      
      {/* Judul */}
      <div className="text-center mb-16 space-y-4">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            <span className="text-gold-600 tracking-[0.4em] text-xs md:text-sm uppercase font-bold">
            Wedding Gift
            </span>
            <h2 className="font-serif text-4xl md:text-6xl text-sage-800 font-bold mt-2">
            Tanda Kasih
            </h2>
        </motion.div>
        <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sage-600 max-w-lg mx-auto leading-relaxed"
        >
          Tanpa mengurangi rasa hormat, bagi Anda yang ingin memberikan tanda kasih untuk kami, dapat melalui:
        </motion.p>
      </div>

      {/* Grid Bank Cards */}
      <div className="grid md:grid-cols-2 gap-8">
        <BankCard 
          bankName="BCA" 
          accountNumber="1234567890" 
          accountName="Romeo Montague" 
          delay={0}
        />
        <BankCard 
          bankName="MANDIRI" 
          accountNumber="0987654321" 
          accountName="Juliet Capulet" 
          delay={0.2}
        />
      </div>

      {/* Gift Box Animation */}
      <motion.div 
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
        className="flex justify-center mt-16"
      >
        <div className="p-5 bg-white/80 rounded-full backdrop-blur-md border border-gold-200 shadow-xl hover:scale-110 transition-transform duration-300 cursor-pointer group">
          <Gift className="text-gold-500 w-10 h-10 group-hover:rotate-12 transition-transform" />
        </div>
      </motion.div>

    </section>
  );
}

// Sub-Komponen Kartu Bank Interaktif
function BankCard({ bankName, accountNumber, accountName, delay }: { bankName: string, accountNumber: string, accountName: string, delay: number }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500); 
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      whileHover={{ y: -8 }}
      className="glass-ethereal p-8 rounded-[2rem] border border-white/60 flex flex-col items-center text-center space-y-6 relative overflow-hidden group transition-all hover:shadow-2xl hover:shadow-sage-200"
    >
      {/* Dekorasi Background (Shine Effect) */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gold-200/40 to-transparent rounded-bl-full -mr-8 -mt-8 transition-all duration-500 group-hover:scale-125 group-hover:opacity-80" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-sage-100/50 rounded-tr-full -ml-6 -mb-6 transition-all duration-500 group-hover:scale-125" />

      {/* Logo Bank / Chip */}
      <div className="w-full flex justify-between items-start opacity-60 mb-2 relative z-10">
        <CreditCard size={32} className="text-sage-500" />
        <span className="font-bold text-sage-400 text-[10px] tracking-[0.2em] border border-sage-300 px-2 py-1 rounded">DEBIT</span>
      </div>

      <div className="space-y-1 relative z-10">
        <h3 className="font-bold text-2xl text-sage-800 tracking-tight">{bankName}</h3>
        <p className="text-sage-500 uppercase text-xs font-bold tracking-widest">
            a.n {accountName}
        </p>
      </div>
      
      {/* Nomor Rekening (Besar & Jelas) */}
      <div className="relative z-10 py-2 w-full border-t border-b border-sage-100">
        <p className="font-mono text-3xl md:text-4xl text-sage-900 tracking-wider font-medium">
            {accountNumber}
        </p>
      </div>

      {/* Tombol Copy Morphing */}
      <button 
        onClick={handleCopy}
        className={`relative z-10 flex items-center justify-center gap-2 px-8 py-3 rounded-full text-sm font-bold transition-all active:scale-95 shadow-sm overflow-hidden w-48
            ${copied 
                ? 'bg-green-100 text-green-700 ring-2 ring-green-500 ring-offset-1' 
                : 'bg-sage-800 text-white hover:bg-gold-600 hover:shadow-md'
            }
        `}
      >
        <AnimatePresence mode='wait' initial={false}>
          {copied ? (
            <motion.span 
              key="copied"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="flex items-center gap-2"
            >
              <Check size={18} strokeWidth={3} /> Tersalin
            </motion.span>
          ) : (
            <motion.span 
              key="copy"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="flex items-center gap-2"
            >
              <Copy size={18} /> Salin Nomor
            </motion.span>
          )}
        </AnimatePresence>
      </button>

    </motion.div>
  );
}