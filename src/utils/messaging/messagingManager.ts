import { Message, Conversation } from "./types";
import { UserStateManager } from "../userStateManager";
import { MatchStorageManager } from "../storage/matchStorageManager";

export class MessagingManager {
  private static readonly CONVERSATIONS_KEY = 'lockinonce_conversations';
  private static readonly MESSAGES_KEY = 'lockinonce_messages';

  static async getOrCreateConversation(matchId: string, participantId: string): Promise<Conversation> {
    const currentUserId = await UserStateManager.getCurrentUserId();
    const conversations = this.getConversations();
    
    const existing = conversations.find(c => 
      c.matchId === matchId && 
      c.participants.includes(currentUserId) && 
      c.participants.includes(participantId)
    );

    if (existing) {
      return existing;
    }

    const newConversation: Conversation = {
      id: `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      participants: [currentUserId, participantId],
      matchId,
      lastActivity: new Date().toISOString(),
      unreadCount: 0
    };

    conversations.push(newConversation);
    localStorage.setItem(this.CONVERSATIONS_KEY, JSON.stringify(conversations));
    
    // Add some sample messages for mutual matches
    if (MatchStorageManager.isMutualMatch(matchId)) {
      this.createSampleMessages(newConversation.id, currentUserId, participantId);
    }
    
    return newConversation;
  }

  private static createSampleMessages(conversationId: string, currentUserId: string, participantId: string): void {
    const messages = this.getMessages();
    const now = new Date();
    
    const sampleMessages = [
      {
        senderId: participantId,
        content: "Hi! I'm so excited we matched! 😊 I loved reading about your passion for art in your profile.",
        timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString() // 2 hours ago
      },
      {
        senderId: currentUserId,
        content: "Thank you! I'm really excited too! Your travel photos are amazing - where was your favorite destination?",
        timestamp: new Date(now.getTime() - 90 * 60 * 1000).toISOString() // 1.5 hours ago
      },
      {
        senderId: participantId,
        content: "Oh thank you! I think Japan was incredible - the culture, food, and people were so inspiring. Have you traveled much?",
        timestamp: new Date(now.getTime() - 75 * 60 * 1000).toISOString() // 1.25 hours ago
      },
      {
        senderId: currentUserId,
        content: "Japan is on my bucket list! I've mainly explored Europe so far. Would love to hear more about your adventures over coffee sometime ☕",
        timestamp: new Date(now.getTime() - 45 * 60 * 1000).toISOString() // 45 minutes ago
      },
      {
        senderId: participantId,
        content: "I'd absolutely love that! Coffee sounds perfect. Are you free this weekend? ❤️",
        timestamp: new Date(now.getTime() - 15 * 60 * 1000).toISOString() // 15 minutes ago
      }
    ];

    sampleMessages.forEach((msg, index) => {
      const message: Message = {
        id: `msg_sample_${Date.now()}_${index}`,
        conversationId,
        senderId: msg.senderId,
        receiverId: msg.senderId === currentUserId ? participantId : currentUserId,
        content: msg.content,
        timestamp: msg.timestamp,
        read: index < 4 // Mark all but the last message as read
      };
      messages.push(message);
    });

    localStorage.setItem(this.MESSAGES_KEY, JSON.stringify(messages));
    
    // Update conversation with last message
    const conversations = this.getConversations();
    const convIndex = conversations.findIndex(c => c.id === conversationId);
    if (convIndex >= 0) {
      const lastMessage = sampleMessages[sampleMessages.length - 1];
      conversations[convIndex].lastMessage = {
        id: `msg_sample_${Date.now()}_${sampleMessages.length - 1}`,
        conversationId,
        senderId: lastMessage.senderId,
        receiverId: lastMessage.senderId === currentUserId ? participantId : currentUserId,
        content: lastMessage.content,
        timestamp: lastMessage.timestamp,
        read: false
      };
      conversations[convIndex].lastActivity = lastMessage.timestamp;
      conversations[convIndex].unreadCount = 1;
      localStorage.setItem(this.CONVERSATIONS_KEY, JSON.stringify(conversations));
    }
  }

  static getConversations(): Conversation[] {
    try {
      const stored = localStorage.getItem(this.CONVERSATIONS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to load conversations:', error);
      return [];
    }
  }

  static async getUserConversations(): Promise<Conversation[]> {
    const currentUserId = await UserStateManager.getCurrentUserId();
    const conversations = this.getConversations();
    
    return conversations
      .filter(c => c.participants.includes(currentUserId))
      .sort((a, b) => new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime());
  }

  static sendMessage(conversationId: string, receiverId: string, content: string): Message {
    const messages = this.getMessages();
    const conversations = this.getConversations();
    
    const message: Message = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      conversationId,
      senderId: UserStateManager.getCurrentUserId(),
      receiverId,
      content,
      timestamp: new Date().toISOString(),
      read: false
    };

    messages.push(message);
    localStorage.setItem(this.MESSAGES_KEY, JSON.stringify(messages));

    // Update conversation
    const convIndex = conversations.findIndex(c => c.id === conversationId);
    if (convIndex >= 0) {
      conversations[convIndex].lastMessage = message;
      conversations[convIndex].lastActivity = message.timestamp;
      localStorage.setItem(this.CONVERSATIONS_KEY, JSON.stringify(conversations));
    }

    console.log('Message sent:', message);
    return message;
  }

  static getMessages(): Message[] {
    try {
      const stored = localStorage.getItem(this.MESSAGES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to load messages:', error);
      return [];
    }
  }

  static getConversationMessages(conversationId: string): Message[] {
    return this.getMessages()
      .filter(m => m.conversationId === conversationId)
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  }

  static markMessagesAsRead(conversationId: string, userId: string): void {
    const messages = this.getMessages();
    const conversations = this.getConversations();
    
    // Mark messages as read
    let hasUpdates = false;
    messages.forEach(message => {
      if (message.conversationId === conversationId && 
          message.receiverId === userId && 
          !message.read) {
        message.read = true;
        hasUpdates = true;
      }
    });

    if (hasUpdates) {
      localStorage.setItem(this.MESSAGES_KEY, JSON.stringify(messages));
      
      // Reset unread count for conversation
      const convIndex = conversations.findIndex(c => c.id === conversationId);
      if (convIndex >= 0) {
        conversations[convIndex].unreadCount = 0;
        localStorage.setItem(this.CONVERSATIONS_KEY, JSON.stringify(conversations));
      }
    }
  }
}
