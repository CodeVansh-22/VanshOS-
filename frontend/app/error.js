'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiRefreshCw, FiHome, FiAlertTriangle } from 'react-icons/fi';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('Unhandled runtime error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-luxuryWhite flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-500/10 via-transparent to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full glass-card p-10 rounded-[28px] border border-white/10 text-center space-y-6 shadow-luxury-shadow z-10"
      >
        <div className="w-20 h-20 rounded-full bg-red-500/10 text-red-400 border border-red-500/30 flex items-center justify-center mx-auto mb-2">
          <FiAlertTriangle className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h1 className="font-heading text-4xl text-luxuryWhite font-light">System Exception</h1>
          <p className="font-body text-xs text-luxuryMuted">
            An unexpected error occurred while processing your request. Please try refreshing.
          </p>
        </div>

        <div className="space-y-3 font-button text-xs">
          <button
            onClick={() => reset()}
            className="w-full py-3.5 rounded-[16px] bg-gradient-to-r from-goldAccent to-[#DFB531] text-darkBg font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-gold-glow hover:scale-[1.02] transition-transform"
          >
            <FiRefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="w-full py-3.5 rounded-[16px] bg-white/5 hover:bg-white/10 text-luxuryWhite font-semibold uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors block"
          >
            <FiHome className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
