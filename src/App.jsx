import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Ticker from './components/Ticker';
import Posts from './components/Posts';
import Members from './components/Members';
import Defy from './components/Defy';
import Events from './components/Events';
import BulbIntro from './components/BulbIntro';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [activePage, setActivePage] = useState('home');

  // ── LENIS SMOOTH SCROLL ──────────────────────────────
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    // Connect Lenis to GSAP ticker (keep a stable reference so we can remove it)
    const raf = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Sync ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  // Determine if we should show the intro (skip it if there's already a hash route on load)
  const [showIntro, setShowIntro] = useState(() => {
    const hash = window.location.hash.slice(1);
    const valid = ['posts', 'members', 'defy', 'events'];
    return !valid.includes(hash);
  });

  // ── HASH ROUTING ──────────────────────────────────────
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      const valid = ['home', 'posts', 'members', 'defy', 'events'];
      setActivePage(valid.includes(hash) ? hash : 'home');
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page) => {
    setActivePage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const island = document.getElementById('island');
    if (island) {
      island.classList.remove('squish');
      void island.offsetWidth;
      island.classList.add('squish');
    }
  };

  return (
    <>
      {/* Phase 1: Physics Bulb Pull-String Intro */}
      {showIntro && (
        <BulbIntro onEnter={() => setShowIntro(false)} />
      )}

      {/* Main Site */}
      <Navbar activePage={activePage} onNavigate={handleNavigate} />

      <main>
        {activePage === 'home' && (
          <div className="page active">
            <Hero onNavigate={handleNavigate} />
            <Ticker />
          </div>
        )}
        {activePage === 'posts' && (
          <div className="page active"><Posts /></div>
        )}
        {activePage === 'members' && (
          <div className="page active"><Members /></div>
        )}
        {activePage === 'defy' && (
          <div className="page active"><Defy /></div>
        )}
        {activePage === 'events' && (
          <div className="page active"><Events /></div>
        )}
      </main>

      <Footer />
    </>
  );
}
