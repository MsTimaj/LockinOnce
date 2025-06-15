
import { ComprehensiveAssessmentResults, RelationshipReadinessScore } from "./assessmentScoring";
import { UserProfile } from "./types/userProfile";
import { LocalStorageManager } from "./storage/localStorageManager";
import { SupabaseSyncManager } from "./storage/supabaseSyncManager";
import { ProfileFactory } from "./profile/profileFactory";

export class UserStateManager {
  private static navigationInProgress = false;

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
    console.log(`Updated assessment result for ${assessmentType}:`, result);
    await this.saveUserProfile(profile);
  }

  static async updateOnboardingProgress(phase: number, step: number): Promise<void> {
    const profile = await this.getUserProfile() || ProfileFactory.createNewProfile();
    profile.currentStep = { phase, step };
    profile.lastUpdated = new Date().toISOString();
    console.log(`Updated onboarding progress: phase ${phase}, step ${step}`);
    await this.saveUserProfile(profile);
  }

  // CRITICAL FIX: Complete onboarding with readiness score atomically
  static async completeOnboardingWithReadinessScore(readinessScore: RelationshipReadinessScore): Promise<void> {
    if (this.navigationInProgress) {
      console.log('Navigation already in progress, skipping completion');
      return;
    }

    this.navigationInProgress = true;
    
    try {
      console.log('Starting atomic onboarding completion...');
      const profile = await this.getUserProfile() || ProfileFactory.createNewProfile();
      
      // Set both completion flag AND readiness score atomically
      profile.onboardingCompleted = true;
      profile.readinessScore = readinessScore;
      profile.lastUpdated = new Date().toISOString();
      
      console.log('Saving completed profile with readiness score:', { 
        completed: profile.onboardingCompleted, 
        hasScore: !!profile.readinessScore 
      });
      
      await this.saveUserProfile(profile);
      console.log('Onboarding completion saved successfully');
    } catch (error) {
      console.error('Failed to complete onboarding:', error);
      throw error;
    } finally {
      // Reset navigation lock after a delay
      setTimeout(() => {
        this.navigationInProgress = false;
      }, 1000);
    }
  }

  // Legacy method - now just delegates to the atomic version
  static async markOnboardingComplete(): Promise<void> {
    console.log('WARNING: markOnboardingComplete called without readiness score - this should not happen');
    const profile = await this.getUserProfile() || ProfileFactory.createNewProfile();
    profile.onboardingCompleted = true;
    profile.lastUpdated = new Date().toISOString();
    await this.saveUserProfile(profile);
  }

  static async saveReadinessScore(score: RelationshipReadinessScore): Promise<void> {
    const profile = await this.getUserProfile() || ProfileFactory.createNewProfile();
    profile.readinessScore = score;
    profile.lastUpdated = new Date().toISOString();
    console.log('Readiness score saved:', score);
    await this.saveUserProfile(profile);
  }

  static createNewProfile(): UserProfile {
    return ProfileFactory.createNewProfile();
  }

  static clearUserData(): void {
    LocalStorageManager.clearData();
    this.navigationInProgress = false;
    console.log('User data cleared - you can now test as a new user');
  }

  // Reset function for testing - clears all data and forces fresh start
  static resetForTesting(): void {
    LocalStorageManager.clearData();
    this.navigationInProgress = false;
    console.log('Application reset for testing - refresh the page to start fresh');
  }

  // CRITICAL FIX: Unified completion check
  static async hasCompletedOnboarding(): Promise<boolean> {
    try {
      const profile = await this.getUserProfile();
      const hasCompleted = profile?.onboardingCompleted || false;
      const hasReadinessScore = !!profile?.readinessScore;
      
      console.log('Onboarding completion check:', { 
        hasCompleted, 
        hasReadinessScore, 
        overall: hasCompleted && hasReadinessScore 
      });
      
      // BOTH conditions must be true
      return hasCompleted && hasReadinessScore;
    } catch (error) {
      console.error('Error checking onboarding completion:', error);
      return false;
    }
  }

  static async getOnboardingProgress(): Promise<{ phase: number; step: number }> {
    const profile = await this.getUserProfile();
    return profile?.currentStep || { phase: 1, step: 1 };
  }

  static async isAssessmentComplete(): Promise<boolean> {
    try {
      const profile = await this.getUserProfile();
      if (!profile) {
        console.log('No profile found for assessment completion check');
        return false;
      }
      
      const results = profile.assessmentResults;
      const isComplete = !!(
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
      
      console.log('Assessment completion check:', { isComplete, profileId: profile.id });
      return isComplete;
    } catch (error) {
      console.error('Error checking assessment completion:', error);
      return false;
    }
  }

  // Guard against multiple simultaneous navigation attempts
  static isNavigationInProgress(): boolean {
    return this.navigationInProgress;
  }
}

// Re-export types for backwards compatibility
export type { UserProfile };
