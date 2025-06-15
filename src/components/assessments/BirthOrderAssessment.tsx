
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";

interface BirthOrderAssessmentProps {
  onComplete: (results: BirthOrderResults) => void;
}

export interface BirthOrderResults {
  birthOrder: string;
  familySize: string;
  parentalDynamics: string;
}

const BirthOrderAssessment = ({ onComplete }: BirthOrderAssessmentProps) => {
  const [birthOrder, setBirthOrder] = useState("");
  const [familySize, setFamilySize] = useState("");
  const [parentalDynamics, setParentalDynamics] = useState("");

  const handleComplete = () => {
    const results: BirthOrderResults = {
      birthOrder,
      familySize,
      parentalDynamics
    };
    console.log('Birth Order Results:', results);
    onComplete(results);
  };

  const isComplete = birthOrder && familySize && parentalDynamics;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-playfair font-bold text-foreground">
          Family Background
        </h2>
        <p className="text-muted-foreground">
          Your family position shapes your relationship patterns
        </p>
      </div>

      <div className="space-y-6">
        {/* Birth Order */}
        <Card className="card-glass">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4 text-foreground">
              Your birth order:
            </h3>
            <RadioGroup value={birthOrder} onValueChange={setBirthOrder}>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="oldest" id="oldest" />
                <Label htmlFor="oldest" className="cursor-pointer flex-1">Oldest child</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="middle" id="middle" />
                <Label htmlFor="middle" className="cursor-pointer flex-1">Middle child</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="youngest" id="youngest" />
                <Label htmlFor="youngest" className="cursor-pointer flex-1">Youngest child</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="only" id="only" />
                <Label htmlFor="only" className="cursor-pointer flex-1">Only child</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Family Size */}
        <Card className="card-glass">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4 text-foreground">
              Family size:
            </h3>
            <RadioGroup value={familySize} onValueChange={setFamilySize}>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="small" id="small" />
                <Label htmlFor="small" className="cursor-pointer flex-1">Small (1-2 kids)</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="medium" id="medium" />
                <Label htmlFor="medium" className="cursor-pointer flex-1">Medium (3-4 kids)</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="large" id="large" />
                <Label htmlFor="large" className="cursor-pointer flex-1">Large (5+ kids)</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Parental Style */}
        <Card className="card-glass">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4 text-foreground">
              Your parents were:
            </h3>
            <RadioGroup value={parentalDynamics} onValueChange={setParentalDynamics}>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="supportive" id="supportive" />
                <Label htmlFor="supportive" className="cursor-pointer flex-1">Very supportive</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="strict" id="strict" />
                <Label htmlFor="strict" className="cursor-pointer flex-1">Quite strict</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="distant" id="distant" />
                <Label htmlFor="distant" className="cursor-pointer flex-1">Somewhat distant</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      </div>

      <Button 
        onClick={handleComplete}
        disabled={!isComplete}
        className="btn-gradient w-full"
      >
        Continue
        <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
};

export default BirthOrderAssessment;
