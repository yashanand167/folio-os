"use client";

import { useState } from "react";
import ProgressBar from "@/components/customs/progress-bar";
import { CornerStrokes } from "@/components/corner-strokes";
import BasicInfo from "@/components/forms/basic.info";
import ExperienceEducationInfo from "@/components/forms/experience-education.info";
import SkillsInfo from "@/components/forms/skills.info";
import ProjectsInfo from "@/components/forms/projects.info";

export default function FormPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);

  const totalSteps = 4;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <main>
      <h1>form</h1>
    </main>
  );
}


