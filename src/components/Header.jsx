import React, { useState } from 'react';
import { scrollToTarget, scrollToTop } from '../hooks/useLenis';
import '../styles/header.css';

const NAV_ITEMS = [
  { num: '01', label: 'Work', target: '#work' },
  { num: '02', label: 'Approach', target: '#approach' },
  { num: '03', label: 'Skills', target: '#stack' },
  { num: '04', label: 'Contact', target: '#contact' },
];

export default function Header() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleNavClick = (e, target) => {
    e.preventDefault();
    setIsMobileOpen(false);
    scrollToTarget(target);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    setIsMobileOpen(false);
    scrollToTop();
  };

  return (
    <>
      <header className="site-header" role="banner">
        <div className="site-header-inner">
          <a
            href="#hero"
            className="header-logo"
            onClick={handleLogoClick}
            aria-label="Shreyansh Bharti Home"
          >
            <span>SB</span>
          </a>

          <nav className="header-nav" aria-label="Main Navigation">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.num}
                href={item.target}
                className="header-nav-link"
                onClick={(e) => handleNavClick(e, item.target)}
              >
                <span className="header-nav-num">{item.num} /</span>
                <span>{item.label}</span>
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="header-mobile-toggle"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-expanded={isMobileOpen}
            aria-label="Toggle navigation menu"
          >
            {isMobileOpen ? '[CLOSE]' : '[MENU]'}
          </button>
        </div>
      </header>

      {/* Responsive mobile drawer */}
      <div className={`mobile-nav-overlay ${isMobileOpen ? 'is-open' : ''}`} aria-hidden={!isMobileOpen}>
        <ul className="mobile-nav-list">
          {NAV_ITEMS.map((item) => (
            <li key={item.num}>
              <a
                href={item.target}
                className="mobile-nav-link"
                onClick={(e) => handleNavClick(e, item.target)}
              >
                <span className="mobile-nav-num">{item.num}</span>
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
