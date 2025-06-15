
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Calendar, Users, Star, MessageCircle, Settings, Sparkles, Crown } from "lucide-react";
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

  // Split matches into top 3 and other 7
  const topChoices = mockMatches.slice(0, 3);
  const otherMatches = mockMatches.slice(3, 10);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      {/* Header */}
      <header className="px-6 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-2xl bg-gradient-to-r from-rose-400 to-pink-500 shadow-lg">
            <Heart className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-serif font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
            LockInOnce
          </span>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => navigate('/onboarding')}
          className="p-3 rounded-xl hover:bg-rose-100 transition-colors"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </header>

      <div className="max-w-md mx-auto px-6">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-gray-800 mb-2">
            Your Perfect Matches
          </h1>
          <div className="flex items-center justify-center space-x-2 text-gray-600 mb-4">
            <Calendar className="h-4 w-4" />
            <span className="font-medium">Today's Selection</span>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-white/50 mb-6">
            <p className="text-sm text-gray-600 italic leading-relaxed">
              "The best relationships are built on deep compatibility and understanding."
            </p>
          </div>
        </div>

        {/* Top 3 Choices */}
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
                onClick={() => handleMatchClick(match)}
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
                            handleConnect(match.id);
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

        {/* 7 Other Close Matches */}
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
                onClick={() => handleMatchClick(match)}
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

        {/* Navigation Footer */}
        <div className="space-y-4 pb-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/30 shadow-sm">
            <p className="text-sm text-gray-700 mb-3 font-medium">
              Want to see more matches?
            </p>
            <Button 
              onClick={() => navigate('/onboarding')}
              variant="outline"
              className="w-full mb-2 border-rose-200 hover:bg-rose-50"
            >
              Update Your Preferences
            </Button>
            <Button 
              onClick={() => navigate('/')}
              variant="ghost"
              className="w-full text-sm hover:bg-rose-50"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
