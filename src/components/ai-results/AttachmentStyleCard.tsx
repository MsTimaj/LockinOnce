
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";

interface AttachmentStyleCardProps {
  dominantStyle: string;
  onLearnMore: (topic: string) => void;
}

const AttachmentStyleCard = ({ dominantStyle, onLearnMore }: AttachmentStyleCardProps) => {
  const getStyleDescription = (style: string) => {
    switch (style) {
      case 'secure':
        return "You feel comfortable with intimacy and independence. You trust others, communicate your needs clearly, and handle conflict constructively. This is a significant relationship strength that helps you form stable, satisfying partnerships.";
      case 'anxious':
        return "You deeply value close relationships but sometimes worry about your partner's commitment or availability. You may seek frequent reassurance and can become preoccupied with relationship security. Learning self-soothing techniques will strengthen your connections.";
      case 'avoidant':
        return "You highly value your independence and may feel uncomfortable with too much emotional closeness. You might suppress or minimize emotions and prefer to handle problems alone. Gradually practicing emotional vulnerability will enhance your relationships.";
      case 'disorganized':
        return "You experience conflicting desires for both closeness and distance in relationships. Your emotions and behaviors in relationships may feel unpredictable or overwhelming. Working with a therapist can help you develop more consistent relationship patterns.";
      default:
        return "Understanding your attachment style helps you recognize your patterns in relationships and work towards healthier connections.";
    }
  };

  const getStyleColor = (style: string) => {
    switch (style) {
      case 'secure':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'anxious':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'avoidant':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'disorganized':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStyleTitle = (style: string) => {
    switch (style) {
      case 'secure':
        return 'Secure Attachment';
      case 'anxious':
        return 'Anxious Attachment';
      case 'avoidant':
        return 'Avoidant Attachment';
      case 'disorganized':
        return 'Disorganized Attachment';
      default:
        return 'Your Attachment Style';
    }
  };

  return (
    <Card className="bg-white/70 backdrop-blur-sm border border-white/50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-rose-700">
          <Heart className="h-5 w-5" />
          <span>Your Attachment Style</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Badge variant="secondary" className={`mb-3 border ${getStyleColor(dominantStyle)}`}>
          {getStyleTitle(dominantStyle)}
        </Badge>
        <p className="text-sm text-gray-700 mb-4 leading-relaxed">
          {getStyleDescription(dominantStyle)}
        </p>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onLearnMore("attachment style")}
          className="text-rose-600 border-rose-200 hover:bg-rose-50"
        >
          Learn More About This Style
        </Button>
      </CardContent>
    </Card>
  );
};

export default AttachmentStyleCard;
