'use client';

// components/plan/ScopeChapter.tsx
// Chapter 2: THE SCOPE (id="chapter-scope")
// - One panel with two columns on desktop, stacked on mobile
// - Left column: green sticker "BUILD NOW", 05 What to build items with check mark in --accent
// - Right column: quiet gray sticker "NOT YET", 06 What not to build yet items with dash, visibly quieter

import React from 'react';
import { Check } from 'lucide-react';
import { BuildPlan } from '@/lib/plan';
import ChapterPanel from './ChapterPanel';
import StickerTag from './StickerTag';

interface ScopeChapterProps {
  plan: BuildPlan;
  accentColor: string;
}

export default function ScopeChapter({ plan, accentColor }: ScopeChapterProps) {
  return (
    <ChapterPanel
      id="chapter-scope"
      partText="Part 2 of 3"
      partColor="blue"
      title="THE SCOPE"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* ============================================================ */}
        {/* LEFT COLUMN: BUILD NOW (05 What to build)                     */}
        {/* ============================================================ */}
        <div className="flex flex-col">
          {/* Green Sticker */}
          <div className="mb-4">
            <StickerTag
              text="BUILD NOW"
              color="green"
              rotation="rotate-[-1.5deg]"
              wobble={false}
            />
          </div>

          {/* Heading (h3) */}
          <div className="flex items-center gap-2.5 mb-6">
            <span
              className="inline-flex items-center justify-center w-7 h-7 rounded-full text-white font-bold text-xs sm:text-sm shrink-0"
              style={{ backgroundColor: accentColor }}
              aria-hidden="true"
            >
              05
            </span>
            <h3 className="font-bold text-xl sm:text-2xl text-zinc-900 tracking-tight">
              What to build
            </h3>
          </div>

          {/* Items */}
          <ul className="space-y-6">
            {plan.buildNow.map((item, index) => (
              <li key={index} className="flex items-start gap-3.5">
                {/* Small check mark in --accent */}
                <span
                  className="inline-flex items-center justify-center w-5 h-5 rounded-full shrink-0 mt-1 shadow-xs"
                  style={{
                    backgroundColor: `${accentColor}22`,
                    color: accentColor,
                  }}
                  aria-hidden="true"
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </span>

                <div className="flex-1 min-w-0">
                  <strong className="text-base sm:text-lg font-bold text-zinc-900 block leading-snug">
                    {item.name}
                  </strong>
                  <p className="text-[15px] sm:text-[16px] text-zinc-600 leading-relaxed mt-1">
                    {item.reason}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* ============================================================ */}
        {/* RIGHT COLUMN: NOT YET (06 What not to build yet) - QUIETER   */}
        {/* ============================================================ */}
        <div className="flex flex-col bg-zinc-50/70 sm:p-6 p-4 rounded-2xl border border-zinc-200/50">
          {/* Quiet Gray Sticker */}
          <div className="mb-4">
            <StickerTag
              text="NOT YET"
              color="gray"
              rotation="rotate-[1.5deg]"
              wobble={false}
            />
          </div>

          {/* Heading (h3) */}
          <div className="flex items-center gap-2.5 mb-6">
            <span
              className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-zinc-300 text-zinc-700 font-bold text-xs sm:text-sm shrink-0"
              aria-hidden="true"
            >
              06
            </span>
            <h3 className="font-bold text-xl sm:text-2xl text-zinc-600 tracking-tight">
              What not to build yet
            </h3>
          </div>

          {/* Items (Muted & Visibly Quieter) */}
          <ul className="space-y-6">
            {plan.doNotBuildYet.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                {/* Small dash */}
                <span
                  className="text-zinc-400 font-bold text-lg select-none shrink-0 mt-0.5 leading-none"
                  aria-hidden="true"
                >
                  —
                </span>

                <div className="flex-1 min-w-0">
                  <strong className="text-base sm:text-lg font-semibold text-zinc-700 block leading-snug">
                    {item.name}
                  </strong>
                  <p className="text-[15px] sm:text-[16px] text-zinc-500 leading-relaxed mt-1">
                    {item.reason}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ChapterPanel>
  );
}
