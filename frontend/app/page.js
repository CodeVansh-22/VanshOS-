'use client';

import { useState, useEffect } from 'react';
import LoadingScreen from '@/components/ui/LoadingScreen';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Education from '@/components/sections/Education';
import Experience from '@/components/sections/Experience';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Achievements from '@/components/sections/Achievements';
import Contact from '@/components/sections/Contact';
import SocialLinks from '@/components/sections/SocialLinks';
import Footer from '@/components/layout/Footer';
import { analyticsService } from '@/services/api';

export default function Home() {
  const [loadingFinished, setLoadingFinished] = useState(false);

  useEffect(() => {
    // Automatically log visitor telemetry to backend analytics API on load
    if (typeof window !== 'undefined') {
      const visitorId = localStorage.getItem('vanshos_vid') || `v_${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem('vanshos_vid', visitorId);

      const userAgent = navigator.userAgent;
      let browser = 'Unknown';
      if (userAgent.indexOf('Chrome') > -1) browser = 'Chrome';
      else if (userAgent.indexOf('Safari') > -1) browser = 'Safari';
      else if (userAgent.indexOf('Firefox') > -1) browser = 'Firefox';

      let device = 'Desktop';
      if (/Mobi|Android|iPhone/i.test(userAgent)) device = 'Mobile';

      analyticsService.logVisitor({
        visitorId,
        browser,
        device,
        operatingSystem: navigator.platform || 'Windows',
        page: window.location.pathname,
        country: 'India (Mumbai)',
      });
    }
  }, []);

  return (
    <>
      <LoadingScreen onComplete={() => setLoadingFinished(true)} />
      
      <main className={`min-h-screen bg-[#0B0B0B] text-luxuryWhite transition-opacity duration-1000 ${loadingFinished ? 'opacity-100' : 'opacity-90'}`}>
        <Navbar />
        <Hero />
        <About />
        <Education />
        <Experience />
        <Skills />
        <Projects />
        <Achievements />
        <Contact />
        <SocialLinks />
        <Footer />
      </main>
    </>
  );
}
