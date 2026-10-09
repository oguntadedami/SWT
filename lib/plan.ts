// lib/plan.ts
// Typed BuildPlan shape and mock data for the Build Plan screen at /plan.
// Untrusted plain text only: never render any field as HTML.

export type FreeOption = 'Yes' | 'Partly' | 'No' | 'Unsure';

export interface BuildPlanItem {
  name: string;
  reason: string;
}

export interface ToolStackItem {
  name: string;
  whatItDoes: string;
  whyHere: string;
  freeOption: FreeOption;
  limitation: string;
}

export interface RoadmapStage {
  title: string;
  duration: string;
  goal: string;
  tasks: string[];
  doneWhen: string;
}

export interface BuildPlan {
  ideaId: string;
  productName: string;
  definition: string;
  problem: string;
  targetUser: string;
  mvpSummary: string;
  buildNow: BuildPlanItem[];
  doNotBuildYet: BuildPlanItem[];
  toolStack: ToolStackItem[];
  roadmap: RoadmapStage[];
  starterPrompt: string;
  adjustmentNote?: string;
}

export const BASE_MOCK_PLAN: Omit<BuildPlan, 'ideaId' | 'productName'> = {
  definition: 'A one-page web tool that writes a friendly payment-reminder email for you in seconds.',
  problem: 'Freelancers dread chasing late invoices, and an awkward message can damage a good client relationship.',
  targetUser: 'Solo freelance designers who invoice 3 to 10 clients a month and chase payments by email.',
  mvpSummary: 'One page with a short form: client name, amount, days late, and tone. Press a button and get a ready-to-send email you can copy.',
  buildNow: [
    {
      name: 'Single-page reminder form',
      reason: 'Collects the four details needed to write the email and nothing else.',
    },
    {
      name: 'Tone picker with three presets',
      reason: 'Lets the user match the email to how late the payment is without having to write anything from scratch.',
    },
    {
      name: 'Generated email preview card',
      reason: 'Shows the finished draft instantly on the same page so the user can review before copying.',
    },
    {
      name: 'One-click copy button',
      reason: 'Gets the user from generated text to their email client with zero friction.',
    },
  ],
  doNotBuildYet: [
    {
      name: 'User accounts or logins',
      reason: 'Adds authentication and database complexity before you have any regular users.',
    },
    {
      name: 'Direct email sending via SMTP',
      reason: 'Requires email provider setup and deliverability management. Copy-paste works fine for version 1.',
    },
    {
      name: 'Invoice file upload or parsing',
      reason: 'Document parsing is unreliable and unnecessary when four short inputs are faster to type.',
    },
    {
      name: 'Payment processing links',
      reason: 'Stripe or payment gateway integration turns a weekend utility into a financial tool.',
    },
  ],
  toolStack: [
    {
      name: 'Next.js',
      whatItDoes: 'Frontend framework and lightweight API route',
      whyHere: 'Single project holds both the UI and the backend call that generates the email.',
      freeOption: 'Yes',
      limitation: 'Requires Node.js runtime and basic React knowledge.',
    },
    {
      name: 'Tailwind CSS',
      whatItDoes: 'Utility-first styling',
      whyHere: 'Builds clean form controls and cards quickly without leaving your markup.',
      freeOption: 'Yes',
      limitation: 'Learning the class names takes a day if you have never used it.',
    },
    {
      name: 'Gemini API',
      whatItDoes: 'AI model that generates the email copy',
      whyHere: 'Free tier handles several thousand requests a month, more than enough to test with real users.',
      freeOption: 'Yes',
      limitation: 'Free tier has rate limits per minute and requires an API key stored on the server.',
    },
    {
      name: 'Vercel',
      whatItDoes: 'Zero-config hosting and deployment',
      whyHere: 'Deploys directly from GitHub in under a minute with free SSL and serverless functions.',
      freeOption: 'Yes',
      limitation: 'Free Hobby tier is for non-commercial and personal projects.',
    },
  ],
  roadmap: [
    {
      title: 'Stage 1',
      duration: 'Day 1 (3-4 hours)',
      goal: 'Build the single-page layout and input form',
      tasks: [
        'Create Next.js project with Tailwind CSS',
        'Build the four-input form (client name, amount, days late, tone)',
        'Create the email preview card and copy button (with placeholder text)',
      ],
      doneWhen: 'The page looks right on mobile and desktop and you can type into every field.',
    },
    {
      title: 'Stage 2',
      duration: 'Day 2 (3-4 hours)',
      goal: 'Connect the AI route to write the emails',
      tasks: [
        'Create a server-side route at /api/generate',
        'Add the Gemini SDK and test a sample prompt from your terminal',
        'Wire the form submit button to the route and render the returned text in the preview card',
        'Add a loading state while the model writes',
      ],
      doneWhen: 'Submitting real numbers produces a readable, tone-appropriate email draft in the preview card.',
    },
    {
      title: 'Stage 3',
      duration: 'Day 3 (2-3 hours)',
      goal: 'Polish the copy button and deploy to the web',
      tasks: [
        'Make the copy button write to clipboard with a brief "Copied!" confirmation',
        'Test on your phone and with one friend or freelance contact',
        'Push to GitHub and connect to Vercel for a live URL',
      ],
      doneWhen: 'You have a working public link on your phone and can generate and copy an email in under 30 seconds.',
    },
  ],
  starterPrompt: `You are helping me build an MVP called Polite Nudge.

It is a single-page web app built with Next.js (App Router) and Tailwind CSS.
Its sole purpose: help freelancers generate a friendly, professional payment-reminder email in seconds.

Follow these rules:
1. One page only. No user accounts, no logins, no database.
2. A clean form with four fields: Client Name, Amount Owed, Days Past Due, and Tone (three options: Friendly check-in, Firm follow-up, Final reminder).
3. A "Draft reminder" button that calls a Next.js server route (/api/generate).
4. The server route calls the Gemini API to write a concise, polite email (under 120 words) matching the selected tone.
5. Display the drafted email in a preview card on the same page with a "Copy email" button that copies the text to the clipboard and shows a brief confirmation.
6. Handle errors cleanly: if the API call fails, show a calm error message under the form without breaking the page.
7. Do not add email sending, Stripe, or any feature not listed above.

Start by writing the server route at app/api/generate/route.ts.`,
  adjustmentNote: 'Scaled down to a weekend: no accounts, no database, one page.',
};

