'use client';

// hooks/use-footer-dock.ts
// Coordinates scroll state between the floating bottom dock and the footer dock tray.
// Uses hysteresis to prevent any jittering near the transition threshold.

import { useState, useEffect } from 'react';

export function useFooterDock() {
  const [isAtFooter, setIsAtFooter] = useState(false);
  const [activeSection, setActiveSection] = useState<'home' | 'how-it-works' | 'what-you-get' | 'feedback' | 'start-here'>('home');

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const footerEl = document.getElementById('start-cta');
          const howItWorksEl = document.getElementById('how-it-works');
          const buildPlanEl = document.getElementById('build-plan');
          const scrollY = window.scrollY;

          // Section tracking
          const howItWorksTop = howItWorksEl ? howItWorksEl.offsetTop - 220 : 600;
          const buildPlanTop = buildPlanEl ? buildPlanEl.offsetTop - 220 : 1200;

          if (scrollY >= buildPlanTop) {
            setActiveSection('what-you-get');
          } else if (scrollY >= howItWorksTop) {
            setActiveSection('how-it-works');
          } else {
            setActiveSection('home');
          }

          // Footer docking threshold with hysteresis
          if (footerEl) {
            const rect = footerEl.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // When footer enters viewport
            if (rect.top <= viewportHeight - 120) {
              setIsAtFooter(true);
            } else if (rect.top > viewportHeight - 40) {
              setIsAtFooter(false);
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { isAtFooter, activeSection, setActiveSection };
}
