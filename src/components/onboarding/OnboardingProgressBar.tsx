
import React from "react";

interface OnboardingProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const OnboardingProgressBar = ({ currentStep, totalSteps }: OnboardingProgressBarProps) => {
  // Progress should only reach 100% when all steps are completed
  // Current step is 0-indexed, so progress = currentStep / totalSteps * 100
  // This ensures we don't reach 100% until we're past the last step
  const progressPercentage = Math.min((currentStep / totalSteps) * 100, 95);

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-sm font-medium text-muted-foreground">
          Step {currentStep + 1} of {totalSteps}
        </h1>
        <span className="text-sm text-muted-foreground">
          {Math.round(progressPercentage)}%
        </span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
};

export default OnboardingProgressBar;
