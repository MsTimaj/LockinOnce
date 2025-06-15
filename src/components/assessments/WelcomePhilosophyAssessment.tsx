
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface WelcomePhilosophyAssessmentProps {
  onComplete: () => void;
}

const WelcomePhilosophyAssessment = ({ onComplete }: WelcomePhilosophyAssessmentProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-playfair font-bold text-foreground">
          Welcome to LockInOnce
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Let's create your profile based on proven relationship science. 
          This will take about 18-22 minutes and help us find your most compatible matches.
        </p>
      </div>

      <div className="space-y-6">
        <Card className="card-glass border-l-4 border-accent">
          <CardContent className="p-6">
            <p className="text-accent font-medium mb-2">
              For Serious Relationships Only
            </p>
            <p className="text-sm text-muted-foreground">
              LockInOnce is designed exclusively for people seeking deep, lasting love. 
              No casual dating - we focus on true compatibility for long-term partnerships.
            </p>
          </CardContent>
        </Card>

        <Card className="card-glass">
          <CardContent className="p-6">
            <h3 className="text-primary font-medium mb-3">Our Philosophy</h3>
            <p className="text-sm text-muted-foreground mb-4">
              "Deep compatibility isn't about finding someone identical to you—
              it's about finding someone who complements your emotional patterns and shares your commitment to growth."
            </p>
            <div className="space-y-2 text-left">
              <p className="text-xs text-muted-foreground">✓ Science-based compatibility matching</p>
              <p className="text-xs text-muted-foreground">✓ Focus on emotional maturity and readiness</p>
              <p className="text-xs text-muted-foreground">✓ Commitment to long-term partnership goals</p>
              <p className="text-xs text-muted-foreground">✓ Comprehensive 9-assessment compatibility profile</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Button 
        onClick={onComplete}
        className="btn-gradient w-full"
      >
        Start Assessment
        <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
};

export default WelcomePhilosophyAssessment;
