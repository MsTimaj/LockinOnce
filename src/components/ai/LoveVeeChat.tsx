
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send, X, Minimize2, Maximize2 } from "lucide-react";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface LoveVeeChatProps {
  isOpen: boolean;
  onToggle: () => void;
}

const LoveVeeChat = ({ isOpen, onToggle }: LoveVeeChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hi! I'm Love-vee, your AI dating coach. I'm here to help you with dating tips, match insights, conversation starters, and relationship advice. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(inputValue),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('match') || input.includes('compatible')) {
      return "Based on your profile, I recommend focusing on matches with 80%+ compatibility scores. Look for shared values and complementary communication styles. Would you like specific conversation starters for any of your matches?";
    }
    
    if (input.includes('conversation') || input.includes('message')) {
      return "Great conversation starters based on your personality: Ask about their favorite weekend activities, their thoughts on meaningful books/movies, or share something you're passionate about. Avoid generic 'hey' messages - your thoughtful nature is an asset!";
    }
    
    if (input.includes('date') || input.includes('first date')) {
      return "For first dates, I suggest activities that allow for natural conversation - coffee shops, art galleries, or casual walks. Given your communication style, environments where you can have deeper conversations work best for you.";
    }
    
    if (input.includes('safety') || input.includes('safe')) {
      return "Safety first! Always meet in public places, let someone know your plans, trust your instincts, and take your time getting to know someone. Video calls before meeting can help establish comfort and authenticity.";
    }
    
    return "That's a great question! Based on your compatibility profile, I'd recommend being authentic to your communication style. Your strengths in emotional intelligence and clear communication are valuable assets. Can you tell me more about what specific aspect you'd like guidance on?";
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={`bg-white shadow-2xl border-2 border-rose-200 transition-all duration-300 ${isMinimized ? 'w-80 h-16' : 'w-80 h-96'}`}>
        <CardHeader className="p-4 bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5" />
              <span className="font-serif font-bold">Love-vee</span>
              <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-white/20 p-1 h-6 w-6"
              >
                {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={onToggle}
                className="text-white hover:bg-white/20 p-1 h-6 w-6"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-80">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[75%] p-3 rounded-lg text-sm ${
                      message.type === 'user'
                        ? 'bg-rose-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask Love-vee anything..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  className="bg-rose-500 hover:bg-rose-600"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default LoveVeeChat;
