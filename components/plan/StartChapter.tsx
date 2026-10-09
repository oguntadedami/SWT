'use client';

// components/plan/StartChapter.tsx
// Chapter 3: THE START (id="chapter-start")
// - One frosted panel with three blocks separated by hairlines:
//     * Block 1: 07 The tool stack (ToolRows)
//     * Block 2: 08 The build roadmap (StageTiles)
//     * Block 3: 09 The AI starter prompt (PromptBlock)

import React from 'react';
import { BuildPlan } from '@/lib/plan';
import ChapterPanel from './ChapterPanel';
import ToolRows from './ToolRows';
import StageTiles from './StageTiles';
import PromptBlock from './PromptBlock';

interface StartChapterProps {
  plan: BuildPlan;
  accentColor: string;
  isCopied: boolean;
  onCopyPrompt: () => void;
}

export default function StartChapter({
  plan,
  accentColor,
  isCopied,
  onCopyPrompt,
}: StartChapterProps) {
  return (
    <ChapterPanel
      id="chapter-start"
      partText="Part 3 of 3"
      partColor="green"
      title="THE START"
    >
      <div className="flex flex-col space-y-12 sm:space-y-14 divide-y divide-zinc-200/80">
        {/* Block 1: 07 The tool stack */}
        <div>
          <ToolRows tools={plan.toolStack} accentColor={accentColor} />
        </div>

        {/* Block 2: 08 The build roadmap */}
        <div className="pt-12 sm:pt-14">
          <StageTiles roadmap={plan.roadmap} accentColor={accentColor} />
        </div>

        {/* Block 3: 09 The AI starter prompt */}
        <div className="pt-12 sm:pt-14">
          <PromptBlock
            prompt={plan.starterPrompt}
            accentColor={accentColor}
            isCopied={isCopied}
            onCopyPrompt={onCopyPrompt}
          />
        </div>
      </div>
    </ChapterPanel>
  );
}
