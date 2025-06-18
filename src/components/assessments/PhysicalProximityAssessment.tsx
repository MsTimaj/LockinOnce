
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import { shuffleArray } from "@/utils/assessments/questionRandomizer";

interface PhysicalProximityAssessmentProps {
  onComplete: (results: PhysicalProximityResults) => void;
}

export interface PhysicalProximityResults {
  physicalAffection: string;
  personalSpace: string;
  intimacyPace: string;
  touchComfort: string;
}

const questionSections = [
  {
    id: "physicalAffection",
    title: "Your ideal level of physical affection in a relationship:",
    options: [
      { value: "high", label: "High - Frequent hugs, cuddling, and physical touch throughout the day" },
      { value: "moderate", label: "Moderate - Regular affection with balance of physical and non-physical intimacy" },
      { value: "low", label: "Lower - Meaningful but less frequent physical affection" }
    ]
  },
  {
    id: "personalSpace",
    title: "Your personal space needs:",
    options: [
      { value: "together", label: "Prefer spending most free time together" },
      { value: "balanced", label: "Balanced mix of together time and individual space" },
      { value: "independent", label: "Value significant independent time and personal space" }
    ]
  },
  {
    id: "intimacyPace",
    title: "Your preferred pace for physical intimacy:",
    options: [
      { value: "gradual", label: "Gradual - Build physical intimacy slowly over time" },
      { value: "natural", label: "Natural - Let physical intimacy develop organically" },
      { value: "expressive", label: "Expressive - Comfortable with physical intimacy developing naturally" }
    ]
  },
  {
    id: "touchComfort",
    title: "Your comfort with casual physical touch:",
    options: [
      { value: "very_comfortable", label: "Very comfortable - Enjoy casual touches, hand-holding, etc." },
      { value: "comfortable", label: "Comfortable - Enjoy touch in appropriate moments" },
      { value: "selective", label: "Selective - Prefer meaningful touch over casual contact" }
    ]
  }
];

const PhysicalProximityAssessment = ({ onComplete }: PhysicalProximityAssessmentProps) => {
  // Randomize questions on component initialization
  const [randomizedSections] = useState(() => 
    shuffleArray(questionSections).map(section => ({
      ...section,
      options: shuffleArray(section.options)
    }))
  );

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

  const getValueForSection = (sectionId: string) => {
    switch (sectionId) {
      case "physicalAffection": return physicalAffection;
      case "personalSpace": return personalSpace;
      case "intimacyPace": return intimacyPace;
      case "touchComfort": return touchComfort;
      default: return "";
    }
  };

  const setValueForSection = (sectionId: string, value: string) => {
    switch (sectionId) {
      case "physicalAffection": setPhysicalAffection(value); break;
      case "personalSpace": setPersonalSpace(value); break;
      case "intimacyPace": setIntimacyPace(value); break;
      case "touchComfort": setTouchComfort(value); break;
    }
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
        {randomizedSections.map((section) => (
          <Card key={section.id} className="card-glass">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4 text-foreground">
                {section.title}
              </h3>
              <RadioGroup 
                value={getValueForSection(section.id)} 
                onValueChange={(value) => setValueForSection(section.id, value)}
              >
                {section.options.map((option, index) => (
                  <div key={`${section.id}-${option.value}`} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                    <RadioGroupItem value={option.value} id={`${section.id}-${option.value}`} />
                    <Label htmlFor={`${section.id}-${option.value}`} className="cursor-pointer flex-1">{option.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        ))}
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
