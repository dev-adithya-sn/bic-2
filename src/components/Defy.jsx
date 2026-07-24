import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DEFY_NEXT, DEFY_EDITIONS } from '../data/clubData';

gsap.registerPlugin(ScrollTrigger);

export default function Defy() {
  const [openEd, setOpenEd] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.reveal-up').forEach((el) => {
        gsap.fromTo(el, 
          { opacity: 0, y: 30 },
          {
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
            opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="container" ref={sectionRef} style={{ paddingBottom: 120 }}>
      {/* Page Hero */}
      <div className="page-hero">
        <span className="section-tag reveal-up">Flagship Event</span>
        <h1 className="page-hero-title reveal-up"><em>DeFy</em> —<br />Where Ideas Compete</h1>
        <p className="page-hero-sub reveal-up">
          24 hours. Two rounds. Nine finalists. BiC's Web3 × Entrepreneurship hackathon brings the brightest minds in VIT Chennai to build, pitch, and win.
        </p>
      </div>

      {/* Stats Banner */}
      <div className="stats-banner reveal-up">
        <div className="stat-block featured">
          <span className="stat-icon">⚡</span>
          <div className="stat-number">24<sup>h</sup></div>
          <div className="stat-label">Build Sprint</div>
          <div className="stat-desc">Uninterrupted building at VIT Chennai campus. No sleep, just momentum.</div>
        </div>
        <div className="stat-block">
          <span className="stat-icon">🏅</span>
          <div className="stat-number">₹40<sup>k</sup></div>
          <div className="stat-label">Per Track Prize</div>
          <div className="stat-desc">₹25k for 1st, ₹15k for 2nd — plus sponsor bounties stacked on top.</div>
        </div>
        <div className="stat-block">
          <span className="stat-icon">🎯</span>
          <div className="stat-number">9</div>
          <div className="stat-label">Finalist Teams</div>
          <div className="stat-desc">Only the top 9 teams pitch to judges in the finale. Every year.</div>
        </div>
      </div>

      {/* Next Edition Wide Card */}
      <div className="wide-card amber-glow reveal-up" style={{ marginBottom: 24 }}>
        <div className="wide-card-left">
          <div className="section-tag">↯ {DEFY_NEXT.label}</div>
          <div className="defy-hero-num">{DEFY_NEXT.title}<br /><em>Next</em></div>
          <p style={{ color: 'var(--txt-2)', fontSize: 16, lineHeight: 1.65, maxWidth: '50ch', marginTop: 16 }}>
            {DEFY_NEXT.blurb}
          </p>
          <div className="chips" style={{ marginTop: 20 }}>
            {DEFY_NEXT.chips.map((c, i) => <span key={i} className="chip">{c}</span>)}
          </div>
          <a
            className="inline-link"
            href={DEFY_NEXT.link.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginTop: 20, display: 'inline-block' }}
          >
            {DEFY_NEXT.link.text}
          </a>
        </div>
      </div>

      {/* How it Works */}
      <div className="feature-grid feature-grid-2 reveal-up" style={{ marginBottom: 80 }}>
        <div className="feature-card dark-amber">
          <div className="fc-eyebrow">Round 01</div>
          <div className="fc-title">Ideate Online</div>
          <div className="fc-body">
            Pick a track, form a team of 4–6, and submit your idea as a deck on Devfolio. No code yet — this round filters for teams who can <em style={{color:'var(--amber)'}}>think</em>, not just build.
          </div>
        </div>
        <div className="feature-card">
          <div className="fc-eyebrow">Round 02</div>
          <div className="fc-title">Build for 24 Hours</div>
          <div className="fc-body">
            Shortlisted teams arrive on campus and build for 24 hours straight. Checkpoint evaluations through the night. The top 9 teams go to the finale to pitch.
          </div>
        </div>
      </div>

      {/* Past Editions */}
      <h2 className="page-hero-title reveal-up" style={{ fontSize: 'clamp(32px,4vw,52px)', marginBottom: 32 }}>
        Past <em>Editions</em>
      </h2>
      <div className="editions-row">
        {DEFY_EDITIONS.map((ed, i) => {
          const hasWinners = ed.winners && ed.winners.length > 0;
          return (
          <div
            key={i}
            className="edition-card reveal-up"
            onClick={() => hasWinners && setOpenEd(openEd === i ? null : i)}
            style={{ cursor: hasWinners ? 'pointer' : 'default' }}
          >
            <div className="edition-name">{ed.ed}</div>
            <div className="edition-when">{ed.when}</div>
            <p className="edition-theme">{ed.theme}</p>
            <div className="edition-facts">
              {ed.facts.map((f, j) => <span key={j} className="edition-fact">{f}</span>)}
            </div>
            {hasWinners && openEd === i && (
              <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {ed.winners.map((w, j) => (
                  <div key={j} style={{ display: 'flex', gap: 12, alignItems: 'center', fontSize: 14 }}>
                    <span style={{ fontFamily: 'var(--mono)', color: 'var(--amber)', fontSize: 11, minWidth: 28 }}>{w.pos}</span>
                    <span style={{ color: 'var(--txt)', flex: 1 }}>{w.team}</span>
                    {w.prize && <span style={{ fontFamily: 'var(--mono)', color: 'var(--txt-2)', fontSize: 12 }}>{w.prize}</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
          );
        })}
      </div>
    </section>
  );
}
