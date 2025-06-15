
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Calendar, Users, Star, MessageCircle, Settings, Sparkles } from "lucide-react";
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

  // Show main dashboard with romantic redesign
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Elegant Header */}
      <header className="px-6 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-2xl bg-gradient-to-r from-primary to-accent animate-pulse-glow">
            <Heart className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-playfair font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            LockInOnce
          </span>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => navigate('/onboarding')}
          className="p-3 rounded-xl hover:bg-primary/10 transition-colors"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </header>

      <div className="max-w-md mx-auto px-6">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-playfair font-bold text-foreground mb-2">
            Your Daily Connections
          </h1>
          <div className="flex items-center justify-center space-x-2 text-muted-foreground mb-4">
            <Calendar className="h-4 w-4" />
            <span className="font-medium">Friday, June 15, 2025</span>
          </div>
          
          <blockquote 
            className="quote-modern mb-6 py-4 px-4 card-glass"
            role="complementary"
          >
            <span className="sr-only">Quote: </span>
            "Love is not about finding someone to live with, it's about finding someone you can't live without."
          </blockquote>
        </div>

        {/* Featured Match of the Day */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Sparkles className="h-5 w-5 text-accent" />
            <h2 className="text-lg font-playfair font-bold text-foreground">
              Today's Perfect Match
            </h2>
          </div>
          
          {mockMatches.slice(0, 1).map((match) => (
            <Card 
              key={match.id} 
              className="card-glass p-6 cursor-pointer hover:scale-[1.02] transition-all duration-300 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10"
              onClick={() => handleMatchClick(match)}
            >
              <CardContent className="pt-0">
                <div className="text-center mb-4">
                  <div className="relative inline-block">
                    <img 
                      src={match.photo} 
                      alt={match.name}
                      className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-4 border-white shadow-lg"
                    />
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-accent to-primary text-white text-xs rounded-full w-8 h-8 flex items-center justify-center shadow-lg">
                      <Crown className="h-4 w-4" />
                    </div>
                  </div>
                  <h3 className="text-xl font-playfair font-bold text-foreground mb-1">
                    {match.name}, {match.age}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">{match.location}</p>
                  
                  <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold mb-4 ${getScoreBackground(match.compatibilityScore.overall)} ${getScoreColor(match.compatibilityScore.overall)}`}>
                    <Star className="h-4 w-4 mr-2" />
                    {match.compatibilityScore.overall}% Perfect Match
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground text-center leading-relaxed mb-4">
                  {match.bio}
                </p>
                
                <div className="flex justify-center space-x-6 text-xs text-muted-foreground mb-4">
                  <div className="text-center">
                    <div className="font-semibold">💖</div>
                    <div>{match.compatibilityScore.attachment}%</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">🧠</div>
                    <div>{match.compatibilityScore.personality}%</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">👨‍👩‍👧‍👦</div>
                    <div>{match.compatibilityScore.birthOrder}%</div>
                  </div>
                </div>
                
                <Button 
                  className="btn-gradient w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleConnect(match.id);
                  }}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Send Connection Request
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* More Quality Matches */}
        <div className="mb-8">
          <h2 className="text-lg font-playfair font-bold text-foreground mb-4 flex items-center">
            <Users className="h-5 w-5 mr-2 text-primary" />
            More Quality Connections
          </h2>
          
          <div className="space-y-4">
            {mockMatches.slice(1, 4).map((match) => (
              <Card 
                key={match.id} 
                className="card-glass p-4 cursor-pointer hover:scale-[1.01] transition-all duration-200"
                onClick={() => handleMatchClick(match)}
              >
                <CardContent className="pt-0">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={match.photo} 
                      alt={match.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-playfair font-bold text-foreground">
                          {match.name}, {match.age}
                        </h3>
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${getScoreBackground(match.compatibilityScore.overall)} ${getScoreColor(match.compatibilityScore.overall)}`}>
                          <Star className="h-3 w-3 mr-1" />
                          {match.compatibilityScore.overall}%
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{match.location}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {match.bio}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex items-center justify-between">
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

        {/* Discover More Section */}
        <div className="mb-8">
          <h2 className="text-lg font-playfair font-bold text-foreground mb-4">
            Discover More
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {mockMatches.slice(4).map((match) => (
              <Card 
                key={match.id} 
                className="card-glass p-4 cursor-pointer hover:scale-[1.02] transition-all duration-200"
                onClick={() => handleMatchClick(match)}
              >
                <CardContent className="pt-0 text-center">
                  <img 
                    src={match.photo} 
                    alt={match.name}
                    className="w-12 h-12 rounded-full mx-auto mb-2 object-cover border-2 border-white shadow-md"
                  />
                  <h3 className="font-playfair font-semibold text-foreground text-sm mb-1">
                    {match.name}, {match.age}
                  </h3>
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold mb-2 ${getScoreBackground(match.compatibilityScore.overall)} ${getScoreColor(match.compatibilityScore.overall)}`}>
                    <Star className="h-3 w-3 mr-1" />
                    {match.compatibilityScore.overall}%
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {match.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="space-y-4 pb-8">
          <div className="card-glass p-4 text-center bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10">
            <p className="text-sm text-muted-foreground mb-3 font-medium">
              Want to refine your matches?
            </p>
            <Button 
              onClick={() => navigate('/onboarding')}
              variant="outline"
              className="w-full mb-2"
            >
              Update Your Profile
            </Button>
            <Button 
              onClick={() => navigate('/')}
              variant="ghost"
              className="w-full text-sm"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Crown component for the featured match
const Crown = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 7l4 10h8l4-10-3 1-5-4-5 4z"/>
  </svg>
);

export default Dashboard;
