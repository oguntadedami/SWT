// components/plan/pdf/PlanPdfDocument.tsx
// Faithful "Print Edition" of the Front Page design on /plan.
// Built with @react-pdf/renderer primitives, vector graphics, and shared design tokens.

import React from 'react';
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Font,
  Svg,
  Path,
  Rect,
  Circle,
  Polygon,
  Line,
} from '@react-pdf/renderer';
import {
  PlanDocument,
  cleanPdfText,
} from '@/lib/planDocument';
import {
  PLAN_COLORS,
  PLAN_TYPE_SIZES,
  PDF_PAPER_BACKGROUND,
} from '@/lib/planTheme';

// Disable automatic hyphenation so words never break oddly
Font.registerHyphenationCallback((word) => [word]);

// Attempt to register custom fonts from public/fonts folder.
// If missing or in node/ssr without network, falls back to standard PDF fonts.
let fontsRegistered = false;
export function initPdfFonts() {
  if (fontsRegistered) return;
  try {
    const origin =
      typeof window !== 'undefined' && window.location?.origin
        ? window.location.origin
        : '';

    Font.register({
      family: 'HeadlineHeavy',
      src: `${origin}/fonts/headline-heavy.ttf`,
    });

    Font.register({
      family: 'NewsSerif',
      fonts: [
        {
          src: `${origin}/fonts/serif-regular.ttf`,
          fontWeight: 'normal',
          fontStyle: 'normal',
        },
        {
          src: `${origin}/fonts/serif-italic.ttf`,
          fontWeight: 'normal',
          fontStyle: 'italic',
        },
        {
          src: `${origin}/fonts/serif-bold.ttf`,
          fontWeight: 'bold',
          fontStyle: 'normal',
        },
      ],
    });

    fontsRegistered = true;
  } catch (e) {
    console.warn('Font registration fallback to system standard', e);
  }
}

// Call on module evaluation
initPdfFonts();

interface PlanPdfDocumentProps {
  doc: PlanDocument;
  accentColor?: string;
  useFallbackFonts?: boolean;
}

