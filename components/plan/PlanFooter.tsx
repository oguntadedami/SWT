'use client';

// components/plan/PlanFooter.tsx
// Newspaper Front Page Footer:
// - Thick rule
// - "The fine print: This plan is a starting point. It doesn't guarantee your idea will succeed." in muted serif text
// - Solid dark ink pill button "I'M READY TO START" navigating to "/ready"

import React from 'react';
import Link from 'next/link';

interface PlanFooterProps {
  onReadyClick: () => void;
}

export default function PlanFooter({ onReadyClick }: PlanFooterProps) {
  return (
    <footer className="mt-14 mb-8 pt-8 border-t-4 border-[#1F2421] text-left">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        {/* Fine print copy */}
        <div className="max-w-md">
          <p className="text-sm font-serif italic text-stone-600 leading-relaxed">
            <strong className="font-sans font-bold not-italic text-stone-800">
              The fine print:
            </strong>{' '}
            This plan is a starting point. It doesn&apos;t guarantee your idea will succeed.
          </p>
        </div>

        {/* Solid dark ink pill button "I'M READY TO START" */}
        <Link
          href="/ready"
          onClick={onReadyClick}
          className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#1F2421] hover:bg-black active:bg-[#111311] text-white font-bold font-sans text-sm tracking-wider uppercase shadow-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2"
        >
          I&apos;M READY TO START
        </Link>
      </div>
    </footer>
  );
}
