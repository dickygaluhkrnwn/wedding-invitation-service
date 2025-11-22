"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Hanya aktifkan di desktop
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    if (!isDesktop) return;

    setIsVisible(true);

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Pasang event listener untuk semua elemen interaktif
    const attachListeners = () => {
      const interactables = document.querySelectorAll('a, button, .cursor-pointer, input, textarea');
      interactables.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    window.addEventListener('mousemove', updateMousePosition);
    
    // Observer untuk mendeteksi perubahan DOM (jika ada elemen baru muncul)
    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Initial attach
    attachListeners();

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      observer.disconnect();
      const interactables = document.querySelectorAll('a, button, .cursor-pointer, input, textarea');
      interactables.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-4 h-4 bg-sage-800 rounded-full pointer-events-none z-[9999] mix-blend-difference"
      animate={{
        x: mousePosition.x - 8, // Center cursor
        y: mousePosition.y - 8,
        scale: isHovering ? 3 : 1, // Membesar saat hover
        opacity: 1
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 28,
        mass: 0.5
      }}
    >
      {/* Ring luar (opsional, untuk estetika) */}
      <div className={`absolute inset-0 rounded-full border border-white/50 transition-all duration-300 ${isHovering ? 'scale-150 opacity-50' : 'scale-0 opacity-0'}`} />
    </motion.div>
  );
}