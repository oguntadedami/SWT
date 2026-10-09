'use client';

// components/BuildIdeaCard.tsx
// Exact implementation of the 3 cards from "BUILD IDEA CARD (EXAMPLE)" in the Brand Sheet:
// - Card 1: Violet (#A88AFF) Header | IDEA-0412 · 07/10/2026 | Study & learning | Beginner | Mini Study Buddy | 3–5 days
// - Card 2: Warm Yellow (#F2D34F) Header | IDEA-0398 · 05/10/2026 | Health & habits | Intermediate | Mini Habit Tracker | 1 week
// - Card 3: Fresh Mint (#65D9B3) Header | IDEA-0377 · 02/10/2026 | Money & planning | Plan ready | Pocket Budget Buddy | 4–6 days
// Features authentic glossy liquid glass finishes, specular rim highlights, and chunky doodle icons.

import React, { useState } from 'react';
import { User, Monitor, BarChart2, Clock, ArrowRight } from 'lucide-react';

export interface BrandIdeaCardData {
  id: string;
  headerColor: string;
  headerTextColor: string;
  category: string;
  levelBadge: string;
  levelBadgeBg: string;
  levelBadgeText: string;
  title: string;
  audience: string;
  platform: string;
  difficulty: string;
  timeEstimate: string;
}

export const BRAND_IDEA_CARDS: BrandIdeaCardData[] = [
  {
    id: 'IDEA-0412',
    headerColor: 'bg-[#A88AFF]',
    headerTextColor: 'text-stone-950',
    category: 'Study & learning',
    levelBadge: 'Beginner',
    levelBadgeBg: 'bg-[#65D9B3]/20 border-[#65D9B3]/40',
    levelBadgeText: 'text-[#0E8A63]',
    title: 'Mini Study Buddy',
    audience: 'Student',
    platform: 'Web App',
    difficulty: 'Medium',
    timeEstimate: '3–5 days',
  },
  {
    id: 'IDEA-0398',
    headerColor: 'bg-[#F2D34F]',
    headerTextColor: 'text-stone-950',
    category: 'Health & habits',
    levelBadge: 'Intermediate',
    levelBadgeBg: 'bg-[#FF7347]/15 border-[#FF7347]/30',
    levelBadgeText: 'text-[#D93810]',
    title: 'Mini Habit Tracker',
    audience: 'Student',
    platform: 'Web App',
    difficulty: 'Medium',
    timeEstimate: '1 week',
  },
  {
    id: 'IDEA-0377',
    headerColor: 'bg-[#65D9B3]',
    headerTextColor: 'text-stone-950',
    category: 'Money & planning',
    levelBadge: 'Plan ready',
    levelBadgeBg: 'bg-[#56C8F2]/20 border-[#56C8F2]/40',
    levelBadgeText: 'text-[#0E7490]',
    title: 'Pocket Budget Buddy',
    audience: 'Student',
    platform: 'Web App',
    difficulty: 'Medium',
    timeEstimate: '4–6 days',
  },
];

export function SingleIdeaCard({ card }: { card: BrandIdeaCardData }) {
  return (
    <div className="relative group w-full max-w-[340px] rounded-[24px] overflow-hidden bg-white text-[#3D4A52] shadow-[0_16px_36px_rgba(0,0,0,0.22)] border border-white/80 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_rgba(0,0,0,0.3)]">
      
      {/* GLOSSY HEADER BAND */}
      <div className={`relative ${card.headerColor} ${card.headerTextColor} px-5 pt-3.5 pb-3 font-mono font-bold text-xs flex items-center justify-between overflow-hidden shadow-inner`}>
        {/* Top glossy specular reflection */}
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />
        
        <span className="tracking-wider relative z-10">{card.id}</span>
      </div>

      {/* WHITE CARD BODY */}
      <div className="p-5 flex flex-col justify-between min-h-[200px]">
        
        <div>
          {/* Category & Level Badge */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-sans text-[#3D4A52]/70 font-medium">
              {card.category}
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-sans font-semibold border ${card.levelBadgeBg} ${card.levelBadgeText}`}>
              {card.levelBadge}
            </span>
          </div>

          {/* Card Title */}
          <h3 className="font-display font-black text-xl text-[#3D4A52] leading-snug tracking-tight mb-4">
            {card.title}
          </h3>

          {/* Meta Row: Student · Web App · Medium */}
          <div className="flex items-center gap-4 text-xs font-sans text-[#3D4A52]/75 pb-4 mb-4 border-b border-stone-100">
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#3D4A52]/60 stroke-[2.2]" />
              <span>{card.audience}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Monitor className="w-3.5 h-3.5 text-[#3D4A52]/60 stroke-[2.2]" />
              <span>{card.platform}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BarChart2 className="w-3.5 h-3.5 text-[#3D4A52]/60 stroke-[2.2]" />
              <span>{card.difficulty}</span>
            </div>
          </div>
        </div>

        {/* Bottom Time & Action Button */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-1.5 font-display font-black text-lg text-[#3D4A52]">
            <Clock className="w-4 h-4 text-[#3D4A52]/70 stroke-[2.4]" />
            <span>{card.timeEstimate}</span>
          </div>

          <a
            href="#build-plan"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#3D4A52] hover:bg-[#2A343A] text-white text-xs font-sans font-bold shadow-md hover:shadow-lg transition-all group-hover:scale-105"
          >
            <span>View Plan</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

      </div>

    </div>
  );
}

export default function BuildIdeaCard({
  className = '',
}: {
  className?: string;
}) {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <div className={`w-full ${className}`}>
      {/* DESKTOP: All 3 cards displayed in grid */}
      <div className="hidden md:grid md:grid-cols-3 gap-5 lg:gap-6 justify-items-center">
        {BRAND_IDEA_CARDS.map((card) => (
          <SingleIdeaCard key={card.id} card={card} />
        ))}
      </div>

      {/* MOBILE: Clean Carousel / Tabs with ample breathing room */}
      <div className="md:hidden flex flex-col items-center">
        {/* Tab switchers */}
        <div className="flex items-center gap-2 mb-4">
          {BRAND_IDEA_CARDS.map((card, idx) => (
            <button
              key={card.id}
              onClick={() => setActiveTab(idx)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all ${
                activeTab === idx
                  ? `${card.headerColor} text-stone-950 shadow-md scale-105`
                  : 'bg-white/10 text-white/70 border border-white/20'
              }`}
            >
              {card.id}
            </button>
          ))}
        </div>

        {/* Selected Card */}
        <SingleIdeaCard card={BRAND_IDEA_CARDS[activeTab]} />
      </div>
    </div>
  );
}
