'use client';

// components/plan/PlanHeader.tsx
// Header band for /plan:
// - Softened hero photo background for top ~32% of viewport (shorter on mobile),
//   fading smoothly into the calm blue-gray backdrop.
// - "Back to ideas" text link at top left
// - Brand mark at top right
// - Selected idea's brand shape (red circle, blue pill, or green triangle) large,
//   doing one small hop on arrival
// - Product name in huge, heavy, tightly spaced white uppercase type with a soft text shadow
// - One-line definition in white
// - "At a glance" row in plain white text (no pills, no boxes), separated by thin vertical rules:
//   Build time | Difficulty | Target user
// - No idea switcher chips! No print button!

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { BrandMarkSvg } from '@/components/BrandLogo';
import { Idea } from '@/lib/ideas';
import { BuildPlan } from '@/lib/plan';

interface PlanHeaderProps {
  idea: Idea;
  plan: BuildPlan;
}

export default function PlanHeader({ idea, plan }: PlanHeaderProps) {
  const isCircle = idea.id === 'idea-1';
  const isPill = idea.id === 'idea-2';
  const isTriangle = idea.id === 'idea-3';

  return (
    <header className="relative w-full overflow-hidden text-white select-none">
      {/* 1. SOFTENED HERO PHOTO BACKDROP (FADING SMOOTHLY INTO CALM BLUE-GRAY) */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <Image
          src="/hero/hero.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter blur-[2.5px] sm:blur-[3.5px] scale-105"
        />
        {/* Soft light wash */}
        <div className="absolute inset-0 bg-white/20 backdrop-brightness-[1.02]" />
        {/* Smooth fade from softened sky wash into calm blue-gray backdrop (#EEF2F6) */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-400/25 via-sky-300/10 to-[#EEF2F6]" />
      </div>

      {/* 2. TOP NAV ROW: "Back to ideas" link + Brand Mark */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 sm:pt-7 pb-4 flex items-center justify-between relative z-20">
        <Link
          href="/ideas"
          className="group inline-flex items-center gap-2 text-white/95 hover:text-white font-semibold text-xs sm:text-sm tracking-wide transition-all duration-200 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
          <span>Back to ideas</span>
        </Link>

        <Link
          href="/"
          className="flex items-center gap-2 p-1 rounded-full hover:opacity-90 transition-opacity"
          aria-label="Home"
        >
          <BrandMarkSvg size={36} />
        </Link>
      </div>

      {/* 3. CENTER HERO CONTENTS */}
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4 pb-12 sm:pb-16 flex flex-col items-center text-center relative z-10">
        
        {/* SELECTED IDEA'S BRAND SHAPE (LARGE + ONE SMALL HOP ON ARRIVAL) */}
        <div className="relative mb-5 flex flex-col items-center">
          <div className="plan-shape-hop relative z-10" aria-label={`${idea.name} brand shape`}>
            {isCircle && (
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FF4F24] shadow-[0_12px_28px_rgba(255,79,36,0.35)]" />
            )}
            {isPill && (
              <div className="w-11 h-18 sm:w-13 sm:h-22 rounded-full bg-[#327AE6] rotate-0 shadow-[0_12px_28px_rgba(50,122,230,0.35)]" />
            )}
            {isTriangle && (
              <div className="w-18 h-16 sm:w-22 sm:h-18 flex items-center justify-center filter drop-shadow-[0_12px_24px_rgba(46,170,123,0.35)]">
                <svg viewBox="0 0 100 80" className="w-full h-full fill-[#2EAA7B]">
                  <path d="M 18 10 L 84 40 L 18 70 Z" />
                </svg>
              </div>
            )}
          </div>

          {/* Soft elliptical ground shadow that shrinks during the hop */}
          <div
            className="plan-ground-shadow w-14 h-2.5 sm:w-16 sm:h-3 rounded-full bg-black/25 filter blur-[3px] -mt-1"
            aria-hidden="true"
          />
        </div>

        {/* HUGE, HEAVY, TIGHTLY SPACED WHITE UPPERCASE PRODUCT NAME */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)] leading-tight">
          {plan.productName}
        </h1>

        {/* ONE-LINE DEFINITION IN WHITE */}
        <p className="mt-3 text-base sm:text-lg md:text-xl font-medium text-white/95 max-w-2xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)] leading-relaxed">
          {plan.definition}
        </p>

        {/* AT A GLANCE ROW: PLAIN WHITE TEXT, THIN VERTICAL RULES (NO PILLS, NO BOXES) */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-y-2 text-xs sm:text-sm md:text-base font-medium text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
          <span>Build time: {idea.buildTime}</span>
          <span className="mx-3 sm:mx-4 h-3.5 w-px bg-white/40" aria-hidden="true" />
          <span>Difficulty: {idea.difficulty}</span>
          <span className="mx-3 sm:mx-4 h-3.5 w-px bg-white/40" aria-hidden="true" />
          <span>Target user: {idea.targetUser}</span>
        </div>
      </div>

      {/* HOP KEYFRAMES & GROUND SHADOW */}
      <style jsx>{`
        @keyframes planShapeHopAnim {
          0% {
            transform: translateY(0) scale(1, 1);
          }
          15% {
            transform: translateY(4px) scale(1.15, 0.85);
          }
          45% {
            transform: translateY(-26px) scale(0.92, 1.15);
          }
          70% {
            transform: translateY(0) scale(1.08, 0.92);
          }
          85% {
            transform: translateY(-5px) scale(0.98, 1.02);
          }
          100% {
            transform: translateY(0) scale(1, 1);
          }
        }

        @keyframes planGroundShadowAnim {
          0% {
            transform: scale(1);
            opacity: 0.35;
          }
          15% {
            transform: scale(1.2);
            opacity: 0.45;
          }
          45% {
            transform: scale(0.65);
            opacity: 0.12;
          }
          70% {
            transform: scale(1.15);
            opacity: 0.4;
          }
          85% {
            transform: scale(0.9);
            opacity: 0.25;
          }
          100% {
            transform: scale(1);
            opacity: 0.35;
          }
        }

        .plan-shape-hop {
          animation: planShapeHopAnim 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both;
          will-change: transform;
        }

        .plan-ground-shadow {
          animation: planGroundShadowAnim 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both;
          will-change: transform, opacity;
        }

        @media (prefers-reduced-motion: reduce) {
          .plan-shape-hop,
          .plan-ground-shadow {
            animation: none !important;
          }
        }
      `}</style>
    </header>
  );
}
