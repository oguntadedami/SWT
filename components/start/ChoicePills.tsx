'use client';

// components/start/ChoicePills.tsx
// Large, rounded selectable tiles for Step 3:
// - Each option has an illustrative icon
// - Selected tile features springy scale, vibrant orange accent, and glowing checkmark
// - Unselected tiles are clean near-white with subtle hover states
// - High-contrast keyboard accessibility with full radiogroup support

import React from 'react';
import {
  Check,
  AlertCircle,
  Sparkles,
  Compass,
  Zap,
  Terminal,
  Globe,
  Smartphone,
  Puzzle,
  FileText,
  HelpCircle,
  Coffee,
  Calendar,
  Rocket,
  Target,
  type LucideIcon,
} from 'lucide-react';

export interface ChoiceOption {
  label: string;
  icon?: LucideIcon;
  subtext?: string;
}

// Map standard labels to appropriate icons
const ICON_MAP: Record<string, LucideIcon> = {
  // Technical comfort
  None: Sparkles,
  Beginner: Compass,
  Comfortable: Zap,
  Advanced: Terminal,

  // What to build
  'Web app': Globe,
  'Mobile app': Smartphone,
  'Browser extension': Puzzle,
  'Template or digital product': FileText,
  'Not sure': HelpCircle,

  // Time available
  'A weekend': Coffee,
  '1 week': Calendar,
  '2-4 weeks': Rocket,
  '1-3 months': Target,
};

interface ChoicePillsProps {
  id: string;
  label: string;
  options: string[];
  selected: string;
  onSelect: (option: string) => void;
  required?: boolean;
  error?: string;
  helperText?: string;
}

export default function ChoicePills({
  id,
  label,
  options,
  selected,
  onSelect,
  required = false,
  error,
  helperText,
}: ChoicePillsProps) {
  const labelId = `${id}-label`;
  const errorId = error ? `${id}-error` : undefined;

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (index + 1) % options.length;
      onSelect(options[nextIndex]);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (index - 1 + options.length) % options.length;
      onSelect(options[prevIndex]);
    }
  };

    // Dynamic grid classes based on option count to maximize width and reduce vertical height
    const gridColsClass =
      options.length === 5
        ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-5'
        : options.length === 4
        ? 'grid-cols-2 md:grid-cols-4'
        : 'grid-cols-2 sm:grid-cols-3';

    return (
      <div className="w-full mb-4 sm:mb-5 text-left">
        <div className="flex items-baseline justify-between mb-1.5">
          <span id={labelId} className="text-sm sm:text-base font-bold text-stone-900 tracking-tight">
            {label}{' '}
            {required ? (
              <span className="text-[#FF5722] text-sm font-mono ml-0.5" title="Required">
                *
              </span>
            ) : null}
          </span>
        </div>

        {helperText && (
          <p className="text-xs sm:text-sm text-stone-600 mb-2 leading-relaxed font-medium">{helperText}</p>
        )}

        {/* Selectable Tiles Grid */}
        <div
          role="radiogroup"
          aria-labelledby={labelId}
          aria-describedby={errorId}
          className={`grid ${gridColsClass} gap-2 sm:gap-2.5`}
        >
          {options.map((option, index) => {
            const isSelected = selected === option;
            const Icon = ICON_MAP[option] || Sparkles;

            return (
              <button
                key={option}
                type="button"
                role="radio"
                aria-checked={isSelected}
                tabIndex={isSelected ? 0 : selected === '' && index === 0 ? 0 : -1}
                onClick={() => onSelect(option)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={`p-3 sm:p-3.5 rounded-2xl border-2 transition-all duration-200 select-none cursor-pointer flex items-center justify-between gap-2 text-left ${
                  isSelected
                    ? 'bg-orange-50/95 border-[#FF5722] text-[#FF5722] shadow-[0_6px_18px_rgba(255,87,34,0.22)] scale-[1.02]'
                    : 'bg-white hover:bg-stone-50/90 border-stone-200/90 hover:border-orange-200 text-stone-800 shadow-sm hover:shadow'
                } active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FF5722]/30 focus-visible:border-[#FF5722]`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-[#FF5722] text-white shadow-sm'
                        : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    <Icon className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <span
                    className={`font-bold text-xs sm:text-sm tracking-tight truncate ${
                      isSelected ? 'text-[#FF5722]' : 'text-stone-900'
                    }`}
                  >
                    {option}
                  </span>
                </div>

                {/* Checkmark or empty radio dot */}
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all ${
                    isSelected
                      ? 'bg-[#FF5722] text-white shadow-sm scale-100'
                      : 'border-2 border-stone-300 bg-white scale-90'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 text-white stroke-[3.5]" />}
                </div>
              </button>
            );
          })}
        </div>

      {/* Gentle inline error message */}
      {error && (
        <div
          id={errorId}
          role="alert"
          className="mt-2.5 inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-amber-900 bg-amber-50 border border-amber-200/80 px-3.5 py-1.5 rounded-full shadow-sm"
        >
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
