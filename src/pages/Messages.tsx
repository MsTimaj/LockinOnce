
import { useState } from "react";
import { Conversation } from "@/utils/messaging/types";
import ConversationsList from "@/components/messaging/ConversationsList";
import ChatInterface from "@/components/messaging/ChatInterface";
import { useNavigate } from "react-router-dom";

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
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
        <ChatInterface 
          conversation={selectedConversation}
          onBack={handleBack}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      <ConversationsList 
        onBack={handleBack}
        onSelectConversation={handleSelectConversation}
      />
    </div>
  );
};

export default Messages;
