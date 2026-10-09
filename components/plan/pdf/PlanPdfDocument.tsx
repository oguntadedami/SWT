// components/plan/pdf/PlanPdfDocument.tsx
// PDF representation mirroring the redesigned Build Plan at /plan:
// - A4 page, 40pt margins, page background #FAFAF7
// - Vector-only layout (no images, no external network requests)
// - Sky band with gradient, sun glow, and layered hills
// - Three chapters (THE IDEA, THE SCOPE, THE START) with sky bands and bright white panels
// - Inter font registration with automatic fallback to built-in Helvetica / Helvetica-Bold
// - Courier font used only inside the AI prompt block
// - Running header on pages > 1 and running footer on all pages
// - Metadata: title "<product name>: Build Plan", subject "Build Plan"

import React from 'react';
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Font,
  Svg,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  Rect,
  Circle,
  Ellipse,
  Path,
} from '@react-pdf/renderer';
import { PlanDocument, cleanPdfText } from '@/lib/planDocument';
import { PLAN_COLORS } from '@/lib/planTheme';

// Disable automatic hyphenation across all PDF text
Font.registerHyphenationCallback((word) => [word]);

// Attempt to register Inter font files from public/fonts
let fontsInitialized = false;
export function initPdfFonts() {
  if (fontsInitialized) return;
  try {
    const origin =
      typeof window !== 'undefined' && window.location?.origin
        ? window.location.origin
        : '';

    Font.register({
      family: 'Inter',
      fonts: [
        { src: `${origin}/fonts/Inter-Regular.ttf`, fontWeight: 'normal' },
        { src: `${origin}/fonts/Inter-Medium.ttf`, fontWeight: 500 },
        { src: `${origin}/fonts/Inter-Bold.ttf`, fontWeight: 'bold' },
        { src: `${origin}/fonts/Inter-Black.ttf`, fontWeight: 900 },
      ],
    });
    fontsInitialized = true;
  } catch (err) {
    console.warn('Inter font registration failed, fallback to Helvetica', err);
  }
}

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
  const fontRegular = useFallbackFonts ? 'Helvetica' : 'Inter';
  const fontBold = useFallbackFonts ? 'Helvetica-Bold' : 'Inter';
  const fontMono = 'Courier';

  const isIdea1 = doc.ideaId === 'idea-1';
  const isIdea2 = doc.ideaId === 'idea-2';
  const isIdea3 = doc.ideaId === 'idea-3';

  const cleanTitle = cleanPdfText(doc.title);
  const cleanDef = cleanPdfText(doc.definition);
  const cleanProblem = cleanPdfText(doc.problem);
  const cleanTarget = cleanPdfText(doc.targetUser);
  const cleanMvp = cleanPdfText(doc.mvpSummary);
  const cleanAdjustment = doc.adjustmentNote ? cleanPdfText(doc.adjustmentNote) : null;
  const cleanWhyFits = doc.whyFitsYou ? cleanPdfText(doc.whyFitsYou) : null;
  const cleanPrompt = cleanPdfText(doc.starterPrompt);

  const styles = StyleSheet.create({
    page: {
      backgroundColor: '#FAFAF7',
      paddingTop: 40,
      paddingBottom: 40,
      paddingLeft: 40,
      paddingRight: 40,
      fontFamily: fontRegular,
      fontSize: 9.5,
      color: '#1F2937',
      lineHeight: 1.45,
    },

    // Running Header (pages > 1)
    runningHeader: {
      position: 'absolute',
      top: 18,
      left: 40,
      right: 40,
      fontSize: 8,
      color: '#6B7280',
      textAlign: 'center',
      fontFamily: fontRegular,
    },

    // Running Footer (every page)
    runningFooter: {
      position: 'absolute',
      bottom: 18,
      left: 40,
      right: 40,
      flexDirection: 'row',
      justifyContent: 'space-between',
      fontSize: 8,
      color: '#9CA3AF',
      fontFamily: fontRegular,
    },

    // Header Band Container (Page 1)
    headerBandContainer: {
      borderRadius: 16,
      overflow: 'hidden',
      height: 250,
      position: 'relative',
      marginBottom: 14,
    },
    headerBandContent: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      padding: 20,
      justifyContent: 'space-between',
      alignItems: 'center',
      textAlign: 'center',
    },
    headerShapeArea: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 52,
    },
    productTitle: {
      fontFamily: fontBold,
      fontWeight: useFallbackFonts ? 'normal' : 900,
      fontSize: 26,
      color: '#FFFFFF',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      textAlign: 'center',
      lineHeight: 1.15,
      maxWidth: 460,
    },
    productDefinition: {
      fontFamily: fontRegular,
      fontSize: 11,
      color: '#F0F9FF',
      textAlign: 'center',
      maxWidth: 440,
      lineHeight: 1.35,
    },

    // Sticker Tags Row
    stickersRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 8,
      marginBottom: 16,
    },
    stickerTag: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 4,
      paddingHorizontal: 8,
      borderRadius: 10,
    },
    stickerLabel: {
      fontSize: 8,
      color: '#FFFFFF',
      opacity: 0.9,
      marginRight: 3,
    },
    stickerValue: {
      fontSize: 8,
      fontFamily: fontBold,
      color: '#FFFFFF',
    },

    // Chapter Sky Band
    chapterBandContainer: {
      borderRadius: 12,
      overflow: 'hidden',
      height: 60,
      position: 'relative',
      marginTop: 14,
      marginBottom: 8,
    },
    chapterBandContent: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      paddingHorizontal: 16,
      justifyContent: 'center',
      alignItems: 'center',
    },
    chapterHeading: {
      fontFamily: fontBold,
      fontWeight: useFallbackFonts ? 'normal' : 900,
      fontSize: 17,
      color: '#FFFFFF',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },

    // White Panel Box
    panel: {
      backgroundColor: '#FFFFFF',
      borderRadius: 14,
      borderWidth: 1,
      borderColor: '#E5E7EB',
      padding: 16,
      marginBottom: 12,
    },

    // Number circle badge
    numberBadge: {
      width: 18,
      height: 18,
      borderRadius: 9,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 6,
    },
    numberBadgeText: {
      fontSize: 8,
      fontFamily: fontBold,
      color: '#FFFFFF',
    },

    // Chapter 1 Styles
    productSentence: {
      fontSize: 13,
      fontFamily: fontBold,
      color: '#111827',
      lineHeight: 1.3,
      marginBottom: 12,
    },
    twoCols: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 12,
    },
    col: {
      flex: 1,
    },
    sectionTitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
    },
    sectionTitle: {
      fontFamily: fontBold,
      fontSize: 10,
      color: '#111827',
    },
    sectionBody: {
      fontSize: 9,
      color: '#4B5563',
      lineHeight: 1.4,
    },

    // MVP Highlight Band
    mvpBand: {
      borderRadius: 10,
      padding: 10,
      marginBottom: 6,
      borderWidth: 1,
    },
    mvpSummaryText: {
      fontFamily: fontBold,
      fontSize: 10.5,
      color: '#111827',
      lineHeight: 1.35,
    },
    noteText: {
      fontSize: 8.5,
      color: '#6B7280',
      marginTop: 4,
    },
    whyFitsSticker: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 4,
      paddingHorizontal: 8,
      borderRadius: 8,
      borderWidth: 1,
      alignSelf: 'flex-start',
      marginTop: 8,
    },

    // Chapter 2 Styles
    scopeHeaderRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
      gap: 6,
    },
    scopePill: {
      paddingVertical: 2.5,
      paddingHorizontal: 6,
      borderRadius: 6,
    },
    scopePillText: {
      fontSize: 7.5,
      fontFamily: fontBold,
      color: '#FFFFFF',
    },
    scopeItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 8,
      gap: 5,
    },
    scopeItemBody: {
      flex: 1,
    },
    scopeItemName: {
      fontSize: 9,
      fontFamily: fontBold,
      color: '#111827',
    },
    scopeItemReason: {
      fontSize: 8.5,
      color: '#4B5563',
      marginTop: 1,
      lineHeight: 1.35,
    },

    // Chapter 3 Styles
    toolRow: {
      flexDirection: 'row',
      paddingVertical: 7,
      borderBottomWidth: 1,
      borderBottomColor: '#F3F4F6',
      alignItems: 'flex-start',
    },
    toolColLeft: {
      width: '32%',
      paddingRight: 6,
    },
    toolColMid: {
      width: '36%',
      paddingRight: 6,
    },
    toolColRight: {
      width: '32%',
    },

    // Roadmap Tiles
    roadmapRow: {
      flexDirection: 'row',
      gap: 8,
      marginTop: 6,
    },
    stageTile: {
      flex: 1,
      backgroundColor: '#F9FAFB',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#E5E7EB',
      padding: 8,
    },

    // Prompt Block
    promptBlock: {
      backgroundColor: '#0B1320',
      borderRadius: 10,
      padding: 10,
      marginTop: 6,
    },
    promptText: {
      fontFamily: fontMono,
      fontSize: 7.5,
      color: '#FEF3C7',
      lineHeight: 1.35,
    },

    // Footer Disclaimer
    disclaimer: {
      fontSize: 8,
      color: '#6B7280',
      textAlign: 'center',
      marginTop: 10,
    },
  });

  return (
    <Document
      title={`${cleanTitle}: Build Plan`}
      subject="Build Plan"
      author="Start With This"
    >
      <Page size="A4" style={styles.page}>
        {/* Running Header on pages > 1 */}
        <Text
          style={styles.runningHeader}
          render={({ pageNumber }) =>
            pageNumber > 1 ? `Start With This * ${cleanTitle}` : ''
          }
          fixed
        />

        {/* Running Footer on all pages */}
        <View style={styles.runningFooter} fixed>
          <Text
            render={({ pageNumber, totalPages }) =>
              `Page ${pageNumber} of ${totalPages}`
            }
          />
          <Text>Made with Start With This</Text>
        </View>

        {/* ============================================================ */}
        {/* PAGE 1: HEADER SKY BAND (250pt tall vector SVG)              */}
        {/* ============================================================ */}
        <View style={styles.headerBandContainer}>
          {/* Vector SVG Background with Sky Gradient, Sun, and Hills */}
          <Svg width="515" height="250" viewBox="0 0 515 250">
            <Defs>
              <LinearGradient id="hdrSkyGrad" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor="#0284C7" />
                <Stop offset="0.65" stopColor="#38BDF8" />
                <Stop offset="1" stopColor="#BAE6FD" />
              </LinearGradient>
              <RadialGradient id="hdrSunGlow" cx="50%" cy="50%" r="50%">
                <Stop offset="0" stopColor="#FEF08A" stopOpacity="0.8" />
                <Stop offset="0.5" stopColor="#FDE047" stopOpacity="0.4" />
                <Stop offset="1" stopColor="#38BDF8" stopOpacity="0" />
              </RadialGradient>
              <RadialGradient id="shpSphere" cx="35%" cy="30%" r="65%">
                <Stop offset="0" stopColor="#FFA07A" />
                <Stop offset="0.55" stopColor="#FF4F24" />
                <Stop offset="1" stopColor="#9C2405" />
              </RadialGradient>
              <LinearGradient id="shpPill" x1="0" y1="0" x2="1" y2="0">
                <Stop offset="0" stopColor="#2BB0E4" />
                <Stop offset="0.5" stopColor="#56C8F2" />
                <Stop offset="1" stopColor="#1E8AB5" />
              </LinearGradient>
              <LinearGradient id="shpWedge" x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0" stopColor="#96ECCF" />
                <Stop offset="0.5" stopColor="#65D9B3" />
                <Stop offset="1" stopColor="#1E8C67" />
              </LinearGradient>
            </Defs>

            {/* Sky Background Rect */}
            <Rect x="0" y="0" width="515" height="250" fill="url(#hdrSkyGrad)" />

            {/* Sun Glow */}
            <Circle cx="390" cy="70" r="55" fill="url(#hdrSunGlow)" />

            {/* Three Layered Hill Silhouettes */}
            {/* Hill 3 (Back) */}
            <Path
              d="M 0 205 Q 140 175 280 200 Q 400 220 515 195 L 515 250 L 0 250 Z"
              fill="#93C5FD"
              fillOpacity="0.55"
            />
            {/* Hill 2 (Middle) */}
            <Path
              d="M 0 218 Q 170 190 320 218 Q 430 232 515 212 L 515 250 L 0 250 Z"
              fill="#6EE7B7"
              fillOpacity="0.75"
            />
            {/* Hill 1 (Front) */}
            <Path
              d="M 0 230 Q 120 210 250 226 Q 380 240 515 226 L 515 250 L 0 250 Z"
              fill="#10B981"
              fillOpacity="0.9"
            />
          </Svg>

          {/* Overlaid Content: Brand Shape, Product Name, Definition */}
          <View style={styles.headerBandContent}>
            {/* Brand Shape Vector */}
            <View style={styles.headerShapeArea}>
              {isIdea1 && (
                <Svg width="48" height="48" viewBox="0 0 48 48">
                  <Ellipse cx="24" cy="44" rx="14" ry="3.5" fill="#000000" fillOpacity="0.25" />
                  <Circle cx="24" cy="22" r="18" fill="url(#shpSphere)" />
                  <Ellipse cx="19" cy="16" rx="6" ry="4" fill="#FFFFFF" fillOpacity="0.7" />
                  <Circle cx="17" cy="14" r="1.5" fill="#FFFFFF" fillOpacity="0.9" />
                </Svg>
              )}
              {isIdea2 && (
                <Svg width="44" height="48" viewBox="0 0 44 48">
                  <Ellipse cx="22" cy="44" rx="13" ry="3.5" fill="#000000" fillOpacity="0.25" />
                  <Rect x="12" y="4" width="20" height="36" rx="10" fill="url(#shpPill)" />
                  <Rect x="15" y="8" width="4" height="24" rx="2" fill="#FFFFFF" fillOpacity="0.65" />
                  <Ellipse cx="22" cy="9" rx="3.5" ry="1.8" fill="#FFFFFF" fillOpacity="0.85" />
                </Svg>
              )}
              {isIdea3 && (
                <Svg width="48" height="48" viewBox="0 0 48 48">
                  <Ellipse cx="24" cy="44" rx="15" ry="3.5" fill="#000000" fillOpacity="0.25" />
                  <Path
                    d="M 10 7 C 10 4 14 3 17 5 L 39 19 C 42 21 42 25 39 27 L 17 41 C 14 43 10 42 10 39 Z"
                    fill="url(#shpWedge)"
                  />
                  <Circle cx="17" cy="8" r="2.5" fill="#FFFFFF" fillOpacity="0.85" />
                </Svg>
              )}
            </View>

            {/* Product Name in Huge White Inter Black */}
            <Text style={styles.productTitle}>{cleanTitle}</Text>

            {/* Product Definition in White */}
            <Text style={styles.productDefinition}>{cleanDef}</Text>
          </View>
        </View>

        {/* ============================================================ */}
        {/* ROW OF FOUR STICKER TAGS                                     */}
        {/* ============================================================ */}
        <View style={styles.stickersRow}>
          {/* Build time (Red) */}
          <View style={[styles.stickerTag, { backgroundColor: '#FF4F24' }]}>
            <Text style={styles.stickerLabel}>Build time:</Text>
            <Text style={styles.stickerValue}>{cleanPdfText(doc.atAGlance.buildTime)}</Text>
          </View>

          {/* Difficulty (Blue) */}
          <View style={[styles.stickerTag, { backgroundColor: '#327AE6' }]}>
            <Text style={styles.stickerLabel}>Difficulty:</Text>
            <Text style={styles.stickerValue}>{cleanPdfText(doc.atAGlance.difficulty)}</Text>
          </View>

          {/* Tools count (Green) */}
          <View style={[styles.stickerTag, { backgroundColor: '#2EAA7B' }]}>
            <Text style={styles.stickerLabel}>Tools:</Text>
            <Text style={styles.stickerValue}>{doc.atAGlance.toolsCount} tools</Text>
          </View>

          {/* Stages count (Ink) */}
          <View style={[styles.stickerTag, { backgroundColor: '#1F2421' }]}>
            <Text style={styles.stickerLabel}>Stages:</Text>
            <Text style={styles.stickerValue}>{doc.atAGlance.stagesCount} stages</Text>
          </View>
        </View>

        {/* ============================================================ */}
        {/* CHAPTER 1: THE IDEA                                          */}
        {/* ============================================================ */}
        <View minPresenceAhead={70}>
          <View style={styles.chapterBandContainer} wrap={false}>
            <Svg width="515" height="60" viewBox="0 0 515 60">
              <Defs>
                <LinearGradient id="ch1Grad" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0" stopColor="#0284C7" />
                  <Stop offset="1" stopColor="#38BDF8" />
                </LinearGradient>
              </Defs>
              <Rect x="0" y="0" width="515" height="60" fill="url(#ch1Grad)" />
              <Path
                d="M 0 46 Q 160 36 300 48 Q 420 54 515 44 L 515 60 L 0 60 Z"
                fill="#10B981"
                fillOpacity="0.8"
              />
            </Svg>
            <View style={styles.chapterBandContent}>
              <Text style={styles.chapterHeading}>THE IDEA</Text>
            </View>
          </View>

          <View style={styles.panel}>
            {/* 01 The product: definition as large bold sentence */}
            <Text style={styles.productSentence}>{cleanDef}</Text>

            {/* 02 Problem & 03 Target user side-by-side */}
            <View style={styles.twoCols}>
              <View style={styles.col}>
                <View style={styles.sectionTitleRow}>
                  <View style={[styles.numberBadge, { backgroundColor: accentColor }]}>
                    <Text style={styles.numberBadgeText}>02</Text>
                  </View>
                  <Text style={styles.sectionTitle}>The problem</Text>
                </View>
                <Text style={styles.sectionBody}>{cleanProblem}</Text>
              </View>

              <View style={styles.col}>
                <View style={styles.sectionTitleRow}>
                  <View style={[styles.numberBadge, { backgroundColor: accentColor }]}>
                    <Text style={styles.numberBadgeText}>03</Text>
                  </View>
                  <Text style={styles.sectionTitle}>The target user</Text>
                </View>
                <Text style={styles.sectionBody}>{cleanTarget}</Text>
              </View>
            </View>

            {/* 04 The MVP highlighted band */}
            <View
              style={[
                styles.mvpBand,
                {
                  backgroundColor: `${accentColor}1A`,
                  borderColor: `${accentColor}33`,
                },
              ]}
            >
              <View style={styles.sectionTitleRow}>
                <View style={[styles.numberBadge, { backgroundColor: accentColor }]}>
                  <Text style={styles.numberBadgeText}>04</Text>
                </View>
                <Text style={styles.sectionTitle}>The MVP</Text>
              </View>
              <Text style={styles.mvpSummaryText}>{cleanMvp}</Text>
              {cleanAdjustment && (
                <Text style={styles.noteText}>
                  A note on this plan: {cleanAdjustment}
                </Text>
              )}
            </View>

            {/* Why it fits you sticker at bottom */}
            {cleanWhyFits && (
              <View
                style={[
                  styles.whyFitsSticker,
                  {
                    backgroundColor: `${accentColor}15`,
                    borderColor: `${accentColor}40`,
                  },
                ]}
              >
                <Text style={{ fontSize: 8, fontFamily: fontBold, color: accentColor, marginRight: 4 }}>
                  Why it fits you:
                </Text>
                <Text style={{ fontSize: 8, color: '#1F2937' }}>{cleanWhyFits}</Text>
              </View>
            )}
          </View>
        </View>

        {/* ============================================================ */}
        {/* CHAPTER 2: THE SCOPE                                         */}
        {/* ============================================================ */}
        <View minPresenceAhead={70}>
          <View style={styles.chapterBandContainer} wrap={false}>
            <Svg width="515" height="60" viewBox="0 0 515 60">
              <Defs>
                <LinearGradient id="ch2Grad" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0" stopColor="#0284C7" />
                  <Stop offset="1" stopColor="#38BDF8" />
                </LinearGradient>
              </Defs>
              <Rect x="0" y="0" width="515" height="60" fill="url(#ch2Grad)" />
              <Path
                d="M 0 46 Q 160 36 300 48 Q 420 54 515 44 L 515 60 L 0 60 Z"
                fill="#10B981"
                fillOpacity="0.8"
              />
            </Svg>
            <View style={styles.chapterBandContent}>
              <Text style={styles.chapterHeading}>THE SCOPE</Text>
            </View>
          </View>

          <View style={styles.panel}>
            <View style={styles.twoCols}>
              {/* Left Column: BUILD NOW */}
              <View style={styles.col}>
                <View style={styles.scopeHeaderRow}>
                  <View style={[styles.scopePill, { backgroundColor: '#2EAA7B' }]}>
                    <Text style={styles.scopePillText}>BUILD NOW</Text>
                  </View>
                  <Text style={styles.sectionTitle}>What to build</Text>
                </View>

                {doc.buildNow.map((item, idx) => (
                  <View key={idx} style={styles.scopeItem} wrap={false}>
                    <Svg width="12" height="12" viewBox="0 0 16 16">
                      <Path
                        d="M 3 8 L 6.5 11.5 L 13 4"
                        stroke={accentColor}
                        strokeWidth="2.5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Svg>
                    <View style={styles.scopeItemBody}>
                      <Text style={styles.scopeItemName}>{cleanPdfText(item.name)}</Text>
                      <Text style={styles.scopeItemReason}>{cleanPdfText(item.reason)}</Text>
                    </View>
                  </View>
                ))}
              </View>

              {/* Right Column: NOT YET (Visibly Quieter) */}
              <View style={[styles.col, { backgroundColor: '#F9FAFB', padding: 8, borderRadius: 8 }]}>
                <View style={styles.scopeHeaderRow}>
                  <View style={[styles.scopePill, { backgroundColor: '#E5E7EB' }]}>
                    <Text style={[styles.scopePillText, { color: '#4B5563' }]}>NOT YET</Text>
                  </View>
                  <Text style={[styles.sectionTitle, { color: '#4B5563' }]}>What not to build yet</Text>
                </View>

                {doc.doNotBuildYet.map((item, idx) => (
                  <View key={idx} style={styles.scopeItem} wrap={false}>
                    <Text style={{ fontSize: 10, color: '#9CA3AF', marginRight: 2 }}>-</Text>
                    <View style={styles.scopeItemBody}>
                      <Text style={[styles.scopeItemName, { color: '#4B5563' }]}>{cleanPdfText(item.name)}</Text>
                      <Text style={[styles.scopeItemReason, { color: '#6B7280' }]}>{cleanPdfText(item.reason)}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* ============================================================ */}
        {/* CHAPTER 3: THE START                                         */}
        {/* ============================================================ */}
        <View minPresenceAhead={70}>
          <View style={styles.chapterBandContainer} wrap={false}>
            <Svg width="515" height="60" viewBox="0 0 515 60">
              <Defs>
                <LinearGradient id="ch3Grad" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0" stopColor="#0284C7" />
                  <Stop offset="1" stopColor="#38BDF8" />
                </LinearGradient>
              </Defs>
              <Rect x="0" y="0" width="515" height="60" fill="url(#ch3Grad)" />
              <Path
                d="M 0 46 Q 160 36 300 48 Q 420 54 515 44 L 515 60 L 0 60 Z"
                fill="#10B981"
                fillOpacity="0.8"
              />
            </Svg>
            <View style={styles.chapterBandContent}>
              <Text style={styles.chapterHeading}>THE START</Text>
            </View>
          </View>

          <View style={styles.panel}>
            {/* 07 The Tool Stack */}
            <View style={styles.sectionTitleRow}>
              <View style={[styles.numberBadge, { backgroundColor: accentColor }]}>
                <Text style={styles.numberBadgeText}>07</Text>
              </View>
              <Text style={styles.sectionTitle}>The tool stack</Text>
            </View>

            <View style={{ marginTop: 6, marginBottom: 14 }}>
              {doc.toolStack.map((tool, idx) => {
                const isFree = tool.freeOption === 'Yes';
                const isPartly = tool.freeOption === 'Partly';
                const dotColor = isFree ? '#2EAA7B' : isPartly ? '#F59E0B' : '#9CA3AF';

                return (
                  <View key={idx} style={styles.toolRow} wrap={false}>
                    <View style={styles.toolColLeft}>
                      <Text style={{ fontSize: 9.5, fontFamily: fontBold, color: '#111827' }}>
                        {cleanPdfText(tool.name)}
                      </Text>
                      <Text style={{ fontSize: 8, color: '#6B7280', marginTop: 1 }}>
                        Why: {cleanPdfText(tool.whyHere)}
                      </Text>
                    </View>

                    <View style={styles.toolColMid}>
                      <Text style={{ fontSize: 8.5, color: '#374151' }}>
                        {cleanPdfText(tool.whatItDoes)}
                      </Text>
                    </View>

                    <View style={styles.toolColRight}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                        <Svg width="6" height="6" viewBox="0 0 6 6">
                          <Circle cx="3" cy="3" r="3" fill={dotColor} />
                        </Svg>
                        <Text style={{ fontSize: 8, fontFamily: fontBold, color: '#1F2937' }}>
                          Free: {tool.freeOption}
                        </Text>
                      </View>
                      {tool.limitation && (
                        <Text style={{ fontSize: 7.5, color: '#6B7280', marginTop: 1 }}>
                          Watch out: {cleanPdfText(tool.limitation)}
                        </Text>
                      )}
                    </View>
                  </View>
                );
              })}
            </View>

            {/* 08 The Build Roadmap */}
            <View style={[styles.sectionTitleRow, { marginTop: 8 }]}>
              <View style={[styles.numberBadge, { backgroundColor: accentColor }]}>
                <Text style={styles.numberBadgeText}>08</Text>
              </View>
              <Text style={styles.sectionTitle}>The build roadmap</Text>
            </View>

            <View style={styles.roadmapRow}>
              {doc.roadmap.map((stage, idx) => (
                <View key={idx} style={styles.stageTile} wrap={false}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
                    <Text style={{ fontSize: 13, fontFamily: fontBold, color: accentColor }}>
                      0{idx + 1}
                    </Text>
                    {idx === 0 && (
                      <View style={{ backgroundColor: '#2EAA7B', paddingVertical: 1.5, paddingHorizontal: 5, borderRadius: 4 }}>
                        <Text style={{ fontSize: 6.5, fontFamily: fontBold, color: '#FFFFFF' }}>Start today</Text>
                      </View>
                    )}
                  </View>

                  <Text style={{ fontSize: 9, fontFamily: fontBold, color: '#111827', marginBottom: 1 }}>
                    {cleanPdfText(stage.title)}
                  </Text>
                  <Text style={{ fontSize: 7.5, color: '#6B7280', marginBottom: 4 }}>
                    {cleanPdfText(stage.duration)}
                  </Text>

                  <Text style={{ fontSize: 8, color: '#374151', marginBottom: 4 }}>
                    Goal: {cleanPdfText(stage.goal)}
                  </Text>

                  <View style={{ marginBottom: 4 }}>
                    {stage.tasks.map((task, taskIdx) => (
                      <Text key={taskIdx} style={{ fontSize: 7.5, color: '#4B5563', marginBottom: 1.5 }}>
                        * {cleanPdfText(task)}
                      </Text>
                    ))}
                  </View>

                  <Text style={{ fontSize: 7.5, color: '#111827', borderTopWidth: 1, borderTopColor: '#E5E7EB', paddingTop: 3 }}>
                    Done when: {cleanPdfText(stage.doneWhen)}
                  </Text>
                </View>
              ))}
            </View>

            {/* 09 The AI Starter Prompt */}
            <View style={[styles.sectionTitleRow, { marginTop: 14 }]}>
              <View style={[styles.numberBadge, { backgroundColor: accentColor }]}>
                <Text style={styles.numberBadgeText}>09</Text>
              </View>
              <Text style={styles.sectionTitle}>The AI starter prompt</Text>
            </View>

            <Text style={{ fontSize: 8.5, color: '#4B5563', marginTop: 2 }}>
              Paste this into your favorite AI tool to begin.
            </Text>

            <View style={styles.promptBlock}>
              <Text style={styles.promptText}>
                {cleanPrompt}
              </Text>
            </View>

            {/* Disclaimer at end of document */}
            <Text style={styles.disclaimer}>
              This plan is a starting point. It doesn&apos;t guarantee your idea will succeed.
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
