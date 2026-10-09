'use client';

// app/ready/page.tsx
// Ready to Build Screen ("I'm ready to start"):
// - Celebratory milestone for the builder
// - DownloadMenu component labelled "DOWNLOAD AGAIN"
// - Immediate action steps to begin building right now
// - Navigation back to /plan or home

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Rocket, CheckCircle2, Copy, Check } from 'lucide-react';
import { MOCK_IDEAS, Idea } from '@/lib/ideas';
import { getBuildPlanForIdea, BuildPlan } from '@/lib/plan';
import { createPlanDocument } from '@/lib/planDocument';
import { getIdeaAccentColor, PLAN_COLORS } from '@/lib/planTheme';
import FormBackground from '@/components/FormBackground';
import DownloadMenu from '@/components/plan/DownloadMenu';

export default function ReadyPage() {
  const [selectedIdeaId, setSelectedIdeaId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      try {
        const pending = sessionStorage.getItem('pendingSelectedIdeaId');
        if (pending && MOCK_IDEAS.some((i) => i.id === pending)) {
          return pending;
        }
        const stored = sessionStorage.getItem('selectedIdea');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed?.id && MOCK_IDEAS.some((i) => i.id === parsed.id)) {
            return parsed.id;
          }
        }
      } catch {
        // ignore
      }
    }
    return 'idea-1';
  });
  const [isCopied, setIsCopied] = useState(false);

  const currentIdea: Idea =
    MOCK_IDEAS.find((i) => i.id === selectedIdeaId) || MOCK_IDEAS[0];
  const plan: BuildPlan = getBuildPlanForIdea(currentIdea.id, currentIdea.name);
  const accentColor = getIdeaAccentColor(currentIdea.id);
  const doc = useMemo(() => createPlanDocument(plan, currentIdea), [plan, currentIdea]);

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(plan.starterPrompt);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2200);
    } catch {
      // ignore
    }
  };

  return (
    <div className="relative min-h-screen text-stone-900 flex flex-col justify-between selection:bg-[#FF4F24] selection:text-white">
      {/* Background */}
      <FormBackground />

      {/* Header */}
      <header className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-5 pb-3 flex items-center justify-between relative z-20">
        <Link
          href={`/plan?id=${currentIdea.id}`}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/75 hover:bg-white text-stone-900 font-semibold text-xs sm:text-sm backdrop-blur-md border border-white/60 shadow-md transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to plan</span>
        </Link>
      </header>

      {/* Main Card */}
      <main className="w-full max-w-3xl mx-auto px-4 sm:px-6 flex-1 flex flex-col justify-center py-10 relative z-10 text-left">
        <div className="bg-[#F6F3EC] rounded-3xl p-6 sm:p-10 border border-stone-300 shadow-2xl">
          {/* Top Badge */}
          <div className="flex items-center gap-2 mb-3">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-white"
              style={{ backgroundColor: accentColor }}
            >
              <Rocket className="w-3.5 h-3.5" />
              <span>Ready to build</span>
            </span>
            <span className="text-xs font-mono text-stone-500 uppercase">
              Edition for {doc.title}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#1F2421] leading-tight mb-3">
            You Have Everything You Need.
          </h1>

          <p className="text-base sm:text-lg font-serif italic text-stone-700 leading-relaxed mb-8">
            Your plan for <strong className="font-sans font-bold not-italic text-stone-900">{doc.title}</strong> is calibrated to your real schedule. Here is how to begin right now.
          </p>

          {/* Action Checklist */}
          <div className="space-y-4 mb-8 border-y border-stone-300 py-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-sans font-bold text-sm sm:text-base text-stone-900">
                  Step 1 · Copy your starter prompt
                </h3>
                <p className="text-xs sm:text-sm font-serif text-stone-600 mt-0.5">
                  Paste it into your favorite AI tool (Gemini, Claude, or ChatGPT) to bootstrap the code.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-sans font-bold text-sm sm:text-base text-stone-900">
                  Step 2 · Keep your print edition handy
                </h3>
                <p className="text-xs sm:text-sm font-serif text-stone-600 mt-0.5">
                  Save the PDF or HTML file to your desktop so you can reference the scope and roadmap without getting distracted.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-sans font-bold text-sm sm:text-base text-stone-900">
                  Step 3 · Focus only on Stage 1
                </h3>
                <p className="text-xs sm:text-sm font-serif text-stone-600 mt-0.5">
                  Do not worry about stage 2 or 3 yet. Your only job today is to finish the first stage tasks.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons Row with DOWNLOAD AGAIN */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {/* COPY STARTER PROMPT */}
              <button
                type="button"
                onClick={handleCopyPrompt}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FF4F24] hover:bg-[#E53E14] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-transform active:scale-95 cursor-pointer"
              >
                {isCopied ? (
                  <>
                    <Check className="w-4 h-4 stroke-[2.5]" />
                    <span>COPIED!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 stroke-[2.5]" />
                    <span>COPY PROMPT</span>
                  </>
                )}
              </button>

              {/* DOWNLOAD AGAIN MENU */}
              <DownloadMenu
                doc={doc}
                accentColor={accentColor}
                label="DOWNLOAD AGAIN"
              />
            </div>

            <Link
              href="/"
              className="text-xs sm:text-sm font-mono font-bold text-stone-600 hover:text-stone-900 uppercase tracking-wider"
            >
              Start over with new skills →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
