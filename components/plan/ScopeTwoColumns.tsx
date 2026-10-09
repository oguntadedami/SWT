'use client';

// components/plan/ScopeTwoColumns.tsx
// Two side-by-side columns:
// Left: "What to build for v1" (NO icon next to section title, green check for items, name in bold, one-line reason)
// Right: "What to leave out for now" (NO icon next to section title, soft dash for items, name in bold, one-line reason)
// Stack on mobile, side-by-side on tablet/desktop.

import React from 'react';
import { BuildPlanItem } from '@/lib/plan';
import { Check } from 'lucide-react';

interface ScopeTwoColumnsProps {
  buildNow: BuildPlanItem[];
  doNotBuildYet: BuildPlanItem[];
}

export default function ScopeTwoColumns({
  buildNow,
  doNotBuildYet,
}: ScopeTwoColumnsProps) {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
      {/* COLUMN 1: WHAT TO BUILD FOR V1 */}
      <section className="rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 bg-white/95 backdrop-blur-2xl border border-white/80 shadow-[0_12px_36px_rgba(0,0,0,0.06)] text-zinc-900 flex flex-col justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 tracking-tight font-display mb-1.5">
            What to build for v1
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 mb-6 font-medium">
            Keep this tight. Only build what is essential to make the core idea work.
          </p>

          <ul className="space-y-3.5">
            {buildNow.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-zinc-50/80 border border-zinc-200/60"
              >
                <div className="w-5 h-5 rounded-full bg-[#2EAA7B] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-zinc-950 leading-snug">
                    {item.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 mt-1 leading-relaxed">
                    {item.reason}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* COLUMN 2: WHAT TO LEAVE OUT FOR NOW */}
      <section className="rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 bg-white/95 backdrop-blur-2xl border border-white/80 shadow-[0_12px_36px_rgba(0,0,0,0.06)] text-zinc-900 flex flex-col justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 tracking-tight font-display mb-1.5">
            What to leave out for now
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 mb-6 font-medium">
            Good ideas that will slow down your initial launch. Build them after you have users.
          </p>

          <ul className="space-y-3.5">
            {doNotBuildYet.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-zinc-50/80 border border-zinc-200/60"
              >
                <div className="w-5 h-5 rounded-full bg-zinc-200 text-zinc-600 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold leading-none select-none">
                  —
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-zinc-900 leading-snug">
                    {item.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 mt-1 leading-relaxed">
                    {item.reason}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
