
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";

interface CommunicationStyleAssessmentProps {
  onComplete: (results: CommunicationStyleResults) => void;
}

export interface CommunicationStyleResults {
  communicationStyle: string;
  conflictResolution: string;
  expressionStyle: string;
  listeningStyle: string;
}

const CommunicationStyleAssessment = ({ onComplete }: CommunicationStyleAssessmentProps) => {
  const [communicationStyle, setCommunicationStyle] = useState("");
  const [conflictResolution, setConflictResolution] = useState("");
  const [expressionStyle, setExpressionStyle] = useState("");
  const [listeningStyle, setListeningStyle] = useState("");

  const handleComplete = () => {
    const results: CommunicationStyleResults = {
      communicationStyle,
      conflictResolution,
      expressionStyle,
      listeningStyle
    };
    console.log('Communication Style Results:', results);
    onComplete(results);
  };

  const isComplete = communicationStyle && conflictResolution && expressionStyle && listeningStyle;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-playfair font-bold text-foreground">
          Communication Style Assessment
        </h2>
        <div className="card-glass p-4">
          <p className="text-sm text-muted-foreground">
            <strong>Why this matters:</strong> Communication style is the foundation of every successful relationship. Understanding how you express yourself and handle conflicts helps us match you with someone whose communication approach creates harmony rather than friction.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Communication Style */}
        <Card className="card-glass">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4 text-foreground">
              Your general communication style:
            </h3>
            <RadioGroup value={communicationStyle} onValueChange={setCommunicationStyle}>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="direct" id="direct" />
                <Label htmlFor="direct" className="cursor-pointer flex-1">Direct - I say what I mean clearly and appreciate the same</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="gentle" id="gentle" />
                <Label htmlFor="gentle" className="cursor-pointer flex-1">Gentle - I prefer softer, more considerate communication</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="expressive" id="expressive" />
                <Label htmlFor="expressive" className="cursor-pointer flex-1">Expressive - I communicate with emotion and storytelling</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="thoughtful" id="thoughtful" />
                <Label htmlFor="thoughtful" className="cursor-pointer flex-1">Thoughtful - I prefer to think before speaking and choose words carefully</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Conflict Resolution */}
        <Card className="card-glass">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4 text-foreground">
              When disagreements arise, you prefer to:
            </h3>
            <RadioGroup value={conflictResolution} onValueChange={setConflictResolution}>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="discuss_immediately" id="discuss-immediately" />
                <Label htmlFor="discuss-immediately" className="cursor-pointer flex-1">Discuss immediately - Address issues right away</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="cool_down_first" id="cool-down-first" />
                <Label htmlFor="cool-down-first" className="cursor-pointer flex-1">Cool down first - Take time to process before discussing</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="collaborative_problem_solving" id="collaborative" />
                <Label htmlFor="collaborative" className="cursor-pointer flex-1">Collaborative problem-solving - Work together to find solutions</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="avoid_when_possible" id="avoid" />
                <Label htmlFor="avoid" className="cursor-pointer flex-1">Avoid when possible - Prefer harmony over confrontation</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Expression Style */}
        <Card className="card-glass">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4 text-foreground">
              How you express feelings and emotions:
            </h3>
            <RadioGroup value={expressionStyle} onValueChange={setExpressionStyle}>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="open_book" id="open-book" />
                <Label htmlFor="open-book" className="cursor-pointer flex-1">Open book - I share my feelings readily and openly</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="gradual_sharing" id="gradual" />
                <Label htmlFor="gradual" className="cursor-pointer flex-1">Gradual sharing - I open up as trust builds over time</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="actions_over_words" id="actions" />
                <Label htmlFor="actions" className="cursor-pointer flex-1">Actions over words - I express feelings through behavior rather than words</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="private_person" id="private" />
                <Label htmlFor="private" className="cursor-pointer flex-1">Private person - I keep most feelings internal</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Listening Style */}
        <Card className="card-glass">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4 text-foreground">
              Your listening and response style:
            </h3>
            <RadioGroup value={listeningStyle} onValueChange={setListeningStyle}>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="active_listener" id="active" />
                <Label htmlFor="active" className="cursor-pointer flex-1">Active listener - I focus fully and ask clarifying questions</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="solution_oriented" id="solution" />
                <Label htmlFor="solution" className="cursor-pointer flex-1">Solution-oriented - I listen and offer practical advice</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="emotional_support" id="emotional" />
                <Label htmlFor="emotional" className="cursor-pointer flex-1">Emotional support - I listen with empathy and provide comfort</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="reflective" id="reflective" />
                <Label htmlFor="reflective" className="cursor-pointer flex-1">Reflective - I listen carefully and think before responding</Label>
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

export default CommunicationStyleAssessment;
