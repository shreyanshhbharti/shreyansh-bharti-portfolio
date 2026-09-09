import React, { useState, useEffect } from 'react';
import { scrollToTop } from '../hooks/useLenis';
import '../styles/footer.css';

const EMAIL = 'shreyanshbharti252@gmail.com';

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/shreyanshhbharti' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/shreyansh-bharti-2a34a8425/' },
];

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      };
      setCurrentTime(new Intl.DateTimeFormat('en-GB', options).format(now));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer id="contact" className="contact-footer-section section-container" role="contentinfo" aria-label="Contact and Social Links">
      <div className="contact-meta-header">
        <span>// Get In Touch</span>
        <span>04 / CONTACT</span>
      </div>

      <div className="contact-main-group">
        <h2 className="contact-headline">
          Let&apos;s build<br />something.
        </h2>

        <div className="contact-email-wrapper">
          <a
            href={`mailto:${EMAIL}`}
            className="contact-email-link"
            data-cursor="pointer"
            aria-label={`Send email to ${EMAIL}`}
          >
            <span>{EMAIL}</span>
            <span className="contact-email-arrow" aria-hidden="true">↗</span>
          </a>

          <button
            type="button"
            className="copy-email-btn"
            onClick={handleCopy}
            data-cursor="pointer"
            aria-label="Copy email address to clipboard"
          >
            {copied ? '✓ COPIED TO CLIPBOARD' : 'CLICK TO COPY ADDRESS'}
          </button>
        </div>
      </div>

      <div className="contact-status-details">
        <div className="contact-detail-block">
          <span className="contact-detail-label">Location & Timezone</span>
          <span className="contact-detail-val">India · {currentTime || '16:45:00'} IST (UTC+5:30)</span>
        </div>
        <div className="contact-detail-block">
          <span className="contact-detail-label">Background & Focus</span>
          <span className="contact-detail-val">BTech CS (AI/ML) · Full-Stack Systems</span>
        </div>
        <div className="contact-detail-block">
          <span className="contact-detail-label">Availability</span>
          <span className="contact-detail-val">Open for Software & ML Engineering</span>
        </div>
      </div>

      <div className="footer-bottom-row">
        <span>© {new Date().getFullYear()} Shreyansh Bharti · All Rights Reserved</span>

        <div className="footer-social-links">
          {SOCIALS.map((soc) => (
            <a
              key={soc.label}
              href={soc.href}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              data-cursor="pointer"
            >
              <span>{soc.label}</span>
              <span style={{ marginLeft: '4px', fontSize: '0.8em' }} aria-hidden="true">↗</span>
            </a>
          ))}
        </div>

        <button
          type="button"
          className="back-to-top-btn"
          onClick={scrollToTop}
          data-cursor="pointer"
          aria-label="Scroll back to top"
        >
          <span>BACK TO TOP</span>
          <span aria-hidden="true">↑</span>
        </button>
      </div>
    </footer>
  );
}
