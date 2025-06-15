
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
        return "Your secure attachment style means you're comfortable with intimacy and independence. This is your biggest relationship asset - you naturally create safe, stable connections.";
      case 'anxious':
        return "You value close relationships but sometimes worry about your partner's feelings. Learning to self-soothe and communicate needs clearly will strengthen your connections.";
      case 'avoidant':
        return "You value independence but may struggle with intimacy. Gradually opening up and recognizing the value of emotional connection will enhance your relationships.";
      default:
        return "You may experience conflicting needs for closeness and distance. Developing emotional awareness and communication skills will help create more stable relationships.";
    }
  };

  const getStyleColor = (style: string) => {
    switch (style) {
      case 'secure':
        return 'bg-green-100 text-green-800';
      case 'anxious':
        return 'bg-yellow-100 text-yellow-800';
      case 'avoidant':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-red-100 text-red-800';
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
        <Badge variant="secondary" className={`mb-3 ${getStyleColor(dominantStyle)}`}>
          {dominantStyle.charAt(0).toUpperCase() + dominantStyle.slice(1)} Attachment
        </Badge>
        <p className="text-sm text-gray-600 mb-3">
          {getStyleDescription(dominantStyle)}
        </p>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onLearnMore("attachment style")}
          className="text-rose-600 border-rose-200 hover:bg-rose-50"
        >
          Learn More
        </Button>
      </CardContent>
    </Card>
  );
};

export default AttachmentStyleCard;
