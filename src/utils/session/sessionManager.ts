
export class SessionManager {
  private static readonly SESSION_KEY = 'lockinonce_session_id';
  private static readonly SESSION_EXPIRY_KEY = 'lockinonce_session_expiry';
  private static readonly SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

  static getSessionId(): string {
    const existing = localStorage.getItem(this.SESSION_KEY);
    const expiry = localStorage.getItem(this.SESSION_EXPIRY_KEY);
    
    // Check if session exists and is not expired
    if (existing && expiry) {
      const expiryTime = new Date(expiry);
      if (new Date() < expiryTime) {
        console.log('Using existing session:', existing);
        return existing;
      }
    }

    // Generate new session
    const newSessionId = this.generateSessionId();
    const newExpiry = new Date(Date.now() + this.SESSION_DURATION);
    
    localStorage.setItem(this.SESSION_KEY, newSessionId);
    localStorage.setItem(this.SESSION_EXPIRY_KEY, newExpiry.toISOString());
    
    console.log('Generated new session:', newSessionId);
    return newSessionId;
  }

  private static generateSessionId(): string {
    return 'sess_' + Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15) + 
           '_' + Date.now().toString(36);
  }

  static clearSession(): void {
    localStorage.removeItem(this.SESSION_KEY);
    localStorage.removeItem(this.SESSION_EXPIRY_KEY);
    console.log('Session cleared');
  }

  static extendSession(): void {
    const sessionId = localStorage.getItem(this.SESSION_KEY);
    if (sessionId) {
      const newExpiry = new Date(Date.now() + this.SESSION_DURATION);
      localStorage.setItem(this.SESSION_EXPIRY_KEY, newExpiry.toISOString());
      console.log('Session extended for:', sessionId);
    }
  }
}
