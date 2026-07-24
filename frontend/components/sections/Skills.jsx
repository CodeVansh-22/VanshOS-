'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiCpu, FiPlusCircle, FiFolderPlus, FiLayers } from 'react-icons/fi';
import { skillsService } from '@/services/api';

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSkills() {
      setIsLoading(true);
      const res = await skillsService.getAll();
      if (res && res.data) {
        setSkills(res.data);
      }
      setIsLoading(false);
    }
    fetchSkills();
  }, []);

  return (
    <section id="skills" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16 space-y-3">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-button text-xs font-semibold text-goldAccent uppercase tracking-widest px-4 py-1.5 rounded-full glass-card border border-goldAccent/30"
          >
            TECHNICAL MATRIX
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-6xl text-luxuryWhite font-light"
          >
            Skills & <span className="gold-gradient-text">Competencies</span>
          </motion.h2>
          <div className="w-16 h-1 bg-gradient-to-r from-goldAccent to-emeraldAccent rounded-full mt-2" />
        </div>

        {/* Content Container */}
        {isLoading ? (
          <div className="glass-card p-12 rounded-[24px] text-center border border-white/5 animate-pulse">
            <div className="w-12 h-12 rounded-full bg-white/5 mx-auto mb-4" />
            <div className="h-4 w-48 bg-white/5 mx-auto rounded" />
          </div>
        ) : skills.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {skills.map((skill) => (
              <div
                key={skill.id || skill.name}
                className="glass-card p-6 rounded-[24px] border border-white/10 text-center hover:border-goldAccent/40 transition-all group"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-goldAccent/10 text-goldAccent flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FiCpu className="w-6 h-6" />
                </div>
                <h4 className="font-heading text-lg text-luxuryWhite">{skill.name}</h4>
                <span className="font-button text-[10px] text-luxuryMuted uppercase">{skill.category}</span>
              </div>
            ))}
          </div>
        ) : (
          /* High-end Empty State Placeholder */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto glass-card p-12 md:p-16 rounded-[24px] text-center border border-white/10 relative overflow-hidden group shadow-luxury-shadow"
          >
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-radial-gradient from-goldAccent/5 via-transparent to-transparent pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-goldAccent/20 to-emeraldAccent/10 border border-goldAccent/30 flex items-center justify-center text-goldAccent shadow-gold-glow mb-2">
                <FiLayers className="w-10 h-10 animate-bounce" />
              </div>

              <h3 className="font-heading text-3xl text-luxuryWhite font-light">
                No skills have been published yet.
              </h3>

              <p className="font-body text-luxuryGray max-w-md text-sm md:text-base font-light leading-relaxed">
                The skills matrix is dynamically powered by the VanshOS API layer. Published skills and technical competencies will appear here once added in the admin dashboard.
              </p>

              <div className="pt-4 inline-flex items-center space-x-2 text-xs font-button text-goldAccent px-4 py-2 rounded-full bg-goldAccent/10 border border-goldAccent/20">
                <FiPlusCircle className="w-4 h-4" />
                <span>Ready for API Data Sync</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
