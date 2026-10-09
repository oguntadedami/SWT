'use client';

// components/plan/PlanHeader.tsx
// Header section for Build Plan at /plan (~85vh):
// - "Back to ideas" link in a frosted pill at top left
// - Selected idea's brand shape (large, 3D gradients, specular glint, ground shadow)
//   hops once on arrival, then transitions to a gentle idle bob
// - Huge, heavy, tightly spaced white uppercase product name (h1)
// - One-line definition at 20-24px in white
// - Row of 4 sticker tags (alternating 1-3 deg rotations, logo colors: red, blue, green, ink-dark)
// - Two CTA buttons: solid orange pill "COPY AI PROMPT" and frosted outlined white pill "DOWNLOAD"
// - Scattered hand-drawn playful doodles matching the landing page

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import { Idea } from '@/lib/ideas';
import { BuildPlan } from '@/lib/plan';
import { PlanDocument } from '@/lib/planDocument';
import { VioletSquiggleDoodle, ScribbleDoodle, WarmYellowSparkle } from '@/components/Doodles';
import { BrandMarkSvg } from '@/components/BrandLogo';
import StickerTag from './StickerTag';
import DownloadMenu from './DownloadMenu';

interface PlanHeaderProps {
  idea: Idea;
  plan: BuildPlan;
  doc: PlanDocument;
  accentColor: string;
  isCopied: boolean;
  onCopyPrompt: () => void;
}

