import { useState, useEffect } from "react";
import { MatchProfile } from "@/utils/compatibilityCalculator";
import { generateCompatibleMatches } from "@/utils/compatibilityCalculator";
import { UserStateManager } from "@/utils/userStateManager";
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
  const [connectedMatches, setConnectedMatches] = useState<Set<string>>(new Set());
  const [passedMatches, setPassedMatches] = useState<Set<string>>(new Set());
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
          // If no readiness score, user hasn't completed the full flow including AI analysis
          navigate('/ai-results');
          return;
        }

        // Generate matches based on user's assessment results
        const isComplete = await UserStateManager.isAssessmentComplete();
        if (isComplete && profile.assessmentResults) {
          const generatedMatches = generateCompatibleMatches(profile.assessmentResults);
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
    setConnectedMatches(prev => new Set([...prev, matchId]));
    setMatches(prev => prev.map(match => 
      match.id === matchId 
        ? { ...match, connectionStatus: 'interested' as const }
        : match
    ));
    console.log(`Expressed interest in match ${matchId}`);
  };

  const handlePass = (matchId: string) => {
    setPassedMatches(prev => new Set([...prev, matchId]));
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50 flex items-center justify-center">
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
      <>
        <MatchDetail 
          match={selectedMatch}
          onBack={handleBackToMatches}
          onConnect={handleConnect}
          onPass={handlePass}
        />
        <LoveVeeChatButton />
      </>
    );
  }

  // Filter out passed matches from display
  const activeMatches = matches.filter(match => !passedMatches.has(match.id));
  
  // Show top 3 as featured, remaining as "More Matches"
  const topChoices = activeMatches.slice(0, 3);
  const remainingMatches = activeMatches.slice(3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50">
      <DashboardHeader 
        onShowChecklist={() => setShowChecklist(true)} 
        onShowProjectStatus={() => setShowProjectStatus(true)}
      />

      <div className="max-w-md mx-auto px-4 pb-20">
        <WelcomeSection />
        
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
            connectedMatches={connectedMatches}
            onMatchClick={handleMatchClick}
            getScoreColor={getScoreColor}
            getScoreBackground={getScoreBackground}
          />
        )}

        {activeMatches.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No matches available right now.</p>
            <p className="text-sm text-gray-500">Check back soon for new compatible profiles!</p>
          </div>
        )}

        <NavigationFooter />
      </div>

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
