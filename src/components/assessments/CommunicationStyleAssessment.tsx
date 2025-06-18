
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
            <RadioGroup 
              value={communicationStyle} 
              onValueChange={(value) => {
                console.log('Communication style selected:', value);
                setCommunicationStyle(value);
              }}
            >
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="direct_and_kind" id="comm-direct_kind" />
                <Label htmlFor="comm-direct_kind" className="cursor-pointer flex-1">Direct and kind - I say what I mean clearly while being considerate</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="gentle_and_indirect" id="comm-gentle_indirect" />
                <Label htmlFor="comm-gentle_indirect" className="cursor-pointer flex-1">Gentle and indirect - I prefer softer, more subtle communication</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="very_direct" id="comm-very_direct" />
                <Label htmlFor="comm-very_direct" className="cursor-pointer flex-1">Very direct - I value straightforward, no-nonsense communication</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="context_dependent" id="comm-context_dependent" />
                <Label htmlFor="comm-context_dependent" className="cursor-pointer flex-1">Context-dependent - My style adapts based on the situation</Label>
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
            <RadioGroup 
              value={conflictResolution} 
              onValueChange={(value) => {
                console.log('Conflict resolution selected:', value);
                setConflictResolution(value);
              }}
            >
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="collaborate_solutions" id="conflict-collaborate" />
                <Label htmlFor="conflict-collaborate" className="cursor-pointer flex-1">Collaborate on solutions - Work together to find win-win outcomes</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="compromise_meet_middle" id="conflict-compromise" />
                <Label htmlFor="conflict-compromise" className="cursor-pointer flex-1">Compromise and meet in the middle - Find fair solutions for both</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="avoid_conflict" id="conflict-avoid" />
                <Label htmlFor="conflict-avoid" className="cursor-pointer flex-1">Avoid conflict when possible - Prefer harmony over confrontation</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="need_time_process" id="conflict-process_time" />
                <Label htmlFor="conflict-process_time" className="cursor-pointer flex-1">Need time to process - Take space before discussing difficult topics</Label>
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
            <RadioGroup 
              value={expressionStyle} 
              onValueChange={(value) => {
                console.log('Expression style selected:', value);
                setExpressionStyle(value);
              }}
            >
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="open_and_honest" id="expr-open_honest" />
                <Label htmlFor="expr-open_honest" className="cursor-pointer flex-1">Open and honest - I share my feelings readily and authentically</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="thoughtful_measured" id="expr-thoughtful" />
                <Label htmlFor="expr-thoughtful" className="cursor-pointer flex-1">Thoughtful and measured - I consider my words carefully before sharing</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="reserved_private" id="expr-reserved" />
                <Label htmlFor="expr-reserved" className="cursor-pointer flex-1">Reserved and private - I prefer to keep most feelings internal</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="actions_over_words" id="expr-actions" />
                <Label htmlFor="expr-actions" className="cursor-pointer flex-1">Actions over words - I express feelings through behavior rather than words</Label>
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
            <RadioGroup 
              value={listeningStyle} 
              onValueChange={(value) => {
                console.log('Listening style selected:', value);
                setListeningStyle(value);
              }}
            >
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="active_empathetic" id="listen-active_empathetic" />
                <Label htmlFor="listen-active_empathetic" className="cursor-pointer flex-1">Active and empathetic - I listen fully and respond with understanding</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="attentive_engaged" id="listen-attentive" />
                <Label htmlFor="listen-attentive" className="cursor-pointer flex-1">Attentive and engaged - I focus well and ask thoughtful questions</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="selective_focused" id="listen-selective" />
                <Label htmlFor="listen-selective" className="cursor-pointer flex-1">Selective and focused - I listen best when the topic interests me</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="solution_oriented" id="listen-solution" />
                <Label htmlFor="listen-solution" className="cursor-pointer flex-1">Solution-oriented - I listen and naturally offer practical advice</Label>
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
