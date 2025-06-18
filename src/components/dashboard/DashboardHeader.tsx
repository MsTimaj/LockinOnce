
import { Bell, Settings, CheckSquare, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface DashboardHeaderProps {
  onShowChecklist?: () => void;
  onShowProjectStatus?: () => void;
}

const DashboardHeader = ({ onShowChecklist, onShowProjectStatus }: DashboardHeaderProps) => {
  const navigate = useNavigate();
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

  return (
    <div className="bg-white/80 backdrop-blur-xl border-b border-white/30 sticky top-0 z-30">
      <div className="max-w-sm sm:max-w-md mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                LockInOnce
              </h1>
              <span className="bg-rose-100 text-rose-600 text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full font-medium">
                Beta
              </span>
            </div>
            <p className="text-xs text-gray-600 hidden sm:block">Demo - Find your perfect match</p>
          </div>
          
          <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
            {onShowProjectStatus && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onShowProjectStatus}
                className="h-8 w-8 sm:h-10 sm:w-10 p-0 rounded-full hover:bg-blue-50"
                title="Project Status"
              >
                <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
              </Button>
            )}
            
            {onShowChecklist && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onShowChecklist}
                className="h-8 w-8 sm:h-10 sm:w-10 p-0 rounded-full hover:bg-rose-50"
                title="Profile Updates"
              >
                <CheckSquare className="h-4 w-4 sm:h-5 sm:w-5 text-rose-500" />
              </Button>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleNotificationClick}
              className="h-8 w-8 sm:h-10 sm:w-10 p-0 rounded-full hover:bg-gray-100 relative"
              title="Notifications"
            >
              <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
              <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-rose-500 rounded-full"></div>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSettingsClick}
              className="h-8 w-8 sm:h-10 sm:w-10 p-0 rounded-full hover:bg-gray-100"
              title="Settings"
            >
              <Settings className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
