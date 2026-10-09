'use client';

// app/page.tsx
// Landing page for "Start With This"
// Rebuilt according to photographic landscape hero specifications:
// - Hero with /photos/hero.webp landscape backdrop, dark gradient overlay,
//   uppercase headline, bright pill button, floating sticker tags, inline doodles,
//   and frosted glass sample idea card.
// - Fixed glass dock bar for Discover, Choose, Plan, Start.
// - "How it works" section with opaque glass panels.
// - "Build Plan preview" listing all 9 core deliverable sections.
// - Light style floating frosted-glass footer with poured dock receiver.

import Image from 'next/image';
import Hero from '@/components/Hero';
import SampleIdeaShowcase from '@/components/SampleIdeaShowcase';
import HowItWorks from '@/components/HowItWorks';
import PlanPreview from '@/components/PlanPreview';
import Footer from '@/components/Footer';
import Dock from '@/components/Dock';
import { DockProvider } from '@/components/DockContext';

export default function HomePage() {
  return (
    <DockProvider>
      <main className="relative min-h-screen text-white overflow-x-hidden selection:bg-[#FF5722] selection:text-white pb-[calc(5.5rem+env(safe-area-inset-bottom,0px))] sm:pb-32">
        {/* Full-Website Photographic Landscape Background (/photos/hero.webp) */}
        <div className="fixed inset-0 -z-20 pointer-events-none select-none overflow-hidden">
          <Image
            src="/photos/hero.webp"
            alt="Rolling green hills under blue sky with a cloud"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Subtle dark gradient and vignette overlay for legibility and atmospheric depth across all sections */}
          <div className="absolute inset-0 bg-black/45 backdrop-brightness-[0.92]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
        </div>

        {/* Floating navigation dock using uploaded icons */}
        <Dock />

        {/* 1. Full-screen Hero Section */}
        <Hero />

        {/* 2. "How it works" 4-step process */}
        <HowItWorks />

        {/* 3. 9-section Build Plan Preview (Two columns on desktop, accordion on mobile) */}
        <PlanPreview />

        {/* 4. Official Brand Card UI Showcase: Maker Profile Input & Build Idea Ticket */}
        <SampleIdeaShowcase />

        {/* 5. Light frosted-glass Footer with poured dock icons and disclaimer */}
        <Footer />
      </main>
    </DockProvider>
  );
}
