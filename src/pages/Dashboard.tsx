
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

const Dashboard = () => {
  const [selectedMatch, setSelectedMatch] = useState<MatchProfile | null>(null);
  const [connectedMatches, setConnectedMatches] = useState<Set<string>>(new Set());

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
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBackground = (score: number) => {
    if (score >= 80) return "bg-green-100";
    if (score >= 60) return "bg-yellow-100";
    return "bg-red-100";
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
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      <DashboardHeader />

      <div className="max-w-md mx-auto px-6">
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
    </div>
  );
};

export default Dashboard;
