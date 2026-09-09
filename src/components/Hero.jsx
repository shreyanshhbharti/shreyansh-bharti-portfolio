import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../styles/hero.css';

export default function Hero({ isPreloaded }) {
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const subheadRef = useRef(null);
  const statusRef = useRef(null);
  const bottomBarRef = useRef(null);

  useEffect(() => {
    if (!isPreloaded) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      if (line1Ref.current) line1Ref.current.style.transform = 'translateY(0%)';
      if (line2Ref.current) line2Ref.current.style.transform = 'translateY(0%)';
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.to(statusRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 0.1,
    })
      .to(
        [line1Ref.current, line2Ref.current],
        {
          y: '0%',
          duration: 1.3,
          stagger: 0.14,
          ease: 'power4.out',
        },
        '-=0.5'
      )
      .fromTo(
        subheadRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1 },
        '-=0.8'
      )
      .fromTo(
        bottomBarRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.6'
      );
  }, [isPreloaded]);

  return (
    <section id="hero" className="hero-section section-container" aria-label="Introduction">
      <div className="hero-content">
        <div
          ref={statusRef}
          className="hero-status-line"
          style={{ opacity: isPreloaded ? 0 : 1, transform: 'translateY(10px)' }}
        >
          <span className="hero-status-dot" aria-hidden="true" />
          <span>BTech CS (AI/ML) · Open to work</span>
        </div>

        <h1 className="hero-title-group" aria-label="Shreyansh Bharti">
          <span className="hero-title-line">
            <span ref={line1Ref} className="hero-title-text">
              SHREYANSH
            </span>
          </span>
          <span className="hero-title-line">
            <span ref={line2Ref} className="hero-title-text">
              BHARTI
            </span>
          </span>
        </h1>

        <div ref={subheadRef} className="hero-subhead-wrapper" style={{ opacity: isPreloaded ? 0 : 1 }}>
          <p className="hero-subhead">
            I build software, AI systems and web products — from model pipelines to the interfaces people actually use them through.
          </p>
        </div>
      </div>

      <div ref={bottomBarRef} className="hero-bottom-bar" style={{ opacity: isPreloaded ? 0 : 1 }}>
        <div className="hero-location-text">
          <span className="hero-availability">Available for engineering roles & collaborations</span>
          <span>Based in India · UTC+5:30</span>
        </div>

        <div className="hero-scroll-indicator" aria-hidden="true">
          <span>Scroll</span>
          <div className="hero-scroll-track">
            <div className="hero-scroll-thumb" />
          </div>
        </div>
      </div>
    </section>
  );
}
