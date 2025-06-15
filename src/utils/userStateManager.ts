
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

      // Then sync to Supabase (background)
      await SupabaseSyncManager.syncToSupabase(profile);
    } catch (error) {
      console.error('Failed to save user profile:', error);
    }
  }

  // Load from localStorage first, fallback to Supabase
  static async getUserProfile(): Promise<UserProfile | null> {
    try {
      // First try localStorage (fast)
      const stored = LocalStorageManager.getProfile();
      if (stored) {
        // Background sync check with Supabase
        SupabaseSyncManager.backgroundSyncCheck(stored.id);
        return stored;
      }

      // If no localStorage, try to restore from Supabase
      return await SupabaseSyncManager.restoreFromSupabase();
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
