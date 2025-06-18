
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crown, Star, MessageCircle } from "lucide-react";
import { MatchProfile } from "@/utils/compatibilityCalculator";

interface TopChoicesSectionProps {
  topChoices: MatchProfile[];
  onMatchClick: (match: MatchProfile) => void;
  onConnect: (matchId: string) => void;
  getScoreColor: (score: number) => string;
  getScoreBackground: (score: number) => string;
}

const TopChoicesSection = ({ 
  topChoices, 
  onMatchClick, 
  onConnect, 
  getScoreColor, 
  getScoreBackground 
}: TopChoicesSectionProps) => {
  const handleConnectClick = (e: React.MouseEvent, matchId: string) => {
    e.stopPropagation();
    console.log('Connect button clicked for match:', matchId);
    onConnect(matchId);
  };

  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex items-center space-x-2 mb-3 sm:mb-6">
        <Crown className="h-4 w-4 sm:h-5 sm:w-5 text-rose-500" />
        <h2 className="text-lg sm:text-xl font-serif font-bold text-gray-800">
          Your Top 3 Choices
        </h2>
      </div>
      
      <div className="space-y-3 sm:space-y-4">
        {topChoices.map((match, index) => (
          <Card 
            key={match.id} 
            className="bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-[1.02]"
            onClick={() => onMatchClick(match)}
          >
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="relative">
                  <img 
                    src={match.photo} 
                    alt={match.name}
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-3 border-white shadow-md"
                  />
                  <div className="absolute -top-1 -right-1 bg-gradient-to-r from-rose-400 to-pink-500 text-white text-xs rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center font-bold shadow-md">
                    {index + 1}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-base sm:text-lg font-serif font-bold text-gray-800 truncate">
                      {match.name}, {match.age}
                    </h3>
                    <div className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold ${getScoreBackground(match.compatibilityScore.overall)} ${getScoreColor(match.compatibilityScore.overall)}`}>
                      <Star className="h-3 w-3 mr-1" />
                      {match.compatibilityScore.overall}%
                    </div>
                  </div>
                  
                  <p className="text-xs sm:text-sm text-gray-600 mb-2">{match.location}</p>
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-3 line-clamp-2">
                    {match.bio}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 sm:space-x-4 text-xs text-gray-600">
                      <span>💖 {match.compatibilityScore.attachment}%</span>
                      <span>🧠 {match.compatibilityScore.personality}%</span>
                      <span className="hidden sm:inline">👨‍👩‍👧‍👦 {match.compatibilityScore.birthOrder}%</span>
                    </div>
                    
                    {match.connectionStatus === 'interested' ? (
                      <Button 
                        size="sm"
                        variant="outline"
                        className="bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100 text-xs sm:text-sm"
                        onClick={(e) => handleConnectClick(e, match.id)}
                      >
                        <MessageCircle className="h-3 w-3 mr-1" />
                        <span className="hidden sm:inline">Interested ✓</span>
                        <span className="sm:hidden">✓</span>
                      </Button>
                    ) : match.connectionStatus === 'mutual' ? (
                      <Button 
                        size="sm"
                        className="bg-gradient-to-r from-pink-400 to-rose-500 hover:from-pink-500 hover:to-rose-600 text-white shadow-md text-xs sm:text-sm"
                        onClick={(e) => handleConnectClick(e, match.id)}
                      >
                        <MessageCircle className="h-3 w-3 mr-1" />
                        <span className="hidden sm:inline">Mutual Match!</span>
                        <span className="sm:hidden">Match!</span>
                      </Button>
                    ) : (
                      <Button 
                        size="sm"
                        className="bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white shadow-md text-xs sm:text-sm"
                        onClick={(e) => handleConnectClick(e, match.id)}
                      >
                        <MessageCircle className="h-3 w-3 mr-1" />
                        Connect
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TopChoicesSection;
