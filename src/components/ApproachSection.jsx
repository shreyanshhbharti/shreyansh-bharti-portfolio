import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/approach.css';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    num: '01',
    category: '[ANALYSIS & CONSTRAINTS]',
    title: 'Learn the problem',
    desc: 'Deconstruct operational bottlenecks and data distributions. I define mathematical constraints, target latency thresholds, and system contracts before writing a single line of code.',
  },
  {
    num: '02',
    category: '[SYSTEMS & ML PIPELINES]',
    title: 'Build the core',
    desc: 'Architect lean backends, parallelize computation routines, train or fine-tune neural architectures, and establish rock-solid type safety with zero runtime surprises.',
  },
  {
    num: '03',
    category: '[INTERACTION & VIEWPORT]',
    title: 'Ship the interface',
    desc: 'Engineer fast, reactive user interfaces with sub-16ms render loops, precise kinetic typography, and ergonomic layouts that transform complex technical output into intuitive tools.',
  },
  {
    num: '04',
    category: '[PROFILING & POLISH]',
    title: 'Iterate in the open',
    desc: 'Benchmark under stress, profile GPU memory and CPU bottlenecks, measure latency p99 distributions, and continually refine through live metrics and developer feedback.',
  },
];

export default function ApproachSection() {
  const sectionRef = useRef(null);
  const rowsRef = useRef([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const rows = rowsRef.current.filter(Boolean);
    if (rows.length === 0) return;

    const ctx = gsap.context(() => {
      rows.forEach((row) => {
        gsap.fromTo(
          row,
          { opacity: 0.2, y: 30 },
          {
            opacity: 1,
            y: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 85%',
              end: 'top 45%',
              scrub: 0.5,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="approach" ref={sectionRef} className="approach-section section-container" aria-label="Engineering Approach">
      <div className="approach-header">
        <div>
          <span className="text-mono-label" style={{ display: 'block', marginBottom: '0.5rem' }}>
            // 02 &middot; Methodology
          </span>
          <h2 className="approach-title">Engineering Approach</h2>
        </div>
        <span className="approach-label">Process &middot; 4 Steps</span>
      </div>

      <div className="approach-steps-list">
        {STEPS.map((step, idx) => (
          <div
            key={step.num}
            ref={(el) => (rowsRef.current[idx] = el)}
            className="approach-step-row"
          >
            <span className="approach-step-num">{step.num}</span>
            <div>
              <span className="text-mono-label" style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.6875rem' }}>
                {step.category}
              </span>
              <h3 className="approach-step-title">{step.title}</h3>
            </div>
            <p className="approach-step-desc">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
