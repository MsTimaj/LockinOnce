
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageCircle, Plus } from "lucide-react";
import { Conversation } from "@/utils/messaging/types";
import { MessagingManager } from "@/utils/messaging/messagingManager";
import { MatchStorageManager } from "@/utils/storage/matchStorageManager";
import { generateCompatibleMatches } from "@/utils/compatibilityCalculator";
import { UserStateManager } from "@/utils/userStateManager";

interface ConversationsListProps {
  onBack: () => void;
  onSelectConversation: (conversation: Conversation) => void;
}

const ConversationsList = ({ onBack, onSelectConversation }: ConversationsListProps) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [matches, setMatches] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadConversations = async () => {
      try {
        // Load user profile and generate matches
        const profile = await UserStateManager.getUserProfile();
        if (profile?.assessmentResults) {
          const generatedMatches = generateCompatibleMatches(profile.assessmentResults);
          setMatches(generatedMatches);
        }

        // Get existing conversations
        const userConversations = await MessagingManager.getUserConversations();
        
        // Create conversations for mutual matches that don't have them yet
        const mutualMatches = MatchStorageManager.getMutualMatches();
        const updatedConversations = [...userConversations];
        
        for (const mutualMatch of mutualMatches) {
          const existingConversation = userConversations.find(conv => 
            conv.matchId === mutualMatch.matchId
          );
          
          if (!existingConversation) {
            // Create a new conversation for this mutual match
            const newConversation = await MessagingManager.getOrCreateConversation(
              mutualMatch.matchId, 
              mutualMatch.matchId
            );
            updatedConversations.push(newConversation);
          }
        }
        
        setConversations(updatedConversations);
      } catch (error) {
        console.error('Failed to load conversations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadConversations();
  }, []);

  const getMatchInfo = (matchId: string) => {
    const match = matches.find(m => m.id === matchId);
    return match ? {
      name: match.name,
      photo: match.photo,
      age: match.age
    } : {
      name: "Your Match",
      photo: null,
      age: null
    };
  };

  const formatLastMessage = (conversation: Conversation) => {
    if (!conversation.lastMessage) {
      return "Start your conversation...";
    }
    
    const content = conversation.lastMessage.content;
    return content.length > 50 ? `${content.substring(0, 50)}...` : content;
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading conversations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50 pb-20">
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
            Messages
          </h1>
          <div className="w-12" />
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6">
        {/* Conversations */}
        {conversations.length === 0 ? (
          <div className="text-center py-12">
            <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No conversations yet</h3>
            <p className="text-gray-500 mb-4">Connect with matches to start conversations!</p>
            <Button 
              onClick={() => window.location.href = '/dashboard'}
              className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Find Matches
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {conversations.map((conversation) => {
              const matchInfo = getMatchInfo(conversation.matchId);
              return (
                <Card 
                  key={conversation.id}
                  className="bg-white/80 backdrop-blur-sm border border-white/50 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-[1.02]"
                  onClick={() => onSelectConversation(conversation)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      {matchInfo.photo ? (
                        <img 
                          src={matchInfo.photo} 
                          alt={matchInfo.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center">
                          <MessageCircle className="h-6 w-6 text-white" />
                        </div>
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-gray-800 truncate">
                            {matchInfo.name}
                            {matchInfo.age && (
                              <span className="text-sm text-gray-500 font-normal ml-1">
                                , {matchInfo.age}
                              </span>
                            )}
                          </h3>
                          <span className="text-xs text-gray-500">
                            {formatTime(conversation.lastActivity)}
                          </span>
                        </div>
                        
                        <p className="text-sm text-gray-600 truncate">
                          {formatLastMessage(conversation)}
                        </p>
                        
                        {conversation.unreadCount > 0 && (
                          <div className="flex items-center justify-between mt-2">
                            <div className="w-4 h-4 bg-rose-500 rounded-full flex items-center justify-center">
                              <span className="text-xs text-white font-bold">
                                {conversation.unreadCount}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationsList;
