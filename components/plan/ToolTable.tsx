'use client';

// components/plan/ToolTable.tsx
// Newspaper Front Page 07 The Tool Stack:
// - Kicker "07 · The tool stack"
// - Desktop: Ruled table with columns:
//   - Tool (name in bold with "why it's here" beneath in muted text)
//   - What it does
//   - Free option (plain text "Yes", "Partly", "No", or "Unsure")
//   - Watch out for (limitation)
//   - Hairline row rules and no cell borders
// - Mobile: Stack each tool as a block with the same fields labeled in bold

import React from 'react';
import { ToolStackItem } from '@/lib/plan';

interface ToolTableProps {
  toolStack: ToolStackItem[];
  accentColor: string;
}

export default function ToolTable({ toolStack, accentColor }: ToolTableProps) {
  return (
    <section id="section-07" className="scroll-mt-24 my-12 text-left">
      {/* Section Header */}
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4 pb-2 border-b-2 border-stone-800">
        <span
          className="text-xs uppercase font-mono font-bold tracking-widest"
          style={{ color: accentColor }}
        >
          07 · The tool stack
        </span>
        <span className="text-xs sm:text-sm font-serif italic text-stone-600">
          Tools selected for immediate utility
        </span>
      </div>

      {/* DESKTOP: Ruled Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-stone-300 text-xs font-mono font-bold uppercase tracking-wider text-stone-500">
              <th scope="col" className="py-2.5 pr-4 w-[28%]">
                Tool
              </th>
              <th scope="col" className="py-2.5 px-4 w-[30%]">
                What it does
              </th>
              <th scope="col" className="py-2.5 px-4 w-[14%]">
                Free option
              </th>
              <th scope="col" className="py-2.5 pl-4 w-[28%]">
                Watch out for
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200">
            {toolStack.map((tool, idx) => (
              <tr key={`tool-row-${idx}`} className="align-top">
                {/* Tool Name + Why it's here */}
                <td className="py-4 pr-4">
                  <span className="font-bold font-sans text-base text-stone-900 block">
                    {tool.name}
                  </span>
                  <span className="text-sm font-serif italic text-stone-600 block mt-0.5">
                    {tool.whyHere}
                  </span>
                </td>

                {/* What it does */}
                <td className="py-4 px-4 text-sm font-serif text-stone-800 leading-relaxed">
                  {tool.whatItDoes}
                </td>

                {/* Free Option (Plain text) */}
                <td className="py-4 px-4 text-sm font-sans font-semibold text-stone-900">
                  {tool.freeOption}
                </td>

                {/* Watch out for (Limitation) */}
                <td className="py-4 pl-4 text-sm font-serif text-stone-700 leading-relaxed">
                  {tool.limitation}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE: Stacked Cards */}
      <div className="md:hidden divide-y divide-stone-300">
        {toolStack.map((tool, idx) => (
          <div key={`tool-card-${idx}`} className="py-4 space-y-2">
            <div>
              <span className="font-bold font-sans text-lg text-stone-900 block">
                {tool.name}
              </span>
              <span className="text-xs font-serif italic text-stone-600 block mt-0.5">
                {tool.whyHere}
              </span>
            </div>

            <div className="text-sm font-serif text-stone-800">
              <strong className="font-sans font-bold text-stone-900 not-italic block text-xs uppercase tracking-wider mb-0.5">
                What it does:
              </strong>
              {tool.whatItDoes}
            </div>

            <div className="text-sm font-serif text-stone-800 flex items-center gap-2">
              <strong className="font-sans font-bold text-stone-900 not-italic text-xs uppercase tracking-wider">
                Free option:
              </strong>
              <span className="font-sans font-semibold">{tool.freeOption}</span>
            </div>

            <div className="text-sm font-serif text-stone-700">
              <strong className="font-sans font-bold text-stone-900 not-italic block text-xs uppercase tracking-wider mb-0.5">
                Watch out for:
              </strong>
              {tool.limitation}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
