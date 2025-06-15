
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Calendar, Users, Star, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mockMatches } from "@/data/mockMatches";
import { MatchProfile } from "@/utils/compatibilityCalculator";
import MatchDetail from "@/components/matches/MatchDetail";

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedMatch, setSelectedMatch] = useState<MatchProfile | null>(null);
  const [connectedMatches, setConnectedMatches] = useState<Set<string>>(new Set());

  const handleMatchClick = (match: MatchProfile) => {
    setSelectedMatch(match);
  };

  const handleBackToMatches = () => {
    setSelectedMatch(null);
  };

  const handleConnect = (matchId: string) => {
    setConnectedMatches(prev => new Set([...prev, matchId]));
    console.log(`Connected with match ${matchId}`);
    // Could show a toast here
  };

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

  // Show match detail if a match is selected
  if (selectedMatch) {
    return (
      <MatchDetail 
        match={selectedMatch}
        onBack={handleBackToMatches}
        onConnect={handleConnect}
      />
    );
  }

  // Show main dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 px-6 py-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-2 rounded-xl bg-gradient-to-r from-primary to-accent animate-pulse-glow">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-playfair font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Today's Matches
            </h1>
          </div>
          <p className="text-muted-foreground">
            Friday, June 15, 2025
          </p>
        </div>

        {/* Top 3 Matches */}
        <div className="mb-6">
          <h2 className="text-lg font-playfair font-bold text-foreground mb-4">
            Top Compatibility
          </h2>
          <div className="space-y-4">
            {mockMatches.slice(0, 3).map((match, index) => (
              <Card 
                key={match.id} 
                className="card-glass p-4 cursor-pointer hover:scale-[1.02] transition-transform"
                onClick={() => handleMatchClick(match)}
              >
                <CardContent className="pt-0">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img 
                        src={match.photo} 
                        alt={match.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      {index === 0 && (
                        <div className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                          👑
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-foreground">
                          {match.name}, {match.age}
                        </h3>
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${getScoreBackground(match.compatibilityScore.overall)} ${getScoreColor(match.compatibilityScore.overall)}`}>
                          <Star className="h-3 w-3 mr-1" />
                          {match.compatibilityScore.overall}%
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{match.location}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {match.bio}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>💖 {match.compatibilityScore.attachment}%</span>
                      <span>🧠 {match.compatibilityScore.personality}%</span>
                      <span>👨‍👩‍👧‍👦 {match.compatibilityScore.birthOrder}%</span>
                    </div>
                    
                    {connectedMatches.has(match.id) ? (
                      <span className="text-xs text-green-600 font-semibold">Connected ✓</span>
                    ) : (
                      <MessageCircle className="h-4 w-4 text-primary" />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* More Matches */}
        <div className="mb-8">
          <h2 className="text-lg font-playfair font-bold text-foreground mb-4">
            More Matches
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {mockMatches.slice(3).map((match) => (
              <Card 
                key={match.id} 
                className="card-glass p-4 cursor-pointer hover:scale-[1.02] transition-transform"
                onClick={() => handleMatchClick(match)}
              >
                <CardContent className="pt-0 text-center">
                  <img 
                    src={match.photo} 
                    alt={match.name}
                    className="w-12 h-12 rounded-full mx-auto mb-2 object-cover"
                  />
                  <h3 className="font-semibold text-foreground text-sm mb-1">
                    {match.name}, {match.age}
                  </h3>
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold mb-2 ${getScoreBackground(match.compatibilityScore.overall)} ${getScoreColor(match.compatibilityScore.overall)}`}>
                    <Star className="h-3 w-3 mr-1" />
                    {match.compatibilityScore.overall}%
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {match.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="space-y-4">
          <Button 
            onClick={() => navigate('/onboarding')}
            variant="outline"
            className="w-full"
          >
            Complete Your Profile
          </Button>
          <Button 
            onClick={() => navigate('/')}
            variant="outline"
            className="w-full"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
