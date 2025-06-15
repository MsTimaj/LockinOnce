
import { Sparkles, TrendingUp } from "lucide-react";

const WelcomeSection = () => {
  return (
    <div className="text-center mb-6 pt-2">
      <div className="flex items-center justify-center space-x-2 mb-3">
        <Sparkles className="h-5 w-5 text-rose-500" />
        <h2 className="text-2xl font-bold text-gray-800">
          Today's Matches
        </h2>
        <Sparkles className="h-5 w-5 text-rose-500" />
      </div>
      
      <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-4 shadow-sm border border-rose-100 mb-4">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <TrendingUp className="h-4 w-4 text-emerald-600" />
          <span className="text-sm font-semibold text-emerald-700">87% Match Rate Today</span>
        </div>
        <p className="text-sm text-gray-600 italic leading-relaxed">
          "Your authentic self attracts the right connections"
        </p>
      </div>
    </div>
  );
};

export default WelcomeSection;
