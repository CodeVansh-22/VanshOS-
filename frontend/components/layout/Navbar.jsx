'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiFileText, FiArrowUpRight } from 'react-icons/fi';
import MagneticButton from '@/components/ui/MagneticButton';

import { resumeService } from '@/services/api';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Education', href: '#education' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Achievements', href: '#achievements' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = navItems.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled ? 'py-3' : 'py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="#home" className="group flex items-center space-x-2">
            <span className="font-hero text-2xl md:text-3xl font-bold tracking-tight text-luxuryWhite group-hover:text-goldAccent transition-colors">
              Vansh<span className="text-goldAccent">OS</span>
            </span>
            <span className="w-2 h-2 rounded-full bg-emeraldAccent animate-pulse" />
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-1 px-4 py-2 rounded-[24px] glass-card shadow-luxury-shadow border border-white/10">
            {navItems.map((item) => {
              const id = item.href.substring(1);
              const isActive = activeSection === id;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`relative px-4 py-2 text-xs font-button font-medium uppercase tracking-wider transition-colors duration-300 ${
                    isActive ? 'text-luxuryWhite font-semibold' : 'text-luxuryGray hover:text-luxuryWhite'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute inset-0 bg-gradient-to-r from-goldAccent/20 to-emeraldAccent/20 rounded-full border border-goldAccent/40"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Action: Resume Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <MagneticButton className="px-5 py-2.5 rounded-[24px] bg-gradient-to-r from-goldAccent to-[#DFB531] text-darkBg font-semibold text-xs uppercase tracking-wider hover:shadow-gold-glow transition-all">
              <a href="#contact" className="flex items-center space-x-2">
                <FiFileText className="w-4 h-4" />
                <span>Resume</span>
              </a>
            </MagneticButton>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-3 rounded-[24px] glass-card text-luxuryWhite focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FiX className="w-6 h-6 text-goldAccent" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-[#0B0B0B]/95 backdrop-blur-2xl flex flex-col justify-center px-8 pt-24 pb-12 lg:hidden"
          >
            <div className="space-y-6">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <a
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between font-heading text-3xl text-luxuryWhite hover:text-goldAccent transition-colors border-b border-white/5 pb-4"
                  >
                    <span>{item.name}</span>
                    <FiArrowUpRight className="w-5 h-5 text-luxuryMuted" />
                  </a>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="pt-6 flex flex-col space-y-4"
              >
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-4 rounded-[24px] bg-gradient-to-r from-goldAccent to-[#DFB531] text-darkBg font-button font-bold text-center uppercase tracking-wider text-sm flex items-center justify-center space-x-2"
                >
                  <FiFileText className="w-4 h-4" />
                  <span>Download Resume</span>
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
