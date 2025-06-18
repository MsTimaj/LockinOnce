
import { MatchProfile } from "@/utils/compatibilityCalculator";
import { MatchPoolManager } from "@/utils/compatibility/matchPoolManager";
import { MatchStorageManager } from "@/utils/storage/matchStorageManager";
import WelcomeSection from "@/components/dashboard/WelcomeSection";
import TopChoicesSection from "@/components/dashboard/TopChoicesSection";
import OtherMatchesSection from "@/components/dashboard/OtherMatchesSection";
import DashboardEmptyState from "./DashboardEmptyState";

interface DashboardMobileLayoutProps {
  matches: MatchProfile[];
  onMatchClick: (match: MatchProfile) => void;
  onConnect: (matchId: string) => void;
  getScoreColor: (score: number) => string;
  getScoreBackground: (score: number) => string;
}

const DashboardMobileLayout = ({
  matches,
  onMatchClick,
  onConnect,
  getScoreColor,
  getScoreBackground
}: DashboardMobileLayoutProps) => {
  // Filter active matches (not passed) for display
  const activeMatches = MatchPoolManager.getActiveMatches(matches);
  const mutualMatches = MatchPoolManager.getMutualMatches(matches);
  
  // Show mutual matches first, then top choices
  const topChoices = [...mutualMatches, ...activeMatches.filter(m => !mutualMatches.includes(m))].slice(0, 3);
  const remainingMatches = activeMatches.slice(3);

  return (
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
                onClick={() => onMatchClick(match)}
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
          onMatchClick={onMatchClick}
          onConnect={onConnect}
          getScoreColor={getScoreColor}
          getScoreBackground={getScoreBackground}
        />
      )}

      {remainingMatches.length > 0 && (
        <OtherMatchesSection 
          otherMatches={remainingMatches}
          connectedMatches={new Set(MatchStorageManager.getInterestedMatches())}
          onMatchClick={onMatchClick}
          getScoreColor={getScoreColor}
          getScoreBackground={getScoreBackground}
        />
      )}

      {activeMatches.length === 0 && <DashboardEmptyState />}
    </div>
  );
};

export default DashboardMobileLayout;
