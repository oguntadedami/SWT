'use client';

// components/DockContext.tsx
// Global context managing navigation state, active section tracking,
// and the scroll synchronization that pours the dock icons into the footer glass panel.

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export type DockSection = 'home' | 'how-it-works' | 'what-you-get' | 'feedback' | 'start-here';

interface DockContextType {
  activeSection: DockSection;
  isAtFooter: boolean;
  scrollTo: (e: React.MouseEvent<HTMLAnchorElement> | null, targetId: string) => void;
  startHere: (e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

const DockContext = createContext<DockContextType | null>(null);

export function DockProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<DockSection>('home');
  const [isAtFooter, setIsAtFooter] = useState<boolean>(false);

  const scrollTo = useCallback((e: React.MouseEvent<HTMLAnchorElement> | null, targetId: string) => {
    if (e) e.preventDefault();
    if (targetId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('home');
    } else {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  const startHere = useCallback((e?: React.MouseEvent<HTMLAnchorElement>) => {
    if (e) e.preventDefault();
    router.push('/start');
  }, [router]);

  // Monitor scroll for section highlighting and footer docking transition
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const windowHeight = window.innerHeight;

          // 1. Highlight active section indicator
          const howItWorksEl = document.getElementById('how-it-works');
          const buildPlanEl = document.getElementById('build-plan');

          const howItWorksTop = howItWorksEl ? howItWorksEl.offsetTop - 200 : 600;
          const buildPlanTop = buildPlanEl ? buildPlanEl.offsetTop - 200 : 1200;

          if (scrollY >= buildPlanTop) {
            setActiveSection('what-you-get');
          } else if (scrollY >= howItWorksTop) {
            setActiveSection('how-it-works');
          } else {
            setActiveSection('home');
          }

          // 2. Check if user reached the footer dock bay
          const footerBayEl = document.getElementById('footer-dock-bay');
          if (footerBayEl) {
            const rect = footerBayEl.getBoundingClientRect();
            // Seamless threshold with hysteresis:
            // Pour into footer when the bay approaches the viewport bottom
            // Return to dock when scrolling back up
            setIsAtFooter((prev) => {
              if (!prev && rect.top <= windowHeight - 70) {
                return true;
              }
              if (prev && rect.top > windowHeight - 20) {
                return false;
              }
              return prev;
            });
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <DockContext.Provider
      value={{
        activeSection,
        isAtFooter,
        scrollTo,
        startHere,
      }}
    >
      {children}
    </DockContext.Provider>
  );
}

export function useDock() {
  const context = useContext(DockContext);
  if (!context) {
    throw new Error('useDock must be used within a DockProvider');
  }
  return context;
}
