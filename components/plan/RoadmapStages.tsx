'use client';

// components/plan/RoadmapStages.tsx
// Three sequential stages:
// - Title: "Build roadmap" (NO icon next to section title)
// - Subtitle: "Three simple stages. Complete them in order; do not jump ahead."
// - NO uppercase monospace captions (no "GOAL", "TASKS", etc.)
// - Sequential stage badges with connecting vertical flow
// - Stage title, duration, goal, tasks, "Done when:" criteria

import React from 'react';
import { RoadmapStage } from '@/lib/plan';
import { CheckCircle2 } from 'lucide-react';

interface RoadmapStagesProps {
  roadmap: RoadmapStage[];
}

export default function RoadmapStages({ roadmap }: RoadmapStagesProps) {
  return (
    <section className="w-full rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 bg-white/95 backdrop-blur-2xl border border-white/80 shadow-[0_12px_36px_rgba(0,0,0,0.06)] text-zinc-900">
      <h2 className="text-xl sm:text-2xl font-black text-zinc-950 tracking-tight font-display mb-1.5">
        Build roadmap
      </h2>
      <p className="text-xs sm:text-sm text-zinc-500 mb-8 font-medium">
        Three simple stages. Complete them in order; do not jump ahead.
      </p>

      {/* STAGES LIST WITH VERTICAL CONNECTORS */}
      <div className="relative space-y-8 sm:space-y-10">
        {roadmap.map((stage, idx) => {
          const isLast = idx === roadmap.length - 1;
          const stageColors = [
            'bg-[#FF4F24] text-white',
            'bg-[#327AE6] text-white',
            'bg-[#2EAA7B] text-white',
          ];
          const badgeClass = stageColors[idx % stageColors.length];

          return (
            <div key={idx} className="relative flex items-start gap-4 sm:gap-6 group">
              {/* STAGE NUMBER & VERTICAL CONNECTOR */}
              <div className="flex flex-col items-center shrink-0">
                <div
                  className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full ${badgeClass} font-display font-black text-sm sm:text-base flex items-center justify-center shadow-md relative z-10`}
                >
                  {idx + 1}
                </div>

                {!isLast && (
                  <div
                    className="w-0.5 flex-1 min-h-[140px] my-2 bg-gradient-to-b from-zinc-300 via-zinc-200 to-transparent border-l-2 border-dashed border-zinc-300"
                    aria-hidden="true"
                  />
                )}
              </div>

              {/* STAGE CONTENT CARD */}
              <div className="flex-1 rounded-2xl p-5 sm:p-6 bg-zinc-50/80 border border-zinc-200/70">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 mb-3">
                  <h3 className="text-base sm:text-lg font-black text-zinc-950 tracking-tight font-display">
                    {stage.title}
                  </h3>
                  <span className="text-xs sm:text-sm font-semibold text-zinc-500">
                    {stage.duration}
                  </span>
                </div>

                {/* GOAL */}
                <div className="mb-4">
                  <h4 className="text-xs font-bold text-zinc-500 mb-1">Goal</h4>
                  <p className="text-sm font-semibold text-zinc-800 leading-snug">
                    {stage.goal}
                  </p>
                </div>

                {/* TASKS */}
                <div className="mb-4">
                  <h4 className="text-xs font-bold text-zinc-500 mb-1.5">Tasks</h4>
                  <ul className="space-y-2">
                    {stage.tasks.map((task, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 shrink-0 mt-2" />
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* DONE WHEN */}
                <div className="pt-3 border-t border-zinc-200/70 flex items-start gap-2.5 bg-white/70 p-3 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-[#2EAA7B] shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm">
                    <span className="font-bold text-zinc-900 mr-1.5">Done when:</span>
                    <span className="text-zinc-700">{stage.doneWhen}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
