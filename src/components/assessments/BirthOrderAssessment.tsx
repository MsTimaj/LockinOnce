
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
  siblingGap: string;
}

const BirthOrderAssessment = ({ onComplete }: BirthOrderAssessmentProps) => {
  const [birthOrder, setBirthOrder] = useState("");
  const [familySize, setFamilySize] = useState("");
  const [parentalDynamics, setParentalDynamics] = useState("");
  const [siblingGap, setSiblingGap] = useState("");

  const handleComplete = () => {
    const results: BirthOrderResults = {
      birthOrder,
      familySize,
      parentalDynamics,
      siblingGap
    };
    console.log('Birth Order Results:', results);
    onComplete(results);
  };

  const isComplete = birthOrder && familySize && parentalDynamics && siblingGap;

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-playfair font-bold text-foreground">
          Family Background
        </h2>
        <div className="card-glass p-3 sm:p-4">
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            <strong>Why this matters:</strong> Birth order and family dynamics shape your personality, leadership style, and relationship patterns. This helps us understand how you naturally interact and what type of partner would complement your style.
          </p>
        </div>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {/* Birth Order */}
        <Card className="card-glass">
          <CardContent className="p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4 text-foreground">
              Your birth order:
            </h3>
            <RadioGroup value={birthOrder} onValueChange={setBirthOrder}>
              <div className="flex items-center space-x-3 p-3 sm:p-4 rounded-lg hover:bg-accent/50 transition-colors min-h-[48px]">
                <RadioGroupItem value="oldest" id="oldest" className="text-rose-500" />
                <Label htmlFor="oldest" className="cursor-pointer flex-1 text-sm sm:text-base">Oldest child</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 sm:p-4 rounded-lg hover:bg-accent/50 transition-colors min-h-[48px]">
                <RadioGroupItem value="middle" id="middle" className="text-rose-500" />
                <Label htmlFor="middle" className="cursor-pointer flex-1 text-sm sm:text-base">Middle child</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 sm:p-4 rounded-lg hover:bg-accent/50 transition-colors min-h-[48px]">
                <RadioGroupItem value="youngest" id="youngest" className="text-rose-500" />
                <Label htmlFor="youngest" className="cursor-pointer flex-1 text-sm sm:text-base">Youngest child</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 sm:p-4 rounded-lg hover:bg-accent/50 transition-colors min-h-[48px]">
                <RadioGroupItem value="only" id="only" className="text-rose-500" />
                <Label htmlFor="only" className="cursor-pointer flex-1 text-sm sm:text-base">Only child</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Family Size */}
        <Card className="card-glass">
          <CardContent className="p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4 text-foreground">
              Family size:
            </h3>
            <RadioGroup value={familySize} onValueChange={setFamilySize}>
              <div className="flex items-center space-x-3 p-3 sm:p-4 rounded-lg hover:bg-accent/50 transition-colors min-h-[48px]">
                <RadioGroupItem value="small" id="small" className="text-rose-500" />
                <Label htmlFor="small" className="cursor-pointer flex-1 text-sm sm:text-base">Small (1-2 children)</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 sm:p-4 rounded-lg hover:bg-accent/50 transition-colors min-h-[48px]">
                <RadioGroupItem value="medium" id="medium" className="text-rose-500" />
                <Label htmlFor="medium" className="cursor-pointer flex-1 text-sm sm:text-base">Medium (3-4 children)</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 sm:p-4 rounded-lg hover:bg-accent/50 transition-colors min-h-[48px]">
                <RadioGroupItem value="large" id="large" className="text-rose-500" />
                <Label htmlFor="large" className="cursor-pointer flex-1 text-sm sm:text-base">Large (5+ children)</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Parental Style */}
        <Card className="card-glass">
          <CardContent className="p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4 text-foreground">
              Your parents' parenting style was:
            </h3>
            <RadioGroup value={parentalDynamics} onValueChange={setParentalDynamics}>
              <div className="flex items-center space-x-3 p-3 sm:p-4 rounded-lg hover:bg-accent/50 transition-colors min-h-[48px]">
                <RadioGroupItem value="warm_supportive" id="warm_supportive" className="text-rose-500" />
                <Label htmlFor="warm_supportive" className="cursor-pointer flex-1 text-sm sm:text-base">Warm and supportive - Emotionally available and encouraging</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 sm:p-4 rounded-lg hover:bg-accent/50 transition-colors min-h-[48px]">
                <RadioGroupItem value="structured_strict" id="structured_strict" className="text-rose-500" />
                <Label htmlFor="structured_strict" className="cursor-pointer flex-1 text-sm sm:text-base">Structured and strict - Clear rules and high expectations</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 sm:p-4 rounded-lg hover:bg-accent/50 transition-colors min-h-[48px]">
                <RadioGroupItem value="permissive_relaxed" id="permissive_relaxed" className="text-rose-500" />
                <Label htmlFor="permissive_relaxed" className="cursor-pointer flex-1 text-sm sm:text-base">Permissive and relaxed - Few rules, lots of freedom</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 sm:p-4 rounded-lg hover:bg-accent/50 transition-colors min-h-[48px]">
                <RadioGroupItem value="distant_busy" id="distant_busy" className="text-rose-500" />
                <Label htmlFor="distant_busy" className="cursor-pointer flex-1 text-sm sm:text-base">Distant or busy - Limited emotional availability</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Sibling Gap */}
        <Card className="card-glass">
          <CardContent className="p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4 text-foreground">
              The age gap between you and your closest sibling was:
            </h3>
            <RadioGroup value={siblingGap} onValueChange={setSiblingGap}>
              <div className="flex items-center space-x-3 p-3 sm:p-4 rounded-lg hover:bg-accent/50 transition-colors min-h-[48px]">
                <RadioGroupItem value="close_1_3_years" id="close_gap" className="text-rose-500" />
                <Label htmlFor="close_gap" className="cursor-pointer flex-1 text-sm sm:text-base">Close (1-3 years) - We were like peers</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 sm:p-4 rounded-lg hover:bg-accent/50 transition-colors min-h-[48px]">
                <RadioGroupItem value="moderate_4_6_years" id="moderate_gap" className="text-rose-500" />
                <Label htmlFor="moderate_gap" className="cursor-pointer flex-1 text-sm sm:text-base">Moderate (4-6 years) - Distinct life stages</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 sm:p-4 rounded-lg hover:bg-accent/50 transition-colors min-h-[48px]">
                <RadioGroupItem value="large_7_plus_years" id="large_gap" className="text-rose-500" />
                <Label htmlFor="large_gap" className="cursor-pointer flex-1 text-sm sm:text-base">Large (7+ years) - Almost like separate generations</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 sm:p-4 rounded-lg hover:bg-accent/50 transition-colors min-h-[48px]">
                <RadioGroupItem value="no_siblings" id="no_siblings" className="text-rose-500" />
                <Label htmlFor="no_siblings" className="cursor-pointer flex-1 text-sm sm:text-base">No siblings - I'm an only child</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      </div>

      <Button 
        onClick={handleComplete}
        disabled={!isComplete}
        className="btn-gradient w-full min-h-[48px] sm:min-h-[56px] text-base sm:text-lg"
      >
        Continue
        <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
};

export default BirthOrderAssessment;
