
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send } from "lucide-react";
import { Conversation, Message } from "@/utils/messaging/types";
import { MessagingManager } from "@/utils/messaging/messagingManager";
import { UserStateManager } from "@/utils/userStateManager";

interface ChatInterfaceProps {
  conversation: Conversation;
  onBack: () => void;
}

const ChatInterface = ({ conversation, onBack }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [currentUserId, setCurrentUserId] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initializeChat = async () => {
      const userId = await UserStateManager.getCurrentUserId();
      setCurrentUserId(userId);
      
      const conversationMessages = MessagingManager.getConversationMessages(conversation.id);
      setMessages(conversationMessages);
      
      // Mark messages as read
      MessagingManager.markMessagesAsRead(conversation.id, userId);
    };

    initializeChat();
  }, [conversation.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const otherParticipant = conversation.participants.find(p => p !== currentUserId);
    if (!otherParticipant) return;

    const newMessage = MessagingManager.sendMessage(
      conversation.id,
      otherParticipant,
      inputValue.trim()
    );

    setMessages(prev => [...prev, newMessage]);
    setInputValue("");

    // Simulate response after a delay (for demo purposes)
    setTimeout(() => {
      const responses = [
        "That's really interesting! Tell me more 😊",
        "I totally agree with you on that!",
        "Haha, you're funny! I like your sense of humor 😄",
        "Thanks for sharing that with me",
        "I'd love to hear more about your thoughts on this",
        "You seem like such a thoughtful person ❤️"
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const responseMessage = MessagingManager.sendMessage(
        conversation.id,
        currentUserId,
        randomResponse
      );
      
      // Manually create the response message with correct sender
      const simulatedResponse: Message = {
        ...responseMessage,
        senderId: otherParticipant,
        receiverId: currentUserId
      };
      
      setMessages(prev => [...prev, simulatedResponse]);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50 flex flex-col">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/50 px-6 py-4">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="p-3 rounded-xl"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-playfair font-bold text-foreground">
            Your Match
          </h1>
          <div className="w-12" />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 px-6 py-4 overflow-y-auto">
        <div className="max-w-md mx-auto space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">Start your conversation!</p>
              <p className="text-sm text-gray-400">Say hello and break the ice 👋</p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] p-3 rounded-lg ${
                    message.senderId === currentUserId
                      ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white'
                      : 'bg-white border border-gray-200 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.senderId === currentUserId ? 'text-rose-100' : 'text-gray-500'
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="bg-white/80 backdrop-blur-sm border-t border-white/50 px-6 py-4">
        <div className="max-w-md mx-auto flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={handleKeyPress}
            className="flex-1 border-rose-200/50 focus:border-rose-400"
          />
          <Button
            onClick={handleSendMessage}
            size="sm"
            className="bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600"
            disabled={!inputValue.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
