import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Brain, Users, Target, ArrowRight, Sparkles, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LoveVeeChatButton from "@/components/ai/LoveVeeChatButton";
import { UserStateManager } from "@/utils/userStateManager";
import { calculateRelationshipReadiness, getDominantPersonalityType, getTopStrengths } from "@/utils/assessmentScoring";

const AIResultsSummary = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [currentInsight, setCurrentInsight] = useState(0);
  const [chatTopic, setChatTopic] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const navigate = useNavigate();

  const insights = [
    "Analyzing your attachment style patterns...",
    "Understanding your personality compatibility...",
    "Evaluating your relationship readiness...",
    "Generating your unique dating strategy...",
    "Preparing your personalized matches..."
  ];

  useEffect(() => {
    const initializeAnalysis = async () => {
      try {
        console.log('Initializing AI Results Summary...');
        
        // Check if navigation is in progress
        if (UserStateManager.isNavigationInProgress()) {
          console.log('Navigation in progress, waiting...');
          return;
        }

        // CRITICAL FIX: Use unified completion check
        const hasCompleted = await UserStateManager.hasCompletedOnboarding();
        const isAssessmentComplete = await UserStateManager.isAssessmentComplete();
        
        console.log('AI Results validation:', { 
          hasCompleted, 
          isAssessmentComplete 
        });

        // BOTH conditions must be true to show results
        if (!hasCompleted || !isAssessmentComplete) {
          console.log('User has not completed onboarding or assessments, redirecting...');
          navigate('/onboarding');
          return;
        }

        const userProfile = await UserStateManager.getUserProfile();
        if (!userProfile) {
          console.log('No user profile found, redirecting to onboarding...');
          navigate('/onboarding');
          return;
        }

        console.log('User profile loaded, calculating analysis...');

        // Calculate real analysis
        let readinessScore = userProfile.readinessScore;
        
        // If no cached score, calculate it
        if (!readinessScore) {
          console.log('No cached readiness score, calculating...');
          readinessScore = calculateRelationshipReadiness(userProfile.assessmentResults);
          // Save it for next time
          await UserStateManager.saveReadinessScore(readinessScore);
        }

        const personalityType = getDominantPersonalityType(userProfile.assessmentResults.personality);
        const dominantStyle = userProfile.assessmentResults.attachmentStyle?.dominantStyle || 'secure';
        const topStrengths = getTopStrengths(userProfile.assessmentResults);

        console.log('Analysis complete:', { readinessScore, personalityType, dominantStyle });

        setAnalysis({
          readinessScore,
          personalityType,
          dominantStyle,
          topStrengths
        });

        setIsInitializing(false);
      } catch (error) {
        console.error('Failed to initialize analysis:', error);
        // Don't redirect on error, but log it
        setIsInitializing(false);
      }
    };

    initializeAnalysis();
  }, [navigate]);

  useEffect(() => {
    if (isInitializing) return;

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
  }, [isInitializing]);

  const handleLearnMore = (topic: string) => {
    setChatTopic(topic);
    setIsChatOpen(true);
  };

  // Show loading while initializing
  if (isInitializing) {
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
              Preparing your results...
            </h2>
            <p className="text-rose-600 font-medium animate-pulse">
              Validating your assessment data...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isAnalyzing || !analysis) {
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

  const { readinessScore, personalityType, dominantStyle, topStrengths } = analysis;

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
            <div className="text-4xl font-bold text-rose-600 mb-2">{readinessScore.overall}%</div>
            <p className="text-sm text-gray-600 mb-3">
              {readinessScore.isReady ? "You're highly prepared for a meaningful relationship" : "Focus on growth areas to enhance your relationship readiness"}
            </p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleLearnMore("relationship readiness")}
              className="text-rose-600 border-rose-200 hover:bg-rose-50"
            >
              Learn More
            </Button>
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
              <Badge variant="secondary" className={`mb-3 ${
                dominantStyle === 'secure' ? 'bg-green-100 text-green-800' :
                dominantStyle === 'anxious' ? 'bg-yellow-100 text-yellow-800' :
                dominantStyle === 'avoidant' ? 'bg-orange-100 text-orange-800' :
                'bg-red-100 text-red-800'
              }`}>
                {dominantStyle.charAt(0).toUpperCase() + dominantStyle.slice(1)} Attachment
              </Badge>
              <p className="text-sm text-gray-600 mb-3">
                {dominantStyle === 'secure' 
                  ? "Your secure attachment style means you're comfortable with intimacy and independence. This is your biggest relationship asset - you naturally create safe, stable connections."
                  : dominantStyle === 'anxious'
                  ? "You value close relationships but sometimes worry about your partner's feelings. Learning to self-soothe and communicate needs clearly will strengthen your connections."
                  : dominantStyle === 'avoidant'
                  ? "You value independence but may struggle with intimacy. Gradually opening up and recognizing the value of emotional connection will enhance your relationships."
                  : "You may experience conflicting needs for closeness and distance. Developing emotional awareness and communication skills will help create more stable relationships."
                }
              </p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleLearnMore("attachment style")}
                className="text-rose-600 border-rose-200 hover:bg-rose-50"
              >
                Learn More
              </Button>
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
                {personalityType}
              </Badge>
              <p className="text-sm text-gray-600 mb-3">
                {personalityType.includes('Introverted') 
                  ? "You process emotions deeply and prefer meaningful one-on-one conversations. You build trust gradually but form very deep connections."
                  : "You're energized by social interaction and tend to think out loud. You're naturally warm and expressive in relationships."
                }
              </p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleLearnMore("communication style")}
                className="text-rose-600 border-rose-200 hover:bg-rose-50"
              >
                Learn More
              </Button>
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
              <ul className="space-y-2 mb-3">
                {topStrengths.map((strength, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">{strength}</span>
                  </li>
                ))}
              </ul>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleLearnMore("relationship strengths")}
                className="text-rose-600 border-rose-200 hover:bg-rose-50"
              >
                Learn More
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border border-white/50">
            <CardHeader>
              <CardTitle className="text-amber-700">Growth Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-3">
                {readinessScore.growthAreas.map((area, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-sm">{area}</span>
                  </li>
                ))}
              </ul>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleLearnMore("relationship growth areas")}
                className="text-rose-600 border-rose-200 hover:bg-rose-50"
              >
                Learn More
              </Button>
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
            <p className="text-gray-700 italic mb-3">"{readinessScore.personalizedStrategy}"</p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleLearnMore("personalized dating strategy")}
              className="text-rose-600 border-rose-200 hover:bg-rose-50"
            >
              Learn More
            </Button>
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

      <LoveVeeChatButton 
        initialTopic={chatTopic}
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
      />
    </div>
  );
};

export default AIResultsSummary;
