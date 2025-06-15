
import { ComprehensiveAssessmentResults, RelationshipReadinessScore } from "./assessmentScoring";
import { UserProfile } from "./types/userProfile";
import { LocalStorageManager } from "./storage/localStorageManager";
import { SupabaseSyncManager } from "./storage/supabaseSyncManager";
import { ProfileFactory } from "./profile/profileFactory";
import { ValidationUtils } from "./state/validationUtils";
import { NavigationStateManager } from "./state/navigationStateManager";
import { AssessmentProgressManager } from "./state/assessmentProgressManager";
import { SyncStateManager } from "./state/syncStateManager";

export class UserStateManager {
  static async saveUserProfile(profile: UserProfile): Promise<void> {
    try {
      await SyncStateManager.withSyncLock(async () => {
        // Always save to localStorage first for immediate persistence
        LocalStorageManager.saveProfile(profile);
        console.log('Profile saved to localStorage immediately');

        // Then attempt Supabase sync in background
        try {
          const updatedProfile = await SupabaseSyncManager.syncToSupabase(profile);
          // Only update localStorage if we got a different profile back (with new UUID)
          if (updatedProfile.id !== profile.id) {
            LocalStorageManager.saveProfile(updatedProfile);
            console.log('Profile updated with new UUID from Supabase:', updatedProfile.id);
          }
        } catch (supabaseError) {
          console.log('Supabase sync failed, but localStorage save succeeded:', supabaseError);
          // Continue - we still have the data saved locally
        }
      });
    } catch (error) {
      console.error('Failed to save user profile:', error);
      throw error;
    }
  }

  static async getUserProfile(): Promise<UserProfile | null> {
    try {
      const stored = LocalStorageManager.getProfile();
      
      // If we have a valid stored profile, use it immediately
      if (stored && ValidationUtils.isValidProfile(stored)) {
        console.log('Profile loaded from localStorage');
        
        // Background sync check (don't await)
        if (ValidationUtils.isValidUUID(stored.id)) {
          SupabaseSyncManager.backgroundSyncCheck(stored.id).catch(error => {
            console.log('Background sync check failed (non-critical):', error);
          });
        }
        return stored;
      }

      // Clear invalid data
      if (stored && !ValidationUtils.isValidProfile(stored)) {
        console.log('Clearing invalid profile data');
        LocalStorageManager.clearData();
      }

      // Try to restore from Supabase only if no local data
      console.log('No valid local profile, attempting Supabase restore...');
      const restored = await SupabaseSyncManager.restoreFromSupabase();
      if (restored) {
        console.log('Profile restored from Supabase');
        return restored;
      }

      console.log('No profile found, user needs to start onboarding');
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
    const updatedProfile = await AssessmentProgressManager.updateAssessmentResult(profile, assessmentType, result);
    await this.saveUserProfile(updatedProfile);
  }

  static async updateOnboardingProgress(phase: number, step: number): Promise<void> {
    const profile = await this.getUserProfile() || ProfileFactory.createNewProfile();
    const updatedProfile = await AssessmentProgressManager.updateOnboardingProgress(profile, phase, step);
    await this.saveUserProfile(updatedProfile);
  }

  static async completeOnboardingWithReadinessScore(readinessScore: RelationshipReadinessScore): Promise<void> {
    await NavigationStateManager.withNavigationLock(async () => {
      console.log('Completing onboarding with readiness score...');
      const profile = await this.getUserProfile() || ProfileFactory.createNewProfile();
      
      profile.onboardingCompleted = true;
      profile.readinessScore = readinessScore;
      profile.lastUpdated = new Date().toISOString();
      
      await this.saveUserProfile(profile);
      console.log('Onboarding completion saved successfully');
    });
  }

  static async saveReadinessScore(score: RelationshipReadinessScore): Promise<void> {
    const profile = await this.getUserProfile() || ProfileFactory.createNewProfile();
    profile.readinessScore = score;
    profile.lastUpdated = new Date().toISOString();
    console.log('Readiness score saved');
    await this.saveUserProfile(profile);
  }

  static createNewProfile(): UserProfile {
    return ProfileFactory.createNewProfile();
  }

  static clearUserData(): void {
    LocalStorageManager.clearData();
    NavigationStateManager.forceReset();
    SyncStateManager.forceReset();
    console.log('User data cleared completely');
  }

  static resetForTesting(): void {
    this.clearUserData();
    console.log('Application reset for testing - refresh to start fresh');
  }

  static async hasCompletedOnboarding(): Promise<boolean> {
    try {
      const profile = await this.getUserProfile();
      if (!profile) return false;
      
      const hasCompleted = profile.onboardingCompleted || false;
      const hasReadinessScore = !!profile.readinessScore;
      const result = hasCompleted && hasReadinessScore;
      
      console.log('Onboarding completion check:', { 
        hasCompleted, 
        hasReadinessScore, 
        result 
      });
      
      return result;
    } catch (error) {
      console.error('Error checking onboarding completion:', error);
      return false;
    }
  }

  static async getOnboardingProgress(): Promise<{ phase: number; step: number }> {
    const profile = await this.getUserProfile();
    return AssessmentProgressManager.getOnboardingProgress(profile);
  }

  static async isAssessmentComplete(): Promise<boolean> {
    try {
      const profile = await this.getUserProfile();
      if (!profile) return false;
      
      return AssessmentProgressManager.isAssessmentComplete(profile);
    } catch (error) {
      console.error('Error checking assessment completion:', error);
      return false;
    }
  }

  static isNavigationInProgress(): boolean {
    return NavigationStateManager.isNavigationInProgress();
  }

  static forceNavigationReset(): void {
    NavigationStateManager.forceReset();
    SyncStateManager.forceReset();
  }
}

export type { UserProfile };
