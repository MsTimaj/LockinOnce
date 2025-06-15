
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import LoveVeeChat from "./LoveVeeChat";
import HeartAnimation from "@/components/ui/heart-animation";

interface LoveVeeChatButtonProps {
  initialTopic?: string | null;
  isOpen?: boolean;
  onToggle?: () => void;
}

const LoveVeeChatButton = ({ initialTopic, isOpen: externalIsOpen, onToggle }: LoveVeeChatButtonProps) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [heartTrigger, setHeartTrigger] = useState(0);
  
  const isChatOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  
  const handleToggle = () => {
    setHeartTrigger(prev => prev + 1);
    if (onToggle) {
      onToggle();
    } else {
      setInternalIsOpen(!internalIsOpen);
    }
  };

  return (
    <>
      {!isChatOpen && (
        <div className="fixed bottom-6 right-6 z-40">
          <div className="relative">
            <Button
              onClick={handleToggle}
              className="w-16 h-16 rounded-full bg-gradient-to-r from-rose-400 via-pink-500 to-rose-500 hover:from-rose-500 hover:via-pink-600 hover:to-rose-600 shadow-2xl border-4 border-white/80 transition-all duration-300 hover:scale-110 animate-pulse-glow"
            >
              <MessageSquare className="h-7 w-7 text-white" />
            </Button>
            <HeartAnimation trigger={heartTrigger} />
          </div>
        </div>
      )}
      
      <LoveVeeChat 
        isOpen={isChatOpen}
        onToggle={handleToggle}
        initialTopic={initialTopic}
      />
    </>
  );
};

export default LoveVeeChatButton;
