'use client';

// components/start/StepInterests.tsx
// Step 2: "What pulls you in?"
// - Interests with reusable TagInput (chips, inline text input, suggestions row)
// - Problems you notice plain text area with muted "Optional" label

import React from 'react';
import TextField from './TextField';
import TagInput from './TagInput';
import { TagSuggestion } from './SuggestionRow';

const INTEREST_SUGGESTIONS: TagSuggestion[] = [
  {
    text: 'Fitness & workouts',
    badgeBg: 'bg-[#FFE4E6]',
    textColor: 'text-[#BE123C]',
    borderColor: 'border-[#FDA4AF]',
    rotation: 'rotate-0',
  },
  {
    text: 'Personal finance',
    badgeBg: 'bg-[#FEF3C7]',
    textColor: 'text-[#B45309]',
    borderColor: 'border-[#FCD34D]',
    rotation: 'rotate-0',
  },
  {
    text: 'Music & audio',
    badgeBg: 'bg-[#EDE9FE]',
    textColor: 'text-[#6D28D9]',
    borderColor: 'border-[#C4B5FD]',
    rotation: 'rotate-0',
  },
  {
    text: 'Houseplants & garden',
    badgeBg: 'bg-[#D1FAE5]',
    textColor: 'text-[#047857]',
    borderColor: 'border-[#6EE7B7]',
    rotation: 'rotate-0',
  },
  {
    text: 'Coffee & recipes',
    badgeBg: 'bg-[#FFEDD5]',
    textColor: 'text-[#C2410C]',
    borderColor: 'border-[#FDBA74]',
    rotation: 'rotate-0',
  },
];

interface StepInterestsProps {
  interests: string[];
  problems: string;
  errors: { interests?: string; problems?: string };
  onChange: (field: 'interests' | 'problems', value: any) => void;
}

export default function StepInterests({
  interests,
  problems,
  errors,
  onChange,
}: StepInterestsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-start">
      {/* Field 1: Interests (Reusable TagInput, max 8 tags, max 40 chars each) */}
      <TagInput
        id="field-interests"
        label="Interests"
        placeholder="Type an interest, press Enter"
        suggestions={INTEREST_SUGGESTIONS}
        tags={interests}
        onChange={(newTags) => onChange('interests', newTags)}
        maxTags={8}
        maxTagLength={40}
        error={errors.interests}
      />

      {/* Field 2: Problems you notice (Optional plain text area, max 400 chars) */}
      <TextField
        id="field-problems"
        label="Problems you notice"
        optionalHint="Optional"
        maxLength={400}
        value={problems}
        onChange={(val) => onChange('problems', val)}
        placeholder="e.g. Small shops struggle to keep track of orders."
        error={errors.problems}
        rows={3}
        className="mb-0"
      />
    </div>
  );
}
