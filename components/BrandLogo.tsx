'use client';

// components/BrandLogo.tsx
// Official 3D Glossy Brand Mark for "Start With This" based on the Brand Sheet:
// 1. Tangerine Sphere (#FF4F24): 3D sphere with radial gradient, top-left gloss specular hotspot, ambient bounce
// 2. Signal Cyan Capsule (#56C8F2): 3D vertical cylinder/capsule with longitudinal gloss sheen
// 3. Fresh Mint Rounded Triangle (#65D9B3): 3D play-button / nudge wedge pointing right with bevel gloss
// Accompanied by "START WITH THIS" in bold uppercase Bricolage Grotesque and tagline "a small signal that helps you begin".

import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showWordmark?: boolean;
  showTagline?: boolean;
  wordmarkColor?: 'white' | 'dark';
  className?: string;
}

const pixelSizes = {
  sm: 44,
  md: 56,
  lg: 72,
  xl: 96,
};

export function BrandMarkSvg({ size = 38 }: { size?: number }) {
  const height = Math.round(size * 0.75); // aspect ratio approx 1.33:1 (width: 140, height: 105)

  return (
    <svg
      width={size}
      height={height}
      viewBox="0 0 148 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 select-none filter drop-shadow-[0_6px_14px_rgba(0,0,0,0.35)]"
      aria-hidden="true"
    >
      <defs>
        {/* ============================================================== */}
        {/* 1. TANGERINE SPHERE GRADIENTS & SPECULAR HIGHLIGHTS             */}
        {/* ============================================================== */}
        {/* Base 3D Sphere Spherical Shader */}
        <radialGradient
          id="tangerineSphereBase"
          cx="38%"
          cy="32%"
          r="62%"
          fx="32%"
          fy="26%"
        >
          <stop offset="0%" stopColor="#FFA07A" />
          <stop offset="25%" stopColor="#FF6333" />
          <stop offset="70%" stopColor="#FF4F24" />
          <stop offset="92%" stopColor="#D93810" />
          <stop offset="100%" stopColor="#9C2405" />
        </radialGradient>

        {/* Tangerine Gloss Specular Hotspot */}
        <radialGradient
          id="tangerineSpecular"
          cx="42%"
          cy="36%"
          r="48%"
        >
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0.6" />
          <stop offset="70%" stopColor="#FFA07A" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#FF4F24" stopOpacity="0" />
        </radialGradient>

        {/* Tangerine Bottom Rim / Bounce Light */}
        <radialGradient
          id="tangerineBounce"
          cx="60%"
          cy="85%"
          r="45%"
        >
          <stop offset="0%" stopColor="#FFB380" stopOpacity="0.55" />
          <stop offset="60%" stopColor="#FF4F24" stopOpacity="0" />
        </radialGradient>

        {/* ============================================================== */}
        {/* 2. SIGNAL CYAN CAPSULE GRADIENTS & SPECULAR HIGHLIGHTS          */}
        {/* ============================================================== */}
        {/* Cylinder / Capsule 3D Shader */}
        <linearGradient
          id="cyanCapsuleBase"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#2BB0E4" />
          <stop offset="25%" stopColor="#56C8F2" />
          <stop offset="55%" stopColor="#80D8F8" />
          <stop offset="75%" stopColor="#56C8F2" />
          <stop offset="100%" stopColor="#1E8AB5" />
        </linearGradient>

        {/* Cyan Top/Bottom Curvature Gradient */}
        <linearGradient
          id="cyanCapsuleDepth"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.65" />
          <stop offset="18%" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="82%" stopColor="#0B4B66" stopOpacity="0" />
          <stop offset="100%" stopColor="#093B52" stopOpacity="0.55" />
        </linearGradient>

        {/* Cyan Longitudinal Gloss Sheen */}
        <linearGradient
          id="cyanGlossSheen"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.1" />
        </linearGradient>

        {/* ============================================================== */}
        {/* 3. FRESH MINT ROUNDED TRIANGLE GRADIENTS & HIGHLIGHTS           */}
        {/* ============================================================== */}
        {/* Mint Triangle Base Gradient */}
        <linearGradient
          id="mintTriangleBase"
          x1="15%"
          y1="10%"
          x2="90%"
          y2="90%"
        >
          <stop offset="0%" stopColor="#96ECCF" />
          <stop offset="35%" stopColor="#65D9B3" />
          <stop offset="75%" stopColor="#3EBF95" />
          <stop offset="100%" stopColor="#1E8C67" />
        </linearGradient>

        {/* Mint Top Ridge Gloss Reflection */}
        <linearGradient
          id="mintGlossBevel"
          x1="20%"
          y1="15%"
          x2="70%"
          y2="55%"
        >
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.55" />
          <stop offset="70%" stopColor="#65D9B3" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#65D9B3" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* SHADOWS BENEATH SHAPES */}
      <ellipse cx="26" cy="74" rx="16" ry="6" fill="#000000" fillOpacity="0.25" />
      <ellipse cx="64" cy="84" rx="16" ry="6" fill="#000000" fillOpacity="0.28" />
      <ellipse cx="112" cy="78" rx="24" ry="7" fill="#000000" fillOpacity="0.28" />

      {/* ============================================================== */}
      {/* 1. TANGERINE SPHERE (LEFT ELEMENT)                             */}
      {/* ============================================================== */}
      <g>
        {/* Main Sphere Body */}
        <circle cx="26" cy="52" r="18" fill="url(#tangerineSphereBase)" />
        
        {/* Bottom Ambient Bounce Light */}
        <circle cx="26" cy="52" r="18" fill="url(#tangerineBounce)" />

        {/* Top-Left Specular Hotspot (Gloss Sheen) */}
        <ellipse
          cx="21"
          cy="44"
          rx="7.5"
          ry="5.5"
          transform="rotate(-25 21 44)"
          fill="url(#tangerineSpecular)"
        />
        {/* Crisp Pinpoint Glint */}
        <ellipse
          cx="19.5"
          cy="42.5"
          rx="2.5"
          ry="1.8"
          transform="rotate(-25 19.5 42.5)"
          fill="#FFFFFF"
          fillOpacity="0.95"
        />

        {/* Rim Specular Hairline */}
        <circle
          cx="26"
          cy="52"
          r="17.2"
          stroke="#FFFFFF"
          strokeWidth="0.8"
          strokeOpacity="0.35"
          fill="none"
        />
      </g>

      {/* ============================================================== */}
      {/* 2. SIGNAL CYAN VERTICAL CAPSULE (MIDDLE ELEMENT)               */}
      {/* ============================================================== */}
      <g>
        {/* Capsule Base Body */}
        <rect
          x="50"
          y="20"
          width="28"
          height="62"
          rx="14"
          fill="url(#cyanCapsuleBase)"
        />
        {/* Capsule Curvature Shader */}
        <rect
          x="50"
          y="20"
          width="28"
          height="62"
          rx="14"
          fill="url(#cyanCapsuleDepth)"
        />

        {/* Longitudinal Gloss Specular Sheen (Center-Left) */}
        <rect
          x="55"
          y="25"
          width="6.5"
          height="48"
          rx="3.25"
          fill="url(#cyanGlossSheen)"
        />
        {/* Top Dome Reflection Glint */}
        <ellipse
          cx="60"
          cy="26"
          rx="4.5"
          ry="2.5"
          fill="#FFFFFF"
          fillOpacity="0.85"
        />

        {/* Rim Specular Hairline */}
        <rect
          x="50.6"
          y="20.6"
          width="26.8"
          height="60.8"
          rx="13.4"
          stroke="#FFFFFF"
          strokeWidth="0.8"
          strokeOpacity="0.4"
          fill="none"
        />
      </g>

      {/* ============================================================== */}
      {/* 3. FRESH MINT ROUNDED TRIANGLE / NUDGE WEDGE (RIGHT ELEMENT)   */}
      {/* ============================================================== */}
      <g>
        {/* Rounded Triangle Path (Points right like a play arrow) */}
        <path
          d="M 94 24
             C 94 21, 98 19.5, 101 21.2
             L 134 44.5
             C 137.5 46.8, 137.5 52, 134 54.3
             L 101 77.8
             C 98 79.5, 94 78, 94 75
             Z"
          fill="url(#mintTriangleBase)"
        />

        {/* Top-Slanted Gloss Bevel Highlight */}
        <path
          d="M 97 27
             C 97 25.5, 99.5 24.5, 101.5 25.8
             L 128 44.5
             C 129.5 45.5, 128 47.5, 126 47
             L 100 37
             C 98 36, 97 34, 97 31
             Z"
          fill="url(#mintGlossBevel)"
        />

        {/* Sharp Glint at Upper Peak */}
        <circle cx="102" cy="25" r="2.2" fill="#FFFFFF" fillOpacity="0.85" />

        {/* Triangle Outer Rim Specular Hairline */}
        <path
          d="M 94.6 24.5
             C 94.6 22, 98 20.5, 100.8 22
             L 133.5 45.2
             C 136.5 47.2, 136.5 51.5, 133.5 53.5
             L 100.8 76.8
             C 98 78.3, 94.6 77, 94.6 74.2
             Z"
          stroke="#FFFFFF"
          strokeWidth="0.8"
          strokeOpacity="0.4"
          fill="none"
        />
      </g>
    </svg>
  );
}

