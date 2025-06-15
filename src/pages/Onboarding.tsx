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
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isCompleting, setIsCompleting] = useState(false);
  const navigate = useNavigate();

  // Scroll to top when step changes
  useEffect(() => {
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });
  }, [currentStep]);

  useEffect(() => {
    const initializeOnboarding = async () => {
      try {
        console.log('Initializing onboarding...');
        
        // Check if navigation is already in progress
        if (UserStateManager.isNavigationInProgress()) {
          console.log('Navigation in progress, waiting...');
          return;
        }

        const hasCompleted = await UserStateManager.hasCompletedOnboarding();
        console.log('Has completed onboarding:', hasCompleted);
        
        if (hasCompleted) {
          console.log('User has completed onboarding, redirecting to AI results...');
          navigate('/ai-results');
          return;
        }

        const progress = await UserStateManager.getOnboardingProgress();
        console.log('Onboarding progress:', progress);
        
        // Convert phase/step to linear step index more accurately
        const stepIndex = Math.max(0, (progress.phase - 1) * 5 + (progress.step - 1));
        const finalStep = Math.min(stepIndex, 13); // Cap at 13 (0-13 = 14 steps)
        console.log('Setting current step to:', finalStep);
        setCurrentStep(finalStep);
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
    if (isCompleting) {
      console.log('Already completing, ignoring duplicate call');
      return;
    }

    try {
      console.log(`Step ${currentStep} completed with results:`, results);
      
      // Fixed assessment mapping - align with actual step indices
      const assessmentMap = [
        null, // Step 0: Welcome step
        'attachmentStyle', // Step 1
        'personality', // Step 2
        'birthOrder', // Step 3
        'relationshipIntent', // Step 4
        'emotionalCapacity', // Step 5
        'attractionLayer', // Step 6
        'physicalProximity', // Step 7
        'communicationStyle', // Step 8
        'lifeGoals', // Step 9
        'values', // Step 10
        'lifestyle', // Step 11
        'loveLanguages', // Step 12
        'financialValues' // Step 13
      ] as const;

      const assessmentType = assessmentMap[currentStep + 1];
      if (assessmentType) {
        console.log(`Saving assessment result for ${assessmentType}`);
        await UserStateManager.updateAssessmentResult(assessmentType, results);
      }

      const nextStep = currentStep + 1;
      console.log('Next step will be:', nextStep);
      
      // Update progress with simplified system
      const phase = Math.floor(nextStep / 5) + 1;
      const step = (nextStep % 5) + 1;
      await UserStateManager.updateOnboardingProgress(phase, step);

      if (nextStep >= assessments.length) {
        console.log('All assessments complete, starting final completion process...');
        setIsCompleting(true);
        
        try {
          // CRITICAL FIX: Get the most up-to-date profile
          const profile = await UserStateManager.getUserProfile();
          console.log('Profile for completion:', profile?.id);
          
          if (profile) {
            // Calculate readiness score from the complete assessment results
            console.log('Calculating readiness score...');
            const readinessScore = calculateRelationshipReadiness(profile.assessmentResults);
            console.log('Calculated readiness score:', readinessScore);
            
            // CRITICAL FIX: Use atomic completion method
            console.log('Completing onboarding atomically...');
            await UserStateManager.completeOnboardingWithReadinessScore(readinessScore);
            console.log('Onboarding completed successfully, navigating to AI results...');
            
            // Navigate after a brief delay to ensure state is saved
            setTimeout(() => {
              navigate('/ai-results');
            }, 500);
          } else {
            console.error('No profile found during completion');
            navigate('/ai-results');
          }
        } catch (completionError) {
          console.error('Failed to complete onboarding:', completionError);
          // Still navigate to prevent user being stuck
          navigate('/ai-results');
        }
      } else {
        console.log('Moving to next step:', nextStep);
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

  if (isCompleting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Completing your assessment...</p>
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
          {/* Subtle back button at the top */}
          <div className="mb-6">
            <Button 
              onClick={() => navigate('/')}
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground opacity-70 hover:opacity-100 transition-opacity"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
          </div>

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
