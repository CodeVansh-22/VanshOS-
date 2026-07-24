'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiLock, FiMail, FiArrowRight, FiShield, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import MagneticButton from '@/components/ui/MagneticButton';
import { authService } from '@/services/api';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('vanshchauhand@gmail.com');
  const [password, setPassword] = useState('admin123');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await authService.login({ email, password });
      if (res && res.success) {
        router.push('/admin/dashboard');
      } else {
        setError(res.message || 'Invalid admin credentials');
      }
    } catch (err) {
      setError(err.message || 'Authentication error. Please verify backend service.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070707] text-luxuryWhite flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full bg-goldAccent/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/3 w-96 h-96 rounded-full bg-emeraldAccent/10 blur-[140px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md glass-card p-8 md:p-10 rounded-[24px] border border-white/10 relative z-10 shadow-luxury-shadow space-y-6"
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block font-hero text-4xl font-bold tracking-tight">
            Vansh<span className="text-goldAccent">OS</span>
          </Link>
          <div className="flex items-center justify-center space-x-2 text-xs font-button text-goldAccent">
            <FiShield className="w-4 h-4" />
            <span className="uppercase tracking-wider">Administrative Control Suite</span>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-[12px] bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-button text-center flex items-center justify-center space-x-2">
            <FiAlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-xs font-button uppercase tracking-wider text-luxuryGray">
              Admin Email
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vanshchauhand@gmail.com"
                className="w-full pl-11 pr-4 py-3.5 rounded-[16px] bg-[#121212] border border-white/10 text-luxuryWhite text-sm focus:outline-none focus:border-goldAccent font-body"
              />
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-luxuryMuted w-4 h-4" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs font-button">
              <label className="uppercase tracking-wider text-luxuryGray">Password</label>
              <span className="text-luxuryMuted hover:text-goldAccent cursor-pointer">JWT Secured</span>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-11 pr-4 py-3.5 rounded-[16px] bg-[#121212] border border-white/10 text-luxuryWhite text-sm focus:outline-none focus:border-goldAccent font-body"
              />
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-luxuryMuted w-4 h-4" />
            </div>
          </div>

          <MagneticButton
            type="submit"
            disabled={isLoading}
            className="w-full py-4 rounded-[24px] bg-gradient-to-r from-goldAccent to-[#DFB531] text-darkBg font-bold text-sm uppercase tracking-wider shadow-gold-glow hover:scale-[1.01] transition-all pt-3"
          >
            {isLoading ? (
              <span>Authenticating JWT...</span>
            ) : (
              <span className="flex items-center justify-center space-x-2">
                <span>Access Dashboard</span>
                <FiArrowRight className="w-4 h-4" />
              </span>
            )}
          </MagneticButton>
        </form>

        {/* Credentials hint */}
        <div className="pt-4 border-t border-white/5 text-center text-xs font-button text-luxuryMuted space-y-1">
          <p className="text-emeraldAccent flex items-center justify-center space-x-1">
            <FiCheckCircle className="w-3.5 h-3.5" />
            <span>MongoDB Atlas Authentication Active</span>
          </p>
          <p>Default: <span className="text-luxuryWhite font-semibold">vanshchauhand@gmail.com</span> / <span className="text-luxuryWhite font-semibold">admin123</span></p>
        </div>

        <div className="text-center pt-2">
          <Link href="/" className="text-xs font-button text-luxuryMuted hover:text-luxuryWhite transition-colors">
            ← Return to Public Portfolio
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
