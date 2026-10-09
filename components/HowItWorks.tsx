'use client';

// components/HowItWorks.tsx
// Point-to-Point Interactive Showcase for "How it works"
// - 80vh natural height section without scroll-hijacking/scroll effects
// - Interactive point-to-point step showcase: clicking any point instantly activates that step
// - iOS Liquid Glass morphism card with physics-based transitions
// - Word-for-word copy compliance: Discover, Choose, Plan, Start
// - Card clutter removed: No "01 OF 04", no arrows, no "INPUT, OPTIONS, BLUEPRINT, ACTION"

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface StepItem {
  num: string;
  title: string;
  iconSrc: string;
  description: string;
  accentColor: string;
  accentBg: string;
  glowColor: string;
  badgeBorder: string;
}

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  const steps: StepItem[] = [
    {
      num: '01',
      title: 'Discover',
      iconSrc: '/Icons/site%20icons/compass.svg',
      description: "Tell us what you know, what you like, and how much time you've got.",
      accentColor: '#F2D34F',
      accentBg: 'bg-[#F2D34F]/20 text-[#F2D34F]',
      glowColor: 'rgba(242, 211, 79, 0.4)',
      badgeBorder: 'border-[#F2D34F]/40',
    },
    {
      num: '02',
      title: 'Choose',
      iconSrc: '/Icons/site%20icons/check-circle.svg',
      description: 'Get three ideas sized for you. Pick the one that makes you grin.',
      accentColor: '#65D9B3',
      accentBg: 'bg-[#65D9B3]/20 text-[#65D9B3]',
      glowColor: 'rgba(101, 217, 179, 0.4)',
      badgeBorder: 'border-[#65D9B3]/40',
    },
    {
      num: '03',
      title: 'Plan',
      iconSrc: '/Icons/site%20icons/file-text.svg',
      description: "Get a clear Build Plan: what to make, what to skip, what you'll need.",
      accentColor: '#56C8F2',
      accentBg: 'bg-[#56C8F2]/20 text-[#56C8F2]',
      glowColor: 'rgba(86, 200, 242, 0.4)',
      badgeBorder: 'border-[#56C8F2]/40',
    },
    {
      num: '04',
      title: 'Start',
      iconSrc: '/Icons/site%20icons/rocket.svg',
      description: 'Copy the AI starter prompt or download the plan. Then go.',
      accentColor: '#FF4F24',
      accentBg: 'bg-[#FF4F24]/20 text-[#FF4F24]',
      glowColor: 'rgba(255, 79, 36, 0.4)',
      badgeBorder: 'border-[#FF4F24]/40',
    },
  ];

  const current = steps[activeStep];

  const handlePrev = () => {
    setActiveStep((prev) => (prev > 0 ? prev - 1 : steps.length - 1));
  };

  const handleNext = () => {
    setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : 0));
  };

  return (
    <section
      id="how-it-works"
      className="relative min-h-[80vh] flex flex-col justify-center items-center px-4 sm:px-6 py-14 sm:py-20 scroll-mt-12 text-white overflow-hidden"
    >
      {/* Background radial ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none opacity-20 transition-all duration-700 ease-out"
        style={{ backgroundColor: current.accentColor }}
      />

      <div className="w-full max-w-4xl mx-auto flex flex-col items-center z-10">
        
        {/* Section Header */}
        <div className="text-center pt-2 max-w-2xl mx-auto select-none mb-8 sm:mb-10">
          <span className="inline-block px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/10 border border-white/20 text-white/90 text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-2.5 sm:mb-3 shadow-sm backdrop-blur-md">
            FROM STUCK TO STARTED
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white drop-shadow-md">
            HOW IT WORKS
          </h2>
          <p className="mt-1.5 sm:mt-2 text-xs sm:text-base text-white/80 max-w-lg mx-auto font-sans font-medium px-2">
            Four steps from blank canvas to a plan you can actually use. Click a step to explore.
          </p>
        </div>

        {/* Point-to-Point Connected Interactive Bar */}
        <div className="w-full max-w-xl sm:max-w-2xl px-2 sm:px-6 mb-8 sm:mb-10 select-none">
          <div className="relative flex items-center justify-between">
            
            {/* Background Connecting Line */}
            <div className="absolute left-6 right-6 sm:left-8 sm:right-8 top-5 -translate-y-1/2 h-1 bg-white/15 rounded-full -z-0" />

            {/* Glowing Active Segment Line */}
            <div
              className="absolute left-6 sm:left-8 top-5 -translate-y-1/2 h-1 rounded-full -z-0 transition-all duration-500 ease-out"
              style={{
                width: `calc(${activeStep / (steps.length - 1)} * (100% - ${activeStep === 0 ? '0rem' : '3.5rem'}))`,
                backgroundColor: current.accentColor,
                boxShadow: `0 0 14px ${current.accentColor}`,
              }}
            />

            {/* 4 Clickable Step Nodes */}
            {steps.map((step, idx) => {
              const isActive = idx === activeStep;
              const isPassed = idx < activeStep;
              return (
                <button
                  key={step.num}
                  onClick={() => setActiveStep(idx)}
                  type="button"
                  aria-label={`Show step ${step.num}: ${step.title}`}
                  className="relative z-10 flex flex-col items-center group cursor-pointer focus:outline-none transition-transform duration-300 hover:scale-105 active:scale-95"
                >
                  {/* Point Circle Node */}
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-mono font-bold text-xs sm:text-sm transition-all duration-300 ${
                      isActive
                        ? 'scale-110 shadow-xl border-2'
                        : isPassed
                        ? 'bg-white/25 border border-white/40 text-white hover:bg-white/35'
                        : 'bg-black/40 border border-white/20 text-white/50 hover:bg-white/15 hover:text-white'
                    }`}
                    style={{
                      backgroundColor: isActive ? step.accentColor : undefined,
                      borderColor: isActive ? '#FFFFFF' : undefined,
                      color: isActive ? '#0A0A0B' : undefined,
                      boxShadow: isActive ? `0 0 24px ${step.glowColor}` : undefined,
                    }}
                  >
                    {step.num}
                  </div>

                  {/* Step Title Label */}
                  <span
                    className={`mt-2 text-xs sm:text-sm font-display font-bold tracking-tight transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-white/45 group-hover:text-white/80'
                    }`}
                  >
                    {step.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Glassmorphism Showcase Card (Updated with physics curves on click) */}
        <div className="w-full max-w-xl sm:max-w-2xl relative min-h-[240px] sm:min-h-[270px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="w-full liquid-glass rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 border border-white/30 shadow-[0_24px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl overflow-hidden relative"
              style={{
                willChange: 'transform, opacity, backdrop-filter',
              }}
            >
              {/* Internal Accent Glow */}
              <div
                className="absolute -top-16 -right-16 w-44 h-44 rounded-full blur-3xl pointer-events-none opacity-25 transition-all duration-700"
                style={{ backgroundColor: current.accentColor }}
              />

              {/* Top Row: STEP XX Badge + Progress indicators + Prev/Next controls */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/15">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full animate-pulse"
                    style={{ backgroundColor: current.accentColor }}
                  />
                  <span className="text-xs sm:text-sm font-mono font-bold tracking-widest text-white/90">
                    STEP {current.num}
                  </span>
                </div>

                {/* Right controls: Prev / Next buttons and mini indicators */}
                <div className="flex items-center gap-3">
                  <div className="hidden min-[380px]:flex items-center gap-1.5">
                    {steps.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveStep(idx)}
                        type="button"
                        aria-label={`Jump to step ${idx + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                          idx === activeStep ? 'w-6' : 'w-1.5 bg-white/20 hover:bg-white/40'
                        }`}
                        style={{
                          backgroundColor: idx === activeStep ? current.accentColor : undefined,
                        }}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={handlePrev}
                      type="button"
                      aria-label="Previous step"
                      className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white/80 hover:text-white transition-all cursor-pointer active:scale-95"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNext}
                      type="button"
                      aria-label="Next step"
                      className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white/80 hover:text-white transition-all cursor-pointer active:scale-95"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Step Content: Large Icon Badge + Monumental Title */}
              <div className="flex items-center gap-4 sm:gap-5 mb-4 sm:mb-5">
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shrink-0 border ${current.badgeBorder} shadow-lg transition-transform duration-300 p-2 sm:p-2.5`}
                  style={{
                    backgroundColor: `${current.accentColor}25`,
                  }}
                >
                  <Image
                    src={current.iconSrc}
                    alt=""
                    width={36}
                    height={36}
                    referrerPolicy="no-referrer"
                    className="w-[30px] h-[30px] sm:w-[36px] sm:h-[36px] object-contain select-none pointer-events-none"
                  />
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight font-display">
                    {current.title}
                  </h3>
                </div>
              </div>

              {/* Description Text */}
              <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed font-sans font-normal max-w-xl">
                {current.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
