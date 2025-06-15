
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import LoveVeeChat from "./LoveVeeChat";

interface LoveVeeChatButtonProps {
  initialTopic?: string | null;
  isOpen?: boolean;
  onToggle?: () => void;
}

const LoveVeeChatButton = ({ initialTopic, isOpen: externalIsOpen, onToggle }: LoveVeeChatButtonProps) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  
  const isChatOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  
  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    } else {
      setInternalIsOpen(!internalIsOpen);
    }
  };

  return (
    <>
      {!isChatOpen && (
        <Button
          onClick={handleToggle}
          className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 shadow-2xl border-2 border-white"
        >
          <MessageSquare className="h-6 w-6 text-white" />
        </Button>
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
