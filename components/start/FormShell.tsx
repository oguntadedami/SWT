'use client';

// components/start/FormShell.tsx
// Playful, bright, alive layout matching the landing page visual world:
// - Full-screen hero photo (/photos/hero.webp) with soft light wash (NO dark navy)
// - Slow, soft cloud-like drifts using transform animation only
// - Huge, heavy white uppercase headline with warm white subtitle above the panel
// - Bright frosted glass panel with high opacity, rounded-3xl corners, and layered shadow
// - Three pill-shaped progress segments labeled with step names
// - Hand-drawn doodles (zigzag, squiggle) gently drifting around the panel
// - 300ms directional slide & fade between steps (respects prefers-reduced-motion)
// - Bright orange action pills with hover lift and press effect
// - Mobile-first sticky bottom bar above safe area

import React from 'react';
import Link from 'next/link';
import ProgressBar from './ProgressBar';
import { BrandMarkSvg } from '../BrandLogo';
import FormBackground from '../FormBackground';

interface FormShellProps {
  currentStep: number;
  direction: 'forward' | 'backward';
  totalSteps?: number;
  onBack: () => void;
  onSubmit: () => void;
  children: React.ReactNode;
}

export default function FormShell({
  currentStep,
  direction,
  totalSteps = 3,
  onBack,
  onSubmit,
  children,
}: FormShellProps) {
  const isFinalStep = currentStep === totalSteps;
  const submitLabel = isFinalStep ? 'FIND MY IDEAS' : 'Continue';

  return (
    <div className="relative min-h-screen text-stone-900 flex flex-col justify-between selection:bg-[#FF5722] selection:text-white overflow-x-hidden">
      {/* FULL-SCREEN HERO PHOTO BACKGROUND & SOFT CLOUD DRIFTS */}
      <FormBackground />

      {/* 3. TOP NAVIGATION HEADER: Back Button & Logo Mark */}
      <header className="w-full max-w-4xl lg:max-w-5xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 pb-2 sm:pb-3 flex items-center justify-between relative z-20">
        <button
          type="button"
          onClick={onBack}
          aria-label={currentStep === 1 ? 'Back to home' : 'Back to previous step'}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.45)] hover:text-white/90 bg-black/20 hover:bg-black/30 backdrop-blur-md py-2 px-3.5 rounded-full border border-white/30 transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5722]"
        >
          <span aria-hidden="true">←</span>
          <span>{currentStep === 1 ? 'Home' : 'Back'}</span>
        </button>

        <Link
          href="/"
          aria-label="Start With This home"
          className="flex items-center gap-2 group bg-white/25 hover:bg-white/40 backdrop-blur-md p-2 rounded-full border border-white/40 shadow-sm transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5722]"
        >
          <BrandMarkSvg size={30} />
        </Link>
      </header>

      {/* 4. MAIN FORM CONTENT AREA */}
      <main className="w-full max-w-4xl lg:max-w-5xl mx-auto px-4 sm:px-6 flex-1 flex flex-col justify-center pb-24 sm:pb-12 relative z-10">
        
        {/* Slim Segmented Progress Bar */}
        <ProgressBar currentStep={currentStep} />

        {/* STEP QUESTION (Only Step 1 headline retained across the form screens) */}
        {currentStep === 1 && (
          <div className="text-center mb-4 sm:mb-6">
            <h1 className="text-2xl sm:text-4xl md:text-[44px] lg:text-[50px] font-black uppercase tracking-[-0.03em] sm:tracking-[-0.035em] text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.55)] leading-tight whitespace-nowrap">
              WHAT ARE YOU GOOD AT?
            </h1>
          </div>
        )}

        {/* BRIGHT FROSTED GLASS PANEL WITH DOODLES */}
        <div className="relative">
          
          {/* HAND-DRAWN DOODLES AROUND PANEL (Hidden on Step 3 for calm, focused layout) */}
          {currentStep !== 3 && (
            <>
              {/* Doodle 1: Tangerine Zigzag (Top Left) */}
              <div
                className="absolute -top-6 -left-4 sm:-top-8 sm:-left-7 z-20 pointer-events-none doodle-float-1"
                aria-hidden="true"
              >
                <svg width="44" height="34" viewBox="0 0 54 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M4 22L16 6L28 26L40 10L50 28"
                    stroke="#FF5722"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="drop-shadow-[0_3px_6px_rgba(255,87,34,0.45)]"
                  />
                </svg>
              </div>

              {/* Doodle 2: Playful Cyan Squiggle (Bottom Right) */}
              <div
                className="absolute -bottom-5 -right-3 sm:-bottom-7 sm:-right-6 z-20 pointer-events-none doodle-float-2"
                aria-hidden="true"
              >
                <svg width="46" height="38" viewBox="0 0 56 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5 28C14 12 25 36 34 20C41 7 49 14 51 24"
                    stroke="#56C8F2"
                    strokeWidth="5"
                    strokeLinecap="round"
                    className="drop-shadow-[0_3px_6px_rgba(86,200,242,0.5)]"
                  />
                </svg>
              </div>
            </>
          )}

          {/* Frosted Glass Container (Wider landscape layout, less tall in height) */}
          <div className="bg-white/92 sm:bg-white/95 backdrop-blur-2xl border-2 border-white/95 rounded-[28px] sm:rounded-[36px] p-5 sm:p-7 md:p-8 shadow-[0_28px_65px_rgba(15,23,42,0.18),0_10px_24px_rgba(15,23,42,0.08),inset_0_1px_2px_rgba(255,255,255,1)]">
            
            {/* Step Container with 300ms directional slide and fade */}
            <div
              key={currentStep}
              className={`step-transition-${direction}`}
            >
              {children}
            </div>

            {/* DESKTOP ACTION BUTTON (Inside panel) */}
            <div className="hidden sm:flex justify-end pt-4 mt-2 border-t border-stone-200/80">
              <button
                type="button"
                onClick={onSubmit}
                className="px-8 py-3.5 text-sm sm:text-base font-mono font-bold tracking-wider uppercase rounded-full text-white bg-gradient-to-r from-[#FF5722] via-[#FF6233] to-[#FF4F24] shadow-[0_10px_24px_rgba(255,87,34,0.45),inset_0_1px_1px_rgba(255,255,255,0.7)] hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(255,87,34,0.55)] active:scale-95 active:translate-y-0 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FF5722]/30"
              >
                {submitLabel} →
              </button>
            </div>
          </div>
        </div>

        {/* PRIVACY LINE (High contrast badge on sunny background) */}
        <div className="mt-4 text-center select-none">
          <span className="inline-block px-4 py-1.5 rounded-full bg-black/25 backdrop-blur-md text-white font-medium text-xs sm:text-sm drop-shadow-sm border border-white/25">
            No sign-up. We don&apos;t ask for your name or email.
          </span>
        </div>
      </main>

      {/* 5. MOBILE STICKY BOTTOM ACTION BAR (Above safe area) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-stone-200/90 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] shadow-[0_-12px_28px_rgba(0,0,0,0.12)]">
        <button
          type="button"
          onClick={onSubmit}
          className="w-full py-3.5 text-sm font-mono font-bold tracking-wider uppercase rounded-full text-white bg-gradient-to-r from-[#FF5722] to-[#FF4F24] shadow-[0_8px_20px_rgba(255,87,34,0.45)] active:scale-[0.98] transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FF5722]/30"
        >
          {submitLabel} →
        </button>
      </div>

      {/* MOTION AND TRANSITION STYLES */}
      <style jsx global>{`
        /* Hand-drawn doodle drift */
        @keyframes doodleA {
          0%, 100% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
          50% {
            transform: translate3d(3px, -5px, 0) rotate(-4deg);
          }
        }
        @keyframes doodleB {
          0%, 100% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
          50% {
            transform: translate3d(-4px, 4px, 0) rotate(5deg);
          }
        }
        .doodle-float-1 {
          animation: doodleA 5.5s ease-in-out infinite;
        }
        .doodle-float-2 {
          animation: doodleB 6.5s ease-in-out infinite;
        }

        /* 300ms directional slide & fade */
        @keyframes slideFadeForward {
          from {
            opacity: 0;
            transform: translate3d(36px, 0, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        @keyframes slideFadeBackward {
          from {
            opacity: 0;
            transform: translate3d(-36px, 0, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        .step-transition-forward {
          animation: slideFadeForward 300ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .step-transition-backward {
          animation: slideFadeBackward 300ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Respect prefers-reduced-motion: disable all drifts and slides */
        @media (prefers-reduced-motion: reduce) {
          .cloud-drift-1,
          .cloud-drift-2,
          .doodle-float-1,
          .doodle-float-2,
          .step-transition-forward,
          .step-transition-backward {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}
