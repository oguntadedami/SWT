'use client';

// components/plan/ReadyFooter.tsx
// Screen footer for the Build Plan:
// - Two actions:
//   1. "Back to ideas" (link back to /ideas)
//   2. "Start over with new answers" (link back to /start)
// - One quiet line of encouragement:
//   "You have everything you need to begin. Pick an hour this week and build stage 1."
// - "No sign-up. We don’t ask for your name or email."

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, RotateCcw } from 'lucide-react';

export default function ReadyFooter() {
  return (
    <footer className="w-full pt-6 pb-12 flex flex-col items-center text-center relative z-20">
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-5">
        <Link
          href="/ideas"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-zinc-50 text-zinc-900 font-semibold text-xs sm:text-sm border border-zinc-200/80 transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to ideas</span>
        </Link>

        <Link
          href="/start"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/70 hover:bg-white text-zinc-700 hover:text-zinc-950 font-semibold text-xs sm:text-sm border border-zinc-200/60 transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Start over with new answers</span>
        </Link>
      </div>

      <p className="text-sm sm:text-base font-semibold text-zinc-800 max-w-lg mx-auto leading-relaxed">
        You have everything you need to begin. Pick an hour this week and build stage 1.
      </p>

      <p className="mt-1.5 text-xs text-zinc-500 font-normal">
        No sign-up. We don’t ask for your name or email.
      </p>
    </footer>
  );
}
