"use client";

import { cn } from "@/lib/utils";

export type StepItem = {
  id: number;
  label: string;
  shortLabel?: string;
};

export const defaultSteps: StepItem[] = [
  { id: 1, label: "Basic info", shortLabel: "Basic" },
  { id: 2, label: "Experience", shortLabel: "Work" },
  { id: 3, label: "Skills", shortLabel: "Skills" },
  { id: 4, label: "Template", shortLabel: "Template" },
];

interface ProgressBarProps {
  currentStep?: number;
  totalSteps?: number;
  steps?: StepItem[];
  onStepClick?: (step: number) => void;
  className?: string;
}

export default function ProgressBar({
  currentStep = 1,
  totalSteps = 4,
  steps = defaultSteps,
  onStepClick,
  className,
}: ProgressBarProps) {
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className={cn("flex w-full select-none flex-col gap-3", className)}>
      <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
        <span>
          Step {currentStep} of {totalSteps}
        </span>
        <span className="font-medium text-black dark:text-white">
          {percentage}%
        </span>
      </div>

      <div className="relative h-1 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-white/15">
        <div
          className="h-full rounded-full bg-black transition-all duration-300 ease-out dark:bg-white"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="flex items-center">
        {steps.map((step, index) => {
          const isCompleted = step.id < currentStep;
          const isActive = step.id === currentStep;

          return (
            <div key={step.id} className="flex flex-1 items-center last:flex-none">
              <button
                type="button"
                onClick={() => onStepClick?.(step.id)}
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full border text-sm outline-none transition-colors",
                  isActive
                    ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                    : isCompleted
                      ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                      : "border-black/20 bg-transparent text-neutral-400 hover:border-black/40 dark:border-white/20 dark:hover:border-white/40",
                )}
                aria-current={isActive ? "step" : undefined}
                aria-label={`${step.label}, ${Math.round((step.id / totalSteps) * 100)}%`}
              >
                {step.id}
              </button>
              {index < steps.length - 1 ? (
                <div
                  className={cn(
                    "mx-2 h-px flex-1",
                    step.id < currentStep
                      ? "bg-black dark:bg-white"
                      : "bg-black/15 dark:bg-white/15",
                  )}
                />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
