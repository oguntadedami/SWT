// lib/planTheme.ts
// Shared module of design values for "Start With This" — Front Page & Print Edition:
// Imported by both the web page (/plan) and the PDF print edition.

export const PLAN_COLORS = {
  paper: '#F6F3EC',
  paperWhite: '#FFFFFF',
  ink: '#1F2421',
  inkSecondary: '#374151',
  muted: '#6B7280',
  mutedLight: '#9CA3AF',
  hairline: '#D6D3CD',
  hairlineLight: '#E7E4DC',
  darkRule: '#1F2421',
  dispatchBg: '#18181B',
  dispatchText: '#F6F3EC',
  accentOrange: '#FF4F24', // Default / Copy prompt orange
  // Per-idea accent colors matching the brand logo:
  accents: {
    'idea-1': '#FF4F24', // Coral Red (Idea 1 - Polite Nudge)
    'idea-2': '#327AE6', // Blue (Idea 2 - Brief Builder)
    'idea-3': '#2EAA7B', // Green (Idea 3 - Fair Price Check)
  } as Record<string, string>,
} as const;

export function getIdeaAccentColor(ideaId: string): string {
  return PLAN_COLORS.accents[ideaId] || PLAN_COLORS.accents['idea-1'];
}

// PDF paper background toggle: default true (#F6F3EC); when false, uses white (#FFFFFF)
export const PDF_PAPER_BACKGROUND = true;

// Shared typographic size scale (points in PDF, matching web display weights)
export const PLAN_TYPE_SIZES = {
  masthead: 26,
  mastheadKicker: 7,
  dateline: 8,
  productHeadline: 28,
  kicker: 8,
  deck: 13,
  sectionHeading: 14,
  sectionSubheading: 9,
  bodyLarge: 11,
  body: 9,
  bodySmall: 8,
  caption: 7,
  statsValue: 13,
  statsLabel: 6.5,
  mono: 7.5,
  tag: 6.5,
  pullQuote: 13,
} as const;
