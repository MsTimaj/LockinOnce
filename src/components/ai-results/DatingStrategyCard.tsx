
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

interface DatingStrategyCardProps {
  strategy: string;
  onLearnMore: (topic: string) => void;
}

const DatingStrategyCard = ({ strategy, onLearnMore }: DatingStrategyCardProps) => {
  return (
    <Card className="bg-gradient-to-r from-rose-100 to-pink-100 border-rose-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-rose-700">
          <Users className="h-5 w-5" />
          <span>Love-vee's Dating Strategy for You</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 italic mb-3">"{strategy}"</p>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onLearnMore("personalized dating strategy")}
          className="text-rose-600 border-rose-200 hover:bg-rose-50"
        >
          Learn More
        </Button>
      </CardContent>
    </Card>
  );
};

export default DatingStrategyCard;
