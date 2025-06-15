
import React from "react";

interface LoadingStateProps {
  message: string;
}

const LoadingState = ({ message }: LoadingStateProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">{message}</p>
      </div>
    </div>
  );
};

export const OnboardingLoadingState = () => (
  <LoadingState message="Loading your progress..." />
);

export const CompletingLoadingState = () => (
  <LoadingState message="Completing your assessment..." />
);

export const AssessmentNotFoundState = () => (
  <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background flex items-center justify-center">
    <div className="text-center">
      <p className="text-muted-foreground">Assessment not found</p>
    </div>
  </div>
);
