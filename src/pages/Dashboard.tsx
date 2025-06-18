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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your matches...</p>
        </div>
      </div>
    );
  }

  // Show match detail if a match is selected
  if (selectedMatch) {
    return (
      <div className="pb-20 lg:pb-6">
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

      {/* Mobile Layout */}
      <div className="lg:hidden w-full max-w-sm sm:max-w-md mx-auto px-4 sm:px-6 pb-24 overflow-x-hidden">
        <WelcomeSection />
        
        {/* Show mutual matches section if any */}
        {mutualMatches.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-playfair font-bold text-gray-800 mb-3">
              🎉 Mutual Matches!
            </h2>
            <div className="space-y-3">
              {mutualMatches.map(match => (
                <div 
                  key={match.id}
                  className="bg-gradient-to-r from-pink-50 to-rose-50 border-2 border-pink-200 rounded-xl p-4 cursor-pointer hover:shadow-md transition-all"
                  onClick={() => handleMatchClick(match)}
                >
                  <div className="flex items-center space-x-3">
                    <img 
                      src={match.photo} 
                      alt={match.name}
                      className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 truncate">{match.name}</h3>
                      <p className="text-sm text-pink-600">Both interested! 💕</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-lg font-bold text-pink-600">
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
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">You've seen all available matches!</p>
            <p className="text-sm text-gray-500">New compatible profiles will appear soon.</p>
          </div>
        )}
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block max-w-6xl mx-auto px-8 pb-12">
        <div className="mb-8">
          <WelcomeSection />
        </div>
        
        {/* Desktop Grid Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Content - Left/Center Column */}
          <div className="xl:col-span-2 space-y-8">
            {/* Mutual Matches Section */}
            {mutualMatches.length > 0 && (
              <div>
                <h2 className="text-2xl font-playfair font-bold text-gray-800 mb-6">
                  🎉 Mutual Matches!
                </h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {mutualMatches.map(match => (
                    <div 
                      key={match.id}
                      className="bg-gradient-to-r from-pink-50 to-rose-50 border-2 border-pink-200 rounded-xl p-6 cursor-pointer hover:shadow-lg transition-all transform hover:scale-105"
                      onClick={() => handleMatchClick(match)}
                    >
                      <div className="flex items-center space-x-4 mb-4">
                        <img 
                          src={match.photo} 
                          alt={match.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-800">{match.name}, {match.age}</h3>
                          <p className="text-pink-600 font-medium">Both interested! 💕</p>
                        </div>
                        <div className="text-2xl font-bold text-pink-600">
                          {match.compatibilityScore.overall}%
                        </div>
                      </div>
                      <p className="text-gray-700 line-clamp-2">{match.bio}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Top Choices Section */}
            {topChoices.length > 0 && (
              <div>
                <h2 className="text-2xl font-playfair font-bold text-gray-800 mb-6">
                  ⭐ Top Choices
                </h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {topChoices.filter(match => !mutualMatches.includes(match)).map(match => (
                    <div 
                      key={match.id}
                      className={`bg-white/80 backdrop-blur-sm border rounded-xl p-6 cursor-pointer hover:shadow-lg transition-all transform hover:scale-105 ${getScoreBackground(match.compatibilityScore.overall)}`}
                      onClick={() => handleMatchClick(match)}
                    >
                      <div className="flex items-center space-x-4 mb-4">
                        <img 
                          src={match.photo} 
                          alt={match.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
                        />
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-800">{match.name}, {match.age}</h3>
                          <p className="text-gray-600">{match.location}</p>
                        </div>
                        <div className={`text-2xl font-bold ${getScoreColor(match.compatibilityScore.overall)}`}>
                          {match.compatibilityScore.overall}%
                        </div>
                      </div>
                      <p className="text-gray-700 line-clamp-2 mb-4">{match.bio}</p>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>💖 {match.compatibilityScore.attachment}%</span>
                        <span>🧠 {match.compatibilityScore.personality}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Right Column */}
          <div className="xl:col-span-1">
            {remainingMatches.length > 0 && (
              <div>
                <h2 className="text-xl font-playfair font-bold text-gray-800 mb-4">
                  More Matches ({remainingMatches.length})
                </h2>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {remainingMatches.slice(0, 8).map(match => (
                    <div 
                      key={match.id}
                      className="bg-white/80 backdrop-blur-sm border rounded-lg p-4 cursor-pointer hover:shadow-md transition-all"
                      onClick={() => handleMatchClick(match)}
                    >
                      <div className="flex items-center space-x-3">
                        <img 
                          src={match.photo} 
                          alt={match.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-800 truncate">{match.name}, {match.age}</h4>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-600">{match.location}</span>
                            <span className={`text-sm font-bold ${getScoreColor(match.compatibilityScore.overall)}`}>
                              {match.compatibilityScore.overall}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeMatches.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">You've seen all available matches!</p>
                <p className="text-sm text-gray-500">New compatible profiles will appear soon.</p>
              </div>
            )}
          </div>
        </div>
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
