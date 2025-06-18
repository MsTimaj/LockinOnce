
import { useState, useEffect } from "react";
import { MatchProfile } from "@/utils/compatibilityCalculator";
import { generateCompatibleMatches } from "@/utils/compatibilityCalculator";
import { UserStateManager } from "@/utils/userStateManager";
import { MatchStorageManager } from "@/utils/storage/matchStorageManager";
import { MatchPoolManager } from "@/utils/compatibility/matchPoolManager";
import MatchDetail from "@/components/matches/MatchDetail";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import WelcomeSection from "@/components/dashboard/WelcomeSection";
import TopChoicesSection from "@/components/dashboard/TopChoicesSection";
import OtherMatchesSection from "@/components/dashboard/OtherMatchesSection";
import NavigationFooter from "@/components/dashboard/NavigationFooter";
import LoveVeeChatButton from "@/components/ai/LoveVeeChatButton";
import UpdateChecklist from "@/components/dashboard/UpdateChecklist";
import ProjectStatusChecklist from "@/components/dashboard/ProjectStatusChecklist";
import SessionInfo from "@/components/dashboard/SessionInfo";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [selectedMatch, setSelectedMatch] = useState<MatchProfile | null>(null);
  const [showChecklist, setShowChecklist] = useState(false);
  const [showProjectStatus, setShowProjectStatus] = useState(false);
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50 flex items-center justify-center px-3 sm:px-4">
        <div className="text-center">
          <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm sm:text-base">Loading your matches...</p>
        </div>
      </div>
    );
  }

  // Show match detail if a match is selected
  if (selectedMatch) {
    return (
      <div className="pb-20 sm:pb-24">
        <MatchDetail 
          match={selectedMatch}
          onBack={handleBackToMatches}
          onConnect={handleConnect}
          onPass={handlePass}
        />
        <LoveVeeChatButton />
      </div>
    );
  }

  // Filter active matches (not passed) for display
  const activeMatches = MatchPoolManager.getActiveMatches(matches);
  const mutualMatches = MatchPoolManager.getMutualMatches(matches);
  
  // Show mutual matches first, then top choices
  const topChoices = [...mutualMatches, ...activeMatches.filter(m => !mutualMatches.includes(m))].slice(0, 3);
  const remainingMatches = activeMatches.slice(3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50">
      <DashboardHeader 
        onShowChecklist={() => setShowChecklist(true)} 
        onShowProjectStatus={() => setShowProjectStatus(true)}
      />

      <div className="w-full max-w-sm sm:max-w-md mx-auto px-3 sm:px-6 pb-20 sm:pb-24 overflow-x-hidden">
        <SessionInfo />
        
        <WelcomeSection />
        
        {/* Show mutual matches section if any */}
        {mutualMatches.length > 0 && (
          <div className="mb-4 sm:mb-6">
            <h2 className="text-base sm:text-lg font-playfair font-bold text-gray-800 mb-2 sm:mb-3">
              🎉 Mutual Matches!
            </h2>
            <div className="space-y-2 sm:space-y-3">
              {mutualMatches.map(match => (
                <div 
                  key={match.id}
                  className="bg-gradient-to-r from-pink-50 to-rose-50 border-2 border-pink-200 rounded-xl p-3 sm:p-4 cursor-pointer hover:shadow-md transition-all"
                  onClick={() => handleMatchClick(match)}
                >
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <img 
                      src={match.photo} 
                      alt={match.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 truncate text-sm sm:text-base">{match.name}</h3>
                      <p className="text-xs sm:text-sm text-pink-600">Both interested! 💕</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-base sm:text-lg font-bold text-pink-600">
                        {match.compatibilityScore.overall}%
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {topChoices.length > 0 && (
          <TopChoicesSection 
            topChoices={topChoices}
            onMatchClick={handleMatchClick}
            onConnect={handleConnect}
            getScoreColor={getScoreColor}
            getScoreBackground={getScoreBackground}
          />
        )}

        {remainingMatches.length > 0 && (
          <OtherMatchesSection 
            otherMatches={remainingMatches}
            connectedMatches={new Set(MatchStorageManager.getInterestedMatches())}
            onMatchClick={handleMatchClick}
            getScoreColor={getScoreColor}
            getScoreBackground={getScoreBackground}
          />
        )}

        {activeMatches.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">You've seen all available matches!</p>
            <p className="text-xs sm:text-sm text-gray-500">New compatible profiles will appear soon.</p>
          </div>
        )}
      </div>

      <NavigationFooter />
      <LoveVeeChatButton />
      
      {showChecklist && (
        <UpdateChecklist onClose={() => setShowChecklist(false)} />
      )}
      
      {showProjectStatus && (
        <ProjectStatusChecklist onClose={() => setShowProjectStatus(false)} />
      )}
    </div>
  );
};

export default Dashboard;
