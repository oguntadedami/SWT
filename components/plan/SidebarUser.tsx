'use client';

// components/plan/SidebarUser.tsx
// Newspaper Front Page Sidebar:
// - 03 The Target User: kicker "03 · Who it's for", heavy title, paragraph in serif
// - Brand shape (large, partly cropped) as a small illustration

import React from 'react';

interface SidebarUserProps {
  ideaId: string;
  targetUser: string;
  accentColor: string;
}

export default function SidebarUser({
  ideaId,
  targetUser,
  accentColor,
}: SidebarUserProps) {
  const isIdea1 = ideaId === 'idea-1';
  const isIdea2 = ideaId === 'idea-2';
  const isIdea3 = ideaId === 'idea-3';

  return (
    <section id="section-03" className="scroll-mt-24 pt-6 pb-6 text-left">
      <span
        className="inline-block text-xs uppercase font-mono font-bold tracking-widest mb-1.5"
        style={{ color: accentColor }}
      >
        03 · Who it&apos;s for
      </span>

      <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#1F2421] mb-3">
        The Target User
      </h2>

      <p className="text-[17px] font-serif text-stone-800 leading-relaxed mb-6">
        {targetUser}
      </p>

      {/* Brand shape (large, partly cropped) as an editorial illustration */}
      <div className="relative w-full h-24 rounded-xl overflow-hidden bg-stone-200/50 border border-stone-300/80 flex items-center justify-end p-2 pointer-events-none">
        {isIdea1 && (
          <div
            className="w-24 h-24 rounded-full translate-x-5 -translate-y-2 opacity-90 shadow-sm"
            style={{ backgroundColor: accentColor }}
            aria-hidden="true"
          />
        )}
        {isIdea2 && (
          <div
            className="w-16 h-28 rounded-full translate-x-4 opacity-90 shadow-sm"
            style={{ backgroundColor: accentColor }}
            aria-hidden="true"
          />
        )}
        {isIdea3 && (
          <div
            className="w-24 h-20 translate-x-4 opacity-90"
            aria-hidden="true"
          >
            <svg viewBox="0 0 100 80" className="w-full h-full" fill={accentColor}>
              <path d="M 18 10 L 86 40 L 18 70 Z" />
            </svg>
          </div>
        )}
      </div>
    </section>
  );
}
