'use client';

// components/plan/StatsStrip.tsx
// Newspaper stats strip:
// - Four equal columns separated by thin vertical rules, between thin horizontal rules:
//   Build time, Difficulty, Tools count, Stages count.
// - A small muted label above a larger value. No pills or icons.
// - On mobile: 2x2 grid.
// - Under the stats strip: a right-aligned action row with solid orange pill "COPY AI PROMPT"
//   and outlined ink pill "DOWNLOAD" (disabled, title "Coming in the next step").

import React from 'react';
import { Copy, Check } from 'lucide-react';
import DownloadMenu from './DownloadMenu';
import { PlanDocument } from '@/lib/planDocument';

interface StatsStripProps {
  buildTime: string;
  difficulty: string;
  toolCount: number;
  stageCount: number;
  onCopyPrompt: () => void;
  isCopied: boolean;
  planDocument?: PlanDocument;
  accentColor?: string;
}

export default function StatsStrip({
  buildTime,
  difficulty,
  toolCount,
  stageCount,
  onCopyPrompt,
  isCopied,
  planDocument,
  accentColor,
}: StatsStripProps) {
  return (
    <div className="mt-6 mb-8">
      {/* 4 Equal Columns Stats Strip between thin horizontal rules */}
      <div className="border-y border-stone-300 py-3.5">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-stone-300">
          {/* Stat 1: Build Time */}
          <div className="py-2 md:py-0 px-3 md:first:pl-0 text-left">
            <span className="block text-xs uppercase tracking-wider font-mono font-medium text-stone-500 mb-0.5">
              Build time
            </span>
            <span className="text-lg sm:text-xl font-bold font-sans text-[#1F2421]">
              {buildTime}
            </span>
          </div>

          {/* Stat 2: Difficulty */}
          <div className="py-2 md:py-0 px-3 text-left">
            <span className="block text-xs uppercase tracking-wider font-mono font-medium text-stone-500 mb-0.5">
              Difficulty
            </span>
            <span className="text-lg sm:text-xl font-bold font-sans text-[#1F2421]">
              {difficulty}
            </span>
          </div>

          {/* Stat 3: Tools */}
          <div className="py-2 md:py-0 px-3 text-left">
            <span className="block text-xs uppercase tracking-wider font-mono font-medium text-stone-500 mb-0.5">
              Tools
            </span>
            <span className="text-lg sm:text-xl font-bold font-sans text-[#1F2421]">
              {toolCount} tools
            </span>
          </div>

          {/* Stat 4: Stages */}
          <div className="py-2 md:py-0 px-3 md:last:pr-0 text-left">
            <span className="block text-xs uppercase tracking-wider font-mono font-medium text-stone-500 mb-0.5">
              Stages
            </span>
            <span className="text-lg sm:text-xl font-bold font-sans text-[#1F2421]">
              {stageCount} stages
            </span>
          </div>
        </div>
      </div>

      {/* Right-aligned Header Action Row under stats strip */}
      <div className="flex flex-wrap items-center justify-end gap-3 mt-4">
        {/* DOWNLOAD Menu */}
        {planDocument && (
          <DownloadMenu doc={planDocument} accentColor={accentColor} label="DOWNLOAD" />
        )}

        {/* COPY AI PROMPT (Solid Orange Pill) */}
        <button
          type="button"
          onClick={onCopyPrompt}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FF4F24] hover:bg-[#E53E14] active:bg-[#CC340D] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4F24] focus-visible:ring-offset-2"
        >
          {isCopied ? (
            <>
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>COPIED!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 stroke-[2.5]" />
              <span>COPY AI PROMPT</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
