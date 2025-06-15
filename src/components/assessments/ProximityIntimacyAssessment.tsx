
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";

interface ProximityIntimacyAssessmentProps {
  onComplete: (results: ProximityIntimacyResults) => void;
}

export interface ProximityIntimacyResults {
  physicalProximity: string;
  emotionalIntimacy: string;
  communicationStyle: string;
  conflictResolution: string;
  personalSpace: string;
  sharingPreference: string;
  vulnerabilityComfort: string;
}

const physicalProximityOptions = [
  { id: "very_close", label: "I thrive on constant physical presence and touch", description: "Love being physically close most of the time" },
  { id: "moderately_close", label: "I enjoy regular physical closeness with some independence", description: "Value closeness but need some personal physical space" },
  { id: "balanced", label: "I need a healthy balance of togetherness and space", description: "Appreciate both connection and independence equally" },
  { id: "independent", label: "I value significant personal space while staying connected", description: "Prefer more independence with meaningful moments of closeness" }
];

const emotionalIntimacyOptions = [
  { id: "deep_sharing", label: "I want to share everything - thoughts, feelings, experiences", description: "Complete emotional transparency and connection" },
  { id: "open_sharing", label: "I enjoy sharing most things but keep some thoughts private", description: "High intimacy with healthy boundaries" },
  { id: "selective_sharing", label: "I share important things but value emotional independence", description: "Meaningful connection while maintaining individuality" },
  { id: "gradual_sharing", label: "I open up slowly and prefer gradual emotional deepening", description: "Steady building of trust and intimacy over time" }
];

const communicationStyleOptions = [
  { id: "constant", label: "I want frequent, ongoing communication throughout the day", description: "Regular check-ins and continuous connection" },
  { id: "daily", label: "I prefer meaningful daily conversations and updates", description: "Consistent but not overwhelming communication" },
  { id: "quality_focused", label: "I value quality conversations over frequency", description: "Deep discussions when together, comfortable with gaps" },
  { id: "independent", label: "I communicate when needed but value communication independence", description: "Comfortable with periods of separate activities" }
];

const conflictResolutionOptions = [
  { id: "immediate", label: "I address issues immediately and work through them together", description: "Direct, immediate resolution approach" },
  { id: "thoughtful", label: "I need time to process but then engage in resolution", description: "Reflective approach to working through conflicts" },
  { id: "patient", label: "I prefer gentle, patient approaches to working through disagreements", description: "Calm, understanding conflict resolution" },
  { id: "space_first", label: "I need space to cool down before productive conversations", description: "Time and distance help before addressing issues" }
];

const personalSpaceOptions = [
  { id: "minimal", label: "I rarely need alone time when in a committed relationship", description: "Prefer togetherness and shared activities" },
  { id: "occasional", label: "I need occasional personal time for hobbies or reflection", description: "Some alone time to recharge and pursue interests" },
  { id: "regular", label: "I require regular personal space to feel balanced", description: "Consistent need for individual time and activities" },
  { id: "significant", label: "I need significant personal space to maintain my identity", description: "High value on independence and personal pursuits" }
];

const sharingPreferenceOptions = [
  { id: "everything", label: "I want to share most daily activities and interests", description: "High preference for shared experiences" },
  { id: "many_things", label: "I enjoy sharing many activities while having some separate interests", description: "Balance of shared and individual pursuits" },
  { id: "some_things", label: "I prefer sharing key activities but maintaining separate interests", description: "Selective sharing with maintained independence" },
  { id: "selective", label: "I enjoy our time together but prefer mostly separate daily activities", description: "Quality time together, independent daily lives" }
];

const vulnerabilityComfortOptions = [
  { id: "very_comfortable", label: "I'm very comfortable being vulnerable and seeing my partner's vulnerability", description: "High comfort with emotional openness" },
  { id: "comfortable", label: "I can be vulnerable but need trust and safety to build gradually", description: "Openness develops with relationship security" },
  { id: "cautious", label: "I share vulnerable parts of myself carefully and at my own pace", description: "Measured approach to emotional vulnerability" },
  { id: "protective", label: "I prefer to maintain some emotional protection even in close relationships", description: "Value emotional boundaries for security" }
];

