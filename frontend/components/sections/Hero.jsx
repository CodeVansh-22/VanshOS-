'use client';

import { motion } from 'framer-motion';
import { FiArrowDownRight, FiFileText, FiGithub, FiLinkedin, FiInstagram } from 'react-icons/fi';
import MagneticButton from '@/components/ui/MagneticButton';
import { resumeService } from '@/services/api';

export default function Hero() {
  const handleDownloadResume = (e) => {
    e.preventDefault();
    resumeService.download();
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Background Animated Grid & Particles Effect */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
        />

        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.25, 0.4, 0.25],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-goldAccent/15 blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.35, 0.2],
            x: [0, -60, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-[550px] h-[550px] rounded-full bg-emeraldAccent/15 blur-[140px]"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="flex flex-col items-center text-center space-y-8">
          
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-3 px-4 py-2 rounded-full glass-card border border-goldAccent/30"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emeraldAccent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emeraldAccent"></span>
            </span>
            <span className="font-button text-xs tracking-widest text-luxuryWhite uppercase font-medium">
              Available for New Opportunities
            </span>
          </motion.div>

          {/* Main Large Name */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4 max-w-4xl"
          >
            <h1 className="font-hero text-6xl sm:text-7xl md:text-9xl tracking-tight leading-[0.95] font-light">
              <span className="text-luxuryWhite block">Vansh Sunil</span>
              <span className="gold-gradient-text block font-normal">Chauhan</span>
            </h1>
          </motion.div>

          {/* Subtitle / Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="max-w-2xl space-y-3"
          >
            <p className="font-button text-sm md:text-lg text-goldAccent uppercase tracking-wider font-semibold">
              Aspiring Data Analyst | Web Developer | BCA Graduate
            </p>
            <p className="font-body text-luxuryGray text-base md:text-xl font-light leading-relaxed">
              Synthesizing complex data insights with high-craft digital products. Dedicated to engineering sleek, high-performance web applications and analytics solutions.
            </p>
          </motion.div>

          {/* Professional Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full max-w-md"
          >
            <MagneticButton className="w-full sm:w-auto px-8 py-4 rounded-[24px] bg-gradient-to-r from-goldAccent to-[#DFB531] text-darkBg font-bold text-sm uppercase tracking-wider shadow-gold-glow hover:scale-105 transition-all">
              <a href="#projects" className="flex items-center justify-center space-x-2">
                <span>View Projects</span>
                <FiArrowDownRight className="w-4 h-4" />
              </a>
            </MagneticButton>

            <MagneticButton
              onClick={handleDownloadResume}
              className="w-full sm:w-auto px-8 py-4 rounded-[24px] glass-card border border-white/15 text-luxuryWhite font-bold text-sm uppercase tracking-wider hover:border-goldAccent/50 hover:bg-white/5 transition-all"
            >
              <div className="flex items-center justify-center space-x-2">
                <FiFileText className="w-4 h-4 text-goldAccent" />
                <span>Download Resume</span>
              </div>
            </MagneticButton>
          </motion.div>

          {/* Floating Key Metrics / Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-12 max-w-3xl w-full"
          >
            <div className="glass-card p-4 rounded-[24px] flex flex-col items-center justify-center border border-white/5 hover:border-goldAccent/30 transition-colors">
              <span className="font-heading text-2xl md:text-3xl text-goldAccent font-bold">7.02 CGPA</span>
              <span className="font-button text-[11px] text-luxuryMuted uppercase tracking-wider mt-1">YCMOU BCA Graduate</span>
            </div>
            <div className="glass-card p-4 rounded-[24px] flex flex-col items-center justify-center border border-white/5 hover:border-emeraldAccent/30 transition-colors">
              <span className="font-heading text-2xl md:text-3xl text-emeraldAccent font-bold">Data & Web</span>
              <span className="font-button text-[11px] text-luxuryMuted uppercase tracking-wider mt-1">Primary Expertise</span>
            </div>
            <div className="col-span-2 md:col-span-1 glass-card p-4 rounded-[24px] flex flex-col items-center justify-center border border-white/5 hover:border-goldAccent/30 transition-colors">
              <span className="font-heading text-2xl md:text-3xl text-luxuryWhite font-bold">Mumbai, IN</span>
              <span className="font-button text-[11px] text-luxuryMuted uppercase tracking-wider mt-1">Base Location</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
