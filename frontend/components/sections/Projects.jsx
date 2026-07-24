'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiFolder, FiExternalLink, FiGithub, FiClock, FiGrid } from 'react-icons/fi';
import { projectsService } from '@/services/api';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      setIsLoading(true);
      const res = await projectsService.getAll();
      if (res && res.data) {
        setProjects(res.data);
      }
      setIsLoading(false);
    }
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16 space-y-3">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-button text-xs font-semibold text-emeraldAccent uppercase tracking-widest px-4 py-1.5 rounded-full glass-card border border-emeraldAccent/30"
          >
            SELECTED WORKS
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-6xl text-luxuryWhite font-light"
          >
            Featured <span className="emerald-gradient-text">Projects</span>
          </motion.h2>
          <div className="w-16 h-1 bg-gradient-to-r from-emeraldAccent to-goldAccent rounded-full mt-2" />
        </div>

        {/* Content Container */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="glass-card h-80 rounded-[24px] border border-white/5 animate-pulse p-6" />
            ))}
          </div>
        ) : projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <motion.div
                key={project.id || project.title}
                whileHover={{ y: -8 }}
                className="glass-card rounded-[24px] overflow-hidden border border-white/10 hover:border-goldAccent/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center text-goldAccent">
                    <FiFolder className="w-8 h-8" />
                    <div className="flex space-x-3">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover:text-luxuryWhite">
                          <FiGithub className="w-5 h-5" />
                        </a>
                      )}
                      {(project.liveDemo || project.demo) && (
                        <a href={project.liveDemo || project.demo} target="_blank" rel="noopener noreferrer" className="hover:text-goldAccent" title="Live Demo">
                          <FiExternalLink className="w-5 h-5 text-goldAccent" />
                        </a>
                      )}
                    </div>
                  </div>
                  <h3 className="font-heading text-2xl text-luxuryWhite">{project.title}</h3>
                  <p className="font-body text-sm text-luxuryGray font-light">{project.description}</p>
                </div>
                <div className="p-6 pt-0 flex flex-wrap gap-2">
                  {project.tags?.map((tag) => (
                    <span key={tag} className="text-[11px] font-button px-3 py-1 rounded-full bg-white/5 text-luxuryMuted">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Luxury Empty State Placeholder */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto glass-card p-12 md:p-16 rounded-[24px] text-center border border-white/10 relative overflow-hidden group shadow-luxury-shadow"
          >
            <div className="relative z-10 flex flex-col items-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emeraldAccent/20 to-goldAccent/10 border border-emeraldAccent/30 flex items-center justify-center text-emeraldAccent shadow-emerald-glow mb-2">
                <FiClock className="w-10 h-10 animate-spin-slow" />
              </div>

              <h3 className="font-heading text-3xl md:text-4xl text-luxuryWhite font-light">
                Projects Coming Soon
              </h3>

              <p className="font-body text-luxuryGray max-w-md text-sm md:text-base font-light leading-relaxed">
                Projects will appear here after publishing. Built with modern data analytics frameworks and high-craft frontend engineering.
              </p>

              {/* Ready Skeletons Preview Notice */}
              <div className="pt-6 grid grid-cols-3 gap-4 w-full max-w-md opacity-40">
                <div className="h-16 rounded-[16px] bg-white/5 border border-white/10 flex items-center justify-center">
                  <FiGrid className="w-5 h-5 text-luxuryMuted" />
                </div>
                <div className="h-16 rounded-[16px] bg-white/5 border border-white/10 flex items-center justify-center">
                  <FiGrid className="w-5 h-5 text-luxuryMuted" />
                </div>
                <div className="h-16 rounded-[16px] bg-white/5 border border-white/10 flex items-center justify-center">
                  <FiGrid className="w-5 h-5 text-luxuryMuted" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
