
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
  const [showChecklist, setShowChecklist] = useState(false);
  const [showProjectStatus, setShowProjectStatus] = useState(false);
  const [matches, setMatches] = useState<MatchProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userProfile = UserStateManager.getUserProfile();
    
    // Check if user has completed onboarding
    if (!userProfile || !UserStateManager.hasCompletedOnboarding()) {
      navigate('/onboarding');
      return;
    }

    // Generate matches based on user's assessment results
    if (UserStateManager.isAssessmentComplete()) {
      const generatedMatches = generateCompatibleMatches(userProfile.assessmentResults);
      setMatches(generatedMatches);
    }
    
    setIsLoading(false);
  }, [navigate]);

  const handleMatchClick = (match: MatchProfile) => {
    setSelectedMatch(match);
  };

  const handleBackToMatches = () => {
    setSelectedMatch(null);
  };

  const handleConnect = (matchId: string) => {
    setConnectedMatches(prev => new Set([...prev, matchId]));
    console.log(`Connected with match ${matchId}`);
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
        />
        <LoveVeeChatButton />
      </>
    );
  }

  // Split matches into top 3 and others
  const topChoices = matches.slice(0, 3);
  const otherMatches = matches.slice(3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50">
      <DashboardHeader 
        onShowChecklist={() => setShowChecklist(true)} 
        onShowProjectStatus={() => setShowProjectStatus(true)}
      />

      <div className="max-w-md mx-auto px-4 pb-20">
        <WelcomeSection />
        
        <TopChoicesSection 
          topChoices={topChoices}
          onMatchClick={handleMatchClick}
          onConnect={handleConnect}
          getScoreColor={getScoreColor}
          getScoreBackground={getScoreBackground}
        />

        {otherMatches.length > 0 && (
          <OtherMatchesSection 
            otherMatches={otherMatches}
            connectedMatches={connectedMatches}
            onMatchClick={handleMatchClick}
            getScoreColor={getScoreColor}
            getScoreBackground={getScoreBackground}
          />
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
