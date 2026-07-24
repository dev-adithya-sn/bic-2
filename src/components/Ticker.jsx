import React from 'react';

const ITEMS = [
  { label: 'Build · Ship · Repeat', accent: true },
  { label: 'DeFy Hackathon', accent: false },
  { label: '24h Innovation Sprint', accent: false },
  { label: 'TechnoVIT Events', accent: true },
  { label: 'VIT Chennai', accent: false },
  { label: 'Business × Tech', accent: false },
  { label: 'Join the Community ↗', accent: true },
  { label: 'Web3 · AI · Product', accent: false },
];

export default function Ticker() {
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div className="ticker-wrap">
      <div className="ticker-inner">
        {doubled.map((item, i) => (
          <span key={i} className="ticker-item">
            {item.accent && <span>💡 </span>}
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}
