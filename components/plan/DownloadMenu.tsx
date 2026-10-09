'use client';

// components/plan/DownloadMenu.tsx
// Reusable DownloadMenu component with options for PDF, HTML, and Markdown:
// - Outlined ink pill button labelled "DOWNLOAD" (or "DOWNLOAD AGAIN") with chevron
// - Accessible popup menu with 3 options:
//     * "PDF document": "Best for sharing and printing"
//     * "Web page (HTML)": "Opens in any browser"
//     * "Markdown (MD)": "Plain text for notes apps and developers"
// - Dynamic import of @react-pdf/renderer only when PDF is requested
// - States: "Creating PDF...", "Downloaded PDF" for 2 seconds
// - Sets sessionStorage "planDownloaded" flag (try/catch, never localStorage)
// - Fallback banner if PDF generation fails: "Couldn't create the PDF. Try the web page instead."
// - Keyboard navigation: arrow keys, Enter, Space, Escape, outside click
// - Mobile bottom sheet above safe area

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDown, AlertCircle, Check, FileDown, Globe, FileText } from 'lucide-react';
import {
  PlanDocument,
  getPlanDownloadFileName,
  generatePlanHtml,
  generatePlanMarkdown,
} from '@/lib/planDocument';
import { PLAN_COLORS } from '@/lib/planTheme';

interface DownloadMenuProps {
  doc: PlanDocument;
  accentColor?: string;
  label?: string;
  className?: string;
  compact?: boolean;
}

type DownloadFormat = 'pdf' | 'html' | 'md';

interface MenuOption {
  format: DownloadFormat;
  title: string;
  description: string;
  icon: typeof FileDown;
  extension: 'pdf' | 'html' | 'md';
}

const MENU_OPTIONS: MenuOption[] = [
  {
    format: 'pdf',
    title: 'PDF document',
    description: 'Best for sharing and printing',
    icon: FileDown,
    extension: 'pdf',
  },
  {
    format: 'html',
    title: 'Web page (HTML)',
    description: 'Opens in any browser',
    icon: Globe,
    extension: 'html',
  },
  {
    format: 'md',
    title: 'Markdown (MD)',
    description: 'Plain text for notes apps and developers',
    icon: FileText,
    extension: 'md',
  },
];

