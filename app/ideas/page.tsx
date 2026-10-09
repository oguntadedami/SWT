'use client';

// app/ideas/page.tsx
// Revised idea cards screen for "Start With This"
// 1. Single-choice radio group model:
//    - role="radiogroup" aria-label="Choose an idea"
//    - Arrow keys move selection, Tab moves in/out of the group
// 2. Selection state:
//    - Nothing selected on initial arrival
//    - Saves to and restores from sessionStorage ("pendingSelectedIdeaId")
// 3. CTA below the cards:
//    - Desktop: In-flow centered below cards with helper line and solid orange pill button "Turn this into a plan"
//    - Mobile: Sticky bottom bar with soft frosted glass backdrop
//    - Disabled when nothing selected; Enabled upon selection with helper text update
//    - Stores selected idea under "selectedIdea" and navigates to /plan?id=...

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import FormBackground from '@/components/FormBackground';
import { BrandMarkSvg } from '@/components/BrandLogo';
import { MOCK_IDEAS } from '@/lib/ideas';
import IdeaCard from '@/components/IdeaCard';
import { ArrowLeft } from 'lucide-react';

export default function IdeasPage() {
  const router = useRouter();
  const [selectedIdeaId, setSelectedIdeaId] = useState<string | null>(null);

  // Restore selection from sessionStorage on return from /plan or back navigation
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const pending = sessionStorage.getItem('pendingSelectedIdeaId');
        if (pending && MOCK_IDEAS.some((idea) => idea.id === pending)) {
          setSelectedIdeaId(pending);
          return;
        }
        const stored = sessionStorage.getItem('selectedIdea');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed?.id && MOCK_IDEAS.some((idea) => idea.id === parsed.id)) {
            setSelectedIdeaId(parsed.id);
          }
        }
      } catch {
        // sessionStorage safely guarded
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const handleSelectIdea = (id: string) => {
    setSelectedIdeaId(id);
    try {
      sessionStorage.setItem('pendingSelectedIdeaId', id);
    } catch {
      // safely ignore storage exception
    }
  };

  const handleProceedToPlan = () => {
    if (!selectedIdeaId) return;
    const chosenIdea = MOCK_IDEAS.find((i) => i.id === selectedIdeaId);
    if (!chosenIdea) return;

    try {
      sessionStorage.setItem('selectedIdea', JSON.stringify(chosenIdea));
      sessionStorage.setItem('pendingSelectedIdeaId', selectedIdeaId);
    } catch {
      // safely ignore storage exception
    }

    router.push(`/plan?id=${encodeURIComponent(selectedIdeaId)}`);
  };

  const selectionExists = selectedIdeaId !== null;

  return (
    <main className="relative min-h-screen text-zinc-900 flex flex-col justify-between selection:bg-[#FF4F24] selection:text-white overflow-x-hidden">
      {/* Softened photographic landscape hero backdrop */}
      <FormBackground />

      {/* TOP BAR: "Back to my answers" link & Brand Logo */}
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 sm:pt-8 pb-3 flex items-center justify-between relative z-20">
        <Link
          href="/start"
          className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/80 hover:bg-white text-zinc-800 font-semibold text-xs sm:text-sm tracking-wide backdrop-blur-md border border-white/60 transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_4px_14px_rgba(0,0,0,0.08)]"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
          <span>Back to my answers</span>
        </Link>

        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 backdrop-blur-sm border border-white/40 hover:bg-white/85 transition-all duration-300 shadow-sm"
          aria-label="Home"
        >
          <BrandMarkSvg size={36} />
        </Link>
      </header>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 relative z-10 flex flex-col items-center pb-32 md:pb-12">
        {/* HEADLINE SECTION */}
        <div className="text-center mb-10 sm:mb-14 max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)] leading-tight">
            HERE ARE IDEAS YOU CAN BUILD
          </h1>

          <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-white font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)] leading-relaxed">
            Pick one and we’ll turn it into a plan.
          </p>
        </div>

        {/* 3 IDEA CARDS AS A SINGLE-CHOICE RADIO GROUP */}
        <div
          role="radiogroup"
          aria-label="Choose an idea"
          className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 justify-items-center items-start mb-8 sm:mb-10"
        >
          {MOCK_IDEAS.map((idea, index) => (
            <IdeaCard
              key={idea.id}
              idea={idea}
              index={index}
              isSelected={selectedIdeaId === idea.id}
              selectionExists={selectionExists}
              onSelect={handleSelectIdea}
            />
          ))}
        </div>

        {/* DESKTOP CTA SECTION (NORMAL FLOW) */}
        <div className="hidden md:flex flex-col items-center text-center mt-2 mb-8 w-full max-w-md mx-auto">
          <p
            className={`text-sm font-medium transition-colors duration-300 mb-3.5 ${
              selectionExists
                ? 'text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)]'
                : 'text-white/85 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]'
            }`}
          >
            {selectionExists
              ? 'Next: your step-by-step build roadmap, tech stack, and timeline.'
              : 'Choose an idea above to start your plan.'}
          </p>

          <button
            type="button"
            onClick={handleProceedToPlan}
            disabled={!selectionExists}
            aria-disabled={!selectionExists}
            className={`w-full max-w-sm py-4 px-8 rounded-full font-bold text-base tracking-wide transition-all duration-300 ${
              selectionExists
                ? 'bg-[#FF4F24] hover:bg-[#E53E14] active:bg-[#CC340D] text-white shadow-[0_14px_32px_rgba(255,79,36,0.45)] hover:scale-105 active:scale-95 cursor-pointer'
                : 'bg-[#FF4F24]/45 text-white/70 shadow-none cursor-not-allowed'
            }`}
          >
            Turn this into a plan
          </button>
        </div>

        {/* BOTTOM SUBTLE NOTE & SECONDARY LINK */}
        <div className="flex flex-col items-center gap-3 w-full max-w-md text-center">
          <Link
            href="/start"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-white/70 hover:bg-white text-zinc-800 font-semibold text-xs sm:text-sm tracking-wide backdrop-blur-md border border-white/60 shadow-sm transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Try different answers
          </Link>
        </div>
      </div>

      {/* MOBILE STICKY CTA (FIXED BOTTOM BAR) */}
      <div className="md:hidden fixed bottom-0 inset-x-0 p-4 bg-white/92 backdrop-blur-2xl border-t border-white/60 shadow-[0_-8px_30px_rgba(0,0,0,0.14)] z-40 flex flex-col items-center text-center">
        <p className="text-xs font-medium text-zinc-700 mb-2">
          {selectionExists
            ? 'Next: your step-by-step build roadmap, tech stack, and timeline.'
            : 'Choose an idea above to start your plan.'}
        </p>

        <button
          type="button"
          onClick={handleProceedToPlan}
          disabled={!selectionExists}
          aria-disabled={!selectionExists}
          className={`w-full py-3.5 px-6 rounded-full font-bold text-sm tracking-wide transition-all duration-300 ${
            selectionExists
              ? 'bg-[#FF4F24] active:bg-[#E53E14] text-white shadow-lg active:scale-95 cursor-pointer'
              : 'bg-[#FF4F24]/40 text-white/70 shadow-none cursor-not-allowed'
          }`}
        >
          Turn this into a plan
        </button>
      </div>
    </main>
  );
}
