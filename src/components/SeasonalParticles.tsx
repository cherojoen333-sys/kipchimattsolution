import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  char: string;
  left: number; // percentage
  size: number; // pixels
  delay: number; // seconds
  duration: number; // seconds
  opacity: number;
}

export default function SeasonalParticles({ enabled }: { enabled: boolean }) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [themeName, setThemeName] = useState('');

  useEffect(() => {
    if (!enabled) {
      setParticles([]);
      return;
    }

    const month = new Date().getMonth(); // 0 = Jan, 11 = Dec
    let chars: string[] = [];
    let name = '';

    if (month === 11 || month === 0 || month === 1) {
      // Winter
      chars = ['❄', '❅', '❆', '•'];
      name = 'Winter Wonderland (Snow)';
    } else if (month >= 8 && month <= 10) {
      // Autumn
      chars = ['🍂', '🍁', '🍃', '🍁'];
      name = 'Golden Autumn (Falling Leaves)';
    } else if (month >= 2 && month <= 4) {
      // Spring
      chars = ['🌸', '💮', '✿', '✨'];
      name = 'Spring Blossom (Cherry Petals)';
    } else {
      // Summer (June, July, August)
      chars = ['🍃', '☘️', '✨', '🍀'];
      name = 'Summer Breeze (Green Leaves & Sparkles)';
    }

    setThemeName(name);

    // Create 20 random particles
    const list: Particle[] = [];
    for (let i = 0; i < 22; i++) {
      list.push({
        id: i,
        char: chars[Math.floor(Math.random() * chars.length)],
        left: Math.random() * 100, // percentage across screen width
        size: Math.floor(Math.random() * 16) + 12, // 12px to 28px
        delay: Math.random() * 15, // staggered start delays up to 15s
        duration: Math.random() * 12 + 10, // 10s to 22s travel time
        opacity: Math.random() * 0.4 + 0.4, // 0.4 to 0.8
      });
    }
    setParticles(list);
  }, [enabled]);

  if (!enabled || particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[40] overflow-hidden select-none">
      {/* Dynamic inline styles to avoid build CSS extraction issues */}
      <style>{`
        @keyframes seasonalFall {
          0% {
            transform: translateY(-5vh) rotate(0deg) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(105vh) rotate(360deg) translateX(50px);
            opacity: 0;
          }
        }
        .seasonal-particle {
          position: absolute;
          top: -30px;
          animation-name: seasonalFall;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
          will-change: transform;
        }
      `}</style>
      
      {particles.map(p => (
        <span
          key={p.id}
          className="seasonal-particle"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            opacity: p.opacity,
          }}
        >
          {p.char}
        </span>
      ))}

      {/* Subtle indicator toast at bottom-right when seasonal theme loads */}
      <div className="fixed bottom-24 left-24 bg-white/90 dark:bg-gray-900/90 border border-plum/20 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest text-plum flex items-center gap-1.5 shadow-md z-[100] animate-pulse">
        <span className="w-1.5 h-1.5 rounded-full bg-plum animate-ping" />
        <span>Theme: {themeName}</span>
      </div>
    </div>
  );
}
