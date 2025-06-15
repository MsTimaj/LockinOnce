
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";

interface RelationshipIntentAssessmentProps {
  onComplete: (results: RelationshipIntentResults) => void;
}

export interface RelationshipIntentResults {
  timeline: string;
  commitment: string;
  lifeGoals: string;
  familyPlanning: string;
  relocatation: string;
}

const RelationshipIntentAssessment = ({ onComplete }: RelationshipIntentAssessmentProps) => {
  const [timeline, setTimeline] = useState("");
  const [commitment, setCommitment] = useState("");
  const [lifeGoals, setLifeGoals] = useState("");
  const [familyPlanning, setFamilyPlanning] = useState("");
  const [relocation, setRelocation] = useState("");

  const handleComplete = () => {
    const results: RelationshipIntentResults = {
      timeline,
      commitment,
      lifeGoals,
      familyPlanning,
      relocatation: relocation
    };
    console.log('Relationship Intent Results:', results);
    onComplete(results);
  };

  const isComplete = timeline && commitment && lifeGoals && familyPlanning && relocation;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-playfair font-bold text-foreground">
          Relationship Intent
        </h2>
        <div className="card-glass p-4 border-l-4 border-accent">
          <p className="text-accent font-medium mb-2">
            For Serious Relationships Only
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Why this matters:</strong> We only match people seeking deep, lasting love. Understanding your timeline and commitment level ensures we connect you with someone who shares your serious relationship goals.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Timeline */}
        <Card className="card-glass">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4 text-foreground">
              Your ideal relationship timeline:
            </h3>
            <RadioGroup value={timeline} onValueChange={setTimeline}>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="within_year" id="within_year" />
                <Label htmlFor="within_year" className="cursor-pointer flex-1">Committed partnership within 1 year</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="1_2_years" id="1_2_years" />
                <Label htmlFor="1_2_years" className="cursor-pointer flex-1">Serious relationship leading to commitment in 1-2 years</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="2_3_years" id="2_3_years" />
                <Label htmlFor="2_3_years" className="cursor-pointer flex-1">Deep connection with commitment in 2-3 years</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Commitment Level */}
        <Card className="card-glass">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4 text-foreground">
              Your commitment goal:
            </h3>
            <RadioGroup value={commitment} onValueChange={setCommitment}>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="marriage" id="marriage" />
                <Label htmlFor="marriage" className="cursor-pointer flex-1">Marriage</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="life_partnership" id="life_partnership" />
                <Label htmlFor="life_partnership" className="cursor-pointer flex-1">Life partnership (may or may not include marriage)</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="long_term_exclusive" id="long_term_exclusive" />
                <Label htmlFor="long_term_exclusive" className="cursor-pointer flex-1">Long-term exclusive relationship</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Life Goals */}
        <Card className="card-glass">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4 text-foreground">
              Your primary life focus:
            </h3>
            <RadioGroup value={lifeGoals} onValueChange={setLifeGoals}>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="family_career" id="family_career" />
                <Label htmlFor="family_career" className="cursor-pointer flex-1">Building family and career together</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="career_first" id="career_first" />
                <Label htmlFor="career_first" className="cursor-pointer flex-1">Career growth with supportive partnership</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="family_focused" id="family_focused" />
                <Label htmlFor="family_focused" className="cursor-pointer flex-1">Family-focused with career balance</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Family Planning */}
        <Card className="card-glass">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4 text-foreground">
              Your family planning intentions:
            </h3>
            <RadioGroup value={familyPlanning} onValueChange={setFamilyPlanning}>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="want_children" id="want_children" />
                <Label htmlFor="want_children" className="cursor-pointer flex-1">Want children (biological or adopted)</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="maybe_children" id="maybe_children" />
                <Label htmlFor="maybe_children" className="cursor-pointer flex-1">Open to children but not certain</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="no_children" id="no_children" />
                <Label htmlFor="no_children" className="cursor-pointer flex-1">Do not want children</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Relocation */}
        <Card className="card-glass">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4 text-foreground">
              Relocation flexibility:
            </h3>
            <RadioGroup value={relocation} onValueChange={setRelocation}>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="very_flexible" id="very_flexible" />
                <Label htmlFor="very_flexible" className="cursor-pointer flex-1">Very flexible - willing to move for the right person</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="somewhat_flexible" id="somewhat_flexible" />
                <Label htmlFor="somewhat_flexible" className="cursor-pointer flex-1">Somewhat flexible - open to discussing relocation</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="location_committed" id="location_committed" />
                <Label htmlFor="location_committed" className="cursor-pointer flex-1">Committed to current location</Label>
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

export default RelationshipIntentAssessment;
