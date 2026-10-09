'use client';

// components/IdeaCard.tsx
// Revised Idea Card for /ideas according to user specifications:
// 1. Single-choice radio model:
//    - Visually hidden native radio input wrapped underneath.
//    - Card face acts as the label.
//    - Arrow keys move selection; Tab moves into/out of group.
// 2. Coordinated selected state:
//    - Selected card lifts slightly, gets a 3px ring in its own shape color (red, blue, green).
//    - Top-left check-mark badge in shape color.
//    - Selected card's brand shape does one small hop.
//    - Unselected cards (when a selection exists) scale to ~0.97 and soften shape & sticker opacity only.
//    - No orange selection indicators (orange is reserved for CTA).
// 3. See details control:
//    - Separate button inside card but NOT inside the radio label.
//    - Expands/collapses details without altering radio selection.
//    - Keyboard accessible with aria-expanded.
// 4. Visual refinements:
//    - Card height reduced ~20-25% by tightening top shape area to h-24 sm:h-28.
//    - Shape 2: Clearly reads as rounded rectangle (pill), rotated ~20 deg.
//    - Shape 3: Positioned as a clearly recognizable right-pointing triangle with only slight crop on right point.
//    - Removed per-card "Turn into a plan" buttons.

import React, { useState } from 'react';
import { Idea } from '@/lib/ideas';
import { Check } from 'lucide-react';

interface IdeaCardProps {
  idea: Idea;
  index: number;
  isSelected: boolean;
  selectionExists: boolean;
  onSelect: (id: string) => void;
}

