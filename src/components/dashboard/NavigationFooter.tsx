
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, User, Sparkles } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const NavigationFooter = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getButtonClass = (path: string) => {
    const isActive = location.pathname === path;
    return `flex-1 flex flex-col items-center justify-center space-y-0.5 sm:space-y-1 py-2 sm:py-3 px-1 sm:px-3 rounded-lg sm:rounded-xl transition-all duration-200 min-h-[56px] sm:min-h-[70px] ${
      isActive 
        ? 'bg-rose-500 text-white shadow-md transform scale-105' 
        : 'text-gray-600 hover:text-rose-500 hover:bg-rose-50 active:scale-95'
    }`;
  };

  const getIconClass = (path: string) => {
    const isActive = location.pathname === path;
    return `h-4 w-4 sm:h-6 sm:w-6 ${isActive ? 'text-white' : ''} transition-all duration-200`;
  };

  const getTextClass = (path: string) => {
    const isActive = location.pathname === path;
    return `text-xs sm:text-sm font-medium ${isActive ? 'text-white' : ''} transition-all duration-200`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200 px-2 sm:px-4 py-1.5 sm:py-2 shadow-lg z-50">
      <div className="max-w-sm sm:max-w-md mx-auto flex items-center justify-between gap-0.5 sm:gap-2">
        <Button
          variant="ghost"
          className={getButtonClass('/dashboard')}
          onClick={() => navigate('/dashboard')}
        >
          <Heart className={getIconClass('/dashboard')} />
          <span className={getTextClass('/dashboard')}>Matches</span>
        </Button>
        
        <Button
          variant="ghost"
          className={getButtonClass('/messages')}
          onClick={() => navigate('/messages')}
        >
          <MessageCircle className={getIconClass('/messages')} />
          <span className={getTextClass('/messages')}>Messages</span>
        </Button>
        
        <Button
          variant="ghost"
          className={getButtonClass('/ai-results')}
          onClick={() => navigate('/ai-results')}
        >
          <Sparkles className={getIconClass('/ai-results')} />
          <span className={getTextClass('/ai-results')}>AI Results</span>
        </Button>
        
        <Button
          variant="ghost"
          className={getButtonClass('/profile')}
          onClick={() => navigate('/profile')}
        >
          <User className={getIconClass('/profile')} />
          <span className={getTextClass('/profile')}>Profile</span>
        </Button>
      </div>
    </div>
  );
};

export default NavigationFooter;
