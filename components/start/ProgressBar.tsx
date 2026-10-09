'use client';

// components/start/ProgressBar.tsx
// Sleek Liquid Glass Status Capsule Stepper:
// - Unified floating pill capsule with frosted glass material
// - Step counter badge ("Step X/3")
// - 3 micro fluid liquid tracks with smooth orange animated fill
// - Active step indicator label with subtle pulse dot
// - Clean, calm, and compact: replaces the clunky separate orange buttons

import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps?: number;
}

const STEPS = [
  { step: 1, name: 'Skills' },
  { step: 2, name: 'Interests' },
  { step: 3, name: 'Setup' },
];

export default function ProgressBar({ currentStep, totalSteps = 3 }: ProgressBarProps) {
  const currentStepObj = STEPS.find((s) => s.step === currentStep) || STEPS[0];

  return (
    <div
      role="progressbar"
      aria-label="Form progress"
      aria-valuenow={currentStep}
      aria-valuemin={1}
      aria-valuemax={totalSteps}
      aria-valuetext={`Step ${currentStep} of ${totalSteps}: ${currentStepObj.name}`}
      className="w-full flex justify-center mb-5 sm:mb-6 select-none"
    >
      <div className="inline-flex items-center gap-2 sm:gap-3 bg-white/85 sm:bg-white/90 backdrop-blur-xl border border-white/95 rounded-full py-1.5 sm:py-2 px-3.5 sm:px-4.5 shadow-[0_8px_24px_rgba(15,23,42,0.08),inset_0_1px_2px_rgba(255,255,255,1)]">
        {/* Step indicator badge */}
        <span className="text-[11px] sm:text-xs font-mono font-bold tracking-wider uppercase text-stone-500 whitespace-nowrap">
          <span className="hidden sm:inline">Step </span>
          {currentStep}/{totalSteps}
        </span>

        {/* Subtle divider */}
        <span className="h-3 w-px bg-stone-300/80 shrink-0" aria-hidden="true" />

        {/* 3 Fluid Micro-Tracks */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {STEPS.map((s) => {
            const isCompleted = currentStep > s.step;
            const isActive = currentStep === s.step;

            return (
              <div
                key={s.step}
                className="relative h-1.5 sm:h-2 w-8 sm:w-12 rounded-full overflow-hidden bg-stone-200/90"
              >
                <div
                  className={`h-full rounded-full transition-all duration-300 ease-out motion-reduce:transition-none ${
                    isCompleted
                      ? 'w-full bg-[#FF5722]'
                      : isActive
                      ? 'w-full bg-gradient-to-r from-[#FF5722] to-[#FF7043] shadow-[0_0_8px_rgba(255,87,34,0.45)]'
                      : 'w-0 bg-[#FF5722]'
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* Subtle divider */}
        <span className="h-3 w-px bg-stone-300/80 shrink-0" aria-hidden="true" />

        {/* Current Step Name */}
        <div className="flex items-center gap-1.5 whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722] animate-pulse" aria-hidden="true" />
          <span className="text-xs sm:text-sm font-bold text-stone-900 tracking-tight">
            {currentStepObj.name}
          </span>
        </div>
      </div>
    </div>
  );
}
