'use client';

// components/PlanPreview.tsx
// "Inside your Build Plan" section:
// - Clean two-column layout on desktop:
//   - Left: PlanList (plain numbered list on the backdrop, NO cards, NO glass, selected item uses accent color)
//   - Right: PlanPanel (ONE glass preview panel with higher opacity, 200ms opacity-only fade)
// - Mobile layout: Simple accordion, one section open at a time, with 04 The MVP open by default.
// - Section heading: "Inside your Build Plan"
// - Supporting line: "Nine parts. One clear place to start."
// - Single example plan: "Polite Nudge"

import React, { useState } from 'react';
import Image from 'next/image';
import PlanList, { PlanItemMeta } from './PlanList';
import PlanPanel, { PlanDetailData } from './PlanPanel';
import { ChevronDown } from 'lucide-react';

const PLAN_SECTIONS: PlanDetailData[] = [
  {
    id: '01',
    title: 'The Product',
    iconSrc: '/Icons/site%20icons/compass.svg',
    badgeBg: '#56C8F2',
    type: 'paragraph',
    paragraphText: 'A tiny web tool that writes friendly payment-reminder emails for freelancers.',
  },
  {
    id: '02',
    title: 'The Problem',
    iconSrc: '/Icons/site%20icons/target.svg',
    badgeBg: '#FF4F24',
    type: 'paragraph',
    paragraphText: 'Freelancers hate chasing late invoices, and an awkward message makes it worse.',
  },
  {
    id: '03',
    title: 'The Target User',
    iconSrc: '/Icons/site%20icons/users.svg',
    badgeBg: '#A88AFF',
    type: 'paragraph',
    paragraphText: 'Solo freelance designers and developers who invoice 3 to 10 clients a month.',
  },
  {
    id: '04',
    title: 'The MVP',
    iconSrc: '/Icons/site%20icons/zap.svg',
    badgeBg: '#F2D34F',
    type: 'paragraph',
    paragraphText: 'One page. Enter the client name, amount, days late, and tone. Get a ready-to-send email to copy.',
  },
  {
    id: '05',
    title: 'What to Build',
    iconSrc: '/Icons/site%20icons/sparkles.svg',
    badgeBg: '#65D9B3',
    type: 'list',
    listItems: ['input form', 'tone selector (friendly or firm)', 'copy button'],
  },
  {
    id: '06',
    title: 'What Not to Build Yet',
    iconSrc: '/Icons/site%20icons/ban.svg',
    badgeBg: '#F43F5E',
    type: 'list',
    listItems: ['accounts', 'invoice storage', 'automatic sending', 'payment links'],
  },
  {
    id: '07',
    title: 'The Tool Stack',
    iconSrc: '/Icons/site%20icons/layers.svg',
    badgeBg: '#8B5CF6',
    type: 'rows',
    rows: [
      { label: 'Next.js', desc: 'the interface and the server route (free)' },
      { label: 'Tailwind CSS', desc: 'styling (free)' },
      { label: 'Gemini API', desc: 'writes the emails (free tier with limits)' },
      { label: 'Vercel', desc: 'hosting (free tier)' },
    ],
  },
  {
    id: '08',
    title: 'The Build Roadmap',
    iconSrc: '/Icons/site%20icons/map-pin.svg',
    badgeBg: '#38BDF8',
    type: 'stages',
    stages: [
      { day: 'Day 1', task: 'set up and build the form' },
      { day: 'Day 2', task: 'connect the AI' },
      { day: 'Day 3', task: 'polish and deploy' },
    ],
  },
  {
    id: '09',
    title: 'The AI Starter Prompt',
    iconSrc: '/Icons/site%20icons/terminal.svg',
    badgeBg: '#34D399',
    type: 'code',
    codeSnippet:
      'You are helping me build a small web app called Polite Nudge. Build only the MVP described below. Do not add accounts or a database...',
  },
];

const PLAN_META: PlanItemMeta[] = PLAN_SECTIONS.map((sec) => ({
  id: sec.id,
  title: sec.title,
}));

