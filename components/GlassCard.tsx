'use client';

// components/GlassCard.tsx
// Ticket Cards and Glass Panels styled according to the Brand Identity Sheet:
// - Colored header bands and dashed perforation dividers
// - Meta tags with doodle icons (user, window, bars)
// - Chip styles with mint gradients, italic text, and violet doodle lines
// - Hyper-fluid iOS Liquid Glass aesthetic with spring transforms

import React from 'react';
import { Palette, CheckCircle2, ArrowRight, User, Layout, BarChart2 } from 'lucide-react';
import BuildIdeaCard from './BuildIdeaCard';

export { BuildIdeaCard };

// Maker Profile Ticket Card
export function MakerProfileCard({ className = '' }: { className?: string }) {
  return (
    <div
      className={`liquid-glass liquid-glass-interactive rounded-2xl overflow-hidden p-5 text-left text-white max-w-[280px] sm:max-w-[320px] ${className}`}
    >
      {/* Top row with avatar and availability badge */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-dashed border-white/20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#38BDF8] via-[#34D399] to-[#FF7A45] flex items-center justify-center text-stone-900 font-black text-xs shadow-sm border border-white/50">
            <User className="w-4 h-4 text-stone-950 stroke-[2.5]" />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase text-white/60 tracking-wider">CREATOR TICKET</div>
            <div className="text-xs font-bold text-white">Product Designer</div>
          </div>
        </div>

        {/* Mint gradient chip with italic text */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-emerald-500/25 to-teal-500/20 border border-emerald-400/35">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-semibold italic text-emerald-200">Active</span>
        </div>
      </div>

      {/* Profile Title */}
      <h3 className="text-xs sm:text-sm font-black tracking-wider uppercase text-white/95 flex items-center gap-1.5">
        <Layout className="w-3.5 h-3.5 text-[#38BDF8]" />
        MAKER PROFILE · ZERO BACKEND
      </h3>

      {/* Profile Bio */}
      <p className="mt-2 text-xs text-white/85 leading-relaxed font-normal">
        Skills: Figma, Tailwind CSS, copywriting. Looking to build a practical micro-tool over the weekend with zero backend.
      </p>

      {/* Ticket Meta Footer with dashed divider and doodle bars */}
      <div className="mt-4 pt-2.5 border-t border-dashed border-white/20 flex items-center justify-between text-[10px] font-mono text-white/70">
        <div className="flex items-center gap-1">
          <BarChart2 className="w-3 h-3 text-amber-300" />
          <span>EFFORT: WEEKEND</span>
        </div>
        <span className="text-emerald-300 font-bold uppercase">FEASIBLE · 100%</span>
      </div>
    </div>
  );
}

// Sample Idea Output Ticket Card
export function DesignerIdeaOutputCard({ className = '' }: { className?: string }) {
  return (
    <div
      className={`relative liquid-glass liquid-glass-interactive rounded-2xl overflow-hidden p-5 text-left text-white max-w-[300px] sm:max-w-[340px] ${className}`}
    >
      {/* Ghost stacked layers behind */}
      <div className="absolute -top-2 left-4 right-4 h-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 -z-10" />
      <div className="absolute -top-4 left-7 right-7 h-3 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 -z-20" />

      {/* Header Band */}
      <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-dashed border-white/20 text-[11px]">
        <div className="flex items-center gap-1.5 text-amber-300 font-bold">
          <Palette className="w-3.5 h-3.5" />
          <span className="uppercase tracking-wider">SAMPLE IDEA · 2026</span>
        </div>
        <span className="text-white/60 font-mono text-[10px]">TICKET #01</span>
      </div>

      {/* Project Title */}
      <h4 className="text-sm sm:text-base font-black tracking-tight text-white uppercase leading-snug">
        FREELANCE SCOPE &amp; RATE ESTIMATOR
      </h4>

      <p className="mt-1.5 text-xs text-white/85 leading-relaxed font-normal">
        Interactive 1-page quote builder for copywriters &amp; designers to price client revisions.
      </p>

      {/* Ticket Action Footer */}
      <div className="mt-4 pt-2.5 border-t border-dashed border-white/20 flex items-center justify-between text-xs">
        <span className="text-[11px] font-bold text-emerald-300 flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Weekend Sprint
        </span>
        <a
          href="#build-plan"
          className="inline-flex items-center gap-1 text-xs font-bold text-white hover:text-amber-300 transition-colors"
        >
          <span>View Plan</span>
          <ArrowRight className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}

export default function GlassCard({ className = '' }: { className?: string }) {
  return <DesignerIdeaOutputCard className={className} />;
}
