'use client';

import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiInstagram, FiArrowUpRight } from 'react-icons/fi';

const socials = [
  {
    name: 'GitHub',
    handle: '@CodeVansh-22',
    url: 'https://github.com/CodeVansh-22',
    icon: FiGithub,
    color: 'hover:text-goldAccent hover:border-goldAccent/40',
    badge: 'Open Source & Repos',
  },
  {
    name: 'LinkedIn',
    handle: 'vansh-chauhan-295672238',
    url: 'https://www.linkedin.com/in/vansh-chauhan-295672238',
    icon: FiLinkedin,
    color: 'hover:text-emeraldAccent hover:border-emeraldAccent/40',
    badge: 'Professional Network',
  },
  {
    name: 'Instagram',
    handle: '@vansh_.022._',
    url: 'https://www.instagram.com/vansh_.022._/',
    icon: FiInstagram,
    color: 'hover:text-goldAccent hover:border-goldAccent/40',
    badge: 'Digital Presence',
  },
];

export default function SocialLinks() {
  return (
    <section className="py-16 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-10">
          <span className="font-button text-xs font-semibold text-luxuryMuted uppercase tracking-widest">
            CONNECT ON SOCIAL PLATFORMS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {socials.map((social, index) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className={`glass-card p-6 rounded-[24px] border border-white/10 flex items-center justify-between group transition-all duration-300 ${social.color}`}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-[18px] bg-[#121212] border border-white/5 flex items-center justify-center text-luxuryWhite group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block font-heading text-xl text-luxuryWhite font-medium">
                      {social.name}
                    </span>
                    <span className="block font-button text-xs text-luxuryMuted mt-0.5">
                      {social.handle}
                    </span>
                  </div>
                </div>

                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-luxuryMuted group-hover:text-luxuryWhite group-hover:bg-white/10 transition-all">
                  <FiArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
