import type {Metadata} from 'next';
import {Bricolage_Grotesque, Instrument_Sans, Martian_Mono, Newsreader} from 'next/font/google';
import './globals.css';
import { FormProvider } from '@/components/FormContext';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const instrument = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const martian = Martian_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: 'Start With This — Stuck on what to build? Start with what you already know.',
  description: "Tell us what you're good at. Get three ideas that fit your life, plus a plan to start building.",
  openGraph: {
    title: 'Start With This — Stuck on what to build? Start with what you already know.',
    description: "Tell us what you're good at. Get three ideas that fit your life, plus a plan to start building.",
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Start With This — Stuck on what to build? Start with what you already know.',
    description: "Tell us what you're good at. Get three ideas that fit your life, plus a plan to start building.",
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${instrument.variable} ${martian.variable} ${newsreader.variable}`}
    >
      <body className="font-sans antialiased bg-[#0B1320] text-white min-h-screen selection:bg-orange-500 selection:text-white" suppressHydrationWarning>
        <FormProvider>
          {children}
        </FormProvider>
      </body>
    </html>
  );
}

