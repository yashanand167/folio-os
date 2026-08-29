"use client";

import { cn } from "@/lib/utils";

export type StepItem = {
  id: number;
  label: string;
  shortLabel?: string;
};

export const defaultSteps: StepItem[] = [
  { id: 1, label: "Basic Info", shortLabel: "Basic" },
  { id: 2, label: "Experience & Edu", shortLabel: "Experience" },
  { id: 3, label: "Skills", shortLabel: "Skills" },
  { id: 4, label: "Projects", shortLabel: "Projects" },
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
    <div className={cn("w-full flex flex-col gap-3 select-none", className)}>
      {/* Step Header info */}
      <div className="flex items-center justify-between text-xs text-neutral-400">
        <div className="flex items-center gap-1.5">
          <span className="text-white font-medium">Part {currentStep}</span>
          <span className="text-neutral-600">/</span>
          <span>{totalSteps}</span>
        </div>
        <span className="text-white/70 text-xs">
          {percentage}%
        </span>
      </div>

      {/* Progress Bar Line */}
      <div className="relative w-full h-[2px] bg-white/15">
        <div
          className="h-full bg-white transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Step Buttons Row */}
      <div className="grid grid-cols-4 gap-1.5 pt-1">
        {steps.map((step) => {
          const isCompleted = step.id < currentStep;
          const isActive = step.id === currentStep;

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => onStepClick?.(step.id)}
              className={cn(
                "group relative py-2 px-2 border text-left transition-colors outline-none cursor-pointer",
                isActive
                  ? "bg-white text-black border-white font-medium"
                  : isCompleted
                  ? "bg-neutral-900 border-white/20 text-white hover:bg-neutral-800"
                  : "bg-transparent border-white/10 text-neutral-500 hover:text-neutral-300 hover:border-white/20"
              )}
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] text-neutral-400">
                  0{step.id}
                </span>
                <span className="text-xs tracking-tight truncate">
                  {step.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}