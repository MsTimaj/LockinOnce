
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOnboardingInit } from "@/components/onboarding/useOnboardingInit";
import { useStepCompletion } from "@/components/onboarding/useStepCompletion";
import { createAssessments } from "@/components/onboarding/assessmentConfig";
import OnboardingProgressBar from "@/components/onboarding/OnboardingProgressBar";
import { 
  OnboardingLoadingState, 
  CompletingLoadingState, 
  AssessmentNotFoundState 
} from "@/components/onboarding/OnboardingLoadingStates";

const Onboarding = () => {
  const navigate = useNavigate();
  const { currentStep, setCurrentStep, isLoading } = useOnboardingInit();
  
  const assessments = createAssessments((results: any) => handleStepComplete(results));
  const { handleStepComplete, isCompleting } = useStepCompletion(currentStep, setCurrentStep, assessments.length);

  if (isLoading) {
    return <OnboardingLoadingState />;
  }

  if (isCompleting) {
    return <CompletingLoadingState />;
  }

  const CurrentAssessment = assessments[currentStep]?.component;
  const currentAssessmentData = assessments[currentStep];

  if (!CurrentAssessment || !currentAssessmentData) {
    return <AssessmentNotFoundState />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background">
      {/* Mobile Layout */}
      <div className="lg:hidden container mx-auto px-4 py-4">
        <div className="max-w-sm mx-auto">
          <div className="mb-4">
            <Button 
              onClick={() => navigate('/')}
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground opacity-70 hover:opacity-100 transition-opacity min-h-[44px] px-3"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span className="text-sm">Back</span>
            </Button>
          </div>

          <OnboardingProgressBar 
            currentStep={currentStep} 
            totalSteps={assessments.length} 
          />

          <div className="px-2">
            <CurrentAssessment onComplete={currentAssessmentData.onComplete} />
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block container mx-auto px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Button 
              onClick={() => navigate('/')}
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground opacity-70 hover:opacity-100 transition-opacity min-h-[44px] px-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span className="text-base">Back</span>
            </Button>
          </div>

          <OnboardingProgressBar 
            currentStep={currentStep} 
            totalSteps={assessments.length} 
          />

          <div className="mt-8">
            <CurrentAssessment onComplete={currentAssessmentData.onComplete} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
