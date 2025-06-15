
import { Bell, Settings, CheckSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  onShowChecklist?: () => void;
}

const DashboardHeader = ({ onShowChecklist }: DashboardHeaderProps) => {
  return (
    <div className="bg-white/80 backdrop-blur-xl border-b border-white/30 sticky top-0 z-30">
      <div className="max-w-md mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              LockInOnce
            </h1>
            <p className="text-xs text-gray-600">Find your perfect match</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onShowChecklist}
              className="h-10 w-10 p-0 rounded-full hover:bg-rose-50"
            >
              <CheckSquare className="h-5 w-5 text-rose-500" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="h-10 w-10 p-0 rounded-full hover:bg-gray-100 relative"
            >
              <Bell className="h-5 w-5 text-gray-600" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full"></div>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="h-10 w-10 p-0 rounded-full hover:bg-gray-100"
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
