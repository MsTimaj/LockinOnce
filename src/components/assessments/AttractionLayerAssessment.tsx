
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
}

const AttractionLayerAssessment = ({ onComplete }: AttractionLayerAssessmentProps) => {
  const [energyStyle, setEnergyStyle] = useState("");
  const [personalStyle, setPersonalStyle] = useState("");
  const [conversationStyle, setConversationStyle] = useState("");
  const [socialEnergy, setSocialEnergy] = useState("");
  const [attractionFactors, setAttractionFactors] = useState<string[]>([]);

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
      attractionFactors
    };
    console.log('Attraction Layer Results:', results);
    onComplete(results);
  };

  const isComplete = energyStyle && personalStyle && conversationStyle && socialEnergy && attractionFactors.length > 0;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-playfair font-bold text-foreground">
          Attraction Layer
        </h2>
        <div className="card-glass p-4">
          <p className="text-sm text-muted-foreground">
            <strong>Why this matters:</strong> Beyond deep compatibility, initial attraction and energy alignment matter for spark and chemistry. This helps us understand your vibe and what draws you to others for that important initial connection.
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
                <RadioGroupItem value="calm_steady" id="calm_steady" />
                <Label htmlFor="calm_steady" className="cursor-pointer flex-1">Calm and steady - I bring peaceful, grounding energy</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="warm_engaging" id="warm_engaging" />
                <Label htmlFor="warm_engaging" className="cursor-pointer flex-1">Warm and engaging - I'm naturally welcoming and approachable</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="dynamic_passionate" id="dynamic_passionate" />
                <Label htmlFor="dynamic_passionate" className="cursor-pointer flex-1">Dynamic and passionate - I bring excitement and enthusiasm</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="thoughtful_deep" id="thoughtful_deep" />
                <Label htmlFor="thoughtful_deep" className="cursor-pointer flex-1">Thoughtful and deep - I prefer meaningful, contemplative energy</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Personal Style */}
        <Card className="card-glass">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4 text-foreground">
              Your personal style approach:
            </h3>
            <RadioGroup value={personalStyle} onValueChange={setPersonalStyle}>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="classic_polished" id="classic_polished" />
                <Label htmlFor="classic_polished" className="cursor-pointer flex-1">Classic and polished - I prefer timeless, well-put-together looks</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="casual_comfortable" id="casual_comfortable" />
                <Label htmlFor="casual_comfortable" className="cursor-pointer flex-1">Casual and comfortable - I prioritize comfort and authenticity</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="creative_unique" id="creative_unique" />
                <Label htmlFor="creative_unique" className="cursor-pointer flex-1">Creative and unique - I like to express my personality through style</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="minimalist_clean" id="minimalist_clean" />
                <Label htmlFor="minimalist_clean" className="cursor-pointer flex-1">Minimalist and clean - I prefer simple, understated elegance</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Conversation Style */}
        <Card className="card-glass">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4 text-foreground">
              In conversations, you tend to be:
            </h3>
            <RadioGroup value={conversationStyle} onValueChange={setConversationStyle}>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="playful_humorous" id="playful_humorous" />
                <Label htmlFor="playful_humorous" className="cursor-pointer flex-1">Playful and humorous - I love to laugh and keep things light</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="intellectual_curious" id="intellectual_curious" />
                <Label htmlFor="intellectual_curious" className="cursor-pointer flex-1">Intellectual and curious - I enjoy deep, thought-provoking discussions</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="empathetic_supportive" id="empathetic_supportive" />
                <Label htmlFor="empathetic_supportive" className="cursor-pointer flex-1">Empathetic and supportive - I focus on understanding and connection</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="direct_honest" id="direct_honest" />
                <Label htmlFor="direct_honest" className="cursor-pointer flex-1">Direct and honest - I value straightforward, authentic communication</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Social Energy */}
        <Card className="card-glass">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4 text-foreground">
              Your social energy preference:
            </h3>
            <RadioGroup value={socialEnergy} onValueChange={setSocialEnergy}>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="intimate_gatherings" id="intimate_gatherings" />
                <Label htmlFor="intimate_gatherings" className="cursor-pointer flex-1">Intimate gatherings - I prefer small groups or one-on-one time</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="balanced_social" id="balanced_social" />
                <Label htmlFor="balanced_social" className="cursor-pointer flex-1">Balanced social life - I enjoy both intimate and larger social settings</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="vibrant_social" id="vibrant_social" />
                <Label htmlFor="vibrant_social" className="cursor-pointer flex-1">Vibrant social life - I thrive in larger groups and social events</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Attraction Factors */}
        <Card className="card-glass">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4 text-foreground">
              What initially attracts you to someone? (Select all that apply)
            </h3>
            <div className="space-y-3">
              {[
                { id: "genuine_smile", label: "Genuine smile and warm eyes" },
                { id: "confidence", label: "Quiet confidence and self-assurance" },
                { id: "intelligence", label: "Intelligence and wit in conversation" },
                { id: "kindness", label: "Kindness and empathy toward others" },
                { id: "passion", label: "Passion for their interests and goals" },
                { id: "style", label: "Personal style and how they present themselves" },
                { id: "energy", label: "Overall energy and vibe they bring" },
                { id: "authenticity", label: "Authenticity and being genuinely themselves" }
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
