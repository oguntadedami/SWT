'use client';

// components/ready/ReadyPanel.tsx
// Central Frosted Panel for /ready:
// - White at ~92% opacity, backdrop blur, 32px radius, layered soft shadow, max-width ~640px
// - Summary line: "You're building <product name> with <tool names>."
// - Three numbered steps with solid logo color number circles (red, blue, green):
//     1. "Copy your starter prompt": "Paste it into your favorite AI tool."
//     2. "Start with <first roadmap stage title>": "<its duration>. That's your only job for now."
//     3. "Keep your plan handy": "Download it so you can refer back to it."
// - Uses real plan data for step 2

import React from 'react';
import { BuildPlan } from '@/lib/plan';

interface ReadyPanelProps {
  plan: BuildPlan;
}

export default function ReadyPanel({ plan }: ReadyPanelProps) {
  const toolNames = plan.toolStack.map((t) => t.name).join(', ');
  const firstStage = plan.roadmap[0];
  const firstStageTitle = firstStage?.title || 'Stage 1';
  const firstStageDuration = firstStage?.duration || '1-2 days';

  return (
    <div className="w-full max-w-[640px] mx-auto rounded-[32px] bg-white/92 backdrop-blur-2xl border border-white/80 p-6 sm:p-9 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.16),0_2px_12px_rgba(0,0,0,0.06)] text-zinc-900 text-left selection:bg-[#FF4F24] selection:text-white">
      {/* First line: Product name and tool stack */}
      <p className="text-base sm:text-lg text-zinc-800 leading-relaxed pb-6 mb-7 border-b border-zinc-200/80">
        You&apos;re building <strong className="font-bold text-zinc-950">{plan.productName}</strong> with{' '}
        <span className="font-medium text-zinc-800">{toolNames}</span>.
      </p>

      {/* Three numbered steps */}
      <div className="space-y-6 sm:space-y-7">
        {/* Step 1: Red circle (#FF4F24) */}
        <div className="flex items-start gap-3.5 sm:gap-4">
          <span
            className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FF4F24] text-white font-bold text-xs sm:text-sm shrink-0 shadow-xs mt-0.5"
            aria-hidden="true"
          >
            1
          </span>
          <div className="flex-1 min-w-0">
            <h2 className="font-bold text-base sm:text-lg text-zinc-900 leading-snug">
              Copy your starter prompt
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 leading-normal mt-1">
              Paste it into your favorite AI tool.
            </p>
          </div>
        </div>

        {/* Step 2: Blue circle (#327AE6) with real plan data */}
        <div className="flex items-start gap-3.5 sm:gap-4">
          <span
            className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#327AE6] text-white font-bold text-xs sm:text-sm shrink-0 shadow-xs mt-0.5"
            aria-hidden="true"
          >
            2
          </span>
          <div className="flex-1 min-w-0">
            <h2 className="font-bold text-base sm:text-lg text-zinc-900 leading-snug">
              Start with {firstStageTitle}
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 leading-normal mt-1">
              {firstStageDuration}. That&apos;s your only job for now.
            </p>
          </div>
        </div>

        {/* Step 3: Green circle (#2EAA7B) */}
        <div className="flex items-start gap-3.5 sm:gap-4">
          <span
            className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#2EAA7B] text-white font-bold text-xs sm:text-sm shrink-0 shadow-xs mt-0.5"
            aria-hidden="true"
          >
            3
          </span>
          <div className="flex-1 min-w-0">
            <h2 className="font-bold text-base sm:text-lg text-zinc-900 leading-snug">
              Keep your plan handy
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 leading-normal mt-1">
              Download it so you can refer back to it.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
