// components/FemaleBuilderIllustration.tsx
// Swappable doodle illustration of a female builder walking in a cartoon manner.
// Easily replaceable: replace this SVG with an <img> or <Image> tag when ready.

import React from 'react';

export default function FemaleBuilderIllustration({ className = '' }: { className?: string }) {
  return (
    <div
      className={`relative select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* 
        SWAPPABLE ILLUSTRATION PLACEHOLDER:
        To replace this cartoon doodle with your custom image file, replace this SVG with:
        <img src="/your-builder-image.png" alt="Female builder walking" className="w-full h-full object-contain" />
      */}
      <svg
        viewBox="0 0 160 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        {/* Soft ground shadow beneath walking stride */}
        <ellipse cx="80" cy="172" rx="46" ry="6" fill="rgba(0,0,0,0.25)" />

        {/* Back Leg (stride back) */}
        <path
          d="M72 118 L58 152 L48 168 L40 170"
          stroke="#FDBA74"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Back boot */}
        <path
          d="M44 165 L36 170 C34 172 38 174 44 174 L52 173 L50 165 Z"
          fill="#EA580C"
          stroke="#C2410C"
          strokeWidth="1.5"
        />

        {/* Front Leg (stride forward) */}
        <path
          d="M86 118 L96 146 L108 166 L118 168"
          stroke="#FDBA74"
          strokeWidth="6.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Front boot */}
        <path
          d="M106 163 L122 168 C126 170 124 174 116 174 L104 173 L102 163 Z"
          fill="#EA580C"
          stroke="#C2410C"
          strokeWidth="1.5"
        />

        {/* Blue Denim Overalls / Work Trousers */}
        <path
          d="M66 94 L94 94 L92 124 L82 126 L78 126 L68 124 Z"
          fill="#38BDF8"
          stroke="#0284C7"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* Overalls straps */}
        <path d="M72 74 L70 94" stroke="#0284C7" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M88 74 L90 94" stroke="#0284C7" strokeWidth="3.5" strokeLinecap="round" />
        {/* Big front pocket on bib */}
        <rect x="74" y="80" width="12" height="10" rx="2" fill="#7DD3FC" stroke="#0284C7" strokeWidth="1.5" />

        {/* Torso / Shirt */}
        <path
          d="M68 68 L92 68 L94 96 L66 96 Z"
          fill="#FDE047"
          stroke="#CA8A04"
          strokeWidth="2"
        />

        {/* Left Arm (holding rolled blueprint) */}
        <path
          d="M68 70 L54 84 L52 98"
          stroke="#FDBA74"
          strokeWidth="5"
          strokeLinecap="round"
        />
        {/* Blueprint roll tucked under arm */}
        <g transform="rotate(-25 50 90)">
          <rect x="42" y="84" width="28" height="7" rx="3.5" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="1.5" />
          <ellipse cx="42" cy="87.5" rx="2" ry="3.5" fill="#BAE6FD" stroke="#38BDF8" strokeWidth="1" />
        </g>
        {/* Hand */}
        <circle cx="52" cy="100" r="4.5" fill="#FDBA74" />

        {/* Right Arm (swinging forward with pencil/wrench) */}
        <path
          d="M92 70 L106 82 L114 92"
          stroke="#FDBA74"
          strokeWidth="5"
          strokeLinecap="round"
        />
        {/* Pencil/Tool in hand */}
        <line x1="112" y1="96" x2="124" y2="84" stroke="#F97316" strokeWidth="3" strokeLinecap="round" />
        <circle cx="114" cy="92" r="4.5" fill="#FDBA74" />

        {/* Ponytail Hair (swooping back in breeze) */}
        <path
          d="M66 46 C52 46, 42 54, 44 64 C48 68, 56 62, 64 56 Z"
          fill="#78350F"
        />

        {/* Head / Face */}
        <circle cx="80" cy="48" r="14" fill="#FED7AA" stroke="#FDBA74" strokeWidth="1.5" />
        {/* Cute cartoon eye (happy wink/dot) */}
        <circle cx="85" cy="46" r="2" fill="#1E293B" />
        {/* Cheerful smile */}
        <path d="M83 52 Q87 56 90 52" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        {/* Rosy cheek */}
        <circle cx="88" cy="50" r="2.5" fill="#F472B6" opacity="0.6" />

        {/* Yellow Hardhat with white reflection */}
        <path
          d="M64 42 C64 28, 96 28, 96 42 Z"
          fill="#FACC15"
          stroke="#CA8A04"
          strokeWidth="2.5"
        />
        {/* Hardhat brim */}
        <path
          d="M60 42 C60 40, 100 40, 100 42 C100 44, 60 44, 60 42 Z"
          fill="#EAB308"
          stroke="#CA8A04"
          strokeWidth="1.5"
        />
        {/* Gloss highlight on helmet */}
        <path
          d="M72 32 Q80 30 86 32"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.8"
        />
      </svg>
    </div>
  );
}
