
import { useState, useEffect } from "react";
import { MatchProfile } from "@/utils/compatibilityCalculator";
import { generateCompatibleMatches } from "@/utils/compatibilityCalculator";
import { UserStateManager } from "@/utils/userStateManager";
import { MatchStorageManager } from "@/utils/storage/matchStorageManager";
import { MatchPoolManager } from "@/utils/compatibility/matchPoolManager";
import { useNavigate } from "react-router-dom";

export const useDashboard = () => {
  const [selectedMatch, setSelectedMatch] = useState<MatchProfile | null>(null);
  const [matches, setMatches] = useState<MatchProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeDashboard = async () => {
      try {
        // Check if user has completed onboarding
        const hasCompleted = await UserStateManager.hasCompletedOnboarding();
        if (!hasCompleted) {
          navigate('/onboarding');
          return;
        }

        // Ensure user has seen AI results first (proper flow validation)
        const profile = await UserStateManager.getUserProfile();
        if (!profile?.readinessScore) {
          navigate('/ai-results');
          return;
        }

        // Generate matches based on user's assessment results
        const isComplete = await UserStateManager.isAssessmentComplete();
        if (isComplete && profile.assessmentResults) {
          let generatedMatches = generateCompatibleMatches(profile.assessmentResults);
          
          // Update match statuses based on stored decisions
          generatedMatches = MatchPoolManager.updateMatchStatuses(generatedMatches);
          
          // Check if we need fresh matches
          const activeMatches = MatchPoolManager.getActiveMatches(generatedMatches);
          if (MatchPoolManager.shouldRefreshPool(activeMatches)) {
            const freshMatches = MatchPoolManager.generateFreshMatches(profile.assessmentResults, generatedMatches);
            generatedMatches = [...generatedMatches, ...freshMatches];
            generatedMatches = MatchPoolManager.updateMatchStatuses(generatedMatches);
          }
          
          setMatches(generatedMatches);
        }
      } catch (error) {
        console.error('Failed to initialize dashboard:', error);
        navigate('/onboarding');
      } finally {
        setIsLoading(false);
      }
    };

    initializeDashboard();
  }, [navigate]);

  const handleMatchClick = (match: MatchProfile) => {
    setSelectedMatch(match);
  };

  const handleBackToMatches = () => {
    setSelectedMatch(null);
  };

  const handleConnect = (matchId: string) => {
    MatchStorageManager.saveDecision(matchId, 'interested');
    
    // Update the local state immediately
    setMatches(prev => prev.map(match => 
      match.id === matchId 
        ? { 
            ...match, 
            connectionStatus: MatchStorageManager.isMutualMatch(matchId) ? 'mutual' as const : 'interested' as const 
          }
        : match
    ));
    
    console.log(`Expressed interest in match ${matchId}`);
  };

  const handlePass = (matchId: string) => {
    MatchStorageManager.saveDecision(matchId, 'passed');
    
    // Update the local state immediately
    setMatches(prev => prev.map(match => 
      match.id === matchId 
        ? { ...match, connectionStatus: 'passed' as const }
        : match
    ));
    
    console.log(`Passed on match ${matchId}`);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-600";
    if (score >= 60) return "text-amber-600";
    return "text-red-500";
  };

  const getScoreBackground = (score: number) => {
    if (score >= 80) return "bg-emerald-50 border-emerald-200";
    if (score >= 60) return "bg-amber-50 border-amber-200";
    return "bg-red-50 border-red-200";
  };

  return {
    selectedMatch,
    matches,
    isLoading,
    handleMatchClick,
    handleBackToMatches,
    handleConnect,
    handlePass,
    getScoreColor,
    getScoreBackground
  };
};
