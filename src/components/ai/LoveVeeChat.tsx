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
      content: "Hi there! 💕 I'm Love-vee, your personal AI dating coach. I've analyzed your compatibility profile and I'm here to support you through every step of your dating journey. Whether you're feeling excited, nervous, disappointed, or confused - I'm here to listen and help. What's on your mind today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const [heartTrigger, setHeartTrigger] = useState(0);
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

    setHeartTrigger(prev => prev + 1); // Trigger hearts on user interaction

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    // Check if message is completely unrelated to dating/relationships
    if (isCompletelyOffTopic(inputValue)) {
      const redirectMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "I understand you might have other things on your mind, but I'm specifically designed to be your dating and relationship coach! 💕 I'm here to help with things like understanding your matches, dealing with dating anxiety, conversation tips, relationship advice, or even just processing feelings about your dating journey. What's happening in your love life that I can help with?",
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
      setHeartTrigger(prev => prev + 1); // Trigger hearts on AI response
    }, 1000);
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
    switch (topic.toLowerCase()) {
      case 'relationship readiness':
        return "Your 87% relationship readiness score is fantastic! 🌟 This means you've done the inner work and you're emotionally prepared for a genuine connection. You have strong self-awareness, healthy boundaries, and clear intentions - these are rare qualities that will attract the right person. The fact that you're even thinking about readiness shows maturity. What specific aspect of being 'ready' feels most important to you right now?";
      
      case 'attachment style':
        return "Having a Secure Attachment style is like having a superpower in dating! 💪 You naturally create safe spaces for emotional intimacy while maintaining your independence. This means you won't chase someone who's pulling away, and you won't run from someone getting close. Your dates will feel comfortable opening up to you because you're consistent and trustworthy. How does knowing this about yourself change how you approach dating?";
      
      case 'communication style':
        return "Your Introverted Feeling style is such a gift! 💕 While others make small talk, you create soul connections. You process emotions deeply and speak from the heart - this attracts people who want real intimacy, not just surface-level fun. Your challenge might be that shallow daters won't 'get' you, but that's actually perfect filtering! The right person will be drawn to your authenticity like a magnet. What kind of conversations make you feel most connected?";
      
      case 'relationship strengths':
        return "Your emotional intelligence, clear communication, and relationship goals make you incredibly dateable! 🌟 Emotional intelligence means you can handle conflict maturely and understand your partner's needs. Clear communication prevents those awful misunderstandings that kill relationships. And having relationship goals? That shows you're not just dating for entertainment - you know what you want. These strengths will help you build something real. Which of these feels like your biggest superpower?";
      
      case 'relationship growth areas':
        return "Growth areas aren't weaknesses - they're your next level up! 📈 'Opening up gradually' is actually healthy - it builds trust naturally instead of trauma-dumping on date three. 'Managing expectations' saves you from fantasy relationships with people who don't exist. Your secure attachment gives you a great foundation to work on these areas without getting overwhelmed. What feels like the biggest challenge for you in these areas?";
      
      case 'personalized dating strategy':
        return "Your strategy is so smart! 🎯 Quality over quantity, shared activities, meaningful conversations - this is how lasting relationships actually start. Your secure attachment style means you won't waste time with people who aren't genuinely interested. You'll connect through doing things you both love, which builds natural chemistry and compatibility. This approach might take longer, but it leads to much better relationships. What activities or conversation topics light you up most?";
      
      case 'matching algorithm':
        return "Our algorithm prioritizes what actually predicts relationship success! 💕 Values alignment (30%) because shared core beliefs prevent major conflicts. Communication style (25%) because you need to actually understand each other. Life goals, emotional maturity, and lifestyle compatibility round it out. We're not just matching you on surface attraction - we're finding people you could genuinely build a life with. What matters most to you in a potential partner?";
      
      default:
        return `I'm so glad you want to explore ${topic} more deeply! 💕 This is such an important part of your dating journey. Based on your compatibility profile, you have so many strengths to work with. Tell me what's really on your mind about this - are you feeling excited, nervous, curious, or something else? I want to give you advice that actually fits your situation.`;
    }
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Handle attachment and fear of coming on too strong
    if (input.includes('attached') || input.includes('attachment') || input.includes('too strong') || input.includes('scare') || input.includes('clingy') || input.includes('needy')) {
      return "This is such a common and valid concern! 💕 The fact that you're aware of this shows great emotional intelligence. With your secure attachment style, you naturally balance connection with independence. Here's the key: genuine interest is attractive, desperation is not. Share your authentic self gradually, maintain your own life and interests, and let the relationship develop naturally. Ask yourself - are you trying to fill a void or genuinely excited about this person? The right person will appreciate your enthusiasm, not be scared by it. What specifically are you worried about doing that might seem 'too much'?";
    }
    
    // Handle being stood up or ghosted
    if (input.includes('stood up') || input.includes('stood me up') || input.includes('ghosted') || input.includes('cancelled') || input.includes('no show')) {
      return "Oh honey, I'm so sorry that happened to you. 💔 Being stood up feels awful and personal, but here's the truth: this says EVERYTHING about them and NOTHING about you. Someone who stands you up lacks basic respect and emotional maturity - do you really want to date someone like that? Your 95% match was clearly based on their fake persona, not who they really are. A genuinely compatible person would communicate, even if they needed to reschedule. This is actually the trash taking itself out. You deserve someone who's excited to show up for you. How are you feeling right now?";
    }
    
    // Handle disappointment and hurt feelings
    if (input.includes('disappointed') || input.includes('hurt') || input.includes('upset') || input.includes('sad') || input.includes('crying')) {
      return "Your feelings are completely valid. 💕 Dating disappointment hits different because we invest hope and excitement in these connections. It's okay to feel hurt - that means you're opening your heart, which is brave. Take time to process this feeling, but don't let it close you off. Your secure attachment style is actually protecting you here - you're not chasing someone who showed you they're unreliable. This disappointment is redirecting you toward someone better. What would help you feel supported right now?";
    }
    
    // Handle pacing and taking things slow
    if (input.includes('slow') || input.includes('pace') || input.includes('rush') || input.includes('time') || input.includes('gradual')) {
      return "Taking your time is actually a sign of wisdom! 💕 Your secure attachment style naturally wants to build trust gradually, which creates stronger foundations. There's no universal 'right' pace - it should feel natural for both of you. Pay attention to how she responds to your current pace. Is she matching your energy? Asking questions back? Suggesting plans? Let her actions guide you more than overthinking the timeline. Quality connection matters more than speed. What feels like the right next step for you two?";
    }
    
    // Handle nervousness and anxiety
    if (input.includes('nervous') || input.includes('anxiety') || input.includes('worried') || input.includes('scared') || input.includes('afraid')) {
      return "Those butterflies are totally normal! 💕 Your nervous system is just responding to something important to you. The difference between excitement and anxiety is often just how we interpret the feeling. Your secure attachment gives you tools to manage this - take deep breaths, remind yourself of your worth, and focus on getting to know HER rather than trying to impress her. Nerves can actually be endearing when you're authentic about them. What's the biggest thing you're nervous about?";
    }
    
    // Handle high compatibility scores that didn't work out
    if (input.includes('95%') || input.includes('high match') || input.includes('perfect match') || input.includes('compatible')) {
      return "High compatibility scores can make rejection feel extra confusing! 💔 But here's the thing - our algorithm measures potential compatibility, not guaranteed interest. Someone can be perfect for you on paper but not ready for what you offer, dealing with personal issues, or frankly, just not emotionally mature enough to recognize a good thing. Your 95% match standing you up actually proves they weren't as compatible as the score suggested - truly compatible people don't treat each other poorly. Focus on matches who show up consistently, regardless of their score. Character matters more than percentages. 💕";
    }
    
    // Safety-related responses
    if (input.includes('safety') || input.includes('safe') || input.includes('danger') || input.includes('red flag')) {
      return "Your safety is my top priority! 🛡️ Always trust your instincts - they're usually right. Meet in public places, tell someone your plans, video chat first, and watch for red flags like: rushing intimacy, inconsistent stories, avoiding video calls, or pressuring you in any way. Your secure attachment helps you spot healthy vs unhealthy patterns. If something feels off, it probably is. You're not being paranoid - you're being smart. What specific safety concerns do you have?";
    }
    
    // Match-related responses
    if (input.includes('match') || input.includes('compatible') || input.includes('score')) {
      return "Let's talk strategy! 🎯 Focus on matches 80%+ who also show genuine interest through their actions, not just their score. Look for people who ask thoughtful questions, suggest specific plans, and follow through consistently. Your secure attachment pairs beautifully with other secure types, but can also help anxious types feel safe. Pay attention to how they make you feel - excited and peaceful, or anxious and confused? The right match will feel both exciting AND calming. What patterns are you noticing in your matches?";
    }
    
    // Conversation responses
    if (input.includes('conversation') || input.includes('message') || input.includes('text') || input.includes('chat')) {
      return "Your deep communication style is perfect for creating real connections! 💕 Ask about their passions, childhood dreams, or what they're learning lately. Share stories that show your values and personality. Your emotional intelligence helps you read between the lines beautifully. Avoid generic messages - reference something specific from their profile that genuinely intrigued you. The right person will match your conversation depth naturally. What kind of conversations make you feel most excited about someone?";
    }
    
    // First date responses
    if (input.includes('first date') || input.includes('date idea') || input.includes('meeting')) {
      return "First dates should feel like fun, not job interviews! 😊 Choose activities where you can actually talk - coffee walks, museums, cooking classes, or mini golf. Your preference for meaningful connection shines in environments where you can be yourselves. Avoid movies or super loud places initially. Trust your secure attachment instincts about what feels right. The goal isn't to impress them - it's to see if you genuinely enjoy each other's company. What activities make you feel most like yourself?";
    }
    
    // Profile and bio responses
    if (input.includes('profile') || input.includes('bio') || input.includes('photo')) {
      return "Your profile should feel like the real you! ✨ With your emotional intelligence and authentic communication style, write a bio that shows your depth - mention your values, what you're passionate about, and what kind of connection you're seeking. Use photos that capture your personality, not just your appearance. Your secure attachment means you're comfortable being genuine, which naturally attracts emotionally available people. What aspects of yourself do you most want a potential partner to see?";
    }
    
    // Default empathetic response
    return "I can hear that this is important to you. 💕 Based on your compatibility profile - your secure attachment, emotional intelligence, and authentic communication style - you have incredible relationship potential. Your approach to dating with depth and intentionality is exactly what leads to lasting love. Can you tell me more about what you're experiencing right now? I want to give you advice that actually fits your specific situation and feelings.";
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
              <div className="p-4 border-t border-gray-200/50 bg-gray-50/50">
                <div className="flex space-x-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Tell Love-vee what's happening..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 border-rose-200/50 focus:border-rose-400"
                  />
                  <Button
                    onClick={handleSendMessage}
                    size="sm"
                    className="bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600"
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
