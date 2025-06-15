
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
  initialTopic?: string | null;
}

const LoveVeeChat = ({ isOpen, onToggle, initialTopic }: LoveVeeChatProps) => {
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

  // Handle initial topic when chat opens
  useEffect(() => {
    if (initialTopic && isOpen && messages.length === 1) {
      // Add the topic-specific AI response
      const topicMessage: Message = {
        id: (Date.now()).toString(),
        type: 'ai',
        content: getTopicResponse(initialTopic),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, topicMessage]);
    }
  }, [initialTopic, isOpen]);

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

    // Check if message is appropriate for dating coaching
    if (!isDatingRelated(inputValue)) {
      const redirectMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "I'm specifically designed to help with dating and relationship topics! Let's focus on areas like dating tips, match compatibility, conversation starters, relationship advice, or safety tips. What dating question can I help you with?",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, redirectMessage]);
      return;
    }

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

  const isDatingRelated = (input: string): boolean => {
    const datingKeywords = [
      'date', 'dating', 'relationship', 'match', 'love', 'romance', 'partner', 
      'conversation', 'chat', 'message', 'flirt', 'attraction', 'compatibility',
      'attachment', 'communication', 'breakup', 'safety', 'meeting', 'profile',
      'bio', 'photo', 'swipe', 'connect', 'intimate', 'emotional', 'trust',
      'commitment', 'marriage', 'serious', 'casual', 'first date', 'chemistry'
    ];
    
    const lowerInput = input.toLowerCase();
    return datingKeywords.some(keyword => lowerInput.includes(keyword)) ||
           lowerInput.includes('how to') || // Allow coaching questions
           lowerInput.includes('advice') ||
           lowerInput.includes('tips') ||
           lowerInput.includes('help');
  };

  const getTopicResponse = (topic: string): string => {
    switch (topic.toLowerCase()) {
      case 'relationship readiness':
        return "Great question about relationship readiness! Your 87% score shows you're well-prepared for a meaningful relationship. This score factors in your emotional maturity, communication skills, and clear relationship goals. Would you like specific tips on maintaining this readiness or areas where you can grow even stronger?";
      
      case 'attachment style':
        return "Your Secure Attachment style is fantastic for dating! This means you're comfortable with both intimacy and independence - you can get close without losing yourself. Secure attachment folks tend to have healthier relationships and better communication. Want to know how to leverage this strength in dating or how to connect well with other attachment styles?";
      
      case 'communication style':
        return "Your Introverted Feeling communication style is a real asset! You process emotions deeply and value authentic connections. This means you're great at meaningful conversations and creating genuine bonds. Would you like tips on using this strength in dating conversations, or advice on connecting with different communication styles?";
      
      case 'relationship strengths':
        return "Your top strengths - Emotional Intelligence, Clear Communication, and Relationship Goals - are powerful dating assets! Emotional intelligence helps you understand both your feelings and your date's, clear communication prevents misunderstandings, and having relationship goals shows you're serious about finding the right person. Want specific ways to showcase these strengths on dates?";
      
      case 'relationship growth areas':
        return "Growth areas like 'Opening Up Gradually' and 'Managing Expectations' are totally normal! Opening up gradually is actually healthy - it builds trust naturally. Managing expectations helps prevent disappointment and keeps you realistic. Would you like specific strategies for either of these areas, or tips on turning growth areas into strengths?";
      
      case 'personalized dating strategy':
        return "Your dating strategy focuses on quality connections through shared activities and meaningful conversations - perfect for your secure attachment style! This approach helps you find genuine compatibility rather than surface-level attraction. Want specific date ideas that align with this strategy, or tips on having those meaningful conversations?";
      
      case 'matching algorithm':
        return "Our matching algorithm prioritizes values alignment (30%) and communication style (25%) because these predict long-term compatibility! We also factor in life goals, emotional maturity, and lifestyle compatibility. This science-based approach finds you matches with real potential. Curious about what makes a high-percentage match, or how to interpret your compatibility scores?";
      
      default:
        return `I'd love to dive deeper into ${topic}! This is such an important aspect of dating and relationships. What specific questions do you have about this topic? I can provide personalized advice based on your compatibility profile.`;
    }
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Safety-related responses
    if (input.includes('safety') || input.includes('safe') || input.includes('danger') || input.includes('red flag')) {
      return "Safety is crucial in dating! Always meet in public places, tell someone your plans, trust your instincts, and video chat before meeting. Red flags include: rushing intimacy, inconsistent stories, avoiding video calls, or pressuring you. Your secure attachment style helps you recognize healthy vs unhealthy patterns. Want specific safety tips for your situation?";
    }
    
    // Match-related responses
    if (input.includes('match') || input.includes('compatible') || input.includes('score')) {
      return "Based on your profile, focus on matches with 80%+ compatibility scores - these share your core values and communication style. Look for complementary attachment styles and similar life goals. Your secure attachment pairs well with other secure types, but can also help anxious types feel safe. Want help understanding specific match scores?";
    }
    
    // Conversation responses
    if (input.includes('conversation') || input.includes('message') || input.includes('text') || input.includes('chat')) {
      return "Your deep communication style is perfect for meaningful conversations! Try asking about their passions, values, or meaningful experiences rather than surface topics. Your emotional intelligence helps you read their responses well. Avoid generic 'hey' messages - reference something from their profile that genuinely interests you. Need specific conversation starters?";
    }
    
    // First date responses
    if (input.includes('first date') || input.includes('date idea') || input.includes('meeting')) {
      return "For first dates, choose activities that allow natural conversation - coffee shops, museums, walking tours, or cooking classes. Your preference for meaningful connection works best in environments where you can actually talk! Avoid movies or loud bars initially. Your secure attachment helps you feel comfortable, so trust your instincts about what feels right.";
    }
    
    // Profile and bio responses
    if (input.includes('profile') || input.includes('bio') || input.includes('photo')) {
      return "Your profile should reflect your authentic self! With your emotional intelligence and clear communication, write a bio that shows your depth - mention your values, interests, and what you're looking for. Use photos that show your personality, not just your appearance. Your secure attachment means you're comfortable being genuine, which attracts the right people.";
    }
    
    // Default dating coaching response
    return "That's a thoughtful question! Based on your compatibility profile - secure attachment, strong emotional intelligence, and clear communication - you have great relationship foundations. Your authentic, depth-seeking approach is an asset in dating. Can you tell me more about your specific situation so I can give you more targeted advice?";
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
                  placeholder="Ask Love-vee about dating..."
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