/**
 * Returns a BuildPlan for the selected idea.
 * Keeps data shape and mock data consistent across ideas.
 */
export function getBuildPlanForIdea(ideaId: string, ideaName: string): BuildPlan {
  if (ideaId === 'idea-2') {
    return {
      ideaId,
      productName: ideaName || 'Brief Builder',
      definition: 'A focused web tool that turns messy client-call notes into a clear one-page project brief ready for sign-off.',
      problem: 'Vague briefs lead to client confusion, endless rework, and unpaid revisions.',
      targetUser: 'Freelance designers and small studios managing 2 to 5 concurrent client projects.',
      mvpSummary: 'One page with a clean paste box and five guided constraint questions. Press a button and get a structured one-page brief to copy and sign off.',
      buildNow: [
        {
          name: 'Notes paste area & constraint inputs',
          reason: 'Captures raw discovery conversation notes and key project constraints directly.',
        },
        {
          name: 'AI brief structuring engine',
          reason: 'Organizes freeform notes into clear project objectives, timeline, and deliverables.',
        },
        {
          name: 'Formatted one-page preview sheet',
          reason: 'Presents the structured brief in a clean executive format ready for client review.',
        },
        {
          name: 'Copy markdown & text button',
          reason: 'Lets the freelancer paste the brief straight into Notion, Google Docs, or an email.',
        },
      ],
      doNotBuildYet: [
        {
          name: 'PDF document export engine',
          reason: 'Server-side PDF generation adds heavy dependencies before copy-paste is tested with clients.',
        },
        {
          name: 'Client sign-off signature portal',
          reason: 'Digital signatures introduce legal frameworks and accounts that delay launching.',
        },
        {
          name: 'Multi-user collaboration',
          reason: 'Real-time multi-cursor editing requires WebSockets and complex state synchronization.',
        },
        {
          name: 'CRM and Notion integrations',
          reason: 'Third-party OAuth sync is unnecessary when manual pasting takes five seconds.',
        },
      ],
      toolStack: [
        {
          name: 'Next.js',
          whatItDoes: 'Fullstack React framework with API routes',
          whyHere: 'Houses the note-taking UI and server-side brief synthesis in one clean codebase.',
          freeOption: 'Yes',
          limitation: 'Requires basic understanding of React state and Next.js server actions or routes.',
        },
        {
          name: 'Tailwind CSS',
          whatItDoes: 'Modern utility styling',
          whyHere: 'Enables quick layout of the note input and formatted brief sheet without separate CSS.',
          freeOption: 'Yes',
          limitation: 'Takes a bit of practice to memorize utility naming conventions.',
        },
        {
          name: 'Gemini API',
          whatItDoes: 'Structured text synthesis and formatting',
          whyHere: 'Generous free tier with strong reasoning for turning messy bullet points into clean briefs.',
          freeOption: 'Yes',
          limitation: 'Requires keeping your API key in server-side environment variables.',
        },
        {
          name: 'Vercel',
          whatItDoes: 'Hosting and global edge deployment',
          whyHere: 'Deploys in seconds directly from your Git repository with automated SSL certificates.',
          freeOption: 'Yes',
          limitation: 'Free Hobby tier is restricted to non-commercial projects.',
        },
      ],
      roadmap: [
        {
          title: 'Stage 1',
          duration: 'Days 1-2 (5-6 hours)',
          goal: 'Build the note intake interface and preview sheet',
          tasks: [
            'Set up Next.js project with Tailwind CSS',
            'Build large paste textarea and five constraint selectors',
            'Design the structured brief preview card layout',
          ],
          doneWhen: 'You can paste messy notes into the page and see the draft card preview in place.',
        },
        {
          title: 'Stage 2',
          duration: 'Days 3-4 (5-6 hours)',
          goal: 'Connect Gemini API to parse and structure the notes',
          tasks: [
            'Create /api/generate route with structured brief prompt',
            'Test AI structuring with three realistic client discovery notes',
            'Connect submit button and add responsive loading spinner',
          ],
          doneWhen: 'Clicking Generate reliably outputs a clean, well-formatted brief from raw notes.',
        },
        {
          title: 'Stage 3',
          duration: 'Day 5 (3-4 hours)',
          goal: 'Add one-click copy, verify on mobile, and deploy',
          tasks: [
            'Implement rich markdown and plain text copy buttons',
            'Test on mobile device and with a freelance peer',
            'Deploy to Vercel and verify production URL',
          ],
          doneWhen: 'You can generate and copy a complete brief from your smartphone in under 45 seconds.',
        },
      ],
      starterPrompt: `You are helping me build an MVP called Brief Builder.

It is a single-page web app built with Next.js (App Router) and Tailwind CSS.
Its sole purpose: convert messy discovery notes into a concise, professional 1-page project brief.

Follow these rules:
1. One page only. No user accounts, no logins, no database.
2. An input area for meeting notes and five quick questions (budget, timeline, deliverables, out-of-scope, approvals).
3. A "Generate brief" button that calls a Next.js server route (/api/generate).
4. The server route calls the Gemini API to structure the notes into a markdown brief.
5. Display the brief in a preview card with a "Copy brief" button.
6. Do not add logins, multi-user editing, or file storage.

Start by writing the server route at app/api/generate/route.ts.`,
      adjustmentNote: undefined,
    };
  }

  if (ideaId === 'idea-3') {
    return {
      ideaId,
      productName: ideaName || 'Fair Price Check',
      definition: 'A practical pricing calculator that gives newer freelancers a calibrated rate range and clear rationale for quoting client projects.',
      problem: 'Early-career freelancers often struggle to price their work and end up undercharging or losing clients to guesswork.',
      targetUser: 'Newer freelancers and career switchers quoting client work.',
      mvpSummary: 'Pick your service type, project scope, and experience level to get a recommended rate range and a quote template ready to send.',
      buildNow: [
        {
          name: 'Three-step pricing parameter form',
          reason: 'Collects discipline, project scope, and experience level without overwhelming the user.',
        },
        {
          name: 'Calibrated rate calculation model',
          reason: 'Calculates reasonable hourly and fixed-project pricing brackets based on market data.',
        },
        {
          name: 'Rationale and talking points generator',
          reason: 'Provides three bullet points explaining why the quote is fair to help pitch the client.',
        },
        {
          name: 'Copy quote template button',
          reason: 'Places a ready-to-send proposal email draft on the clipboard with one click.',
        },
      ],
      doNotBuildYet: [
        {
          name: 'Invoice generation and PDF receipts',
          reason: 'Full billing requires tax compliance, invoice numbers, and accounting standards.',
        },
        {
          name: 'Stripe or payment processing checkout',
          reason: 'Taking payments introduces banking verification and merchant fees not needed for quoting.',
        },
        {
          name: 'Historical rate tracker and user profiles',
          reason: 'Users need quick answers for an immediate quote; past storage adds database overhead.',
        },
        {
          name: 'Real-time multi-currency converter',
          reason: 'Fluctuating exchange rates require external paid financial APIs for version 1.',
        },
      ],
      toolStack: [
        {
          name: 'Next.js',
          whatItDoes: 'Modern React application and API framework',
          whyHere: 'Manages interactive rate calculations and quote generation in a single lightweight repository.',
          freeOption: 'Yes',
          limitation: 'Requires Node.js runtime environment for hosting.',
        },
        {
          name: 'Tailwind CSS',
          whatItDoes: 'Utility CSS styling framework',
          whyHere: 'Enables responsive rate cards and clean pricing tier comparison tables.',
          freeOption: 'Yes',
          limitation: 'Requires initial familiarization with Tailwind class naming.',
        },
        {
          name: 'Gemini API',
          whatItDoes: 'Client pitch rationale and talking points generator',
          whyHere: 'Writes persuasive, professional pitch justifications for why the pricing tier is fair.',
          freeOption: 'Yes',
          limitation: 'Free quota limits request volume to 15 RPM.',
        },
        {
          name: 'Vercel',
          whatItDoes: 'Cloud application hosting and CDN',
          whyHere: 'Instant zero-configuration deployment with free global SSL certification.',
          freeOption: 'Yes',
          limitation: 'Free tier intended for personal and prototype projects.',
        },
      ],
      roadmap: [
        {
          title: 'Stage 1',
          duration: 'Week 1 (8-10 hours)',
          goal: 'Build the pricing parameter selectors and formula engine',
          tasks: [
            'Create Next.js repository with Tailwind CSS',
            'Implement 3-parameter calculator form (discipline, scope, experience)',
            'Code baseline rate matrix calculation logic for instant client-side numbers',
          ],
          doneWhen: 'Selecting parameters immediately calculates a realistic min/max price bracket.',
        },
        {
          title: 'Stage 2',
          duration: 'Week 2 (6-8 hours)',
          goal: 'Connect AI justification generator and quote template',
          tasks: [
            'Build /api/generate endpoint to write personalized pitch talking points',
            'Create copyable client quote email template card',
            'Add loading state while AI generates customized talking points',
          ],
          doneWhen: 'Users receive both numeric brackets and three tailored justification bullets to send to clients.',
        },
        {
          title: 'Stage 3',
          duration: 'Week 3 (4-6 hours)',
          goal: 'Add copy button, test with 3 freelancers, and deploy',
          tasks: [
            'Implement one-click copy with visual confirmation',
            'Conduct usability test with 3 freelance contacts for rate accuracy',
            'Deploy to Vercel and publish live production link',
          ],
          doneWhen: 'Live tool accurately calculates rates and copies proposal drafts on any device in under 1 minute.',
        },
      ],
      starterPrompt: `You are helping me build an MVP called Fair Price Check.

It is a single-page web app built with Next.js (App Router) and Tailwind CSS.
Its sole purpose: give newer freelancers a calibrated rate range and clear talking points for client quotes.

Follow these rules:
1. One page only. No user accounts, no logins, no database.
2. Inputs for trade (design, dev, writing), project scope (small, medium, large), and experience level.
3. A "Calculate rate" button that outputs a recommended price range and three talking points.
4. Provide a "Copy template" button.
5. Do not add payment processing, client invoicing, or user accounts.

Start by writing the server route at app/api/generate/route.ts.`,
      adjustmentNote: undefined,
    };
  }

  return {
    ...BASE_MOCK_PLAN,
    ideaId,
    productName: ideaName || 'Polite Nudge',
    adjustmentNote: 'Scaled down to a weekend: no accounts, no database, one page.',
  };
}

import { createPlanDocument, generatePlanMarkdown as generateDocMarkdown } from './planDocument';

/**
 * Generates a clean, well-structured Markdown document of the complete Build Plan.
 */
export function generatePlanMarkdown(plan: BuildPlan, idea?: { buildTime?: string; difficulty?: string }): string {
  const doc = createPlanDocument(plan, idea);
  return generateDocMarkdown(doc);
}
