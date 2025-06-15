
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain } from "lucide-react";

interface CommunicationStyleCardProps {
  personalityType: string;
  onLearnMore: (topic: string) => void;
}

const CommunicationStyleCard = ({ personalityType, onLearnMore }: CommunicationStyleCardProps) => {
  const getPersonalityDescription = (type: string) => {
    return type.includes('Introverted') 
      ? "You process emotions deeply and prefer meaningful one-on-one conversations. You build trust gradually but form very deep connections."
      : "You're energized by social interaction and tend to think out loud. You're naturally warm and expressive in relationships.";
  };

  return (
    <Card className="bg-white/70 backdrop-blur-sm border border-white/50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-rose-700">
          <Brain className="h-5 w-5" />
          <span>Your Communication Style</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Badge variant="secondary" className="mb-3 bg-blue-100 text-blue-800">
          {personalityType}
        </Badge>
        <p className="text-sm text-gray-600 mb-3">
          {getPersonalityDescription(personalityType)}
        </p>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onLearnMore("communication style")}
          className="text-rose-600 border-rose-200 hover:bg-rose-50"
        >
          Learn More
        </Button>
      </CardContent>
    </Card>
  );
};

export default CommunicationStyleCard;
