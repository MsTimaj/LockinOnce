
import { UserProfile } from "../types/userProfile";

export class LocalStorageManager {
  private static readonly STORAGE_KEY = 'lockinonce_user_profile';
  private static readonly TEMP_RESULTS_KEY = 'lockinonce_temp_results';

  static saveProfile(profile: UserProfile): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(profile));
      console.log('User profile saved to localStorage');
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  }

  static getProfile(): UserProfile | null {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Failed to load from localStorage:', error);
      return null;
    }
  }

  static clearData(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    localStorage.removeItem(this.TEMP_RESULTS_KEY);
    console.log('User data cleared');
  }
}
