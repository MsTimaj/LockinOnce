import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserStateManager } from "@/utils/userStateManager";

export const useOnboardingInit = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Enhanced scroll to top when step changes
  useEffect(() => {
    console.log('Step changed to:', currentStep, '- scrolling to top');
    
    // Multiple approaches to ensure scroll works
    const scrollToTop = () => {
      // Method 1: Standard window scroll
      window.scrollTo(0, 0);
      
      // Method 2: Document element scroll
      if (document.documentElement) {
        document.documentElement.scrollTop = 0;
      }
      
      // Method 3: Body scroll
      if (document.body) {
        document.body.scrollTop = 0;
      }
      
      // Method 4: Force scroll with small delay
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }, 10);
    };

    // Execute immediately
    scrollToTop();
    
    // Also execute after animation frame to ensure DOM is ready
    requestAnimationFrame(() => {
      scrollToTop();
    });
    
    // Backup scroll after a short delay
    setTimeout(scrollToTop, 50);
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
