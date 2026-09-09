import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import '../styles/preloader.css';

const STATUS_MESSAGES = [
  'Initializing environment',
  'Loading assets & fonts',
  'Compiling neural pipelines',
  'Almost there',
];

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState(STATUS_MESSAGES[0]);
  const overlayRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      if (onComplete) onComplete();
      return;
    }

    document.body.classList.add('is-loading');

    let current = 0;
    const interval = setInterval(() => {
      // Non-linear tick for organic feel
      const increment = Math.floor(Math.random() * 6) + 3;
      current = Math.min(current + increment, 100);
      setProgress(current);

      if (current < 30) {
        setStatusText(STATUS_MESSAGES[0]);
      } else if (current < 65) {
        setStatusText(STATUS_MESSAGES[1]);
      } else if (current < 90) {
        setStatusText(STATUS_MESSAGES[2]);
      } else {
        setStatusText(STATUS_MESSAGES[3]);
      }

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          if (overlayRef.current) {
            gsap.to(overlayRef.current, {
              yPercent: -100,
              duration: 1.1,
              ease: 'power4.inOut',
              onComplete: () => {
                document.body.classList.remove('is-loading');
                if (onComplete) onComplete();
              },
            });
          } else {
            document.body.classList.remove('is-loading');
            if (onComplete) onComplete();
          }
        }, 220);
      }
    }, 40);

    return () => {
      clearInterval(interval);
      document.body.classList.remove('is-loading');
    };
  }, [onComplete]);

  const formattedProgress = progress.toString().padStart(2, '0');

  return (
    <aside className="preloader-overlay" ref={overlayRef} aria-live="polite" aria-label="Loading portfolio">
      <div className="preloader-top">
        <span className="preloader-logo">SB</span>
        <span className="preloader-tagline">Portfolio · 2026</span>
      </div>

      <div className="preloader-middle">
        <div className="preloader-counter">
          <span>{formattedProgress}</span>
          <span className="preloader-counter-unit">%</span>
        </div>
      </div>

      <div className="preloader-bottom">
        <div className="preloader-status-row">
          <div className="preloader-status-indicator">
            <span className="preloader-pulse-dot" />
            <span>{statusText}</span>
          </div>
          <span className="font-mono">CS AI/ML</span>
        </div>

        <div className="preloader-progress-track">
          <div
            className="preloader-progress-bar"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </aside>
  );
}
