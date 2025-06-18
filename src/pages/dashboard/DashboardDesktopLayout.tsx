
import { MatchProfile } from "@/utils/compatibilityCalculator";
import { MatchPoolManager } from "@/utils/compatibility/matchPoolManager";
import WelcomeSection from "@/components/dashboard/WelcomeSection";
import DashboardEmptyState from "./DashboardEmptyState";

interface DashboardDesktopLayoutProps {
  matches: MatchProfile[];
  onMatchClick: (match: MatchProfile) => void;
  getScoreColor: (score: number) => string;
  getScoreBackground: (score: number) => string;
}

const DashboardDesktopLayout = ({
  matches,
  onMatchClick,
  getScoreColor,
  getScoreBackground
}: DashboardDesktopLayoutProps) => {
  // Filter active matches (not passed) for display
  const activeMatches = MatchPoolManager.getActiveMatches(matches);
  const mutualMatches = MatchPoolManager.getMutualMatches(matches);
  
  // Show mutual matches first, then top 3 choices, then remaining 7
  const topChoices = [...mutualMatches, ...activeMatches.filter(m => !mutualMatches.includes(m))].slice(0, 3);
  const remainingMatches = activeMatches.slice(3, 10); // Show exactly 7 additional matches

  return (
    <div className="hidden lg:block max-w-6xl mx-auto px-8 pb-12">
      <div className="mb-8">
        <WelcomeSection />
      </div>
      
      {activeMatches.length === 0 ? (
        <DashboardEmptyState />
      ) : (
        <div className="space-y-8">
          {/* Mutual Matches Section */}
          {mutualMatches.length > 0 && (
            <div>
              <h2 className="text-2xl font-playfair font-bold text-gray-800 mb-6">
                🎉 Mutual Matches!
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {mutualMatches.map(match => (
                  <div 
                    key={match.id}
                    className="bg-gradient-to-r from-pink-50 to-rose-50 border-2 border-pink-200 rounded-xl p-6 cursor-pointer hover:shadow-lg transition-all transform hover:scale-105"
                    onClick={() => onMatchClick(match)}
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

          {/* Top 3 Choices Section */}
          {topChoices.length > 0 && (
            <div>
              <h2 className="text-2xl font-playfair font-bold text-gray-800 mb-6">
                ⭐ Top 3 Choices
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {topChoices.filter(match => !mutualMatches.includes(match)).map(match => (
                  <div 
                    key={match.id}
                    className={`bg-white/80 backdrop-blur-sm border rounded-xl p-6 cursor-pointer hover:shadow-lg transition-all transform hover:scale-105 ${getScoreBackground(match.compatibilityScore.overall)}`}
                    onClick={() => onMatchClick(match)}
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

          {/* 7 Additional Matches Section */}
          {remainingMatches.length > 0 && (
            <div>
              <h2 className="text-2xl font-playfair font-bold text-gray-800 mb-6">
                7 Additional Matches
              </h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {remainingMatches.map(match => (
                  <div 
                    key={match.id}
                    className="bg-white/80 backdrop-blur-sm border rounded-lg p-4 cursor-pointer hover:shadow-md transition-all hover:scale-105"
                    onClick={() => onMatchClick(match)}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <img 
                        src={match.photo} 
                        alt={match.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-800 truncate">{match.name}, {match.age}</h4>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-600 truncate">{match.location}</span>
                          <span className={`text-sm font-bold ${getScoreColor(match.compatibilityScore.overall)}`}>
                            {match.compatibilityScore.overall}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-700 line-clamp-2">{match.bio}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardDesktopLayout;
