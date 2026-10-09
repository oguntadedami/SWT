'use client';

// components/plan/Dispatch.tsx
// Newspaper Front Page 09 The AI Starter Prompt:
// - Kicker "09 · The AI starter prompt", subtitle "The dispatch"
// - Lead-in line: "Paste this into your favorite AI tool to begin."
// - Dark ink-colored block (#1F2421 or #18181B) with thick double-rule border
// - Prompt text in cream in a readable monospace font with preserved line breaks
// - "Copy" button at top right of the block (solid orange pill, same behavior as COPY AI PROMPT)

import React from 'react';
import { Copy, Check } from 'lucide-react';

interface DispatchProps {
  starterPrompt: string;
  onCopyPrompt: () => void;
  isCopied: boolean;
  accentColor: string;
}

export default function Dispatch({
  starterPrompt,
  onCopyPrompt,
  isCopied,
  accentColor,
}: DispatchProps) {
  return (
    <section id="section-09" className="scroll-mt-24 my-12 text-left">
      {/* Section Header */}
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2 pb-2 border-b-2 border-stone-800">
        <span
          className="text-xs uppercase font-mono font-bold tracking-widest"
          style={{ color: accentColor }}
        >
          09 · The AI starter prompt
        </span>
        <span className="text-xs sm:text-sm font-serif italic text-stone-600">
          The dispatch
        </span>
      </div>

      {/* Short line above */}
      <p className="text-sm font-serif text-stone-700 italic mb-4">
        Paste this into your favorite AI tool to begin.
      </p>

      {/* Dark ink block with thick double-rule border */}
      <div className="relative rounded-2xl bg-[#18181B] border-4 border-double border-stone-800 p-5 sm:p-7 shadow-xl overflow-hidden">
        {/* Top Header inside the box */}
        <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-zinc-800">
          <span className="text-xs font-mono font-bold tracking-wider uppercase text-zinc-400">
            Prompt specification · v1.0
          </span>

          {/* Solid orange pill Copy button */}
          <button
            type="button"
            onClick={onCopyPrompt}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FF4F24] hover:bg-[#E53E14] active:bg-[#CC340D] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4F24]"
          >
            {isCopied ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>COPIED!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Monospace Prompt Text in Cream */}
        <pre className="font-mono text-xs sm:text-sm text-[#FBF9F5] leading-relaxed whitespace-pre-wrap break-words overflow-x-auto select-all">
          {starterPrompt}
        </pre>
      </div>
    </section>
  );
}
