'use client';

import { motion } from 'framer-motion';
import { FiUser, FiCode, FiBarChart2, FiCheckCircle } from 'react-icons/fi';

export default function About() {
  return (
    <section id="about" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 space-y-3">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-button text-xs font-semibold text-goldAccent uppercase tracking-widest px-4 py-1.5 rounded-full glass-card border border-goldAccent/30"
          >
            DISCOVER VANSH
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-6xl text-luxuryWhite font-light"
          >
            About <span className="gold-gradient-text">Me</span>
          </motion.h2>
          <div className="w-16 h-1 bg-gradient-to-r from-goldAccent to-emeraldAccent rounded-full mt-2" />
        </div>

        {/* Main Grid Card Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Image Placeholder Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 glass-card rounded-[24px] p-6 relative overflow-hidden flex flex-col justify-between border border-white/10 group hover:border-goldAccent/40 transition-all duration-500"
          >
            {/* Visual Portrait Container */}
            <div className="relative w-full h-[360px] md:h-[420px] rounded-[24px] overflow-hidden bg-gradient-to-b from-[#222] to-[#121212] flex flex-col items-center justify-center border border-white/5">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-goldAccent/10 via-transparent to-transparent" />
              
              {/* Profile Avatar Graphic with Animated Rotating Halo Ring & Floating Motion */}
              <div className="relative w-44 h-44 mb-4 flex items-center justify-center">
                {/* Rotating Gradient Ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-full bg-gradient-to-tr from-goldAccent via-emeraldAccent to-goldAccent p-[3px] blur-[3px] opacity-75"
                />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-full bg-gradient-to-tr from-goldAccent via-emeraldAccent to-goldAccent p-[2px]"
                />
                
                {/* Avatar Image Container with Floating Motion */}
                <motion.div
                  animate={{ y: [-4, 4, -4] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  whileHover={{ scale: 1.08 }}
                  className="relative w-40 h-40 rounded-full overflow-hidden bg-darkBg border-2 border-white/10 shadow-gold-glow flex items-center justify-center z-10 group/avatar cursor-pointer"
                >
                  <img
                    src="/assets/Main.jpg"
                    alt="Vansh Sunil Chauhan"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/assets/profile.jpg';
                    }}
                    className="w-full h-full object-cover object-center group-hover/avatar:scale-110 transition-transform duration-500"
                  />
                </motion.div>
              </div>

              <h3 className="font-heading text-2xl text-luxuryWhite font-medium">Vansh Sunil Chauhan</h3>
              <p className="font-button text-xs text-luxuryGray mt-1 uppercase tracking-wider">Mumbai, Maharashtra</p>

              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-[20px] bg-darkBg/80 backdrop-blur-md border border-white/10 flex justify-around text-center text-xs font-button">
                <div>
                  <span className="block text-goldAccent font-bold">YCMOU</span>
                  <span className="text-luxuryMuted text-[10px]">University</span>
                </div>
                <div className="w-[1px] bg-white/10" />
                <div>
                  <span className="block text-emeraldAccent font-bold">7.02</span>
                  <span className="text-luxuryMuted text-[10px]">CGPA Score</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text Content & Focus Areas */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 glass-card rounded-[24px] p-8 md:p-10 flex flex-col justify-between border border-white/10"
          >
            <div className="space-y-6">
              <h3 className="font-heading text-2xl md:text-3xl text-luxuryWhite font-light leading-snug">
                Building <span className="text-goldAccent italic">technology-driven solutions</span> that solve real-world problems.
              </h3>

              <p className="font-body text-luxuryGray text-base md:text-lg leading-relaxed font-light">
                I am a BCA graduate from Yashwantrao Chavan Maharashtra Open University (YCMOU) with a CGPA of 7.02. I specialize in full stack web development and enjoy building modern, scalable, and user-focused applications. Alongside development, I am currently learning Data Analytics to strengthen my analytical and problem-solving skills. My goal is to create technology that solves real-world problems while continuously expanding my expertise in software development and data-driven solutions.
              </p>

              {/* Core Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="p-5 rounded-[24px] bg-[#121212] border border-white/5 hover:border-goldAccent/30 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-goldAccent/10 text-goldAccent flex items-center justify-center mb-3">
                    <FiBarChart2 className="w-5 h-5" />
                  </div>
                  <h4 className="font-heading text-lg text-luxuryWhite font-medium">Data Analytics</h4>
                  <p className="font-body text-xs text-luxuryMuted mt-1">Transforming raw datasets into strategic insights and visualization dashboards.</p>
                </div>

                <div className="p-5 rounded-[24px] bg-[#121212] border border-white/5 hover:border-emeraldAccent/30 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-emeraldAccent/10 text-emeraldAccent flex items-center justify-center mb-3">
                    <FiCode className="w-5 h-5" />
                  </div>
                  <h4 className="font-heading text-lg text-luxuryWhite font-medium">Web Development</h4>
                  <p className="font-body text-xs text-luxuryMuted mt-1">Engineering high-performance, modern, and accessible web experiences.</p>
                </div>
              </div>
            </div>

            {/* Verification checklist badges */}
            <div className="pt-8 border-t border-white/5 flex flex-wrap items-center justify-between text-xs font-button text-luxuryMuted gap-4">
              <span className="flex items-center space-x-1.5">
                <FiCheckCircle className="text-emeraldAccent" />
                <span>Continuous Learner</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <FiCheckCircle className="text-emeraldAccent" />
                <span>Analytical Mindset</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <FiCheckCircle className="text-emeraldAccent" />
                <span>Quality Craftsman</span>
              </span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
