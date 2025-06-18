
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserStateManager } from "@/utils/userStateManager";

export const useOnboardingInit = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Enhanced scroll to top when step changes - mobile optimized
  useEffect(() => {
    console.log('Step changed to:', currentStep, '- scrolling to top (mobile optimized)');
    
    const scrollToTop = () => {
      // Method 1: Standard window scroll with smooth behavior for mobile
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      
      // Method 2: Document element scroll
      if (document.documentElement) {
        document.documentElement.scrollTop = 0;
      }
      
      // Method 3: Body scroll
      if (document.body) {
        document.body.scrollTop = 0;
      }
      
      // Method 4: Mobile-specific viewport meta handling
      const viewportMeta = document.querySelector('meta[name="viewport"]');
      if (viewportMeta) {
        // Force a slight viewport refresh on mobile
        const content = viewportMeta.getAttribute('content');
        viewportMeta.setAttribute('content', content + ', user-scalable=no');
        setTimeout(() => {
          viewportMeta.setAttribute('content', content || 'width=device-width, initial-scale=1');
        }, 1);
      }
    };

    // Method 5: Force scroll using multiple timing strategies for mobile
    const forceScrollSequence = () => {
      // Immediate scroll
      scrollToTop();
      
      // Animation frame scroll (for React state updates)
      requestAnimationFrame(() => {
        scrollToTop();
      });
      
      // Short delay scroll (for DOM rendering)
      setTimeout(() => {
        scrollToTop();
      }, 10);
      
      // Medium delay scroll (for mobile browsers)
      setTimeout(() => {
        scrollToTop();
      }, 50);
      
      // Longer delay for stubborn mobile browsers
      setTimeout(() => {
        scrollToTop();
      }, 100);
      
      // Final attempt with focus management for mobile
      setTimeout(() => {
        // Remove focus from any active elements that might prevent scroll
        if (document.activeElement && document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
        scrollToTop();
      }, 150);
    };

    forceScrollSequence();
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
