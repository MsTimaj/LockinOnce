
export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: string[];
  matchId: string;
  lastMessage?: Message;
  lastActivity: string;
  unreadCount: number;
}
