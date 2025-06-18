
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, X } from "lucide-react";
import LoveVeeChat from "./LoveVeeChat";

interface LoveVeeChatButtonProps {
  initialTopic?: string | null;
  isOpen?: boolean;
  onToggle?: () => void;
  analysisData?: any;
}

const LoveVeeChatButton = ({ 
  initialTopic, 
  isOpen: externalIsOpen, 
  onToggle: externalOnToggle,
  analysisData 
}: LoveVeeChatButtonProps) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

  const handleButtonClick = () => {
    console.log('Chat button clicked, current state:', isOpen);
    if (externalOnToggle) {
      externalOnToggle();
    } else {
      setInternalIsOpen(!internalIsOpen);
    }
  };

  const handleChatClose = () => {
    console.log('Chat close requested');
    if (externalOnToggle) {
      externalOnToggle();
    } else {
      setInternalIsOpen(false);
    }
  };

  return (
    <>
      {/* Fixed position button with proper z-index and bottom spacing for nav */}
      <div className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 z-40">
        <Button
          onClick={handleButtonClick}
          className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-xl transition-all duration-300 ${
            isOpen 
              ? 'bg-gray-500 hover:bg-gray-600' 
              : 'bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600'
          }`}
        >
          {isOpen ? (
            <X className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
          ) : (
            <MessageSquare className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
          )}
        </Button>
      </div>

      {/* Chat overlay with proper z-index */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-4 pb-20">
          <div className="w-full max-w-md h-[70vh] bg-white rounded-t-2xl shadow-2xl border border-gray-200 overflow-hidden">
            <LoveVeeChat 
              isOpen={isOpen}
              onToggle={handleChatClose}
              initialTopic={initialTopic}
              analysisData={analysisData}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default LoveVeeChatButton;
