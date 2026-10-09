'use client';

// components/start/TagChip.tsx
// Individual rounded pill chip for TagInput:
// - Suggestion chips keep their suggestion colors
// - User-typed chips use neutral ink-dark styling (bg-zinc-800 text-white)
// - No icons inside chips in the field
// - Small × remove button with touch target of at least 32px
// - Accessible name "Remove <tag text>"
// - Pulses if duplicate attempted
// - Smooth quick springy pop-in (~180ms) and fade-out (~140ms), respects prefers-reduced-motion

import React from 'react';
import { X } from 'lucide-react';

export interface TagColorStyle {
  badgeBg: string;
  textColor: string;
  borderColor: string;
}

interface TagChipProps {
  text: string;
  onRemove: () => void;
  colorStyle?: TagColorStyle | null;
  isPulsing?: boolean;
}

export default function TagChip({
  text,
  onRemove,
  colorStyle,
  isPulsing = false,
}: TagChipProps) {
  // Use suggestion color if available, otherwise neutral ink-dark pill
  const isSuggestion = Boolean(colorStyle);
  const colorClasses = isSuggestion && colorStyle
    ? `${colorStyle.badgeBg} ${colorStyle.textColor} ${colorStyle.borderColor} border`
    : 'bg-zinc-800 text-zinc-50 border border-zinc-700/80 shadow-sm';

  const removeBtnColor = isSuggestion && colorStyle
    ? 'hover:bg-black/10 text-current'
    : 'hover:bg-white/20 text-zinc-300 hover:text-white';

  return (
    <li
      role="listitem"
      className={`inline-flex items-center gap-1.5 pl-3 pr-1.5 py-1 rounded-full text-xs sm:text-sm font-semibold select-none transition-all duration-200 transform motion-reduce:transition-none ${
        isPulsing
          ? 'scale-110 ring-2 ring-amber-500 shadow-md animate-pulse'
          : 'scale-100'
      } ${colorClasses}`}
      style={{
        animation: 'tagPop 180ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <span className="truncate max-w-[240px] tracking-tight">{text}</span>

      {/* Small × remove button with comfortable touch target (>= 32px) */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        aria-label={`Remove ${text}`}
        className={`relative inline-flex items-center justify-center w-5 h-5 rounded-full transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5722] ${removeBtnColor} before:absolute before:-inset-2 before:content-['']`}
      >
        <X className="w-3 h-3 stroke-[2.5]" aria-hidden="true" />
      </button>

      <style jsx>{`
        @keyframes tagPop {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          li {
            animation: none !important;
          }
        }
      `}</style>
    </li>
  );
}
