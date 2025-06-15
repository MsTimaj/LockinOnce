
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Brain, Users, Target, ArrowRight, Sparkles, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AIResultsSummary = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [currentInsight, setCurrentInsight] = useState(0);
  const navigate = useNavigate();

  const insights = [
    "Analyzing your attachment style patterns...",
    "Understanding your personality compatibility...",
    "Evaluating your relationship readiness...",
    "Generating your unique dating strategy...",
    "Preparing your personalized matches..."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentInsight((prev) => {
        if (prev >= insights.length - 1) {
          clearInterval(timer);
          setIsAnalyzing(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);

    return () => clearInterval(timer);
  }, []);

  const mockAnalysis = {
    dominantStyle: "Secure Attachment",
    personalityType: "Introverted Feeling",
    readinessScore: 87,
    topStrengths: ["Emotional Intelligence", "Clear Communication", "Relationship Goals"],
    growthAreas: ["Opening Up Gradually", "Managing Expectations"],
    datingStrategy: "Focus on quality connections through shared activities and meaningful conversations. Your secure attachment style is a major asset.",
    matchingFactors: ["Values alignment (30%)", "Communication style (25%)", "Life goals (20%)", "Emotional maturity (15%)", "Lifestyle compatibility (10%)"]
  };

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="relative">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-rose-400 to-pink-500 flex items-center justify-center">
              <Brain className="h-10 w-10 text-white animate-pulse" />
            </div>
            <div className="absolute inset-0 w-20 h-20 mx-auto rounded-full border-4 border-rose-200 animate-spin border-t-transparent"></div>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-serif font-bold text-gray-800 mb-2">
              Love-vee is analyzing your results...
            </h2>
            <p className="text-rose-600 font-medium animate-pulse">
              {insights[currentInsight]}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 px-6 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-3 rounded-2xl bg-gradient-to-r from-rose-400 to-pink-500 shadow-lg">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-serif font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              Love-vee's Analysis
            </h1>
          </div>
          <p className="text-gray-600">Your personalized relationship compatibility profile</p>
        </div>

        {/* Overall Score */}
        <Card className="bg-white/70 backdrop-blur-sm border border-white/50 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center space-x-2">
              <Target className="h-5 w-5 text-rose-500" />
              <span>Relationship Readiness Score</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-4xl font-bold text-rose-600 mb-2">{mockAnalysis.readinessScore}%</div>
            <p className="text-sm text-gray-600">You're highly prepared for a meaningful relationship</p>
          </CardContent>
        </Card>

        {/* Key Insights */}
        <div className="grid gap-4">
          <Card className="bg-white/70 backdrop-blur-sm border border-white/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-rose-700">
                <Heart className="h-5 w-5" />
                <span>Your Attachment Style</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="secondary" className="mb-3 bg-green-100 text-green-800">
                {mockAnalysis.dominantStyle}
              </Badge>
              <p className="text-sm text-gray-600">
                Your secure attachment style means you're comfortable with intimacy and independence. 
                This is your biggest relationship asset - you naturally create safe, stable connections.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border border-white/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-rose-700">
                <Brain className="h-5 w-5" />
                <span>Your Communication Style</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="secondary" className="mb-3 bg-blue-100 text-blue-800">
                {mockAnalysis.personalityType}
              </Badge>
              <p className="text-sm text-gray-600">
                You process emotions deeply and value authentic connections. You prefer meaningful 
                conversations over small talk, which helps you build genuine relationships.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Strengths & Growth */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="bg-white/70 backdrop-blur-sm border border-white/50">
            <CardHeader>
              <CardTitle className="text-green-700">Your Strengths</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {mockAnalysis.topStrengths.map((strength, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">{strength}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border border-white/50">
            <CardHeader>
              <CardTitle className="text-amber-700">Growth Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {mockAnalysis.growthAreas.map((area, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-sm">{area}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Dating Strategy */}
        <Card className="bg-gradient-to-r from-rose-100 to-pink-100 border-rose-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-rose-700">
              <Users className="h-5 w-5" />
              <span>Love-vee's Dating Strategy for You</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 italic">"{mockAnalysis.datingStrategy}"</p>
          </CardContent>
        </Card>

        {/* Matching Factors */}
        <Card className="bg-white/70 backdrop-blur-sm border border-white/50">
          <CardHeader>
            <CardTitle className="text-rose-700">How We'll Match You</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mockAnalysis.matchingFactors.map((factor, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <span className="text-gray-700">{factor.split(' (')[0]}</span>
                  <Badge variant="outline" className="text-xs">
                    {factor.split(' (')[1].replace(')', '')}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Love-vee Chat Intro */}
        <Card className="bg-gradient-to-r from-purple-100 to-rose-100 border-purple-200">
          <CardContent className="p-6">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-purple-400 to-rose-400 flex items-center justify-center">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-serif font-bold text-gray-800">Meet Love-vee</h3>
              <p className="text-sm text-gray-600">
                Your AI dating coach is now available 24/7! Ask Love-vee about dating tips, 
                match insights, conversation starters, or relationship advice anytime.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center pt-4">
          <Button 
            onClick={() => navigate('/dashboard')}
            className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-8 py-3 text-lg"
          >
            See Your Perfect Matches
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
          <p className="text-xs text-gray-500 mt-2">
            Love-vee will be available in your dashboard for ongoing coaching
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIResultsSummary;
