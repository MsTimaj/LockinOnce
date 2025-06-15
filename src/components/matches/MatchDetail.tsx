
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Heart, Brain, Users, Star, MessageCircle, CheckCircle, X, Sparkles } from "lucide-react";
import { MatchProfile } from "@/utils/compatibilityCalculator";
import { MessagingManager } from "@/utils/messaging/messagingManager";
import { useNavigate } from "react-router-dom";

interface MatchDetailProps {
  match: MatchProfile;
  onBack: () => void;
  onConnect: (matchId: string) => void;
  onPass?: (matchId: string) => void;
}

const MatchDetail = ({ match, onBack, onConnect, onPass }: MatchDetailProps) => {
  const { compatibilityScore } = match;
  const navigate = useNavigate();

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

  const handleInterested = () => {
    onConnect(match.id);
  };

  const handlePass = () => {
    if (onPass) {
      onPass(match.id);
    }
    onBack();
  };

  const handleStartConversation = async () => {
    try {
      const conversation = await MessagingManager.getOrCreateConversation(match.id, match.id);
      navigate('/messages');
    } catch (error) {
      console.error('Failed to start conversation:', error);
    }
  };

  const renderConnectionStatus = () => {
    switch (match.connectionStatus) {
      case 'mutual':
        return (
          <div className="text-center">
            <div className="bg-gradient-to-r from-pink-50 to-rose-50 border-2 border-pink-200 rounded-lg p-6 mb-4">
              <Sparkles className="h-8 w-8 text-pink-500 mx-auto mb-3" />
              <p className="text-pink-800 font-bold text-lg mb-2">It's a Mutual Match! 🎉</p>
              <p className="text-pink-600 text-sm mb-4">Both of you are interested - this could be the start of something special!</p>
              <Button 
                className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
                onClick={handleStartConversation}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Start Conversation
              </Button>
            </div>
            <Button 
              onClick={onBack}
              variant="outline"
              className="w-full"
            >
              Back to Matches
            </Button>
          </div>
        );
      
      case 'interested':
        return (
          <div className="text-center">
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
              <CheckCircle className="h-6 w-6 text-emerald-500 mx-auto mb-2" />
              <p className="text-emerald-800 font-semibold">Interest Expressed! ✨</p>
              <p className="text-emerald-600 text-sm">We'll notify you if they're interested too</p>
            </div>
            <Button 
              onClick={onBack}
              variant="outline"
              className="w-full"
            >
              Back to Matches
            </Button>
          </div>
        );
      
      case 'passed':
        return (
          <div className="text-center">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
              <p className="text-gray-600">You passed on this match</p>
            </div>
            <Button 
              onClick={onBack}
              variant="outline"
              className="w-full"
            >
              Back to Matches
            </Button>
          </div>
        );
      
      default:
        return (
          <>
            <Button 
              onClick={handleInterested}
              className="btn-gradient w-full mb-3"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              I'm Interested
            </Button>
            
            <Button 
              onClick={handlePass}
              variant="outline"
              className="w-full"
            >
              <X className="h-4 w-4 mr-2" />
              Pass for Now
            </Button>
          </>
        );
    }
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
        <Card className="card-glass mb-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-playfair font-bold text-foreground mb-4 flex items-center">
              <Heart className="h-5 w-5 mr-2 text-accent" />
              Why This Match?
            </h3>
            
            <div className="space-y-3 text-sm text-muted-foreground">
              {compatibilityScore.explanations.why_compatible.map((reason, index) => (
                <p key={index} className="flex items-start">
                  <span className="text-emerald-500 mr-2">•</span>
                  {reason}
                </p>
              ))}
              
              {compatibilityScore.explanations.relationship_strengths.map((strength, index) => (
                <p key={index} className="flex items-start">
                  <span className="text-emerald-500 mr-2">•</span>
                  {strength}
                </p>
              ))}
            </div>

            {compatibilityScore.explanations.potential_challenges.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="font-semibold text-sm text-gray-700 mb-2">Areas for Growth:</h4>
                {compatibilityScore.explanations.potential_challenges.map((challenge, index) => (
                  <p key={index} className="text-sm text-amber-600 flex items-start">
                    <span className="mr-2">•</span>
                    {challenge}
                  </p>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-4">
          {renderConnectionStatus()}
        </div>
      </div>
    </div>
  );
};

export default MatchDetail;
