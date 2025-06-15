
import { Card, CardContent } from "@/components/ui/card";
import { Users, Star, MessageCircle } from "lucide-react";
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
  return (
    <div className="mb-8">
      <div className="flex items-center space-x-2 mb-6">
        <Users className="h-5 w-5 text-rose-400" />
        <h2 className="text-lg font-serif font-bold text-gray-800">
          Other Close Matches
        </h2>
      </div>
      
      <div className="space-y-3">
        {otherMatches.map((match) => (
          <Card 
            key={match.id} 
            className="bg-white/70 backdrop-blur-sm border border-white/30 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-[1.01]"
            onClick={() => onMatchClick(match)}
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <img 
                  src={match.photo} 
                  alt={match.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                />
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-serif font-semibold text-gray-800">
                      {match.name}, {match.age}
                    </h3>
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${getScoreBackground(match.compatibilityScore.overall)} ${getScoreColor(match.compatibilityScore.overall)}`}>
                      <Star className="h-3 w-3 mr-1" />
                      {match.compatibilityScore.overall}%
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-600 mb-1">{match.location}</p>
                  <p className="text-xs text-gray-700 line-clamp-1 leading-relaxed">
                    {match.bio}
                  </p>
                </div>
                
                <div className="text-right">
                  {connectedMatches.has(match.id) ? (
                    <span className="text-xs text-green-600 font-semibold">Connected ✓</span>
                  ) : (
                    <MessageCircle className="h-4 w-4 text-rose-400" />
                  )}
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
