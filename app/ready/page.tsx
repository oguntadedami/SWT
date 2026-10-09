'use client';

// app/ready/page.tsx
// Completion / Ready to Build screen:
// - Preserves guards, redirects, shared state, and sessionStorage resolution
// - Renders the redesigned ReadyScreen matching the landing page visual world

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MOCK_IDEAS, Idea } from '@/lib/ideas';
import { getBuildPlanForIdea, BuildPlan } from '@/lib/plan';
import ReadyScreen from '@/components/ready/ReadyScreen';

export default function ReadyPage() {
  const router = useRouter();
  const [selectedIdeaId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      try {
        const pending = sessionStorage.getItem('pendingSelectedIdeaId');
        if (pending && MOCK_IDEAS.some((i) => i.id === pending)) {
          return pending;
        }
        const stored = sessionStorage.getItem('selectedIdea');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed?.id && MOCK_IDEAS.some((i) => i.id === parsed.id)) {
            return parsed.id;
          }
        }
      } catch {
        // ignore
      }
    }
    return 'idea-1';
  });

  useEffect(() => {
    try {
      const pending = sessionStorage.getItem('pendingSelectedIdeaId');
      const stored = sessionStorage.getItem('selectedIdea');
      let hasValid = false;
      if (pending && MOCK_IDEAS.some((i) => i.id === pending)) {
        hasValid = true;
      } else if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed?.id && MOCK_IDEAS.some((i) => i.id === parsed.id)) {
            hasValid = true;
          }
        } catch {
          // ignore
        }
      }

      if (!hasValid) {
        const ideasExist = Boolean(
          sessionStorage.getItem('ideas_generated') ||
          (typeof document !== 'undefined' && document.referrer.includes('/ideas'))
        );
        const answersRaw = sessionStorage.getItem('start_with_this_answers');
        if (ideasExist) {
          router.replace('/ideas');
        } else if (answersRaw) {
          router.replace('/generating');
        }
      }
    } catch {
      // ignore
    }
  }, [router]);

  const currentIdea: Idea =
    MOCK_IDEAS.find((i) => i.id === selectedIdeaId) || MOCK_IDEAS[0];
  const plan: BuildPlan = getBuildPlanForIdea(currentIdea.id, currentIdea.name);

  return <ReadyScreen idea={currentIdea} plan={plan} />;
}
