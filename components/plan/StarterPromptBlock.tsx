'use client';

// components/plan/StarterPromptBlock.tsx
// AI Starter Prompt:
// - Title: "AI Starter Prompt" (NO icon next to section title)
// - Subtitle: "Paste this into Claude, ChatGPT, Cursor, or your AI tool of choice to start coding."
// - Preformatted dark code/prompt block with monospace text
// - One-click "Copy prompt" button with clear copied confirmation feedback

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface StarterPromptBlockProps {
  starterPrompt: string;
}

export default function StarterPromptBlock({
  starterPrompt,
}: StarterPromptBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(starterPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = starterPrompt;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <section className="w-full rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 bg-zinc-950 border border-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.25)] text-zinc-100">
      {/* HEADER ROW WITH TITLE & COPY BUTTON */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight font-display mb-1">
            AI Starter Prompt
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-normal">
            Paste this into Claude, ChatGPT, Cursor, or your AI tool of choice to start coding.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? 'Prompt copied to clipboard' : 'Copy prompt to clipboard'}
          className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-tight transition-all duration-300 cursor-pointer shrink-0 ${
            copied
              ? 'bg-[#2EAA7B] text-white shadow-[0_8px_20px_rgba(46,170,123,0.4)] scale-105'
              : 'bg-white hover:bg-zinc-100 text-zinc-950 hover:scale-105 active:scale-95 shadow-[0_4px_14px_rgba(255,255,255,0.15)]'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Copied to clipboard!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy prompt</span>
            </>
          )}
        </button>
      </div>

      {/* CODE / PROMPT BLOCK */}
      <div className="relative mt-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 p-4 sm:p-6 overflow-hidden">
        <pre className="font-mono text-xs sm:text-sm text-zinc-200 whitespace-pre-wrap break-words leading-relaxed select-all">
          {starterPrompt}
        </pre>
      </div>
    </section>
  );
}
