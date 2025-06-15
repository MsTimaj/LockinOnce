
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";

interface EmotionalCapacityAssessmentProps {
  onComplete: (results: EmotionalCapacityResults) => void;
}

export interface EmotionalCapacityResults {
  stressManagement: string;
  emotionalSupport: string;
  selfAwareness: string;
  empathy: string;
  resilience: string;
}

const EmotionalCapacityAssessment = ({ onComplete }: EmotionalCapacityAssessmentProps) => {
  const [stressManagement, setStressManagement] = useState("");
  const [emotionalSupport, setEmotionalSupport] = useState("");
  const [selfAwareness, setSelfAwareness] = useState("");
  const [empathy, setEmpathy] = useState("");
  const [resilience, setResilience] = useState("");

  const handleComplete = () => {
    const results: EmotionalCapacityResults = {
      stressManagement,
      emotionalSupport,
      selfAwareness,
      empathy,
      resilience
    };
    console.log('Emotional Capacity Results:', results);
    onComplete(results);
  };

  const isComplete = stressManagement && emotionalSupport && selfAwareness && empathy && resilience;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-playfair font-bold text-foreground">
          Emotional Capacity
        </h2>
        <div className="card-glass p-4">
          <p className="text-sm text-muted-foreground">
            <strong>Why this matters:</strong> Emotional maturity and self-awareness are crucial for lasting relationships. This assessment helps us understand your emotional readiness and match you with someone at a similar level of emotional development.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Stress Management */}
        <Card className="card-glass">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4 text-foreground">
              How do you typically handle stress?
            </h3>
            <RadioGroup value={stressManagement} onValueChange={setStressManagement}>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="healthy_coping" id="healthy_coping" />
                <Label htmlFor="healthy_coping" className="cursor-pointer flex-1">I have healthy coping strategies and rarely let stress affect my relationships</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="mostly_manage" id="mostly_manage" />
                <Label htmlFor="mostly_manage" className="cursor-pointer flex-1">I manage stress well most of the time but occasionally need support</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="working_on_it" id="working_on_it" />
                <Label htmlFor="working_on_it" className="cursor-pointer flex-1">I'm actively working on better stress management techniques</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Emotional Support */}
        <Card className="card-glass">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4 text-foreground">
              When someone close to you is struggling emotionally, you:
            </h3>
            <RadioGroup value={emotionalSupport} onValueChange={setEmotionalSupport}>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="natural_supporter" id="natural_supporter" />
                <Label htmlFor="natural_supporter" className="cursor-pointer flex-1">Naturally know how to listen and provide comfort</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="care_but_unsure" id="care_but_unsure" />
                <Label htmlFor="care_but_unsure" className="cursor-pointer flex-1">Care deeply but sometimes unsure how to help</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="prefer_solutions" id="prefer_solutions" />
                <Label htmlFor="prefer_solutions" className="cursor-pointer flex-1">Prefer to offer practical solutions rather than emotional support</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Self-Awareness */}
        <Card className="card-glass">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4 text-foreground">
              Your level of self-awareness about your emotions:
            </h3>
            <RadioGroup value={selfAwareness} onValueChange={setSelfAwareness}>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="highly_aware" id="highly_aware" />
                <Label htmlFor="highly_aware" className="cursor-pointer flex-1">I understand my emotions well and can communicate them clearly</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="moderately_aware" id="moderately_aware" />
                <Label htmlFor="moderately_aware" className="cursor-pointer flex-1">I'm learning to understand and express my emotions better</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="developing_awareness" id="developing_awareness" />
                <Label htmlFor="developing_awareness" className="cursor-pointer flex-1">I'm actively working on becoming more emotionally aware</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Empathy */}
        <Card className="card-glass">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4 text-foreground">
              When it comes to understanding others' emotions:
            </h3>
            <RadioGroup value={empathy} onValueChange={setEmpathy}>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="highly_empathetic" id="highly_empathetic" />
                <Label htmlFor="highly_empathetic" className="cursor-pointer flex-1">I easily pick up on others' emotions and feel deeply for them</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="moderate_empathy" id="moderate_empathy" />
                <Label htmlFor="moderate_empathy" className="cursor-pointer flex-1">I can understand others' emotions when they're clearly communicated</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="learning_empathy" id="learning_empathy" />
                <Label htmlFor="learning_empathy" className="cursor-pointer flex-1">I'm working on being more attuned to others' emotional needs</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Resilience */}
        <Card className="card-glass">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4 text-foreground">
              How do you bounce back from relationship challenges?
            </h3>
            <RadioGroup value={resilience} onValueChange={setResilience}>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="strong_resilience" id="strong_resilience" />
                <Label htmlFor="strong_resilience" className="cursor-pointer flex-1">I recover well and use challenges as opportunities to grow</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="moderate_resilience" id="moderate_resilience" />
                <Label htmlFor="moderate_resilience" className="cursor-pointer flex-1">I recover with time and support from loved ones</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="building_resilience" id="building_resilience" />
                <Label htmlFor="building_resilience" className="cursor-pointer flex-1">I'm actively building my emotional resilience skills</Label>
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

export default EmotionalCapacityAssessment;