export default function DownloadMenu({
  doc,
  accentColor = PLAN_COLORS.accentOrange,
  label = 'DOWNLOAD',
  className = '',
  compact = false,
}: DownloadMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [downloadSuccessText, setDownloadSuccessText] = useState<string | null>(null);
  const [pdfErrorMessage, setPdfErrorMessage] = useState<string | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const [openUpward, setOpenUpward] = useState(false);
  const [announcement, setAnnouncement] = useState('');

  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Calculate if menu should open upward or downward based on viewport position
  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      setOpenUpward(spaceBelow < 260 && rect.top > 260);
    }
  }, [isOpen]);

  // Click outside listener
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Focus management when menu opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        optionRefs.current[0]?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Set sessionStorage flag on download
  const recordDownloadSuccess = (formatTitle: string) => {
    try {
      sessionStorage.setItem('planDownloaded', 'true');
    } catch {
      // ignore
    }
    const successMsg = `Downloaded ${formatTitle}`;
    setDownloadSuccessText(successMsg);
    setAnnouncement(successMsg);
    setTimeout(() => {
      setDownloadSuccessText(null);
    }, 2000);
  };

  // HTML format download
  const downloadHtml = useCallback(() => {
    try {
      const htmlString = generatePlanHtml(doc, accentColor);
      const blob = new Blob([htmlString], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = getPlanDownloadFileName(doc.title, 'html');
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 10000);
      recordDownloadSuccess('HTML');
    } catch (err) {
      console.error('HTML download failed', err);
    }
  }, [doc, accentColor]);

  // Markdown format download
  const downloadMarkdown = useCallback(() => {
    try {
      const mdString = generatePlanMarkdown(doc);
      const blob = new Blob([mdString], { type: 'text/markdown;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = getPlanDownloadFileName(doc.title, 'md');
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 10000);
      recordDownloadSuccess('Markdown');
    } catch (err) {
      console.error('Markdown download failed', err);
    }
  }, [doc]);

  // PDF format download via dynamic import
  const downloadPdf = useCallback(async () => {
    setPdfErrorMessage(null);
    setIsGeneratingPdf(true);
    setAnnouncement('Creating PDF...');

    try {
      // Dynamic import of @react-pdf/renderer and PDF document component
      const [{ pdf }, { default: PlanPdfDocument }] = await Promise.all([
        import('@react-pdf/renderer'),
        import('./pdf/PlanPdfDocument'),
      ]);

      let blob: Blob;
      try {
        const instance = pdf(
          <PlanPdfDocument doc={doc} accentColor={accentColor} />
        );
        blob = await instance.toBlob();
      } catch (fontError) {
        console.warn('Initial PDF font render error, attempting system font fallback', fontError);
        const fallbackInstance = pdf(
          <PlanPdfDocument doc={doc} accentColor={accentColor} useFallbackFonts={true} />
        );
        blob = await fallbackInstance.toBlob();
      }

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = getPlanDownloadFileName(doc.title, 'pdf');
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 10000);

      recordDownloadSuccess('PDF');
    } catch (err) {
      console.error('PDF creation error:', err);
      setPdfErrorMessage("Couldn't create the PDF. Try the web page instead.");
      setAnnouncement("Couldn't create the PDF. Try the web page instead.");
    } finally {
      setIsGeneratingPdf(false);
    }
  }, [doc, accentColor]);

  const handleSelectOption = (format: DownloadFormat) => {
    setIsOpen(false);
    triggerRef.current?.focus();

    if (format === 'pdf') {
      downloadPdf();
    } else if (format === 'html') {
      downloadHtml();
    } else if (format === 'md') {
      downloadMarkdown();
    }
  };

  // Keyboard navigation inside menu
  const handleMenuKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
      triggerRef.current?.focus();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (focusedIndex + 1) % MENU_OPTIONS.length;
      setFocusedIndex(nextIndex);
      optionRefs.current[nextIndex]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (focusedIndex - 1 + MENU_OPTIONS.length) % MENU_OPTIONS.length;
      setFocusedIndex(prevIndex);
      optionRefs.current[prevIndex]?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      setFocusedIndex(0);
      optionRefs.current[0]?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      setFocusedIndex(MENU_OPTIONS.length - 1);
      optionRefs.current[MENU_OPTIONS.length - 1]?.focus();
    }
  };

  // Label display logic
  const buttonLabel = isGeneratingPdf
    ? 'Creating PDF...'
    : downloadSuccessText
    ? downloadSuccessText
    : label;

  return (
    <div className={`relative inline-block text-left ${className}`}>
      {/* Screen reader polite status announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      {/* Main trigger button: Outlined ink pill */}
      <button
        ref={triggerRef}
        type="button"
        id="download-menu-trigger"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={isOpen ? 'download-menu-dropdown' : undefined}
        disabled={isGeneratingPdf}
        onClick={() => {
          setPdfErrorMessage(null);
          setFocusedIndex(0);
          setIsOpen(!isOpen);
        }}
        className={`inline-flex items-center justify-center gap-1.5 rounded-full border border-stone-800 hover:border-black active:border-black bg-white hover:bg-stone-50 active:bg-stone-100 text-[#1F2421] font-bold uppercase tracking-wider transition-all duration-150 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F2421] focus-visible:ring-offset-2 ${
          compact
            ? 'px-3.5 py-1.5 text-[11px] sm:text-xs'
            : 'px-5 sm:px-6 py-2.5 text-xs sm:text-sm'
        } ${downloadSuccessText ? 'border-emerald-600 text-emerald-800 bg-emerald-50' : ''}`}
      >
        {downloadSuccessText ? (
          <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
        ) : (
          <FileDown className="w-3.5 h-3.5 stroke-[2.2] text-[#1F2421]" />
        )}
        <span>{buttonLabel}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-stone-600 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Desktop & Tablet Dropdown Menu / Mobile Bottom Sheet */}
      {isOpen && (
        <>
          {/* Mobile Backdrop */}
          <div
            className="sm:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-xs"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Menu Container */}
          <div
            ref={menuRef}
            id="download-menu-dropdown"
            role="menu"
            aria-labelledby="download-menu-trigger"
            onKeyDown={handleMenuKeyDown}
            className={`
              fixed sm:absolute z-50
              sm:right-0 sm:w-72
              bg-[#FDFCF9] border border-stone-300 rounded-2xl sm:rounded-xl shadow-2xl p-1.5
              animate-in fade-in duration-150
              ${
                /* Mobile: Bottom Sheet above safe area */
                'bottom-4 left-4 right-4 sm:bottom-auto sm:left-auto'
              }
              ${
                /* Desktop: Upward vs Downward position */
                openUpward ? 'sm:bottom-full sm:mb-2' : 'sm:top-full sm:mt-2'
              }
            `}
          >
            {/* Header title on mobile sheet */}
            <div className="sm:hidden px-3 pt-2 pb-1.5 border-b border-stone-200 mb-1">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-stone-500">
                Download Build Plan
              </span>
            </div>

            {/* Menu Options */}
            <div className="flex flex-col gap-1">
              {MENU_OPTIONS.map((opt, idx) => {
                const Icon = opt.icon;
                const isFocused = focusedIndex === idx;

                return (
                  <button
                    key={opt.format}
                    ref={(el) => {
                      optionRefs.current[idx] = el;
                    }}
                    type="button"
                    role="menuitem"
                    tabIndex={isFocused ? 0 : -1}
                    onClick={() => handleSelectOption(opt.format)}
                    onMouseEnter={() => setFocusedIndex(idx)}
                    className={`w-full text-left p-3 rounded-lg sm:rounded-md transition-colors flex items-start gap-3 select-none cursor-pointer min-h-[44px] ${
                      isFocused
                        ? 'bg-stone-200/70 text-stone-950 ring-1 ring-stone-400'
                        : 'hover:bg-stone-100 text-stone-800'
                    } focus-visible:outline-none`}
                  >
                    <div className="p-1.5 rounded-md bg-stone-100 text-stone-700 mt-0.5 shrink-0">
                      <Icon className="w-4 h-4 stroke-[2]" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <span className="block font-sans font-bold text-xs sm:text-sm text-stone-900 leading-snug">
                        {opt.title}
                      </span>
                      <span className="block font-serif text-[11px] sm:text-xs text-stone-600 leading-tight mt-0.5">
                        {opt.description}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* Inline Error Banner if PDF creation fails */}
      {pdfErrorMessage && (
        <div
          role="alert"
          className="absolute right-0 top-full mt-2 w-80 z-50 p-3 bg-amber-50 border border-amber-300 rounded-xl shadow-xl text-left animate-in fade-in"
        >
          <div className="flex items-start gap-2 text-amber-900 text-xs sm:text-sm font-medium">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="leading-snug">{pdfErrorMessage}</p>
              <div className="mt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setPdfErrorMessage(null);
                    downloadHtml();
                  }}
                  className="px-2.5 py-1 rounded bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Download HTML
                </button>
                <button
                  type="button"
                  onClick={() => setPdfErrorMessage(null)}
                  className="px-2 py-1 text-xs text-amber-800 hover:text-amber-950 font-medium"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
