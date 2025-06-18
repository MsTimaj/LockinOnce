
import { useState } from "react";
import { Conversation } from "@/utils/messaging/types";
import ConversationsList from "@/components/messaging/ConversationsList";
import ChatInterface from "@/components/messaging/ChatInterface";
import { useNavigate } from "react-router-dom";
import NavigationFooter from "@/components/dashboard/NavigationFooter";

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const navigate = useNavigate();

  const handleBack = () => {
    if (selectedConversation) {
      setSelectedConversation(null);
    } else {
      navigate('/dashboard');
    }
  };

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
  };

  if (selectedConversation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 pb-20 sm:pb-24">
        <div className="w-full max-w-sm mx-auto px-3 sm:px-6 overflow-x-hidden">
          <ChatInterface 
            conversation={selectedConversation}
            onBack={handleBack}
          />
        </div>
        <NavigationFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 pb-20 sm:pb-24">
      <div className="w-full max-w-sm mx-auto px-3 sm:px-6 overflow-x-hidden">
        <ConversationsList 
          onBack={handleBack}
          onSelectConversation={handleSelectConversation}
        />
      </div>
      <NavigationFooter />
    </div>
  );
};

export default Messages;
