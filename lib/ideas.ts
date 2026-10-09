// lib/ideas.ts
// Single shared typed idea shape and mock data for "Start With This".
// Real AI output can replace this mock data without changing the UI.
// All fields must be treated as untrusted plain text; never rendered as HTML.

export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type BuildTime = 'A weekend' | '1 week' | '2-4 weeks' | '1-3 months';

export interface Idea {
  id: string;
  name: string;
  oneLiner: string;
  problem: string;
  targetUser: string;
  mvp: string;
  whyFitsYou: string;
  difficulty: Difficulty;
  buildTime: BuildTime;
}

export const MOCK_IDEAS: Idea[] = [
  {
    id: 'idea-1',
    name: 'Polite Nudge',
    oneLiner: 'Writes friendly payment-reminder emails in seconds.',
    problem: 'Freelancers dread chasing late invoices, and an awkward message makes it worse.',
    targetUser: 'Solo freelance designers who invoice 3 to 10 clients a month.',
    mvp: 'One page. Enter the client name, amount, and days late, pick a tone, and get a ready-to-send email to copy.',
    whyFitsYou: 'You write well and freelance, so you know this awkward moment firsthand.',
    difficulty: 'Easy',
    buildTime: 'A weekend',
  },
  {
    id: 'idea-2',
    name: 'Brief Builder',
    oneLiner: 'Turns messy client-call notes into a clear one-page project brief.',
    problem: 'Vague briefs lead to rework and unpaid revisions.',
    targetUser: 'Freelance designers and small studios.',
    mvp: 'Paste your notes, answer five quick questions, and get a one-page brief you can send for sign-off.',
    whyFitsYou: 'It combines your design background with your habit of organizing projects.',
    difficulty: 'Medium',
    buildTime: '1 week',
  },
  {
    id: 'idea-3',
    name: 'Fair Price Check',
    oneLiner: 'Helps newer freelancers price a job from a few simple inputs.',
    problem: 'Early-career freelancers often struggle to price their work and end up undercharging or losing clients to guesswork.',
    targetUser: 'Newer freelancers and career switchers quoting client work.',
    mvp: 'Pick your service type, project scope, and experience level to get a recommended rate range and a quote template ready to send.',
    whyFitsYou: 'You know what it feels like to start out and want a calm, practical benchmark.',
    difficulty: 'Medium',
    buildTime: '2-4 weeks',
  },
];

export function getIdeaById(id: string): Idea | undefined {
  return MOCK_IDEAS.find((idea) => idea.id === id);
}

export function getAllIdeas(): Idea[] {
  return MOCK_IDEAS;
}
