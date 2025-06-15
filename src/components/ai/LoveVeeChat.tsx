import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send, X, Minimize2, Maximize2 } from "lucide-react";
import HeartAnimation from "@/components/ui/heart-animation";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface AnalysisData {
  readinessScore: {
    overall: number;
    isReady: boolean;
    growthAreas: string[];
    personalizedStrategy: string;
  };
  personalityType: string;
  dominantStyle: string;
  topStrengths: string[];
}

interface LoveVeeChatProps {
  isOpen: boolean;
  onToggle: () => void;
  initialTopic?: string | null;
  analysisData?: AnalysisData;
}

const LoveVeeChat = ({ isOpen, onToggle, initialTopic, analysisData }: LoveVeeChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hi there! 💕 I'm Love-vee, your personal AI dating coach. I've analyzed your compatibility profile and I'm here to support you through every step of your dating journey. Whether you're feeling excited, nervous, disappointed, or confused - I'm here to listen and help. What's on your mind today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const [heartTrigger, setHeartTrigger] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
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
      const topicMessage: Message = {
        id: (Date.now()).toString(),
        type: 'ai',
        content: getTopicResponse(initialTopic),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, topicMessage]);
    }
  }, [initialTopic, isOpen]);

  // Check for API key in localStorage
  useEffect(() => {
    const savedApiKey = localStorage.getItem('anthropic_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    } else {
      setShowApiKeyInput(true);
    }
  }, []);

  const handleApiKeySubmit = () => {
    if (apiKey.trim()) {
      localStorage.setItem('anthropic_api_key', apiKey);
      setShowApiKeyInput(false);
    }
  };

  const getSystemPrompt = () => {
    if (!analysisData) {
      return `You are Love-vee, a warm, empathetic AI dating coach. You help people navigate their dating journey with emotional intelligence and practical advice.`;
    }

    const { readinessScore, personalityType, dominantStyle, topStrengths } = analysisData;
    const readinessDescription = readinessScore.isReady 
      ? "highly prepared for a meaningful relationship" 
      : "working on building readiness for a healthy relationship";

    return `You are Love-vee, a warm, empathetic AI dating coach. You help people navigate their dating journey with emotional intelligence and practical advice. 

Your user has these traits based on their compatibility assessment:
- ${readinessScore.overall}% relationship readiness score - they are ${readinessDescription}
- ${dominantStyle} attachment style 
- ${personalityType} communication style
- Top strengths: ${topStrengths.join(', ')}
- Growth areas: ${readinessScore.growthAreas.join(', ')}

Guidelines for your responses:
- Be warm, supportive, and use heart emojis occasionally 💕
- Give practical, actionable dating advice
- Address their emotions and validate their feelings
- Ask follow-up questions to understand their situation better
- Keep responses concise but meaningful (2-4 sentences)
- Focus on building their confidence and helping them find genuine connections
- If they mention being stood up, ghosted, or disappointed, provide emotional support first
- Help them see patterns and make better choices in dating
- Reference their specific readiness score (${readinessScore.overall}%) and traits when relevant

Remember: You're their personal dating coach who cares about their wellbeing and success in love.`;
  };

  const callAnthropicAPI = async (userMessage: string): Promise<string> => {
    if (!apiKey) {
      return "Please set your Anthropic API key to use Love-vee's AI features.";
    }

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-5-haiku-20241022',
          max_tokens: 1000,
          temperature: 0.7,
          system: getSystemPrompt(),
          messages: [
            {
              role: 'user',
              content: userMessage
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`API call failed: ${response.status}`);
      }

      const data = await response.json();
      return data.content[0].text;
    } catch (error) {
      console.error('Anthropic API error:', error);
      return "I'm having trouble connecting right now. Can you try again? 💕";
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    setHeartTrigger(prev => prev + 1);

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue("");
    setIsLoading(true);

    try {
      const aiResponse = await callAnthropicAPI(currentInput);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setHeartTrigger(prev => prev + 1);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "I'm sorry, I'm having trouble responding right now. Please try again! 💕",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const isCompletelyOffTopic = (input: string): boolean => {
    const completelyOffTopicKeywords = [
      'weather', 'sports', 'politics', 'cooking recipe', 'math problem', 
      'homework', 'job interview', 'car repair', 'medical advice', 
      'legal advice', 'tax help', 'programming', 'technology support',
      'vacation planning', 'investment', 'stock market', 'cryptocurrency'
    ];
    
    const lowerInput = input.toLowerCase();
    
    // Only redirect if it's clearly about non-dating topics AND doesn't contain any relationship words
    const hasOffTopicKeywords = completelyOffTopicKeywords.some(keyword => lowerInput.includes(keyword));
    const hasRelationshipWords = ['relationship', 'dating', 'love', 'partner', 'feel', 'emotion', 'heart', 'like', 'attraction', 'connect'].some(word => lowerInput.includes(word));
    
    return hasOffTopicKeywords && !hasRelationshipWords;
  };

  const isDatingRelated = (input: string): boolean => {
    const datingKeywords = [
      'date', 'dating', 'relationship', 'match', 'love', 'romance', 'partner', 
      'conversation', 'chat', 'message', 'flirt', 'attraction', 'compatibility',
      'attachment', 'communication', 'breakup', 'safety', 'meeting', 'profile',
      'bio', 'photo', 'swipe', 'connect', 'intimate', 'emotional', 'trust',
      'commitment', 'marriage', 'serious', 'casual', 'first date', 'chemistry',
      'stood up', 'ghosted', 'rejected', 'nervous', 'excited', 'disappointed',
      'feelings', 'hurt', 'confused', 'anxious', 'hopeful', 'lonely'
    ];
    
    const lowerInput = input.toLowerCase();
    return datingKeywords.some(keyword => lowerInput.includes(keyword)) ||
           lowerInput.includes('how to') || // Allow coaching questions
           lowerInput.includes('advice') ||
           lowerInput.includes('tips') ||
           lowerInput.includes('help') ||
           lowerInput.includes('feel') ||
           lowerInput.includes('what should i');
  };

  const getTopicResponse = (topic: string): string => {
    if (!analysisData) {
      return `I'm so glad you want to explore ${topic} more deeply! 💕 Tell me what's really on your mind about this.`;
    }

    const { readinessScore, personalityType, dominantStyle } = analysisData;
    const scoreText = `${readinessScore.overall}%`;
    const readinessDescription = readinessScore.isReady 
      ? "fantastic! 🌟 This means you've done the inner work and you're emotionally prepared for a genuine connection."
      : "shows you're on a great path! 🌱 You're building the foundation for a healthy relationship.";

    switch (topic.toLowerCase()) {
      case 'relationship readiness':
        return `Your ${scoreText} relationship readiness score is ${readinessDescription} You have strong self-awareness and clear intentions - these are valuable qualities. ${readinessScore.isReady ? "The fact that you're even thinking about readiness shows maturity." : "Focus on your growth areas and you'll continue building that readiness."} What specific aspect of being 'ready' feels most important to you right now?`;
      
      case 'attachment style':
        return `Having a ${dominantStyle} attachment style is important to understand! 💪 ${dominantStyle === 'secure' ? "You naturally create safe spaces for emotional intimacy while maintaining your independence. This means you won't chase someone who's pulling away, and you won't run from someone getting close." : "Understanding your attachment patterns helps you build healthier relationships and recognize what you need from a partner."} How does knowing this about yourself change how you approach dating?`;
      
      case 'communication style':
        return `Your ${personalityType} communication style is such a gift! 💕 This affects how you connect with others and express your feelings. Your challenge might be that some people won't immediately 'get' your style, but that's actually perfect filtering! The right person will be drawn to your authenticity. What kind of conversations make you feel most connected?`;
      
      case 'relationship strengths':
        return `Your strengths include ${analysisData.topStrengths.join(', ')} - these make you incredibly dateable! 🌟 These strengths will help you build something real and meaningful. Which of these feels like your biggest superpower in relationships?`;
      
      case 'relationship growth areas':
        return `Your growth areas (${readinessScore.growthAreas.join(', ')}) aren't weaknesses - they're your next level up! 📈 With your ${scoreText} readiness score, you have a great foundation to work on these areas. What feels like the biggest challenge for you in these areas?`;
      
      case 'personalized dating strategy':
        return `Based on your ${dominantStyle} attachment style and ${personalityType} communication style, your personalized strategy is so smart! 🎯 ${readinessScore.personalizedStrategy} This approach might take longer, but it leads to much better relationships. What activities or conversation topics light you up most?`;
      
      case 'matching algorithm':
        return `Our algorithm prioritizes what actually predicts relationship success! 💕 Values alignment, communication compatibility, attachment styles, and life goals. We're not just matching you on surface attraction - we're finding people you could genuinely build a life with based on your ${scoreText} readiness score and ${dominantStyle} attachment style. What matters most to you in a potential partner?`;
      
      default:
        return `I'm so glad you want to explore ${topic} more deeply! 💕 Based on your ${scoreText} readiness score and ${dominantStyle} attachment style, you have so many strengths to work with. Tell me what's really on your mind about this - are you feeling excited, nervous, curious, or something else?`;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        <Card className={`bg-white/95 backdrop-blur-xl shadow-2xl border-2 border-rose-200/50 transition-all duration-300 ${isMinimized ? 'w-80 h-16' : 'w-80 h-96'}`}>
          <CardHeader className="p-4 bg-gradient-to-r from-rose-400 via-pink-500 to-rose-400 text-white rounded-t-lg">
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
                  onClick={() => {
                    setIsMinimized(!isMinimized);
                    setHeartTrigger(prev => prev + 1);
                  }}
                  className="text-white hover:bg-white/20 p-1 h-6 w-6"
                >
                  {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setHeartTrigger(prev => prev + 1);
                    onToggle();
                  }}
                  className="text-white hover:bg-white/20 p-1 h-6 w-6"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardHeader>
          
          {!isMinimized && (
            <CardContent className="p-0 flex flex-col h-80">
              {showApiKeyInput && (
                <div className="p-4 bg-amber-50 border-b border-amber-200">
                  <p className="text-sm text-amber-800 mb-2">Enter your Anthropic API key to enable AI responses:</p>
                  <div className="flex space-x-2">
                    <Input
                      type="password"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="sk-ant-..."
                      className="flex-1 text-xs"
                    />
                    <Button size="sm" onClick={handleApiKeySubmit}>
                      Save
                    </Button>
                  </div>
                </div>
              )}
              
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
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-800 p-3 rounded-lg text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
              
              {/* Input */}
              <div className="p-4 border-t border-gray-200/50 bg-gray-50/50">
                <div className="flex space-x-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Tell Love-vee what's happening..."
                    onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
                    className="flex-1 border-rose-200/50 focus:border-rose-400"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={handleSendMessage}
                    size="sm"
                    className="bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600"
                    disabled={isLoading}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
        
        <HeartAnimation trigger={heartTrigger} className="rounded-lg" />
      </div>
    </div>
  );
};

export default LoveVeeChat;
