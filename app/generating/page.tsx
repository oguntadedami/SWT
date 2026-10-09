'use client';

// app/generating/page.tsx
// Loading screen for "Start With This":
// - LOOK: Softened photographic hero backdrop (/photos/hero.webp) via FormBackground
// - Center group of 3 shapes matching the brand logo:
//     1. Tangerine Sphere (Red circle)
//     2. Signal Cyan Capsule (Blue vertical pill)
//     3. Fresh Mint Wedge (Green right-pointing rounded triangle)
// - Under each shape: soft elliptical ground shadow that shrinks and fades in the air
// - Below shapes: 1 line of white medium-weight text with soft text shadow, followed by 3 colored bouncing dots
// - Small muted line: "This can take up to 20 seconds."
// - Top-left link: "Back to my answers" -> /start
// - NO fake progress bar and NO percentages
// - MOTION:
//     - 3 shapes hop in a rolling wave (circle -> pill -> triangle), staggered by 180ms
//     - Squash before takeoff, snappy rise, stretch at peak, faster fall, landing squash + overshoot (~700ms hop)
//     - Pause ~400ms after 3rd lands, then repeats
//     - Triangle tilts slightly in air; pill wobbles on landing
//     - 3 dots bounce in sequence on a 1.2s loop
//     - Text cycles every 3.5s with a 300ms fade
//     - Prefers-reduced-motion: gentle pulse & fade, keeps text rotation
// - BEHAVIOR:
//     - Clearly named simulation constants at top (5s min, 15-20s simulated duration)
//     - Easily swappable for real AI/API call later

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import FormBackground from '@/components/FormBackground';
import { ArrowLeft } from 'lucide-react';

// ============================================================================
// SIMULATION CONSTANTS (5-7 seconds loading time)
// ============================================================================
const MIN_DISPLAY_TIME_MS = 5000;
const SIMULATED_DURATION_MIN_MS = 5000;
const SIMULATED_DURATION_MAX_MS = 7000;

// Text lines cycled during the 5-7s generation
const STATUS_MESSAGES = [
  'Looking at your skills',
  'Connecting your interests',
  'Spotting problems worth solving',
  'Fitting it to your timeline',
];

