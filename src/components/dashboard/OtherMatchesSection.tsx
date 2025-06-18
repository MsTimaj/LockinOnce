
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Star, MessageCircle, MapPin } from "lucide-react";
import { MatchProfile } from "@/utils/compatibilityCalculator";

interface OtherMatchesSectionProps {
  otherMatches: MatchProfile[];
  connectedMatches: Set<string>;
  onMatchClick: (match: MatchProfile) => void;
  getScoreColor: (score: number) => string;
  getScoreBackground: (score: number) => string;
}

const OtherMatchesSection = ({ 
  otherMatches, 
  connectedMatches, 
  onMatchClick, 
  getScoreColor, 
  getScoreBackground 
}: OtherMatchesSectionProps) => {
  if (otherMatches.length === 0) return null;

  const handleViewClick = (e: React.MouseEvent, match: MatchProfile) => {
    e.stopPropagation();
    console.log('View button clicked for match:', match.id);
    onMatchClick(match);
  };

  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex items-center space-x-2 mb-3 sm:mb-6">
        <Users className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
        <h2 className="text-lg sm:text-xl font-serif font-bold text-gray-800">
          More Matches ({otherMatches.length})
        </h2>
      </div>
      
      <div className="grid gap-3 sm:gap-4">
        {otherMatches.map((match) => (
          <Card 
            key={match.id} 
            className="bg-white/80 backdrop-blur-sm border border-white/50 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-[1.01]"
            onClick={() => onMatchClick(match)}
          >
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <img 
                  src={match.photo} 
                  alt={match.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-white shadow-sm"
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm sm:text-base font-serif font-bold text-gray-800 truncate">
                      {match.name}, {match.age}
                    </h3>
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold ${getScoreBackground(match.compatibilityScore.overall)} ${getScoreColor(match.compatibilityScore.overall)}`}>
                      <Star className="h-3 w-3 mr-1" />
                      {match.compatibilityScore.overall}%
                    </div>
                  </div>
                  
                  <div className="flex items-center text-xs text-gray-600 mb-1 sm:mb-2">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span className="truncate">{match.location}</span>
                  </div>
                  
                  <p className="text-xs text-gray-700 leading-relaxed line-clamp-2 mb-2">
                    {match.bio}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 sm:space-x-3 text-xs text-gray-600">
                      <span>💖 {match.compatibilityScore.attachment}%</span>
                      <span>🧠 {match.compatibilityScore.personality}%</span>
                    </div>
                    
                    <Button 
                      size="sm"
                      variant={connectedMatches.has(match.id) ? "secondary" : "default"}
                      className={`text-xs ${!connectedMatches.has(match.id) 
                        ? "bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-blue-500 hover:to-indigo-600 text-white" 
                        : ""}`}
                      onClick={(e) => handleViewClick(e, match)}
                    >
                      <MessageCircle className="h-3 w-3 mr-1" />
                      {connectedMatches.has(match.id) ? "View" : "Connect"}
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

export default OtherMatchesSection;
