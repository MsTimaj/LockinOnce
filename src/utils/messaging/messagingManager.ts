
import { Message, Conversation } from "./types";
import { UserStateManager } from "../userStateManager";

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
    
    return newConversation;
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
