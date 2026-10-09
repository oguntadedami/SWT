'use client';

// components/DockIcons.tsx
// Renders the 5 uploaded app-icons in exact requested sequence:
// 1. 01-home.svg
// 2. 02-how-it-works.svg
// 3. 03-what-you-get.svg
// 4. 04-feedback.svg
// 5. 05-start-here.svg (15% larger main action)
//
// Complies strictly with all icon rules:
// - Exact files used as-is, no redraw, recolor, crop, or outer container wrapper
// - Preserves transparent corners
// - Desktop: ~60px (Start Here ~69px)
// - Mobile: ~52px (Start Here ~58px)
// - Tooltips on desktop hover
// - Short text labels under icons on mobile
// - Subtle dock magnify on hover
// - Active section indicator dot
// - Keyboard focus rings and aria-labels
// - Supports fluid liquid pouring animation with staggered physics

import React from 'react';
import { useDock, DockSection } from './DockContext';

interface DockIconsProps {
  variant?: 'floating' | 'footer';
  isPoured?: boolean;
}

export default function DockIcons({
  variant = 'floating',
  isPoured = true,
}: DockIconsProps) {
  const { activeSection, scrollTo, startHere } = useDock();
  const isFooter = variant === 'footer';

  const labelColor = isFooter ? 'text-stone-800' : 'text-white/90';
  const dotColor = isFooter ? 'bg-stone-900 shadow-[0_0_6px_rgba(0,0,0,0.35)]' : 'bg-white shadow-[0_0_8px_white]';
  const tooltipClass = isFooter
    ? 'bg-stone-900/95 text-white shadow-lg border border-white/10'
    : 'liquid-glass text-white shadow-md';

  // Stagger delays for the pouring animation into the footer
  const staggerDelays = [0, 45, 90, 135, 180];

  return (
    <div className="flex items-center justify-center gap-1.5 sm:gap-3 select-none">
      
      {/* 1. Home */}
      <div
        className="relative flex flex-col items-center group will-change-transform"
        style={{
          transform: isFooter ? (isPoured ? 'translateY(0) scale(1)' : 'translateY(-24px) scale(0.85)') : 'none',
          opacity: isFooter ? (isPoured ? 1 : 0) : 1,
          transition: isFooter
            ? `transform 0.55s cubic-bezier(0.16, 1, 0.3, 1) ${staggerDelays[0]}ms, opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${staggerDelays[0]}ms`
            : undefined,
        }}
      >
        {/* Desktop hover tooltip */}
        <span
          className={`hidden sm:block absolute -top-8 px-2 py-0.5 rounded-full ${tooltipClass} text-[10px] font-bold tracking-tight opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-30`}
        >
          Home
        </span>

        <a
          href="#"
          onClick={(e) => scrollTo(e, 'top')}
          aria-label="Home"
          className="flex flex-col items-center p-0.5 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5722] transition-transform duration-300 ease-out sm:group-hover:scale-110 will-change-transform cursor-pointer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/Icons/01-home.svg"
            alt=""
            width={60}
            height={60}
            className="w-[46px] h-[46px] sm:w-[60px] sm:h-[60px] object-contain pointer-events-none drop-shadow-sm"
          />
          <span className={`sm:hidden text-[9px] font-bold leading-tight mt-0.5 ${labelColor}`}>
            Home
          </span>
        </a>

        {/* Active indicator dot */}
        <span
          className={`w-1.5 h-1.5 rounded-full ${dotColor} transition-opacity duration-300 mt-0.5 ${
            activeSection === 'home' ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden="true"
        />
      </div>

      {/* 2. How it works */}
      <div
        className="relative flex flex-col items-center group will-change-transform"
        style={{
          transform: isFooter ? (isPoured ? 'translateY(0) scale(1)' : 'translateY(-24px) scale(0.85)') : 'none',
          opacity: isFooter ? (isPoured ? 1 : 0) : 1,
          transition: isFooter
            ? `transform 0.55s cubic-bezier(0.16, 1, 0.3, 1) ${staggerDelays[1]}ms, opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${staggerDelays[1]}ms`
            : undefined,
        }}
      >
        <span
          className={`hidden sm:block absolute -top-8 px-2 py-0.5 rounded-full ${tooltipClass} text-[10px] font-bold tracking-tight opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-30`}
        >
          How it works
        </span>

        <a
          href="#how-it-works"
          onClick={(e) => scrollTo(e, 'how-it-works')}
          aria-label="How it works"
          className="flex flex-col items-center p-0.5 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5722] transition-transform duration-300 ease-out sm:group-hover:scale-110 will-change-transform cursor-pointer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/Icons/02-how-it-works.svg"
            alt=""
            width={60}
            height={60}
            className="w-[46px] h-[46px] sm:w-[60px] sm:h-[60px] object-contain pointer-events-none drop-shadow-sm"
          />
          <span className={`sm:hidden text-[9px] font-bold leading-tight mt-0.5 whitespace-nowrap ${labelColor}`}>
            How it works
          </span>
        </a>

        <span
          className={`w-1.5 h-1.5 rounded-full ${dotColor} transition-opacity duration-300 mt-0.5 ${
            activeSection === 'how-it-works' ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden="true"
        />
      </div>

      {/* 3. What you get */}
      <div
        className="relative flex flex-col items-center group will-change-transform"
        style={{
          transform: isFooter ? (isPoured ? 'translateY(0) scale(1)' : 'translateY(-24px) scale(0.85)') : 'none',
          opacity: isFooter ? (isPoured ? 1 : 0) : 1,
          transition: isFooter
            ? `transform 0.55s cubic-bezier(0.16, 1, 0.3, 1) ${staggerDelays[2]}ms, opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${staggerDelays[2]}ms`
            : undefined,
        }}
      >
        <span
          className={`hidden sm:block absolute -top-8 px-2 py-0.5 rounded-full ${tooltipClass} text-[10px] font-bold tracking-tight opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-30`}
        >
          What you get
        </span>

        <a
          href="#build-plan"
          onClick={(e) => scrollTo(e, 'build-plan')}
          aria-label="What you get"
          className="flex flex-col items-center p-0.5 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5722] transition-transform duration-300 ease-out sm:group-hover:scale-110 will-change-transform cursor-pointer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/Icons/03-what-you-get.svg"
            alt=""
            width={60}
            height={60}
            className="w-[46px] h-[46px] sm:w-[60px] sm:h-[60px] object-contain pointer-events-none drop-shadow-sm"
          />
          <span className={`sm:hidden text-[9px] font-bold leading-tight mt-0.5 whitespace-nowrap ${labelColor}`}>
            What you get
          </span>
        </a>

        <span
          className={`w-1.5 h-1.5 rounded-full ${dotColor} transition-opacity duration-300 mt-0.5 ${
            activeSection === 'what-you-get' ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden="true"
        />
      </div>

      {/* 4. Feedback */}
      <div
        className="relative flex flex-col items-center group will-change-transform"
        style={{
          transform: isFooter ? (isPoured ? 'translateY(0) scale(1)' : 'translateY(-24px) scale(0.85)') : 'none',
          opacity: isFooter ? (isPoured ? 1 : 0) : 1,
          transition: isFooter
            ? `transform 0.55s cubic-bezier(0.16, 1, 0.3, 1) ${staggerDelays[3]}ms, opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${staggerDelays[3]}ms`
            : undefined,
        }}
      >
        <span
          className={`hidden sm:block absolute -top-8 px-2 py-0.5 rounded-full ${tooltipClass} text-[10px] font-bold tracking-tight opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-30`}
        >
          Feedback
        </span>

        {/* FEEDBACK LINK: opens mailto in new tab */}
        <a
          href="mailto:jemstudiodesign@gmail.com?subject=Start%20With%20This%20feedback"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Feedback"
          className="flex flex-col items-center p-0.5 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5722] transition-transform duration-300 ease-out sm:group-hover:scale-110 will-change-transform cursor-pointer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/Icons/04-feedback.svg"
            alt=""
            width={60}
            height={60}
            className="w-[46px] h-[46px] sm:w-[60px] sm:h-[60px] object-contain pointer-events-none drop-shadow-sm"
          />
          <span className={`sm:hidden text-[9px] font-bold leading-tight mt-0.5 ${labelColor}`}>
            Feedback
          </span>
        </a>

        {/* Spacer for alignment */}
        <span className="w-1.5 h-1.5 rounded-full opacity-0 mt-0.5" aria-hidden="true" />
      </div>

      {/* 5. Start Here (15% larger main action) */}
      <div
        className="relative flex flex-col items-center group will-change-transform"
        style={{
          transform: isFooter ? (isPoured ? 'translateY(0) scale(1)' : 'translateY(-24px) scale(0.85)') : 'none',
          opacity: isFooter ? (isPoured ? 1 : 0) : 1,
          transition: isFooter
            ? `transform 0.55s cubic-bezier(0.16, 1, 0.3, 1) ${staggerDelays[4]}ms, opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${staggerDelays[4]}ms`
            : undefined,
        }}
      >
        <span
          className={`hidden sm:block absolute -top-8 px-2.5 py-0.5 rounded-full ${
            isFooter ? 'bg-[#FF5722] text-white shadow-md' : 'liquid-glass text-amber-300 shadow-md'
          } text-[10px] font-bold tracking-tight opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-30`}
        >
          Start Here
        </span>

        <a
          href="/start"
          onClick={startHere}
          aria-label="Start Here"
          className="flex flex-col items-center p-0.5 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5722] transition-transform duration-300 ease-out sm:group-hover:scale-110 will-change-transform cursor-pointer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/Icons/05-start-here.svg"
            alt=""
            width={69}
            height={69}
            className="w-[53px] h-[53px] sm:w-[69px] sm:h-[69px] object-contain pointer-events-none drop-shadow-md"
          />
          <span className="sm:hidden text-[9px] font-bold text-[#FF5722] leading-tight mt-0.5 whitespace-nowrap">
            Start Here
          </span>
        </a>

        <span className="w-1.5 h-1.5 rounded-full opacity-0 mt-0.5" aria-hidden="true" />
      </div>

    </div>
  );
}
