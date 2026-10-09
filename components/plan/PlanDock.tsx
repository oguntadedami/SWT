'use client';

// components/plan/PlanDock.tsx
// Glass navigation dock fixed near the bottom for /plan:
// - 3 chapter jump buttons with brand shape icons:
//     * Red circle -> The Idea (#chapter-idea)
//     * Blue pill -> The Scope (#chapter-scope)
//     * Green triangle -> The Start (#chapter-start)
// - Chapter currently in view is highlighted via IntersectionObserver
// - Shape does one hop on becoming active
// - Clicking smooth-scrolls to chapter
// - Thin divider
// - Copy button (copies AI prompt)
// - Download button (opens DownloadMenu upward)
// - Nav landmark with aria-current="true"
// - Hides smoothly on scroll down, reveals on scroll up

import React, { useEffect, useState, useRef } from 'react';
import { Copy, Check } from 'lucide-react';
import { PlanDocument } from '@/lib/planDocument';
import DownloadMenu from './DownloadMenu';

interface PlanDockProps {
  doc: PlanDocument;
  accentColor: string;
  isCopied: boolean;
  onCopyPrompt: () => void;
}

const CHAPTERS = [
  { id: 'chapter-idea', label: 'Idea', shape: 'circle' as const },
  { id: 'chapter-scope', label: 'Scope', shape: 'pill' as const },
  { id: 'chapter-start', label: 'Start', shape: 'triangle' as const },
];

export default function PlanDock({
  doc,
  accentColor,
  isCopied,
  onCopyPrompt,
}: PlanDockProps) {
  const [activeChapter, setActiveChapter] = useState<string>('chapter-idea');
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  // 1. IntersectionObserver to track active chapter in view
  useEffect(() => {
    const handleIntersect: IntersectionObserverCallback = (entries) => {
      // Find the entry with the highest intersection ratio or top closest to center
      const intersecting = entries.filter((e) => e.isIntersecting);
      if (intersecting.length > 0) {
        // Pick the one closest to middle of screen
        const sorted = [...intersecting].sort((a, b) => {
          return Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top);
        });
        setActiveChapter(sorted[0].target.id);
      }
    };

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '-20% 0px -40% 0px',
      threshold: [0.1, 0.3, 0.6],
    });

    CHAPTERS.forEach((ch) => {
      const el = document.getElementById(ch.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // 2. Hide dock on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY.current;

      if (currentScrollY <= 80) {
        setIsVisible(true);
      } else if (diff > 10) {
        setIsVisible(false);
      } else if (diff < -10) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToChapter = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    // Respect prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    el.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  return (
    <nav
      aria-label="Build Plan Navigation Dock"
      className={`fixed bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] left-1/2 -translate-x-1/2 z-50 max-w-[calc(100vw-1.5rem)] will-change-transform transition-all duration-300 ${
        isVisible
          ? 'translate-y-0 opacity-100 pointer-events-auto'
          : 'translate-y-24 opacity-0 pointer-events-none'
      }`}
    >
      <div className="liquid-glass rounded-full px-3 sm:px-5 py-2 shadow-[0_20px_50px_rgba(0,0,0,0.55)] flex items-center gap-1.5 sm:gap-2">
        {/* CHAPTER BUTTONS */}
        {CHAPTERS.map((ch) => {
          const isActive = activeChapter === ch.id;

          return (
            <button
              key={ch.id}
              type="button"
              aria-current={isActive ? 'true' : undefined}
              onClick={() => handleScrollToChapter(ch.id)}
              className={`group flex flex-col items-center justify-center gap-1 px-3 sm:px-4 py-1.5 rounded-2xl transition-all duration-200 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                isActive
                  ? 'bg-white/25 text-white shadow-inner scale-105'
                  : 'text-white/75 hover:text-white hover:bg-white/10 active:scale-95'
              }`}
            >
              {/* BRAND SHAPE ICON */}
              <div
                className={`w-7 h-7 flex items-center justify-center ${
                  isActive ? 'animate-shape-hop-once motion-reduce:animate-none' : ''
                }`}
              >
                {/* 1. Red circle */}
                {ch.shape === 'circle' && (
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 drop-shadow-[0_2px_4px_rgba(255,79,36,0.5)]"
                    fill="none"
                  >
                    <circle cx="12" cy="12" r="10" fill="#FF4F24" />
                    <ellipse cx="9" cy="8" rx="3.5" ry="2.2" transform="rotate(-25 9 8)" fill="#FFFFFF" fillOpacity="0.8" />
                  </svg>
                )}

                {/* 2. Blue pill */}
                {ch.shape === 'pill' && (
                  <svg
                    viewBox="0 0 20 28"
                    className="w-4 h-6 drop-shadow-[0_2px_4px_rgba(50,122,230,0.5)]"
                    fill="none"
                  >
                    <rect x="2" y="2" width="16" height="24" rx="8" fill="#327AE6" />
                    <rect x="5" y="5" width="2.5" height="18" rx="1.25" fill="#FFFFFF" fillOpacity="0.75" />
                  </svg>
                )}

                {/* 3. Green triangle */}
                {ch.shape === 'triangle' && (
                  <svg
                    viewBox="0 0 26 24"
                    className="w-5 h-5 drop-shadow-[0_2px_4px_rgba(46,170,123,0.5)]"
                    fill="none"
                  >
                    <path
                      d="M 5 3 C 5 1.5, 7 0.8, 8.5 1.8 L 22.5 10.5 C 24 11.5, 24 13.5, 22.5 14.5 L 8.5 23.2 C 7 24.2, 5 23.5, 5 22 Z"
                      fill="#2EAA7B"
                    />
                    <path
                      d="M 6.5 4 C 6.5 3, 8 2.5, 9 3.2 L 20 10.5 C 20.8 11.2, 20.8 12.2, 19.5 12.2 L 7.5 7 Z"
                      fill="#FFFFFF"
                      fillOpacity="0.75"
                    />
                  </svg>
                )}
              </div>

              {/* Label */}
              <span className="text-[11px] sm:text-xs font-semibold tracking-wide leading-none">
                {ch.label}
              </span>
            </button>
          );
        })}

        {/* THIN VERTICAL DIVIDER */}
        <div className="w-px h-8 bg-white/25 mx-1" aria-hidden="true" />

        {/* COPY PROMPT BUTTON */}
        <button
          type="button"
          onClick={onCopyPrompt}
          aria-label="Copy AI Starter Prompt"
          className="group flex flex-col items-center justify-center gap-1 px-3 sm:px-4 py-1.5 rounded-2xl text-white/80 hover:text-white hover:bg-white/10 active:scale-95 transition-all select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <div className="w-8 h-8 rounded-full bg-white/15 group-hover:bg-white/25 flex items-center justify-center transition-all group-hover:scale-105 active:scale-95 shadow-sm">
            {isCopied ? (
              <Check className="w-4 h-4 text-[#65D9B3] stroke-[2.5]" />
            ) : (
              <Copy className="w-4 h-4 text-white stroke-[2.2]" />
            )}
          </div>
          <span className="text-[11px] sm:text-xs font-semibold tracking-wide text-white/90">
            {isCopied ? 'Copied' : 'Copy'}
          </span>
        </button>

        {/* DOWNLOAD MENU (OPENS UPWARD IN DOCK) */}
        <DownloadMenu
          doc={doc}
          accentColor={accentColor}
          variant="dock"
          forceUpward={true}
        />
      </div>
    </nav>
  );
}
