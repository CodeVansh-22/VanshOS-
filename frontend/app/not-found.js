'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiHome, FiAlertCircle } from 'react-icons/fi';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0B0B0B] text-luxuryWhite flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-goldAccent/10 via-transparent to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full glass-card p-10 rounded-[28px] border border-white/10 text-center space-y-6 shadow-luxury-shadow z-10"
      >
        <div className="w-20 h-20 rounded-full bg-goldAccent/10 text-goldAccent border border-goldAccent/30 flex items-center justify-center mx-auto shadow-gold-glow">
          <FiAlertCircle className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h1 className="font-heading text-6xl text-goldAccent font-bold">404</h1>
          <h2 className="font-heading text-2xl text-luxuryWhite font-light">Page Not Found</h2>
          <p className="font-body text-xs text-luxuryMuted">
            The destination link you are trying to reach does not exist or has been moved.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center justify-center space-x-2 w-full py-3.5 rounded-[16px] bg-gradient-to-r from-goldAccent to-[#DFB531] text-darkBg font-button font-bold text-xs uppercase tracking-wider shadow-gold-glow hover:scale-[1.02] transition-transform"
        >
          <FiHome className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
      </motion.div>
    </div>
  );
}
