'use client';

// components/plan/PlanScreen.tsx
// Complete redesign of the Build Plan screen at /plan matching the landing page's visual world:
// - Fixed softened hero photo backdrop (/hero/hero.webp) with 30-35% dark overlay & sky-blue fallback
// - Per-idea accent (--accent) from the selected idea's shape color
// - Header (~85vh) with hopping/bobbing brand shape, huge product name, sticker tags, buttons, doodles
// - Three Chapters (id: chapter-idea, chapter-scope, chapter-start):
//     * Chapter 1: THE IDEA (01 Product, 02 Problem, 03 Target user, 04 MVP band, Why it fits you sticker)
//     * Chapter 2: THE SCOPE (BUILD NOW vs NOT YET two-column comparison)
//     * Chapter 3: THE START (07 Tool stack, 08 Roadmap tiles, 09 AI starter prompt block)
// - End of page: disclaimer line + large orange pill "I'M READY TO START" -> /ready
// - Floating glass PlanDock with active chapter observation, active shape hop, prompt copy & download menu

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BuildPlan } from '@/lib/plan';
import { Idea } from '@/lib/ideas';
import { createPlanDocument } from '@/lib/planDocument';
import { getIdeaAccentColor } from '@/lib/planTheme';

import PlanHeader from './PlanHeader';
import IdeaChapter from './IdeaChapter';
import ScopeChapter from './ScopeChapter';
import StartChapter from './StartChapter';
import PlanDock from './PlanDock';

interface PlanScreenProps {
  plan: BuildPlan;
  idea: Idea;
}

export default function PlanScreen({ plan, idea }: PlanScreenProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [announcement, setAnnouncement] = useState('');

  // Per-idea accent color matching the logo shape
  const accentColor = useMemo(() => getIdeaAccentColor(idea.id), [idea.id]);

  // Single neutral document representation for downloads
  const doc = useMemo(() => createPlanDocument(plan, idea), [plan, idea]);

  // Copy AI starter prompt to clipboard with announcement
  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(plan.starterPrompt);
      setIsCopied(true);
      setAnnouncement('AI Starter Prompt copied to clipboard');
      setTimeout(() => setIsCopied(false), 2200);
    } catch {
      // Fallback
      setAnnouncement('Could not copy prompt automatically');
    }
  };

  return (
    <div
      className="relative min-h-screen text-zinc-900 selection:bg-[#FF4F24] selection:text-white"
      style={{ ['--accent' as string]: accentColor }}
    >
      {/* Polite live announcement for screen readers */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      {/* FIXED FULL-SCREEN PHOTOGRAPHIC LANDSCAPE BACKGROUND */}
      <div className="fixed inset-0 -z-20 pointer-events-none select-none overflow-hidden bg-gradient-to-b from-[#56C8F2] via-[#7AE0FA] to-[#B6EDFA]">
        <Image
          src="/hero/hero.webp"
          alt="Rolling landscape under a bright blue sky"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Measured 30-35% dark overlay for 4.5:1 text contrast and atmospheric depth */}
        <div className="absolute inset-0 bg-black/32 backdrop-brightness-[0.94]" />
      </div>

      {/* HEADER SECTION (~85vh) */}
      <PlanHeader
        idea={idea}
        plan={plan}
        doc={doc}
        accentColor={accentColor}
        isCopied={isCopied}
        onCopyPrompt={handleCopyPrompt}
      />

      {/* MAIN CHAPTERS CONTAINER (~96px between chapters, space-y-24) */}
      <main className="relative z-10 w-full flex flex-col items-center space-y-24 pb-24">
        {/* CHAPTER 1: THE IDEA */}
        <IdeaChapter
          idea={idea}
          plan={plan}
          accentColor={accentColor}
        />

        {/* CHAPTER 2: THE SCOPE */}
        <ScopeChapter
          plan={plan}
          accentColor={accentColor}
        />

        {/* CHAPTER 3: THE START */}
        <StartChapter
          plan={plan}
          accentColor={accentColor}
          isCopied={isCopied}
          onCopyPrompt={handleCopyPrompt}
        />

        {/* END OF PAGE CALLOUT (ON THE PHOTO) */}
        <div className="w-full max-w-xl mx-auto px-4 sm:px-6 pt-6 pb-12 text-center flex flex-col items-center">
          {/* Subtle note in white with text shadow */}
          <p className="text-sm sm:text-base text-white/95 font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] leading-relaxed mb-6 max-w-md mx-auto">
            This plan is a starting point. It doesn&apos;t guarantee your idea will succeed.
          </p>

          {/* Large solid orange pill navigating to /ready */}
          <Link
            href="/ready"
            className="inline-flex items-center justify-center px-8 sm:px-12 py-4 sm:py-5 rounded-full bg-[#FF4F24] hover:bg-[#E53E14] active:bg-[#CC340D] text-white font-black text-base sm:text-lg tracking-wider uppercase shadow-[0_16px_36px_rgba(255,79,36,0.55)] hover:scale-105 active:scale-95 transition-all duration-200 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
          >
            I&apos;M READY TO START
          </Link>
        </div>
      </main>

      {/* PADDING BUFFER BEFORE DOCK (Reserves space so dock never overlaps content) */}
      <div className="h-28 sm:h-32" aria-hidden="true" />

      {/* FIXED GLASS BOTTOM NAVIGATION DOCK */}
      <PlanDock
        doc={doc}
        accentColor={accentColor}
        isCopied={isCopied}
        onCopyPrompt={handleCopyPrompt}
      />
    </div>
  );
}
