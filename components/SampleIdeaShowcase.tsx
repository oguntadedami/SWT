'use client';

// components/SampleIdeaShowcase.tsx
// Showcases the 3 official brand cards: Mini Study Buddy, Mini Habit Tracker, Pocket Budget Buddy

import React from 'react';
import BuildIdeaCard from './BuildIdeaCard';

export default function SampleIdeaShowcase() {
  return (
    <section id="sample-ideas" className="py-16 sm:py-24 px-4 sm:px-6 relative z-10 scroll-mt-16 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white drop-shadow-md">
            WHAT YOU GET IN MINUTES
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/80 max-w-xl mx-auto font-sans font-medium">
            Three ideas that fit your life, plus a plan to start building. Here are sample cards directly from the studio.
          </p>
        </div>

        {/* THE 3 BRAND IDEA CARDS (Desktop 3-col grid, mobile swipeable tabs) */}
        <div className="relative">
          <BuildIdeaCard />
        </div>

      </div>
    </section>
  );
}