export default function PlanPdfDocument({
  doc,
  accentColor = PLAN_COLORS.accentOrange,
  useFallbackFonts = false,
}: PlanPdfDocumentProps) {
  // Use custom font family if available, else built-in PDF fonts
  const headlineFont = useFallbackFonts ? 'Helvetica-Bold' : 'HeadlineHeavy';
  const serifFont = useFallbackFonts ? 'Times-Roman' : 'NewsSerif';
  const serifItalicFont = useFallbackFonts ? 'Times-Italic' : 'NewsSerif';
  const serifBoldFont = useFallbackFonts ? 'Times-Bold' : 'NewsSerif';
  const monoFont = 'Courier';

  const isIdea1 = doc.ideaId === 'idea-1';
  const isIdea2 = doc.ideaId === 'idea-2';
  const isIdea3 = doc.ideaId === 'idea-3';

  // Format today's date
  let todayFormatted = 'October 9, 2026';
  try {
    todayFormatted = new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date());
  } catch {
    // ignore
  }

  // Lead words for Section 02 problem
  const problemWords = cleanPdfText(doc.problem).split(' ');
  const problemLead = problemWords.slice(0, 4).join(' ').toUpperCase();
  const problemRest = problemWords.slice(4).join(' ');

  const pageBg = PDF_PAPER_BACKGROUND
    ? PLAN_COLORS.paper
    : PLAN_COLORS.paperWhite;

  const styles = StyleSheet.create({
    page: {
      backgroundColor: pageBg,
      paddingTop: 40,
      paddingBottom: 48,
      paddingLeft: 40,
      paddingRight: 40,
      fontSize: PLAN_TYPE_SIZES.body,
      color: PLAN_COLORS.ink,
      fontFamily: serifFont,
      lineHeight: 1.45,
    },

    // Running Header (Pages > 1)
    runningHeaderContainer: {
      position: 'absolute',
      top: 18,
      left: 40,
      right: 40,
    },
    runningHeaderRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      paddingBottom: 4,
    },
    runningHeaderText: {
      fontSize: 7.5,
      fontFamily: headlineFont,
      textTransform: 'uppercase',
      color: PLAN_COLORS.muted,
      letterSpacing: 0.5,
    },
    runningHeaderEdition: {
      fontSize: 7,
      fontFamily: monoFont,
      color: PLAN_COLORS.muted,
    },
    runningHeaderRule: {
      height: 0.5,
      backgroundColor: PLAN_COLORS.hairline,
      width: '100%',
    },

    // Running Footer (All pages)
    runningFooter: {
      position: 'absolute',
      bottom: 20,
      left: 40,
      right: 40,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderTopWidth: 0.5,
      borderTopColor: PLAN_COLORS.hairline,
      paddingTop: 5,
    },
    footerPageNum: {
      fontSize: 7.5,
      fontFamily: monoFont,
      color: PLAN_COLORS.muted,
    },
    footerBrand: {
      fontSize: 7.5,
      fontFamily: headlineFont,
      textTransform: 'uppercase',
      color: PLAN_COLORS.muted,
      letterSpacing: 0.5,
    },

    // Masthead
    mastheadContainer: {
      marginBottom: 10,
    },
    mastheadTopRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingBottom: 6,
    },
    mastheadCenter: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: 8,
    },
    mastheadKicker: {
      fontSize: PLAN_TYPE_SIZES.mastheadKicker,
      fontFamily: monoFont,
      textTransform: 'uppercase',
      letterSpacing: 2,
      color: PLAN_COLORS.muted,
      marginBottom: 3,
    },
    mastheadTitle: {
      fontSize: PLAN_TYPE_SIZES.masthead,
      fontFamily: headlineFont,
      textTransform: 'uppercase',
      color: PLAN_COLORS.ink,
      letterSpacing: -0.5,
      textAlign: 'center',
    },
    doubleRule: {
      marginVertical: 4,
    },
    ruleThick: {
      height: 2,
      backgroundColor: PLAN_COLORS.ink,
      width: '100%',
    },
    ruleSpacer: {
      height: 1.5,
    },
    ruleThin: {
      height: 0.75,
      backgroundColor: PLAN_COLORS.ink,
      width: '100%',
    },
    datelineRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 3,
      paddingBottom: 2,
    },
    datelineLeft: {
      fontSize: PLAN_TYPE_SIZES.dateline,
      fontFamily: serifItalicFont,
      color: PLAN_COLORS.muted,
    },
    datelineRight: {
      fontSize: PLAN_TYPE_SIZES.dateline,
      fontFamily: headlineFont,
      textTransform: 'uppercase',
      color: PLAN_COLORS.ink,
      letterSpacing: 0.5,
    },

    // Section 01: Headline & Deck
    headlineSection: {
      marginTop: 8,
      marginBottom: 8,
    },
    kicker: {
      fontSize: PLAN_TYPE_SIZES.kicker,
      fontFamily: monoFont,
      textTransform: 'uppercase',
      letterSpacing: 1.5,
      marginBottom: 3,
    },
    productTitle: {
      fontSize: PLAN_TYPE_SIZES.productHeadline,
      fontFamily: headlineFont,
      textTransform: 'uppercase',
      color: PLAN_COLORS.ink,
      lineHeight: 0.95,
      marginBottom: 5,
    },
    productDeck: {
      fontSize: PLAN_TYPE_SIZES.deck,
      fontFamily: serifItalicFont,
      color: PLAN_COLORS.inkSecondary,
      lineHeight: 1.3,
    },

    // Stats Strip (4 Equal Columns)
    statsStrip: {
      borderTopWidth: 0.75,
      borderTopColor: PLAN_COLORS.hairline,
      borderBottomWidth: 0.75,
      borderBottomColor: PLAN_COLORS.hairline,
      paddingVertical: 5,
      marginVertical: 8,
      flexDirection: 'row',
    },
    statsCol: {
      flex: 1,
      paddingHorizontal: 6,
      borderRightWidth: 0.5,
      borderRightColor: PLAN_COLORS.hairline,
    },
    statsColLast: {
      borderRightWidth: 0,
    },
    statsLabel: {
      fontSize: PLAN_TYPE_SIZES.statsLabel,
      fontFamily: monoFont,
      textTransform: 'uppercase',
      color: PLAN_COLORS.muted,
      marginBottom: 1,
    },
    statsValue: {
      fontSize: PLAN_TYPE_SIZES.statsValue,
      fontFamily: headlineFont,
      color: PLAN_COLORS.ink,
    },

    // Two-Column Body Layout (66% and 34%)
    bodyTwoColumns: {
      flexDirection: 'row',
      marginVertical: 6,
    },
    bodyMainCol: {
      width: '66%',
      paddingRight: 12,
    },
    bodySidebarCol: {
      width: '34%',
      paddingLeft: 12,
      borderLeftWidth: 0.5,
      borderLeftColor: PLAN_COLORS.hairline,
    },

    // Section 02 The Problem
    problemText: {
      fontSize: PLAN_TYPE_SIZES.body,
      fontFamily: serifFont,
      lineHeight: 1.45,
      color: PLAN_COLORS.ink,
      marginBottom: 8,
    },
    problemLead: {
      fontFamily: headlineFont,
      letterSpacing: 0.5,
      color: PLAN_COLORS.ink,
    },

    // Section 04 MVP Ruled Band
    mvpBand: {
      marginTop: 6,
      marginBottom: 4,
    },
    mvpThickRule: {
      height: 2,
      backgroundColor: PLAN_COLORS.ink,
      width: '100%',
      marginBottom: 5,
    },
    mvpThinRule: {
      height: 0.5,
      backgroundColor: PLAN_COLORS.hairline,
      width: '100%',
      marginTop: 6,
    },
    mvpSubheading: {
      fontSize: PLAN_TYPE_SIZES.sectionSubheading,
      fontFamily: serifItalicFont,
      color: PLAN_COLORS.muted,
      marginBottom: 3,
    },
    mvpSummaryText: {
      fontSize: 10.5,
      fontFamily: serifFont,
      lineHeight: 1.35,
      color: PLAN_COLORS.ink,
    },
    adjustmentNoteText: {
      fontSize: 8,
      fontFamily: serifItalicFont,
      color: PLAN_COLORS.muted,
      marginTop: 4,
      paddingTop: 3,
      borderTopWidth: 0.5,
      borderTopColor: PLAN_COLORS.hairlineLight,
    },

    // Section 03 Sidebar Who it's for
    sidebarTitle: {
      fontSize: PLAN_TYPE_SIZES.sectionHeading,
      fontFamily: headlineFont,
      textTransform: 'uppercase',
      color: PLAN_COLORS.ink,
      marginBottom: 3,
    },
    targetUserText: {
      fontSize: PLAN_TYPE_SIZES.bodySmall,
      fontFamily: serifFont,
      color: PLAN_COLORS.inkSecondary,
      lineHeight: 1.35,
      marginBottom: 6,
    },
    illustrationBox: {
      height: 44,
      backgroundColor: 'rgba(0,0,0,0.03)',
      borderWidth: 0.5,
      borderColor: PLAN_COLORS.hairline,
      borderRadius: 4,
      marginVertical: 4,
      justifyContent: 'center',
      alignItems: 'center',
    },
    pullQuoteContainer: {
      marginTop: 6,
      paddingTop: 4,
      borderTopWidth: 0.5,
      borderTopColor: PLAN_COLORS.hairline,
    },
    pullQuoteText: {
      fontSize: 9.5,
      fontFamily: serifItalicFont,
      color: PLAN_COLORS.ink,
      lineHeight: 1.35,
    },
    pullQuoteMarks: {
      fontFamily: serifBoldFont,
      fontSize: 13,
      color: accentColor,
    },
    pullQuoteCaption: {
      fontSize: 6.5,
      fontFamily: monoFont,
      textTransform: 'uppercase',
      color: PLAN_COLORS.muted,
      marginTop: 3,
    },

    // Section 05 & 06 The Ledger
    ledgerContainer: {
      marginVertical: 8,
    },
    ledgerHeader: {
      borderBottomWidth: 0.5,
      borderBottomColor: PLAN_COLORS.hairline,
      paddingBottom: 2,
      marginBottom: 6,
    },
    ledgerCols: {
      flexDirection: 'row',
    },
    ledgerColLeft: {
      flex: 1,
      paddingRight: 10,
    },
    ledgerColRight: {
      flex: 1,
      paddingLeft: 10,
      borderLeftWidth: 0.5,
      borderLeftColor: PLAN_COLORS.hairline,
    },
    ledgerSectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      borderBottomWidth: 1,
      borderBottomColor: PLAN_COLORS.ink,
      paddingBottom: 2,
      marginBottom: 5,
    },
    ledgerSectionHeaderMuted: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      borderBottomWidth: 1,
      borderBottomColor: PLAN_COLORS.muted,
      paddingBottom: 2,
      marginBottom: 5,
    },
    subTitleItalic: {
      fontSize: 7.5,
      fontFamily: serifItalicFont,
      color: PLAN_COLORS.muted,
    },
    ledgerItemRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 5,
    },
    ledgerCheckCol: {
      width: 12,
      paddingTop: 1,
    },
    ledgerItemBody: {
      flex: 1,
    },
    ledgerItemName: {
      fontSize: 8.5,
      fontFamily: headlineFont,
      color: PLAN_COLORS.ink,
    },
    ledgerItemReason: {
      fontSize: 7.5,
      fontFamily: serifFont,
      color: PLAN_COLORS.muted,
      lineHeight: 1.3,
    },
    ledgerItemNameMuted: {
      fontSize: 8.5,
      fontFamily: headlineFont,
      color: PLAN_COLORS.muted,
    },
    ledgerDash: {
      fontSize: 8,
      fontFamily: monoFont,
      color: PLAN_COLORS.muted,
      width: 10,
    },

    // Section 07 Tool Stack Table
    toolTableSection: {
      marginVertical: 8,
    },
    tableHeaderRow: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: PLAN_COLORS.ink,
      paddingBottom: 3,
      marginBottom: 3,
    },
    tableHeaderCell: {
      fontSize: 7,
      fontFamily: monoFont,
      textTransform: 'uppercase',
      color: PLAN_COLORS.muted,
    },
    tableRow: {
      flexDirection: 'row',
      borderBottomWidth: 0.5,
      borderBottomColor: PLAN_COLORS.hairlineLight,
      paddingVertical: 3.5,
    },
    colTool: { width: '28%', paddingRight: 6 },
    colDoes: { width: '32%', paddingRight: 6 },
    colFree: { width: '14%', paddingRight: 4 },
    colWatch: { width: '26%' },
    toolName: {
      fontSize: 8.5,
      fontFamily: headlineFont,
      color: PLAN_COLORS.ink,
    },
    toolWhy: {
      fontSize: 7,
      fontFamily: serifItalicFont,
      color: PLAN_COLORS.muted,
    },
    cellText: {
      fontSize: 7.5,
      fontFamily: serifFont,
      color: PLAN_COLORS.inkSecondary,
      lineHeight: 1.3,
    },
    cellTextBold: {
      fontSize: 7.5,
      fontFamily: headlineFont,
      color: PLAN_COLORS.ink,
    },

    // Section 08 Schedule
    scheduleSection: {
      marginVertical: 8,
    },
    scheduleGrid: {
      flexDirection: 'row',
      marginTop: 4,
    },
    scheduleCol: {
      flex: 1,
      paddingRight: 8,
      borderRightWidth: 0.5,
      borderRightColor: PLAN_COLORS.hairline,
      paddingLeft: 6,
    },
    scheduleColFirst: {
      paddingLeft: 0,
    },
    scheduleColLast: {
      borderRightWidth: 0,
      paddingRight: 0,
    },
    stageHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 2,
    },
    stageNumeral: {
      fontSize: 18,
      fontFamily: headlineFont,
      color: accentColor,
      lineHeight: 1,
    },
    stageTag: {
      fontSize: 6,
      fontFamily: monoFont,
      textTransform: 'uppercase',
      borderWidth: 0.5,
      borderColor: accentColor,
      color: accentColor,
      paddingHorizontal: 3,
      paddingVertical: 1,
      borderRadius: 2,
    },
    stageTitle: {
      fontSize: 8.5,
      fontFamily: headlineFont,
      color: PLAN_COLORS.ink,
      marginBottom: 1,
    },
    stageDuration: {
      fontSize: 6.5,
      fontFamily: monoFont,
      color: PLAN_COLORS.muted,
      marginBottom: 3,
    },
    stageGoal: {
      fontSize: 7.5,
      fontFamily: serifItalicFont,
      color: PLAN_COLORS.inkSecondary,
      lineHeight: 1.3,
      marginBottom: 3,
    },
    stageTasksHeader: {
      fontSize: 6.5,
      fontFamily: monoFont,
      textTransform: 'uppercase',
      color: PLAN_COLORS.muted,
      marginTop: 2,
      marginBottom: 1,
    },
    taskItem: {
      fontSize: 7,
      fontFamily: serifFont,
      color: PLAN_COLORS.inkSecondary,
      lineHeight: 1.25,
      marginBottom: 1.5,
    },
    doneWhenBox: {
      backgroundColor: 'rgba(0,0,0,0.03)',
      borderWidth: 0.5,
      borderColor: PLAN_COLORS.hairline,
      borderRadius: 3,
      padding: 4,
      marginTop: 4,
    },
    doneWhenLabel: {
      fontSize: 6.5,
      fontFamily: headlineFont,
      color: PLAN_COLORS.ink,
      marginBottom: 1,
    },
    doneWhenText: {
      fontSize: 7,
      fontFamily: serifFont,
      color: PLAN_COLORS.inkSecondary,
      lineHeight: 1.25,
    },

    // Section 09 Dispatch
    dispatchSection: {
      marginVertical: 8,
    },
    dispatchLead: {
      fontSize: 8,
      fontFamily: serifItalicFont,
      color: PLAN_COLORS.muted,
      marginBottom: 4,
    },
    dispatchBlock: {
      backgroundColor: PLAN_COLORS.dispatchBg,
      padding: 10,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: PLAN_COLORS.ink,
    },
    dispatchHeaderRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomWidth: 0.5,
      borderBottomColor: '#374151',
      paddingBottom: 3,
      marginBottom: 6,
    },
    dispatchHeaderLabel: {
      fontSize: 6.5,
      fontFamily: monoFont,
      textTransform: 'uppercase',
      color: '#9CA3AF',
    },
    dispatchPromptText: {
      fontFamily: monoFont,
      fontSize: 7,
      color: PLAN_COLORS.dispatchText,
      lineHeight: 1.35,
    },

    // Fine Print Footer
    finePrintSection: {
      marginTop: 10,
      paddingTop: 6,
      borderTopWidth: 2,
      borderTopColor: PLAN_COLORS.ink,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
    },
    finePrintText: {
      fontSize: 7.5,
      fontFamily: serifItalicFont,
      color: PLAN_COLORS.muted,
      maxWidth: '75%',
    },
    finePrintBrand: {
      fontSize: 7,
      fontFamily: headlineFont,
      textTransform: 'uppercase',
      color: PLAN_COLORS.ink,
      letterSpacing: 0.5,
    },
  });

  return (
    <Document
      title={`${cleanPdfText(doc.title)} — Build Plan Print Edition`}
      author="Start With This"
      subject="Complete Build Plan"
      keywords="startup, mvp, build plan, print edition"
    >
      <Page size="A4" style={styles.page}>
        {/* ============================================================== */}
        {/* RUNNING HEADER (Appears on Pages 2+)                           */}
        {/* ============================================================== */}
        <View fixed style={styles.runningHeaderContainer}>
          <View style={styles.runningHeaderRow}>
            <Text
              style={styles.runningHeaderText}
              render={({ pageNumber }) =>
                pageNumber > 1
                  ? `Start With This  *  ${cleanPdfText(doc.title)}`
                  : ''
              }
            />
            <Text
              style={styles.runningHeaderEdition}
              render={({ pageNumber }) =>
                pageNumber > 1 ? 'Print Edition' : ''
              }
            />
          </View>
          <View
            render={({ pageNumber }) =>
              pageNumber > 1 ? <View style={styles.runningHeaderRule} /> : null
            }
          />
        </View>

        {/* ============================================================== */}
        {/* RUNNING FOOTER (Appears on all pages)                          */}
        {/* ============================================================== */}
        <View fixed style={styles.runningFooter}>
          <Text
            style={styles.footerPageNum}
            render={({ pageNumber, totalPages }) =>
              `Page ${pageNumber} of ${totalPages}`
            }
          />
          <Text style={styles.footerBrand}>Made with Start With This</Text>
        </View>

        {/* ============================================================== */}
        {/* 1. MASTHEAD                                                    */}
        {/* ============================================================== */}
        <View style={styles.mastheadContainer}>
          <View style={styles.mastheadTopRow}>
            {/* Left Shape: Circle (Red if idea-1, else ink) */}
            <Svg width="22" height="22" viewBox="0 0 22 22">
              <Circle
                cx="11"
                cy="11"
                r="9"
                fill={isIdea1 ? accentColor : PLAN_COLORS.ink}
              />
            </Svg>

            {/* Center Masthead Display Title */}
            <View style={styles.mastheadCenter}>
              <Text style={styles.mastheadKicker}>
                The Builder&apos;s Gazette  *  Vol. I
              </Text>
              <Text style={styles.mastheadTitle}>START WITH THIS</Text>
            </View>

            {/* Right Shapes: Pill & Triangle */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {/* Blue Pill */}
              <Svg width="14" height="22" viewBox="0 0 14 22">
                <Rect
                  x="2"
                  y="2"
                  width="10"
                  height="18"
                  rx="5"
                  fill={isIdea2 ? accentColor : PLAN_COLORS.ink}
                />
              </Svg>
              <View style={{ width: 4 }} />
              {/* Green Triangle */}
              <Svg width="18" height="18" viewBox="0 0 18 18">
                <Polygon
                  points="3,2 16,9 3,16"
                  fill={isIdea3 ? accentColor : PLAN_COLORS.ink}
                />
              </Svg>
            </View>
          </View>

          {/* Double Rule */}
          <View style={styles.doubleRule}>
            <View style={styles.ruleThick} />
            <View style={styles.ruleSpacer} />
            <View style={styles.ruleThin} />
          </View>

          {/* Dateline Row */}
          <View style={styles.datelineRow}>
            <Text style={styles.datelineLeft}>
              Printed {todayFormatted}
            </Text>
            <Text style={styles.datelineRight}>
              Edition for {cleanPdfText(doc.title)}
            </Text>
          </View>
        </View>

        {/* ============================================================== */}
        {/* 2. SECTION 01: THE PRODUCT                                     */}
        {/* ============================================================== */}
        <View style={styles.headlineSection}>
          <Text style={[styles.kicker, { color: accentColor }]}>
            01 * The product
          </Text>
          <Text style={styles.productTitle}>{cleanPdfText(doc.title)}</Text>
          <Text style={styles.productDeck}>
            {cleanPdfText(doc.definition)}
          </Text>
        </View>

        {/* ============================================================== */}
        {/* 3. STATS STRIP (4 EQUAL COLUMNS)                               */}
        {/* ============================================================== */}
        <View style={styles.statsStrip}>
          <View style={styles.statsCol}>
            <Text style={styles.statsLabel}>Build time</Text>
            <Text style={styles.statsValue}>
              {cleanPdfText(doc.atAGlance.buildTime)}
            </Text>
          </View>
          <View style={styles.statsCol}>
            <Text style={styles.statsLabel}>Difficulty</Text>
            <Text style={styles.statsValue}>
              {cleanPdfText(doc.atAGlance.difficulty)}
            </Text>
          </View>
          <View style={styles.statsCol}>
            <Text style={styles.statsLabel}>Tools</Text>
            <Text style={styles.statsValue}>{doc.atAGlance.toolsCount} tools</Text>
          </View>
          <View style={[styles.statsCol, styles.statsColLast]}>
            <Text style={styles.statsLabel}>Stages</Text>
            <Text style={styles.statsValue}>{doc.atAGlance.stagesCount} stages</Text>
          </View>
        </View>

        {/* ============================================================== */}
        {/* 4. TWO-COLUMN BODY LAYOUT (66% / 34%)                          */}
        {/* ============================================================== */}
        <View style={styles.bodyTwoColumns} wrap={false}>
          {/* Main Column (66%): 02 Problem & 04 MVP */}
          <View style={styles.bodyMainCol}>
            {/* 02 · The Problem */}
            <Text style={[styles.kicker, { color: accentColor }]}>
              02 * The problem
            </Text>
            <Text style={styles.problemText}>
              <Text style={styles.problemLead}>{problemLead} </Text>
              {problemRest}
            </Text>

            {/* 04 · The MVP */}
            <View style={styles.mvpBand}>
              <View style={styles.mvpThickRule} />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 2,
                }}
              >
                <Text style={[styles.kicker, { color: accentColor }]}>
                  04 * The MVP
                </Text>
                <Text style={styles.mvpSubheading}>
                  The smallest version worth building
                </Text>
              </View>
              <Text style={styles.mvpSummaryText}>
                {cleanPdfText(doc.mvpSummary)}
              </Text>
              {doc.adjustmentNote ? (
                <Text style={styles.adjustmentNoteText}>
                  A note on this plan: {cleanPdfText(doc.adjustmentNote)}
                </Text>
              ) : null}
              <View style={styles.mvpThinRule} />
            </View>
          </View>

          {/* Sidebar Column (34%): 03 Who it's for, Shape Illustration, Pull Quote */}
          <View style={styles.bodySidebarCol}>
            <Text style={[styles.kicker, { color: accentColor }]}>
              03 * Who it&apos;s for
            </Text>
            <Text style={styles.sidebarTitle}>The Target User</Text>
            <Text style={styles.targetUserText}>
              {cleanPdfText(doc.targetUser)}
            </Text>

            {/* Large Brand Shape Illustration */}
            <View style={styles.illustrationBox}>
              {isIdea1 && (
                <Svg width="80" height="38" viewBox="0 0 80 38">
                  <Circle cx="40" cy="19" r="17" fill={accentColor} />
                </Svg>
              )}
              {isIdea2 && (
                <Svg width="80" height="38" viewBox="0 0 80 38">
                  <Rect
                    x="28"
                    y="3"
                    width="24"
                    height="32"
                    rx="12"
                    fill={accentColor}
                  />
                </Svg>
              )}
              {isIdea3 && (
                <Svg width="80" height="38" viewBox="0 0 80 38">
                  <Polygon points="24,4 58,19 24,34" fill={accentColor} />
                </Svg>
              )}
            </View>

            {/* Pull Quote (if whyFitsYou present) */}
            {doc.whyFitsYou ? (
              <View style={styles.pullQuoteContainer}>
                <Text style={styles.pullQuoteText}>
                  <Text style={styles.pullQuoteMarks}>“</Text>
                  {cleanPdfText(doc.whyFitsYou)}
                  <Text style={styles.pullQuoteMarks}>”</Text>
                </Text>
                <Text style={styles.pullQuoteCaption}>On why this fits you</Text>
              </View>
            ) : null}
          </View>
        </View>

        {/* ============================================================== */}
        {/* 5. THE LEDGER: 05 WHAT TO BUILD & 06 WHAT NOT TO BUILD YET     */}
        {/* ============================================================== */}
        <View style={styles.ledgerContainer} wrap={false}>
          <View style={styles.ledgerHeader}>
            <Text
              style={{
                fontSize: 7,
                fontFamily: monoFont,
                textTransform: 'uppercase',
                letterSpacing: 1,
                color: PLAN_COLORS.muted,
              }}
            >
              The Ledger  *  Scope of Editions
            </Text>
          </View>

          <View style={styles.ledgerCols}>
            {/* Left Column: 05 What to build (first edition) */}
            <View style={styles.ledgerColLeft}>
              <View style={styles.ledgerSectionHeader}>
                <Text style={[styles.kicker, { color: accentColor }]}>
                  05 * What to build
                </Text>
                <Text style={styles.subTitleItalic}>In the first edition</Text>
              </View>

              {doc.buildNow.map((item, idx) => (
                <View
                  key={`build-now-${idx}`}
                  style={styles.ledgerItemRow}
                  wrap={false}
                >
                  <View style={styles.ledgerCheckCol}>
                    <Svg width="8" height="8" viewBox="0 0 10 10">
                      <Path
                        d="M1 5l3 3 5-6"
                        stroke={accentColor}
                        strokeWidth="1.8"
                        fill="none"
                      />
                    </Svg>
                  </View>
                  <View style={styles.ledgerItemBody}>
                    <Text style={styles.ledgerItemName}>
                      {cleanPdfText(item.name)}
                    </Text>
                    <Text style={styles.ledgerItemReason}>
                      {cleanPdfText(item.reason)}
                    </Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Right Column: 06 What not to build yet (held for later edition) */}
            <View style={styles.ledgerColRight}>
              <View style={styles.ledgerSectionHeaderMuted}>
                <Text
                  style={[
                    styles.kicker,
                    { color: accentColor, opacity: 0.8 },
                  ]}
                >
                  06 * What not to build yet
                </Text>
                <Text style={styles.subTitleItalic}>
                  Held for a later edition
                </Text>
              </View>

              {doc.doNotBuildYet.map((item, idx) => (
                <View
                  key={`not-yet-${idx}`}
                  style={styles.ledgerItemRow}
                  wrap={false}
                >
                  <Text style={styles.ledgerDash}>-</Text>
                  <View style={styles.ledgerItemBody}>
                    <Text style={styles.ledgerItemNameMuted}>
                      {cleanPdfText(item.name)}
                    </Text>
                    <Text style={styles.ledgerItemReason}>
                      {cleanPdfText(item.reason)}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* ============================================================== */}
        {/* 6. SECTION 07: THE TOOL STACK TABLE                            */}
        {/* ============================================================== */}
        <View style={styles.toolTableSection} wrap={false}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              borderBottomWidth: 1,
              borderBottomColor: PLAN_COLORS.ink,
              paddingBottom: 2,
              marginBottom: 4,
            }}
          >
            <Text style={[styles.kicker, { color: accentColor }]}>
              07 * The tool stack
            </Text>
            <Text style={styles.subTitleItalic}>
              Tools selected for immediate utility
            </Text>
          </View>

          {/* Table Header */}
          <View style={styles.tableHeaderRow}>
            <Text style={[styles.tableHeaderCell, styles.colTool]}>Tool</Text>
            <Text style={[styles.tableHeaderCell, styles.colDoes]}>
              What it does
            </Text>
            <Text style={[styles.tableHeaderCell, styles.colFree]}>
              Free option
            </Text>
            <Text style={[styles.tableHeaderCell, styles.colWatch]}>
              Watch out for
            </Text>
          </View>

          {/* Table Rows */}
          {doc.toolStack.map((tool, idx) => (
            <View key={`tool-row-${idx}`} style={styles.tableRow} wrap={false}>
              <View style={styles.colTool}>
                <Text style={styles.toolName}>{cleanPdfText(tool.name)}</Text>
                <Text style={styles.toolWhy}>{cleanPdfText(tool.whyHere)}</Text>
              </View>
              <View style={styles.colDoes}>
                <Text style={styles.cellText}>
                  {cleanPdfText(tool.whatItDoes)}
                </Text>
              </View>
              <View style={styles.colFree}>
                <Text style={styles.cellTextBold}>
                  {cleanPdfText(tool.freeOption)}
                </Text>
              </View>
              <View style={styles.colWatch}>
                <Text style={styles.cellText}>
                  {cleanPdfText(tool.limitation)}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* ============================================================== */}
        {/* 7. SECTION 08: THE BUILD ROADMAP (THE SCHEDULE)                */}
        {/* ============================================================== */}
        <View style={styles.scheduleSection} wrap={false}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              borderBottomWidth: 1,
              borderBottomColor: PLAN_COLORS.ink,
              paddingBottom: 2,
              marginBottom: 4,
            }}
          >
            <Text style={[styles.kicker, { color: accentColor }]}>
              08 * The build roadmap
            </Text>
            <Text style={styles.subTitleItalic}>The schedule</Text>
          </View>

          {/* Side-by-side Columns (Up to 3 per row) */}
          <View style={styles.scheduleGrid}>
            {doc.roadmap.slice(0, 3).map((stage, idx) => {
              const isFirst = idx === 0;
              const isLast = idx === doc.roadmap.length - 1;

              return (
                <View
                  key={`stage-${idx}`}
                  style={[
                    styles.scheduleCol,
                    isFirst ? styles.scheduleColFirst : {},
                    isLast ? styles.scheduleColLast : {},
                  ]}
                  wrap={false}
                >
                  <View style={styles.stageHeader}>
                    <Text style={styles.stageNumeral}>0{idx + 1}</Text>
                    {isFirst && <Text style={styles.stageTag}>Start today</Text>}
                  </View>

                  <Text style={styles.stageTitle}>
                    {cleanPdfText(stage.title)}
                  </Text>
                  <Text style={styles.stageDuration}>
                    {cleanPdfText(stage.duration)}
                  </Text>

                  <Text style={styles.stageGoal}>
                    Goal: {cleanPdfText(stage.goal)}
                  </Text>

                  <Text style={styles.stageTasksHeader}>Action steps:</Text>
                  {stage.tasks.map((task, taskIdx) => (
                    <Text key={`task-${taskIdx}`} style={styles.taskItem}>
                      * {cleanPdfText(task)}
                    </Text>
                  ))}

                  <View style={styles.doneWhenBox}>
                    <Text style={styles.doneWhenLabel}>Done when:</Text>
                    <Text style={styles.doneWhenText}>
                      {cleanPdfText(stage.doneWhen)}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* ============================================================== */}
        {/* 8. SECTION 09: THE AI STARTER PROMPT (THE DISPATCH)            */}
        {/* ============================================================== */}
        <View style={styles.dispatchSection}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              borderBottomWidth: 1,
              borderBottomColor: PLAN_COLORS.ink,
              paddingBottom: 2,
              marginBottom: 3,
            }}
          >
            <Text style={[styles.kicker, { color: accentColor }]}>
              09 * The AI starter prompt
            </Text>
            <Text style={styles.subTitleItalic}>The dispatch</Text>
          </View>

          <Text style={styles.dispatchLead}>
            Paste this into your favorite AI tool to begin.
          </Text>

          {/* Dark ink block with cream Courier text */}
          <View style={styles.dispatchBlock}>
            <View style={styles.dispatchHeaderRow}>
              <Text style={styles.dispatchHeaderLabel}>
                Prompt specification  *  v1.0
              </Text>
              <Text style={styles.dispatchHeaderLabel}>Ready to paste</Text>
            </View>

            <Text style={styles.dispatchPromptText}>
              {cleanPdfText(doc.starterPrompt)}
            </Text>
          </View>
        </View>

        {/* ============================================================== */}
        {/* 9. FINE PRINT DISCLAIMER                                       */}
        {/* ============================================================== */}
        <View style={styles.finePrintSection} wrap={false}>
          <Text style={styles.finePrintText}>
            {cleanPdfText(doc.disclaimer)}
          </Text>
          <Text style={styles.finePrintBrand}>Start With This</Text>
        </View>
      </Page>
    </Document>
  );
}
