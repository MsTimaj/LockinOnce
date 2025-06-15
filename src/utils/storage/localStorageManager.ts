
import { UserProfile } from "../types/userProfile";

export class LocalStorageManager {
  private static readonly STORAGE_KEY = 'lockinonce_user_profile';
  private static readonly TEMP_RESULTS_KEY = 'lockinonce_temp_results';
  private static readonly BACKUP_KEY = 'lockinonce_user_profile_backup';

  static saveProfile(profile: UserProfile): void {
    try {
      // Create backup of current profile before overwriting
      const current = this.getProfile();
      if (current) {
        localStorage.setItem(this.BACKUP_KEY, JSON.stringify(current));
      }

      // Save new profile
      const profileString = JSON.stringify(profile);
      localStorage.setItem(this.STORAGE_KEY, profileString);
      console.log('Profile saved to localStorage with backup');
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
      
      // Try to recover from backup if save failed
      try {
        const backup = localStorage.getItem(this.BACKUP_KEY);
        if (backup) {
          localStorage.setItem(this.STORAGE_KEY, backup);
          console.log('Restored from backup after save failure');
        }
      } catch (backupError) {
        console.error('Backup recovery also failed:', backupError);
      }
      
      throw error;
    }
  }

  static getProfile(): UserProfile | null {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) return null;

      const profile = JSON.parse(stored);
      
      // Validate the parsed profile has required fields
      if (!profile.id || !profile.createdAt || !profile.lastUpdated) {
        console.warn('Invalid profile structure found, clearing...');
        this.clearData();
        return null;
      }

      return profile;
    } catch (error) {
      console.error('Failed to load from localStorage:', error);
      
      // Try to recover from backup
      try {
        const backup = localStorage.getItem(this.BACKUP_KEY);
        if (backup) {
          const backupProfile = JSON.parse(backup);
          console.log('Recovered profile from backup');
          localStorage.setItem(this.STORAGE_KEY, backup);
          return backupProfile;
        }
      } catch (backupError) {
        console.error('Backup recovery failed:', backupError);
      }
      
      // Clear corrupted data
      this.clearData();
      return null;
    }
  }

  static clearData(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      localStorage.removeItem(this.TEMP_RESULTS_KEY);
      localStorage.removeItem(this.BACKUP_KEY);
      console.log('All user data cleared from localStorage');
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
    }
  }

  static hasValidData(): boolean {
    const profile = this.getProfile();
    return profile !== null;
  }
}
