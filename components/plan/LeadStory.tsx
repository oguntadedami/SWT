'use client';

// components/plan/LeadStory.tsx
// Newspaper Front Page Lead Story:
// - Section 01 The Product: Kicker "01 · The product", huge headline, serif deck
// - Section 02 The Problem (in 8-col main): Kicker "02 · The problem", heavy title,
//   19px serif paragraph with 3-line tall drop cap in accent color.

import React from 'react';

interface LeadStoryProps {
  productName: string;
  definition: string;
  problem: string;
  accentColor: string;
}

export default function LeadStory({
  productName,
  definition,
  problem,
  accentColor,
}: LeadStoryProps) {
  const firstLetter = problem ? problem.charAt(0) : '';
  const restOfProblem = problem ? problem.slice(1) : '';

  return (
    <div>
      {/* ============================================================== */}
      {/* SECTION 01: THE PRODUCT (Full Width Headline & Deck)           */}
      {/* ============================================================== */}
      <section id="section-01" className="scroll-mt-24 pt-2 pb-6 text-left">
        <span
          className="inline-block text-xs uppercase font-mono font-bold tracking-widest mb-2"
          style={{ color: accentColor }}
        >
          01 · The product
        </span>

        {/* Huge Heavy Tightly-spaced Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-[-0.04em] text-[#1F2421] leading-[0.92] break-words">
          {productName}
        </h1>

        {/* Deck: Serif 24-28px */}
        <p className="mt-4 sm:mt-5 text-xl sm:text-2xl md:text-[26px] font-serif italic text-stone-800 leading-snug max-w-4xl">
          {definition}
        </p>
      </section>

      {/* ============================================================== */}
      {/* SECTION 02: THE PROBLEM (Lead Story in 8-col column)           */}
      {/* ============================================================== */}
      <section id="section-02" className="scroll-mt-24 pt-6 pb-6 text-left border-t border-stone-300">
        <span
          className="inline-block text-xs uppercase font-mono font-bold tracking-widest mb-1.5"
          style={{ color: accentColor }}
        >
          02 · The problem
        </span>

        <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#1F2421] mb-4">
          The Frustration You Are Solving
        </h2>

        {/* Paragraph in serif at 19px with 3-line tall drop cap in accent color */}
        <p className="text-[19px] font-serif text-stone-900 leading-relaxed text-justify">
          <span
            className="float-left text-5xl sm:text-6xl leading-[0.8] font-bold font-serif pr-2.5 pt-1 uppercase select-none"
            style={{ color: accentColor }}
            aria-hidden="true"
          >
            {firstLetter}
          </span>
          {restOfProblem}
        </p>
      </section>
    </div>
  );
}
