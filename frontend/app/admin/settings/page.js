'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiLock, FiMoon, FiShield, FiSave, FiLogOut, FiCheckCircle } from 'react-icons/fi';
import MagneticButton from '@/components/ui/MagneticButton';

export default function AdminSettings() {
  const router = useRouter();
  const [profile, setProfile] = useState({
    name: 'Vansh Sunil Chauhan',
    email: 'vanshchauhand@gmail.com',
    phone: '+91 93214 45712',
    location: 'Mumbai, Maharashtra',
  });
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('vanshos_admin_token');
    }
    router.push('/admin/login');
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 className="font-heading text-3xl md:text-4xl text-luxuryWhite font-light">
            System <span className="gold-gradient-text">Settings</span>
          </h1>
          <p className="font-button text-xs text-luxuryMuted mt-1">
            Manage administrator profile, security keys, and global preferences
          </p>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-[16px] bg-emeraldAccent/10 border border-emeraldAccent/30 text-emeraldAccent text-xs font-button flex items-center space-x-2">
          <FiCheckCircle className="w-4 h-4" />
          <span>Profile configuration updated and synchronized successfully!</span>
        </div>
      )}

      {/* Profile Form */}
      <div className="glass-card p-8 rounded-[24px] border border-white/10 space-y-6 shadow-luxury-shadow">
        <div className="flex items-center space-x-3 pb-4 border-b border-white/10">
          <FiUser className="w-6 h-6 text-goldAccent" />
          <h3 className="font-heading text-xl text-luxuryWhite">Administrator Profile</h3>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-4 font-body text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-button text-luxuryGray uppercase tracking-wider">Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-4 py-3 rounded-[14px] bg-[#121212] border border-white/10 text-luxuryWhite focus:outline-none focus:border-goldAccent text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="font-button text-luxuryGray uppercase tracking-wider">Contact Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-4 py-3 rounded-[14px] bg-[#121212] border border-white/10 text-luxuryWhite focus:outline-none focus:border-goldAccent text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-button text-luxuryGray uppercase tracking-wider">Phone / WhatsApp</label>
              <input
                type="text"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-[14px] bg-[#121212] border border-white/10 text-luxuryWhite focus:outline-none focus:border-goldAccent text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="font-button text-luxuryGray uppercase tracking-wider">Base Location</label>
              <input
                type="text"
                value={profile.location}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                className="w-full px-4 py-3 rounded-[14px] bg-[#121212] border border-white/10 text-luxuryWhite focus:outline-none focus:border-goldAccent text-sm"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 rounded-[16px] bg-gradient-to-r from-goldAccent to-[#DFB531] text-darkBg font-button font-bold text-xs uppercase tracking-wider flex items-center space-x-2 shadow-gold-glow"
            >
              <FiSave className="w-4 h-4" />
              <span>Save Profile Changes</span>
            </button>
          </div>
        </form>
      </div>

      {/* Security & Password Update */}
      <div className="glass-card p-8 rounded-[24px] border border-white/10 space-y-6 shadow-luxury-shadow">
        <div className="flex items-center space-x-3 pb-4 border-b border-white/10">
          <FiLock className="w-6 h-6 text-emeraldAccent" />
          <h3 className="font-heading text-xl text-luxuryWhite">Security Credentials</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-body text-xs">
          <div className="space-y-1">
            <label className="font-button text-luxuryGray uppercase tracking-wider">New Password</label>
            <input
              type="password"
              placeholder="••••••••••••"
              className="w-full px-4 py-3 rounded-[14px] bg-[#121212] border border-white/10 text-luxuryWhite focus:outline-none focus:border-goldAccent text-sm"
            />
          </div>
          <div className="space-y-1">
            <label className="font-button text-luxuryGray uppercase tracking-wider">Confirm New Password</label>
            <input
              type="password"
              placeholder="••••••••••••"
              className="w-full px-4 py-3 rounded-[14px] bg-[#121212] border border-white/10 text-luxuryWhite focus:outline-none focus:border-goldAccent text-sm"
            />
          </div>
        </div>
      </div>

      {/* Theme Option (Dark Theme Locked) */}
      <div className="glass-card p-8 rounded-[24px] border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FiMoon className="w-6 h-6 text-goldAccent" />
            <div>
              <h4 className="font-heading text-lg text-luxuryWhite">Luxury Dark Theme</h4>
              <p className="font-button text-xs text-luxuryMuted">Strict dark mode (#0B0B0B) enforced for luxury aesthetic consistency</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-goldAccent/10 text-goldAccent font-button text-xs font-semibold">
            Active
          </span>
        </div>
      </div>

      {/* Danger Zone / Logout */}
      <div className="glass-card p-8 rounded-[24px] border border-red-500/20 space-y-4">
        <h4 className="font-heading text-lg text-red-400">Session Actions</h4>
        <p className="font-button text-xs text-luxuryMuted">
          Terminating administrative session will clear local tokens and redirect to login screen.
        </p>
        <button
          onClick={() => setIsLogoutModalOpen(true)}
          className="px-6 py-3 rounded-[16px] bg-red-500/10 border border-red-500/30 text-red-400 font-button font-bold text-xs uppercase tracking-wider flex items-center space-x-2 hover:bg-red-500/20 transition-colors"
        >
          <FiLogOut className="w-4 h-4" />
          <span>Sign Out of VanshOS Admin</span>
        </button>
      </div>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {isLogoutModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div className="w-full max-w-sm glass-card p-6 rounded-[24px] border border-white/10 space-y-4 text-center">
              <h3 className="font-heading text-xl text-luxuryWhite">Confirm Sign Out</h3>
              <p className="font-body text-xs text-luxuryMuted">
                Are you sure you want to exit the admin dashboard session?
              </p>
              <div className="flex justify-center space-x-3 pt-2 font-button text-xs">
                <button
                  onClick={() => setIsLogoutModalOpen(false)}
                  className="px-4 py-2 rounded-[12px] bg-white/5 text-luxuryWhite"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-[12px] bg-red-500 text-white font-bold"
                >
                  Sign Out Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
