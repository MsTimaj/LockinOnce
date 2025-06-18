
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, User, Sparkles } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const NavigationFooter = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getButtonClass = (path: string) => {
    const isActive = location.pathname === path;
    return `flex-1 flex flex-col items-center justify-center space-y-0.5 lg:space-y-1 py-2 lg:py-3 px-1 lg:px-3 rounded-lg lg:rounded-xl transition-all duration-200 min-h-[56px] lg:min-h-[70px] ${
      isActive 
        ? 'bg-rose-500 text-white shadow-md transform scale-105' 
        : 'text-gray-600 hover:text-rose-500 hover:bg-rose-50 active:scale-95'
    }`;
  };

  const getIconClass = (path: string) => {
    const isActive = location.pathname === path;
    return `h-4 w-4 lg:h-6 lg:w-6 ${isActive ? 'text-white' : ''} transition-all duration-200`;
  };

  const getTextClass = (path: string) => {
    const isActive = location.pathname === path;
    return `text-xs lg:text-sm font-medium ${isActive ? 'text-white' : ''} transition-all duration-200`;
  };

  return (
    <>
      {/* Mobile Navigation Footer */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200 px-2 py-1.5 shadow-lg z-50">
        <div className="max-w-sm mx-auto flex items-center justify-between gap-0.5">
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

      {/* Desktop Navigation Sidebar or Top Bar */}
      <div className="hidden lg:block fixed top-20 right-8 bg-white/95 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-lg z-40">
        <div className="p-2 flex flex-col space-y-1">
          <Button
            variant="ghost"
            className={`flex items-center justify-start space-x-3 px-6 py-4 rounded-xl transition-all duration-200 min-h-[56px] w-48 ${
              location.pathname === '/dashboard'
                ? 'bg-rose-500 text-white shadow-md' 
                : 'text-gray-600 hover:text-rose-500 hover:bg-rose-50'
            }`}
            onClick={() => navigate('/dashboard')}
          >
            <Heart className="h-5 w-5" />
            <span className="text-base font-medium">Matches</span>
          </Button>
          
          <Button
            variant="ghost"
            className={`flex items-center justify-start space-x-3 px-6 py-4 rounded-xl transition-all duration-200 min-h-[56px] w-48 ${
              location.pathname === '/messages'
                ? 'bg-rose-500 text-white shadow-md' 
                : 'text-gray-600 hover:text-rose-500 hover:bg-rose-50'
            }`}
            onClick={() => navigate('/messages')}
          >
            <MessageCircle className="h-5 w-5" />
            <span className="text-base font-medium">Messages</span>
          </Button>
          
          <Button
            variant="ghost"
            className={`flex items-center justify-start space-x-3 px-6 py-4 rounded-xl transition-all duration-200 min-h-[56px] w-48 ${
              location.pathname === '/ai-results'
                ? 'bg-rose-500 text-white shadow-md' 
                : 'text-gray-600 hover:text-rose-500 hover:bg-rose-50'
            }`}
            onClick={() => navigate('/ai-results')}
          >
            <Sparkles className="h-5 w-5" />
            <span className="text-base font-medium">AI Results</span>
          </Button>
          
          <Button
            variant="ghost"
            className={`flex items-center justify-start space-x-3 px-6 py-4 rounded-xl transition-all duration-200 min-h-[56px] w-48 ${
              location.pathname === '/profile'
                ? 'bg-rose-500 text-white shadow-md' 
                : 'text-gray-600 hover:text-rose-500 hover:bg-rose-50'
            }`}
            onClick={() => navigate('/profile')}
          >
            <User className="h-5 w-5" />
            <span className="text-base font-medium">Profile</span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default NavigationFooter;
