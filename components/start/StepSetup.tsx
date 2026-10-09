'use client';

// components/start/StepSetup.tsx
// Step 3: "Your setup"
// Redesigned for a calm, clear, and uncrowded experience:
// - Question 1: "How much tech experience do you have?" (Joined segmented control: 4 segments, 2x2 on mobile)
// - Question 2: "What do you want to build?" (Wrapping rounded category chips, never truncated)
// - Question 3: "How much time can you give it?" (Joined segmented control: 4 segments, 2x2 on mobile)
// - Selected state: ONE signal only - solid orange fill with white text
// - Unselected state: plain white with thin neutral border and dark text
// - Plain-language description under questions 1 and 3 for the selected option
// - No asterisks, no radio dots, no check marks, no icons
// - At least 32px spacing between questions with large bold labels
// - Quick 150ms springy scale selection animation (respects prefers-reduced-motion)
// - Full radiogroup keyboard accessibility with arrow keys

import React from 'react';

// Ordered scales
const TECH_EXPERIENCE_OPTIONS = ['None', 'Beginner', 'Comfortable', 'Advanced'];

const TECH_EXPERIENCE_DESCRIPTIONS: Record<string, string> = {
  None: "I've never built anything with code or tools like this.",
  Beginner: "I've tried a little, and I'm learning.",
  Comfortable: "I've built a few things.",
  Advanced: "I build things regularly.",
};

// Categories: map "Digital product" display label to "Template or digital product" stored value
const BUILD_TYPE_OPTIONS = [
  { label: 'Web app', value: 'Web app' },
  { label: 'Mobile app', value: 'Mobile app' },
  { label: 'Browser extension', value: 'Browser extension' },
  { label: 'Digital product', value: 'Template or digital product' },
  { label: 'Not sure', value: 'Not sure' },
];

// Ordered scale
const TIME_AVAILABLE_OPTIONS = ['A weekend', '1 week', '2-4 weeks', '1-3 months'];

const TIME_AVAILABLE_DESCRIPTIONS: Record<string, string> = {
  'A weekend': 'Two days or so.',
  '1 week': 'A few evenings or a free week.',
  '2-4 weeks': 'A steady pace over a few weeks.',
  '1-3 months': 'A longer project at a comfortable pace.',
};

interface StepSetupProps {
  technicalComfort: string;
  buildType: string;
  timeAvailable: string;
  errors: {
    technicalComfort?: string;
    buildType?: string;
    timeAvailable?: string;
  };
  onChange: (field: 'technicalComfort' | 'buildType' | 'timeAvailable', value: string) => void;
}

