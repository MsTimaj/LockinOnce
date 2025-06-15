
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";

interface LifeGoalsAssessmentProps {
  onComplete: (results: LifeGoalsResults) => void;
}

export interface LifeGoalsResults {
  relationshipTimeline: string;
  familyPlanning: string;
  careerPriority: string;
  lifestyleGoals: string;
}

const LifeGoalsAssessment = ({ onComplete }: LifeGoalsAssessmentProps) => {
  const [relationshipTimeline, setRelationshipTimeline] = useState("");
  const [familyPlanning, setFamilyPlanning] = useState("");
  const [careerPriority, setCareerPriority] = useState("");
  const [lifestyleGoals, setLifestyleGoals] = useState("");

  const handleComplete = () => {
    const results: LifeGoalsResults = {
      relationshipTimeline,
      familyPlanning,
      careerPriority,
      lifestyleGoals
    };
    console.log('Life Goals Results:', results);
    onComplete(results);
  };

  const isComplete = relationshipTimeline && familyPlanning && careerPriority && lifestyleGoals;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-playfair font-bold text-foreground">
          Life Goals & Timeline Assessment
        </h2>
        <div className="card-glass p-4">
          <p className="text-sm text-muted-foreground">
            <strong>Why this matters:</strong> Aligning life goals and timelines is crucial for long-term relationship success. Understanding your major life priorities helps us match you with someone whose vision for the future complements yours.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Relationship Timeline */}
        <Card className="card-glass">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4 text-foreground">
              Your ideal timeline for a serious relationship:
            </h3>
            <RadioGroup value={relationshipTimeline} onValueChange={setRelationshipTimeline}>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="immediate" id="immediate" />
                <Label htmlFor="immediate" className="cursor-pointer flex-1">Ready now - Looking for a serious relationship immediately</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="6_months" id="6-months" />
                <Label htmlFor="6-months" className="cursor-pointer flex-1">Within 6 months - Want to establish a committed relationship soon</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="1_year" id="1-year" />
                <Label htmlFor="1-year" className="cursor-pointer flex-1">Within 1 year - Open to taking time to build the right relationship</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="natural_timing" id="natural" />
                <Label htmlFor="natural" className="cursor-pointer flex-1">Natural timing - Let the right relationship develop organically</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Family Planning */}
        <Card className="card-glass">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4 text-foreground">
              Your family planning goals:
            </h3>
            <RadioGroup value={familyPlanning} onValueChange={setFamilyPlanning}>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="want_children_soon" id="children-soon" />
                <Label htmlFor="children-soon" className="cursor-pointer flex-1">Want children soon - Family planning is a priority</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="want_children_eventually" id="children-eventually" />
                <Label htmlFor="children-eventually" className="cursor-pointer flex-1">Want children eventually - Open to family planning in the future</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="unsure_about_children" id="unsure" />
                <Label htmlFor="unsure" className="cursor-pointer flex-1">Unsure about children - Open to discussion with the right partner</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="no_children" id="no-children" />
                <Label htmlFor="no-children" className="cursor-pointer flex-1">Don't want children - Prefer a child-free lifestyle</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Career Priority */}
        <Card className="card-glass">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4 text-foreground">
              Your career and ambition level:
            </h3>
            <RadioGroup value={careerPriority} onValueChange={setCareerPriority}>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="highly_ambitious" id="highly-ambitious" />
                <Label htmlFor="highly-ambitious" className="cursor-pointer flex-1">Highly ambitious - Career growth is a major priority</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="balanced_approach" id="balanced" />
                <Label htmlFor="balanced" className="cursor-pointer flex-1">Balanced approach - Value both career success and personal life</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="relationship_focused" id="relationship-focused" />
                <Label htmlFor="relationship-focused" className="cursor-pointer flex-1">Relationship-focused - Prioritize personal relationships over career advancement</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="lifestyle_focused" id="lifestyle" />
                <Label htmlFor="lifestyle" className="cursor-pointer flex-1">Lifestyle-focused - Work to live, not live to work</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Lifestyle Goals */}
        <Card className="card-glass">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4 text-foreground">
              Your desired lifestyle and future vision:
            </h3>
            <RadioGroup value={lifestyleGoals} onValueChange={setLifestyleGoals}>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="urban_professional" id="urban" />
                <Label htmlFor="urban" className="cursor-pointer flex-1">Urban professional - City life, career focus, cultural activities</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="suburban_family" id="suburban" />
                <Label htmlFor="suburban" className="cursor-pointer flex-1">Suburban family life - Stable community, family-oriented</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="adventure_travel" id="adventure" />
                <Label htmlFor="adventure" className="cursor-pointer flex-1">Adventure & travel - Exploring the world together</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="quiet_simple" id="quiet" />
                <Label htmlFor="quiet" className="cursor-pointer flex-1">Quiet & simple - Peaceful, minimalist lifestyle</Label>
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

export default LifeGoalsAssessment;
