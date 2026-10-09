// components/StickerTag.tsx
// Physical-looking sticker tag matching the reference image:
// - Pill/rounded rectangle sticker body with bold type
// - Protruding circular icon badge overlapping the top-left edge
// - Slight rotation and gentle floating animation (transform only)
// - Respects prefers-reduced-motion

import React from 'react';
import Image from 'next/image';

interface StickerTagProps {
  text: string;
  iconSrc: string;
  badgeBg: string;
  stickerBg: string;
  stickerText?: string;
  rotation: string;
  animationClass?: string;
  className?: string;
}

export default function StickerTag({
  text,
  iconSrc,
  badgeBg,
  stickerBg,
  stickerText = 'text-stone-950',
  rotation,
  animationClass = 'animate-float-1',
  className = '',
}: StickerTagProps) {
  return (
    <div
      className={`relative inline-flex items-center pl-8 sm:pl-9 pr-3.5 sm:pr-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.35)] select-none pointer-events-none transform ${rotation} ${animationClass} ${stickerBg} ${className}`}
    >
      {/* Protruding circular icon badge overlapping the corner - enlarged to comfortably fit 28px icon */}
      <div
        className={`absolute -top-3 -left-3 sm:-top-3.5 sm:-left-3.5 w-9 h-9 sm:w-10 sm:h-10 rounded-full ${badgeBg} flex items-center justify-center shadow-md border-2 border-white shrink-0 p-1`}
        aria-hidden="true"
      >
        <Image
          src={iconSrc}
          alt=""
          width={28}
          height={28}
          referrerPolicy="no-referrer"
          className="w-[26px] h-[26px] sm:w-[28px] sm:h-[28px] object-contain select-none pointer-events-none"
        />
      </div>

      {/* Sticker text */}
      <span className={`text-xs sm:text-sm font-black tracking-tight uppercase whitespace-nowrap ${stickerText}`}>
        {text}
      </span>
    </div>
  );
}
