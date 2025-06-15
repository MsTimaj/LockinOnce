
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NavigationFooter = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4 pb-8">
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/30 shadow-sm">
        <p className="text-sm text-gray-700 mb-3 font-medium">
          Want to see more matches?
        </p>
        <Button 
          onClick={() => navigate('/ai-results')}
          variant="outline"
          className="w-full mb-2 border-rose-200 hover:bg-rose-50"
        >
          View Your Analysis
        </Button>
        <Button 
          onClick={() => navigate('/')}
          variant="ghost"
          className="w-full text-sm hover:bg-rose-50"
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default NavigationFooter;
