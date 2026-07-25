'use client';

import Link from 'next/link';
import { FiArrowUp } from 'react-icons/fi';
import MagneticButton from '@/components/ui/MagneticButton';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#070707] pt-16 pb-12 text-luxuryWhite">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-white/5">
          
          {/* Brand Info */}
          <div className="md:col-span-7 space-y-4">
            <Link href="#home" className="inline-block">
              <span className="font-hero text-3xl font-bold tracking-tight text-luxuryWhite">
                Vansh<span className="text-goldAccent">OS</span>
              </span>
            </Link>
            <p className="font-body text-luxuryGray text-sm max-w-md font-light leading-relaxed">
              Personal portfolio & digital suite of Vansh Sunil Chauhan. Engineered with precision, luxury aesthetics, and modern web standards.
            </p>
            <div className="pt-2 text-xs font-button text-luxuryMuted">
              BCA Graduate • YCMOU • CGPA 7.02
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-5 space-y-3 font-button">
            <h4 className="text-xs uppercase tracking-widest text-goldAccent font-semibold">Navigation</h4>
            <ul className="grid grid-cols-2 gap-2 text-sm text-luxuryGray">
              <li><a href="#home" className="hover:text-luxuryWhite transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-luxuryWhite transition-colors">About Me</a></li>
              <li><a href="#education" className="hover:text-luxuryWhite transition-colors">Academic History</a></li>
              <li><a href="#skills" className="hover:text-luxuryWhite transition-colors">Skills Matrix</a></li>
              <li><a href="#projects" className="hover:text-luxuryWhite transition-colors">Selected Projects</a></li>
              <li><a href="#contact" className="hover:text-luxuryWhite transition-colors">Contact Direct</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & Scroll To Top */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between font-button text-xs text-luxuryMuted space-y-4 md:space-y-0">
          <div>
            © {new Date().getFullYear()} VanshOS by Vansh Sunil Chauhan. All rights reserved.
          </div>

          <div className="flex items-center space-x-6">
            <span>Mumbai, Maharashtra</span>
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full glass-card border border-white/10 flex items-center justify-center text-luxuryWhite hover:text-goldAccent transition-colors"
              aria-label="Scroll to top"
            >
              <FiArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
