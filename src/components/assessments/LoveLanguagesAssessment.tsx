
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";

interface LoveLanguagesAssessmentProps {
  onComplete: (results: LoveLanguagesResults) => void;
}

export interface LoveLanguagesResults {
  primaryLoveLanguage: string;
  secondaryLoveLanguage: string;
  receivingPreference: string;
  givingPreference: string;
}

const loveLanguageOptions = [
  { id: "words_of_affirmation", label: "Words of Affirmation", description: "Verbal expressions of love and appreciation" },
  { id: "quality_time", label: "Quality Time", description: "Focused attention and meaningful time together" },
  { id: "physical_touch", label: "Physical Touch", description: "Affectionate physical contact and closeness" },
  { id: "acts_of_service", label: "Acts of Service", description: "Helpful actions that show care and consideration" },
  { id: "receiving_gifts", label: "Receiving Gifts", description: "Thoughtful gifts that show love and remembrance" }
];

const LoveLanguagesAssessment = ({ onComplete }: LoveLanguagesAssessmentProps) => {
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
    onComplete(results);
  };

  const isComplete = primaryLoveLanguage && secondaryLoveLanguage && receivingPreference && givingPreference;

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
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="frequent_small" id="frequent-small" />
                <Label htmlFor="frequent-small" className="cursor-pointer flex-1">Frequent small gestures throughout the day</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="meaningful_moments" id="meaningful-moments" />
                <Label htmlFor="meaningful-moments" className="cursor-pointer flex-1">Meaningful expressions during special moments</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="consistent_pattern" id="consistent-pattern" />
                <Label htmlFor="consistent-pattern" className="cursor-pointer flex-1">Consistent pattern of affection and care</Label>
              </div>
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
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="express_verbally" id="express-verbally" />
                <Label htmlFor="express-verbally" className="cursor-pointer flex-1">Express feelings through words and communication</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="show_through_actions" id="show-through-actions" />
                <Label htmlFor="show-through-actions" className="cursor-pointer flex-1">Show love through helpful actions and service</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="physical_affection" id="physical-affection" />
                <Label htmlFor="physical-affection" className="cursor-pointer flex-1">Express through physical affection and presence</Label>
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

export default LoveLanguagesAssessment;
