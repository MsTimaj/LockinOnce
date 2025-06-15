
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
  return (
    <div className="mb-8">
      <div className="flex items-center space-x-2 mb-6">
        <Crown className="h-5 w-5 text-rose-500" />
        <h2 className="text-xl font-serif font-bold text-gray-800">
          Your Top 3 Choices
        </h2>
      </div>
      
      <div className="space-y-4">
        {topChoices.map((match, index) => (
          <Card 
            key={match.id} 
            className="bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-[1.02]"
            onClick={() => onMatchClick(match)}
          >
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="relative">
                  <img 
                    src={match.photo} 
                    alt={match.name}
                    className="w-16 h-16 rounded-full object-cover border-3 border-white shadow-md"
                  />
                  <div className="absolute -top-1 -right-1 bg-gradient-to-r from-rose-400 to-pink-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-md">
                    {index + 1}
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg font-serif font-bold text-gray-800">
                      {match.name}, {match.age}
                    </h3>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${getScoreBackground(match.compatibilityScore.overall)} ${getScoreColor(match.compatibilityScore.overall)}`}>
                      <Star className="h-3 w-3 mr-1" />
                      {match.compatibilityScore.overall}%
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">{match.location}</p>
                  <p className="text-sm text-gray-700 leading-relaxed mb-3 line-clamp-2">
                    {match.bio}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-gray-600">
                      <span>💖 {match.compatibilityScore.attachment}%</span>
                      <span>🧠 {match.compatibilityScore.personality}%</span>
                      <span>👨‍👩‍👧‍👦 {match.compatibilityScore.birthOrder}%</span>
                    </div>
                    
                    <Button 
                      size="sm"
                      className="bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white shadow-md"
                      onClick={(e) => {
                        e.stopPropagation();
                        onConnect(match.id);
                      }}
                    >
                      <MessageCircle className="h-3 w-3 mr-1" />
                      Connect
                    </Button>
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
