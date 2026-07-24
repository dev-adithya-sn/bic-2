import React from 'react';
import { SOCIALS } from '../data/clubData';

const ICONS = {
  Medium: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12M20.96 12c0 3.54-1.51 6.42-3.38 6.42s-3.39-2.88-3.39-6.42 1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75s-1.19-2.58-1.19-5.75.53-5.75 1.19-5.75S24 8.83 24 12"/>
    </svg>
  ),
  LinkedIn: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12M7.12 20.45H3.56V9h3.56z"/>
    </svg>
  ),
  Instagram: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.42.56.21.96.47 1.38.9.43.42.69.82.9 1.38.17.43.37 1.06.42 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.42 2.23-.21.56-.47.96-.9 1.38-.42.43-.82.69-1.38.9-.43.17-1.06.37-2.23.42-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.42-.56-.21-.96-.47-1.38-.9-.43-.42-.69-.82-.9-1.38-.17-.43-.37-1.06-.42-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.42-2.23.21-.56.47-.96.9-1.38.42-.43.82-.69 1.38-.9.43-.17 1.06-.37 2.23-.42 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.31-1.46.72-2.13 1.38C1.35 2.68.94 3.35.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.72 1.46 1.38 2.13.67.66 1.34 1.07 2.13 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.31 1.46-.72 2.13-1.38.66-.67 1.07-1.34 1.38-2.13.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91-.31-.79-.72-1.46-1.38-2.13-.67-.66-1.34-1.07-2.13-1.38-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0m0 5.84A6.16 6.16 0 1 0 12 18.16 6.16 6.16 0 0 0 12 5.84m0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8m6.4-10.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88"/>
    </svg>
  ),
};

export default function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="container footer-inner">
        <div className="footer-lead">
          <span className="footer-eyebrow">Get in touch</span>
          <span className="footer-brand">BiC — VIT Chennai</span>
          <span className="footer-tagline">Business Innovation Community · EST. 2024</span>
        </div>
        <div className="footer-socials">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label={`BiC on ${s.label}`}
            >
              {ICONS[s.label]}
              <span>{s.label}</span>
            </a>
          ))}
        </div>
      </div>
      <div className="container footer-base">
        <span>© {new Date().getFullYear()} Business Innovation Community, VIT Chennai.</span>
        <span>Built by the BiC tech team.</span>
      </div>
    </footer>
  );
}
