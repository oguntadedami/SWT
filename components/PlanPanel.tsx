'use client';

// components/PlanPanel.tsx
// Desktop right column: the single glass preview panel in this section.
// Features:
// - Slightly higher opacity than glass elsewhere (bg-white/[0.16] with backdrop-blur-xl) so text stays crisp and readable.
// - Soft 200ms fade transition on step change (opacity only, no sliding or bouncing via animate-plan-fade).
// - Respects prefers-reduced-motion by disabling the fade.
// - Shows the section title once, then the sample content for the selected item.
// - Strict styling rule: "The selected list item uses the accent color. Nothing else in the section uses the accent color."
//   All panel text and components use neutral whites, grays, and muted borders.

import React from 'react';
import Image from 'next/image';

export interface PlanDetailData {
  id: string; // '01'
  title: string; // 'The MVP'
  iconSrc?: string;
  badgeBg?: string;
  type: 'paragraph' | 'list' | 'rows' | 'stages' | 'code';
  paragraphText?: string;
  listItems?: string[];
  rows?: { label: string; desc: string }[];
  stages?: { day: string; task: string }[];
  codeSnippet?: string;
}

interface PlanPanelProps {
  data: PlanDetailData;
}

export default function PlanPanel({ data }: PlanPanelProps) {
  return (
    <div
      role="tabpanel"
      id={`plan-panel-${data.id}`}
      aria-labelledby={`plan-tab-${data.id}`}
      tabIndex={0}
      className="w-full min-h-[300px] sm:min-h-[340px] flex flex-col justify-start rounded-[24px] sm:rounded-[28px] p-6 sm:p-9 bg-white/[0.16] backdrop-blur-xl border border-white/20 shadow-[0_20px_48px_rgba(0,0,0,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
    >
      <div key={data.id} className="w-full animate-plan-fade">
        {/* Section title & custom badge icon (about 30px, centered, uncropped, with colored badge behind it) */}
        <div className="flex items-center gap-4 pb-4 mb-5 border-b border-white/10">
          {data.iconSrc && (
            <div
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 border border-white/25 shadow-md p-1.5"
              style={{ backgroundColor: `${data.badgeBg || '#FF5722'}25` }}
            >
              <Image
                src={data.iconSrc}
                alt=""
                width={30}
                height={30}
                referrerPolicy="no-referrer"
                className="w-[28px] h-[28px] sm:w-[30px] sm:h-[30px] object-contain select-none pointer-events-none"
              />
            </div>
          )}
          <div>
            <span className="font-mono text-xs text-white/50 tracking-wider block mb-0.5">
              {data.id}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight">
              {data.title}
            </h3>
          </div>
        </div>

        {/* Sample Content (Polite Nudge example) */}
        {data.type === 'paragraph' && data.paragraphText && (
          <p className="text-base sm:text-lg text-white/90 leading-relaxed font-sans font-normal max-w-xl">
            {data.paragraphText}
          </p>
        )}

        {data.type === 'list' && data.listItems && (
          <ul className="flex flex-col gap-3 max-w-xl">
            {data.listItems.map((item, idx) => (
              <li
                key={idx}
                className="flex items-center gap-3 text-base sm:text-lg text-white/90 font-sans"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white/60 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        {data.type === 'rows' && data.rows && (
          <div className="flex flex-col gap-3.5 max-w-xl">
            {data.rows.map((row, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2 text-sm sm:text-base text-white/90 font-sans"
              >
                <span className="font-semibold text-white shrink-0 sm:min-w-[110px]">
                  {row.label}:
                </span>
                <span className="text-white/80">{row.desc}</span>
              </div>
            ))}
          </div>
        )}

        {data.type === 'stages' && data.stages && (
          <div className="flex flex-col gap-3.5 max-w-xl">
            {data.stages.map((stage, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2 text-sm sm:text-base text-white/90 font-sans"
              >
                <span className="font-semibold text-white shrink-0 sm:min-w-[70px]">
                  {stage.day}:
                </span>
                <span className="text-white/80">{stage.task}</span>
              </div>
            ))}
          </div>
        )}

        {data.type === 'code' && data.codeSnippet && (
          <div className="w-full max-w-xl">
            <div className="relative rounded-xl bg-black/40 border border-white/10 p-4 sm:p-5 font-mono text-xs sm:text-sm text-white/90 leading-relaxed select-text">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                <span className="text-[11px] uppercase tracking-wider text-white/50">
                  AI PROMPT SNIPPET
                </span>
                {/* Non-functional "Copy" button as a visual hint */}
                <span
                  aria-hidden="true"
                  className="px-2.5 py-1 rounded-md text-[11px] font-sans font-medium text-white/70 bg-white/10 border border-white/10 select-none cursor-default"
                >
                  Copy
                </span>
              </div>
              <p className="whitespace-pre-wrap font-mono text-white/85 text-xs sm:text-sm leading-relaxed">
                {data.codeSnippet}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