export default function PlanHeader({
  idea,
  plan,
  doc,
  accentColor,
  isCopied,
  onCopyPrompt,
}: PlanHeaderProps) {
  const isIdea1 = idea.id === 'idea-1';
  const isIdea2 = idea.id === 'idea-2';
  const isIdea3 = idea.id === 'idea-3';

  return (
    <header className="relative w-full min-h-[85vh] flex flex-col justify-between pt-5 sm:pt-8 pb-14 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10 text-center select-none">
      {/* Playful scattered doodles in the header */}
      <VioletSquiggleDoodle className="hidden sm:block absolute top-14 left-8 lg:left-14 opacity-80 rotate-[-12deg]" />
      <WarmYellowSparkle size={32} className="hidden sm:block absolute top-20 right-10 lg:right-20 opacity-85" />
      <ScribbleDoodle className="hidden md:block absolute bottom-24 right-8 lg:right-16 opacity-75 rotate-[6deg]" />

      {/* Top bar: Back to ideas frosted pill & Brand logo */}
      <div className="w-full flex items-center justify-between mb-8 sm:mb-10">
        <Link
          href="/ideas"
          className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/20 hover:bg-white/35 backdrop-blur-md border border-white/40 text-white font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_4px_14px_rgba(0,0,0,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
          <span>Back to ideas</span>
        </Link>

        <Link
          href="/"
          aria-label="Home"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/35 backdrop-blur-md border border-white/40 transition-all duration-300 hover:scale-105 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <BrandMarkSvg size={34} />
        </Link>
      </div>

      {/* Main Header Center Stage */}
      <div className="flex-1 flex flex-col items-center justify-center py-4 my-auto">
        {/* BRAND SHAPE + GROUND SHADOW */}
        <div className="flex flex-col items-center mb-6 sm:mb-8 relative group">
          {/* Animated Hopping & Bobbing Shape */}
          <div className="animate-shape-hop-once motion-reduce:animate-none">
            <div className="animate-float-1 motion-reduce:animate-none">
              {/* IDEA 1: Tangerine Sphere (Red circle) */}
              {isIdea1 && (
                <svg
                  viewBox="0 0 64 64"
                  className="w-24 h-24 sm:w-28 sm:h-28 drop-shadow-[0_12px_24px_rgba(255,79,36,0.45)]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="Tangerine Sphere"
                >
                  <defs>
                    <radialGradient id="hdrSphereBase" cx="38%" cy="32%" r="62%" fx="32%" fy="26%">
                      <stop offset="0%" stopColor="#FFA07A" />
                      <stop offset="25%" stopColor="#FF6333" />
                      <stop offset="70%" stopColor="#FF4F24" />
                      <stop offset="92%" stopColor="#D93810" />
                      <stop offset="100%" stopColor="#9C2405" />
                    </radialGradient>
                    <radialGradient id="hdrSphereSpecular" cx="42%" cy="36%" r="48%">
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                      <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0.6" />
                      <stop offset="70%" stopColor="#FFA07A" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#FF4F24" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="hdrSphereBounce" cx="60%" cy="85%" r="45%">
                      <stop offset="0%" stopColor="#FFB380" stopOpacity="0.55" />
                      <stop offset="60%" stopColor="#FF4F24" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <circle cx="32" cy="32" r="28" fill="url(#hdrSphereBase)" />
                  <circle cx="32" cy="32" r="28" fill="url(#hdrSphereBounce)" />
                  <ellipse cx="24" cy="20" rx="11" ry="8" transform="rotate(-25 24 20)" fill="url(#hdrSphereSpecular)" />
                  <ellipse cx="21" cy="17" rx="3.5" ry="2.5" transform="rotate(-25 21 17)" fill="#FFFFFF" fillOpacity="0.95" />
                  <circle cx="32" cy="32" r="27" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.35" />
                </svg>
              )}

              {/* IDEA 2: Signal Cyan Capsule (Blue vertical pill) */}
              {isIdea2 && (
                <svg
                  viewBox="0 0 54 84"
                  className="w-20 h-28 sm:w-24 sm:h-32 drop-shadow-[0_12px_24px_rgba(50,122,230,0.45)]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="Signal Cyan Capsule"
                >
                  <defs>
                    <linearGradient id="hdrPillBase" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#2BB0E4" />
                      <stop offset="25%" stopColor="#56C8F2" />
                      <stop offset="55%" stopColor="#80D8F8" />
                      <stop offset="75%" stopColor="#327AE6" />
                      <stop offset="100%" stopColor="#1E8AB5" />
                    </linearGradient>
                    <linearGradient id="hdrPillDepth" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.65" />
                      <stop offset="18%" stopColor="#FFFFFF" stopOpacity="0" />
                      <stop offset="82%" stopColor="#0B4B66" stopOpacity="0" />
                      <stop offset="100%" stopColor="#093B52" stopOpacity="0.55" />
                    </linearGradient>
                    <linearGradient id="hdrPillGloss" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                      <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>
                  <rect x="5" y="4" width="44" height="76" rx="22" fill="url(#hdrPillBase)" />
                  <rect x="5" y="4" width="44" height="76" rx="22" fill="url(#hdrPillDepth)" />
                  <rect x="12" y="10" width="8" height="60" rx="4" fill="url(#hdrPillGloss)" />
                  <ellipse cx="27" cy="12" rx="7" ry="3.5" fill="#FFFFFF" fillOpacity="0.85" />
                  <rect x="6" y="5" width="42" height="74" rx="21" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.4" />
                </svg>
              )}

              {/* IDEA 3: Fresh Mint Wedge (Green right-pointing rounded triangle) */}
              {isIdea3 && (
                <svg
                  viewBox="0 0 84 72"
                  className="w-24 h-24 sm:w-28 sm:h-28 drop-shadow-[0_12px_24px_rgba(46,170,123,0.45)]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="Fresh Mint Wedge"
                >
                  <defs>
                    <linearGradient id="hdrWedgeBase" x1="15%" y1="10%" x2="90%" y2="90%">
                      <stop offset="0%" stopColor="#96ECCF" />
                      <stop offset="35%" stopColor="#65D9B3" />
                      <stop offset="75%" stopColor="#2EAA7B" />
                      <stop offset="100%" stopColor="#1E8C67" />
                    </linearGradient>
                    <linearGradient id="hdrWedgeGloss" x1="20%" y1="15%" x2="70%" y2="55%">
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                      <stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.55" />
                      <stop offset="70%" stopColor="#65D9B3" stopOpacity="0.1" />
                      <stop offset="100%" stopColor="#65D9B3" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 16 10 C 16 6, 22 3.5, 26 6 L 70 32 C 74.5 34.5 74.5 41.5 70 44 L 26 70 C 22 72.5 16 70 16 66 Z"
                    fill="url(#hdrWedgeBase)"
                  />
                  <path
                    d="M 19 13 C 19 11, 23 9, 26 11 L 62 33 C 64 34.5 62 37 59 36 L 24 25 C 21 24 19 21 19 17 Z"
                    fill="url(#hdrWedgeGloss)"
                  />
                  <circle cx="27" cy="11" r="3" fill="#FFFFFF" fillOpacity="0.9" />
                  <path
                    d="M 16.8 10.8 C 16.8 7.5, 22 5, 25.5 7 L 69.5 32.5 C 73.5 34.8 73.5 41 69.5 43.5 L 25.5 69 C 22 71.2 16.8 68.8 16.8 65.2 Z"
                    stroke="#FFFFFF"
                    strokeWidth="1"
                    strokeOpacity="0.4"
                  />
                </svg>
              )}
            </div>
          </div>

          {/* Ground Shadow underneath the hopping shape */}
          <div className="h-4 flex items-center justify-center mt-2" aria-hidden="true">
            <div className="w-16 sm:w-20 h-3 bg-black/40 rounded-full blur-[3px]" />
          </div>
        </div>

        {/* Product Name (H1) */}
        <h1 className="font-display font-black uppercase tracking-tight text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)] leading-tight max-w-5xl mx-auto">
          {plan.productName}
        </h1>

        {/* One-line Definition */}
        <p className="text-xl sm:text-2xl font-normal text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] leading-relaxed max-w-3xl mx-auto mt-4 mb-8">
          {plan.definition}
        </p>

        {/* Row of Four Sticker Tags */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10 max-w-3xl mx-auto">
          {/* 1. Build Time: Red/coral, -2 deg */}
          <StickerTag
            label="Build time"
            value={idea.buildTime}
            color="red"
            rotation="rotate-[-2deg]"
          />
          {/* 2. Difficulty: Blue, +2 deg */}
          <StickerTag
            label="Difficulty"
            value={idea.difficulty}
            color="blue"
            rotation="rotate-[2deg]"
          />
          {/* 3. Tools count: Green, -1.5 deg */}
          <StickerTag
            label="Tools"
            value={`${plan.toolStack.length} tools`}
            color="green"
            rotation="rotate-[-1.5deg]"
          />
          {/* 4. Stages count: Ink-dark, +2.5 deg */}
          <StickerTag
            label="Stages"
            value={`${plan.roadmap.length} stages`}
            color="ink"
            rotation="rotate-[2.5deg]"
          />
        </div>

        {/* Action Buttons Row */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 w-full">
          {/* Primary CTA: Solid Orange Pill "COPY AI PROMPT" */}
          <button
            type="button"
            onClick={onCopyPrompt}
            className="inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-[#FF4F24] hover:bg-[#E53E14] active:bg-[#CC340D] text-white font-bold text-sm sm:text-base tracking-wider uppercase shadow-[0_12px_28px_rgba(255,79,36,0.45)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
          >
            {isCopied ? (
              <>
                <Check className="w-5 h-5 stroke-[2.5]" />
                <span>PROMPT COPIED!</span>
              </>
            ) : (
              <>
                <Copy className="w-5 h-5 stroke-[2.2]" />
                <span>COPY AI PROMPT</span>
              </>
            )}
          </button>

          {/* Secondary CTA: Frosted Outlined White Pill "DOWNLOAD" */}
          <DownloadMenu
            doc={doc}
            accentColor={accentColor}
            variant="frosted"
            label="DOWNLOAD"
          />
        </div>
      </div>
    </header>
  );
}
