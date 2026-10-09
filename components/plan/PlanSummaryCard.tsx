'use client';

// components/plan/PlanSummaryCard.tsx
// Core Concept & Essentials:
// - Frosted glass card with large rounded corners on calm blue-gray backdrop
// - Clean typography: The problem, Target user, The MVP
// - REMOVED:
//   - Small icon-and-text tag pills ("A weekend", "Difficulty: Easy")
//   - Yellow callout with sparkle icon
//   - Decorative circle in the card's corner
//   - Uppercase monospace captions
//   - Icons next to section titles
// - Adjustment note displayed quietly and subtly if present (NO yellow sparkle box).

import React from 'react';
import { BuildPlan } from '@/lib/plan';

interface PlanSummaryCardProps {
  plan: BuildPlan;
}

export default function PlanSummaryCard({ plan }: PlanSummaryCardProps) {
  return (
    <article className="w-full rounded-[28px] sm:rounded-[32px] p-6 sm:p-10 bg-white/95 backdrop-blur-2xl border border-white/80 shadow-[0_12px_36px_rgba(0,0,0,0.06)] text-zinc-900 transition-all">
      {/* THREE ESSENTIALS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {/* 1. THE PROBLEM */}
        <div className="flex flex-col">
          <h2 className="text-base sm:text-lg font-bold text-zinc-950 mb-2 font-display">
            The problem
          </h2>
          <p className="text-sm sm:text-base text-zinc-700 leading-relaxed font-normal">
            {plan.problem}
          </p>
        </div>

        {/* 2. THE TARGET USER */}
        <div className="flex flex-col">
          <h2 className="text-base sm:text-lg font-bold text-zinc-950 mb-2 font-display">
            Target user
          </h2>
          <p className="text-sm sm:text-base text-zinc-700 leading-relaxed font-normal">
            {plan.targetUser}
          </p>
        </div>

        {/* 3. MVP SUMMARY */}
        <div className="flex flex-col">
          <h2 className="text-base sm:text-lg font-bold text-zinc-950 mb-2 font-display">
            The MVP
          </h2>
          <p className="text-sm sm:text-base text-zinc-700 leading-relaxed font-normal">
            {plan.mvpSummary}
          </p>
        </div>
      </div>

      {/* QUIET ADJUSTMENT NOTE (NO YELLOW SPARKLE BOX) */}
      {plan.adjustmentNote && (
        <div className="mt-8 pt-6 border-t border-zinc-100 text-xs sm:text-sm text-zinc-600 leading-relaxed">
          <span className="font-semibold text-zinc-900 mr-1.5">Note on scope:</span>
          <span>{plan.adjustmentNote}</span>
        </div>
      )}
    </article>
  );
}
