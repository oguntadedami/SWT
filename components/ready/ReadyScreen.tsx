'use client';

// components/ready/ReadyScreen.tsx
// Complete redesign of the completion screen at /ready:
// - Fixed softened hero photo backdrop with 25% overlay and sky-blue gradient fallback
// - "Back to plan" link in a frosted pill at top left (No dock on this page)
// - Three brand logo shapes in a row with ground shadows hopping in and idling
// - Huge heavy white uppercase headline "YOU'RE READY." (h1) with soft text shadow
// - Subtitle: "You don't need another idea. You have something to start with."
// - Bright frosted panel (ReadyPanel) with 3 numbered steps in logo colors
// - ReadyActions (COPY AI PROMPT with shape-hop feedback, DOWNLOAD AGAIN frosted pill, Start another build clear logic)
// - Scattered playful doodles (squiggle, sparkle, zigzag)
// - Motion: shapes land, then headline, panel, and actions fade up in sequence (120ms stagger)
// - Accessibility: announces "Your plan is ready.", focus moves to heading, prefers-reduced-motion supported

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { Idea } from '@/lib/ideas';
import { BuildPlan } from '@/lib/plan';
import { createPlanDocument } from '@/lib/planDocument';
import { getIdeaAccentColor } from '@/lib/planTheme';
import { VioletSquiggleDoodle, WarmYellowSparkle, ScribbleDoodle } from '@/components/Doodles';

import ReadyShapes from './ReadyShapes';
import ReadyPanel from './ReadyPanel';
import ReadyActions from './ReadyActions';

interface ReadyScreenProps {
  idea: Idea;
  plan: BuildPlan;
}

export default function ReadyScreen({ idea, plan }: ReadyScreenProps) {
  const [hopTrigger, setHopTrigger] = useState(0);
  const [announcement, setAnnouncement] = useState('Your plan is ready.');
  const headingRef = useRef<HTMLHeadingElement>(null);

  const accentColor = useMemo(() => getIdeaAccentColor(idea.id), [idea.id]);
  const doc = useMemo(() => createPlanDocument(plan, idea), [plan, idea]);

  // Focus heading on arrival for accessibility
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const handleCopySuccess = () => {
    setHopTrigger((prev) => prev + 1);
  };

  return (
    <div className="relative min-h-screen text-zinc-900 selection:bg-[#FF4F24] selection:text-white flex flex-col justify-between overflow-x-hidden">
      {/* Polite live announcement for screen readers */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      {/* FULL-SCREEN SOFTENED HERO PHOTO BACKDROP (25% OVERLAY + SKY-BLUE FALLBACK) */}
      <div className="fixed inset-0 -z-20 pointer-events-none select-none overflow-hidden bg-gradient-to-b from-[#56C8F2] via-[#7AE0FA] to-[#B6EDFA]">
        <Image
          src="/hero/hero.webp"
          alt="Rolling landscape under a bright blue sky"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Subtle ~25% overlay behind white text */}
        <div className="absolute inset-0 bg-black/25 backdrop-brightness-[0.96]" />
      </div>

      {/* PLAYFUL SCATTERED DOODLES */}
      <VioletSquiggleDoodle className="hidden sm:block absolute top-14 left-8 lg:left-16 opacity-85 rotate-[-10deg] pointer-events-none" />
      <WarmYellowSparkle size={32} className="hidden sm:block absolute top-24 right-10 lg:right-24 opacity-90 pointer-events-none" />
      <ScribbleDoodle className="hidden md:block absolute bottom-16 left-12 lg:left-24 opacity-80 rotate-[8deg] pointer-events-none" />

      {/* TOP BAR: Back to plan link at top left */}
      <header className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-5 sm:pt-8 flex items-center justify-between relative z-20">
        <Link
          href={`/plan?id=${idea.id}`}
          className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/20 hover:bg-white/35 backdrop-blur-md border border-white/40 text-white font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_4px_14px_rgba(0,0,0,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
          <span>Back to plan</span>
        </Link>
      </header>

      {/* MAIN CONTAINER */}
      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 flex-1 flex flex-col items-center justify-center py-8 sm:py-12 relative z-10 text-center">
        {/* 1. TOP CENTER: THREE BRAND LOGO SHAPES IN A ROW */}
        <ReadyShapes hopTrigger={hopTrigger} className="mb-4 sm:mb-6" />

        {/* 2. HEADLINE & SUBTITLE (Fade up sequence after shapes land) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 sm:mb-10 max-w-2xl mx-auto"
        >
          <h1
            ref={headingRef}
            tabIndex={-1}
            className="font-display font-black uppercase tracking-tight text-4xl sm:text-6xl md:text-7xl text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)] leading-tight outline-none"
          >
            YOU&apos;RE READY.
          </h1>
          <p className="text-lg sm:text-xl font-normal text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] leading-relaxed mt-2.5 max-w-xl mx-auto">
            You don&apos;t need another idea. You have something to start with.
          </p>
        </motion.div>

        {/* 3. BRIGHT FROSTED PANEL */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          <ReadyPanel plan={plan} />
        </motion.div>

        {/* 4. ACTIONS: COPY PROMPT, DOWNLOAD AGAIN, START ANOTHER BUILD */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.74, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          <ReadyActions
            plan={plan}
            doc={doc}
            accentColor={accentColor}
            onCopySuccess={handleCopySuccess}
            onAnnounce={setAnnouncement}
          />
        </motion.div>
      </main>

      {/* FOOTER SAFE-AREA PADDING */}
      <footer className="w-full py-4 text-center text-xs text-white/50 relative z-10" aria-hidden="true" />
    </div>
  );
}
