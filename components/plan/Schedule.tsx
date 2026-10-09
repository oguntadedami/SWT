'use client';

// components/plan/Schedule.tsx
// Newspaper Front Page 08 The Build Roadmap:
// - Kicker "08 · The build roadmap", subtitle "The schedule"
// - Desktop: Stages as newspaper columns side by side (equal widths, separated by vertical hairlines)
// - Stage number as large numeral in accent color
// - Stage title, duration in muted text, goal
// - Tasks as a bulleted list (not checkboxes)
// - "Done when:" lead-in in bold
// - Stage 1 has small bordered tag "Start today"
// - Mobile: Stack the stages vertically

import React from 'react';
import { RoadmapStage } from '@/lib/plan';

interface ScheduleProps {
  roadmap: RoadmapStage[];
  accentColor: string;
}

export default function Schedule({ roadmap, accentColor }: ScheduleProps) {
  return (
    <section id="section-08" className="scroll-mt-24 my-12 text-left">
      {/* Section Header */}
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-6 pb-2 border-b-2 border-stone-800">
        <span
          className="text-xs uppercase font-mono font-bold tracking-widest"
          style={{ color: accentColor }}
        >
          08 · The build roadmap
        </span>
        <span className="text-xs sm:text-sm font-serif italic text-stone-600">
          The schedule
        </span>
      </div>

      {/* Stages Grid (Equal columns on desktop, stacked on mobile) */}
      <div
        className={`grid grid-cols-1 md:grid-cols-${Math.min(
          roadmap.length,
          4
        )} gap-8 md:gap-6 md:divide-x md:divide-stone-300`}
        style={{
          gridTemplateColumns:
            roadmap.length === 3 ? 'repeat(3, minmax(0, 1fr))' : undefined,
        }}
      >
        {roadmap.map((stage, idx) => {
          const isStage1 = idx === 0;

          return (
            <div
              key={`stage-${idx}`}
              className={`flex flex-col justify-between ${
                idx > 0 ? 'md:pl-6' : ''
              }`}
            >
              <div>
                {/* Header Row: Stage Numeral & "Start today" tag */}
                <div className="flex items-baseline justify-between gap-2 mb-2">
                  <span
                    className="text-4xl sm:text-5xl font-black font-sans leading-none"
                    style={{ color: accentColor }}
                  >
                    0{idx + 1}
                  </span>

                  {isStage1 && (
                    <span
                      className="px-2.5 py-0.5 text-[11px] font-mono font-bold uppercase tracking-wider rounded border"
                      style={{ borderColor: accentColor, color: accentColor }}
                    >
                      Start today
                    </span>
                  )}
                </div>

                {/* Stage Title & Duration */}
                <h3 className="text-lg font-bold font-sans text-stone-900 leading-snug">
                  {stage.title}
                </h3>
                <span className="text-xs font-mono font-medium text-stone-500 block mb-3">
                  {stage.duration}
                </span>

                {/* Goal */}
                <p className="text-sm font-serif italic text-stone-700 leading-normal mb-4">
                  <strong className="font-sans font-bold not-italic text-stone-900">
                    Goal:
                  </strong>{' '}
                  {stage.goal}
                </p>

                {/* Tasks Bulleted List (Not checkboxes) */}
                <div className="border-t border-stone-200 pt-3 mb-4">
                  <span className="text-xs font-mono font-bold uppercase text-stone-500 block mb-2">
                    Action steps:
                  </span>
                  <ul className="space-y-2 list-disc pl-4 text-sm font-serif text-stone-800 leading-relaxed">
                    {stage.tasks.map((task, taskIdx) => (
                      <li key={`task-${taskIdx}`}>{task}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Done When Lead-in */}
              <div className="border-t border-stone-200 pt-3 text-xs sm:text-sm font-serif text-stone-700 leading-relaxed bg-stone-100/60 p-3 rounded-lg">
                <strong className="font-sans font-bold text-stone-900 block mb-0.5">
                  Done when:
                </strong>
                {stage.doneWhen}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
