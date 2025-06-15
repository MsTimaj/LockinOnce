
import { Button } from "@/components/ui/button";
import { MessageSquare, X, Minimize2, Maximize2 } from "lucide-react";

interface ChatHeaderProps {
  isMinimized: boolean;
  onMinimize: () => void;
  onClose: () => void;
}

const ChatHeader = ({ isMinimized, onMinimize, onClose }: ChatHeaderProps) => {
  return (
    <div className="p-4 bg-gradient-to-r from-rose-400 via-pink-500 to-rose-400 text-white rounded-t-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MessageSquare className="h-5 w-5" />
          <span className="font-serif font-bold">Love-vee</span>
          <div className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse"></div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={onMinimize}
            className="text-white hover:bg-white/20 p-1 h-6 w-6"
          >
            {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={onClose}
            className="text-white hover:bg-white/20 p-1 h-6 w-6"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
