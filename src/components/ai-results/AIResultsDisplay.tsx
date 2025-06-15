
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ReadinessScoreCard from "./ReadinessScoreCard";
import AttachmentStyleCard from "./AttachmentStyleCard";
import CommunicationStyleCard from "./CommunicationStyleCard";
import StrengthsGrowthCards from "./StrengthsGrowthCards";
import DatingStrategyCard from "./DatingStrategyCard";
import LoveVeeIntroCard from "./LoveVeeIntroCard";

interface AnalysisData {
  readinessScore: {
    overall: number;
    isReady: boolean;
    growthAreas: string[];
    personalizedStrategy: string;
  };
  personalityType: string;
  dominantStyle: string;
  topStrengths: string[];
}

interface AIResultsDisplayProps {
  analysis: AnalysisData;
  onLearnMore: (topic: string) => void;
}

const AIResultsDisplay = ({ analysis, onLearnMore }: AIResultsDisplayProps) => {
  const navigate = useNavigate();
  const { readinessScore, personalityType, dominantStyle, topStrengths } = analysis;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 px-6 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-3 rounded-2xl bg-gradient-to-r from-rose-400 to-pink-500 shadow-lg">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-serif font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              Love-vee's Analysis
            </h1>
          </div>
          <p className="text-gray-600">Your personalized relationship compatibility profile</p>
        </div>

        {/* Overall Score */}
        <ReadinessScoreCard
          score={readinessScore.overall}
          isReady={readinessScore.isReady}
          onLearnMore={onLearnMore}
        />

        {/* Key Insights */}
        <div className="grid gap-4">
          <AttachmentStyleCard
            dominantStyle={dominantStyle}
            onLearnMore={onLearnMore}
          />
          
          <CommunicationStyleCard
            personalityType={personalityType}
            onLearnMore={onLearnMore}
          />
        </div>

        {/* Strengths & Growth */}
        <StrengthsGrowthCards
          strengths={topStrengths}
          growthAreas={readinessScore.growthAreas}
          onLearnMore={onLearnMore}
        />

        {/* Dating Strategy */}
        <DatingStrategyCard
          strategy={readinessScore.personalizedStrategy}
          onLearnMore={onLearnMore}
        />

        {/* Love-vee Chat Intro */}
        <LoveVeeIntroCard />

        {/* CTA */}
        <div className="text-center pt-4">
          <Button 
            onClick={() => navigate('/dashboard')}
            className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-8 py-3 text-lg"
          >
            See Your Perfect Matches
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
          <p className="text-xs text-gray-500 mt-2">
            Love-vee will be available in your dashboard for ongoing coaching
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIResultsDisplay;
