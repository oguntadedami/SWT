'use client';

// components/plan/Ledger.tsx
// Newspaper Front Page "The Ledger":
// - Two facing columns separated by a vertical rule:
//   - Left, 05 What to build: Kicker "05 · What to build", subtitle "In the first edition".
//     Small check mark in accent color, name in bold, reason beneath.
//   - Right, 06 What not to build yet: Kicker "06 · What not to build yet", subtitle "Held for a later edition".
//     Small dash in muted gray, slightly lighter text, name in bold, reason beneath (visibly quieter).

import React from 'react';
import { BuildPlanItem } from '@/lib/plan';
import { Check } from 'lucide-react';

interface LedgerProps {
  buildNow: BuildPlanItem[];
  doNotBuildYet: BuildPlanItem[];
  accentColor: string;
}

export default function Ledger({
  buildNow,
  doNotBuildYet,
  accentColor,
}: LedgerProps) {
  return (
    <div className="my-10 text-left">
      {/* Ledger Header */}
      <div className="border-b border-stone-300 pb-2 mb-6">
        <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-stone-500">
          The Ledger · Scope of Editions
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 md:divide-x md:divide-stone-300">
        {/* ============================================================ */}
        {/* LEFT: 05 WHAT TO BUILD                                       */}
        {/* ============================================================ */}
        <section id="section-05" className="scroll-mt-24 md:pr-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4 pb-2 border-b-2 border-stone-800">
            <span
              className="text-xs uppercase font-mono font-bold tracking-widest"
              style={{ color: accentColor }}
            >
              05 · What to build
            </span>
            <span className="text-xs sm:text-sm font-serif italic text-stone-600">
              In the first edition
            </span>
          </div>

          <ul className="space-y-5 list-none p-0 m-0">
            {buildNow.map((item, idx) => (
              <li key={`build-now-${idx}`} className="flex items-start gap-3">
                <span
                  className="mt-1 flex items-center justify-center shrink-0 w-4 h-4 rounded-full"
                  style={{ color: accentColor }}
                  aria-hidden="true"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-sans text-stone-900 leading-snug">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-sm sm:text-base font-serif text-stone-700 leading-relaxed">
                    {item.reason}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ============================================================ */}
        {/* RIGHT: 06 WHAT NOT TO BUILD YET                              */}
        {/* ============================================================ */}
        <section id="section-06" className="scroll-mt-24 md:pl-8">
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4 pb-2 border-b-2 border-stone-400">
            <span
              className="text-xs uppercase font-mono font-bold tracking-widest opacity-80"
              style={{ color: accentColor }}
            >
              06 · What not to build yet
            </span>
            <span className="text-xs sm:text-sm font-serif italic text-stone-500">
              Held for a later edition
            </span>
          </div>

          <ul className="space-y-5 list-none p-0 m-0 opacity-85">
            {doNotBuildYet.map((item, idx) => (
              <li key={`not-yet-${idx}`} className="flex items-start gap-3">
                <span className="mt-0.5 text-stone-400 font-bold select-none text-base" aria-hidden="true">
                  —
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-sans text-stone-700 leading-snug">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-sm sm:text-base font-serif text-stone-600 leading-relaxed">
                    {item.reason}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
