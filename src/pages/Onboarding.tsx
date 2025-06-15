
import React, { useState, useEffect } from "react";
import { UserStateManager } from "@/utils/userStateManager";
import WelcomePhilosophyAssessment from "@/components/assessments/WelcomePhilosophyAssessment";
import AttachmentStyleAssessment from "@/components/assessments/AttachmentStyleAssessment";
import PersonalityAssessment from "@/components/assessments/PersonalityAssessment";
import BirthOrderAssessment from "@/components/assessments/BirthOrderAssessment";
import RelationshipIntentAssessment from "@/components/assessments/RelationshipIntentAssessment";
import EmotionalCapacityAssessment from "@/components/assessments/EmotionalCapacityAssessment";
import AttractionLayerAssessment from "@/components/assessments/AttractionLayerAssessment";
import PhysicalProximityAssessment from "@/components/assessments/PhysicalProximityAssessment";
import CommunicationStyleAssessment from "@/components/assessments/CommunicationStyleAssessment";
import LifeGoalsAssessment from "@/components/assessments/LifeGoalsAssessment";
import ValuesAssessment from "@/components/assessments/ValuesAssessment";
import LifestyleCompatibilityAssessment from "@/components/assessments/LifestyleCompatibilityAssessment";
import LoveLanguagesAssessment from "@/components/assessments/LoveLanguagesAssessment";
import FinancialValuesAssessment from "@/components/assessments/FinancialValuesAssessment";
import { calculateRelationshipReadiness } from "@/utils/assessmentScoring";
import { useNavigate } from "react-router-dom";

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  useEffect(() => {
    const initializeOnboarding = async () => {
      try {
        const hasCompleted = await UserStateManager.hasCompletedOnboarding();
        if (hasCompleted) {
          // If onboarding is complete, go to AI results instead of dashboard
          navigate('/ai-results');
          return;
        }

        const progress = await UserStateManager.getOnboardingProgress();
        // Convert phase/step to linear step index
        const stepIndex = (progress.phase - 1) * 5 + (progress.step - 1);
        setCurrentStep(stepIndex);
      } catch (error) {
        console.error('Failed to initialize onboarding:', error);
        setCurrentStep(0);
      } finally {
        setIsLoading(false);
      }
    };

    initializeOnboarding();
  }, [navigate]);

  const handleStepComplete = async (results: any) => {
    try {
      console.log(`Step ${currentStep} completed with results:`, results);
      
      // Save the assessment result based on current step
      const assessmentMap = [
        null, // Welcome step
        'attachmentStyle',
        'personality', 
        'birthOrder',
        'relationshipIntent',
        'emotionalCapacity',
        'attractionLayer',
        'physicalProximity',
        'communicationStyle',
        'lifeGoals',
        'values',
        'lifestyle',
        'loveLanguages',
        'financialValues'
      ] as const;

      const assessmentType = assessmentMap[currentStep + 1];
      if (assessmentType) {
        await UserStateManager.updateAssessmentResult(assessmentType, results);
      }

      const nextStep = currentStep + 1;
      
      // Update progress
      const phase = Math.floor(nextStep / 5) + 1;
      const step = (nextStep % 5) + 1;
      await UserStateManager.updateOnboardingProgress(phase, step);

      if (nextStep >= assessments.length) {
        // Complete onboarding and calculate readiness score
        await UserStateManager.markOnboardingComplete();
        
        const profile = await UserStateManager.getUserProfile();
        if (profile) {
          const readinessScore = calculateRelationshipReadiness(profile.assessmentResults);
          await UserStateManager.saveReadinessScore(readinessScore);
        }
        
        // Navigate to AI results page to show analysis
        navigate('/ai-results');
      } else {
        setCurrentStep(nextStep);
      }
    } catch (error) {
      console.error('Failed to complete step:', error);
      // Continue with UI update even if save fails
      const nextStep = currentStep + 1;
      if (nextStep >= assessments.length) {
        navigate('/ai-results');
      } else {
        setCurrentStep(nextStep);
      }
    }
  };

  const assessments = [
    { 
      component: WelcomePhilosophyAssessment, 
      title: "Welcome",
      onComplete: () => handleStepComplete(null)
    },
    { 
      component: AttachmentStyleAssessment, 
      title: "Attachment Style",
      onComplete: handleStepComplete
    },
    { 
      component: PersonalityAssessment, 
      title: "Personality",
      onComplete: handleStepComplete
    },
    { 
      component: BirthOrderAssessment, 
      title: "Birth Order",
      onComplete: handleStepComplete
    },
    { 
      component: RelationshipIntentAssessment, 
      title: "Relationship Intent",
      onComplete: handleStepComplete
    },
    { 
      component: EmotionalCapacityAssessment, 
      title: "Emotional Capacity",
      onComplete: handleStepComplete
    },
    { 
      component: AttractionLayerAssessment, 
      title: "Attraction Layer",
      onComplete: handleStepComplete
    },
    { 
      component: PhysicalProximityAssessment, 
      title: "Physical Proximity",
      onComplete: handleStepComplete
    },
    { 
      component: CommunicationStyleAssessment, 
      title: "Communication Style",
      onComplete: handleStepComplete
    },
    { 
      component: LifeGoalsAssessment, 
      title: "Life Goals",
      onComplete: handleStepComplete
    },
    { 
      component: ValuesAssessment, 
      title: "Values",
      onComplete: handleStepComplete
    },
    { 
      component: LifestyleCompatibilityAssessment, 
      title: "Lifestyle",
      onComplete: handleStepComplete
    },
    { 
      component: LoveLanguagesAssessment, 
      title: "Love Languages",
      onComplete: handleStepComplete
    },
    { 
      component: FinancialValuesAssessment, 
      title: "Financial Values",
      onComplete: handleStepComplete
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your progress...</p>
        </div>
      </div>
    );
  }

  const CurrentAssessment = assessments[currentStep]?.component;
  const currentAssessmentData = assessments[currentStep];

  if (!CurrentAssessment || !currentAssessmentData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Assessment not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-sm font-medium text-muted-foreground">
                Step {currentStep + 1} of {assessments.length}
              </h1>
              <span className="text-sm text-muted-foreground">
                {Math.round(((currentStep + 1) / assessments.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / assessments.length) * 100}%` }}
              />
            </div>
          </div>

          <CurrentAssessment onComplete={currentAssessmentData.onComplete} />
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
