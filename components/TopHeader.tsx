'use client';

// components/TopHeader.tsx
// Top brand bar (edition 2026 pill removed per user instruction):
// Displays the official 3D glossy brand mark centered or left-aligned when sticky.

import React from 'react';
import BrandLogo from './BrandLogo';

export default function TopHeader() {
  return (
    <header className="absolute top-4 sm:top-6 left-0 right-0 z-40 px-4 sm:px-6 pointer-events-none">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* Left: Brand Mark + Wordmark */}
        <div className="pointer-events-auto liquid-glass py-1.5 px-3.5 sm:px-4 rounded-full flex items-center gap-2 shadow-[0_8px_24px_rgba(0,0,0,0.3)] border border-white/20">
          <BrandLogo size="sm" showWordmark={true} showTagline={true} wordmarkColor="white" />
        </div>
      </div>
    </header>
  );
}