export default function PlanPreview() {
  // Default selected item: 04 The MVP (index 3)
  const [selectedIndex, setSelectedIndex] = useState<number>(3);
  // Mobile accordion: one section open at a time, MVP open by default
  const [openMobileIndex, setOpenMobileIndex] = useState<number | null>(3);

  const toggleMobileAccordion = (index: number) => {
    setOpenMobileIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="build-plan" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 scroll-mt-12 text-white">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Heading & Supporting Line */}
        <div className="mb-10 sm:mb-14 text-center sm:text-left">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-display">
            Inside your Build Plan
          </h2>
          <p className="mt-2 text-base sm:text-lg text-white/70 font-sans font-medium">
            Nine parts. One clear place to start.
          </p>
        </div>

        {/* DESKTOP LAYOUT: Two columns (Hidden on small mobile) */}
        <div className="hidden md:grid md:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: PlanList (5 cols) sitting directly on the backdrop */}
          <div className="md:col-span-5">
            <PlanList
              items={PLAN_META}
              selectedIndex={selectedIndex}
              onSelect={setSelectedIndex}
            />
          </div>

          {/* Right Column: ONE glass preview panel (7 cols) */}
          <div className="md:col-span-7">
            <PlanPanel data={PLAN_SECTIONS[selectedIndex]} />
          </div>

        </div>

        {/* MOBILE LAYOUT: Simple accordion (Shown on mobile only) */}
        <div className="md:hidden flex flex-col divide-y divide-white/10 border-y border-white/10">
          {PLAN_SECTIONS.map((section, idx) => {
            const isOpen = openMobileIndex === idx;

            return (
              <div key={section.id} className="py-2">
                <button
                  type="button"
                  onClick={() => toggleMobileAccordion(idx)}
                  aria-expanded={isOpen}
                  className={`w-full py-3 px-2 flex items-center justify-between text-left transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/80 ${
                    isOpen ? 'text-[#FF5722]' : 'text-white/80 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {section.iconSrc && (
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-white/20 shadow-sm p-1"
                        style={{ backgroundColor: `${section.badgeBg || '#FF5722'}25` }}
                      >
                        <Image
                          src={section.iconSrc}
                          alt=""
                          width={28}
                          height={28}
                          referrerPolicy="no-referrer"
                          className="w-[26px] h-[26px] object-contain select-none pointer-events-none"
                        />
                      </div>
                    )}
                    <div className="flex items-baseline gap-2.5">
                      <span
                        className={`font-mono text-xs tracking-wider ${
                          isOpen ? 'text-[#FF5722]' : 'text-white/40'
                        }`}
                      >
                        {section.id}
                      </span>
                      <span className="text-base font-medium font-sans">
                        {section.title}
                      </span>
                    </div>
                  </div>

                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#FF5722]' : 'text-white/40'
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-2 pt-1 pb-4">
                    <div className="rounded-2xl p-5 bg-white/[0.15] backdrop-blur-xl border border-white/20 shadow-md">
                      {section.type === 'paragraph' && section.paragraphText && (
                        <p className="text-sm text-white/90 leading-relaxed font-sans">
                          {section.paragraphText}
                        </p>
                      )}

                      {section.type === 'list' && section.listItems && (
                        <ul className="flex flex-col gap-2">
                          {section.listItems.map((item, itemIdx) => (
                            <li
                              key={itemIdx}
                              className="flex items-center gap-2.5 text-sm text-white/90 font-sans"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-white/60 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {section.type === 'rows' && section.rows && (
                        <div className="flex flex-col gap-2.5">
                          {section.rows.map((row, rowIdx) => (
                            <div key={rowIdx} className="text-sm text-white/90 font-sans">
                              <span className="font-semibold text-white mr-1.5">
                                {row.label}:
                              </span>
                              <span className="text-white/80">{row.desc}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {section.type === 'stages' && section.stages && (
                        <div className="flex flex-col gap-2.5">
                          {section.stages.map((stage, stageIdx) => (
                            <div key={stageIdx} className="text-sm text-white/90 font-sans">
                              <span className="font-semibold text-white mr-1.5">
                                {stage.day}:
                              </span>
                              <span className="text-white/80">{stage.task}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {section.type === 'code' && section.codeSnippet && (
                        <div className="rounded-xl bg-black/40 border border-white/10 p-3.5 font-mono text-xs text-white/90 leading-relaxed select-text">
                          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                            <span className="text-[10px] uppercase tracking-wider text-white/50">
                              AI PROMPT SNIPPET
                            </span>
                            <span
                              aria-hidden="true"
                              className="px-2 py-0.5 rounded text-[10px] font-sans text-white/70 bg-white/10 border border-white/10 select-none"
                            >
                              Copy
                            </span>
                          </div>
                          <p className="whitespace-pre-wrap font-mono text-white/85 text-xs leading-relaxed">
                            {section.codeSnippet}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
