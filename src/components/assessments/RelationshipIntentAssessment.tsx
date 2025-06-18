
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import { shuffleArray } from "@/utils/assessments/questionRandomizer";

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

const questionSections = [
  {
    id: "timeline",
    title: "Your ideal relationship timeline:",
    options: [
      { value: "within_year", label: "Committed partnership within 1 year" },
      { value: "1_2_years", label: "Serious relationship leading to commitment in 1-2 years" },
      { value: "2_3_years", label: "Deep connection with commitment in 2-3 years" }
    ]
  },
  {
    id: "commitment",
    title: "Your commitment goal:",
    options: [
      { value: "marriage", label: "Marriage" },
      { value: "life_partnership", label: "Life partnership (may or may not include marriage)" },
      { value: "long_term_exclusive", label: "Long-term exclusive relationship" }
    ]
  },
  {
    id: "lifeGoals",
    title: "Your primary life focus:",
    options: [
      { value: "family_career", label: "Building family and career together" },
      { value: "career_first", label: "Career growth with supportive partnership" },
      { value: "family_focused", label: "Family-focused with career balance" }
    ]
  },
  {
    id: "familyPlanning",
    title: "Your family planning intentions:",
    options: [
      { value: "want_children", label: "Want children (biological or adopted)" },
      { value: "maybe_children", label: "Open to children but not certain" },
      { value: "no_children", label: "Do not want children" }
    ]
  },
  {
    id: "relocation",
    title: "Relocation flexibility:",
    options: [
      { value: "very_flexible", label: "Very flexible - willing to move for the right person" },
      { value: "somewhat_flexible", label: "Somewhat flexible - open to discussing relocation" },
      { value: "location_committed", label: "Committed to current location" }
    ]
  }
];

const RelationshipIntentAssessment = ({ onComplete }: RelationshipIntentAssessmentProps) => {
  // Randomize sections and their options on component initialization
  const [randomizedSections] = useState(() => 
    shuffleArray(questionSections).map(section => ({
      ...section,
      options: shuffleArray(section.options)
    }))
  );

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

  const getValueForSection = (sectionId: string) => {
    switch (sectionId) {
      case "timeline": return timeline;
      case "commitment": return commitment;
      case "lifeGoals": return lifeGoals;
      case "familyPlanning": return familyPlanning;
      case "relocation": return relocation;
      default: return "";
    }
  };

  const setValueForSection = (sectionId: string, value: string) => {
    switch (sectionId) {
      case "timeline": setTimeline(value); break;
      case "commitment": setCommitment(value); break;
      case "lifeGoals": setLifeGoals(value); break;
      case "familyPlanning": setFamilyPlanning(value); break;
      case "relocation": setRelocation(value); break;
    }
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
                {section.options.map((option) => (
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

export default RelationshipIntentAssessment;
