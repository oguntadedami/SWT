'use client';

// components/start/TextField.tsx
// High-readability input field inside the bright frosted glass panel:
// - Near-white background with soft inner shadow
// - Large readable dark text (16px+ to prevent iOS zoom)
// - Bold, clear labels and readable helper copy
// - Orange accent focus ring with a slight lift
// - Subtle character counter turning warm orange when near limit
// - Gentle, friendly inline validation messages

import React from 'react';
import { AlertCircle } from 'lucide-react';

interface TextFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength: number;
  required?: boolean;
  optionalHint?: string;
  helperText?: string;
  error?: string;
  rows?: number;
  className?: string;
  children?: React.ReactNode;
}

export default function TextField({
  id,
  label,
  value,
  onChange,
  placeholder,
  maxLength,
  optionalHint,
  helperText,
  error,
  rows = 3,
  className,
  children,
}: TextFieldProps) {
  const currentLength = (value || '').length;
  const remainingChars = maxLength - currentLength;
  const showCounter = remainingChars < 50;
  const errorId = error ? `${id}-error` : undefined;
  const helperId = helperText ? `${id}-helper` : undefined;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value.slice(0, maxLength);
    onChange(val);
  };

  return (
    <div className={`w-full text-left ${className !== undefined ? className : 'mb-4 sm:mb-5'}`}>
      {/* Label Row */}
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
        <label
          htmlFor={id}
          className="text-base sm:text-lg font-bold text-stone-900 tracking-tight"
        >
          {label}
        </label>

        {optionalHint && (
          <span className="text-xs sm:text-sm text-stone-400 font-normal">
            {optionalHint}
          </span>
        )}
      </div>

      {helperText && (
        <p id={helperId} className="text-sm text-stone-600 mb-2.5 leading-relaxed font-medium">
          {helperText}
        </p>
      )}

      {/* Near-white Input Box */}
      <div className="relative">
        <textarea
          id={id}
          rows={rows}
          value={value}
          onChange={handleChange}
          maxLength={maxLength}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={[errorId, helperId].filter(Boolean).join(' ') || undefined}
          className={`w-full rounded-2xl p-4 sm:p-5 text-base sm:text-lg text-stone-900 placeholder-stone-400 leading-relaxed font-sans transition-all duration-200 resize-none bg-white border-2 shadow-[inset_0_2px_4px_rgba(0,0,0,0.04)] ${
            error
              ? 'border-amber-400 bg-amber-50/20 focus:border-amber-500 focus:ring-4 focus:ring-amber-400/20'
              : 'border-stone-200/90 hover:border-stone-300 focus:border-[#FF5722] focus:ring-4 focus:ring-[#FF5722]/20 focus:-translate-y-0.5 focus:shadow-[0_8px_20px_rgba(255,87,34,0.15)]'
          } focus-visible:outline-none`}
        />

        {/* Character Counter: only when fewer than 50 characters remain */}
        {showCounter && (
          <div className="flex justify-end mt-1.5 px-1">
            <span
              className={`text-xs font-mono tracking-wider transition-colors duration-200 ${
                remainingChars <= 15 ? 'text-[#FF5722] font-bold' : 'text-stone-400 font-medium'
              }`}
              aria-live="polite"
            >
              {remainingChars} left
            </span>
          </div>
        )}
      </div>

      {/* Gentle Friendly Validation Message */}
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

      {/* Example Chips Slot */}
      {children}
    </div>
  );
}
