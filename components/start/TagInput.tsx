'use client';

// components/start/TagInput.tsx
// Reusable TagInput component for Skills (Step 1) and Interests (Step 2):
// - Rounded near-white container box with focus ring when inner input is focused
// - Clicking anywhere in box focuses the inline input
// - Dynamic placeholder: "Type a skill/interest, press Enter" when empty, "Add another" after >= 1 tag
// - Inline text input flows and wraps with chips
// - Enter / comma / paste splitting
// - Backspace on empty input removes last chip
// - onBlur flushes pending typed text
// - Tapping suggestion adds chip & removes it from suggestion row; removing chip restores suggestion
// - Case-insensitive duplicate prevention: pulses existing chip once and announces via aria-live
// - Cut at 40 chars max; max 8 tags total
// - When 8 tags exist, hides input & suggestions and displays muted "That's plenty."
// - While text is typed: shows small "Add" button inside field and desktop "Enter ↵" hint
// - enterkeyhint="done"
// - scrollIntoView on focus for mobile keyboard visibility
// - Visually hidden aria-live="polite" region for accessibility announcements

import React, { useState, useRef, useEffect, useCallback } from 'react';
import TagChip from './TagChip';
import SuggestionRow, { TagSuggestion } from './SuggestionRow';
import { AlertCircle } from 'lucide-react';

interface TagInputProps {
  id: string;
  label: string;
  placeholder?: string;
  suggestions: TagSuggestion[];
  tags: string[];
  onChange: (tags: string[]) => void;
  maxTags?: number;
  maxTagLength?: number;
  error?: string;
  className?: string;
}

