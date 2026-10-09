'use client';

// components/plan/PromptBlock.tsx
// Section 09: The AI starter prompt
// - Heading (h3): 09 The AI starter prompt
// - Helper line: "Paste this into your favorite AI tool to begin."
// - Dark deep-blue rounded block with light monospace text, preserved line breaks
// - Small orange pill "Copy" at top right with visual confirmation

import React from 'react';
import { Copy, Check } from 'lucide-react';

interface PromptBlockProps {
  prompt: string;
  accentColor: string;
  isCopied: boolean;
  onCopyPrompt: () => void;
}

export default function PromptBlock({
  prompt,
  accentColor,
  isCopied,
  onCopyPrompt,
}: PromptBlockProps) {
  return (
    <div className="flex flex-col">
      {/* Heading (h3) */}
      <div className="flex items-center gap-2.5 mb-2">
        <span
          className="inline-flex items-center justify-center w-7 h-7 rounded-full text-white font-bold text-xs sm:text-sm shrink-0"
          style={{ backgroundColor: accentColor }}
          aria-hidden="true"
        >
          09
        </span>
        <h3 className="font-bold text-xl sm:text-2xl text-zinc-900 tracking-tight">
          The AI starter prompt
        </h3>
      </div>

      {/* Helper text line */}
      <p className="text-sm sm:text-base text-zinc-600 mb-4 font-normal">
        Paste this into your favorite AI tool to begin.
      </p>

      {/* Dark deep-blue rounded block with light monospace text */}
      <div className="relative rounded-2xl bg-[#0B1320] border border-white/10 p-5 sm:p-7 shadow-xl overflow-hidden group">
        {/* Copy button in top-right corner */}
        <div className="flex justify-end mb-3 sm:mb-2">
          <button
            type="button"
            onClick={onCopyPrompt}
            aria-label="Copy prompt to clipboard"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FF4F24] hover:bg-[#E53E14] active:bg-[#CC340D] text-white font-bold text-xs sm:text-sm tracking-wider uppercase shadow-md transition-all duration-150 active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {isCopied ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>COPIED</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 stroke-[2.2]" />
                <span>COPY</span>
              </>
            )}
          </button>
        </div>

        {/* Monospace Prompt Content (preserved line breaks and wrapping) */}
        <pre className="font-mono text-xs sm:text-sm leading-relaxed text-zinc-200 whitespace-pre-wrap break-words select-text m-0 overflow-x-auto">
          {prompt}
        </pre>
      </div>
    </div>
  );
}
