'use client';

// components/ready/ReadyShapes.tsx
// The three brand logo shapes in a row with ground shadows:
// 1. Tangerine Sphere (Red circle)
// 2. Signal Cyan Capsule (Blue vertical pill)
// 3. Fresh Mint Wedge (Green right-pointing rounded triangle)
// - On arrival: hop in one after another (180ms stagger, squash-and-stretch), land, and settle into a gentle idle bob
// - Hop trigger: when copy prompt is clicked, shapes perform a small celebratory hop
// - Ground shadows squash and fade with the hop
// - Respects prefers-reduced-motion

import React from 'react';

interface ReadyShapesProps {
  hopTrigger?: number;
  className?: string;
}

export default function ReadyShapes({
  hopTrigger = 0,
  className = '',
}: ReadyShapesProps) {
  const isCopyHop = hopTrigger > 0;

  return (
    <div
      className={`flex items-end justify-center gap-7 sm:gap-11 relative select-none pointer-events-none pt-4 pb-2 ${className}`}
      aria-hidden="true"
    >
      {/* ============================================================ */}
      {/* 1. TANGERINE SPHERE (RED CIRCLE)                             */}
      {/* ============================================================ */}
      <div className="flex flex-col items-center relative">
        <div
          key={`ready-circle-${hopTrigger}`}
          className={`transition-transform duration-300 ${
            isCopyHop ? 'animate-shape-hop-once' : 'shape-hop-stagger-1'
          } motion-reduce:animate-none`}
        >
          <div className="animate-float-1 motion-reduce:animate-none">
            <svg
              viewBox="0 0 64 64"
              className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-[0_12px_24px_rgba(255,79,36,0.45)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <radialGradient id="rdySphereBase" cx="38%" cy="32%" r="62%" fx="32%" fy="26%">
                  <stop offset="0%" stopColor="#FFA07A" />
                  <stop offset="25%" stopColor="#FF6333" />
                  <stop offset="70%" stopColor="#FF4F24" />
                  <stop offset="92%" stopColor="#D93810" />
                  <stop offset="100%" stopColor="#9C2405" />
                </radialGradient>
                <radialGradient id="rdySphereSpecular" cx="42%" cy="36%" r="48%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                  <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0.6" />
                  <stop offset="70%" stopColor="#FFA07A" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#FF4F24" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="rdySphereBounce" cx="60%" cy="85%" r="45%">
                  <stop offset="0%" stopColor="#FFB380" stopOpacity="0.55" />
                  <stop offset="60%" stopColor="#FF4F24" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="32" cy="32" r="28" fill="url(#rdySphereBase)" />
              <circle cx="32" cy="32" r="28" fill="url(#rdySphereBounce)" />
              <ellipse cx="24" cy="20" rx="11" ry="8" transform="rotate(-25 24 20)" fill="url(#rdySphereSpecular)" />
              <ellipse cx="21" cy="17" rx="3.5" ry="2.5" transform="rotate(-25 21 17)" fill="#FFFFFF" fillOpacity="0.95" />
              <circle cx="32" cy="32" r="27" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.35" />
            </svg>
          </div>
        </div>

        {/* Ground shadow beneath red circle */}
        <div className="h-4 flex items-center justify-center mt-2.5">
          <div className="w-14 sm:w-16 h-3 bg-black/40 rounded-full blur-[2.5px]" />
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. SIGNAL CYAN CAPSULE (BLUE PILL)                           */}
      {/* ============================================================ */}
      <div className="flex flex-col items-center relative">
        <div
          key={`ready-pill-${hopTrigger}`}
          className={`transition-transform duration-300 ${
            isCopyHop ? 'animate-shape-hop-once' : 'shape-hop-stagger-2'
          } motion-reduce:animate-none`}
        >
          <div className="animate-float-1 motion-reduce:animate-none" style={{ animationDelay: '0.4s' }}>
            <svg
              viewBox="0 0 54 84"
              className="w-14 h-22 sm:w-16 sm:h-26 drop-shadow-[0_12px_24px_rgba(50,122,230,0.45)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="rdyPillBase" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#2BB0E4" />
                  <stop offset="25%" stopColor="#56C8F2" />
                  <stop offset="55%" stopColor="#80D8F8" />
                  <stop offset="75%" stopColor="#327AE6" />
                  <stop offset="100%" stopColor="#1E8AB5" />
                </linearGradient>
                <linearGradient id="rdyPillDepth" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.65" />
                  <stop offset="18%" stopColor="#FFFFFF" stopOpacity="0" />
                  <stop offset="82%" stopColor="#0B4B66" stopOpacity="0" />
                  <stop offset="100%" stopColor="#093B52" stopOpacity="0.55" />
                </linearGradient>
                <linearGradient id="rdyPillGloss" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              <rect x="5" y="4" width="44" height="76" rx="22" fill="url(#rdyPillBase)" />
              <rect x="5" y="4" width="44" height="76" rx="22" fill="url(#rdyPillDepth)" />
              <rect x="12" y="10" width="8" height="60" rx="4" fill="url(#rdyPillGloss)" />
              <ellipse cx="27" cy="12" rx="7" ry="3.5" fill="#FFFFFF" fillOpacity="0.85" />
              <rect x="6" y="5" width="42" height="74" rx="21" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.4" />
            </svg>
          </div>
        </div>

        {/* Ground shadow beneath blue pill */}
        <div className="h-4 flex items-center justify-center mt-2.5">
          <div className="w-13 sm:w-15 h-3 bg-black/40 rounded-full blur-[2.5px]" />
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. FRESH MINT WEDGE (GREEN TRIANGLE)                         */}
      {/* ============================================================ */}
      <div className="flex flex-col items-center relative">
        <div
          key={`ready-triangle-${hopTrigger}`}
          className={`transition-transform duration-300 ${
            isCopyHop ? 'animate-shape-hop-once' : 'shape-hop-stagger-3'
          } motion-reduce:animate-none`}
        >
          <div className="animate-float-1 motion-reduce:animate-none" style={{ animationDelay: '0.8s' }}>
            <svg
              viewBox="0 0 84 72"
              className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-[0_12px_24px_rgba(46,170,123,0.45)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="rdyWedgeBase" x1="15%" y1="10%" x2="90%" y2="90%">
                  <stop offset="0%" stopColor="#96ECCF" />
                  <stop offset="35%" stopColor="#65D9B3" />
                  <stop offset="75%" stopColor="#2EAA7B" />
                  <stop offset="100%" stopColor="#1E8C67" />
                </linearGradient>
                <linearGradient id="rdyWedgeGloss" x1="20%" y1="15%" x2="70%" y2="55%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                  <stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.55" />
                  <stop offset="70%" stopColor="#65D9B3" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#65D9B3" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M 16 10 C 16 6, 22 3.5, 26 6 L 70 32 C 74.5 34.5 74.5 41.5 70 44 L 26 70 C 22 72.5 16 70 16 66 Z"
                fill="url(#rdyWedgeBase)"
              />
              <path
                d="M 19 13 C 19 11, 23 9, 26 11 L 62 33 C 64 34.5 62 37 59 36 L 24 25 C 21 24 19 21 19 17 Z"
                fill="url(#rdyWedgeGloss)"
              />
              <circle cx="27" cy="11" r="3" fill="#FFFFFF" fillOpacity="0.9" />
              <path
                d="M 16.8 10.8 C 16.8 7.5, 22 5, 25.5 7 L 69.5 32.5 C 73.5 34.8 73.5 41 69.5 43.5 L 25.5 69 C 22 71.2 16.8 68.8 16.8 65.2 Z"
                stroke="#FFFFFF"
                strokeWidth="1"
                strokeOpacity="0.4"
              />
            </svg>
          </div>
        </div>

        {/* Ground shadow beneath green triangle */}
        <div className="h-4 flex items-center justify-center mt-2.5">
          <div className="w-14 sm:w-16 h-3 bg-black/40 rounded-full blur-[2.5px]" />
        </div>
      </div>
    </div>
  );
}
