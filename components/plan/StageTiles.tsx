'use client';

// components/plan/StageTiles.tsx
// Section 08: The build roadmap
// - Stage tiles in a row on desktop, stacked on mobile
// - Light-gray rounded tiles with:
//     * Stage number as a large numeral in --accent
//     * Stage 1 has green sticker "Start today"
//     * Title and duration in muted text
//     * Goal
//     * Tasks as a bulleted list (not checkboxes)
//     * "Done when:" in bold lead-in style
// - Joined with a dashed line connecting the stages

import React from 'react';
import { RoadmapStage } from '@/lib/plan';
import StickerTag from './StickerTag';

interface StageTilesProps {
  roadmap: RoadmapStage[];
  accentColor: string;
}

export default function StageTiles({ roadmap, accentColor }: StageTilesProps) {
  return (
    <div className="flex flex-col">
      {/* Heading (h3) */}
      <div className="flex items-center gap-2.5 mb-8">
        <span
          className="inline-flex items-center justify-center w-7 h-7 rounded-full text-white font-bold text-xs sm:text-sm shrink-0"
          style={{ backgroundColor: accentColor }}
          aria-hidden="true"
        >
          08
        </span>
        <h3 className="font-bold text-xl sm:text-2xl text-zinc-900 tracking-tight">
          The build roadmap
        </h3>
      </div>

      {/* Stage Tiles Grid */}
      <div className="relative">
        {/* Desktop Dashed Connecting Line behind tiles */}
        <div
          className="hidden lg:block absolute top-12 left-12 right-12 h-0 border-t-2 border-dashed border-zinc-300 -z-0 pointer-events-none"
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-6 relative z-10">
          {roadmap.map((stage, index) => {
            const isFirst = index === 0;

            return (
              <div
                key={index}
                className="flex flex-col justify-between bg-zinc-100/90 rounded-2xl p-6 sm:p-7 border border-zinc-200/70 shadow-xs relative transition-all duration-200 hover:shadow-md"
              >
                {/* Top Row: Numeral + Optional "Start today" Sticker */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-3xl sm:text-4xl font-black leading-none select-none tracking-tight"
                    style={{ color: accentColor }}
                  >
                    0{index + 1}
                  </span>

                  {isFirst && (
                    <StickerTag
                      text="Start today"
                      color="green"
                      rotation="rotate-[1deg]"
                      wobble={false}
                    />
                  )}
                </div>

                {/* Stage Title & Duration */}
                <div className="mb-4">
                  <h4 className="font-bold text-lg sm:text-xl text-zinc-900 leading-snug">
                    {stage.title}
                  </h4>
                  <span className="text-xs sm:text-sm text-zinc-500 font-medium block mt-1">
                    {stage.duration}
                  </span>
                </div>

                {/* Goal */}
                <p className="text-sm sm:text-base text-zinc-700 leading-relaxed mb-5">
                  <strong className="text-zinc-900 font-semibold">Goal:</strong>{' '}
                  {stage.goal}
                </p>

                {/* Tasks as bulleted list (not checkboxes) */}
                <div className="mb-6 flex-1">
                  <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-zinc-500 block mb-2">
                    Tasks
                  </span>
                  <ul className="space-y-2 list-disc pl-5 text-sm sm:text-base text-zinc-600 leading-normal">
                    {stage.tasks.map((task, taskIdx) => (
                      <li key={taskIdx}>{task}</li>
                    ))}
                  </ul>
                </div>

                {/* Done when: bold lead-in style */}
                <div className="pt-4 border-t border-zinc-200/80 mt-auto">
                  <p className="text-sm sm:text-base text-zinc-800 leading-relaxed">
                    <strong className="text-zinc-900 font-bold">Done when:</strong>{' '}
                    {stage.doneWhen}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
