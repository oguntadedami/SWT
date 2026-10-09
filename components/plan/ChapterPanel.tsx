'use client';

// components/plan/ChapterPanel.tsx
// Common wrapper for each of the three chapters:
// - Huge white uppercase heading on the photo (h2)
// - Small sticker tag above it ("Part 1 of 3", etc.)
// - One bright frosted panel:
//     * White at ~92% opacity (bg-white/92)
//     * Backdrop blur 2xl
//     * 32px border radius
//     * Layered soft shadow
//     * Max width 960px, centered
//     * Generous padding (p-6 sm:p-10 lg:p-12)
// - Motion: rises and fades in once on viewport entry (transform & opacity only)

import React from 'react';
import { motion } from 'motion/react';
import StickerTag from './StickerTag';

interface ChapterPanelProps {
  id: string;
  partText: string;
  partColor?: 'red' | 'blue' | 'green' | 'ink';
  title: string;
  children: React.ReactNode;
}

export default function ChapterPanel({
  id,
  partText,
  partColor = 'ink',
  title,
  children,
}: ChapterPanelProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="w-full max-w-[960px] mx-auto px-4 sm:px-6 scroll-mt-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center"
      >
        {/* Small Sticker above heading */}
        <div className="mb-3">
          <StickerTag
            text={partText}
            color={partColor}
            rotation="rotate-[-1.5deg]"
            wobble={false}
          />
        </div>

        {/* Huge White Uppercase Heading on the Photo (H2) */}
        <h2
          id={`${id}-heading`}
          className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)] mb-8 sm:mb-10 text-center leading-tight"
        >
          {title}
        </h2>

        {/* Single Bright Frosted Panel */}
        <div className="w-full rounded-[32px] bg-white/92 backdrop-blur-2xl border border-white/80 p-6 sm:p-10 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.16),0_2px_12px_rgba(0,0,0,0.06)] text-zinc-900 text-left selection:bg-[#FF4F24] selection:text-white">
          {children}
        </div>
      </motion.div>
    </section>
  );
}