export default function StepSetup({
  technicalComfort,
  buildType,
  timeAvailable,
  errors,
  onChange,
}: StepSetupProps) {
  // Arrow key navigation for Question 1
  const handleTechKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const next = (index + 1) % TECH_EXPERIENCE_OPTIONS.length;
      onChange('technicalComfort', TECH_EXPERIENCE_OPTIONS[next]);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = (index - 1 + TECH_EXPERIENCE_OPTIONS.length) % TECH_EXPERIENCE_OPTIONS.length;
      onChange('technicalComfort', TECH_EXPERIENCE_OPTIONS[prev]);
    }
  };

  // Arrow key navigation for Question 2
  const handleBuildTypeKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const next = (index + 1) % BUILD_TYPE_OPTIONS.length;
      onChange('buildType', BUILD_TYPE_OPTIONS[next].value);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = (index - 1 + BUILD_TYPE_OPTIONS.length) % BUILD_TYPE_OPTIONS.length;
      onChange('buildType', BUILD_TYPE_OPTIONS[prev].value);
    }
  };

  // Arrow key navigation for Question 3
  const handleTimeKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const next = (index + 1) % TIME_AVAILABLE_OPTIONS.length;
      onChange('timeAvailable', TIME_AVAILABLE_OPTIONS[next]);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = (index - 1 + TIME_AVAILABLE_OPTIONS.length) % TIME_AVAILABLE_OPTIONS.length;
      onChange('timeAvailable', TIME_AVAILABLE_OPTIONS[prev]);
    }
  };

  return (
    <div className="space-y-8 sm:space-y-9 text-left">
      {/* ============================================================ */}
      {/* QUESTION 1: How much tech experience do you have?             */}
      {/* Single joined segmented control (4 segments, 2x2 on mobile)   */}
      {/* ============================================================ */}
      <div>
        <label
          id="q1-label"
          className="text-base sm:text-lg md:text-xl font-extrabold text-stone-900 tracking-tight block mb-2.5 sm:mb-3"
        >
          How much tech experience do you have?
        </label>

        {/* Joined Segmented Control Container */}
        <div
          role="radiogroup"
          aria-labelledby="q1-label"
          aria-describedby={errors.technicalComfort ? 'q1-error' : undefined}
          className="rounded-2xl sm:rounded-full bg-stone-100 p-1 sm:p-1.5 border border-stone-200 grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-1.5"
        >
          {TECH_EXPERIENCE_OPTIONS.map((opt, idx) => {
            const isSelected = technicalComfort === opt;

            return (
              <button
                key={opt}
                type="button"
                role="radio"
                aria-checked={isSelected}
                tabIndex={isSelected ? 0 : !technicalComfort && idx === 0 ? 0 : -1}
                onClick={() => onChange('technicalComfort', opt)}
                onKeyDown={(e) => handleTechKeyDown(e, idx)}
                className={`w-full py-2.5 sm:py-3 px-3 rounded-xl sm:rounded-full text-sm sm:text-base text-center transition-all duration-150 select-none cursor-pointer whitespace-nowrap motion-reduce:transition-none motion-reduce:transform-none ${
                  isSelected
                    ? 'bg-[#FF5722] text-white font-bold border border-[#FF5722] shadow-[0_2px_8px_rgba(255,87,34,0.3)] scale-[1.02] sm:scale-[1.03]'
                    : 'bg-white border border-stone-200 text-stone-800 font-semibold hover:border-stone-300 hover:text-stone-900 shadow-sm'
                } active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5722] focus-visible:ring-offset-2`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {/* Plain-language description under selected option */}
        <div aria-live="polite" className="mt-2.5 min-h-[1.25rem] text-xs sm:text-sm text-stone-500 font-medium pl-1">
          {technicalComfort ? TECH_EXPERIENCE_DESCRIPTIONS[technicalComfort] : ''}
        </div>

        {/* Inline validation error if submitted empty */}
        {errors.technicalComfort && (
          <p
            id="q1-error"
            role="alert"
            className="mt-2 text-xs sm:text-sm font-semibold text-amber-900 bg-amber-50 border border-amber-200/80 px-3.5 py-1.5 rounded-full inline-block"
          >
            {errors.technicalComfort}
          </p>
        )}
      </div>

      {/* ============================================================ */}
      {/* QUESTION 2: What do you want to build?                       */}
      {/* Wrapping rounded category chips (never truncate)              */}
      {/* ============================================================ */}
      <div>
        <label
          id="q2-label"
          className="text-base sm:text-lg md:text-xl font-extrabold text-stone-900 tracking-tight block mb-2.5 sm:mb-3"
        >
          What do you want to build?
        </label>

        {/* Category Chips Container */}
        <div
          role="radiogroup"
          aria-labelledby="q2-label"
          aria-describedby={errors.buildType ? 'q2-error' : undefined}
          className="flex flex-wrap gap-2.5 sm:gap-3 items-center"
        >
          {BUILD_TYPE_OPTIONS.map((item, idx) => {
            const isSelected = buildType === item.value;

            return (
              <button
                key={item.label}
                type="button"
                role="radio"
                aria-checked={isSelected}
                tabIndex={isSelected ? 0 : !buildType && idx === 0 ? 0 : -1}
                onClick={() => onChange('buildType', item.value)}
                onKeyDown={(e) => handleBuildTypeKeyDown(e, idx)}
                className={`rounded-full px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-base transition-all duration-150 select-none cursor-pointer whitespace-nowrap motion-reduce:transition-none motion-reduce:transform-none ${
                  isSelected
                    ? 'bg-[#FF5722] text-white font-bold border border-[#FF5722] shadow-[0_2px_8px_rgba(255,87,34,0.3)] scale-[1.03]'
                    : 'bg-white border border-stone-200 text-stone-800 font-semibold hover:border-stone-300 hover:text-stone-900 shadow-sm'
                } active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5722] focus-visible:ring-offset-2`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Inline validation error if submitted empty */}
        {errors.buildType && (
          <p
            id="q2-error"
            role="alert"
            className="mt-2 text-xs sm:text-sm font-semibold text-amber-900 bg-amber-50 border border-amber-200/80 px-3.5 py-1.5 rounded-full inline-block"
          >
            {errors.buildType}
          </p>
        )}
      </div>

      {/* ============================================================ */}
      {/* QUESTION 3: How much time can you give it?                   */}
      {/* Single joined segmented control (4 segments, 2x2 on mobile)   */}
      {/* ============================================================ */}
      <div>
        <label
          id="q3-label"
          className="text-base sm:text-lg md:text-xl font-extrabold text-stone-900 tracking-tight block mb-2.5 sm:mb-3"
        >
          How much time can you give it?
        </label>

        {/* Joined Segmented Control Container */}
        <div
          role="radiogroup"
          aria-labelledby="q3-label"
          aria-describedby={errors.timeAvailable ? 'q3-error' : undefined}
          className="rounded-2xl sm:rounded-full bg-stone-100 p-1 sm:p-1.5 border border-stone-200 grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-1.5"
        >
          {TIME_AVAILABLE_OPTIONS.map((opt, idx) => {
            const isSelected = timeAvailable === opt;

            return (
              <button
                key={opt}
                type="button"
                role="radio"
                aria-checked={isSelected}
                tabIndex={isSelected ? 0 : !timeAvailable && idx === 0 ? 0 : -1}
                onClick={() => onChange('timeAvailable', opt)}
                onKeyDown={(e) => handleTimeKeyDown(e, idx)}
                className={`w-full py-2.5 sm:py-3 px-3 rounded-xl sm:rounded-full text-sm sm:text-base text-center transition-all duration-150 select-none cursor-pointer whitespace-nowrap motion-reduce:transition-none motion-reduce:transform-none ${
                  isSelected
                    ? 'bg-[#FF5722] text-white font-bold border border-[#FF5722] shadow-[0_2px_8px_rgba(255,87,34,0.3)] scale-[1.02] sm:scale-[1.03]'
                    : 'bg-white border border-stone-200 text-stone-800 font-semibold hover:border-stone-300 hover:text-stone-900 shadow-sm'
                } active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5722] focus-visible:ring-offset-2`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {/* Plain-language description under selected option */}
        <div aria-live="polite" className="mt-2.5 min-h-[1.25rem] text-xs sm:text-sm text-stone-500 font-medium pl-1">
          {timeAvailable ? TIME_AVAILABLE_DESCRIPTIONS[timeAvailable] : ''}
        </div>

        {/* Inline validation error if submitted empty */}
        {errors.timeAvailable && (
          <p
            id="q3-error"
            role="alert"
            className="mt-2 text-xs sm:text-sm font-semibold text-amber-900 bg-amber-50 border border-amber-200/80 px-3.5 py-1.5 rounded-full inline-block"
          >
            {errors.timeAvailable}
          </p>
        )}
      </div>
    </div>
  );
}
