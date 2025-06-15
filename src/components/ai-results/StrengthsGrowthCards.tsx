
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface StrengthsGrowthCardsProps {
  strengths: string[];
  growthAreas: string[];
  onLearnMore: (topic: string) => void;
}

const StrengthsGrowthCards = ({ strengths, growthAreas, onLearnMore }: StrengthsGrowthCardsProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Card className="bg-white/70 backdrop-blur-sm border border-white/50">
        <CardHeader>
          <CardTitle className="text-green-700">Your Strengths</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 mb-3">
            {strengths.map((strength, index) => (
              <li key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">{strength}</span>
              </li>
            ))}
          </ul>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onLearnMore("relationship strengths")}
            className="text-rose-600 border-rose-200 hover:bg-rose-50"
          >
            Learn More
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-white/70 backdrop-blur-sm border border-white/50">
        <CardHeader>
          <CardTitle className="text-amber-700">Growth Opportunities</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 mb-3">
            {growthAreas.map((area, index) => (
              <li key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <span className="text-sm">{area}</span>
              </li>
            ))}
          </ul>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onLearnMore("relationship growth areas")}
            className="text-rose-600 border-rose-200 hover:bg-rose-50"
          >
            Learn More
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default StrengthsGrowthCards;
