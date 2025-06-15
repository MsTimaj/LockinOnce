
import { UserProfile } from "../types/userProfile";
import { SessionManager } from "../session/sessionManager";

export class SessionStorageManager {
  private static readonly PROFILE_PREFIX = 'lockinonce_profile_';
  private static readonly TEMP_RESULTS_PREFIX = 'lockinonce_temp_';

  static saveProfile(profile: UserProfile): void {
    try {
      const sessionId = SessionManager.getSessionId();
      const key = this.PROFILE_PREFIX + sessionId;
      
      // Extend session on activity
      SessionManager.extendSession();
      
      const profileString = JSON.stringify(profile);
      localStorage.setItem(key, profileString);
      console.log('Profile saved for session:', sessionId);
    } catch (error) {
      console.error('Failed to save profile for session:', error);
      throw error;
    }
  }

  static getProfile(): UserProfile | null {
    try {
      const sessionId = SessionManager.getSessionId();
      const key = this.PROFILE_PREFIX + sessionId;
      
      const stored = localStorage.getItem(key);
      if (!stored) {
        console.log('No profile found for session:', sessionId);
        return null;
      }

      const profile = JSON.parse(stored);
      
      // Validate the parsed profile has required fields
      if (!profile.id || !profile.createdAt || !profile.lastUpdated) {
        console.warn('Invalid profile structure found for session, clearing...');
        this.clearData();
        return null;
      }

      // Extend session on access
      SessionManager.extendSession();
      
      console.log('Profile loaded for session:', sessionId);
      return profile;
    } catch (error) {
      console.error('Failed to load profile for session:', error);
      this.clearData();
      return null;
    }
  }

  static clearData(): void {
    try {
      const sessionId = SessionManager.getSessionId();
      const profileKey = this.PROFILE_PREFIX + sessionId;
      const tempKey = this.TEMP_RESULTS_PREFIX + sessionId;
      
      localStorage.removeItem(profileKey);
      localStorage.removeItem(tempKey);
      console.log('Session data cleared for:', sessionId);
    } catch (error) {
      console.error('Failed to clear session data:', error);
    }
  }

  static hasValidData(): boolean {
    const profile = this.getProfile();
    return profile !== null;
  }

  static getCurrentSessionId(): string {
    return SessionManager.getSessionId();
  }
}
