'use client';

// app/start/page.tsx
// 3-step input form for "Start With This":
// - Step 1: What are you good at? (Skills, Past experience)
// - Step 2: What pulls you in? (Interests, Problems you notice)
// - Step 3: Your setup (Technical comfort, What to build, Time available)
//
// Answers persist across the whole journey via app-level FormProvider and sessionStorage.
// Steps transition with a 300ms directional slide and fade.

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import FormShell from '@/components/start/FormShell';
import StepSkills from '@/components/start/StepSkills';
import StepInterests from '@/components/start/StepInterests';
import StepSetup from '@/components/start/StepSetup';
import { useFormAnswers, FormAnswers } from '@/components/FormContext';

export default function StartPage() {
  const router = useRouter();
  const { answers, setAnswer } = useFormAnswers();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFieldChange = <K extends keyof FormAnswers>(field: K, value: FormAnswers[K]) => {
    // Treat strictly as plain text / array of plain text
    setAnswer(field, value);
    // Clear error for this field if user begins typing/selecting
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateStep = (step: number): boolean => {
    const stepErrors: Record<string, string> = {};

    if (step === 1) {
      if (!answers.skills || answers.skills.length === 0) {
        stepErrors.skills = 'Add at least one skill to continue';
      }
    } else if (step === 2) {
      if (!answers.interests || answers.interests.length === 0) {
        stepErrors.interests = 'Add at least one interest to continue';
      }
    } else if (step === 3) {
      if (!answers.technicalComfort) {
        stepErrors.technicalComfort = 'Pick your comfort level with coding or tech';
      }
      if (!answers.buildType) {
        stepErrors.buildType = 'Choose what type of project you want to build';
      }
      if (!answers.timeAvailable) {
        stepErrors.timeAvailable = 'Select how much time you have available';
      }
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleContinue = () => {
    if (!validateStep(currentStep)) {
      return;
    }

    if (currentStep < 3) {
      setDirection('forward');
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Step 3 submission: navigate to placeholder /generating route
      router.push('/generating');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setErrors({});
      setDirection('backward');
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push('/');
    }
  };

  return (
    <FormShell
      currentStep={currentStep}
      direction={direction}
      totalSteps={3}
      onBack={handleBack}
      onSubmit={handleContinue}
    >
      {currentStep === 1 && (
        <StepSkills
          skills={answers.skills}
          experience={answers.experience}
          errors={errors}
          onChange={handleFieldChange}
        />
      )}

      {currentStep === 2 && (
        <StepInterests
          interests={answers.interests}
          problems={answers.problems}
          errors={errors}
          onChange={handleFieldChange}
        />
      )}

      {currentStep === 3 && (
        <StepSetup
          technicalComfort={answers.technicalComfort}
          buildType={answers.buildType}
          timeAvailable={answers.timeAvailable}
          errors={errors}
          onChange={handleFieldChange}
        />
      )}
    </FormShell>
  );
}
