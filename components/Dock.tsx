'use client';

// components/Dock.tsx
// Floating bottom navigation dock using the uploaded app-icons.
// Requirements:
// - Never covers content: reserves bottom padding on the page/footer for dock height + safe-area inset.
// - Hides with a smooth translate while scrolling down, shows again when scrolling up.
// - Uses transform and opacity only.
// - Maintains existing glass styling (liquid-glass pill container, soft blur, subtle reflection).
// - Stays above content without blocking footer text or the START HERE button.

import React, { useEffect, useState, useRef } from 'react';
import { useDock } from './DockContext';
import DockIcons from './DockIcons';

export default function Dock() {
  const { isAtFooter } = useDock();
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY.current;

      // Always show near the very top of the page
      if (currentScrollY <= 40) {
        setIsVisible(true);
      } else if (diff > 8) {
        // Scrolling down -> hide dock smoothly
        setIsVisible(false);
      } else if (diff < -8) {
        // Scrolling up -> show dock smoothly
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine transform & opacity state
  // If at footer, the dock pours into the footer tray and hides floating dock
  // If scrolling down, dock translates down offscreen
  const shouldShow = isVisible && !isAtFooter;

  return (
    <nav
      aria-label="Bottom Navigation Dock"
      className={`fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom,0px))] sm:bottom-5 left-1/2 z-50 max-w-[calc(100vw-1rem)] will-change-transform ${
        shouldShow ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
      style={{
        transform: shouldShow
          ? 'translate3d(-50%, 0, 0) scale(1)'
          : 'translate3d(-50%, 96px, 0) scale(0.92)',
        opacity: shouldShow ? 1 : 0,
        transition:
          'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div className="liquid-glass rounded-full px-2.5 sm:px-4 py-1.5 sm:py-2 shadow-[0_20px_50px_rgba(0,0,0,0.55)] flex items-center justify-center">
        <DockIcons variant="floating" />
      </div>
    </nav>
  );
}
