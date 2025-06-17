
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
      <div className="max-w-md mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                LockInOnce
              </h1>
              <span className="bg-rose-100 text-rose-600 text-xs px-2 py-1 rounded-full font-medium">
                Beta
              </span>
            </div>
            <p className="text-xs text-gray-600">Demo - Find your perfect match</p>
          </div>
          
          <div className="flex items-center space-x-2">
            {onShowProjectStatus && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onShowProjectStatus}
                className="h-10 w-10 p-0 rounded-full hover:bg-blue-50"
                title="Project Status"
              >
                <BarChart3 className="h-5 w-5 text-blue-500" />
              </Button>
            )}
            
            {onShowChecklist && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onShowChecklist}
                className="h-10 w-10 p-0 rounded-full hover:bg-rose-50"
                title="Profile Updates"
              >
                <CheckSquare className="h-5 w-5 text-rose-500" />
              </Button>
            )}
            
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
  );
};

export default DashboardHeader;