export function BrandMark({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' | 'xl' | number }) {
  const pixelSize = typeof size === 'number' ? size : (pixelSizes[size] || 56);
  return <BrandMarkSvg size={pixelSize} />;
}

export default function BrandLogo({
  size = 'md',
  showWordmark = true,
  showTagline = false,
  wordmarkColor = 'white',
  className = '',
}: BrandLogoProps) {
  const pixelSizes = {
    sm: 44,
    md: 56,
    lg: 72,
    xl: 96,
  };

  const textSizes = {
    sm: 'text-sm sm:text-base leading-none tracking-tight',
    md: 'text-base sm:text-lg leading-tight tracking-tight',
    lg: 'text-xl sm:text-2xl leading-none tracking-tight',
    xl: 'text-3xl sm:text-4xl leading-none tracking-tight',
  };

  const textColor = wordmarkColor === 'white' ? 'text-white' : 'text-[#3D4A52]';
  const taglineColor = wordmarkColor === 'white' ? 'text-white/70' : 'text-[#3D4A52]/75';

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <BrandMarkSvg size={pixelSizes[size]} />
      {showWordmark && (
        <div className="flex flex-col text-left">
          <span className={`font-display font-black uppercase ${textSizes[size]} ${textColor}`}>
            START WITH THIS
          </span>
          {showTagline && (
            <span className={`text-[11px] sm:text-xs font-sans font-normal lowercase tracking-normal mt-0.5 ${taglineColor}`}>
              a small signal that helps you begin
            </span>
          )}
        </div>
      )}
    </div>
  );
}
