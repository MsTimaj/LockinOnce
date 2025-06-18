
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import { shuffleArray } from "@/utils/assessments/questionRandomizer";

interface LoveLanguagesAssessmentProps {
  onComplete: (results: LoveLanguagesResults) => void;
}

export interface LoveLanguagesResults {
  primaryLoveLanguage: string;
  secondaryLoveLanguage: string;
  receivingPreference: string;
  givingPreference: string;
}

const baseLoveLanguageOptions = [
  { id: "words_of_affirmation", label: "Words of Affirmation", description: "Verbal expressions of love and appreciation" },
  { id: "quality_time", label: "Quality Time", description: "Focused attention and meaningful time together" },
  { id: "physical_touch", label: "Physical Touch", description: "Affectionate physical contact and closeness" },
  { id: "acts_of_service", label: "Acts of Service", description: "Helpful actions that show care and consideration" },
  { id: "receiving_gifts", label: "Receiving Gifts", description: "Thoughtful gifts that show love and remembrance" }
];

const receivingPreferenceOptions = [
  { value: "frequent_small", label: "Frequent small gestures throughout the day" },
  { value: "meaningful_moments", label: "Meaningful expressions during special moments" },
  { value: "consistent_pattern", label: "Consistent pattern of affection and care" }
];

const givingPreferenceOptions = [
  { value: "express_verbally", label: "Express feelings through words and communication" },
  { value: "show_through_actions", label: "Show love through helpful actions and service" },
  { value: "physical_affection", label: "Express through physical affection and presence" }
];

const LoveLanguagesAssessment = ({ onComplete }: LoveLanguagesAssessmentProps) => {
  // Randomize options on component initialization
  const [loveLanguageOptions] = useState(() => shuffleArray(baseLoveLanguageOptions));
  const [randomizedReceivingOptions] = useState(() => shuffleArray(receivingPreferenceOptions));
  const [randomizedGivingOptions] = useState(() => shuffleArray(givingPreferenceOptions));

  const [primaryLoveLanguage, setPrimaryLoveLanguage] = useState("");
  const [secondaryLoveLanguage, setSecondaryLoveLanguage] = useState("");
  const [receivingPreference, setReceivingPreference] = useState("");
  const [givingPreference, setGivingPreference] = useState("");

  const handleComplete = () => {
    const results: LoveLanguagesResults = {
      primaryLoveLanguage,
      secondaryLoveLanguage,
      receivingPreference,
      givingPreference
    };
    console.log('Love Languages Results:', results);
    console.log('Calling onComplete callback...');
    onComplete(results);
  };

  const isComplete = primaryLoveLanguage && secondaryLoveLanguage && receivingPreference && givingPreference;

  console.log('Love Languages Assessment State:', {
    primaryLoveLanguage,
    secondaryLoveLanguage,
    receivingPreference,
    givingPreference,
    isComplete
  });

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-playfair font-bold text-foreground">
          Love Languages Assessment
        </h2>
        <div className="card-glass p-4">
          <p className="text-sm text-muted-foreground">
            <strong>Why this matters:</strong> Understanding how you naturally give and receive love helps us match you with someone who can meet your emotional needs and appreciate your way of showing affection.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Primary Love Language */}
        <Card className="card-glass">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4 text-foreground">
              Your primary love language (how you most like to receive love):
            </h3>
            <RadioGroup value={primaryLoveLanguage} onValueChange={setPrimaryLoveLanguage}>
              {loveLanguageOptions.map((option) => (
                <div key={option.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent/50">
                  <RadioGroupItem value={option.id} id={`primary-${option.id}`} className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor={`primary-${option.id}`} className="cursor-pointer font-medium">
                      {option.label}
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Secondary Love Language */}
        <Card className="card-glass">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4 text-foreground">
              Your secondary love language:
            </h3>
            <RadioGroup value={secondaryLoveLanguage} onValueChange={setSecondaryLoveLanguage}>
              {loveLanguageOptions.filter(option => option.id !== primaryLoveLanguage).map((option) => (
                <div key={option.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent/50">
                  <RadioGroupItem value={option.id} id={`secondary-${option.id}`} className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor={`secondary-${option.id}`} className="cursor-pointer font-medium">
                      {option.label}
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Receiving Preference */}
        <Card className="card-glass">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4 text-foreground">
              When receiving love, you prefer:
            </h3>
            <RadioGroup value={receivingPreference} onValueChange={setReceivingPreference}>
              {randomizedReceivingOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                  <RadioGroupItem value={option.value} id={`receiving-${option.value}`} />
                  <Label htmlFor={`receiving-${option.value}`} className="cursor-pointer flex-1">{option.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Giving Preference */}
        <Card className="card-glass">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4 text-foreground">
              When showing love, you naturally tend to:
            </h3>
            <RadioGroup value={givingPreference} onValueChange={setGivingPreference}>
              {randomizedGivingOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                  <RadioGroupItem value={option.value} id={`giving-${option.value}`} />
                  <Label htmlFor={`giving-${option.value}`} className="cursor-pointer flex-1">{option.label}</Label>
                </div>
              ))}
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

export default LoveLanguagesAssessment;
