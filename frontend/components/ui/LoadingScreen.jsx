'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window !== 'undefined') {
      const alreadyLoaded = sessionStorage.getItem('vanshos_loaded');
      if (alreadyLoaded) return false;
    }
    return true;
  });

  useEffect(() => {
    if (!isLoading) {
      if (onComplete) onComplete();
      return;
    }

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsLoading(false);
            if (typeof window !== 'undefined') {
              sessionStorage.setItem('vanshos_loaded', 'true');
            }
            if (onComplete) onComplete();
          }, 100);
          return 100;
        }
        return prev + Math.floor(Math.random() * 20) + 15;
      });
    }, 18);

    return () => clearInterval(timer);
  }, [isLoading, onComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#0B0B0B] p-8 md:p-16 text-luxuryWhite select-none"
        >
          {/* Top subtle brand mark */}
          <div className="w-full flex justify-between items-center text-xs tracking-widest text-luxuryMuted uppercase font-button">
            <span>VANSHOS // SYSTEM INITIALIZING</span>
            <span>2026 EDITION</span>
          </div>

          {/* Center Brand typography */}
          <div className="flex flex-col items-center justify-center text-center">
            <motion.h1 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="font-hero text-5xl md:text-8xl tracking-tight font-light gold-gradient-text"
            >
              VanshOS
            </motion.h1>
            <p className="font-heading italic text-luxuryGray mt-2 text-sm md:text-xl">
              Crafting Digital Precision & Intelligence
            </p>
          </div>

          {/* Bottom Progress Bar */}
          <div className="w-full max-w-md space-y-3">
            <div className="flex justify-between items-center text-xs font-button text-luxuryMuted">
              <span>LOADING EXPERIENCE</span>
              <span className="text-goldAccent font-semibold">{Math.min(progress, 100)}%</span>
            </div>
            <div className="h-[2px] w-full bg-[#1A1A1A] overflow-hidden rounded-full relative">
              <motion.div
                className="h-full bg-gradient-to-r from-goldAccent via-[#F5D77F] to-emeraldAccent"
                style={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ ease: 'easeOut', duration: 0.2 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
