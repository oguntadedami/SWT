// components/Doodles.tsx
// Official playful brand doodles and accent shapes from the "START WITH THIS" brand sheet:
// - Violet squiggly doodle ribbon (#A88AFF)
// - Warm Yellow 4-pointed sparkle (#F2D34F)
// - Floating glass "idea →" pill

import React from 'react';
import { ArrowRight } from 'lucide-react';

// Official Violet Squiggly Doodle Ribbon from the Brand Sheet
export function VioletSquiggleDoodle({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none select-none ${className}`}
      width="64"
      height="38"
      viewBox="0 0 64 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6 30 C14 34, 22 8, 32 18 C42 28, 48 8, 58 12"
        stroke="#A88AFF"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Official Warm Yellow 4-pointed Sparkle from the Brand Sheet
export function WarmYellowSparkle({ size = 28, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      style={{ width: size, height: size }}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <path
        d="M16 2 C16 11, 21 16, 30 16 C21 16, 16 21, 16 30 C16 21, 11 16, 2 16 C11 16, 16 11, 16 2 Z"
        fill="#F2D34F"
      />
    </svg>
  );
}

// Floating Brand Glass Pill: "idea →"
export function FloatingIdeaPill({ className = '' }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 border border-white/30 backdrop-blur-md text-white font-display text-xs font-bold tracking-wide shadow-md select-none transition-transform hover:scale-105 ${className}`}
    >
      <span>idea</span>
      <ArrowRight className="w-3 h-3 text-[#65D9B3]" />
    </div>
  );
}

export function ScribbleDoodle({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none select-none ${className}`}
      width="70"
      height="14"
      viewBox="0 0 70 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M2 8C10 2 18 12 26 6C34 2 42 12 50 6C58 2 64 10 68 7"
        stroke="#F2D34F"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
