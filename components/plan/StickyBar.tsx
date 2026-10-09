'use client';

// components/plan/StickyBar.tsx
// Slim frosted top sticky bar shown when masthead scrolls out of view:
// - Frosted glass with dark text
// - Product name
// - "Jump to" menu listing all 9 sections (keyboard accessible with aria-current on active)
// - COPY AI PROMPT button
// - DOWNLOAD placeholder (disabled)
// - Mobile: Product name, COPY AI PROMPT, DOWNLOAD, and a Jump button/dropdown

import React, { useState, useEffect } from 'react';
import { Copy, Check, ChevronDown } from 'lucide-react';
import DownloadMenu from './DownloadMenu';
import { PlanDocument } from '@/lib/planDocument';

export const SECTIONS = [
  { id: 'section-01', label: '01 · The product' },
  { id: 'section-02', label: '02 · The problem' },
  { id: 'section-03', label: "03 · Who it's for" },
  { id: 'section-04', label: '04 · The MVP' },
  { id: 'section-05', label: '05 · What to build' },
  { id: 'section-06', label: '06 · What not to build' },
  { id: 'section-07', label: '07 · The tool stack' },
  { id: 'section-08', label: '08 · The build roadmap' },
  { id: 'section-09', label: '09 · AI starter prompt' },
];

interface StickyBarProps {
  productName: string;
  isVisible: boolean;
  onCopyPrompt: () => void;
  isCopied: boolean;
  activeSection: string;
  planDocument?: PlanDocument;
  accentColor?: string;
}

export default function StickyBar({
  productName,
  isVisible,
  onCopyPrompt,
  isCopied,
  activeSection,
  planDocument,
  accentColor,
}: StickyBarProps) {
  const [isJumpOpen, setIsJumpOpen] = useState(false);

  // Close dropdown on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isJumpOpen) {
        setIsJumpOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isJumpOpen]);

  if (!isVisible) return null;

  const handleJump = (sectionId: string) => {
    setIsJumpOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside
      aria-label="Document navigation"
      className="fixed top-0 left-0 right-0 z-50 bg-[#F6F3EC]/92 backdrop-blur-md border-b border-stone-300 shadow-sm transition-transform duration-300"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3 text-stone-900">
        {/* Left: Product Name */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="font-bold font-sans text-sm sm:text-base text-stone-900 truncate max-w-[140px] sm:max-w-xs">
            {productName}
          </span>
        </div>

        {/* Center: Desktop Jump To Dropdown / Menu */}
        <div className="hidden lg:flex items-center gap-1.5 relative">
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsJumpOpen(!isJumpOpen)}
              aria-expanded={isJumpOpen}
              aria-haspopup="true"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-stone-300 bg-white/70 hover:bg-white text-xs font-mono font-bold text-stone-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-800"
            >
              <span>Jump to:</span>
              <span className="text-stone-900 truncate max-w-[160px]">
                {SECTIONS.find((s) => s.id === activeSection)?.label || 'Sections'}
              </span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isJumpOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Jump Menu Dropdown */}
            {isJumpOpen && (
              <div
                role="menu"
                className="absolute top-full left-0 mt-1.5 w-60 rounded-xl bg-white border border-stone-300 shadow-xl py-1 z-50 animate-in fade-in zoom-in-95 duration-150"
              >
                {SECTIONS.map((sec) => {
                  const isActive = activeSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      type="button"
                      role="menuitem"
                      aria-current={isActive ? 'true' : undefined}
                      onClick={() => handleJump(sec.id)}
                      className={`w-full text-left px-3.5 py-2 text-xs font-mono transition-colors flex items-center justify-between ${
                        isActive
                          ? 'bg-stone-100 font-bold text-stone-950'
                          : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                      }`}
                    >
                      <span>{sec.label}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#FF4F24]" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right: Actions (Copy AI Prompt + Download placeholder) */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Mobile Jump Button */}
          <div className="lg:hidden relative">
            <button
              type="button"
              onClick={() => setIsJumpOpen(!isJumpOpen)}
              aria-expanded={isJumpOpen}
              className="px-2.5 py-1.5 rounded-full border border-stone-300 bg-white/70 text-xs font-mono font-bold text-stone-700"
            >
              Jump ▾
            </button>

            {isJumpOpen && (
              <div
                role="menu"
                className="absolute right-0 top-full mt-1.5 w-56 rounded-xl bg-white border border-stone-300 shadow-xl py-1 z-50"
              >
                {SECTIONS.map((sec) => (
                  <button
                    key={sec.id}
                    type="button"
                    role="menuitem"
                    onClick={() => handleJump(sec.id)}
                    className="w-full text-left px-3.5 py-2 text-xs font-mono text-stone-700 hover:bg-stone-100"
                  >
                    {sec.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* DOWNLOAD Menu */}
          {planDocument && (
            <DownloadMenu
              doc={planDocument}
              accentColor={accentColor}
              label="DOWNLOAD"
              compact
            />
          )}

          {/* COPY AI PROMPT */}
          <button
            type="button"
            onClick={onCopyPrompt}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FF4F24] hover:bg-[#E53E14] active:bg-[#CC340D] text-white font-bold text-[11px] sm:text-xs uppercase tracking-wider shadow-sm transition-transform active:scale-95 cursor-pointer"
          >
            {isCopied ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>COPIED!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>COPY PROMPT</span>
              </>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
}
