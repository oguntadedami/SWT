'use client';

// components/plan/PullQuote.tsx
// Newspaper Front Page Pull Quote:
// - Selected idea's whyFitsYou text in large serif italic
// - Oversized opening and closing quotation marks in the accent color
// - Small caption "On why this fits you."
// - If whyFitsYou is missing, omit the quote.

import React from 'react';

interface PullQuoteProps {
  whyFitsYou?: string;
  accentColor: string;
}

export default function PullQuote({ whyFitsYou, accentColor }: PullQuoteProps) {
  if (!whyFitsYou) return null;

  return (
    <figure className="pt-4 pb-2 border-t border-stone-300 text-left">
      <div className="relative pl-6 pr-4">
        {/* Oversized Opening Quotation Mark */}
        <span
          className="absolute -top-4 -left-1 text-6xl sm:text-7xl font-serif font-bold leading-none select-none opacity-80"
          style={{ color: accentColor }}
          aria-hidden="true"
        >
          “
        </span>

        {/* Pull Quote Text in Serif Italic */}
        <blockquote className="text-xl sm:text-2xl font-serif italic text-stone-900 leading-snug">
          {whyFitsYou}
          {/* Closing Quotation Mark */}
          <span
            className="inline-block text-4xl sm:text-5xl font-serif font-bold leading-none ml-1 select-none"
            style={{ color: accentColor }}
            aria-hidden="true"
          >
            ”
          </span>
        </blockquote>
      </div>

      {/* Small Caption */}
      <figcaption className="mt-3 pl-6 text-xs uppercase tracking-widest font-mono font-bold text-stone-500">
        On why this fits you.
      </figcaption>
    </figure>
  );
}
