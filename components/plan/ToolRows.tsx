'use client';

// components/plan/ToolRows.tsx
// Section 07: The tool stack
// - One row per tool:
//     * Name in bold with "why it's here" muted beneath
//     * What it does
//     * Small colored dot with plain text "Free: Yes" (green dot) or "Free: Partly/No/Unsure" (amber/gray dot)
//     * "Watch out: <limitation>" in muted text
// - Responsive layout: stacked on mobile, balanced row on desktop

import React from 'react';
import { ToolStackItem } from '@/lib/plan';

interface ToolRowsProps {
  tools: ToolStackItem[];
  accentColor: string;
}

export default function ToolRows({ tools, accentColor }: ToolRowsProps) {
  return (
    <div className="flex flex-col">
      {/* Heading (h3) */}
      <div className="flex items-center gap-2.5 mb-6">
        <span
          className="inline-flex items-center justify-center w-7 h-7 rounded-full text-white font-bold text-xs sm:text-sm shrink-0"
          style={{ backgroundColor: accentColor }}
          aria-hidden="true"
        >
          07
        </span>
        <h3 className="font-bold text-xl sm:text-2xl text-zinc-900 tracking-tight">
          The tool stack
        </h3>
      </div>

      {/* Tools Table / Rows */}
      <div className="divide-y divide-zinc-200/80">
        {tools.map((tool, index) => {
          const isFree = tool.freeOption === 'Yes';
          const isPartly = tool.freeOption === 'Partly';

          return (
            <div
              key={index}
              className="py-5 sm:py-6 first:pt-0 last:pb-0 flex flex-col md:grid md:grid-cols-12 md:gap-6 md:items-baseline gap-3"
            >
              {/* Tool Name & Why it's here (Cols 1-4) */}
              <div className="md:col-span-4">
                <strong className="text-base sm:text-lg font-bold text-zinc-900 block leading-tight">
                  {tool.name}
                </strong>
                <span className="text-xs sm:text-sm text-zinc-500 font-medium block mt-1">
                  Why: {tool.whyHere}
                </span>
              </div>

              {/* What it does (Cols 5-7) */}
              <div className="md:col-span-4">
                <span className="text-sm sm:text-base text-zinc-700 leading-normal block">
                  {tool.whatItDoes}
                </span>
              </div>

              {/* Free tier status & limitation (Cols 8-12) */}
              <div className="md:col-span-4 flex flex-col gap-1">
                {/* Free Status with colored dot */}
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-zinc-800">
                  <span
                    className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                      isFree
                        ? 'bg-[#2EAA7B]'
                        : isPartly
                        ? 'bg-amber-500'
                        : 'bg-zinc-400'
                    }`}
                    aria-hidden="true"
                  />
                  <span>Free: {tool.freeOption}</span>
                </div>

                {/* Watch out limitation */}
                {tool.limitation && (
                  <p className="text-xs sm:text-sm text-zinc-500 leading-normal mt-0.5">
                    <span className="font-medium text-zinc-600">Watch out:</span>{' '}
                    {tool.limitation}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
