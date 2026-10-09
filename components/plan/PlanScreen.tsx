'use client';

// components/plan/PlanScreen.tsx
// Editorial "Front Page" Build Plan Screen:
// - Fixed softened photographic hero backdrop with deep-blue gradient fallback
// - Warm off-white newsprint sheet (#F6F3EC) rising into place on arrival
// - Per-idea accent variable (--accent)
// - Back to ideas link in frosted pill above the sheet
// - Single selected idea plan ONLY
// - Landmark regions, proper header levels, accessible 4.5:1 contrast, no text < 14px

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { BuildPlan } from '@/lib/plan';
import { Idea } from '@/lib/ideas';
import { createPlanDocument } from '@/lib/planDocument';
import { getIdeaAccentColor, PLAN_COLORS } from '@/lib/planTheme';

import Masthead from './Masthead';
import StatsStrip from './StatsStrip';
import LeadStory from './LeadStory';
import SidebarUser from './SidebarUser';
import PullQuote from './PullQuote';
import McpBand from './McpBand';
import Ledger from './Ledger';
import ToolTable from './ToolTable';
import Schedule from './Schedule';
import Dispatch from './Dispatch';
import PlanFooter from './PlanFooter';
import StickyBar, { SECTIONS } from './StickyBar';

interface PlanScreenProps {
  plan: BuildPlan;
  idea: Idea;
}

export default function PlanScreen({ plan, idea }: PlanScreenProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [activeSection, setActiveSection] = useState('section-01');
  const [announcement, setAnnouncement] = useState('');

  const mastheadRef = useRef<HTMLDivElement>(null);

  // Per-idea accent color matching the brand logo from shared values
  const accentColor = getIdeaAccentColor(idea.id);

  // Single source of truth neutral document structure
  const planDocument = useMemo(() => createPlanDocument(plan, idea), [plan, idea]);

  // Copy AI Starter Prompt to clipboard
  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(plan.starterPrompt);
      setIsCopied(true);
      setAnnouncement('Prompt copied to clipboard');
      setTimeout(() => setIsCopied(false), 2200);
    } catch {
      // Fallback
      setAnnouncement('Could not copy prompt automatically');
    }
  };

  // Scroll listener / observer for Masthead visibility and Active Section
  useEffect(() => {
    const handleScroll = () => {
      if (mastheadRef.current) {
        const rect = mastheadRef.current.getBoundingClientRect();
        setShowStickyBar(rect.bottom < 50);
      }

      // Track active section for Jump to menu
      for (const sec of SECTIONS) {
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180 && rect.bottom >= 180) {
            setActiveSection(sec.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="relative min-h-screen text-stone-900 selection:bg-[#FF4F24] selection:text-white"
      style={{ ['--accent' as string]: accentColor }}
    >
      {/* Polite live announcement for screen readers */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      {/* 1. FIXED BACKGROUND: Softened hero photo with deep-blue gradient fallback */}
      <div className="fixed inset-0 -z-30 overflow-hidden pointer-events-none select-none bg-gradient-to-b from-[#0B1320] via-[#10223A] to-[#0A1118]">
        <Image
          src="/photos/hero.webp"
          alt="Atmospheric sky background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top filter blur-[3px] scale-105 opacity-80"
          referrerPolicy="no-referrer"
        />
        {/* Soft dark wash scrim */}
        <div className="absolute inset-0 bg-black/35 backdrop-blur-[1px]" />
      </div>

      {/* 2. TOP ACTION: Frosted pill "Back to ideas" above the sheet */}
      <div className="w-full max-w-[1120px] mx-auto px-4 sm:px-6 pt-5 pb-3 flex items-center justify-between relative z-20">
        <Link
          href="/ideas"
          className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/75 hover:bg-white text-stone-900 font-semibold text-xs sm:text-sm tracking-wide backdrop-blur-md border border-white/60 shadow-md transition-all duration-200 hover:-translate-y-0.5"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
          <span>Back to ideas</span>
        </Link>
      </div>

      {/* 3. THE "SHEET": Warm off-white newsprint (#F6F3EC) rising into place on arrival */}
      <main className="w-full max-w-[1120px] mx-auto px-3 sm:px-4 pb-20 relative z-10">
        <article className="w-full bg-[#F6F3EC] rounded-t-[28px] shadow-[0_24px_60px_rgba(0,0,0,0.28),0_4px_16px_rgba(0,0,0,0.12)] border border-stone-300/80 overflow-hidden text-[#1F2421] animate-sheet-rise">
          {/* Masthead */}
          <div ref={mastheadRef}>
            <Masthead
              ideaId={idea.id}
              productName={plan.productName}
              accentColor={accentColor}
            />
          </div>

          {/* Sheet Body Content */}
          <div className="px-5 sm:px-10 lg:px-12 pt-6 sm:pt-8 pb-12">
            {/* Lead Story: 01 The Product */}
            <LeadStory
              productName={plan.productName}
              definition={plan.definition}
              problem={plan.problem}
              accentColor={accentColor}
            />

            {/* Stats Strip & Action Buttons */}
            <StatsStrip
              buildTime={idea.buildTime}
              difficulty={idea.difficulty}
              toolCount={plan.toolStack.length}
              stageCount={plan.roadmap.length}
              onCopyPrompt={handleCopyPrompt}
              isCopied={isCopied}
              planDocument={planDocument}
              accentColor={accentColor}
            />

            {/* 12-COLUMN EDITORIAL GRID: 02 The Problem / 03 The Target User / Pull Quote / 04 The MVP */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 border-t border-stone-300 pt-8">
              {/* Left / Main Column (8 cols): MVP Band */}
              <div className="lg:col-span-8">
                <McpBand
                  mvpSummary={plan.mvpSummary}
                  adjustmentNote={plan.adjustmentNote}
                  accentColor={accentColor}
                />
              </div>

              {/* Right / Sidebar Column (4 cols), separated by vertical hairline */}
              <div className="lg:col-span-4 lg:border-l lg:border-stone-300 lg:pl-8">
                {/* 03 The Target User */}
                <SidebarUser
                  ideaId={idea.id}
                  targetUser={plan.targetUser}
                  accentColor={accentColor}
                />

                {/* Pull Quote */}
                <PullQuote
                  whyFitsYou={idea.whyFitsYou}
                  accentColor={accentColor}
                />
              </div>
            </div>

            {/* Full Width: The Ledger (05 What to build & 06 What not to build yet) */}
            <Ledger
              buildNow={plan.buildNow}
              doNotBuildYet={plan.doNotBuildYet}
              accentColor={accentColor}
            />

            {/* Full Width: 07 The Tool Stack */}
            <ToolTable
              toolStack={plan.toolStack}
              accentColor={accentColor}
            />

            {/* Full Width: 08 The Build Roadmap */}
            <Schedule
              roadmap={plan.roadmap}
              accentColor={accentColor}
            />

            {/* Full Width: 09 The AI Starter Prompt */}
            <Dispatch
              starterPrompt={plan.starterPrompt}
              onCopyPrompt={handleCopyPrompt}
              isCopied={isCopied}
              accentColor={accentColor}
            />

            {/* Editorial Footer */}
            <PlanFooter onReadyClick={() => {}} />
          </div>
        </article>
      </main>

      {/* 4. SLIM STICKY BAR: Visible when masthead scrolls out of view */}
      <StickyBar
        productName={plan.productName}
        isVisible={showStickyBar}
        onCopyPrompt={handleCopyPrompt}
        isCopied={isCopied}
        activeSection={activeSection}
        planDocument={planDocument}
        accentColor={accentColor}
      />
    </div>
  );
}
