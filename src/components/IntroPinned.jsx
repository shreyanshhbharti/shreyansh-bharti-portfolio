import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/intro.css';

gsap.registerPlugin(ScrollTrigger);

const STATEMENT_TEXT =
  "I'm a Computer Science student who spends most of his time at the point where machine learning meets shipped software — training models, wiring up backends, and building the front ends that make all of it usable by someone other than me.";

export default function IntroPinned() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const wordsRef = useRef([]);

  const words = STATEMENT_TEXT.split(' ');

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const sectionEl = sectionRef.current;
    const containerEl = containerRef.current;
    if (!sectionEl || !containerEl) return;

    if (prefersReducedMotion) {
      wordsRef.current.forEach((wordEl) => {
        if (wordEl) wordEl.style.opacity = '1';
      });
      return;
    }

    const ctx = gsap.context(() => {
      const wordElements = wordsRef.current.filter(Boolean);

      gsap.to(wordElements, {
        scrollTrigger: {
          trigger: sectionEl,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.75,
          anticipatePin: 1,
        },
        opacity: 1,
        stagger: 0.04,
        ease: 'none',
      });
    }, sectionEl);

    return () => ctx.revert();
  }, []);

  return (
    <section id="statement" ref={sectionRef} className="intro-pinned-section" aria-label="Statement">
      <div ref={containerRef} className="intro-pinned-inner">
        <div className="intro-badge-col">
          <span className="intro-badge">// STATEMENT</span>
          <p className="intro-badge-desc">CORE PHILOSOPHY & PERSPECTIVE</p>
        </div>

        <div className="intro-text-wrapper">
          <p className="intro-kinetic-paragraph">
            {words.map((word, idx) => (
              <span
                key={idx}
                ref={(el) => (wordsRef.current[idx] = el)}
                className="intro-word"
              >
                {word}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
