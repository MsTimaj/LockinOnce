
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import LoveVeeChatButton from "@/components/ai/LoveVeeChatButton";
import { UserStateManager } from "@/utils/userStateManager";
import { calculateRelationshipReadiness, getDominantPersonalityType, getTopStrengths } from "@/utils/assessmentScoring";
import AnalysisLoadingState from "@/components/ai-results/AnalysisLoadingState";
import AIResultsDisplay from "@/components/ai-results/AIResultsDisplay";

const AIResultsSummary = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [chatTopic, setChatTopic] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAnalysis = async () => {
      try {
        console.log('Initializing AI Results Summary...');
        
        // Clear any stuck navigation flags first
        UserStateManager.forceNavigationReset();
        
        // Small delay to ensure everything is settled
        await new Promise(resolve => setTimeout(resolve, 100));

        // Get user profile
        const userProfile = await UserStateManager.getUserProfile();
        if (!userProfile) {
          console.log('No user profile found, redirecting to onboarding...');
          navigate('/onboarding');
          return;
        }

        // Check completion status
        const hasCompleted = await UserStateManager.hasCompletedOnboarding();
        const isAssessmentComplete = await UserStateManager.isAssessmentComplete();
        
        console.log('Validation results:', { 
          hasCompleted, 
          isAssessmentComplete,
          hasAssessmentData: !!userProfile.assessmentResults
        });

        // If user hasn't completed onboarding but we're here, redirect
        if (!hasCompleted) {
          console.log('User has not completed onboarding, redirecting...');
          navigate('/onboarding');
          return;
        }

        // Proceed with analysis even if assessment isn't "complete" but has data
        console.log('Proceeding with analysis...');

        // Calculate or get cached readiness score
        let readinessScore = userProfile.readinessScore;
        if (!readinessScore && userProfile.assessmentResults) {
          console.log('Calculating readiness score from assessment data...');
          readinessScore = calculateRelationshipReadiness(userProfile.assessmentResults);
          await UserStateManager.saveReadinessScore(readinessScore);
        }

        if (!readinessScore) {
          throw new Error('No readiness score available and cannot calculate from assessment data');
        }

        const personalityType = getDominantPersonalityType(userProfile.assessmentResults.personality);
        const dominantStyle = userProfile.assessmentResults.attachmentStyle?.dominantStyle || 'secure';
        const topStrengths = getTopStrengths(userProfile.assessmentResults);

        console.log('Analysis data prepared:', { 
          hasReadinessScore: !!readinessScore, 
          personalityType, 
          dominantStyle 
        });

        setAnalysis({
          readinessScore,
          personalityType,
          dominantStyle,
          topStrengths
        });

        setIsInitializing(false);
      } catch (error) {
        console.error('Failed to initialize analysis:', error);
        setError('Failed to load your analysis. Please try refreshing the page.');
        setIsInitializing(false);
      }
    };

    initializeAnalysis();
  }, [navigate]);

  const handleLearnMore = (topic: string) => {
    setChatTopic(topic);
    setIsChatOpen(true);
  };

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="text-red-500 text-lg font-medium">{error}</div>
          <Button onClick={() => window.location.reload()} className="bg-rose-500 hover:bg-rose-600">
            Refresh Page
          </Button>
        </div>
      </div>
    );
  }

  // Loading states or analyzing
  if (isInitializing || isAnalyzing || !analysis) {
    return (
      <AnalysisLoadingState
        isInitializing={isInitializing}
        onAnalysisComplete={() => setIsAnalyzing(false)}
      />
    );
  }

  return (
    <>
      <AIResultsDisplay
        analysis={analysis}
        onLearnMore={handleLearnMore}
      />

      <LoveVeeChatButton 
        initialTopic={chatTopic}
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
        analysisData={analysis}
      />
    </>
  );
};

export default AIResultsSummary;
