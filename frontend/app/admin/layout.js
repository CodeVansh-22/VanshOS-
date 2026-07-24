'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiGrid,
  FiFolder,
  FiCpu,
  FiBriefcase,
  FiAward,
  FiMail,
  FiFileText,
  FiBarChart2,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
  FiGlobe,
  FiUser,
  FiBell,
  FiSearch
} from 'react-icons/fi';

const adminNavItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: FiGrid },
  { name: 'Projects', href: '/admin/projects', icon: FiFolder },
  { name: 'Skills', href: '/admin/skills', icon: FiCpu },
  { name: 'Experience', href: '/admin/experience', icon: FiBriefcase },
  { name: 'Achievements', href: '/admin/achievements', icon: FiAward },
  { name: 'Messages', href: '/admin/messages', icon: FiMail, badge: '3' },
  { name: 'Resume', href: '/admin/resume', icon: FiFileText },
  { name: 'Analytics', href: '/admin/analytics', icon: FiBarChart2 },
  { name: 'Settings', href: '/admin/settings', icon: FiSettings },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && pathname !== '/admin/login') {
      const token = localStorage.getItem('vanshos_admin_token');
      if (!token) {
        router.push('/admin/login');
      }
    }
  }, [pathname, router]);

  // If on login page, don't show admin sidebar/topbar
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('vanshos_admin_token');
    }
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#070707] text-luxuryWhite flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-72 flex-col justify-between p-6 border-r border-white/10 glass-card bg-[#0B0B0B] sticky top-0 h-screen z-30">
        <div className="space-y-8">
          {/* Admin Header Logo */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <Link href="/admin/dashboard" className="flex items-center space-x-2">
              <span className="font-hero text-2xl font-bold tracking-tight text-luxuryWhite">
                Vansh<span className="text-goldAccent">OS</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-goldAccent/20 text-goldAccent text-[10px] font-button font-bold uppercase tracking-wider">
                ADMIN
              </span>
            </Link>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-1">
            {adminNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center justify-between px-4 py-3 rounded-[16px] text-sm font-button font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-goldAccent/20 to-emeraldAccent/10 text-luxuryWhite border border-goldAccent/40 font-semibold shadow-gold-glow'
                      : 'text-luxuryGray hover:text-luxuryWhite hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-goldAccent' : 'text-luxuryMuted'}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full bg-goldAccent text-darkBg text-[10px] font-bold">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer - View Site & Logout */}
        <div className="pt-6 border-t border-white/10 space-y-3 font-button">
          <Link
            href="/"
            target="_blank"
            className="flex items-center space-x-3 px-4 py-2.5 rounded-[16px] text-xs text-luxuryGray hover:text-luxuryWhite hover:bg-white/5 transition-colors"
          >
            <FiGlobe className="w-4 h-4 text-emeraldAccent" />
            <span>Visit Live Portfolio</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-[16px] text-xs text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <FiLogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Body */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Topbar */}
        <header className="h-20 border-b border-white/10 glass-nav px-6 md:px-8 flex items-center justify-between sticky top-0 z-20">
          
          <div className="flex items-center space-x-4">
            {/* Mobile menu toggle button */}
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-[12px] glass-card text-luxuryWhite"
            >
              <FiMenu className="w-6 h-6" />
            </button>

            {/* Quick Search */}
            <div className="hidden sm:flex items-center space-x-2 px-4 py-2 rounded-[16px] bg-[#121212] border border-white/10 w-64 md:w-80">
              <FiSearch className="w-4 h-4 text-luxuryMuted" />
              <input
                type="text"
                placeholder="Search across VanshOS..."
                className="bg-transparent text-xs text-luxuryWhite placeholder-luxuryMuted focus:outline-none w-full font-body"
              />
            </div>
          </div>

          {/* Topbar Right Actions */}
          <div className="flex items-center space-x-4">
            <button className="relative p-2.5 rounded-full bg-[#121212] border border-white/10 text-luxuryGray hover:text-luxuryWhite transition-colors">
              <FiBell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-goldAccent" />
            </button>

            {/* Admin Avatar */}
            <div className="flex items-center space-x-3 pl-3 border-l border-white/10">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-goldAccent to-emeraldAccent p-0.5">
                <div className="w-full h-full rounded-full bg-darkBg flex items-center justify-center text-goldAccent font-bold text-xs">
                  VS
                </div>
              </div>
              <div className="hidden sm:block text-left font-button">
                <span className="block text-xs font-semibold text-luxuryWhite leading-none">Vansh Chauhan</span>
                <span className="text-[10px] text-emeraldAccent leading-none">Administrator</span>
              </div>
            </div>
          </div>

        </header>

        {/* Dynamic Admin Page Workspace */}
        <main className="flex-1 p-6 md:p-10 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Mobile Drawer Sidebar */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex lg:hidden"
          >
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25 }}
              className="w-72 bg-[#0B0B0B] border-r border-white/10 p-6 flex flex-col justify-between h-full"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <span className="font-hero text-2xl font-bold text-luxuryWhite">
                    Vansh<span className="text-goldAccent">OS</span>
                  </span>
                  <button onClick={() => setMobileSidebarOpen(false)} className="text-luxuryGray">
                    <FiX className="w-6 h-6" />
                  </button>
                </div>

                <nav className="space-y-1">
                  {adminNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileSidebarOpen(false)}
                        className={`flex items-center justify-between px-4 py-3 rounded-[16px] text-sm font-button ${
                          isActive
                            ? 'bg-goldAccent/20 text-goldAccent border border-goldAccent/40 font-semibold'
                            : 'text-luxuryGray hover:text-luxuryWhite'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className="w-5 h-5" />
                          <span>{item.name}</span>
                        </div>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="space-y-2 pt-4 border-t border-white/10 font-button">
                <Link
                  href="/"
                  target="_blank"
                  className="flex items-center space-x-2 text-xs text-luxuryGray py-2"
                >
                  <FiGlobe className="w-4 h-4 text-emeraldAccent" />
                  <span>View Public Site</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-2 text-xs text-red-400 py-2"
                >
                  <FiLogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
