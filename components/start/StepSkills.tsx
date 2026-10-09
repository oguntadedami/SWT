'use client';

// components/start/StepSkills.tsx
// Step 1: "What are you good at?"
// - Skills with reusable TagInput (chips, inline text input, suggestions row)
// - Past experience plain text area with muted "Optional" label

import React from 'react';
import TextField from './TextField';
import TagInput from './TagInput';
import { TagSuggestion } from './SuggestionRow';

const SKILL_SUGGESTIONS: TagSuggestion[] = [
  {
    text: 'Writing & copy',
    badgeBg: 'bg-[#FFEDD5]',
    textColor: 'text-[#C2410C]',
    borderColor: 'border-[#FDBA74]',
    rotation: 'rotate-0',
  },
  {
    text: 'Figma & UI design',
    badgeBg: 'bg-[#E0F2FE]',
    textColor: 'text-[#0369A1]',
    borderColor: 'border-[#7DD3FC]',
    rotation: 'rotate-0',
  },
  {
    text: 'Spreadsheets & Excel',
    badgeBg: 'bg-[#D1FAE5]',
    textColor: 'text-[#047857]',
    borderColor: 'border-[#6EE7B7]',
    rotation: 'rotate-0',
  },
  {
    text: 'Customer support',
    badgeBg: 'bg-[#EDE9FE]',
    textColor: 'text-[#6D28D9]',
    borderColor: 'border-[#C4B5FD]',
    rotation: 'rotate-0',
  },
  {
    text: 'Organizing events',
    badgeBg: 'bg-[#FEF3C7]',
    textColor: 'text-[#B45309]',
    borderColor: 'border-[#FCD34D]',
    rotation: 'rotate-0',
  },
];

interface StepSkillsProps {
  skills: string[];
  experience: string;
  errors: { skills?: string; experience?: string };
  onChange: (field: 'skills' | 'experience', value: any) => void;
}

export default function StepSkills({
  skills,
  experience,
  errors,
  onChange,
}: StepSkillsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-start">
      {/* Field 1: Skills (Reusable TagInput, max 8 tags, max 40 chars each) */}
      <TagInput
        id="field-skills"
        label="Skills"
        placeholder="Type a skill, press Enter"
        suggestions={SKILL_SUGGESTIONS}
        tags={skills}
        onChange={(newTags) => onChange('skills', newTags)}
        maxTags={8}
        maxTagLength={40}
        error={errors.skills}
      />

      {/* Field 2: Past Experience (Optional plain text area, max 400 chars) */}
      <TextField
        id="field-experience"
        label="Past experience"
        optionalHint="Optional"
        maxLength={400}
        value={experience}
        onChange={(val) => onChange('experience', val)}
        placeholder="e.g. I've run a small newsletter and helped a friend set up a website."
        error={errors.experience}
        rows={3}
        className="mb-0"
      />
    </div>
  );
}
