
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import HeartAnimation from "@/components/ui/heart-animation";
import { AnalysisData } from "./types";
import { getTopicResponse } from "./chatPrompts";
import { useChat } from "./useChat";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import ChatLoadingIndicator from "./ChatLoadingIndicator";
import ChatInput from "./ChatInput";
import ApiKeyInput from "./ApiKeyInput";

interface LoveVeeChatProps {
  isOpen: boolean;
  onToggle: () => void;
  initialTopic?: string | null;
  analysisData?: AnalysisData;
}

const LoveVeeChat = ({ isOpen, onToggle, initialTopic, analysisData }: LoveVeeChatProps) => {
  const [inputValue, setInputValue] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const [heartTrigger, setHeartTrigger] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    isLoading,
    apiKey,
    showApiKeyInput,
    setApiKey,
    handleApiKeySubmit,
    sendMessage,
    addTopicMessage
  } = useChat(analysisData);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle initial topic when chat opens
  useEffect(() => {
    if (initialTopic && isOpen && messages.length === 1) {
      const topicContent = getTopicResponse(initialTopic, analysisData);
      addTopicMessage(topicContent);
    }
  }, [initialTopic, isOpen, messages.length, analysisData, addTopicMessage]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    setHeartTrigger(prev => prev + 1);
    const currentInput = inputValue;
    setInputValue("");
    
    await sendMessage(currentInput);
    setHeartTrigger(prev => prev + 1);
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
    setHeartTrigger(prev => prev + 1);
  };

  const handleClose = () => {
    setHeartTrigger(prev => prev + 1);
    onToggle();
  };

  if (!isOpen) return null;

  return (
    <div className="relative w-full h-full">
      <Card className={`bg-white/95 backdrop-blur-xl shadow-2xl border-2 border-rose-200/50 transition-all duration-300 w-full ${isMinimized ? 'h-16' : 'h-full'}`}>
        <CardHeader className="p-0">
          <ChatHeader 
            isMinimized={isMinimized}
            onMinimize={handleMinimize}
            onClose={handleClose}
          />
        </CardHeader>
        
        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-[calc(100%-64px)]">
            {showApiKeyInput && (
              <ApiKeyInput
                apiKey={apiKey}
                onChange={setApiKey}
                onSubmit={handleApiKeySubmit}
              />
            )}
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              
              {isLoading && <ChatLoadingIndicator />}
              
              <div ref={messagesEndRef} />
            </div>
            
            <ChatInput
              value={inputValue}
              onChange={setInputValue}
              onSend={handleSendMessage}
              isLoading={isLoading}
            />
          </CardContent>
        )}
      </Card>
      
      <HeartAnimation trigger={heartTrigger} className="rounded-lg" />
    </div>
  );
};

export default LoveVeeChat;
