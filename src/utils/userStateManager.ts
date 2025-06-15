import { ComprehensiveAssessmentResults, RelationshipReadinessScore } from "./assessmentScoring";
import { UserProfile } from "./types/userProfile";
import { LocalStorageManager } from "./storage/localStorageManager";
import { SupabaseSyncManager } from "./storage/supabaseSyncManager";
import { ProfileFactory } from "./profile/profileFactory";

export class UserStateManager {
  // Save to both localStorage and Supabase
  static async saveUserProfile(profile: UserProfile): Promise<void> {
    try {
      // Always save to localStorage first (immediate)
      LocalStorageManager.saveProfile(profile);
      console.log('Profile saved to localStorage');

      // Then sync to Supabase (background) - don't await to avoid blocking UI
      SupabaseSyncManager.syncToSupabase(profile).catch(error => {
        console.log('Background sync to Supabase failed, but localStorage saved:', error);
      });
    } catch (error) {
      console.error('Failed to save user profile to localStorage:', error);
    }
  }

  // Load from localStorage first, fallback to Supabase
  static async getUserProfile(): Promise<UserProfile | null> {
    try {
      // First try localStorage (fast)
      const stored = LocalStorageManager.getProfile();
      if (stored) {
        console.log('Profile loaded from localStorage');
        // Background sync check with Supabase (don't await)
        SupabaseSyncManager.backgroundSyncCheck(stored.id).catch(error => {
          console.log('Background sync check failed:', error);
        });
        return stored;
      }

      // If no localStorage, try to restore from Supabase
      console.log('No local profile found, attempting to restore from Supabase');
      const restored = await SupabaseSyncManager.restoreFromSupabase();
      if (restored) {
        console.log('Profile restored from Supabase');
        return restored;
      }

      console.log('No profile found anywhere, user will need to start fresh');
      return null;
    } catch (error) {
      console.error('Failed to load user profile:', error);
      return null;
    }
  }

  static async updateAssessmentResult<T extends keyof ComprehensiveAssessmentResults>(
    assessmentType: T, 
    result: ComprehensiveAssessmentResults[T]
  ): Promise<void> {
    const profile = await this.getUserProfile() || ProfileFactory.createNewProfile();
    profile.assessmentResults[assessmentType] = result;
    profile.lastUpdated = new Date().toISOString();
    await this.saveUserProfile(profile);
  }

  static async updateOnboardingProgress(phase: number, step: number): Promise<void> {
    const profile = await this.getUserProfile() || ProfileFactory.createNewProfile();
    profile.currentStep = { phase, step };
    profile.lastUpdated = new Date().toISOString();
    await this.saveUserProfile(profile);
  }

  static async markOnboardingComplete(): Promise<void> {
    const profile = await this.getUserProfile() || ProfileFactory.createNewProfile();
    profile.onboardingCompleted = true;
    profile.lastUpdated = new Date().toISOString();
    await this.saveUserProfile(profile);
  }

  static async saveReadinessScore(score: RelationshipReadinessScore): Promise<void> {
    const profile = await this.getUserProfile() || ProfileFactory.createNewProfile();
    profile.readinessScore = score;
    profile.lastUpdated = new Date().toISOString();
    await this.saveUserProfile(profile);
  }

  static createNewProfile(): UserProfile {
    return ProfileFactory.createNewProfile();
  }

  static clearUserData(): void {
    LocalStorageManager.clearData();
    console.log('User data cleared - you can now test as a new user');
  }

  // Reset function for testing - clears all data and forces fresh start
  static resetForTesting(): void {
    LocalStorageManager.clearData();
    console.log('Application reset for testing - refresh the page to start fresh');
  }

  static async hasCompletedOnboarding(): Promise<boolean> {
    const profile = await this.getUserProfile();
    return profile?.onboardingCompleted || false;
  }

  static async getOnboardingProgress(): Promise<{ phase: number; step: number }> {
    const profile = await this.getUserProfile();
    return profile?.currentStep || { phase: 1, step: 1 };
  }

  static async isAssessmentComplete(): Promise<boolean> {
    const profile = await this.getUserProfile();
    if (!profile) return false;
    
    const results = profile.assessmentResults;
    return !!(
      results.attachmentStyle &&
      results.personality &&
      results.birthOrder &&
      results.relationshipIntent &&
      results.emotionalCapacity &&
      results.attractionLayer &&
      results.physicalProximity &&
      results.communicationStyle &&
      results.lifeGoals &&
      results.values &&
      results.lifestyle &&
      results.loveLanguages &&
      results.financialValues
    );
  }
}

// Re-export types for backwards compatibility
export type { UserProfile };
