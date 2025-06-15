
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target } from "lucide-react";

interface ReadinessScoreCardProps {
  score: number;
  isReady: boolean;
  onLearnMore: (topic: string) => void;
}

const ReadinessScoreCard = ({ score, isReady, onLearnMore }: ReadinessScoreCardProps) => {
  return (
    <Card className="bg-white/70 backdrop-blur-sm border border-white/50 shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center space-x-2">
          <Target className="h-5 w-5 text-rose-500" />
          <span>Relationship Readiness Score</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <div className="text-4xl font-bold text-rose-600 mb-2">{score}%</div>
        <p className="text-sm text-gray-600 mb-3">
          {isReady ? "You're highly prepared for a meaningful relationship" : "Focus on growth areas to enhance your relationship readiness"}
        </p>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onLearnMore("relationship readiness")}
          className="text-rose-600 border-rose-200 hover:bg-rose-50"
        >
          Learn More
        </Button>
      </CardContent>
    </Card>
  );
};

export default ReadinessScoreCard;
