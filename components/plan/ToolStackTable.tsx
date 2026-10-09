'use client';

// components/plan/ToolStackTable.tsx
// Recommended tool stack:
// - Title: "Recommended tool stack" (NO icon next to section title)
// - Subtitle: "Tools chosen to minimize setup time, cost, and moving parts."
// - Clean typography: NO uppercase monospace captions
// - Responsive layout: clean table on desktop, cards on mobile.

import React from 'react';
import { ToolStackItem } from '@/lib/plan';

interface ToolStackTableProps {
  toolStack: ToolStackItem[];
}

export default function ToolStackTable({ toolStack }: ToolStackTableProps) {
  return (
    <section className="w-full rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 bg-white/95 backdrop-blur-2xl border border-white/80 shadow-[0_12px_36px_rgba(0,0,0,0.06)] text-zinc-900">
      <h2 className="text-xl sm:text-2xl font-black text-zinc-950 tracking-tight font-display mb-1.5">
        Recommended tool stack
      </h2>
      <p className="text-xs sm:text-sm text-zinc-500 mb-6 font-medium">
        Tools chosen to minimize setup time, cost, and moving parts.
      </p>

      {/* DESKTOP TABLE VIEW */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-200 text-xs sm:text-sm font-bold text-zinc-600">
              <th className="py-3 px-4 w-1/6">Tool</th>
              <th className="py-3 px-4 w-1/4">What it does</th>
              <th className="py-3 px-4 w-1/4">Why here</th>
              <th className="py-3 px-4 w-1/6 text-center">Free option</th>
              <th className="py-3 px-4 w-1/4">One limitation to know</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 text-sm">
            {toolStack.map((tool, idx) => (
              <tr key={idx} className="hover:bg-zinc-50/60 transition-colors">
                <td className="py-4 px-4 font-bold text-zinc-950 align-top">
                  {tool.name}
                </td>
                <td className="py-4 px-4 text-zinc-700 align-top leading-relaxed">
                  {tool.whatItDoes}
                </td>
                <td className="py-4 px-4 text-zinc-700 align-top leading-relaxed">
                  {tool.whyHere}
                </td>
                <td className="py-4 px-4 text-center align-top">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                      tool.freeOption === 'Yes'
                        ? 'bg-[#2EAA7B]/15 text-[#2EAA7B]'
                        : tool.freeOption === 'Partly'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-zinc-100 text-zinc-700'
                    }`}
                  >
                    {tool.freeOption}
                  </span>
                </td>
                <td className="py-4 px-4 text-zinc-600 text-xs sm:text-sm align-top leading-relaxed">
                  {tool.limitation}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE / TABLET CARDS VIEW */}
      <div className="lg:hidden space-y-4">
        {toolStack.map((tool, idx) => (
          <div
            key={idx}
            className="p-4 sm:p-5 rounded-2xl bg-zinc-50/80 border border-zinc-200/70 space-y-3"
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-base font-bold text-zinc-950">{tool.name}</h3>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                  tool.freeOption === 'Yes'
                    ? 'bg-[#2EAA7B]/15 text-[#2EAA7B]'
                    : tool.freeOption === 'Partly'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-zinc-100 text-zinc-700'
                }`}
              >
                Free: {tool.freeOption}
              </span>
            </div>

            <div>
              <span className="text-xs font-bold text-zinc-500 block mb-0.5">
                What it does
              </span>
              <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
                {tool.whatItDoes}
              </p>
            </div>

            <div>
              <span className="text-xs font-bold text-zinc-500 block mb-0.5">
                Why chosen
              </span>
              <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
                {tool.whyHere}
              </p>
            </div>

            <div className="pt-2 border-t border-zinc-200/60">
              <span className="text-xs font-bold text-zinc-500 block mb-0.5">
                Limitation to know
              </span>
              <p className="text-xs text-zinc-600 leading-relaxed">
                {tool.limitation}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
