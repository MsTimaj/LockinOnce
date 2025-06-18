
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import LoveVeeChatButton from "@/components/ai/LoveVeeChatButton";
import { UserStateManager } from "@/utils/userStateManager";
import { calculateRelationshipReadiness, getDominantPersonalityType, getTopStrengths } from "@/utils/assessmentScoring";
import AnalysisLoadingState from "@/components/ai-results/AnalysisLoadingState";
import AIResultsDisplay from "@/components/ai-results/AIResultsDisplay";
import NavigationFooter from "@/components/dashboard/NavigationFooter";

const AIResultsSummary = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
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
          hasAssessmentData: !!userProfile.assessmentResults,
          hasReadinessScore: !!userProfile.readinessScore
        });

        // If user hasn't completed onboarding but we're here, redirect
        if (!hasCompleted) {
          console.log('User has not completed onboarding, redirecting...');
          navigate('/onboarding');
          return;
        }

        // Check if user already has analysis results
        if (userProfile.readinessScore) {
          console.log('User already has analysis results, showing directly...');
          
          const personalityType = getDominantPersonalityType(userProfile.assessmentResults.personality);
          const dominantStyle = userProfile.assessmentResults.attachmentStyle?.dominantStyle || 'secure';
          const topStrengths = getTopStrengths(userProfile.assessmentResults);

          setAnalysis({
            readinessScore: userProfile.readinessScore,
            personalityType,
            dominantStyle,
            topStrengths
          });
          
          setIsInitializing(false);
          setIsAnalyzing(false);
          return;
        }

        // For new users without readiness score, show the analysis sequence
        console.log('New user without analysis, starting analysis sequence...');

        // Calculate or get cached readiness score
        let readinessScore = userProfile.readinessScore;
        if (!readinessScore && userProfile.assessmentResults) {
          console.log('Calculating readiness score from assessment data...');
          setIsInitializing(false);
          setIsAnalyzing(true);
          
          // Simulate analysis time for new users
          await new Promise(resolve => setTimeout(resolve, 1000));
          
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
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center">
        {/* Mobile Error Layout */}
        <div className="lg:hidden px-4 w-full">
          <div className="max-w-sm w-full mx-auto text-center space-y-4">
            <div className="text-red-500 text-sm font-medium px-2">{error}</div>
            <Button 
              onClick={() => window.location.reload()} 
              className="bg-rose-500 hover:bg-rose-600 w-full min-h-[44px] px-4 py-3 text-sm"
            >
              Refresh Page
            </Button>
          </div>
        </div>

        {/* Desktop Error Layout */}
        <div className="hidden lg:block px-8 w-full">
          <div className="max-w-2xl w-full mx-auto text-center space-y-6">
            <div className="text-red-500 text-lg font-medium">{error}</div>
            <Button 
              onClick={() => window.location.reload()} 
              className="bg-rose-500 hover:bg-rose-600 min-h-[56px] px-8 py-4 text-base"
            >
              Refresh Page
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Loading states or analyzing (only for new users)
  if (isInitializing || isAnalyzing || !analysis) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
        <div className="pb-20 lg:pb-24">
          <AnalysisLoadingState
            isInitializing={isInitializing}
            onAnalysisComplete={() => setIsAnalyzing(false)}
          />
        </div>
        <NavigationFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      {/* Mobile Layout */}
      <div className="lg:hidden pb-20">
        <div className="w-full max-w-sm mx-auto px-3 overflow-x-hidden">
          <AIResultsDisplay
            analysis={analysis}
            onLearnMore={handleLearnMore}
          />
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block pb-12">
        <div className="max-w-4xl mx-auto px-8 py-8">
          <AIResultsDisplay
            analysis={analysis}
            onLearnMore={handleLearnMore}
          />
        </div>
      </div>

      <NavigationFooter />
      <LoveVeeChatButton 
        initialTopic={chatTopic}
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
        analysisData={analysis}
      />
    </div>
  );
};

export default AIResultsSummary;
