import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/skills.css';

gsap.registerPlugin(ScrollTrigger);

const SKILL_COLUMNS = [
  {
    title: '01 — Working With',
    count: '6 technologies',
    skills: [
      { name: 'C', desc: 'Programming fundamentals' },
      { name: 'C++', desc: 'OOP, STL & problem solving' },
      { name: 'Python', desc: 'Scripting & programming' },
      { name: 'HTML5', desc: 'Web fundamentals' },
      { name: 'CSS3', desc: 'Styling & layouts' },
      { name: 'Git & GitHub', desc: 'Version control' },
    ],
  },
  {
    title: '02 — Currently Learning',
    count: '6 technologies',
    skills: [
      { name: 'DSA', desc: 'Data structures & algorithms' },
      { name: 'JavaScript', desc: 'Programming for the web' },
      { name: 'React', desc: 'Component-based UI' },
      { name: 'Modern Frontend', desc: 'Learning modern web development' },
      { name: 'Full-Stack', desc: 'Future development goal' },
      { name: 'AI / ML', desc: 'Building foundational knowledge' },
    ],
  },
  {
    title: '03 — Exploring',
    count: '4 technologies',
    skills: [
      { name: 'AI-Assisted Development', desc: 'Exploring AI-powered workflows' },
      { name: 'Cursor', desc: 'AI-assisted development' },
      { name: 'Antigravity', desc: 'AI-assisted development' },
      { name: 'Vercel', desc: 'Deployment & hosting' },
    ],
  },
];

const MARQUEE_ITEMS = [
  'C',
  'C++',
  'Python',
  'HTML5',
  'CSS3',
  'Git & GitHub',
  'JavaScript',
  'React',
  'DSA',
  'AI / ML',
];

export default function SkillsSection() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const sectionEl = sectionRef.current;
    const gridEl = gridRef.current;
    if (!sectionEl || !gridEl) return;

    const ctx = gsap.context(() => {
      gsap.from(gridEl, {
        scrollTrigger: {
          trigger: gridEl,
          start: 'top 85%',
          end: 'top 55%',
          scrub: 0.6,
        },
        y: 40,
        opacity: 0.25,
        ease: 'power2.out',
      });
    }, sectionEl);

    return () => ctx.revert();
  }, []);

  return (
    <section id="stack" ref={sectionRef} className="skills-section" aria-label="Skills & Capabilities">
      <div className="section-container">
        <div className="skills-header">
          <span className="skills-eyebrow">// 03 · Capabilities</span>
          <h2 className="skills-title">Skills &amp; Currently Learning</h2>
          <p className="skills-subhead">Technologies I&apos;m working with and exploring.</p>
        </div>

        {/* 3-Column Hairline Grid */}
        <div ref={gridRef} className="skills-grid">
          {SKILL_COLUMNS.map((col, cIdx) => (
            <div key={cIdx} className="skills-column">
              <div>
                <h3 className="skills-col-header">{col.title}</h3>
                <div className="skills-list">
                  {col.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="skill-row">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-desc">{skill.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="skills-col-footer">{col.count}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Infinite Seamless Marquee Band */}
      <div className="skills-marquee-wrap" aria-label="Key Technologies">
        <div className="skills-marquee-track">
          <div className="skills-marquee-content">
            {MARQUEE_ITEMS.map((item, idx) => (
              <span key={idx} className="skills-marquee-item">
                <span>{item}</span>
                <span className="skills-marquee-dash" aria-hidden="true">—</span>
              </span>
            ))}
          </div>
          <div className="skills-marquee-content" aria-hidden="true">
            {MARQUEE_ITEMS.map((item, idx) => (
              <span key={`dup-${idx}`} className="skills-marquee-item">
                <span>{item}</span>
                <span className="skills-marquee-dash">—</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
