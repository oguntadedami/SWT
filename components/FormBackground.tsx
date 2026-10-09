'use client';

// components/FormBackground.tsx
// Shared softened photographic landscape background:
// - Rolling green hills and blue sky (/photos/hero.webp)
// - Subtle blur with dark overlay
// - Gentle drifting clouds
// - GPU-accelerated transforms & respects prefers-reduced-motion

import React from 'react';
import Image from 'next/image';

interface FormBackgroundProps {
  className?: string;
}

export default function FormBackground({ className = '' }: FormBackgroundProps) {
  return (
    <>
      {/* 1. FULL-SCREEN HERO PHOTO BACKGROUND WITH SUBTLE BLUR & DARK OVERLAY */}
      <div
        className={`fixed inset-0 -z-30 pointer-events-none select-none overflow-hidden ${className}`}
        aria-hidden="true"
      >
        <Image
          src="/photos/hero.webp"
          alt="Atmospheric landscape background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter blur-[3.5px] scale-105"
        />
        {/* Dark overlay for contrast, depth, and legibility */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/60" />
      </div>

      {/* 2. GENTLE DRIFTING CLOUDS (Soft GPU-accelerated cloud drift layers) */}
      <div
        className="fixed inset-0 -z-20 pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        {/* Cloud drift 1 (top-left) */}
        <div className="absolute -top-12 -left-24 w-96 h-48 rounded-full bg-white/20 blur-3xl form-cloud-drift-1" />
        {/* Cloud drift 2 (mid-right) */}
        <div className="absolute top-1/3 -right-32 w-[32rem] h-56 rounded-full bg-sky-200/20 blur-3xl form-cloud-drift-2" />
        {/* Cloud drift 3 (bottom-left) */}
        <div className="absolute bottom-1/4 -left-20 w-80 h-40 rounded-full bg-white/15 blur-3xl form-cloud-drift-3" />
      </div>

      <style jsx global>{`
        @keyframes formCloudDriftA {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(70px, 15px, 0);
          }
        }
        @keyframes formCloudDriftB {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-70px, -20px, 0);
          }
        }
        @keyframes formCloudDriftC {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(40px, -12px, 0);
          }
        }
        .form-cloud-drift-1 {
          animation: formCloudDriftA 26s ease-in-out infinite alternate;
          will-change: transform;
          transform: translateZ(0);
        }
        .form-cloud-drift-2 {
          animation: formCloudDriftB 32s ease-in-out infinite alternate;
          will-change: transform;
          transform: translateZ(0);
        }
        .form-cloud-drift-3 {
          animation: formCloudDriftC 28s ease-in-out infinite alternate;
          will-change: transform;
          transform: translateZ(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .form-cloud-drift-1,
          .form-cloud-drift-2,
          .form-cloud-drift-3 {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </>
  );
}
