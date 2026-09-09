import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollToTop } from '../hooks/useLenis';
import '../styles/projects.css';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    num: '01',
    total: '03',
    role: 'Solo',
    title: 'CodeSage',
    description:
      "An AI programming mentor that gives progressive hints instead of full solutions — it tracks a personal 'Developer DNA' profile across algorithms, debugging and recursion, and includes an interview-practice mode.",
    tags: ['JavaScript', 'Python', 'FastAPI', 'Gemini AI'],
    link: 'https://code-sage-one-khaki.vercel.app/',
    actionLabel: 'View project',
    isExternal: true,
    spec: {
      module: 'AI MENTORSHIP ENGINE',
      lines: [
        '>> EVAL_PIPELINE: Gemini AI Multi-tier Progressive Hinting',
        '>> DEVELOPER_DNA: Skill tracking [Algorithms, Debug, Recursion]',
        '>> RUNTIME: FastAPI asynchronous inference server',
      ],
      tag1: 'Gemini AI',
      tag1Label: 'Core Model',
      tag2: 'FastAPI',
      tag2Label: 'Backend API',
    },
  },
  {
    num: '02',
    total: '03',
    role: 'Team',
    title: 'STILLS',
    description:
      'A photos-only social app built with a team, deliberately stripped of like counts, algorithmic feeds and short-form video — just a chronological feed for intentional sharing. Currently in private beta.',
    tags: ['Social App', 'Team Project'],
    link: 'https://stillssocial.in/about',
    actionLabel: 'View project',
    isExternal: true,
    spec: {
      module: 'MEDIA STREAM PLATFORM',
      lines: [
        '>> FEED_ARCHITECTURE: Zero-algorithm pure chronological stream',
        '>> MEDIA_PIPELINE: High-fidelity image compression & storage',
        '>> STATUS: Private Beta / Intentional Sharing App',
      ],
      tag1: 'Team Built',
      tag1Label: 'Collaboration',
      tag2: 'Private Beta',
      tag2Label: 'Release Stage',
    },
  },
  {
    num: '03',
    total: '03',
    role: 'Solo',
    title: 'This Portfolio',
    description:
      "The site you're on right now — a scroll-driven, typography-led portfolio built to move away from templated developer-portfolio defaults, with GSAP and Lenis doing the heavy lifting.",
    tags: ['GSAP', 'Lenis', 'Scroll Animation'],
    link: '#hero',
    actionLabel: "You're on it",
    isExternal: false,
    spec: {
      module: 'KINETIC WEB EXPERIENCE',
      lines: [
        '>> MOTION_ENGINE: GSAP 3.15 + ScrollTrigger pinned scrubbing',
        '>> SCROLL_PHYSICS: Lenis smooth inertial ticker integration',
        '>> SHADERS & TEXTURE: Hardware-accelerated SVG noise filter',
      ],
      tag1: 'GSAP + Lenis',
      tag1Label: 'Motion Stack',
      tag2: 'React 19',
      tag2Label: 'Interface Core',
    },
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const cards = cardRefs.current.filter(Boolean);
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      cards.forEach((card, index) => {
        if (index === cards.length - 1) return;

        gsap.to(card, {
          scrollTrigger: {
            trigger: cards[index + 1],
            start: 'top 85%',
            end: 'top 20%',
            scrub: true,
          },
          scale: 0.94,
          opacity: 0.35,
          ease: 'none',
        });
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  const handleActionClick = (e, proj) => {
    if (!proj.isExternal) {
      e.preventDefault();
      scrollToTop();
    }
  };

  return (
    <section id="work" ref={sectionRef} className="projects-section" aria-label="Selected Work">
      <div className="section-container">
        <div className="projects-header">
          <div className="projects-header-left">
            <span className="projects-tag">// 01 · PORTFOLIO</span>
            <h2 className="projects-title">Selected Work</h2>
          </div>
          <div className="projects-count-badge">
            <span>03 PROJECTS</span>
          </div>
        </div>

        <div className="projects-cards-stack">
          {PROJECTS.map((proj, idx) => (
            <article
              key={proj.num}
              ref={(el) => (cardRefs.current[idx] = el)}
              className="project-card-wrapper"
            >
              <div className="project-card-grid">
                {/* Left Column: Metadata, Description & Actions */}
                <div className="project-card-content">
                  <div className="project-card-top">
                    <span className="project-index">
                      {proj.num} / {proj.total} — {proj.role}
                    </span>
                    <span className="project-category">{proj.role} Project</span>
                  </div>

                  <div className="project-card-middle">
                    <h3 className="project-name">{proj.title}</h3>
                    <p className="project-description">{proj.description}</p>
                  </div>

                  <div className="project-card-bottom">
                    <div className="project-tech-list">
                      {proj.tags.map((t, tIdx) => (
                        <span key={tIdx} className="tech-chip">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="project-actions">
                      <a
                        href={proj.link}
                        target={proj.isExternal ? '_blank' : undefined}
                        rel={proj.isExternal ? 'noopener noreferrer' : undefined}
                        onClick={(e) => handleActionClick(e, proj)}
                        className="project-link-btn"
                        data-cursor="pointer"
                      >
                        <span>{proj.actionLabel}</span>
                        {proj.isExternal && (
                          <span className="project-link-arrow" aria-hidden="true">↗</span>
                        )}
                        {!proj.isExternal && (
                          <span className="project-link-arrow" aria-hidden="true">↑</span>
                        )}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Right Column: Visual Schematic / Spec Panel */}
                <div className="project-card-visual" aria-hidden="true">
                  <div className="project-visual-glow" />
                  <span className="project-ghost-num">{proj.num}</span>

                  <div className="project-schematic">
                    <div className="schematic-header">
                      <span>{proj.spec.module} · {proj.num}</span>
                      <div className="schematic-dots">
                        <span className="schematic-dot active" />
                        <span className="schematic-dot active" />
                        <span className="schematic-dot" />
                      </div>
                    </div>

                    <div className="schematic-body">
                      {proj.spec.lines.map((line, lIdx) => (
                        <div key={lIdx}>{line}</div>
                      ))}
                    </div>

                    <div className="schematic-metrics">
                      <div className="metric-box">
                        <div className="metric-val">{proj.spec.tag1}</div>
                        <div className="metric-lbl">{proj.spec.tag1Label}</div>
                      </div>
                      <div className="metric-box">
                        <div className="metric-val">{proj.spec.tag2}</div>
                        <div className="metric-lbl">{proj.spec.tag2Label}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
