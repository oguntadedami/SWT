'use client';

// components/ready/ReadyActions.tsx
// Action controls below the ready panel:
// - Solid orange pill "COPY AI PROMPT"
//     * Copies starterPrompt to clipboard
//     * Label becomes "Copied" for 2 seconds
//     * Triggers one small hop on the shapes above
//     * If copy fails: shows "Copy failed. Go back to your plan to copy it"
// - Frosted outlined white pill labelled "DOWNLOAD AGAIN" (DownloadMenu)
// - Quiet white text link "Start another build"
//     * If planDownloaded is set in sessionStorage: clears all and navigates to /start
//     * If NOT set: displays inline confirmation: "This clears your plan. Download it first?"
//       with "Download first" (opens DownloadMenu), "Clear and start over", and "Cancel" link
// - Mobile: buttons stack full width, safe area respected

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Copy, Check, AlertCircle } from 'lucide-react';
import { BuildPlan } from '@/lib/plan';
import { PlanDocument } from '@/lib/planDocument';
import DownloadMenu from '@/components/plan/DownloadMenu';

interface ReadyActionsProps {
  plan: BuildPlan;
  doc: PlanDocument;
  accentColor: string;
  onCopySuccess: () => void;
  onAnnounce: (msg: string) => void;
}

export default function ReadyActions({
  plan,
  doc,
  accentColor,
  onCopySuccess,
  onAnnounce,
}: ReadyActionsProps) {
  const router = useRouter();
  const [isCopied, setIsCopied] = useState(false);
  const [copyError, setCopyError] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Copy AI starter prompt handler
  const handleCopyPrompt = async () => {
    setCopyError(null);
    try {
      await navigator.clipboard.writeText(plan.starterPrompt);
      setIsCopied(true);
      onCopySuccess();
      onAnnounce('Starter prompt copied to clipboard');
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch {
      setCopyError('Copy failed. Go back to your plan to copy it');
      onAnnounce('Copy failed. Go back to your plan to copy it');
    }
  };

  // Clear everything in sessionStorage and navigate to /start
  const executeClearAndStartOver = () => {
    try {
      sessionStorage.removeItem('pendingSelectedIdeaId');
      sessionStorage.removeItem('selectedIdea');
      sessionStorage.removeItem('ideas_generated');
      sessionStorage.removeItem('start_with_this_answers');
      sessionStorage.removeItem('planDownloaded');
    } catch {
      // ignore
    }
    router.push('/start');
  };

  // Handle click on "Start another build"
  const handleStartAnotherBuildClick = (e: React.MouseEvent) => {
    e.preventDefault();
    let isDownloaded = false;
    try {
      isDownloaded = sessionStorage.getItem('planDownloaded') === 'true';
    } catch {
      isDownloaded = false;
    }

    if (isDownloaded) {
      executeClearAndStartOver();
    } else {
      setShowClearConfirm(true);
    }
  };

  return (
    <div className="w-full max-w-[640px] mx-auto flex flex-col items-center gap-6 mt-8 sm:mt-10">
      {/* Primary and Secondary CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 w-full">
        {/* Solid Orange Pill: "COPY AI PROMPT" */}
        <button
          type="button"
          onClick={handleCopyPrompt}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-[#FF4F24] hover:bg-[#E53E14] active:bg-[#CC340D] text-white font-bold text-sm sm:text-base tracking-wider uppercase shadow-[0_12px_28px_rgba(255,79,36,0.45)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
        >
          {isCopied ? (
            <>
              <Check className="w-5 h-5 stroke-[2.5]" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-5 h-5 stroke-[2.2]" />
              <span>COPY AI PROMPT</span>
            </>
          )}
        </button>

        {/* Frosted Outlined White Pill: "DOWNLOAD AGAIN" */}
        <div className="w-full sm:w-auto flex justify-center">
          <DownloadMenu
            doc={doc}
            accentColor={accentColor}
            variant="frosted"
            label="DOWNLOAD AGAIN"
            className="w-full sm:w-auto flex justify-center"
          />
        </div>
      </div>

      {/* Copy failure error notice */}
      {copyError && (
        <div
          role="alert"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/90 text-white text-xs sm:text-sm font-medium shadow-md animate-in fade-in"
        >
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{copyError}</span>
        </div>
      )}

      {/* Quiet White Text Link or Inline Confirmation */}
      {!showClearConfirm ? (
        <button
          type="button"
          onClick={handleStartAnotherBuildClick}
          className="text-sm sm:text-base font-medium text-white/80 hover:text-white underline underline-offset-4 decoration-white/40 hover:decoration-white transition-all select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-md px-2 py-1"
        >
          Start another build
        </button>
      ) : (
        /* Inline Confirmation Card */
        <div
          role="dialog"
          aria-label="Confirm starting another build"
          className="w-full max-w-md rounded-2xl bg-white/95 backdrop-blur-xl border border-white p-5 sm:p-6 shadow-2xl text-center text-zinc-900 animate-in fade-in zoom-in-95 duration-150"
        >
          <p className="text-sm sm:text-base font-bold text-zinc-900 mb-1 leading-snug">
            This clears your plan. Download it first?
          </p>
          <p className="text-xs sm:text-sm text-zinc-600 mb-5 leading-normal">
            Once cleared, your answers and custom build steps will be reset.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3">
            {/* Download First */}
            <DownloadMenu
              doc={doc}
              accentColor={accentColor}
              label="Download first"
              compact={true}
              forceUpward={true}
            />

            {/* Clear and start over */}
            <button
              type="button"
              onClick={executeClearAndStartOver}
              className="w-full sm:w-auto px-4 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold transition-all shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
            >
              Clear and start over
            </button>

            {/* Cancel link */}
            <button
              type="button"
              onClick={() => setShowClearConfirm(false)}
              className="text-xs sm:text-sm font-semibold text-zinc-600 hover:text-zinc-900 px-3 py-1.5 transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
