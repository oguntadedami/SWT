'use client';

// components/plan/McpBand.tsx
// Newspaper Front Page 04 The MVP:
// - Full-width ruled band beneath (thick rule above, thin below)
// - Kicker "04 · The MVP"
// - Subtitle "The smallest version worth building"
// - MVP summary in large serif text (~24px)
// - If adjustmentNote exists, add beneath as muted text prefixed with "A note on this plan:"
// - No boxes or icons

import React from 'react';

interface McpBandProps {
  mvpSummary: string;
  adjustmentNote?: string;
  accentColor: string;
}

export default function McpBand({
  mvpSummary,
  adjustmentNote,
  accentColor,
}: McpBandProps) {
  return (
    <section id="section-04" className="scroll-mt-24 my-8 text-left">
      {/* Thick rule above */}
      <div className="h-[3px] bg-[#1F2421] w-full" aria-hidden="true" />

      <div className="py-6 sm:py-8">
        {/* Kicker & Subtitle */}
        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
          <span
            className="text-xs uppercase font-mono font-bold tracking-widest"
            style={{ color: accentColor }}
          >
            04 · The MVP
          </span>
          <span className="text-xs sm:text-sm font-serif italic text-stone-600">
            The smallest version worth building
          </span>
        </div>

        {/* MVP Summary in Large Serif Text */}
        <p className="text-xl sm:text-2xl md:text-[24px] font-serif text-stone-950 leading-relaxed font-normal">
          {mvpSummary}
        </p>

        {/* Optional Adjustment Note */}
        {adjustmentNote && (
          <p className="mt-4 pt-3 border-t border-stone-300 text-sm sm:text-base font-serif italic text-stone-600">
            <strong className="font-sans font-semibold not-italic text-stone-800">
              A note on this plan:
            </strong>{' '}
            {adjustmentNote}
          </p>
        )}
      </div>

      {/* Thin rule below */}
      <div className="h-[1px] bg-stone-300 w-full" aria-hidden="true" />
    </section>
  );
}
