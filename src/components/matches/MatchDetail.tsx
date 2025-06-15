
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Heart, Brain, Users, Star, MessageCircle } from "lucide-react";
import { MatchProfile } from "@/utils/compatibilityCalculator";

interface MatchDetailProps {
  match: MatchProfile;
  onBack: () => void;
  onConnect: (matchId: string) => void;
}

const MatchDetail = ({ match, onBack, onConnect }: MatchDetailProps) => {
  const { compatibilityScore } = match;

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 px-6 py-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="p-3 rounded-xl"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-playfair font-bold text-foreground">
            Match Details
          </h1>
          <div className="w-12" />
        </div>

        {/* Profile Card */}
        <Card className="card-glass mb-6">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <img 
                src={match.photo} 
                alt={match.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h2 className="text-2xl font-playfair font-bold text-foreground mb-1">
                {match.name}, {match.age}
              </h2>
              <p className="text-muted-foreground mb-2">{match.location}</p>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getScoreBackground(compatibilityScore.overall)} ${getScoreColor(compatibilityScore.overall)}`}>
                <Star className="h-4 w-4 mr-1" />
                {compatibilityScore.overall}% Match
              </div>
            </div>
            
            <p className="text-muted-foreground text-center leading-relaxed">
              {match.bio}
            </p>
          </CardContent>
        </Card>

        {/* Compatibility Breakdown */}
        <Card className="card-glass mb-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-playfair font-bold text-foreground mb-4 flex items-center">
              <Brain className="h-5 w-5 mr-2 text-primary" />
              Compatibility Breakdown
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Attachment Style</span>
                <span className={`font-semibold ${getScoreColor(compatibilityScore.attachment)}`}>
                  {compatibilityScore.attachment}%
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Personality</span>
                <span className={`font-semibold ${getScoreColor(compatibilityScore.personality)}`}>
                  {compatibilityScore.personality}%
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Family Dynamics</span>
                <span className={`font-semibold ${getScoreColor(compatibilityScore.birthOrder)}`}>
                  {compatibilityScore.birthOrder}%
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Core Values</span>
                <span className={`font-semibold ${getScoreColor(compatibilityScore.values)}`}>
                  {compatibilityScore.values}%
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Lifestyle</span>
                <span className={`font-semibold ${getScoreColor(compatibilityScore.lifestyle)}`}>
                  {compatibilityScore.lifestyle}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Why This Match */}
        <Card className="card-glass mb-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-playfair font-bold text-foreground mb-4 flex items-center">
              <Heart className="h-5 w-5 mr-2 text-accent" />
              Why This Match?
            </h3>
            
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>• Complementary attachment styles create emotional balance</p>
              <p>• Your personalities bring out the best in each other</p>
              <p>• Similar life goals and relationship timeline</p>
              <p>• Strong foundation for long-term compatibility</p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button 
            onClick={() => onConnect(match.id)}
            className="btn-gradient w-full"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Send Connection Request
          </Button>
          
          <Button 
            onClick={onBack}
            variant="outline"
            className="w-full"
          >
            Back to Matches
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MatchDetail;
