
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";

interface PhysicalProximityAssessmentProps {
  onComplete: (results: PhysicalProximityResults) => void;
}

export interface PhysicalProximityResults {
  physicalAffection: string;
  personalSpace: string;
  intimacyPace: string;
  touchComfort: string;
}

const PhysicalProximityAssessment = ({ onComplete }: PhysicalProximityAssessmentProps) => {
  const [physicalAffection, setPhysicalAffection] = useState("");
  const [personalSpace, setPersonalSpace] = useState("");
  const [intimacyPace, setIntimacyPace] = useState("");
  const [touchComfort, setTouchComfort] = useState("");

  const handleComplete = () => {
    const results: PhysicalProximityResults = {
      physicalAffection,
      personalSpace,
      intimacyPace,
      touchComfort
    };
    console.log('Physical Proximity Results:', results);
    onComplete(results);
  };

  const isComplete = physicalAffection && personalSpace && intimacyPace && touchComfort;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-playfair font-bold text-foreground">
          Physical Proximity Preferences
        </h2>
        <div className="card-glass p-4">
          <p className="text-sm text-muted-foreground">
            <strong>Why this matters:</strong> Physical intimacy and personal space needs vary greatly between individuals. Understanding your preferences helps us match you with someone whose physical affection style and space requirements complement yours.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Physical Affection */}
        <Card className="card-glass">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4 text-foreground">
              Your ideal level of physical affection in a relationship:
            </h3>
            <RadioGroup value={physicalAffection} onValueChange={setPhysicalAffection}>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="high" id="high-affection" />
                <Label htmlFor="high-affection" className="cursor-pointer flex-1">High - Frequent hugs, cuddling, and physical touch throughout the day</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="moderate" id="moderate-affection" />
                <Label htmlFor="moderate-affection" className="cursor-pointer flex-1">Moderate - Regular affection with balance of physical and non-physical intimacy</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="low" id="low-affection" />
                <Label htmlFor="low-affection" className="cursor-pointer flex-1">Lower - Meaningful but less frequent physical affection</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Personal Space */}
        <Card className="card-glass">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4 text-foreground">
              Your personal space needs:
            </h3>
            <RadioGroup value={personalSpace} onValueChange={setPersonalSpace}>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="together" id="together" />
                <Label htmlFor="together" className="cursor-pointer flex-1">Prefer spending most free time together</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="balanced" id="balanced" />
                <Label htmlFor="balanced" className="cursor-pointer flex-1">Balanced mix of together time and individual space</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="independent" id="independent" />
                <Label htmlFor="independent" className="cursor-pointer flex-1">Value significant independent time and personal space</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Intimacy Pace */}
        <Card className="card-glass">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4 text-foreground">
              Your preferred pace for physical intimacy:
            </h3>
            <RadioGroup value={intimacyPace} onValueChange={setIntimacyPace}>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="gradual" id="gradual" />
                <Label htmlFor="gradual" className="cursor-pointer flex-1">Gradual - Build physical intimacy slowly over time</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="natural" id="natural" />
                <Label htmlFor="natural" className="cursor-pointer flex-1">Natural - Let physical intimacy develop organically</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="expressive" id="expressive" />
                <Label htmlFor="expressive" className="cursor-pointer flex-1">Expressive - Comfortable with physical intimacy developing naturally</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Touch Comfort */}
        <Card className="card-glass">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4 text-foreground">
              Your comfort with casual physical touch:
            </h3>
            <RadioGroup value={touchComfort} onValueChange={setTouchComfort}>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="very_comfortable" id="very-comfortable" />
                <Label htmlFor="very-comfortable" className="cursor-pointer flex-1">Very comfortable - Enjoy casual touches, hand-holding, etc.</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="comfortable" id="comfortable" />
                <Label htmlFor="comfortable" className="cursor-pointer flex-1">Comfortable - Enjoy touch in appropriate moments</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="selective" id="selective" />
                <Label htmlFor="selective" className="cursor-pointer flex-1">Selective - Prefer meaningful touch over casual contact</Label>
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

export default PhysicalProximityAssessment;