export default function IdeaCard({
  idea,
  index,
  isSelected,
  selectionExists,
  onSelect,
}: IdeaCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  const isCard1 = index === 0;
  const isCard2 = index === 1;
  const isCard3 = index === 2;

  // Specific shape colors matching the brand identity
  const shapeColor = isCard1 ? '#FF4F24' : isCard2 ? '#327AE6' : '#2EAA7B';

  // Ring class for selected state (3px ring in own shape color)
  const ringClass = isSelected
    ? isCard1
      ? 'ring-[3px] ring-[#FF4F24]'
      : isCard2
      ? 'ring-[3px] ring-[#327AE6]'
      : 'ring-[3px] ring-[#2EAA7B]'
    : 'ring-0';

  // Matching sticker tag soft colors
  const stickerStyle = isCard1
    ? 'bg-[#FFE8E3] text-[#A6240B] border-[#FFCFC6]'
    : isCard2
    ? 'bg-[#E5F0FF] text-[#114FA7] border-[#C8DEFF]'
    : 'bg-[#E2F7ED] text-[#0A6B41] border-[#BDEFD6]';

  // Sticker tags sit straight (angled straight)
  const stickerRotation = 'rotate-0';

  // Desktop subtle staggering
  const desktopStaggerClass = isCard1
    ? 'lg:translate-y-0'
    : isCard2
    ? 'lg:translate-y-1'
    : 'lg:translate-y-2';

  // Float animation class (subtle organic drifting when unselected / idle)
  const floatAnimClass = isSelected
    ? ''
    : isCard1
    ? 'animate-float-1'
    : isCard2
    ? 'animate-float-2'
    : 'animate-float-3';

  // Selection state transforms
  const isUnselectedMuted = selectionExists && !isSelected;

  return (
    <article
      className={`group relative flex flex-col justify-between w-full max-w-sm rounded-[32px] overflow-hidden bg-white/92 backdrop-blur-2xl border border-white/80 text-zinc-900 transition-all duration-500 ${desktopStaggerClass} ${floatAnimClass} ${ringClass} ${
        isSelected
          ? '-translate-y-2 shadow-[0_28px_60px_rgba(0,0,0,0.18),0_6px_20px_rgba(0,0,0,0.06)]'
          : isUnselectedMuted
          ? 'scale-[0.97] opacity-95 shadow-[0_14px_30px_rgba(0,0,0,0.08)]'
          : 'shadow-[0_20px_45px_rgba(0,0,0,0.12),0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_26px_55px_rgba(0,0,0,0.16)] hover:-translate-y-1'
      } has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-zinc-900 has-[:focus-visible]:ring-offset-2`}
      style={{
        transition:
          'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), ring-color 0.4s ease',
        willChange: 'transform, backdrop-filter',
      }}
    >
      {/* NATIVE RADIO INPUT (VISUALLY HIDDEN) */}
      <input
        type="radio"
        id={`idea-radio-${idea.id}`}
        name="selectedIdea"
        value={idea.id}
        checked={isSelected}
        onChange={() => onSelect(idea.id)}
        className="sr-only"
        aria-label={`Select ${idea.name}`}
      />

      {/* CHECK-MARK BADGE AT TOP-LEFT (ONLY WHEN SELECTED) */}
      {isSelected && (
        <div
          className="absolute top-3.5 left-4 z-20 flex items-center justify-center w-7 h-7 rounded-full text-white shadow-md animate-in zoom-in-75 duration-200"
          style={{ backgroundColor: shapeColor }}
          aria-hidden="true"
        >
          <Check className="w-4 h-4 stroke-[3]" />
        </div>
      )}

      {/* ============================================================== */}
      {/* CARD FACE ACTS AS THE RADIO LABEL                              */}
      {/* ============================================================== */}
      <label
        htmlFor={`idea-radio-${idea.id}`}
        className="cursor-pointer select-none block w-full flex-1"
      >
        {/* ============================================================== */}
        {/* TOP HALF: LARGE FLAT BRAND SHAPE (TIGHTENED FOR COMPACT HEIGHT) */}
        {/* ============================================================== */}
        <div
          className={`relative w-full h-24 sm:h-28 overflow-hidden shrink-0 pointer-events-none transition-opacity duration-400 ${
            isUnselectedMuted ? 'opacity-40' : 'opacity-100'
          }`}
        >
          {/* Card 1: Red Circle (#FF4F24) */}
          {isCard1 && (
            <div
              key={`card-shape-1-${isSelected ? 'selected' : 'idle'}`}
              className={`absolute -top-7 -right-6 w-32 h-32 rounded-full bg-[#FF4F24] shadow-[0_12px_24px_rgba(255,79,36,0.3)] ${
                isSelected ? 'animate-shape-hop' : ''
              }`}
              aria-hidden="true"
            />
          )}

          {/* Card 2: Blue rounded rectangle (pill), sitting straight upright (#327AE6) */}
          {isCard2 && (
            <div
              key={`card-shape-2-${isSelected ? 'selected' : 'idle'}`}
              className={`absolute -top-6 right-3 w-20 h-36 rounded-full bg-[#327AE6] shadow-[0_12px_24px_rgba(50,122,230,0.32)] rotate-0 ${
                isSelected ? 'animate-shape-hop' : ''
              }`}
              aria-hidden="true"
            />
          )}

          {/* Card 3: Green right-pointing triangle (#2EAA7B) */}
          {/* Positioned so the triangle shape is clearly recognizable with only a small part of its right point cropped */}
          {isCard3 && (
            <div
              key={`card-shape-3-${isSelected ? 'selected' : 'idle'}`}
              className={`absolute top-2.5 right-[-8px] w-28 h-20 ${
                isSelected ? 'animate-shape-hop' : ''
              }`}
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 100 80"
                className="w-full h-full filter drop-shadow-[0_12px_22px_rgba(46,170,123,0.32)]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M 18 10
                     C 18 5, 24 2.5, 29 5.5
                     L 88 36.5
                     C 93 39, 93 43, 88 45.5
                     L 29 76.5
                     C 24 79.5, 18 77, 18 72
                     Z"
                  fill="#2EAA7B"
                />
              </svg>
            </div>
          )}
        </div>

        {/* ============================================================== */}
        {/* BODY CONTENT (TITLE, DESCRIPTION, METADATA, STICKER)          */}
        {/* ============================================================== */}
        <div className="px-6 sm:px-7 pt-1 pb-2 flex flex-col">
          {/* IDEA NAME */}
          <h2 className="text-2xl sm:text-[26px] font-black text-zinc-900 tracking-tight leading-snug">
            {idea.name}
          </h2>

          {/* ONE-LINER: Regular dark text, NOT orange */}
          <p className="mt-2 text-sm sm:text-base text-zinc-700 leading-normal font-normal">
            {idea.oneLiner}
          </p>

          {/* METADATA: One plain-text line combining difficulty and time with a dot */}
          <p className="mt-2.5 text-xs sm:text-sm text-zinc-500 font-medium">
            {idea.difficulty} · {idea.buildTime}
          </p>

          {/* WHY IT FITS YOU: Sticker-style tag */}
          <div className="mt-3.5 pt-0.5 self-start">
            <div
              className={`inline-block rounded-2xl px-3.5 py-1.5 text-xs sm:text-sm font-medium leading-relaxed border shadow-sm transition-opacity duration-400 ${stickerStyle} ${stickerRotation} ${
                isUnselectedMuted ? 'opacity-50' : 'opacity-100'
              }`}
            >
              {idea.whyFitsYou}
            </div>
          </div>
        </div>
      </label>

      {/* ============================================================== */}
      {/* DETAILS CONTROL: SEPARATE BUTTON NOT INSIDE THE RADIO LABEL     */}
      {/* Clicking expands/collapses details only; does NOT change radio */}
      {/* ============================================================== */}
      <div className="px-6 sm:px-7 pb-6 pt-2">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setShowDetails(!showDetails);
          }}
          aria-expanded={showDetails}
          className="text-xs sm:text-sm font-semibold text-zinc-600 hover:text-zinc-950 underline underline-offset-4 decoration-zinc-300 hover:decoration-zinc-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-800 rounded-sm cursor-pointer"
        >
          {showDetails ? 'Hide details' : 'See details'}
        </button>

        {showDetails && (
          <div className="mt-3.5 space-y-3 pt-1 border-t border-zinc-100/80 animate-in fade-in slide-in-from-top-1 duration-300">
            {/* 1. Problem */}
            <div>
              <h3 className="text-xs font-semibold text-zinc-500">The problem</h3>
              <p className="mt-0.5 text-xs sm:text-sm text-zinc-800 leading-relaxed font-normal">
                {idea.problem}
              </p>
            </div>

            {/* 2. Target User / Audience */}
            <div>
              <h3 className="text-xs font-semibold text-zinc-500">Who it’s for</h3>
              <p className="mt-0.5 text-xs sm:text-sm text-zinc-800 leading-relaxed font-normal">
                {idea.targetUser}
              </p>
            </div>

            {/* 3. MVP */}
            <div>
              <h3 className="text-xs font-semibold text-zinc-500">What to build first</h3>
              <p className="mt-0.5 text-xs sm:text-sm text-zinc-800 leading-relaxed font-normal">
                {idea.mvp}
              </p>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes shapeHopKeyframe {
          0% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-12px) scale(1.04);
          }
          60% {
            transform: translateY(0) scale(0.97);
          }
          80% {
            transform: translateY(-4px);
          }
          100% {
            transform: translateY(0);
          }
        }
        .animate-shape-hop {
          animation: shapeHopKeyframe 0.55s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </article>
  );
}
