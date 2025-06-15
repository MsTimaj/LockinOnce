
import { Button } from "@/components/ui/button";
import { Heart, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DashboardHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="px-6 py-6 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-2xl bg-gradient-to-r from-rose-400 to-pink-500 shadow-lg">
          <Heart className="h-6 w-6 text-white" />
        </div>
        <span className="text-2xl font-serif font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
          LockInOnce
        </span>
      </div>
      <Button 
        variant="ghost" 
        size="sm"
        onClick={() => navigate('/onboarding')}
        className="p-3 rounded-xl hover:bg-rose-100 transition-colors"
      >
        <Settings className="h-5 w-5" />
      </Button>
    </header>
  );
};

export default DashboardHeader;
