// lib/planDocument.ts
// One source of truth for Build Plan documents (PDF, HTML, Markdown).
// All formats are derived from this single neutral data structure so they
// never drift from each other or from the on-screen presentation.
// All text is treated strictly as untrusted plain text.

import { BuildPlan, BuildPlanItem, ToolStackItem, RoadmapStage } from './plan';

export interface PlanAtAGlance {
  buildTime: string;
  difficulty: string;
  toolsCount: number;
  stagesCount: number;
}

export interface PlanDocument {
  id: string;
  ideaId: string;
  title: string;
  definition: string;
  atAGlance: PlanAtAGlance;
  problem: string;
  targetUser: string;
  whyFitsYou?: string;
  mvpSummary: string;
  adjustmentNote?: string;
  buildNow: BuildPlanItem[];
  doNotBuildYet: BuildPlanItem[];
  toolStack: ToolStackItem[];
  roadmap: RoadmapStage[];
  starterPrompt: string;
  disclaimer: string;
}

/**
 * Creates the neutral, canonical PlanDocument from a plan and optional idea metadata.
 */
export function createPlanDocument(
  plan: BuildPlan,
  ideaMeta?: {
    buildTime?: string;
    difficulty?: string;
    whyFitsYou?: string;
  }
): PlanDocument {
  return {
    id: plan.ideaId,
    ideaId: plan.ideaId,
    title: plan.productName,
    definition: plan.definition,
    atAGlance: {
      buildTime: ideaMeta?.buildTime || 'A weekend',
      difficulty: ideaMeta?.difficulty || 'Easy',
      toolsCount: plan.toolStack.length,
      stagesCount: plan.roadmap.length,
    },
    problem: plan.problem,
    targetUser: plan.targetUser,
    whyFitsYou: ideaMeta?.whyFitsYou,
    mvpSummary: plan.mvpSummary,
    adjustmentNote: plan.adjustmentNote,
    buildNow: plan.buildNow,
    doNotBuildYet: plan.doNotBuildYet,
    toolStack: plan.toolStack,
    roadmap: plan.roadmap,
    starterPrompt: plan.starterPrompt,
    disclaimer:
      "The fine print: This plan is a starting point. It doesn't guarantee your idea will succeed.",
  };
}

/**
 * Standardized filename: "start-with-this-<product name>.<extension>"
 * Lowercased, spaces replaced by hyphens, all non-alphanumeric/hyphen characters stripped.
 */
export function getPlanDownloadFileName(
  productName: string,
  extension: 'pdf' | 'html' | 'md'
): string {
  const sanitized = (productName || 'plan')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-');
  return `start-with-this-${sanitized}.${extension}`;
}

/**
 * Cleans string for PDF rendering:
 * Replaces characters that standard/custom fonts might not have glyphs for
 * (arrows, emoji, unusual unicode punctuation) with plain ASCII equivalents.
 */
