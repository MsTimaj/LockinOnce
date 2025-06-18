
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, Target, Sparkles, ArrowRight, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { UserStateManager } from "@/utils/userStateManager";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleStartOnboarding = () => {
    navigate("/onboarding");
  };

  const handleResetForTesting = async () => {
    try {
      await UserStateManager.resetForTesting();
      toast({
        title: "Demo Reset Complete",
        description: "All demo data cleared. You can now test as a new user.",
      });
      // Small delay before refresh to show the toast
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast({
        title: "Reset Failed",
        description: "There was an issue resetting the demo. Please refresh the page.",
        variant: "destructive",
      });
    }
  };

  const handleCheckDashboard = async () => {
    const hasCompleted = await UserStateManager.hasCompletedOnboarding();
    if (hasCompleted) {
      // Navigate to AI results first, then they can access dashboard from there
      navigate('/ai-results');
    } else {
      toast({
        title: "Complete Assessment First",
        description: "Please complete the assessment process to see your results.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <div className="flex items-center justify-center mb-4 sm:mb-6">
              <div className="p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-rose-400 to-pink-500 shadow-lg">
                <Heart className="h-6 w-6 sm:h-8 sm:w-8 lg:h-12 lg:w-12 text-white" />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3 mb-4 sm:mb-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
                LockInOnce
              </h1>
              <span className="bg-rose-100 text-rose-600 text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full font-medium">
                Beta Demo
              </span>
            </div>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-4 sm:mb-6 lg:mb-8 max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
              Science-based compatibility matching for serious relationships. 
              Find your one true match through our comprehensive personality and attachment assessment.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 lg:mb-8 max-w-2xl mx-auto">
              <p className="text-xs sm:text-sm text-amber-800">
                <strong>Demo Version:</strong> This is a demonstration of the LockInOnce matching system. 
                All profiles and matches are simulated for testing purposes.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center px-2 sm:px-0">
              <Button 
                onClick={handleStartOnboarding}
                className="w-full sm:w-auto bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg min-h-[48px] sm:min-h-[56px]"
                size="lg"
              >
                Start Demo Assessment
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
              </Button>
              <Button 
                onClick={handleCheckDashboard}
                variant="outline"
                className="w-full sm:w-auto border-rose-200 text-rose-600 hover:bg-rose-50 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg min-h-[48px] sm:min-h-[56px]"
              >
                View Demo Results
              </Button>
            </div>
            
            {/* Testing Reset Button */}
            <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-3">Demo Controls</p>
              <Button 
                onClick={handleResetForTesting}
                variant="outline"
                size="sm"
                className="border-gray-300 text-gray-600 hover:bg-gray-50 min-h-[40px] px-4 py-2"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset Demo Data
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16 px-2 sm:px-0">
            <Card className="bg-white/70 backdrop-blur-sm border border-white/50">
              <CardHeader className="text-center pb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 rounded-xl bg-gradient-to-r from-purple-400 to-rose-400 flex items-center justify-center">
                  <Target className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <CardTitle className="text-rose-700 text-lg sm:text-xl">Science-Based Matching</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600 text-center text-sm sm:text-base">
                  Our algorithm uses proven psychology research on attachment theory, personality compatibility, and relationship science to find your ideal match.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border border-white/50">
              <CardHeader className="text-center pb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 rounded-xl bg-gradient-to-r from-rose-400 to-pink-500 flex items-center justify-center">
                  <Users className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <CardTitle className="text-rose-700 text-lg sm:text-xl">Deep Compatibility</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600 text-center text-sm sm:text-base">
                  Go beyond surface-level attraction. We analyze 13 key dimensions of compatibility including values, communication styles, and life goals.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border border-white/50 sm:col-span-2 lg:col-span-1">
              <CardHeader className="text-center pb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 rounded-xl bg-gradient-to-r from-pink-400 to-rose-500 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <CardTitle className="text-rose-700 text-lg sm:text-xl">AI Relationship Coach</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600 text-center text-sm sm:text-base">
                  Meet Love-vee, your personal AI dating coach. Get personalized advice, conversation starters, and relationship guidance 24/7.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Assessment Preview */}
          <Card className="bg-gradient-to-r from-rose-100 to-pink-100 border-rose-200 mx-2 sm:mx-0">
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <div className="text-center">
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-gray-800 mb-3 sm:mb-4">
                  Your Comprehensive Assessment
                </h2>
                <p className="text-gray-700 mb-4 sm:mb-6 max-w-2xl mx-auto text-sm sm:text-base">
                  Complete our 13-part assessment covering attachment style, personality, values, and relationship goals. 
                  Takes 15-20 minutes and creates your unique compatibility profile.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
                  <div>• Attachment Style</div>
                  <div>• Personality Type</div>
                  <div>• Communication Style</div>
                  <div>• Life Goals</div>
                  <div>• Core Values</div>
                  <div>• Love Languages</div>
                  <div>• Lifestyle Preferences</div>
                  <div>• Financial Values</div>
                </div>
                <Button 
                  onClick={handleStartOnboarding}
                  className="w-full sm:w-auto bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-6 sm:px-8 py-3 sm:py-4 min-h-[48px] sm:min-h-[56px]"
                >
                  Begin Assessment
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
