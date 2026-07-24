'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiBriefcase, FiCalendar, FiMapPin, FiCheckCircle } from 'react-icons/fi';
import { experienceService } from '@/services/api';

export default function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchExperiences() {
      setIsLoading(true);
      const res = await experienceService.getAll();
      const list = Array.isArray(res?.data) ? res.data : [];
      setExperiences(list);
      setIsLoading(false);
    }
    fetchExperiences();
  }, []);

  return (
    <section id="experience" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16 space-y-3">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-button text-xs font-semibold text-goldAccent uppercase tracking-widest px-4 py-1.5 rounded-full glass-card border border-goldAccent/30"
          >
            WORK HISTORY
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-6xl text-luxuryWhite font-light"
          >
            Professional <span className="gold-gradient-text">Experience</span>
          </motion.h2>
          <div className="w-16 h-1 bg-gradient-to-r from-goldAccent to-emeraldAccent rounded-full mt-2" />
        </div>

        {/* Experience Timeline */}
        {isLoading ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {[1, 2].map((n) => (
              <div key={n} className="glass-card h-48 rounded-[24px] border border-white/5 animate-pulse p-6" />
            ))}
          </div>
        ) : experiences.length > 0 ? (
          <div className="max-w-4xl mx-auto space-y-8 relative before:absolute before:inset-0 before:left-6 md:before:left-1/2 before:w-0.5 before:-translate-x-1/2 before:bg-gradient-to-b before:from-goldAccent before:via-emeraldAccent before:to-transparent">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;
              const descriptions = Array.isArray(exp.description)
                ? exp.description
                : typeof exp.description === 'string'
                ? exp.description.split('\n').filter(Boolean)
                : [];

              return (
                <motion.div
                  key={exp.id || exp._id || exp.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="relative flex flex-col md:flex-row items-center group"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-darkBg border-2 border-goldAccent text-goldAccent flex items-center justify-center z-10 shadow-gold-glow group-hover:scale-110 transition-transform">
                    <FiBriefcase className="w-4 h-4" />
                  </div>

                  {/* Experience Card */}
                  <div
                    className={`w-full md:w-1/2 pl-16 md:pl-0 ${
                      isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:ml-auto'
                    }`}
                  >
                    <div className="glass-card p-6 md:p-8 rounded-[24px] border border-white/10 hover:border-goldAccent/40 transition-all space-y-4 shadow-luxury-shadow">
                      <div className={`space-y-1 ${isEven ? 'md:items-end' : ''}`}>
                        <span className="inline-block px-3 py-1 rounded-full bg-goldAccent/10 text-goldAccent font-button text-xs font-semibold">
                          {exp.employmentType || 'Internship'}
                        </span>
                        <h3 className="font-heading text-2xl text-luxuryWhite pt-1">{exp.title}</h3>
                        <p className="font-button text-sm text-goldAccent font-medium">{exp.company}</p>
                      </div>

                      <div className={`flex flex-wrap items-center gap-4 text-xs font-button text-luxuryMuted pt-1 ${isEven ? 'md:justify-end' : ''}`}>
                        <span className="flex items-center space-x-1">
                          <FiCalendar className="w-3.5 h-3.5 text-goldAccent" />
                          <span>{exp.startDate} – {exp.endDate || 'Present'}</span>
                        </span>
                        {exp.location && (
                          <span className="flex items-center space-x-1">
                            <FiMapPin className="w-3.5 h-3.5 text-emeraldAccent" />
                            <span>{exp.location}</span>
                          </span>
                        )}
                      </div>

                      {descriptions.length > 0 && (
                        <ul className={`space-y-2 pt-2 border-t border-white/5 font-body text-xs text-luxuryGray font-light ${isEven ? 'md:text-left' : ''}`}>
                          {descriptions.map((item, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <FiCheckCircle className="w-3.5 h-3.5 text-emeraldAccent shrink-0 mt-0.5" />
                              <span>{item.replace(/^•\s*/, '')}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 glass-card max-w-xl mx-auto rounded-[24px] border border-white/10 p-8">
            <span className="font-button text-xs text-luxuryMuted">No work experience records published yet.</span>
          </div>
        )}
      </div>
    </section>
  );
}