const ProximityIntimacyAssessment = ({ onComplete }: ProximityIntimacyAssessmentProps) => {
  const [physicalProximity, setPhysicalProximity] = useState<string>("");
  const [emotionalIntimacy, setEmotionalIntimacy] = useState<string>("");
  const [communicationStyle, setCommunicationStyle] = useState<string>("");
  const [conflictResolution, setConflictResolution] = useState<string>("");
  const [personalSpace, setPersonalSpace] = useState<string>("");
  const [sharingPreference, setSharingPreference] = useState<string>("");
  const [vulnerabilityComfort, setVulnerabilityComfort] = useState<string>("");

  const handleComplete = () => {
    const results: ProximityIntimacyResults = {
      physicalProximity,
      emotionalIntimacy,
      communicationStyle,
      conflictResolution,
      personalSpace,
      sharingPreference,
      vulnerabilityComfort
    };
    console.log('Proximity & Intimacy Assessment Results:', results);
    onComplete(results);
  };

  const isComplete = physicalProximity && emotionalIntimacy && communicationStyle && conflictResolution && personalSpace && sharingPreference && vulnerabilityComfort;

  const renderQuestionCard = (
    title: string,
    subtitle: string,
    options: any[],
    selectedValue: string,
    onSelect: (value: string) => void
  ) => (
    <Card className="card-glass">
      <CardContent className="p-6">
        <h3 className="text-lg font-medium mb-2 text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{subtitle}</p>
        <div className="space-y-3">
          {options.map((option) => (
            <div key={option.id} className="space-y-2">
              <div 
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedValue === option.id 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50 hover:bg-accent/50'
                }`}
                onClick={() => onSelect(option.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-4 h-4 rounded-full border-2 mt-0.5 ${
                    selectedValue === option.id 
                      ? 'border-primary bg-primary' 
                      : 'border-border'
                  }`} />
                  <div className="flex-1">
                    <Label className="cursor-pointer text-sm font-medium">
                      {option.label}
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1">{option.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-playfair font-bold text-foreground">
          Proximity & Intimacy Preferences
        </h2>
        <div className="card-glass p-4">
          <p className="text-sm text-muted-foreground">
            <strong>Why this matters:</strong> How you handle physical and emotional closeness determines relationship satisfaction. 
            We match people whose proximity needs complement each other for lasting, fulfilling partnerships focused on deep connection.
          </p>
        </div>
        <div className="card-glass p-3 border-l-4 border-accent">
          <p className="text-sm text-accent font-medium">
            Note: LockInOnce is designed for serious, long-term relationships only. We focus on deep compatibility for lasting love.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {renderQuestionCard(
          "Physical Proximity Preference",
          "How much physical closeness do you need in a long-term relationship?",
          physicalProximityOptions,
          physicalProximity,
          setPhysicalProximity
        )}

        {renderQuestionCard(
          "Emotional Intimacy Style",
          "How do you prefer to share and connect emotionally?",
          emotionalIntimacyOptions,
          emotionalIntimacy,
          setEmotionalIntimacy
        )}

        {renderQuestionCard(
          "Communication Frequency",
          "What's your ideal communication pattern in a relationship?",
          communicationStyleOptions,
          communicationStyle,
          setCommunicationStyle
        )}

        {renderQuestionCard(
          "Conflict Resolution Approach",
          "How do you prefer to handle disagreements and conflicts?",
          conflictResolutionOptions,
          conflictResolution,
          setConflictResolution
        )}

        {renderQuestionCard(
          "Personal Space Needs",
          "How much alone time do you need to feel balanced?",
          personalSpaceOptions,
          personalSpace,
          setPersonalSpace
        )}

        {renderQuestionCard(
          "Activity Sharing Preference",
          "How much do you want to share daily activities and interests?",
          sharingPreferenceOptions,
          sharingPreference,
          setSharingPreference
        )}

        {renderQuestionCard(
          "Vulnerability Comfort Level",
          "How comfortable are you with emotional vulnerability?",
          vulnerabilityComfortOptions,
          vulnerabilityComfort,
          setVulnerabilityComfort
        )}
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

export default ProximityIntimacyAssessment;
