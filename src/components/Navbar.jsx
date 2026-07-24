import React from 'react';

const NAV_ITEMS = ['home', 'posts', 'members', 'defy', 'events'];
const LABELS = {
  home: 'Home',
  posts: 'Library',
  members: 'Team',
  defy: 'DeFy',
  events: 'Events',
};

export default function Navbar({ activePage, onNavigate }) {
  return (
    <nav className="navbar">
      <div className="island" id="island">
        <button className="island-logo" onClick={() => onNavigate('home')}>
          BiC
        </button>
        {NAV_ITEMS.map(page => (
          <button
            key={page}
            className={`nav-pill ${activePage === page ? 'active' : ''}`}
            onClick={() => onNavigate(page)}
          >
            {LABELS[page]}
          </button>
        ))}
      </div>
    </nav>
  );
}
