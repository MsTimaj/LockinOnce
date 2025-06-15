
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

const LoveVeeIntroCard = () => {
  return (
    <Card className="bg-gradient-to-r from-purple-100 to-rose-100 border-purple-200">
      <CardContent className="p-6">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-purple-400 to-rose-400 flex items-center justify-center">
            <MessageSquare className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-lg font-serif font-bold text-gray-800">Meet Love-vee</h3>
          <p className="text-sm text-gray-600">
            Your AI dating coach is now available 24/7! Ask Love-vee about dating tips, 
            match insights, conversation starters, or relationship advice anytime.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoveVeeIntroCard;