export default function GeneratingPage() {
  const router = useRouter();
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isTextFading, setIsTextFading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Text cycle every 1.4 seconds with 250ms fade
  useEffect(() => {
    const textInterval = setInterval(() => {
      setIsTextFading(true);
      setTimeout(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % STATUS_MESSAGES.length);
        setIsTextFading(false);
      }, 250);
    }, 1400);

    return () => clearInterval(textInterval);
  }, []);

  // 2. Simulated AI Call (random between 5000 and 7000 ms)
  useEffect(() => {
    const randomDuration =
      Math.floor(
        Math.random() * (SIMULATED_DURATION_MAX_MS - SIMULATED_DURATION_MIN_MS + 1)
      ) + SIMULATED_DURATION_MIN_MS;

    const actualDuration = Math.max(MIN_DISPLAY_TIME_MS, randomDuration);

    timerRef.current = setTimeout(() => {
      setIsCompleted(true);
      // Seamlessly navigate to ideas page upon simulation completion
      router.push('/ideas');
    }, actualDuration);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [router]);

  return (
    <main className="relative min-h-screen text-white flex flex-col justify-between selection:bg-[#FF5722] selection:text-white overflow-x-hidden">
      {/* Softened photographic hero backdrop + drifting cloud layers (reused from form page) */}
      <FormBackground />

      {/* TOP BAR: "Back to my answers" link at the top left */}
      <header className="w-full max-w-6xl mx-auto px-4 sm:px-8 pt-5 sm:pt-8 flex items-center justify-between relative z-20">
        <Link
          href="/start"
          className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/20 hover:bg-white/35 backdrop-blur-md border border-white/30 text-white font-medium text-xs sm:text-sm tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_4px_14px_rgba(0,0,0,0.12)]"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
          <span>Back to my answers</span>
        </Link>
      </header>

      {/* CENTER STAGE: The Three Hopping Shapes, Ground Shadows, and Live Text */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 relative z-10 text-center select-none">
        
        {/* SHAPES + GROUND SHADOWS CONTAINER */}
        <div className="flex items-end justify-center gap-7 sm:gap-11 mb-10 sm:mb-12 relative pt-12">
          
          {/* ============================================================ */}
          {/* 1. TANGERINE SPHERE (RED CIRCLE)                             */}
          {/* ============================================================ */}
          <div className="flex flex-col items-center relative">
            {/* Hopping Shape */}
            <div className="shape-hop-circle will-change-transform">
              <svg
                viewBox="0 0 64 64"
                className="w-14 h-14 sm:w-16 sm:h-16 drop-shadow-[0_8px_16px_rgba(255,79,36,0.35)]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Red circle shape"
              >
                <defs>
                  <radialGradient
                    id="genSphereBase"
                    cx="38%"
                    cy="32%"
                    r="62%"
                    fx="32%"
                    fy="26%"
                  >
                    <stop offset="0%" stopColor="#FFA07A" />
                    <stop offset="25%" stopColor="#FF6333" />
                    <stop offset="70%" stopColor="#FF4F24" />
                    <stop offset="92%" stopColor="#D93810" />
                    <stop offset="100%" stopColor="#9C2405" />
                  </radialGradient>
                  <radialGradient
                    id="genSphereBounce"
                    cx="60%"
                    cy="85%"
                    r="45%"
                  >
                    <stop offset="0%" stopColor="#FFB380" stopOpacity="0.55" />
                    <stop offset="60%" stopColor="#FF4F24" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient
                    id="genSphereSpecular"
                    cx="42%"
                    cy="36%"
                    r="48%"
                  >
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                    <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0.6" />
                    <stop offset="70%" stopColor="#FFA07A" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#FF4F24" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* 3D Sphere Body */}
                <circle cx="32" cy="32" r="28" fill="url(#genSphereBase)" />
                {/* Ambient Bounce Light */}
                <circle cx="32" cy="32" r="28" fill="url(#genSphereBounce)" />
                {/* Specular Hotspot */}
                <ellipse
                  cx="24"
                  cy="20"
                  rx="11"
                  ry="8"
                  transform="rotate(-25 24 20)"
                  fill="url(#genSphereSpecular)"
                />
                {/* Pinpoint Glint */}
                <ellipse
                  cx="21"
                  cy="17"
                  rx="3.5"
                  ry="2.5"
                  transform="rotate(-25 21 17)"
                  fill="#FFFFFF"
                  fillOpacity="0.95"
                />
                {/* Hairline Rim */}
                <circle
                  cx="32"
                  cy="32"
                  r="27"
                  stroke="#FFFFFF"
                  strokeWidth="1"
                  strokeOpacity="0.35"
                />
              </svg>
            </div>

            {/* Ground Shadow for Circle */}
            <div className="h-4 flex items-center justify-center mt-2.5">
              <div className="w-12 sm:w-14 h-3.5 bg-black/40 rounded-full blur-[2px] shadow-hop-circle will-change-transform" />
            </div>
          </div>

          {/* ============================================================ */}
          {/* 2. SIGNAL CYAN CAPSULE (BLUE ROUNDED PILL)                   */}
          {/* ============================================================ */}
          <div className="flex flex-col items-center relative">
            {/* Hopping Shape with landing wobble */}
            <div className="shape-hop-pill will-change-transform">
              <svg
                viewBox="0 0 46 68"
                className="w-10 h-[60px] sm:w-12 sm:h-[70px] drop-shadow-[0_8px_16px_rgba(86,200,242,0.35)]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Blue rounded pill shape"
              >
                <defs>
                  <linearGradient
                    id="genPillBase"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#2BB0E4" />
                    <stop offset="25%" stopColor="#56C8F2" />
                    <stop offset="55%" stopColor="#80D8F8" />
                    <stop offset="75%" stopColor="#56C8F2" />
                    <stop offset="100%" stopColor="#1E8AB5" />
                  </linearGradient>
                  <linearGradient
                    id="genPillDepth"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.65" />
                    <stop offset="18%" stopColor="#FFFFFF" stopOpacity="0" />
                    <stop offset="82%" stopColor="#0B4B66" stopOpacity="0" />
                    <stop offset="100%" stopColor="#093B52" stopOpacity="0.55" />
                  </linearGradient>
                  <linearGradient
                    id="genPillGloss"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.1" />
                  </linearGradient>
                </defs>

                {/* Pill Base */}
                <rect
                  x="2"
                  y="2"
                  width="42"
                  height="64"
                  rx="21"
                  fill="url(#genPillBase)"
                />
                {/* Pill Depth */}
                <rect
                  x="2"
                  y="2"
                  width="42"
                  height="64"
                  rx="21"
                  fill="url(#genPillDepth)"
                />
                {/* Longitudinal Specular Sheen */}
                <rect
                  x="8"
                  y="8"
                  width="9"
                  height="50"
                  rx="4.5"
                  fill="url(#genPillGloss)"
                />
                {/* Top Dome Reflection Glint */}
                <ellipse
                  cx="16"
                  cy="11"
                  rx="6"
                  ry="3.5"
                  fill="#FFFFFF"
                  fillOpacity="0.85"
                />
                {/* Specular Rim Hairline */}
                <rect
                  x="2.5"
                  y="2.5"
                  width="41"
                  height="63"
                  rx="20.5"
                  stroke="#FFFFFF"
                  strokeWidth="1"
                  strokeOpacity="0.4"
                />
              </svg>
            </div>

            {/* Ground Shadow for Pill */}
            <div className="h-4 flex items-center justify-center mt-2.5">
              <div className="w-10 sm:w-12 h-3.5 bg-black/40 rounded-full blur-[2px] shadow-hop-pill will-change-transform" />
            </div>
          </div>

          {/* ============================================================ */}
          {/* 3. FRESH MINT ROUNDED TRIANGLE (GREEN RIGHT-POINTING WEDGE)  */}
          {/* ============================================================ */}
          <div className="flex flex-col items-center relative">
            {/* Hopping Shape with air tilt */}
            <div className="shape-hop-triangle will-change-transform">
              <svg
                viewBox="0 0 64 64"
                className="w-14 h-14 sm:w-16 sm:h-16 drop-shadow-[0_8px_16px_rgba(101,217,179,0.35)]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Green right-pointing triangle shape"
              >
                <defs>
                  <linearGradient
                    id="genMintBase"
                    x1="15%"
                    y1="10%"
                    x2="90%"
                    y2="90%"
                  >
                    <stop offset="0%" stopColor="#96ECCF" />
                    <stop offset="35%" stopColor="#65D9B3" />
                    <stop offset="75%" stopColor="#3EBF95" />
                    <stop offset="100%" stopColor="#1E8C67" />
                  </linearGradient>
                  <linearGradient
                    id="genMintGloss"
                    x1="20%"
                    y1="15%"
                    x2="70%"
                    y2="55%"
                  >
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                    <stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.55" />
                    <stop offset="70%" stopColor="#65D9B3" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#65D9B3" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Triangle Base */}
                <path
                  d="M 12 10
                     C 12 6, 17 4, 21 6.5
                     L 54 28
                     C 58 30.5, 58 35.5, 54 38
                     L 21 59.5
                     C 17 62, 12 60, 12 55.5
                     Z"
                  fill="url(#genMintBase)"
                />
                {/* Top Ridge Gloss Bevel */}
                <path
                  d="M 15 14
                     C 15 11, 18 10, 21 12
                     L 48 30
                     C 50 31.5, 48 34, 45 33
                     L 19 23
                     C 16 22, 15 18, 15 14
                     Z"
                  fill="url(#genMintGloss)"
                />
                {/* Hairline Rim Highlight */}
                <path
                  d="M 12 10
                     C 12 6, 17 4, 21 6.5
                     L 54 28
                     C 58 30.5, 58 35.5, 54 38
                     L 21 59.5
                     C 17 62, 12 60, 12 55.5
                     Z"
                  stroke="#FFFFFF"
                  strokeWidth="1"
                  strokeOpacity="0.4"
                  fill="none"
                />
              </svg>
            </div>

            {/* Ground Shadow for Triangle */}
            <div className="h-4 flex items-center justify-center mt-2.5">
              <div className="w-13 sm:w-15 h-3.5 bg-black/40 rounded-full blur-[2px] shadow-hop-triangle will-change-transform" />
            </div>
          </div>

        </div>

        {/* ============================================================ */}
        {/* TEXT LINE & BOUNCING THREE COLORED DOTS                     */}
        {/* ============================================================ */}
        <div className="flex flex-col items-center">
          
          {/* Main animated message line */}
          <div className="inline-flex items-center justify-center gap-2.5 px-4 min-h-[36px]">
            <span
              className={`text-xl sm:text-2xl md:text-3xl font-medium text-white tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)] transition-opacity duration-300 ${
                isTextFading ? 'opacity-0' : 'opacity-100'
              }`}
            >
              {STATUS_MESSAGES[currentMessageIndex]}
            </span>

            {/* Three dots bouncing in sequence matching logo colors */}
            <div className="flex items-center gap-1.5 ml-0.5" aria-hidden="true">
              {/* Dot 1: Red */}
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#FF4F24] shadow-[0_0_8px_rgba(255,79,36,0.6)] dot-bounce-1" />
              {/* Dot 2: Blue */}
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#56C8F2] shadow-[0_0_8px_rgba(86,200,242,0.6)] dot-bounce-2" />
              {/* Dot 3: Green */}
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#65D9B3] shadow-[0_0_8px_rgba(101,217,179,0.6)] dot-bounce-3" />
            </div>
          </div>

          {/* Muted subtext line */}
          <p className="mt-3 text-xs sm:text-sm font-medium text-white/80 tracking-wide drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]">
            This takes about 5 to 7 seconds.
          </p>

          {isCompleted && (
            <p className="mt-4 text-xs font-mono text-emerald-300 bg-black/30 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-400/30 animate-pulse">
              Ready! Preparing your custom build plan...
            </p>
          )}

        </div>

      </div>

      {/* FOOTER PADDING / CLEAN BALANCE */}
      <footer className="w-full pb-6 text-center text-xs text-white/60 relative z-20 pointer-events-none">
        {/* Intentionally clean: No fake progress bar and no percentages */}
      </footer>

      {/* ============================================================ */}
      {/* PURE TRANSFORM & OPACITY MOTION KEYFRAMES (GPU ACCELERATED)   */}
      {/* ============================================================ */}
      <style jsx global>{`
        /* Cycle: 1480ms period.
           Hop duration = 700ms (47.3% of cycle).
           Circle delay = 0ms.
           Pill delay = 180ms.
           Triangle delay = 360ms.
           Triangle lands at 1060ms; pause until 1480ms = 420ms (~400ms pause).
        */

        /* 1. Circle Hop Keyframes */
        @keyframes hopCircle {
          0% {
            transform: translate3d(0, 0, 0) scale(1, 1);
          }
          3.5% {
            /* Quick squash before takeoff */
            transform: translate3d(0, 3px, 0) scale(1.15, 0.85);
          }
          11% {
            /* Snappy rise */
            transform: translate3d(0, -30px, 0) scale(0.92, 1.12);
          }
          19% {
            /* Stretch near peak */
            transform: translate3d(0, -42px, 0) scale(0.96, 1.05);
          }
          25% {
            /* Apex */
            transform: translate3d(0, -45px, 0) scale(1, 1);
          }
          33% {
            /* Faster fall */
            transform: translate3d(0, -12px, 0) scale(0.95, 1.08);
          }
          38% {
            /* Landing squash */
            transform: translate3d(0, 3px, 0) scale(1.18, 0.82);
          }
          42% {
            /* Small overshoot bounce */
            transform: translate3d(0, -5px, 0) scale(0.96, 1.03);
          }
          47.3% {
            /* Settle */
            transform: translate3d(0, 0, 0) scale(1, 1);
          }
          100% {
            /* Rest pause until next wave */
            transform: translate3d(0, 0, 0) scale(1, 1);
          }
        }

        /* 2. Pill Hop Keyframes (With Landing Wobble) */
        @keyframes hopPill {
          0% {
            transform: translate3d(0, 0, 0) scale(1, 1) rotate(0deg);
          }
          3.5% {
            /* Quick squash before takeoff */
            transform: translate3d(0, 3px, 0) scale(1.15, 0.85) rotate(0deg);
          }
          11% {
            /* Snappy rise */
            transform: translate3d(0, -30px, 0) scale(0.92, 1.12) rotate(0deg);
          }
          19% {
            /* Stretch at peak */
            transform: translate3d(0, -42px, 0) scale(0.96, 1.05) rotate(0deg);
          }
          25% {
            /* Apex */
            transform: translate3d(0, -45px, 0) scale(1, 1) rotate(0deg);
          }
          33% {
            /* Faster fall */
            transform: translate3d(0, -12px, 0) scale(0.95, 1.08) rotate(0deg);
          }
          38% {
            /* Landing squash with wobble start */
            transform: translate3d(0, 3px, 0) scale(1.18, 0.82) rotate(4.5deg);
          }
          42% {
            /* Overshoot bounce with wobble counter */
            transform: translate3d(0, -5px, 0) scale(0.96, 1.03) rotate(-3.5deg);
          }
          45% {
            /* Wobble dampening */
            transform: translate3d(0, -1px, 0) scale(1.01, 0.99) rotate(1.5deg);
          }
          47.3% {
            /* Settle */
            transform: translate3d(0, 0, 0) scale(1, 1) rotate(0deg);
          }
          100% {
            /* Rest pause */
            transform: translate3d(0, 0, 0) scale(1, 1) rotate(0deg);
          }
        }

        /* 3. Triangle Hop Keyframes (With Air Tilt) */
        @keyframes hopTriangle {
          0% {
            transform: translate3d(0, 0, 0) scale(1, 1) rotate(0deg);
          }
          3.5% {
            /* Quick squash before takeoff */
            transform: translate3d(0, 3px, 0) scale(1.15, 0.85) rotate(0deg);
          }
          11% {
            /* Snappy rise with air tilt */
            transform: translate3d(0, -30px, 0) scale(0.92, 1.12) rotate(7deg);
          }
          19% {
            /* Stretch at peak with full air tilt */
            transform: translate3d(0, -42px, 0) scale(0.96, 1.05) rotate(13deg);
          }
          25% {
            /* Apex */
            transform: translate3d(0, -45px, 0) scale(1, 1) rotate(12deg);
          }
          33% {
            /* Faster fall, straightening */
            transform: translate3d(0, -12px, 0) scale(0.95, 1.08) rotate(4deg);
          }
          38% {
            /* Landing squash flat */
            transform: translate3d(0, 3px, 0) scale(1.18, 0.82) rotate(0deg);
          }
          42% {
            /* Small overshoot */
            transform: translate3d(0, -5px, 0) scale(0.96, 1.03) rotate(0deg);
          }
          47.3% {
            /* Settle */
            transform: translate3d(0, 0, 0) scale(1, 1) rotate(0deg);
          }
          100% {
            /* Rest pause */
            transform: translate3d(0, 0, 0) scale(1, 1) rotate(0deg);
          }
        }

        /* Ground Shadow Synchronized Keyframes */
        @keyframes shadowPulse {
          0% {
            transform: scale(1, 1);
            opacity: 0.38;
          }
          3.5% {
            /* Expands slightly during pre-squash */
            transform: scale(1.15, 1);
            opacity: 0.44;
          }
          11% {
            transform: scale(0.7, 0.7);
            opacity: 0.24;
          }
          19% {
            /* Shrinks and fades at peak */
            transform: scale(0.44, 0.44);
            opacity: 0.12;
          }
          25% {
            transform: scale(0.4, 0.4);
            opacity: 0.1;
          }
          33% {
            transform: scale(0.78, 0.78);
            opacity: 0.28;
          }
          38% {
            /* Expands and darkens during landing squash */
            transform: scale(1.22, 1.1);
            opacity: 0.46;
          }
          42% {
            transform: scale(0.94, 0.94);
            opacity: 0.32;
          }
          47.3% {
            transform: scale(1, 1);
            opacity: 0.38;
          }
          100% {
            transform: scale(1, 1);
            opacity: 0.38;
          }
        }

        /* Animation Assignments with exact 180ms stagger */
        .shape-hop-circle {
          animation: hopCircle 1.48s cubic-bezier(0.2, 0.8, 0.2, 1) infinite;
          transform-origin: bottom center;
        }
        .shadow-hop-circle {
          animation: shadowPulse 1.48s cubic-bezier(0.2, 0.8, 0.2, 1) infinite;
        }

        .shape-hop-pill {
          animation: hopPill 1.48s cubic-bezier(0.2, 0.8, 0.2, 1) infinite 0.18s;
          transform-origin: bottom center;
        }
        .shadow-hop-pill {
          animation: shadowPulse 1.48s cubic-bezier(0.2, 0.8, 0.2, 1) infinite 0.18s;
        }

        .shape-hop-triangle {
          animation: hopTriangle 1.48s cubic-bezier(0.2, 0.8, 0.2, 1) infinite 0.36s;
          transform-origin: bottom center;
        }
        .shadow-hop-triangle {
          animation: shadowPulse 1.48s cubic-bezier(0.2, 0.8, 0.2, 1) infinite 0.36s;
        }

        /* Dot Bounce Animation in sequence on 1.2s loop */
        @keyframes dotBounceWave {
          0%, 40%, 100% {
            transform: translate3d(0, 0, 0);
          }
          20% {
            transform: translate3d(0, -6px, 0);
          }
        }
        .dot-bounce-1 {
          animation: dotBounceWave 1.2s ease-in-out infinite 0s;
        }
        .dot-bounce-2 {
          animation: dotBounceWave 1.2s ease-in-out infinite 0.2s;
        }
        .dot-bounce-3 {
          animation: dotBounceWave 1.2s ease-in-out infinite 0.4s;
        }

        /* Prefers Reduced Motion: Gentle pulse and fade, stationary shadows, keep text rotation */
        @media (prefers-reduced-motion: reduce) {
          @keyframes gentleReducedPulse {
            0%, 100% {
              transform: scale(1);
              opacity: 0.85;
            }
            50% {
              transform: scale(1.04);
              opacity: 1;
            }
          }

          .shape-hop-circle,
          .shape-hop-pill,
          .shape-hop-triangle {
            animation: gentleReducedPulse 2.8s ease-in-out infinite !important;
            transform-origin: center center;
          }

          .shadow-hop-circle,
          .shadow-hop-pill,
          .shadow-hop-triangle {
            animation: none !important;
            transform: scale(1, 1) !important;
            opacity: 0.35 !important;
          }

          .dot-bounce-1,
          .dot-bounce-2,
          .dot-bounce-3 {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </main>
  );
}
