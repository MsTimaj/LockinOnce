
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Calendar, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

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

        {/* Coming Soon Message */}
        <Card className="card-glass p-8 text-center mb-8">
          <CardContent className="pt-0">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-accent/20 to-primary/20 w-fit mx-auto mb-4">
              <Calendar className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-xl font-playfair font-bold mb-3 text-foreground">
              Daily Matches Coming Soon
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Your personalized matches will appear here each morning at 9 AM, 
              based on your compatibility profile.
            </p>
            <div className="space-y-3">
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>10 quality matches daily</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <Heart className="h-4 w-4" />
                <span>Science-based compatibility</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="space-y-4">
          <Button 
            onClick={() => navigate('/onboarding')}
            className="btn-gradient w-full"
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
