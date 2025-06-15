
import { Calendar } from "lucide-react";

const WelcomeSection = () => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl font-serif font-bold text-gray-800 mb-2">
        Your Perfect Matches
      </h1>
      <div className="flex items-center justify-center space-x-2 text-gray-600 mb-4">
        <Calendar className="h-4 w-4" />
        <span className="font-medium">Today's Selection</span>
      </div>
      
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-white/50 mb-6">
        <p className="text-sm text-gray-600 italic leading-relaxed">
          "The best relationships are built on deep compatibility and understanding."
        </p>
      </div>
    </div>
  );
};

export default WelcomeSection;
