
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, User, Sparkles, Bell, Settings } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const NavigationFooter = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  const handleNotificationClick = () => {
    toast({
      title: "Demo Mode",
      description: "Notifications are not active in demo mode. This feature would send alerts for new matches and messages.",
    });
  };

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

  const getDesktopNavButtonClass = (path: string) => {
    const isActive = location.pathname === path;
    return `flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
      isActive 
        ? 'bg-rose-500 text-white shadow-md' 
        : 'text-gray-600 hover:text-rose-500 hover:bg-rose-50'
    }`;
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

      {/* Desktop Navigation - Integrated Top Navbar */}
      <div className="hidden lg:block fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Left: Brand */}
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                LockInOnce
              </h1>
              <span className="bg-rose-100 text-rose-600 text-xs px-2 py-1 rounded-full font-medium">
                Beta
              </span>
            </div>

            {/* Center: Navigation */}
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                className={getDesktopNavButtonClass('/dashboard')}
                onClick={() => navigate('/dashboard')}
              >
                <Heart className="h-5 w-5" />
                <span>Matches</span>
              </Button>
              
              <Button
                variant="ghost"
                className={getDesktopNavButtonClass('/messages')}
                onClick={() => navigate('/messages')}
              >
                <MessageCircle className="h-5 w-5" />
                <span>Messages</span>
              </Button>
              
              <Button
                variant="ghost"
                className={getDesktopNavButtonClass('/ai-results')}
                onClick={() => navigate('/ai-results')}
              >
                <Sparkles className="h-5 w-5" />
                <span>AI Results</span>
              </Button>
              
              <Button
                variant="ghost"
                className={getDesktopNavButtonClass('/profile')}
                onClick={() => navigate('/profile')}
              >
                <User className="h-5 w-5" />
                <span>Profile</span>
              </Button>
            </div>

            {/* Right: User Controls */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleNotificationClick}
                className="h-10 w-10 p-0 rounded-full hover:bg-gray-100 relative"
                title="Notifications"
              >
                <Bell className="h-5 w-5 text-gray-600" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full"></div>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSettingsClick}
                className="h-10 w-10 p-0 rounded-full hover:bg-gray-100"
                title="Settings"
              >
                <Settings className="h-5 w-5 text-gray-600" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop content padding to account for fixed navbar */}
      <div className="hidden lg:block h-20"></div>
    </>
  );
};

export default NavigationFooter;
