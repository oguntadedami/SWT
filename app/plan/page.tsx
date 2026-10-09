'use client';

// app/plan/page.tsx
// Redesigned Build Plan screen at /plan for "Start With This":
//
// 1. FIX THE LOGIC:
//    - Shows ONLY the plan for the single idea selected on /ideas.
//    - Removed idea switcher tabs completely.
//    - If no selected idea exists, redirects in order: "/ideas" if ideas exist,
//      else "/generating" if answers exist, else "/start".
//    - Replaced the old "Print / Save as PDF" button with PlanExportBar (.md download & copy).
//    - Removed tag pills, yellow sparkle box, decorative corner watermark,
//      uppercase monospace captions, and icons next to section titles.
//
// 2. PAGE STRUCTURE:
//    - Header band: Softened hero photo background fading smoothly into calm blue-gray backdrop (#EEF2F6),
//      Back to ideas text link, selected idea's brand shape (large + hop on arrival),
//      huge white uppercase product name, one-line definition in white,
//      "At a glance" row in plain white text separated by thin vertical rules.
//    - Body Container on calm blue-gray backdrop:
//        1. Lead Summary Card (Problem, Target user, MVP, subtle adjustment note)
//        2. Scope Two Columns ("What to build for v1" & "What to leave out for now")
//        3. Recommended Tool Stack
//        4. Build Roadmap (3 sequential stages)
//        5. AI Starter Prompt (Dark monospace block + copy button)
//        6. Plan Export Bar (Download as Markdown .md + Copy full plan)
//        7. Ready Footer ("Back to ideas", "Start over", encouragement)

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { MOCK_IDEAS, Idea } from '@/lib/ideas';
import { getBuildPlanForIdea, BuildPlan } from '@/lib/plan';
import PlanScreen from '@/components/plan/PlanScreen';

function PlanContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryId = searchParams.get('id');

  const initialValidId =
    queryId && MOCK_IDEAS.some((i) => i.id === queryId) ? queryId : null;

  const [selectedIdeaId, setSelectedIdeaId] = useState<string | null>(initialValidId);
  const [isReady, setIsReady] = useState<boolean>(Boolean(initialValidId));

  useEffect(() => {
    const timer = setTimeout(() => {
      // 1. Check if ID exists in URL query param
      if (queryId && MOCK_IDEAS.some((i) => i.id === queryId)) {
        setSelectedIdeaId(queryId);
        setIsReady(true);
        try {
          sessionStorage.setItem('pendingSelectedIdeaId', queryId);
        } catch {
          // ignore
        }
        return;
      }

      // 2. Check if selected idea exists in sessionStorage
      let foundId: string | null = null;
      try {
        const pending = sessionStorage.getItem('pendingSelectedIdeaId');
        if (pending && MOCK_IDEAS.some((i) => i.id === pending)) {
          foundId = pending;
        } else {
          const stored = sessionStorage.getItem('selectedIdea');
          if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed?.id && MOCK_IDEAS.some((i) => i.id === parsed.id)) {
              foundId = parsed.id;
            }
          }
        }
      } catch {
        // ignore
      }

      if (foundId) {
        setSelectedIdeaId(foundId);
        setIsReady(true);
        return;
      }

      // 3. NO selected idea exists!
      // Redirect order: "/ideas" if ideas exist, else "/generating" if answers exist, else "/start"
      try {
        const answersRaw = sessionStorage.getItem('start_with_this_answers');
        let hasAnswers = false;
        if (answersRaw) {
          try {
            const parsed = JSON.parse(answersRaw);
            hasAnswers = Boolean(
              parsed &&
              typeof parsed === 'object' &&
              ((parsed.skills &&
                (Array.isArray(parsed.skills)
                  ? parsed.skills.length > 0
                  : typeof parsed.skills === 'string' && parsed.skills.trim())) ||
               (parsed.interests &&
                (Array.isArray(parsed.interests)
                  ? parsed.interests.length > 0
                  : typeof parsed.interests === 'string' && parsed.interests.trim())))
            );
          } catch {
            // ignore
          }
        }

        const ideasExist = Boolean(
          sessionStorage.getItem('pendingSelectedIdeaId') ||
          sessionStorage.getItem('selectedIdea') ||
          sessionStorage.getItem('ideas_generated') ||
          (typeof document !== 'undefined' && document.referrer.includes('/ideas'))
        );

        if (ideasExist) {
          router.replace('/ideas');
        } else if (hasAnswers) {
          router.replace('/generating');
        } else {
          router.replace('/start');
        }
      } catch {
        router.replace('/start');
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [queryId, router]);

  if (!isReady || !selectedIdeaId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B1320] text-stone-300 font-medium text-sm">
        Loading your build plan...
      </div>
    );
  }

  const currentIdea: Idea =
    MOCK_IDEAS.find((i) => i.id === selectedIdeaId) || MOCK_IDEAS[0];

  const plan: BuildPlan = getBuildPlanForIdea(currentIdea.id, currentIdea.name);

  return <PlanScreen plan={plan} idea={currentIdea} />;
}

export default function PlanPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#0B1320] text-stone-300 font-medium text-sm">
          Loading your build plan...
        </div>
      }
    >
      <PlanContent />
    </Suspense>
  );
}
