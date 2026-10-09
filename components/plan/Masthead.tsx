'use client';

// components/plan/Masthead.tsx
// Newspaper Front Page Masthead:
// - Centered title "START WITH THIS" in heavy display type
// - Flanked by the three logo shapes (selected shape in its own color doing one hop on arrival, other two in dark ink)
// - Double horizontal rule
// - Dateline row: "Printed <date>" on left, "Edition for <product name>" on right

import React, { useMemo } from 'react';

interface MastheadProps {
  ideaId: string;
  productName: string;
  accentColor: string;
}

export default function Masthead({
  ideaId,
  productName,
  accentColor,
}: MastheadProps) {
  const isIdea1 = ideaId === 'idea-1';
  const isIdea2 = ideaId === 'idea-2';
  const isIdea3 = ideaId === 'idea-3';

  // Format today's date in browser (e.g. October 9, 2026)
  const formattedDate = useMemo(() => {
    try {
      return new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }).format(new Date());
    } catch {
      return 'October 9, 2026';
    }
  }, []);

  return (
    <header className="pt-6 sm:pt-8 pb-3 px-5 sm:px-8 border-b border-stone-300">
      {/* Top Banner: Shapes & Masthead title */}
      <div className="flex items-center justify-between gap-4">
        {/* Left Shape (Red Circle or dark ink) */}
        <div className="hidden sm:flex items-center justify-center w-10 h-10 shrink-0">
          <div
            className={`w-7 h-7 rounded-full transition-transform ${
              isIdea1 ? 'animate-shape-hop-once' : ''
            }`}
            style={{ backgroundColor: isIdea1 ? accentColor : '#1F2421' }}
            aria-hidden="true"
          />
        </div>

        {/* Center Masthead Display Title */}
        <div className="flex-1 text-center">
          <p className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.25em] uppercase text-stone-500 mb-1">
            The Builder&apos;s Gazette · Vol. I
          </p>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-[-0.04em] text-[#1F2421] leading-none select-none">
            START WITH THIS
          </h1>
        </div>

        {/* Right Shapes (Blue Pill & Green Triangle) */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          {/* Blue Pill */}
          <div
            className={`w-4 h-7 rounded-full transition-transform ${
              isIdea2 ? 'animate-shape-hop-once' : ''
            }`}
            style={{ backgroundColor: isIdea2 ? accentColor : '#1F2421' }}
            aria-hidden="true"
          />
          {/* Green Triangle */}
          <div
            className={`w-6 h-6 transition-transform ${
              isIdea3 ? 'animate-shape-hop-once' : ''
            }`}
            aria-hidden="true"
          >
            <svg viewBox="0 0 100 80" className="w-full h-full" fill={isIdea3 ? accentColor : '#1F2421'}>
              <path d="M 18 10 L 86 40 L 18 70 Z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Double Horizontal Rule */}
      <div className="my-3 flex flex-col gap-[2px] animate-rule-draw" aria-hidden="true">
        <div className="h-[2px] bg-[#1F2421] w-full" />
        <div className="h-[1px] bg-[#1F2421] w-full" />
      </div>

      {/* Dateline Row */}
      <div className="flex flex-wrap items-center justify-between text-xs sm:text-sm font-serif italic text-stone-700 tracking-wide gap-2">
        <span>Printed {formattedDate}</span>
        <span className="font-semibold not-italic font-sans text-xs uppercase tracking-wider text-stone-900">
          Edition for {productName}
        </span>
      </div>
    </header>
  );
}
