
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Heart, X, MapPin, Briefcase, GraduationCap, Star } from "lucide-react";
import { MatchProfile } from "@/utils/compatibilityCalculator";

interface MatchDetailProps {
  match: MatchProfile;
  onBack: () => void;
  onConnect: (matchId: string) => void;
  onPass: (matchId: string) => void;
}

const MatchDetail = ({ match, onBack, onConnect, onPass }: MatchDetailProps) => {
  const [hasDecided, setHasDecided] = useState(false);

  const handleConnect = () => {
    console.log('I\'m Interested button clicked for match:', match.id);
    setHasDecided(true);
    onConnect(match.id);
  };

  const handlePass = () => {
    console.log('Pass for Now button clicked for match:', match.id);
    setHasDecided(true);
    onPass(match.id);
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/50 px-6 py-4">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="p-3 rounded-xl hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-playfair font-bold text-foreground">
            {match.name}
          </h1>
          <div className="w-11" /> {/* Spacer for centering */}
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 space-y-6">
        {/* Profile Photo & Basic Info */}
        <Card className="bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <img 
                src={match.photo} 
                alt={match.name}
                className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-white shadow-lg"
              />
              <div>
                <h2 className="text-2xl font-serif font-bold text-gray-800">
                  {match.name}, {match.age}
                </h2>
                <div className="flex items-center justify-center text-gray-600 mt-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{match.location}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Compatibility Score */}
        <Card className={`border shadow-lg ${getScoreBackground(match.compatibilityScore.overall)}`}>
          <CardContent className="p-6">
            <div className="text-center">
              <div className={`text-4xl font-bold ${getScoreColor(match.compatibilityScore.overall)} mb-2`}>
                {match.compatibilityScore.overall}%
              </div>
              <p className="text-sm text-gray-600 mb-4">Overall Compatibility</p>
              
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="text-center">
                  <div className={`text-lg font-bold ${getScoreColor(match.compatibilityScore.attachment)}`}>
                    {match.compatibilityScore.attachment}%
                  </div>
                  <p className="text-xs text-gray-600">Attachment</p>
                </div>
                <div className="text-center">
                  <div className={`text-lg font-bold ${getScoreColor(match.compatibilityScore.personality)}`}>
                    {match.compatibilityScore.personality}%
                  </div>
                  <p className="text-xs text-gray-600">Personality</p>
                </div>
                <div className="text-center">
                  <div className={`text-lg font-bold ${getScoreColor(match.compatibilityScore.birthOrder)}`}>
                    {match.compatibilityScore.birthOrder}%
                  </div>
                  <p className="text-xs text-gray-600">Birth Order</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bio */}
        <Card className="bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">About {match.name}</h3>
            <p className="text-gray-700 leading-relaxed">{match.bio}</p>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        {!hasDecided && match.connectionStatus !== 'interested' && match.connectionStatus !== 'passed' && (
          <div className="flex space-x-4">
            <Button 
              onClick={handlePass}
              variant="outline"
              className="flex-1 py-4 rounded-2xl border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50"
            >
              <X className="h-5 w-5 mr-2" />
              Pass for Now
            </Button>
            <Button 
              onClick={handleConnect}
              className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-lg"
            >
              <Heart className="h-5 w-5 mr-2" />
              I'm Interested!
            </Button>
          </div>
        )}

        {/* Status Messages */}
        {match.connectionStatus === 'interested' && (
          <Card className="bg-emerald-50 border-emerald-200">
            <CardContent className="p-4 text-center">
              <p className="text-emerald-700 font-medium">
                ✓ You've expressed interest in {match.name}!
              </p>
            </CardContent>
          </Card>
        )}

        {match.connectionStatus === 'mutual' && (
          <Card className="bg-pink-50 border-pink-200">
            <CardContent className="p-4 text-center">
              <p className="text-pink-700 font-medium">
                🎉 It's a mutual match with {match.name}!
              </p>
            </CardContent>
          </Card>
        )}

        {match.connectionStatus === 'passed' && (
          <Card className="bg-gray-50 border-gray-200">
            <CardContent className="p-4 text-center">
              <p className="text-gray-600">
                You passed on {match.name}
              </p>
            </CardContent>
          </Card>
        )}

        {hasDecided && match.connectionStatus === 'none' && (
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4 text-center">
              <p className="text-blue-700 font-medium">
                Decision recorded! Check back later for updates.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MatchDetail;
