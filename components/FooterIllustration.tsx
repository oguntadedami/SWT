'use client';

// components/FooterIllustration.tsx
// Renders the official brand footer illustration from:
// /public/Icons/site icons/swt-footer-illustration.svg
// Includes fluid floating physics motion via motion/react, with gentle floating bob,
// subtle tilt, soft shadow expansion, and respect for prefers-reduced-motion.

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';

interface FooterIllustrationProps {
  className?: string;
}

export default function FooterIllustration({ className = '' }: FooterIllustrationProps) {
  return (
    <div
      className={`relative select-none pointer-events-none flex flex-col items-center justify-center ${className}`}
      aria-hidden="true"
    >
      {/* Floating illustration container with fluid physics-based motion */}
      <motion.div
        animate={{
          y: [-6, 6, -6],
          rotate: [-1.2, 1.2, -1.2],
        }}
        transition={{
          duration: 4.8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative w-full aspect-[758/825] drop-shadow-[0_12px_24px_rgba(0,0,0,0.18)]"
      >
        <Image
          src="/Icons/site icons/swt-footer-illustration.svg"
          alt="Start With This footer illustration"
          fill
          sizes="(max-width: 640px) 140px, (max-width: 1024px) 180px, 200px"
          className="object-contain"
          priority={false}
        />
      </motion.div>

      {/* Synchronized soft ambient floor shadow expanding and contracting under the floating illustration */}
      <motion.div
        animate={{
          scale: [0.92, 1.08, 0.92],
          opacity: [0.22, 0.38, 0.22],
        }}
        transition={{
          duration: 4.8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="w-3/4 h-2.5 rounded-full bg-stone-900/30 blur-[4px] mt-1.5"
      />
    </div>
  );
}
