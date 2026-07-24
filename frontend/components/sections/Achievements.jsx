'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiStar, FiShield, FiEye } from 'react-icons/fi';
import { achievementsService } from '@/services/api';
import { getFileUrl } from '@/lib/utils';

export default function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAchievements() {
      setIsLoading(true);
      const res = await achievementsService.getAll();
      if (res && Array.isArray(res.data)) {
        setAchievements(res.data);
      }
      setIsLoading(false);
    }
    fetchAchievements();
  }, []);

  return (
    <section id="achievements" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6 space-y-12">

        {/* Section Title */}
        <div className="text-center space-y-3">
          <span className="text-xs font-button uppercase tracking-widest text-goldAccent">
            Honors & Credentials
          </span>
          <h2 className="font-heading text-4xl md:text-5xl text-luxuryWhite font-light">
            Verified <span className="gold-gradient-text font-semibold">Achievements</span>
          </h2>
          <p className="font-body text-xs md:text-sm text-luxuryMuted max-w-xl mx-auto">
            Industry certifications, academic excellence, and competitive coding milestones.
          </p>
        </div>

        {/* Grid or Empty state */}
        {isLoading ? (
          <div className="glass-card p-12 rounded-[24px] border border-white/5 animate-pulse text-center" />
        ) : achievements.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((item, idx) => (
              <div key={item.id || item._id || idx} className="glass-card p-6 rounded-[24px] border border-white/10 hover:border-goldAccent/40 transition-all flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-[16px] bg-goldAccent/10 text-goldAccent flex items-center justify-center">
                    <FiAward className="w-6 h-6 text-goldAccent" />
                  </div>
                  <h3 className="font-heading text-xl text-luxuryWhite">{item.title}</h3>
                  <p className="font-body text-xs text-luxuryGray">{item.issuer}</p>
                </div>
                <div className="pt-4 border-t border-white/5 flex items-center justify-between font-button text-xs">
                  <span className="text-luxuryMuted">{item.date || '2026'}</span>
                  <button
                    onClick={() => {
                      const target = item.certificateUrl || item.fileName;
                      if (target) {
                        window.open(getFileUrl(target), '_blank');
                      } else {
                        const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
                        window.open(`${apiBase}/resume/view`, '_blank');
                      }
                    }}
                    className="px-3 py-1.5 rounded-[10px] bg-goldAccent/10 text-goldAccent hover:bg-goldAccent/20 font-semibold transition-colors flex items-center space-x-1.5"
                  >
                    <FiEye className="w-3.5 h-3.5" />
                    <span>PDF View</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Luxury Empty State Card */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto glass-card p-12 md:p-16 rounded-[24px] text-center border border-white/10 relative overflow-hidden group shadow-luxury-shadow"
          >
            <div className="relative z-10 flex flex-col items-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-goldAccent/20 to-emeraldAccent/10 border border-goldAccent/30 flex items-center justify-center text-goldAccent shadow-gold-glow mb-2">
                <FiAward className="w-10 h-10" />
              </div>

              <h3 className="font-heading text-3xl text-luxuryWhite font-light">
                Achievements Initializing
              </h3>

              <p className="font-body text-luxuryGray max-w-md text-sm md:text-base font-light leading-relaxed">
                Certificates, competition honors, and academic recognitions are ready to be populated dynamically via the administrative control panel.
              </p>

              <div className="pt-2 flex items-center space-x-2 text-xs font-button text-luxuryMuted">
                <FiShield className="text-goldAccent" />
                <span>Verified Credentials Ready for Sync</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
