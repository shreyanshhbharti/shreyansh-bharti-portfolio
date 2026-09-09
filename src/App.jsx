import React, { useState } from 'react';
import Preloader from './components/Preloader';
import Header from './components/Header';
import Hero from './components/Hero';
import GlitchMarquee from './components/GlitchMarquee';
import IntroPinned from './components/IntroPinned';
import ProjectsSection from './components/ProjectsSection';
import ApproachSection from './components/ApproachSection';
import SkillsSection from './components/SkillsSection';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import NoiseOverlay from './components/NoiseOverlay';
import useLenis from './hooks/useLenis';

export default function App() {
  const [isPreloaded, setIsPreloaded] = useState(false);

  // Initialize Lenis smooth scroll synced with GSAP ScrollTrigger
  useLenis();

  return (
    <div className="portfolio-app-root">
      {/* 1. Organic SVG Grain Overlay */}
      <NoiseOverlay />

      {/* 2. Custom Trailing Difference-Blend Cursor */}
      <CustomCursor />

      {/* 3. Preloader with Counting Percentage and Technical Status */}
      <Preloader onComplete={() => setIsPreloaded(true)} />

      {/* 4. Fixed Minimalist Numbered Navigation */}
      <Header />

      {/* 5. Main Content Flow */}
      <main id="main">
        <Hero isPreloaded={isPreloaded} />
        <GlitchMarquee />
        <IntroPinned />
        <ProjectsSection />
        <ApproachSection />
        <SkillsSection />
      </main>

      {/* 6. Editorial Contact Footer */}
      <Footer />
    </div>
  );
}
