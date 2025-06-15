
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, User, Sparkles } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const NavigationFooter = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getButtonClass = (path: string) => {
    const isActive = location.pathname === path;
    return `flex-1 flex flex-col items-center space-y-1 py-3 px-2 rounded-xl transition-all ${
      isActive 
        ? 'bg-rose-100 text-rose-600' 
        : 'text-gray-600 hover:text-rose-500 hover:bg-rose-50'
    }`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-white/50 px-6 py-2">
      <div className="max-w-md mx-auto flex items-center justify-around">
        <Button
          variant="ghost"
          className={getButtonClass('/dashboard')}
          onClick={() => navigate('/dashboard')}
        >
          <Heart className="h-5 w-5" />
          <span className="text-xs font-medium">Matches</span>
        </Button>
        
        <Button
          variant="ghost"
          className={getButtonClass('/messages')}
          onClick={() => navigate('/messages')}
        >
          <MessageCircle className="h-5 w-5" />
          <span className="text-xs font-medium">Messages</span>
        </Button>
        
        <Button
          variant="ghost"
          className={getButtonClass('/ai-results')}
          onClick={() => navigate('/ai-results')}
        >
          <Sparkles className="h-5 w-5" />
          <span className="text-xs font-medium">AI Results</span>
        </Button>
        
        <Button
          variant="ghost"
          className={getButtonClass('/profile')}
          onClick={() => navigate('/profile')}
        >
          <User className="h-5 w-5" />
          <span className="text-xs font-medium">Profile</span>
        </Button>
      </div>
    </div>
  );
};

export default NavigationFooter;
