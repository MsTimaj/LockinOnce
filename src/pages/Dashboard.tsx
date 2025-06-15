import { useState } from "react";
import { mockMatches } from "@/data/mockMatches";
import { MatchProfile } from "@/utils/compatibilityCalculator";
import MatchDetail from "@/components/matches/MatchDetail";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import WelcomeSection from "@/components/dashboard/WelcomeSection";
import TopChoicesSection from "@/components/dashboard/TopChoicesSection";
import OtherMatchesSection from "@/components/dashboard/OtherMatchesSection";
import NavigationFooter from "@/components/dashboard/NavigationFooter";
import LoveVeeChatButton from "@/components/ai/LoveVeeChatButton";
import UpdateChecklist from "@/components/dashboard/UpdateChecklist";
import ProjectStatusChecklist from "@/components/dashboard/ProjectStatusChecklist";

const Dashboard = () => {
  const [selectedMatch, setSelectedMatch] = useState<MatchProfile | null>(null);
  const [connectedMatches, setConnectedMatches] = useState<Set<string>>(new Set());
  const [showChecklist, setShowChecklist] = useState(false);
  const [showProjectStatus, setShowProjectStatus] = useState(false);

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

  // Split matches into top 3 and other 7
  const topChoices = mockMatches.slice(0, 3);
  const otherMatches = mockMatches.slice(3, 10);

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

        <OtherMatchesSection 
          otherMatches={otherMatches}
          connectedMatches={connectedMatches}
          onMatchClick={handleMatchClick}
          getScoreColor={getScoreColor}
          getScoreBackground={getScoreBackground}
        />

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
