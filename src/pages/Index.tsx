
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

  const handleResetForTesting = () => {
    UserStateManager.resetForTesting();
    toast({
      title: "Data Cleared",
      description: "All user data has been cleared. You can now test as a new user.",
    });
    // Refresh the page to ensure clean state
    window.location.reload();
  };

  const handleCheckDashboard = async () => {
    const hasCompleted = await UserStateManager.hasCompletedOnboarding();
    if (hasCompleted) {
      navigate('/dashboard');
    } else {
      toast({
        title: "Complete Onboarding First",
        description: "Please complete the assessment process to access your dashboard.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-400 to-pink-500 shadow-lg">
                <Heart className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-serif font-bold text-gray-800 mb-6">
              Lock In Once
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Science-based compatibility matching for serious relationships. 
              Find your one true match through our comprehensive personality and attachment assessment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={handleStartOnboarding}
                className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-8 py-3 text-lg"
                size="lg"
              >
                Start Your Assessment
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button 
                onClick={handleCheckDashboard}
                variant="outline"
                className="border-rose-200 text-rose-600 hover:bg-rose-50"
              >
                View Dashboard
              </Button>
            </div>
            
            {/* Testing Reset Button */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-3">Testing & Development</p>
              <Button 
                onClick={handleResetForTesting}
                variant="outline"
                size="sm"
                className="border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset as New User
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-white/70 backdrop-blur-sm border border-white/50">
              <CardHeader className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-r from-purple-400 to-rose-400 flex items-center justify-center">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-rose-700">Science-Based Matching</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Our algorithm uses proven psychology research on attachment theory, personality compatibility, and relationship science to find your ideal match.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border border-white/50">
              <CardHeader className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-r from-rose-400 to-pink-500 flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-rose-700">Deep Compatibility</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Go beyond surface-level attraction. We analyze 13 key dimensions of compatibility including values, communication styles, and life goals.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border border-white/50">
              <CardHeader className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-r from-pink-400 to-rose-500 flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-rose-700">AI Relationship Coach</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Meet Love-vee, your personal AI dating coach. Get personalized advice, conversation starters, and relationship guidance 24/7.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Assessment Preview */}
          <Card className="bg-gradient-to-r from-rose-100 to-pink-100 border-rose-200">
            <CardContent className="p-8">
              <div className="text-center">
                <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4">
                  Your Comprehensive Assessment
                </h2>
                <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                  Complete our 13-part assessment covering attachment style, personality, values, and relationship goals. 
                  Takes 18-22 minutes and creates your unique compatibility profile.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-gray-600 mb-6">
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
                  className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white"
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
