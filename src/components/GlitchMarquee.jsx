import React, { useEffect, useState } from 'react';
import '../styles/marquee.css';

const PHRASES = [
  'TRAINING MODELS',
  'SHIPPING SOFTWARE',
  'BUILDING INTERFACES',
  'DEBUGGING AT 2AM',
  'OPTIMIZING INFERENCE',
  'ARCHITECTING BACKENDS',
];

export default function GlitchMarquee() {
  const [glitchIdx, setGlitchIdx] = useState(-1);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      const randomIdx = Math.floor(Math.random() * (PHRASES.length * 2));
      setGlitchIdx(randomIdx);

      setTimeout(() => {
        setGlitchIdx(-1);
      }, 180);
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  const items = [...PHRASES, ...PHRASES, ...PHRASES, ...PHRASES];

  return (
    <aside className="glitch-marquee-section" aria-label="Keywords ticker">
      <div className="marquee-track">
        <div className="marquee-content">
          {items.map((phrase, idx) => (
            <span key={idx} className="marquee-item">
              <span className="marquee-prefix" aria-hidden="true">//</span>
              <span className={`marquee-glitch ${glitchIdx === idx ? 'is-glitching' : ''}`}>
                {phrase}
              </span>
            </span>
          ))}
        </div>
        <div className="marquee-content" aria-hidden="true">
          {items.map((phrase, idx) => (
            <span key={`dup-${idx}`} className="marquee-item">
              <span className="marquee-prefix">//</span>
              <span className={`marquee-glitch ${glitchIdx === idx + items.length ? 'is-glitching' : ''}`}>
                {phrase}
              </span>
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}