export function cleanPdfText(input: string): string {
  if (!input) return '';
  return input
    .replace(/[→⇒➜]/g, '->')
    .replace(/[←⇐]/g, '<-')
    .replace(/[↑]/g, '^')
    .replace(/[↓]/g, 'v')
    .replace(/[•●▪]/g, '*')
    .replace(/[✔✓]/g, '+')
    .replace(/[✖✕]/g, 'x')
    .replace(/[—–]/g, '-')
    .replace(/[“”«»]/g, '"')
    .replace(/[‘’`]/g, "'")
    .replace(/[…]/g, '...')
    .replace(/[\u200B-\u200D\uFEFF]/g, '') // zero-width spaces
    .replace(/[^\x00-\x7F\u00A0-\u00FF]/g, ''); // strip emoji and unsupported non-Latin symbols
}

/**
 * HTML entity escaping for untrusted plain text.
 */
export function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Generates clean, self-contained HTML representation with print stylesheet.
 * Inline CSS only, no external network requests, no scripts, escaped plain text.
 */
export function generatePlanHtml(doc: PlanDocument, accentColor = '#FF4F24'): string {
  const title = escapeHtml(doc.title);
  const definition = escapeHtml(doc.definition);
  const problem = escapeHtml(doc.problem);
  const targetUser = escapeHtml(doc.targetUser);
  const mvpSummary = escapeHtml(doc.mvpSummary);
  const adjustmentNote = doc.adjustmentNote ? escapeHtml(doc.adjustmentNote) : '';
  const whyFitsYou = doc.whyFitsYou ? escapeHtml(doc.whyFitsYou) : '';
  const starterPrompt = escapeHtml(doc.starterPrompt);
  const disclaimer = escapeHtml(doc.disclaimer);

  const buildNowHtml = doc.buildNow
    .map(
      (item) => `
      <li style="margin-bottom: 12px; display: flex; align-items: flex-start; gap: 8px;">
        <span style="color: ${accentColor}; font-weight: bold; line-height: 1.4;">+</span>
        <div>
          <strong style="display: block; font-family: system-ui, sans-serif; font-size: 15px; color: #1F2421;">${escapeHtml(
            item.name
          )}</strong>
          <span style="font-size: 14px; color: #4B5563; line-height: 1.5;">${escapeHtml(
            item.reason
          )}</span>
        </div>
      </li>`
    )
    .join('');

  const doNotBuildYetHtml = doc.doNotBuildYet
    .map(
      (item) => `
      <li style="margin-bottom: 12px; display: flex; align-items: flex-start; gap: 8px;">
        <span style="color: #9CA3AF; font-weight: bold; line-height: 1.4;">-</span>
        <div>
          <strong style="display: block; font-family: system-ui, sans-serif; font-size: 15px; color: #4B5563;">${escapeHtml(
            item.name
          )}</strong>
          <span style="font-size: 14px; color: #6B7280; line-height: 1.5;">${escapeHtml(
            item.reason
          )}</span>
        </div>
      </li>`
    )
    .join('');

  const toolStackRowsHtml = doc.toolStack
    .map(
      (t) => `
      <tr style="border-bottom: 1px solid #E5E7EB; vertical-align: top;">
        <td style="padding: 10px 12px 10px 0;">
          <strong style="display: block; font-family: system-ui, sans-serif; color: #1F2421;">${escapeHtml(
            t.name
          )}</strong>
          <span style="font-size: 13px; color: #6B7280; font-style: italic;">${escapeHtml(
            t.whyHere
          )}</span>
        </td>
        <td style="padding: 10px 12px; font-size: 14px; color: #374151;">${escapeHtml(
          t.whatItDoes
        )}</td>
        <td style="padding: 10px 12px; font-size: 14px; font-weight: 600; color: #1F2421;">${escapeHtml(
          t.freeOption
        )}</td>
        <td style="padding: 10px 0 10px 12px; font-size: 14px; color: #4B5563;">${escapeHtml(
          t.limitation
        )}</td>
      </tr>`
    )
    .join('');

  const roadmapStagesHtml = doc.roadmap
    .map(
      (s, idx) => `
      <div style="flex: 1; min-width: 220px; border: 1px solid #E5E7EB; border-radius: 8px; padding: 16px; background: #FFFFFF;">
        <div style="font-size: 24px; font-weight: 900; font-family: system-ui, sans-serif; color: ${accentColor}; line-height: 1;">0${
        idx + 1
      }</div>
        <h4 style="margin: 6px 0 2px 0; font-size: 16px; font-family: system-ui, sans-serif; color: #1F2421;">${escapeHtml(
          s.title
        )}</h4>
        <div style="font-size: 12px; font-family: monospace; color: #6B7280; margin-bottom: 8px;">${escapeHtml(
          s.duration
        )}</div>
        <p style="font-size: 13px; margin: 0 0 10px 0; color: #374151;"><strong>Goal:</strong> ${escapeHtml(
          s.goal
        )}</p>
        <div style="font-size: 11px; font-family: monospace; font-weight: bold; text-transform: uppercase; color: #6B7280; margin-bottom: 4px;">Tasks:</div>
        <ul style="margin: 0 0 12px 0; padding-left: 18px; font-size: 13px; color: #374151; line-height: 1.5;">
          ${s.tasks.map((tsk) => `<li>${escapeHtml(tsk)}</li>`).join('')}
        </ul>
        <div style="font-size: 12px; background: #F3F4F6; padding: 8px; border-radius: 6px; color: #1F2421;">
          <strong>Done when:</strong> ${escapeHtml(s.doneWhen)}
        </div>
      </div>`
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} — Build Plan</title>
  <style>
    body {
      margin: 0;
      padding: 32px 20px;
      background-color: #F6F3EC;
      color: #1F2421;
      font-family: Georgia, Cambria, "Times New Roman", Times, serif;
      line-height: 1.6;
    }
    .sheet {
      max-width: 900px;
      margin: 0 auto;
      background: #FFFFFF;
      padding: 40px 48px;
      border: 1px solid #D6D3CD;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.06);
    }
    .kicker {
      font-family: system-ui, sans-serif;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: ${accentColor};
      margin-bottom: 4px;
    }
    .masthead {
      text-align: center;
      border-bottom: 3px double #1F2421;
      padding-bottom: 16px;
      margin-bottom: 24px;
    }
    .masthead h1 {
      font-family: system-ui, -apple-system, sans-serif;
      font-size: 36px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: -0.03em;
      margin: 0;
      color: #1F2421;
    }
    .dateline {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      font-style: italic;
      color: #4B5563;
      margin-top: 8px;
    }
    .stats-strip {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      border-top: 1px solid #D6D3CD;
      border-bottom: 1px solid #D6D3CD;
      padding: 12px 0;
      margin: 24px 0;
      text-align: left;
    }
    .stats-col {
      padding: 0 12px;
      border-right: 1px solid #E5E7EB;
    }
    .stats-col:last-child { border-right: none; }
    .stats-label {
      font-size: 10px;
      font-family: monospace;
      text-transform: uppercase;
      color: #6B7280;
      display: block;
    }
    .stats-val {
      font-size: 16px;
      font-family: system-ui, sans-serif;
      font-weight: bold;
      color: #1F2421;
    }
    .code-block {
      background: #18181B;
      color: #F6F3EC;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 12px;
      line-height: 1.6;
      padding: 20px;
      border-radius: 8px;
      white-space: pre-wrap;
      word-wrap: break-word;
      overflow-x: auto;
    }
    @media print {
      body { background: #FFFFFF; padding: 0; }
      .sheet { box-shadow: none; border: none; padding: 0; max-width: 100%; }
      .code-block { background: #F3F4F6; color: #111827; border: 1px solid #D1D5DB; }
    }
  </style>
</head>
<body>
  <div class="sheet">
    <div class="masthead">
      <div style="font-family: monospace; font-size: 10px; font-weight: bold; letter-spacing: 0.2em; text-transform: uppercase; color: #6B7280;">
        The Builder&#39;s Gazette
      </div>
      <h1>START WITH THIS</h1>
      <div class="dateline">
        <span>Print Edition</span>
        <span style="font-family: system-ui, sans-serif; font-weight: bold; text-transform: uppercase;">Edition for ${title}</span>
      </div>
    </div>

    <div class="kicker">01 · The product</div>
    <h2 style="font-family: system-ui, sans-serif; font-size: 40px; font-weight: 900; margin: 0 0 10px 0; line-height: 1;">
      ${title}
    </h2>
    <p style="font-size: 20px; font-style: italic; color: #374151; margin: 0 0 20px 0;">
      ${definition}
    </p>

    <div class="stats-strip">
      <div class="stats-col">
        <span class="stats-label">Build time</span>
        <span class="stats-val">${escapeHtml(doc.atAGlance.buildTime)}</span>
      </div>
      <div class="stats-col">
        <span class="stats-label">Difficulty</span>
        <span class="stats-val">${escapeHtml(doc.atAGlance.difficulty)}</span>
      </div>
      <div class="stats-col">
        <span class="stats-label">Tools</span>
        <span class="stats-val">${doc.atAGlance.toolsCount} tools</span>
      </div>
      <div class="stats-col">
        <span class="stats-label">Stages</span>
        <span class="stats-val">${doc.atAGlance.stagesCount} stages</span>
      </div>
    </div>

    <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 32px; margin: 28px 0; border-top: 1px solid #E5E7EB; padding-top: 24px;">
      <div>
        <div class="kicker">02 · The problem</div>
        <p style="font-size: 16px; margin: 0 0 24px 0; line-height: 1.7;">
          ${problem}
        </p>

        <div style="border-top: 3px solid #1F2421; border-bottom: 1px solid #D6D3CD; padding: 18px 0; margin-bottom: 20px;">
          <div class="kicker">04 · The MVP</div>
          <div style="font-size: 13px; font-style: italic; color: #6B7280; margin-bottom: 6px;">The smallest version worth building</div>
          <p style="font-size: 18px; margin: 0; color: #111827; line-height: 1.5;">
            ${mvpSummary}
          </p>
          ${
            adjustmentNote
              ? `<p style="font-size: 13px; font-style: italic; color: #6B7280; margin-top: 10px; border-top: 1px solid #E5E7EB; padding-top: 8px;"><strong>A note on this plan:</strong> ${adjustmentNote}</p>`
              : ''
          }
        </div>
      </div>

      <div style="border-left: 1px solid #E5E7EB; padding-left: 24px;">
        <div class="kicker">03 · Who it&#39;s for</div>
        <p style="font-size: 15px; margin: 0 0 20px 0;">
          ${targetUser}
        </p>
        ${
          whyFitsYou
            ? `<div style="border-top: 1px solid #E5E7EB; padding-top: 16px;">
                <blockquote style="margin: 0; font-size: 16px; font-style: italic; color: #1F2421; line-height: 1.5;">
                  “${whyFitsYou}”
                </blockquote>
                <div style="font-size: 11px; font-family: monospace; color: #6B7280; text-transform: uppercase; margin-top: 8px;">
                  On why this fits you
                </div>
              </div>`
            : ''
        }
      </div>
    </div>

    <div style="margin: 32px 0;">
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px; border-top: 1px solid #D6D3CD; padding-top: 24px;">
        <div>
          <div class="kicker">05 · What to build</div>
          <div style="font-size: 13px; font-style: italic; color: #6B7280; margin-bottom: 12px;">In the first edition</div>
          <ul style="list-style: none; padding: 0; margin: 0;">${buildNowHtml}</ul>
        </div>
        <div style="border-left: 1px solid #E5E7EB; padding-left: 24px;">
          <div class="kicker" style="opacity: 0.8;">06 · What not to build yet</div>
          <div style="font-size: 13px; font-style: italic; color: #6B7280; margin-bottom: 12px;">Held for a later edition</div>
          <ul style="list-style: none; padding: 0; margin: 0;">${doNotBuildYetHtml}</ul>
        </div>
      </div>
    </div>

    <div style="margin: 36px 0;">
      <div class="kicker">07 · The tool stack</div>
      <div style="font-size: 13px; font-style: italic; color: #6B7280; margin-bottom: 12px;">Tools selected for immediate utility</div>
      <table style="width: 100%; border-collapse: collapse; text-align: left;">
        <thead>
          <tr style="border-bottom: 2px solid #1F2421; font-family: monospace; font-size: 11px; text-transform: uppercase; color: #6B7280;">
            <th style="padding-bottom: 6px;">Tool</th>
            <th style="padding-bottom: 6px; padding-left: 12px;">What it does</th>
            <th style="padding-bottom: 6px; padding-left: 12px;">Free option</th>
            <th style="padding-bottom: 6px; padding-left: 12px;">Watch out for</th>
          </tr>
        </thead>
        <tbody>
          ${toolStackRowsHtml}
        </tbody>
      </table>
    </div>

    <div style="margin: 36px 0;">
      <div class="kicker">08 · The build roadmap</div>
      <div style="font-size: 13px; font-style: italic; color: #6B7280; margin-bottom: 16px;">The schedule</div>
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        ${roadmapStagesHtml}
      </div>
    </div>

    <div style="margin: 36px 0;">
      <div class="kicker">09 · The AI starter prompt</div>
      <div style="font-size: 13px; font-style: italic; color: #6B7280; margin-bottom: 12px;">Paste this into your favorite AI tool to begin.</div>
      <pre class="code-block">${starterPrompt}</pre>
    </div>

    <div style="border-top: 4px solid #1F2421; padding-top: 20px; margin-top: 40px; display: flex; justify-content: space-between; align-items: baseline; font-size: 12px; color: #6B7280;">
      <span><strong>The fine print:</strong> ${disclaimer}</span>
      <span style="font-family: system-ui, sans-serif; font-weight: bold; text-transform: uppercase;">Made with Start With This</span>
    </div>
  </div>
</body>
</html>`;
}

/**
 * Generates clean, well-formatted Markdown document of the complete plan.
 */
export function generatePlanMarkdown(doc: PlanDocument): string {
  const buildNowItems = doc.buildNow
    .map((item) => `- **${item.name}**: ${item.reason}`)
    .join('\n');

  const leaveOutItems = doc.doNotBuildYet
    .map((item) => `- **${item.name}**: ${item.reason}`)
    .join('\n');

  const toolStackRows = doc.toolStack
    .map(
      (t) =>
        `| **${t.name}** (${t.whyHere}) | ${t.whatItDoes} | ${t.freeOption} | ${t.limitation} |`
    )
    .join('\n');

  const roadmapSections = doc.roadmap
    .map(
      (stage, idx) => `### Stage ${idx + 1}: ${stage.title} (${stage.duration})
- **Goal:** ${stage.goal}
- **Tasks:**
${stage.tasks.map((t) => `  - ${t}`).join('\n')}
- **Done when:** ${stage.doneWhen}`
    )
    .join('\n\n');

  const noteBlock = doc.adjustmentNote
    ? `\n> **A note on this plan:** ${doc.adjustmentNote}\n`
    : '';

  const whyFitsYouBlock = doc.whyFitsYou
    ? `\n> *“${doc.whyFitsYou}”*  \n> — On why this fits you\n`
    : '';

  return `# ${doc.title.toUpperCase()} — BUILD PLAN

${doc.definition}
${noteBlock}
- **Build time:** ${doc.atAGlance.buildTime}
- **Difficulty:** ${doc.atAGlance.difficulty}
- **Tools:** ${doc.atAGlance.toolsCount}
- **Stages:** ${doc.atAGlance.stagesCount}

---

## 02 · The Problem
${doc.problem}

## 03 · Who It's For
${doc.targetUser}
${whyFitsYouBlock}

## 04 · The MVP
${doc.mvpSummary}

---

## 05 · What to Build (First Edition)
${buildNowItems}

## 06 · What Not to Build Yet
${leaveOutItems}

---

## 07 · The Tool Stack
| Tool | What it does | Free option | Watch out for |
|---|---|---|---|
${toolStackRows}

---

## 08 · The Build Roadmap
${roadmapSections}

---

## 09 · The AI Starter Prompt
\`\`\`
${doc.starterPrompt}
\`\`\`

---
*${doc.disclaimer}*  
*Made with Start With This*
`;
}
