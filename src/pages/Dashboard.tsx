
import MatchDetail from "@/components/matches/MatchDetail";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import NavigationFooter from "@/components/dashboard/NavigationFooter";
import LoveVeeChatButton from "@/components/ai/LoveVeeChatButton";
import DashboardLoadingState from "./dashboard/DashboardLoadingState";
import DashboardMobileLayout from "./dashboard/DashboardMobileLayout";
import DashboardDesktopLayout from "./dashboard/DashboardDesktopLayout";
import { useDashboard } from "./dashboard/useDashboard";

const Dashboard = () => {
  const {
    selectedMatch,
    matches,
    isLoading,
    handleMatchClick,
    handleBackToMatches,
    handleConnect,
    handlePass,
    getScoreColor,
    getScoreBackground
  } = useDashboard();

  if (isLoading) {
    return <DashboardLoadingState />;
  }

  // Show match detail if a match is selected
  if (selectedMatch) {
    return (
      <div className="pb-20 lg:pb-6 lg:pt-20">
        <MatchDetail 
          match={selectedMatch}
          onBack={handleBackToMatches}
          onConnect={handleConnect}
          onPass={handlePass}
        />
        <LoveVeeChatButton />
        <NavigationFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50">
      <NavigationFooter />
      <DashboardHeader />

      {/* Mobile Layout */}
      <DashboardMobileLayout
        matches={matches}
        onMatchClick={handleMatchClick}
        onConnect={handleConnect}
        getScoreColor={getScoreColor}
        getScoreBackground={getScoreBackground}
      />

      {/* Desktop Layout */}
      <div className="lg:pt-4">
        <DashboardDesktopLayout
          matches={matches}
          onMatchClick={handleMatchClick}
          getScoreColor={getScoreColor}
          getScoreBackground={getScoreBackground}
        />
      </div>

      <LoveVeeChatButton />
    </div>
  );
};

export default Dashboard;
