'use client';

// components/plan/PlanExportBar.tsx
// Section 6: Plan export & download card
// Replaces the old "Print / Save as PDF" button.
// - Download full build plan as Markdown (.md)
// - Copy full plan as Markdown with feedback
// - Clean frosted glass card on calm blue-gray backdrop

import React, { useState } from 'react';
import { Download, Copy, Check } from 'lucide-react';
import { BuildPlan, generatePlanMarkdown } from '@/lib/plan';
import { Idea } from '@/lib/ideas';

interface PlanExportBarProps {
  plan: BuildPlan;
  idea: Idea;
}

export default function PlanExportBar({ plan, idea }: PlanExportBarProps) {
  const [copiedPlan, setCopiedPlan] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadMarkdown = () => {
    try {
      setIsDownloading(true);
      const markdown = generatePlanMarkdown(plan, idea);
      const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const filename = `${idea.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-build-plan.md`;
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      // fallback
    } finally {
      setTimeout(() => setIsDownloading(false), 800);
    }
  };

  const handleCopyPlan = async () => {
    const markdown = generatePlanMarkdown(plan, idea);
    try {
      await navigator.clipboard.writeText(markdown);
      setCopiedPlan(true);
      setTimeout(() => setCopiedPlan(false), 2200);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = markdown;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedPlan(true);
      setTimeout(() => setCopiedPlan(false), 2200);
    }
  };

  return (
    <section className="w-full rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 bg-white/95 backdrop-blur-2xl border border-white/80 shadow-[0_12px_36px_rgba(0,0,0,0.06)] text-zinc-900">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 tracking-tight font-display mb-1">
            Keep your plan
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 font-medium">
            Download this plan as Markdown to drop right into your project folder or workspace.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          {/* 1. DOWNLOAD PLAN (.MD) */}
          <button
            type="button"
            onClick={handleDownloadMarkdown}
            disabled={isDownloading}
            aria-label="Download build plan as markdown file"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white font-semibold text-xs sm:text-sm tracking-tight transition-all duration-200 hover:scale-105 active:scale-95 shadow-[0_4px_14px_rgba(0,0,0,0.15)] cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{isDownloading ? 'Downloading...' : 'Download plan (.md)'}</span>
          </button>

          {/* 2. COPY FULL PLAN */}
          <button
            type="button"
            onClick={handleCopyPlan}
            aria-label={copiedPlan ? 'Plan copied to clipboard' : 'Copy full plan text'}
            className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-semibold text-xs sm:text-sm tracking-tight transition-all duration-200 cursor-pointer ${
              copiedPlan
                ? 'bg-[#2EAA7B] text-white shadow-[0_8px_20px_rgba(46,170,123,0.35)] scale-105'
                : 'bg-zinc-100 hover:bg-zinc-200/80 text-zinc-800 hover:text-zinc-950 border border-zinc-200/80 hover:scale-105 active:scale-95'
            }`}
          >
            {copiedPlan ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy full plan</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