export default function TagInput({
  id,
  label,
  placeholder = 'Type a skill, press Enter',
  suggestions,
  tags = [],
  onChange,
  maxTags = 8,
  maxTagLength = 40,
  error,
  className = '',
}: TagInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [pulsingIndex, setPulsingIndex] = useState<number | null>(null);
  const [announcement, setAnnouncement] = useState<string>('');

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const errorId = error ? `${id}-error` : undefined;
  const inputId = `${id}-input`;

  const isMaxReached = tags.length >= maxTags;

  // Find suggestion color style if tag matches a suggestion (case-insensitive)
  const getTagColorStyle = useCallback(
    (tagText: string) => {
      const match = suggestions.find(
        (s) => s.text.toLowerCase() === tagText.toLowerCase()
      );
      if (match) {
        return {
          badgeBg: match.badgeBg,
          textColor: match.textColor,
          borderColor: match.borderColor,
        };
      }
      return null;
    },
    [suggestions]
  );

  // Available suggestions: exclude any that are already in tags (case-insensitive)
  const availableSuggestions = suggestions.filter(
    (s) => !tags.some((t) => t.toLowerCase() === s.text.toLowerCase())
  );

  // Core helper to add a single tag
  const addTag = useCallback(
    (rawText: string) => {
      const trimmed = rawText.trim().slice(0, maxTagLength);
      if (!trimmed) return false;

      // Check for duplicate (case-insensitive)
      const existingIndex = tags.findIndex(
        (t) => t.toLowerCase() === trimmed.toLowerCase()
      );
      if (existingIndex !== -1) {
        // Trigger pulse on the duplicate chip
        setPulsingIndex(existingIndex);
        setAnnouncement('Duplicate. Already added.');
        setTimeout(() => setPulsingIndex(null), 600);
        return false;
      }

      // Check max tags
      if (tags.length >= maxTags) {
        setAnnouncement('Maximum of 8 reached');
        return false;
      }

      const nextTags = [...tags, trimmed];
      onChange(nextTags);
      setAnnouncement(`Added ${trimmed}`);
      return true;
    },
    [tags, maxTags, maxTagLength, onChange]
  );

  // Add multiple tags (for comma separation or paste)
  const addMultipleTags = useCallback(
    (textChunk: string) => {
      const parts = textChunk.split(/[,\r\n]+/);
      let currentTags = [...tags];
      let addedAny = false;

      for (const part of parts) {
        const trimmed = part.trim().slice(0, maxTagLength);
        if (!trimmed) continue;

        const isDuplicate = currentTags.some(
          (t) => t.toLowerCase() === trimmed.toLowerCase()
        );
        if (isDuplicate) {
          const idx = currentTags.findIndex(
            (t) => t.toLowerCase() === trimmed.toLowerCase()
          );
          setPulsingIndex(idx);
          setAnnouncement('Duplicate. Already added.');
          setTimeout(() => setPulsingIndex(null), 600);
          continue;
        }

        if (currentTags.length >= maxTags) {
          setAnnouncement('Maximum of 8 reached');
          break;
        }

        currentTags.push(trimmed);
        setAnnouncement(`Added ${trimmed}`);
        addedAny = true;
      }

      if (addedAny) {
        onChange(currentTags);
      }
    },
    [tags, maxTags, maxTagLength, onChange]
  );

  // Handle removing a tag
  const removeTag = useCallback(
    (indexToRemove: number) => {
      const removedTag = tags[indexToRemove];
      const nextTags = tags.filter((_, idx) => idx !== indexToRemove);
      onChange(nextTags);
      if (removedTag) {
        setAnnouncement(`Removed ${removedTag}`);
      }
    },
    [tags, onChange]
  );

  // Handle key down events in input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // Must NEVER submit the form or navigate
      e.preventDefault();
      if (inputValue.trim()) {
        const added = addTag(inputValue);
        if (added) {
          setInputValue('');
        }
      }
      return;
    }

    if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
      e.preventDefault();
      removeTag(tags.length - 1);
      return;
    }
  };

  // Handle input change: check for comma
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    if (val.includes(',')) {
      addMultipleTags(val);
      setInputValue('');
    } else {
      setInputValue(val.slice(0, maxTagLength));
    }
  };

  // Handle paste: split by commas and newlines
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData('text');
    if (pasted && (pasted.includes(',') || pasted.includes('\n'))) {
      e.preventDefault();
      addMultipleTags(pasted);
      setInputValue('');
    }
  };

  // Flush pending typed text when input loses focus
  const handleBlur = () => {
    if (inputValue.trim()) {
      const added = addTag(inputValue);
      if (added) {
        setInputValue('');
      }
    }
  };

  // Scroll into view on mobile focus
  const handleFocus = () => {
    if (containerRef.current) {
      setTimeout(() => {
        containerRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }, 150);
    }
  };

  // Clicking anywhere in the outer box focuses the inner input
  const handleContainerClick = () => {
    if (!isMaxReached) {
      inputRef.current?.focus();
    }
  };

  const dynamicPlaceholder =
    tags.length > 0 ? 'Add another' : placeholder;

  return (
    <div className={`w-full text-left ${className}`}>
      {/* Accessible live region for screen reader updates */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      {/* Label Row */}
      <div className="flex items-baseline justify-between mb-2">
        <label
          htmlFor={inputId}
          className="text-base sm:text-lg font-bold text-stone-900 tracking-tight"
        >
          {label}
        </label>
      </div>

      {/* Outer rounded near-white box */}
      <div
        ref={containerRef}
        onClick={handleContainerClick}
        className={`w-full rounded-2xl p-3 sm:p-4 text-stone-900 leading-relaxed font-sans transition-all duration-200 cursor-text bg-white border-2 shadow-[inset_0_2px_4px_rgba(0,0,0,0.04)] ${
          error
            ? 'border-amber-400 bg-amber-50/20 focus-within:border-amber-500 focus-within:ring-4 focus-within:ring-amber-400/20'
            : 'border-stone-200/90 hover:border-stone-300 focus-within:border-[#FF5722] focus-within:ring-4 focus-within:ring-[#FF5722]/20 focus-within:-translate-y-0.5 focus-within:shadow-[0_8px_20px_rgba(255,87,34,0.15)]'
        }`}
      >
        <div className="flex flex-wrap items-center gap-2">
          {/* List of Chips */}
          {tags.length > 0 && (
            <ul role="list" className="flex flex-wrap items-center gap-2 m-0 p-0 list-none">
              {tags.map((tag, idx) => (
                <TagChip
                  key={`${tag}-${idx}`}
                  text={tag}
                  onRemove={() => removeTag(idx)}
                  colorStyle={getTagColorStyle(tag)}
                  isPulsing={pulsingIndex === idx}
                />
              ))}
            </ul>
          )}

          {/* Inline text input & Add button (Hidden when 8 tags reached) */}
          {!isMaxReached && (
            <div className="flex-1 flex items-center min-w-[150px] relative">
              <input
                ref={inputRef}
                id={inputId}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onPaste={handlePaste}
                onBlur={handleBlur}
                onFocus={handleFocus}
                maxLength={maxTagLength}
                placeholder={dynamicPlaceholder}
                enterKeyHint="done"
                aria-invalid={Boolean(error)}
                aria-describedby={errorId}
                className="w-full bg-transparent text-sm sm:text-base text-stone-900 placeholder-stone-400 outline-none border-none p-1 focus:ring-0"
              />

              {/* While text is typed: Show small Add button & desktop hint */}
              {inputValue.trim().length > 0 && (
                <div className="flex items-center gap-1.5 shrink-0 ml-1">
                  <span className="hidden sm:inline text-[11px] font-mono text-stone-400 select-none">
                    Enter ↵
                  </span>
                  <button
                    type="button"
                    onMouseDown={(e) => {
                      // Prevent input blur before click fires
                      e.preventDefault();
                    }}
                    onClick={() => {
                      if (inputValue.trim()) {
                        const added = addTag(inputValue);
                        if (added) {
                          setInputValue('');
                          inputRef.current?.focus();
                        }
                      }
                    }}
                    className="inline-flex items-center justify-center px-2.5 py-1 rounded-full bg-[#FF5722] hover:bg-[#E53E14] text-white text-xs font-bold transition-transform active:scale-95 shadow-sm"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Validation Error Message */}
      {error && (
        <div
          id={errorId}
          role="alert"
          className="mt-2 inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-amber-900 bg-amber-50 border border-amber-200/80 px-3.5 py-1.5 rounded-full shadow-sm"
        >
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Suggestion Row or "That's plenty." line */}
      {isMaxReached ? (
        <p className="mt-2.5 text-xs sm:text-sm text-stone-500 font-medium">
          That’s plenty.
        </p>
      ) : (
        <SuggestionRow
          suggestions={availableSuggestions}
          onSelect={(suggestion) => {
            addTag(suggestion.text);
          }}
          disabled={isMaxReached}
        />
      )}
    </div>
  );
}
