
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";

interface LifestyleCompatibilityAssessmentProps {
  onComplete: (results: LifestyleCompatibilityResults) => void;
}

export interface LifestyleCompatibilityResults {
  livingArrangement: string;
  dailyRoutine: string;
  socialPreference: string;
  travelStyle: string;
  homeEnvironment: string;
}

const LifestyleCompatibilityAssessment = ({ onComplete }: LifestyleCompatibilityAssessmentProps) => {
  const [livingArrangement, setLivingArrangement] = useState("");
  const [dailyRoutine, setDailyRoutine] = useState("");
  const [socialPreference, setSocialPreference] = useState("");
  const [travelStyle, setTravelStyle] = useState("");
  const [homeEnvironment, setHomeEnvironment] = useState("");

  const handleComplete = () => {
    const results: LifestyleCompatibilityResults = {
      livingArrangement,
      dailyRoutine,
      socialPreference,
      travelStyle,
      homeEnvironment
    };
    console.log('Lifestyle Compatibility Results:', results);
    onComplete(results);
  };

  const isComplete = livingArrangement && dailyRoutine && socialPreference && travelStyle && homeEnvironment;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-playfair font-bold text-foreground">
          Lifestyle Compatibility
        </h2>
        <div className="card-glass p-4">
          <p className="text-sm text-muted-foreground">
            <strong>Why this matters:</strong> Daily routines, living preferences, and lifestyle choices significantly impact relationship harmony. Understanding your lifestyle helps us match you with someone whose daily rhythms and life approach complement yours.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Living Arrangement */}
        <Card className="card-glass">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4 text-foreground">
              Your ideal living arrangement:
            </h3>
            <RadioGroup value={livingArrangement} onValueChange={setLivingArrangement}>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="urban" id="urban" />
                <Label htmlFor="urban" className="cursor-pointer flex-1">Urban/city living with convenience and culture</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="suburban" id="suburban" />
                <Label htmlFor="suburban" className="cursor-pointer flex-1">Suburban living with space and community</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="rural" id="rural" />
                <Label htmlFor="rural" className="cursor-pointer flex-1">Rural/countryside with nature and quiet</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Daily Routine */}
        <Card className="card-glass">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4 text-foreground">
              Your daily routine preference:
            </h3>
            <RadioGroup value={dailyRoutine} onValueChange={setDailyRoutine}>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="structured" id="structured" />
                <Label htmlFor="structured" className="cursor-pointer flex-1">Structured schedule with consistent routines</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="flexible" id="flexible" />
                <Label htmlFor="flexible" className="cursor-pointer flex-1">Flexible schedule that adapts to opportunities</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="spontaneous" id="spontaneous" />
                <Label htmlFor="spontaneous" className="cursor-pointer flex-1">Spontaneous approach with minimal planning</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Social Preference */}
        <Card className="card-glass">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4 text-foreground">
              Your social life preference:
            </h3>
            <RadioGroup value={socialPreference} onValueChange={setSocialPreference}>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="active_social" id="active-social" />
                <Label htmlFor="active-social" className="cursor-pointer flex-1">Active social life with regular gatherings</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="selective_social" id="selective-social" />
                <Label htmlFor="selective-social" className="cursor-pointer flex-1">Selective socializing with close friends</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="intimate_social" id="intimate-social" />
                <Label htmlFor="intimate-social" className="cursor-pointer flex-1">Prefer intimate gatherings and quiet evenings</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Travel Style */}
        <Card className="card-glass">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4 text-foreground">
              Your travel and adventure style:
            </h3>
            <RadioGroup value={travelStyle} onValueChange={setTravelStyle}>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="adventurous" id="adventurous" />
                <Label htmlFor="adventurous" className="cursor-pointer flex-1">Adventurous traveler seeking new experiences</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="comfortable" id="comfortable" />
                <Label htmlFor="comfortable" className="cursor-pointer flex-1">Comfortable travel with planned itineraries</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="homebody" id="homebody" />
                <Label htmlFor="homebody" className="cursor-pointer flex-1">Prefer staying home and local activities</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Home Environment */}
        <Card className="card-glass">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4 text-foreground">
              Your ideal home environment:
            </h3>
            <RadioGroup value={homeEnvironment} onValueChange={setHomeEnvironment}>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="organized" id="organized" />
                <Label htmlFor="organized" className="cursor-pointer flex-1">Well-organized and minimalist</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="cozy" id="cozy" />
                <Label htmlFor="cozy" className="cursor-pointer flex-1">Cozy and lived-in with personal touches</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="creative" id="creative" />
                <Label htmlFor="creative" className="cursor-pointer flex-1">Creative and expressive with artistic elements</Label>
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

export default LifestyleCompatibilityAssessment;
