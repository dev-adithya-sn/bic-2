import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { POSTS, SOCIALS } from '../data/clubData';

gsap.registerPlugin(ScrollTrigger);

const MEDIUM = SOCIALS.find(s => s.label === 'Medium');
const INSTAGRAM = SOCIALS.find(s => s.label === 'Instagram');

export default function Posts() {
  const [open, setOpen] = useState(null);
  const sectionRef = useRef(null);
  const hasPosts = POSTS.length > 0;

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
    <section className="posts-section container" ref={sectionRef}>
      {/* Page Hero */}
      <div className="page-hero">
        <span className="section-tag reveal-up">Library</span>
        <h1 className="page-hero-title reveal-up">Learn From<br />The <em>Builders</em></h1>
        <p className="page-hero-sub reveal-up">
          Guides, explainers and write-ups from the club.
        </p>
      </div>

      {hasPosts ? (
        <div className="posts-grid">
          {POSTS.map((post, i) => (
            <article key={i} className="post-card reveal-up" onClick={() => setOpen(i)}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
                <span className="post-tag">{post.tag}</span>
                <span className="post-min">{post.min}</span>
              </div>
              <h3 className="post-title">{post.title}</h3>
              <p className="post-excerpt">{post.excerpt}</p>
              <span className="post-read">Read more →</span>
            </article>
          ))}
        </div>
      ) : (
        /* No articles hosted here yet — point people at the real publication. */
        <div className="wide-card amber-glow reveal-up">
          <div className="section-tag">↯ Read our writing</div>
          <div className="fc-title" style={{ fontSize: 'clamp(26px,3.5vw,40px)', marginTop: 12 }}>
            BiC on Medium
          </div>
          <p style={{ color: 'var(--txt-2)', fontSize: 16, lineHeight: 1.65, maxWidth: '52ch', marginTop: 14 }}>
            Everything the club publishes — event recaps, explainers and member write-ups — lives on our
            Medium publication.
          </p>
          {MEDIUM && (
            <a
              className="inline-link"
              href={MEDIUM.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginTop: 20, display: 'inline-block' }}
            >
              Read on Medium ↗
            </a>
          )}
        </div>
      )}

      {/* Inline Feature Cards */}
      <div className="feature-grid feature-grid-2 reveal-up" style={{ marginTop: 80 }}>
        <div className="feature-card dark-amber">
          <div className="fc-eyebrow">Want to write?</div>
          <div className="fc-title">Share Your Knowledge</div>
          <div className="fc-body">
            Got a lesson learned, a project walkthrough, or advice for freshers? Pitch it to the content
            team and we'll publish it.
          </div>
        </div>
        <div className="feature-card dark-violet">
          <div className="fc-eyebrow violet">Get Updates</div>
          <div className="fc-title">Follow BiC Socials</div>
          <div className="fc-body">
            New articles, event announcements and recruitment drops go out on{' '}
            {INSTAGRAM ? (
              <a
                href={INSTAGRAM.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--violet)', textDecoration: 'none' }}
              >
                @bic_vitc
              </a>
            ) : (
              <span style={{ color: 'var(--violet)' }}>@bic_vitc</span>
            )}{' '}
            first.
          </div>
        </div>
      </div>

      {/* Modal */}
      {open !== null && POSTS[open] && (
        <div className="post-modal-overlay" onClick={() => setOpen(null)}>
          <div className="post-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setOpen(null)}>✕ Close</button>
            <div className="modal-tag">{POSTS[open].tag}</div>
            <h2 className="modal-title">{POSTS[open].title}</h2>
            <div className="modal-meta">{POSTS[open].min}</div>
            <div className="modal-body" dangerouslySetInnerHTML={{ __html: POSTS[open].body }} />
          </div>
        </div>
      )}
    </section>
  );
}
