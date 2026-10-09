'use client';

// components/Footer.tsx
// Floating frosted-glass panel in a LIGHT style matching the photographic landscape aesthetic.
// Features:
// - Light translucent frosted glass (liquid-glass-light) with rounded corners and subtle border
// - Monospace uppercase typography with dark, high-contrast, readable text and dimmed headers
// - Top row: "START WITH THIS" wordmark (left) + pill-shaped outlined "START HERE →" button (right, fills orange on hover)
// - Hairline dividers separating header, middle content, and copyright
// - Explore menu links REMOVED as requested
// - SEAMLESS DOCK POURING: As the user scrolls into the footer, the 5 dock icons smoothly pour into the
//   inlaid Dock Bay inside this glass panel where they can be clicked and used directly.
//   When the user scrolls back up, the icons fluidly return to the floating dock!
// - 2 link columns: HELP (Feedback, Privacy) and CONNECT (Email, Website)
// - Swappable female builder walking cartoon doodle illustration
// - Bottom row: "© 2026 Start With This" & official disclaimer in sentence case
// - Responsive & mobile-first

import React from 'react';
import FooterIllustration from './FooterIllustration';
import { useDock } from './DockContext';
import DockIcons from './DockIcons';
import BrandLogo from './BrandLogo';

export default function Footer() {
  const { scrollTo, startHere, isAtFooter } = useDock();

  return (
    <footer id="start-cta" className="px-4 sm:px-6 lg:px-8 mt-16 mb-20 sm:mb-24 relative z-20">
      {/* Floating Light Frosted-Glass Panel */}
      <div className="max-w-[1100px] mx-auto rounded-[28px] sm:rounded-[36px] liquid-glass-light p-6 sm:p-10 text-stone-900 transition-all duration-500">
        
        {/* TOP ROW: Brand Mark & Wordmark (left) & Outlined Pill Button (right) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-6 border-b border-stone-900/10">
          <BrandLogo size="md" showWordmark={true} showTagline={true} wordmarkColor="dark" />

          <a
            href="/start"
            onClick={startHere}
            aria-label="Start Here"
            className="w-full sm:w-auto text-center font-mono font-bold uppercase text-xs sm:text-sm tracking-wider px-6 py-2.5 rounded-full border-2 border-[#FF5722] text-[#FF5722] hover:bg-[#FF5722] hover:text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5722]"
          >
            START HERE →
          </a>
        </div>

        {/* MIDDLE SECTION: Help & Connect Links + Poured Dock Bay + Builder Illustration */}
        <div className="relative pt-8 pb-6 flex flex-col lg:flex-row justify-between items-center lg:items-start gap-8">
          
          {/* Columns Container: HELP & CONNECT (Explore removed) */}
          <div className="grid grid-cols-2 gap-8 sm:gap-12 w-full lg:w-auto self-start">
            
            {/* Column 1: HELP */}
            <div className="flex flex-col gap-3 font-mono">
              <span className="text-stone-400 text-xs font-bold uppercase tracking-wider">
                HELP
              </span>
              <ul className="flex flex-col gap-2.5 text-xs sm:text-sm uppercase tracking-wide">
                <li>
                  <a
                    href="mailto:jemstudiodesign@gmail.com?subject=Start%20With%20This%20feedback"
                    className="text-stone-700 hover:text-stone-950 hover:underline transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF5722] rounded-sm font-medium"
                  >
                    Feedback
                  </a>
                </li>
                <li>
                  {/* NOTE: Replace "#" with privacy policy page URL when ready */}
                  <a
                    href="#"
                    className="text-stone-700 hover:text-stone-950 hover:underline transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF5722] rounded-sm font-medium"
                  >
                    Privacy
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: CONNECT */}
            <div className="flex flex-col gap-3 font-mono">
              <span className="text-stone-400 text-xs font-bold uppercase tracking-wider">
                CONNECT
              </span>
              <ul className="flex flex-col gap-2.5 text-xs sm:text-sm uppercase tracking-wide">
                <li>
                  <a
                    href="mailto:jemstudiodesign@gmail.com"
                    className="text-stone-700 hover:text-stone-950 hover:underline transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF5722] rounded-sm font-medium"
                  >
                    Email
                  </a>
                </li>
                <li>
                  <a
                    href="https://jemstudio.framer.website/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stone-700 hover:text-stone-950 hover:underline transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF5722] rounded-sm font-medium"
                  >
                    Website
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* POURED DOCK RECEIVER BAY:
              As the user scrolls down, the floating dock icons seamlessly pour into this glass tray!
              Icons are fully functional and interactive here.
              When scrolling back up, they return back to the dock. */}
          <div
            id="footer-dock-bay"
            className="flex flex-col items-center justify-center w-full lg:w-auto my-2 lg:my-0"
          >
            {/* Dock Bay Inlaid Container */}
            <div
              className={`relative liquid-dock-bay rounded-[24px] sm:rounded-full px-3 sm:px-5 py-2.5 flex flex-col items-center justify-center transition-all duration-500 ${
                isAtFooter ? 'animate-pour-pulse border-orange-400/30' : 'opacity-85'
              }`}
            >
              {/* Subtle Dock Bay Title & Indicator */}
              <div className="flex items-center gap-1.5 mb-1 opacity-70">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isAtFooter ? 'bg-[#FF5722] animate-pulse' : 'bg-stone-400'
                  }`}
                />
                <span className="text-[9px] font-mono font-bold tracking-widest text-stone-500 uppercase">
                  {isAtFooter ? 'DOCK POURED HERE · CLICK TO NAVIGATE' : 'NAVIGATION DOCK'}
                </span>
              </div>

              {/* The 5 Poured App-Icons */}
              <DockIcons variant="footer" isPoured={isAtFooter} />
            </div>
          </div>

          {/* OFFICIAL FOOTER ILLUSTRATION with fluid floating physics motion */}
          <div className="self-center lg:self-center shrink-0 w-28 sm:w-32 md:w-36 lg:w-40">
            <FooterIllustration className="w-full h-auto" />
          </div>

        </div>

        {/* BOTTOM ROW: Second hairline divider, Copyright (left), Disclaimer (right) */}
        <div className="pt-6 mt-2 border-t border-stone-900/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
          <span className="text-stone-400 uppercase tracking-wide">
            © 2026 Start With This
          </span>

          <span className="text-stone-500 font-sans sm:font-mono text-[11px] sm:text-xs leading-relaxed max-w-lg text-left sm:text-right">
            Start With This generates possibilities and plans. It doesn&apos;t guarantee an idea will succeed.
          </span>
        </div>

      </div>
    </footer>
  );
}
