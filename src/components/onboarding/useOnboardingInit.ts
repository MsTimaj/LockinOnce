
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserStateManager } from "@/utils/userStateManager";

export const useOnboardingInit = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
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
        const finalStep = Math.min(stepIndex, 14); // Cap at 14 (0-14 = 15 steps)
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

  return { currentStep, setCurrentStep, isLoading };
};
