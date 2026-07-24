'use client';

import { motion } from 'framer-motion';
import { FiAward, FiBookOpen, FiCheckCircle, FiCalendar, FiMapPin } from 'react-icons/fi';

export default function Education() {
  return (
    <section id="education" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16 space-y-3">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-button text-xs font-semibold text-emeraldAccent uppercase tracking-widest px-4 py-1.5 rounded-full glass-card border border-emeraldAccent/30"
          >
            ACADEMIC BACKGROUND
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-6xl text-luxuryWhite font-light"
          >
            Education <span className="emerald-gradient-text">Timeline</span>
          </motion.h2>
          <div className="w-16 h-1 bg-gradient-to-r from-emeraldAccent to-goldAccent rounded-full mt-2" />
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Glowing Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-goldAccent via-emeraldAccent to-transparent -translate-x-1/2" />

          {/* Education Card 1 (Main BCA Degree) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative flex flex-col md:flex-row items-center mb-12"
          >
            {/* Center Timeline Node Dot */}
            <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-darkBg border-2 border-goldAccent shadow-gold-glow flex items-center justify-center z-20">
              <div className="w-2.5 h-2.5 rounded-full bg-goldAccent animate-ping" />
            </div>

            {/* Card Content - Left Side on Desktop */}
            <div className="w-full md:w-1/2 pl-12 md:pl-0 md:pr-12 text-left md:text-right">
              <div className="glass-card p-8 rounded-[24px] border border-white/10 hover:border-goldAccent/40 transition-all duration-300 shadow-luxury-shadow">
                
                <div className="flex items-center space-x-2 md:justify-end text-goldAccent font-button text-xs font-semibold uppercase tracking-wider mb-2">
                  <FiCalendar className="w-4 h-4" />
                  <span>GRADUATED</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emeraldAccent" />
                  <span className="text-emeraldAccent">STATUS: COMPLETED</span>
                </div>

                <h3 className="font-heading text-2xl md:text-3xl text-luxuryWhite font-medium">
                  Bachelor of Computer Applications (BCA)
                </h3>

                <p className="font-body text-luxuryGray text-base mt-2 font-light">
                  Yashwantrao Chavan Maharashtra Open University (YCMOU)
                </p>

                {/* Score Showcase Badge */}
                <div className="mt-6 inline-flex items-center space-x-3 px-5 py-3 rounded-[20px] bg-[#121212] border border-goldAccent/30 shadow-inner">
                  <FiAward className="w-6 h-6 text-goldAccent" />
                  <div className="text-left">
                    <span className="block font-heading text-xl text-goldAccent font-bold leading-none">
                      7.02 CGPA
                    </span>
                    <span className="text-[10px] font-button text-luxuryMuted uppercase tracking-wider">Overall Academic Score</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap gap-2 md:justify-end text-[11px] font-button text-luxuryMuted">
                  <span className="px-3 py-1 rounded-full bg-white/5">Computer Science</span>
                  <span className="px-3 py-1 rounded-full bg-white/5">Data Structures</span>
                  <span className="px-3 py-1 rounded-full bg-white/5">Web Technologies</span>
                  <span className="px-3 py-1 rounded-full bg-white/5">Database Systems</span>
                </div>
              </div>
            </div>

            {/* Empty right side spacer for desktop layout balance */}
            <div className="hidden md:block w-1/2" />
          </motion.div>

          {/* Secondary Learning Milestone / Foundations */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex flex-col md:flex-row items-center"
          >
            {/* Center Timeline Node Dot */}
            <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-darkBg border-2 border-emeraldAccent shadow-emerald-glow flex items-center justify-center z-20">
              <div className="w-2 h-2 rounded-full bg-emeraldAccent" />
            </div>

            {/* Empty left side spacer for desktop layout balance */}
            <div className="hidden md:block w-1/2" />

            {/* Card Content - Right Side on Desktop */}
            <div className="w-full md:w-1/2 pl-12 text-left">
              <div className="glass-card p-8 rounded-[24px] border border-white/10 hover:border-emeraldAccent/40 transition-all duration-300 shadow-luxury-shadow">
                
                <div className="flex items-center space-x-2 text-emeraldAccent font-button text-xs font-semibold uppercase tracking-wider mb-2">
                  <FiBookOpen className="w-4 h-4" />
                  <span>CONTINUOUS EDUCATION</span>
                </div>

                <h3 className="font-heading text-2xl text-luxuryWhite font-medium">
                  Data Analytics & Modern Web Development
                </h3>

                <p className="font-body text-luxuryGray text-sm mt-2 font-light">
                  Self-Directed Advanced Technical Training & Practical Project Work
                </p>

                <p className="font-body text-luxuryMuted text-xs mt-3 leading-relaxed">
                  Specialized study in Python data analysis libraries, SQL query optimization, React/Next.js frontend engineering, and dashboard visualizations.
                </p>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center space-x-2 text-xs font-button text-emeraldAccent">
                  <FiCheckCircle className="w-4 h-4" />
                  <span>Active Skill Expansion</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
