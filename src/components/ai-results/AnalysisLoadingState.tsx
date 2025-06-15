
import { useState, useEffect } from "react";
import { Brain } from "lucide-react";

interface AnalysisLoadingStateProps {
  isInitializing: boolean;
  onAnalysisComplete: () => void;
}

const AnalysisLoadingState = ({ isInitializing, onAnalysisComplete }: AnalysisLoadingStateProps) => {
  const [currentInsight, setCurrentInsight] = useState(0);

  const insights = [
    "Analyzing your attachment style patterns...",
    "Understanding your personality compatibility...",
    "Evaluating your relationship readiness...",
    "Generating your unique dating strategy...",
    "Preparing your personalized matches..."
  ];

  useEffect(() => {
    if (isInitializing) return;

    const timer = setInterval(() => {
      setCurrentInsight((prev) => {
        if (prev >= insights.length - 1) {
          clearInterval(timer);
          onAnalysisComplete();
          return prev;
        }
        return prev + 1;
      });
    }, 1500);

    return () => clearInterval(timer);
  }, [isInitializing, onAnalysisComplete]);

  const loadingText = isInitializing 
    ? "Loading your profile data..." 
    : insights[currentInsight];

  const titleText = isInitializing
    ? "Preparing your results..."
    : "Love-vee is analyzing your results...";

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="relative">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-rose-400 to-pink-500 flex items-center justify-center">
            <Brain className="h-10 w-10 text-white animate-pulse" />
          </div>
          <div className="absolute inset-0 w-20 h-20 mx-auto rounded-full border-4 border-rose-200 animate-spin border-t-transparent"></div>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-serif font-bold text-gray-800 mb-2">
            {titleText}
          </h2>
          <p className="text-rose-600 font-medium animate-pulse">
            {loadingText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalysisLoadingState;
