
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";

interface AttractionLayerAssessmentProps {
  onComplete: (results: AttractionLayerResults) => void;
}

export interface AttractionLayerResults {
  energyStyle: string;
  personalStyle: string;
  conversationStyle: string;
  socialEnergy: string;
  attractionFactors: string[];
  intimacyPace: string;
}

const AttractionLayerAssessment = ({ onComplete }: AttractionLayerAssessmentProps) => {
  const [energyStyle, setEnergyStyle] = useState("");
  const [personalStyle, setPersonalStyle] = useState("");
  const [conversationStyle, setConversationStyle] = useState("");
  const [socialEnergy, setSocialEnergy] = useState("");
  const [attractionFactors, setAttractionFactors] = useState<string[]>([]);
  const [intimacyPace, setIntimacyPace] = useState("");

  const handleAttractionFactorChange = (factor: string, checked: boolean) => {
    if (checked) {
      setAttractionFactors(prev => [...prev, factor]);
    } else {
      setAttractionFactors(prev => prev.filter(f => f !== factor));
    }
  };

  const handleComplete = () => {
    const results: AttractionLayerResults = {
      energyStyle,
      personalStyle,
      conversationStyle,
      socialEnergy,
      attractionFactors,
      intimacyPace
    };
    console.log('Attraction Layer Results:', results);
    onComplete(results);
  };

  const isComplete = energyStyle && personalStyle && conversationStyle && socialEnergy && 
                     attractionFactors.length > 0 && intimacyPace;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-playfair font-bold text-foreground">
          Attraction & Chemistry
        </h2>
        <div className="card-glass p-4">
          <p className="text-sm text-muted-foreground">
            <strong>Why this matters:</strong> Beyond deep compatibility, initial attraction and energy alignment create spark and chemistry. Understanding your attraction patterns helps us identify the type of person who will naturally draw you in and maintain that magnetic connection.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Energy Style */}
        <Card className="card-glass">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4 text-foreground">
              Your natural energy style:
            </h3>
            <RadioGroup value={energyStyle} onValueChange={setEnergyStyle}>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="calm_grounding" id="calm_grounding" />
                <Label htmlFor="calm_grounding" className="cursor-pointer flex-1">Calm and grounding - I bring peaceful, stabilizing presence</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="warm_inviting" id="warm_inviting" />
                <Label htmlFor="warm_inviting" className="cursor-pointer flex-1">Warm and inviting - I'm naturally welcoming and create emotional safety</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="dynamic_inspiring" id="dynamic_inspiring" />
                <Label htmlFor="dynamic_inspiring" className="cursor-pointer flex-1">Dynamic and inspiring - I bring excitement and motivate others</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="mysterious_intriguing" id="mysterious_intriguing" />
                <Label htmlFor="mysterious_intriguing" className="cursor-pointer flex-1">Mysterious and intriguing - I have depth that draws people in gradually</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Personal Style */}
        <Card className="card-glass">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4 text-foreground">
              How you present yourself to the world:
            </h3>
            <RadioGroup value={personalStyle} onValueChange={setPersonalStyle}>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="polished_professional" id="polished_professional" />
                <Label htmlFor="polished_professional" className="cursor-pointer flex-1">Polished and professional - I dress well and pay attention to details</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="effortless_natural" id="effortless_natural" />
                <Label htmlFor="effortless_natural" className="cursor-pointer flex-1">Effortless and natural - I prefer authentic, comfortable self-expression</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="creative_distinctive" id="creative_distinctive" />
                <Label htmlFor="creative_distinctive" className="cursor-pointer flex-1">Creative and distinctive - I express my personality through unique style choices</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="classic_timeless" id="classic_timeless" />
                <Label htmlFor="classic_timeless" className="cursor-pointer flex-1">Classic and timeless - I prefer elegant, understated sophistication</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Conversation Style */}
        <Card className="card-glass">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4 text-foreground">
              Your conversation and connection style:
            </h3>
            <RadioGroup value={conversationStyle} onValueChange={setConversationStyle}>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="playful_witty" id="playful_witty" />
                <Label htmlFor="playful_witty" className="cursor-pointer flex-1">Playful and witty - I love humor, banter, and keeping things light-hearted</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="deep_meaningful" id="deep_meaningful" />
                <Label htmlFor="deep_meaningful" className="cursor-pointer flex-1">Deep and meaningful - I prefer substantial conversations about ideas and emotions</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="supportive_nurturing" id="supportive_nurturing" />
                <Label htmlFor="supportive_nurturing" className="cursor-pointer flex-1">Supportive and nurturing - I naturally create emotional safety and understanding</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="adventurous_spontaneous" id="adventurous_spontaneous" />
                <Label htmlFor="adventurous_spontaneous" className="cursor-pointer flex-1">Adventurous and spontaneous - I love exploring new ideas and experiences together</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Social Energy */}
        <Card className="card-glass">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4 text-foreground">
              Your social energy and lifestyle preference:
            </h3>
            <RadioGroup value={socialEnergy} onValueChange={setSocialEnergy}>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="intimate_quality_time" id="intimate_quality" />
                <Label htmlFor="intimate_quality" className="cursor-pointer flex-1">Intimate quality time - I prefer deep one-on-one connections and small gatherings</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="balanced_social_life" id="balanced_social" />
                <Label htmlFor="balanced_social" className="cursor-pointer flex-1">Balanced social life - I enjoy both intimate moments and larger social experiences</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="active_social_butterfly" id="social_butterfly" />
                <Label htmlFor="social_butterfly" className="cursor-pointer flex-1">Active social butterfly - I thrive in groups and love meeting new people together</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Intimacy Pace */}
        <Card className="card-glass">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4 text-foreground">
              Your preferred pace for emotional and physical intimacy:
            </h3>
            <RadioGroup value={intimacyPace} onValueChange={setIntimacyPace}>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="slow_and_steady" id="slow_steady" />
                <Label htmlFor="slow_steady" className="cursor-pointer flex-1">Slow and steady - I prefer to build intimacy gradually with strong foundation</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="natural_progression" id="natural_progression" />
                <Label htmlFor="natural_progression" className="cursor-pointer flex-1">Natural progression - I let intimacy develop organically based on connection</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="passionate_intense" id="passionate_intense" />
                <Label htmlFor="passionate_intense" className="cursor-pointer flex-1">Passionate and intense - I value strong chemistry and emotional intensity</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Attraction Factors */}
        <Card className="card-glass">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4 text-foreground">
              What creates strong initial attraction for you? (Select all that apply)
            </h3>
            <div className="space-y-3">
              {[
                { id: "genuine_smile", label: "Genuine smile and expressive eyes" },
                { id: "quiet_confidence", label: "Quiet confidence and self-assurance" },
                { id: "intellectual_curiosity", label: "Intelligence and intellectual curiosity" },
                { id: "emotional_intelligence", label: "Emotional intelligence and empathy" },
                { id: "passionate_purpose", label: "Passion and sense of purpose" },
                { id: "physical_chemistry", label: "Physical attraction and chemistry" },
                { id: "humor_playfulness", label: "Sense of humor and playfulness" },
                { id: "authenticity", label: "Authenticity and being genuinely themselves" },
                { id: "mysterious_depth", label: "Mysterious quality or intriguing depth" },
                { id: "kindness_compassion", label: "Kindness and compassion toward others" }
              ].map((factor) => (
                <div key={factor.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                  <input
                    type="checkbox"
                    id={factor.id}
                    checked={attractionFactors.includes(factor.id)}
                    onChange={(e) => handleAttractionFactorChange(factor.id, e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor={factor.id} className="cursor-pointer flex-1">
                    {factor.label}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Button 
        onClick={handleComplete}
        disabled={!isComplete}
        className="btn-gradient w-full"
      >
        Complete Assessment
        <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
};

export default AttractionLayerAssessment;
