"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import ProgressBar, { defaultSteps } from "@/components/customs/progress-bar";
import { ThemeToggle } from "@/components/theme-toggle";
import BasicInfo from "@/components/forms/basic.info";
import ExperienceEducationInfo from "@/components/forms/experience-education.info";
import SkillsInfo from "@/components/forms/skills.info";
import TemplateInfo from "@/components/forms/template.info";
import { usePortfolioStore } from "@/stores/portfolio.store";

const totalSteps = 4;

export default function FormPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const name = usePortfolioStore((state) => state.draft.name ?? "");
  const profession = usePortfolioStore((state) => state.draft.profession ?? "");
  const portfolioType = usePortfolioStore((state) => state.draft.portfolioType);

  const handleNext = () => {
    if (currentStep === 1 && (!name.trim() || !profession.trim())) {
      setError("Add your name and profession to continue.");
      return;
    }

    if (currentStep === totalSteps) {
      if (!portfolioType) {
        setError("Pick a template to finish.");
        return;
      }
      router.push("/dashboard");
      return;
    }

    setError(null);
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setError(null);
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="flex min-h-full flex-col px-4 py-5 sm:px-6 sm:py-6">
      <header className="flex items-center justify-between">
        <Link
          href="/home"
          className="text-lg font-medium tracking-tight text-black dark:text-white"
        >
          Folio.OS
        </Link>
        <ThemeToggle />
      </header>

      <div className="flex flex-1 items-start justify-center py-10 sm:items-center">
        <div className="w-full max-w-xl rounded-2xl bg-white p-5 sm:p-8 dark:bg-neutral-900">
          <ProgressBar
            currentStep={currentStep}
            totalSteps={totalSteps}
            steps={defaultSteps}
            onStepClick={(step) => {
              setError(null);
              setCurrentStep(step);
            }}
          />

          <div className="mt-8">
            {currentStep === 1 ? <BasicInfo /> : null}
            {currentStep === 2 ? <ExperienceEducationInfo /> : null}
            {currentStep === 3 ? <SkillsInfo /> : null}
            {currentStep === 4 ? <TemplateInfo /> : null}
          </div>

          {error ? (
            <p className="mt-4 text-sm text-red-600 dark:text-red-400">{error}</p>
          ) : null}

          <div className="mt-8 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="rounded-lg border border-black/15 px-4 py-2 text-sm text-black disabled:opacity-40 dark:border-white/20 dark:text-white"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="rounded-lg bg-black px-4 py-2 text-sm text-white dark:bg-white dark:text-black"
            >
              {currentStep === totalSteps ? "Finish" : "Continue"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
