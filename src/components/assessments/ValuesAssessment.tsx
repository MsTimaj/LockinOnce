
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import { shuffleArray } from "@/utils/assessments/questionRandomizer";

interface ValuesAssessmentProps {
  onComplete: (results: ValuesResults) => void;
}

export interface ValuesResults {
  coreValues: string[];
  relationshipPriorities: string[];
  dealBreakers: string[];
}

const baseCoreValueOptions = [
  { id: "family", label: "Family & Close Relationships" },
  { id: "career", label: "Career & Professional Growth" },
  { id: "adventure", label: "Adventure & New Experiences" },
  { id: "stability", label: "Financial Security & Stability" },
  { id: "creativity", label: "Creativity & Self-Expression" },
  { id: "health", label: "Health & Wellness" },
  { id: "spirituality", label: "Spirituality & Faith" },
  { id: "independence", label: "Personal Freedom & Independence" },
  { id: "service", label: "Helping Others & Community Service" },
  { id: "learning", label: "Learning & Personal Growth" }
];

const baseRelationshipPriorityOptions = [
  { id: "communication", label: "Open & honest communication" },
  { id: "shared_goals", label: "Shared life goals & vision" },
  { id: "emotional_support", label: "Emotional support & understanding" },
  { id: "physical_intimacy", label: "Physical intimacy & affection" },
  { id: "shared_interests", label: "Common hobbies & interests" },
  { id: "trust", label: "Trust & reliability" },
  { id: "humor", label: "Humor & fun together" },
  { id: "growth", label: "Supporting each other's growth" }
];

const baseDealBreakerOptions = [
  { id: "dishonesty", label: "Dishonesty or lying" },
  { id: "addiction", label: "Substance abuse issues" },
  { id: "infidelity", label: "Cheating or infidelity" },
  { id: "no_ambition", label: "Lack of ambition or motivation" },
  { id: "different_values", label: "Fundamentally different core values" },
  { id: "poor_communication", label: "Inability to communicate effectively" },
  { id: "financial_irresponsibility", label: "Financial irresponsibility" },
  { id: "disrespect", label: "Disrespectful behavior" }
];

const ValuesAssessment = ({ onComplete }: ValuesAssessmentProps) => {
  // Randomize all option lists on component initialization
  const [coreValueOptions] = useState(() => shuffleArray(baseCoreValueOptions));
  const [relationshipPriorityOptions] = useState(() => shuffleArray(baseRelationshipPriorityOptions));
  const [dealBreakerOptions] = useState(() => shuffleArray(baseDealBreakerOptions));

  const [coreValues, setCoreValues] = useState<string[]>([]);
  const [relationshipPriorities, setRelationshipPriorities] = useState<string[]>([]);
  const [dealBreakers, setDealBreakers] = useState<string[]>([]);

  const handleCoreValueChange = (valueId: string, checked: boolean) => {
    if (checked) {
      if (coreValues.length < 5) {
        setCoreValues([...coreValues, valueId]);
      }
    } else {
      setCoreValues(coreValues.filter(id => id !== valueId));
    }
  };

  const handleRelationshipPriorityChange = (priorityId: string, checked: boolean) => {
    if (checked) {
      if (relationshipPriorities.length < 4) {
        setRelationshipPriorities([...relationshipPriorities, priorityId]);
      }
    } else {
      setRelationshipPriorities(relationshipPriorities.filter(id => id !== priorityId));
    }
  };

  const handleDealBreakerChange = (dealBreakerId: string, checked: boolean) => {
    if (checked) {
      setDealBreakers([...dealBreakers, dealBreakerId]);
    } else {
      setDealBreakers(dealBreakers.filter(id => id !== dealBreakerId));
    }
  };

  const handleComplete = () => {
    const results: ValuesResults = {
      coreValues,
      relationshipPriorities,
      dealBreakers
    };
    console.log('Values Assessment Results:', results);
    onComplete(results);
  };

  const isComplete = coreValues.length >= 3 && relationshipPriorities.length >= 3 && dealBreakers.length >= 2;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-playfair font-bold text-foreground">
          Values & Priorities
        </h2>
        <div className="card-glass p-4">
          <p className="text-sm text-muted-foreground">
            <strong>Why this matters:</strong> Shared values are the foundation of lasting relationships. Understanding what matters most to you helps us find someone who shares your vision for life and relationships.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Core Values */}
        <Card className="card-glass">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4 text-foreground">
              Select your top 3-5 core values:
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Choose {coreValues.length}/5 values that guide your life decisions
            </p>
            <div className="grid grid-cols-1 gap-3">
              {coreValueOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                  <Checkbox 
                    id={option.id}
                    checked={coreValues.includes(option.id)}
                    onCheckedChange={(checked) => handleCoreValueChange(option.id, checked as boolean)}
                    disabled={!coreValues.includes(option.id) && coreValues.length >= 5}
                  />
                  <Label htmlFor={option.id} className="cursor-pointer flex-1 text-sm">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Relationship Priorities */}
        <Card className="card-glass">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4 text-foreground">
              Select your top 3-4 relationship priorities:
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Choose {relationshipPriorities.length}/4 aspects most important in a partnership
            </p>
            <div className="grid grid-cols-1 gap-3">
              {relationshipPriorityOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                  <Checkbox 
                    id={option.id}
                    checked={relationshipPriorities.includes(option.id)}
                    onCheckedChange={(checked) => handleRelationshipPriorityChange(option.id, checked as boolean)}
                    disabled={!relationshipPriorities.includes(option.id) && relationshipPriorities.length >= 4}
                  />
                  <Label htmlFor={option.id} className="cursor-pointer flex-1 text-sm">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Deal Breakers */}
        <Card className="card-glass">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4 text-foreground">
              Select your relationship deal breakers:
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Choose at least 2 behaviors or traits you cannot accept
            </p>
            <div className="grid grid-cols-1 gap-3">
              {dealBreakerOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                  <Checkbox 
                    id={option.id}
                    checked={dealBreakers.includes(option.id)}
                    onCheckedChange={(checked) => handleDealBreakerChange(option.id, checked as boolean)}
                  />
                  <Label htmlFor={option.id} className="cursor-pointer flex-1 text-sm">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
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

export default ValuesAssessment;
