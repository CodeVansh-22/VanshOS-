'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CursorGlow() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer ambient glow */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 hidden md:block"
        animate={{
          x: mousePosition.x - 200,
          y: mousePosition.y - 200,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 200, mass: 0.5 }}
        style={{
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(201, 162, 39, 0.07) 0%, rgba(46, 139, 87, 0.03) 45%, transparent 70%)',
          borderRadius: '50%',
        }}
      />
      {/* Small cursor ring */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-40 hidden md:block"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        style={{
          width: '16px',
          height: '16px',
          border: '1px solid rgba(201, 162, 39, 0.4)',
          borderRadius: '50%',
          backgroundColor: 'rgba(201, 162, 39, 0.1)',
        }}
      />
    </>
  );
}
