import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MEMBERS } from '../data/clubData';

gsap.registerPlugin(ScrollTrigger);

// Office-bearer titles aren't departments — everything else on the current
// committee is one. Derived from the roster so it stays true if names change.
const OFFICE_BEARERS = ['President', 'Vice President', 'General Secretary'];
const CURRENT = MEMBERS[0]?.people ?? [];
const DEPARTMENTS = [...new Set(
  CURRENT.filter(p => !OFFICE_BEARERS.includes(p.role))
         .map(p => p.role.replace(/\s*Lead$/, ''))
)];

export default function Members() {
  const [activeGroup, setActiveGroup] = useState(0);
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

  const group = MEMBERS[activeGroup];

  return (
    <section className="members-section container" ref={sectionRef}>
      {/* Page Hero */}
      <div className="page-hero">
        <div className="reveal-up">
          <span className="section-tag">Core Team</span>
        </div>
        <h1 className="page-hero-title reveal-up">
          The People<br />Who <em>Build</em> BiC
        </h1>
        <p className="page-hero-sub reveal-up">
          Every great idea needs obsessed people to execute it. Meet the core behind BiC.
        </p>
      </div>

      {/* Stats Banner — Finguard style */}
      <div className="stats-banner reveal-up">
        <div className="stat-block featured">
          <span className="stat-icon">💡</span>
          <div className="stat-number">3<sup>rd</sup></div>
          <div className="stat-label">Year Running</div>
          <div className="stat-desc">BiC has been building the innovation culture at VIT Chennai since 2024.</div>
        </div>
        <div className="stat-block">
          <span className="stat-icon">👥</span>
          <div className="stat-number">{CURRENT.length}</div>
          <div className="stat-label">Core Team 2026–27</div>
          <div className="stat-desc">The leads running BiC this year, listed below.</div>
        </div>
        <div className="stat-block">
          <span className="stat-icon">🏆</span>
          <div className="stat-number">{DEPARTMENTS.length}</div>
          <div className="stat-label">Departments</div>
          <div className="stat-desc">{DEPARTMENTS.join(' · ')}.</div>
        </div>
      </div>

      {/* Cohort Tabs */}
      <div className="cohort-tabs reveal-up">
        {MEMBERS.map((g, i) => (
          <button
            key={i}
            className={`cohort-tab ${i === activeGroup ? 'active' : ''}`}
            onClick={() => setActiveGroup(i)}
          >
            {g.group}
          </button>
        ))}
      </div>

      {/* Member Grid */}
      <div className="member-grid">
        {group.people.map((person, i) => (
          <div key={i} className="member-card reveal-up">
            <div className="member-avatar">{person.name.charAt(0)}</div>
            <div className="member-name">{person.name}</div>
            <div className="member-role">{person.role}</div>
          </div>
        ))}
      </div>

      {/* Feature cards */}
      <div style={{ marginTop: 80 }}>
        <div className="feature-grid feature-grid-3">
          {[
            { tag: 'Software', title: 'Build & Ship', body: 'Build projects, maintain the club website, and develop tools that make BiC run better.' },
            { tag: 'Design', title: 'Visual Identity', body: 'Own the look of BiC — from social assets to event branding. If it looks good, they made it.' },
            { tag: 'Events', title: 'Make it Happen', body: 'Coordinate DeFy, TechnoVIT and every BiC event from logistics to execution.' },
          ].map((d, i) => (
            <div key={i} className="feature-card reveal-up">
              <div className="fc-eyebrow">{d.tag}</div>
              <div className="fc-title">{d.title}</div>
              <div className="fc-body">{d.body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
