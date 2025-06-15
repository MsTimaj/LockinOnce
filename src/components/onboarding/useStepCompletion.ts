
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserStateManager } from "@/utils/userStateManager";
import { calculateRelationshipReadiness } from "@/utils/assessmentScoring";
import { assessmentMap } from "./assessmentConfig";

export const useStepCompletion = (currentStep: number, setCurrentStep: (step: number) => void, assessmentsLength: number) => {
  const [isCompleting, setIsCompleting] = useState(false);
  const navigate = useNavigate();

  const handleStepComplete = async (results: any) => {
    if (isCompleting) {
      console.log('Already completing, ignoring duplicate call');
      return;
    }

    try {
      console.log(`Step ${currentStep} completed with results:`, results);
      
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

      if (nextStep >= assessmentsLength) {
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
      if (nextStep >= assessmentsLength) {
        navigate('/ai-results');
      } else {
        setCurrentStep(nextStep);
      }
    }
  };

  return { handleStepComplete, isCompleting };
};
