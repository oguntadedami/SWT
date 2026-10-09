'use client';

// components/plan/StickerTag.tsx
// Playful physical sticker tag for the Build Plan screen:
// - Rounded rectangle with bold typography matching the landing page aesthetic
// - Gentle rotation (1 to 3 degrees)
// - Gentle wobble and scale on hover with motion-reduction fallback
// - Supports logo color palette: red (#FF4F24), blue (#327AE6), green (#2EAA7B), ink (#1F2421), gray (#E4E4E7)

import React from 'react';

export type StickerColor = 'red' | 'blue' | 'green' | 'ink' | 'gray' | 'accent';

interface StickerTagProps {
  label?: string;
  value?: string;
  text?: string;
  color?: StickerColor;
  rotation?: string;
  className?: string;
  wobble?: boolean;
}

const COLOR_MAP: Record<StickerColor, { bg: string; text: string; border: string }> = {
  red: {
    bg: 'bg-[#FF4F24]',
    text: 'text-white',
    border: 'border-[#E53E14]/40',
  },
  blue: {
    bg: 'bg-[#327AE6]',
    text: 'text-white',
    border: 'border-[#2668C9]/40',
  },
  green: {
    bg: 'bg-[#2EAA7B]',
    text: 'text-white',
    border: 'border-[#228C63]/40',
  },
  ink: {
    bg: 'bg-[#1F2421]',
    text: 'text-white',
    border: 'border-black/50',
  },
  gray: {
    bg: 'bg-zinc-200',
    text: 'text-zinc-700',
    border: 'border-zinc-300',
  },
  accent: {
    bg: 'bg-[var(--accent,#FF4F24)]',
    text: 'text-white',
    border: 'border-black/20',
  },
};

export default function StickerTag({
  label,
  value,
  text,
  color = 'ink',
  rotation = 'rotate-0',
  className = '',
  wobble = true,
}: StickerTagProps) {
  const styles = COLOR_MAP[color] || COLOR_MAP.ink;

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-2xl border shadow-[0_6px_16px_rgba(0,0,0,0.18)] select-none transition-transform duration-200 ${
        wobble
          ? 'hover:rotate-0 hover:scale-105 active:scale-95 motion-reduce:hover:transform-none'
          : ''
      } ${rotation} ${styles.bg} ${styles.text} ${styles.border} ${className}`}
    >
      {label && (
        <span className="text-xs sm:text-sm font-medium opacity-90 tracking-normal">
          {label}:
        </span>
      )}
      {value && (
        <span className="text-xs sm:text-sm font-bold tracking-tight">
          {value}
        </span>
      )}
      {text && (
        <span className="text-xs sm:text-sm font-bold tracking-tight">
          {text}
        </span>
      )}
    </div>
  );
}
