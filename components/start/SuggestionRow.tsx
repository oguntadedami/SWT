'use client';

// components/start/SuggestionRow.tsx
// Suggestion sticker row directly under TagInput:
// - No caption
// - Keeps sticker style: color, slight rotation, "+" prefix
// - No icons inside suggestion pills
// - Strong focus rings and accessible labels ("Add <tag>")
// - Smooth shrink-out animation on tap, instant with prefers-reduced-motion

import React, { useState } from 'react';
import { TagColorStyle } from './TagChip';

export interface TagSuggestion extends TagColorStyle {
  text: string;
  rotation?: string;
}

interface SuggestionRowProps {
  suggestions: TagSuggestion[];
  onSelect: (suggestion: TagSuggestion) => void;
  disabled?: boolean;
}

export default function SuggestionRow({
  suggestions,
  onSelect,
  disabled = false,
}: SuggestionRowProps) {
  const [tappingText, setTappingText] = useState<string | null>(null);

  if (suggestions.length === 0) {
    return null;
  }

  const handleSelect = (s: TagSuggestion) => {
    if (disabled) return;
    setTappingText(s.text);
    // Quick pop/shrink before adding
    setTimeout(() => {
      onSelect(s);
      setTappingText(null);
    }, 80);
  };

  return (
    <div className="flex flex-wrap gap-2 items-center mt-2.5">
      {suggestions.map((suggestion) => {
        const isTapping = tappingText === suggestion.text;
        // Suggestions sit straight upright (rotate-0), can float slightly on hover
        const rotationClass = 'rotate-0';

        return (
          <button
            key={suggestion.text}
            type="button"
            disabled={disabled}
            onClick={() => handleSelect(suggestion)}
            aria-label={`Add ${suggestion.text}`}
            className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold border shadow-sm transition-all duration-180 select-none cursor-pointer transform motion-reduce:transition-none motion-reduce:transform-none ${
              suggestion.badgeBg
            } ${suggestion.textColor} ${suggestion.borderColor} ${rotationClass} ${
              isTapping ? 'scale-75 opacity-0' : 'hover:-translate-y-0.5 hover:shadow-md active:scale-95'
            } ${disabled ? 'opacity-40 cursor-not-allowed' : ''} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5722] focus-visible:ring-offset-1`}
          >
            <span>+ {suggestion.text}</span>
          </button>
        );
      })}
    </div>
  );
}
