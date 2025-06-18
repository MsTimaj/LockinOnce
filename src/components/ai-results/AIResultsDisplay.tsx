
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
    <div className="px-3 sm:px-6 py-6 sm:py-8">
      {/* Mobile Layout */}
      <div className="lg:hidden space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="text-center space-y-3 sm:space-y-4">
          <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 rounded-2xl bg-gradient-to-r from-rose-400 to-pink-500 shadow-lg">
              <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              Love-vee's Analysis
            </h1>
          </div>
          <p className="text-sm sm:text-base text-gray-600">Your personalized relationship compatibility profile</p>
        </div>

        {/* Overall Score */}
        <ReadinessScoreCard
          score={readinessScore.overall}
          isReady={readinessScore.isReady}
          onLearnMore={onLearnMore}
        />

        {/* Key Insights */}
        <div className="grid gap-3 sm:gap-4">
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
        <div className="text-center pt-3 sm:pt-4 px-2">
          <Button 
            onClick={() => navigate('/dashboard')}
            className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white w-full px-6 py-3 text-base min-h-[48px]"
          >
            <span className="flex items-center justify-center">
              See Your Perfect Matches
              <ArrowRight className="h-4 w-4 ml-2 flex-shrink-0" />
            </span>
          </Button>
          <p className="text-xs text-gray-500 mt-2 px-2">
            Love-vee will be available in your dashboard for ongoing coaching
          </p>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block space-y-8">
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="p-4 rounded-3xl bg-gradient-to-r from-rose-400 to-pink-500 shadow-lg">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-serif font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              Love-vee's Analysis
            </h1>
          </div>
          <p className="text-xl text-gray-600">Your personalized relationship compatibility profile</p>
        </div>

        {/* Overall Score */}
        <ReadinessScoreCard
          score={readinessScore.overall}
          isReady={readinessScore.isReady}
          onLearnMore={onLearnMore}
        />

        {/* Key Insights Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
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
        <div className="text-center pt-6">
          <Button 
            onClick={() => navigate('/dashboard')}
            className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-12 py-4 text-lg min-h-[56px]"
          >
            <span className="flex items-center justify-center">
              See Your Perfect Matches
              <ArrowRight className="h-5 w-5 ml-3 flex-shrink-0" />
            </span>
          </Button>
          <p className="text-sm text-gray-500 mt-3">
            Love-vee will be available in your dashboard for ongoing coaching
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIResultsDisplay;
