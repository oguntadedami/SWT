'use client';

// components/FormContext.tsx
// App-level shared state provider holding form answers across routes:
// - Holds skills, interests, problems, experience, technicalComfort, buildType, timeAvailable
// - Mirrors state to sessionStorage (never localStorage, cookies, or server) with try/catch safety
// - Restores state on initial client load if present
// - Sanitizes all restored values as untrusted plain strings
// - Provides clearAnswers() to empty both state and sessionStorage

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

export interface FormAnswers {
  skills: string[];
  interests: string[];
  problems: string;
  experience: string;
  technicalComfort: string;
  buildType: string;
  timeAvailable: string;
}

export const EMPTY_FORM_ANSWERS: FormAnswers = {
  skills: [],
  interests: [],
  problems: '',
  experience: '',
  technicalComfort: '',
  buildType: '',
  timeAvailable: '',
};

const SESSION_STORAGE_KEY = 'start_with_this_answers';

interface FormContextType {
  answers: FormAnswers;
  setAnswer: <K extends keyof FormAnswers>(field: K, value: FormAnswers[K]) => void;
  setAllAnswers: (answers: FormAnswers) => void;
  clearAnswers: () => void;
  isHydrated: boolean;
}

const FormContext = createContext<FormContextType | null>(null);

function sanitizeString(val: unknown, maxLen = 1000): string {
  if (typeof val !== 'string') return '';
  // Plain text only, trim excess length if abnormal
  return val.slice(0, maxLen);
}

// Convert string[] or legacy comma/newline-delimited string to string[] (max 8 items, max 40 chars each)
function sanitizeStringList(val: unknown, maxItems = 8, maxLen = 40): string[] {
  const result: string[] = [];
  const seen = new Set<string>();

  const rawList: string[] = Array.isArray(val)
    ? val.filter((item): item is string => typeof item === 'string')
    : typeof val === 'string'
    ? val.split(/[,\r\n]+/)
    : [];

  for (const item of rawList) {
    const trimmed = item.trim().slice(0, maxLen);
    const lower = trimmed.toLowerCase();
    if (trimmed && !seen.has(lower)) {
      seen.add(lower);
      result.push(trimmed);
      if (result.length >= maxItems) break;
    }
  }

  return result;
}

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [answers, setAnswers] = useState<FormAnswers>(EMPTY_FORM_ANSWERS);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  // Restore from sessionStorage on initial client mount
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        const stored = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && typeof parsed === 'object') {
            const restored: FormAnswers = {
              skills: sanitizeStringList(parsed.skills, 8, 40),
              interests: sanitizeStringList(parsed.interests, 8, 40),
              problems: sanitizeString(parsed.problems, 400),
              experience: sanitizeString(parsed.experience, 400),
              technicalComfort: sanitizeString(parsed.technicalComfort, 50),
              buildType: sanitizeString(parsed.buildType, 50),
              timeAvailable: sanitizeString(parsed.timeAvailable, 50),
            };
            requestAnimationFrame(() => {
              setAnswers(restored);
            });
          }
        }
      }
    } catch {
      // Gracefully ignore storage failures (private mode, SSR, quota)
    }
  }, []);

  // Update a single field and mirror to sessionStorage
  const setAnswer = useCallback(<K extends keyof FormAnswers>(field: K, value: FormAnswers[K]) => {
    setAnswers((prev) => {
      const next = { ...prev, [field]: value };
      try {
        if (typeof window !== 'undefined' && window.sessionStorage) {
          window.sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(next));
        }
      } catch {
        // Storage unavailable or disabled; continue working in-memory
      }
      return next;
    });
  }, []);

  // Set all answers at once
  const setAllAnswers = useCallback((newAnswers: FormAnswers) => {
    setAnswers(newAnswers);
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        window.sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(newAnswers));
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Clear answers from memory and sessionStorage
  const clearAnswers = useCallback(() => {
    setAnswers(EMPTY_FORM_ANSWERS);
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        window.sessionStorage.removeItem(SESSION_STORAGE_KEY);
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  return (
    <FormContext.Provider
      value={{
        answers,
        setAnswer,
        setAllAnswers,
        clearAnswers,
        isHydrated,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormAnswers() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormAnswers must be used within a FormProvider');
  }
  return context;
}
