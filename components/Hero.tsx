// components/Hero.tsx
// Full-screen hero section centered around the monumental headline:
// - Full-screen photographic background (/photos/hero.webp) with rolling hills and central cloud
// - Massive uppercase headline with overlapping physical sticker tags
// - Centered supporting line and bright solid pill "START HERE" button
// - Balanced spacing with the floating bottom navigation dock

import React from 'react';
import StickerTag from './StickerTag';
import BrandLogo from './BrandLogo';

export default function Hero() {
  return (
    <section id="top" className="relative min-h-[90vh] sm:min-h-screen flex flex-col justify-center items-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14 pb-28 sm:pb-32 text-center">
      
      {/* BRAND LOGO: Centered directly above the headline with 3D glossy finish - Logo mark only (no text) */}
      <div className="relative z-30 mb-5 sm:mb-8 flex flex-col items-center justify-center">
        <div className="liquid-glass px-4 sm:px-5 py-2 sm:py-2.5 rounded-full flex items-center justify-center shadow-[0_16px_36px_rgba(0,0,0,0.35)] border border-white/25 hover:border-white/45 transition-all duration-300 hover:scale-105 active:scale-95">
          <BrandLogo size="md" showWordmark={false} showTagline={false} className="gap-0" />
        </div>
      </div>

      {/* CENTER HERO: Monumental Headline */}
      <div className="relative z-10 max-w-4xl mx-auto w-full mb-4 sm:mb-8">
        <div className="relative inline-block max-w-full">
          
          {/* DESKTOP ONLY: Freely floating sticker badges in wide outer perimeter */}
          <div className="hidden sm:block absolute top-[26%] -left-16 lg:-left-22 z-30 transform origin-bottom-right">
            <StickerTag
              text="Beginners welcome"
              iconSrc="/Icons/site%20icons/sparkles.svg"
              badgeBg="bg-[#7C3AED]"
              stickerBg="bg-[#DDD6FE]"
              rotation="-rotate-6"
              animationClass="animate-float-1"
            />
          </div>

          <div className="hidden sm:block absolute -top-8 -right-12 lg:-right-16 z-30 transform origin-bottom-left">
            <StickerTag
              text="Any skill level"
              iconSrc="/Icons/site%20icons/layers.svg"
              badgeBg="bg-[#DB2777]"
              stickerBg="bg-[#FBCFE8]"
              rotation="rotate-6"
              animationClass="animate-float-2"
            />
          </div>

          <div className="hidden sm:block absolute -bottom-7 -right-8 lg:-right-12 z-30 transform origin-top-left">
            <StickerTag
              text="Plan in minutes"
              iconSrc="/Icons/site%20icons/clock.svg"
              badgeBg="bg-[#EA580C]"
              stickerBg="bg-[#FED7AA]"
              rotation="-rotate-4"
              animationClass="animate-float-3"
            />
          </div>

          {/* Headline Typography - High-impact, fully readable, no awkward wrapping */}
          <h1 className="text-[28px] min-[360px]:text-[32px] min-[400px]:text-[36px] sm:text-6xl md:text-7xl lg:text-[84px] font-black uppercase tracking-[-0.035em] text-white leading-[1.05] sm:leading-[0.98] text-balance drop-shadow-[0_4px_30px_rgba(0,0,0,0.65)] select-none px-1">
            STUCK ON<br />
            WHAT TO BUILD?<br />
            START WITH WHAT<br />
            <span className="whitespace-nowrap">YOU ALREADY KNOW.</span>
          </h1>
        </div>
      </div>

      {/* MOBILE ONLY: Smooth infinite marquee for floating stickers */}
      <div className="sm:hidden w-screen -mx-4 overflow-hidden py-2.5 mb-5 relative z-20 select-none [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex animate-marquee gap-3 py-1">
          {/* Track 1 */}
          <div className="flex items-center gap-3 shrink-0">
            <StickerTag
              text="Beginners welcome"
              iconSrc="/Icons/site%20icons/sparkles.svg"
              badgeBg="bg-[#7C3AED]"
              stickerBg="bg-[#DDD6FE]"
              rotation="-rotate-2"
              animationClass=""
              className="scale-[0.92] origin-center shadow-md"
            />
            <StickerTag
              text="Any skill level"
              iconSrc="/Icons/site%20icons/layers.svg"
              badgeBg="bg-[#DB2777]"
              stickerBg="bg-[#FBCFE8]"
              rotation="rotate-2"
              animationClass=""
              className="scale-[0.92] origin-center shadow-md"
            />
            <StickerTag
              text="Plan in minutes"
              iconSrc="/Icons/site%20icons/clock.svg"
              badgeBg="bg-[#EA580C]"
              stickerBg="bg-[#FED7AA]"
              rotation="-rotate-1"
              animationClass=""
              className="scale-[0.92] origin-center shadow-md"
            />
          </div>
          {/* Track 2 (seamless duplication) */}
          <div className="flex items-center gap-3 shrink-0" aria-hidden="true">
            <StickerTag
              text="Beginners welcome"
              iconSrc="/Icons/site%20icons/sparkles.svg"
              badgeBg="bg-[#7C3AED]"
              stickerBg="bg-[#DDD6FE]"
              rotation="-rotate-2"
              animationClass=""
              className="scale-[0.92] origin-center shadow-md"
            />
            <StickerTag
              text="Any skill level"
              iconSrc="/Icons/site%20icons/layers.svg"
              badgeBg="bg-[#DB2777]"
              stickerBg="bg-[#FBCFE8]"
              rotation="rotate-2"
              animationClass=""
              className="scale-[0.92] origin-center shadow-md"
            />
            <StickerTag
              text="Plan in minutes"
              iconSrc="/Icons/site%20icons/clock.svg"
              badgeBg="bg-[#EA580C]"
              stickerBg="bg-[#FED7AA]"
              rotation="-rotate-1"
              animationClass=""
              className="scale-[0.92] origin-center shadow-md"
            />
          </div>
        </div>
      </div>

      {/* Supporting Copy (No 'START HERE' button) */}
      <div className="relative z-20 max-w-md sm:max-w-xl mx-auto flex flex-col items-center px-2">
        <p className="text-sm sm:text-base md:text-lg text-white/95 leading-relaxed drop-shadow-md font-semibold max-w-md sm:max-w-lg">
          Tell us what you&apos;re good at. Get three ideas that fit your life, plus a plan to start building.
        </p>
      </div>

    </section>
  );
}
