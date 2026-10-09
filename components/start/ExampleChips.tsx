'use client';

// components/start/ExampleChips.tsx
// Playful, colorful sticker-style example chips:
// - Different bright color for each chip
// - Subtle rotation for a physical sticker aesthetic
// - Small icons next to each label
// - Gentle hover lift and springy "pop" when tapped
// - Appends text to field with clean comma separation without exceeding limit

import React from 'react';
import type { LucideIcon } from 'lucide-react';

export interface ChipConfig {
  text: string;
  icon?: LucideIcon;
  badgeBg: string;
  textColor: string;
  borderColor: string;
  rotation: string;
}

interface ExampleChipsProps {
  chips: ChipConfig[];
  currentValue: string;
  onAppend: (newValue: string) => void;
  maxLength: number;
}

export default function ExampleChips({
  chips,
  currentValue,
  onAppend,
  maxLength,
}: ExampleChipsProps) {
  const handleChipClick = (chipText: string) => {
    const trimmed = (currentValue || '').trim();
    let nextValue = '';

    if (!trimmed) {
      nextValue = chipText;
    } else {
      const base = trimmed.replace(/,\s*$/, '');
      nextValue = `${base}, ${chipText}`;
    }

    if (nextValue.length <= maxLength) {
      onAppend(nextValue);
    }
  };

  return (
    <div className="mt-3">
      <div className="flex items-center gap-1.5 mb-2 text-xs font-mono font-bold text-stone-500 uppercase tracking-wider">
        <span>Tap to add:</span>
      </div>

      <div className="flex flex-wrap gap-2.5 items-center">
        {chips.map((chip) => {
          const trimmed = (currentValue || '').trim();
          const candidateLength = !trimmed
            ? chip.text.length
            : trimmed.replace(/,\s*$/, '').length + 2 + chip.text.length;
          const wouldExceed = candidateLength > maxLength;
          const Icon = chip.icon;

          return (
            <button
              key={chip.text}
              type="button"
              disabled={wouldExceed}
              onClick={() => handleChipClick(chip.text)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold border shadow-sm transition-all duration-200 select-none cursor-pointer transform rotate-0 ${
                chip.badgeBg
              } ${chip.textColor} ${chip.borderColor} ${
                wouldExceed
                  ? 'opacity-40 cursor-not-allowed filter grayscale'
                  : 'hover:-translate-y-1 hover:scale-105 hover:shadow-md active:scale-95 active:rotate-0'
              } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5722]`}
            >
              {Icon && <Icon className="w-3.5 h-3.5 shrink-0 stroke-[2.5]" />}
              <span>+ {chip.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
