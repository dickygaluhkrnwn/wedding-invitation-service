"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Copy, Check, CreditCard } from 'lucide-react';

export default function GiftSection() {
  return (
    <section className="py-20 px-6 w-full max-w-4xl mx-auto relative z-20 mb-20">
      
      {/* Judul */}
      <div className="text-center mb-12 space-y-4">
        <span className="text-gold-600 tracking-[0.3em] text-sm uppercase font-bold">
          Wedding Gift
        </span>
        <h2 className="font-serif text-4xl md:text-5xl text-sage-800 font-bold">
          Tanda Kasih
        </h2>
        <p className="text-sage-600 max-w-md mx-auto">
          Tanpa mengurangi rasa hormat, bagi Anda yang ingin memberikan tanda kasih untuk kami, dapat melalui:
        </p>
      </div>

      {/* Grid Bank Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <BankCard 
          bankName="BCA" 
          accountNumber="1234567890" 
          accountName="Romeo Montague" 
        />
        <BankCard 
          bankName="MANDIRI" 
          accountNumber="0987654321" 
          accountName="Juliet Capulet" 
        />
      </div>

      {/* Gift Box Animation (Opsional Icon Pemanis) */}
      <div className="flex justify-center mt-12">
        <div className="p-4 bg-white/50 rounded-full backdrop-blur-md border border-gold-200 shadow-inner">
          <Gift className="text-gold-500 w-8 h-8" />
        </div>
      </div>

    </section>
  );
}

// Sub-Komponen Kartu Bank
function BankCard({ bankName, accountNumber, accountName }: { bankName: string, accountNumber: string, accountName: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset setelah 2 detik
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass-ethereal p-6 rounded-2xl border border-white/60 flex flex-col items-center text-center space-y-4 relative overflow-hidden group"
    >
      {/* Dekorasi Background */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-gold-100 to-transparent opacity-50 rounded-bl-full -mr-4 -mt-4 transition-all group-hover:scale-110" />

      {/* Logo Bank / Chip */}
      <div className="w-full flex justify-between items-start opacity-70 mb-2">
        <CreditCard size={24} className="text-sage-400" />
        <span className="font-bold text-sage-300 text-xs tracking-widest">DEBIT CARD</span>
      </div>

      {/* Nama Bank */}
      <h3 className="font-bold text-2xl text-sage-800 tracking-tight">{bankName}</h3>
      
      {/* Nomor Rekening (Besar) */}
      <p className="font-mono text-3xl text-sage-900 tracking-wider py-2">
        {accountNumber}
      </p>

      {/* Nama Pemilik */}
      <p className="text-sage-500 uppercase text-xs font-bold tracking-widest">
        a.n {accountName}
      </p>

      {/* Tombol Copy */}
      <button 
        onClick={handleCopy}
        className="mt-4 flex items-center gap-2 px-6 py-2 bg-sage-100 hover:bg-sage-200 text-sage-700 rounded-full text-sm font-bold transition-all active:scale-95"
      >
        <AnimatePresence mode='wait'>
          {copied ? (
            <motion.span 
              key="copied"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="flex items-center gap-2 text-green-600"
            >
              <Check size={16} /> Tersalin
            </motion.span>
          ) : (
            <motion.span 
              key="copy"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="flex items-center gap-2"
            >
              <Copy size={16} /> Salin Nomor
            </motion.span>
          )}
        </AnimatePresence>
      </button>

    </motion.div>
  );
}