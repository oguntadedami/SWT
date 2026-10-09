'use client';

// components/plan/IdeaChapter.tsx
// Chapter 1: THE IDEA (id="chapter-idea")
// - 01 The product: definition as one large heavy sentence (28-32px)
// - 02 The problem & 03 The target user: two columns on desktop, stacked on mobile
//   Each preceded by a solid number circle in --accent with bold title, then paragraph (17-18px, 1.7 line-height)
// - 04 The MVP: full-width band with ~14% --accent highlight, 20px radius, 22px summary text
//   Adjustment note beneath if present
// - Bottom: rotated sticker tag in idea's shape color with "Why it fits you: ..."

import React from 'react';
import { Idea } from '@/lib/ideas';
import { BuildPlan } from '@/lib/plan';
import ChapterPanel from './ChapterPanel';

interface IdeaChapterProps {
  idea: Idea;
  plan: BuildPlan;
  accentColor: string;
}

export default function IdeaChapter({ idea, plan, accentColor }: IdeaChapterProps) {
  return (
    <ChapterPanel
      id="chapter-idea"
      partText="Part 1 of 3"
      partColor="red"
      title="THE IDEA"
    >
      {/* 01 The product */}
      <div className="mb-10 sm:mb-12">
        <div className="flex items-center gap-2.5 mb-3.5">
          <span
            className="inline-flex items-center justify-center w-7 h-7 rounded-full text-white font-bold text-xs sm:text-sm shrink-0"
            style={{ backgroundColor: accentColor }}
            aria-hidden="true"
          >
            01
          </span>
          <h3 className="font-bold text-base sm:text-lg text-zinc-900 tracking-tight">
            The product
          </h3>
        </div>
        <p className="text-[26px] sm:text-[30px] lg:text-[32px] font-black tracking-tight text-zinc-900 leading-tight">
          {plan.definition}
        </p>
      </div>

      {/* 02 The problem and 03 The target user (Two columns on desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mb-10 sm:mb-12">
        {/* 02 The problem */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2.5 mb-3">
            <span
              className="inline-flex items-center justify-center w-7 h-7 rounded-full text-white font-bold text-xs sm:text-sm shrink-0"
              style={{ backgroundColor: accentColor }}
              aria-hidden="true"
            >
              02
            </span>
            <h3 className="font-bold text-lg sm:text-xl text-zinc-900 tracking-tight">
              The problem
            </h3>
          </div>
          <p className="text-[17px] sm:text-[18px] leading-[1.7] text-zinc-700">
            {plan.problem}
          </p>
        </div>

        {/* 03 The target user */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2.5 mb-3">
            <span
              className="inline-flex items-center justify-center w-7 h-7 rounded-full text-white font-bold text-xs sm:text-sm shrink-0"
              style={{ backgroundColor: accentColor }}
              aria-hidden="true"
            >
              03
            </span>
            <h3 className="font-bold text-lg sm:text-xl text-zinc-900 tracking-tight">
              The target user
            </h3>
          </div>
          <p className="text-[17px] sm:text-[18px] leading-[1.7] text-zinc-700">
            {plan.targetUser}
          </p>
        </div>
      </div>

      {/* 04 The MVP: Full-width highlighted band */}
      <div className="mb-6">
        <div
          className="rounded-[20px] p-6 sm:p-8 border transition-colors"
          style={{
            backgroundColor: `${accentColor}1A`, // ~10-14% opacity
            borderColor: `${accentColor}33`,
          }}
        >
          <div className="flex items-center gap-2.5 mb-3">
            <span
              className="inline-flex items-center justify-center w-7 h-7 rounded-full text-white font-bold text-xs sm:text-sm shrink-0"
              style={{ backgroundColor: accentColor }}
              aria-hidden="true"
            >
              04
            </span>
            <h3 className="font-bold text-lg sm:text-xl text-zinc-900 tracking-tight">
              The MVP
            </h3>
          </div>
          <p className="text-[20px] sm:text-[22px] font-semibold text-zinc-900 leading-snug">
            {plan.mvpSummary}
          </p>
        </div>

        {/* Subtle adjustment note beneath the band if present */}
        {plan.adjustmentNote && (
          <p className="mt-3.5 text-sm sm:text-base text-zinc-500 font-medium leading-relaxed pl-1">
            <strong className="text-zinc-700 font-semibold">A note on this plan:</strong>{' '}
            {plan.adjustmentNote}
          </p>
        )}
      </div>

      {/* Why it fits you sticker tag at bottom */}
      {idea.whyFitsYou && (
        <div className="mt-8 pt-6 border-t border-zinc-200/80 flex items-center justify-start">
          <div
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-2xl shadow-sm border select-none transition-transform duration-200 hover:rotate-0 hover:scale-105 rotate-[-1.5deg]"
            style={{
              backgroundColor: `${accentColor}15`,
              borderColor: `${accentColor}40`,
              color: accentColor,
            }}
          >
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wide opacity-90">
              Why it fits you:
            </span>
            <span className="text-xs sm:text-sm font-semibold text-zinc-800">
              {idea.whyFitsYou}
            </span>
          </div>
        </div>
      )}
    </ChapterPanel>
  );
}
