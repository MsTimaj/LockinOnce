import { ComprehensiveAssessmentResults, RelationshipReadinessScore } from "./assessmentScoring";
import { UserProfile } from "./types/userProfile";
import { SessionStorageManager } from "./storage/sessionStorageManager";
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
        // Always save to session storage first for immediate persistence
        SessionStorageManager.saveProfile(profile);
        console.log('Profile saved to session storage immediately');

        // Then attempt Supabase sync in background with session-aware ID
        try {
          const sessionId = SessionStorageManager.getCurrentSessionId();
          const sessionAwareProfile = {
            ...profile,
            id: profile.id.startsWith('sess_') ? profile.id : `${sessionId}_${profile.id}`
          };
          
          const updatedProfile = await SupabaseSyncManager.syncToSupabase(sessionAwareProfile);
          // Only update session storage if we got a different profile back
          if (updatedProfile.id !== sessionAwareProfile.id) {
            SessionStorageManager.saveProfile(updatedProfile);
            console.log('Profile updated with new UUID from Supabase:', updatedProfile.id);
          }
        } catch (supabaseError) {
          console.log('Supabase sync failed, but session storage save succeeded:', supabaseError);
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
      const stored = SessionStorageManager.getProfile();
      
      // If we have a valid stored profile, use it immediately
      if (stored && ValidationUtils.isValidProfile(stored)) {
        console.log('Profile loaded from session storage');
        
        // Background sync check (don't await) - only for valid UUIDs
        if (ValidationUtils.isValidUUID(stored.id) && !stored.id.startsWith('sess_')) {
          SupabaseSyncManager.backgroundSyncCheck(stored.id).catch(error => {
            console.log('Background sync check failed (non-critical):', error);
          });
        }
        return stored;
      }

      // Clear invalid data
      if (stored && !ValidationUtils.isValidProfile(stored)) {
        console.log('Clearing invalid profile data');
        SessionStorageManager.clearData();
      }

      // For MVP, prioritize session storage over Supabase restore
      console.log('No valid session profile found');
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
    const sessionId = SessionStorageManager.getCurrentSessionId();
    const profile = ProfileFactory.createNewProfile();
    // Create session-aware profile ID
    profile.id = `${sessionId}_${profile.id}`;
    return profile;
  }

  static clearUserData(): void {
    SessionStorageManager.clearData();
    NavigationStateManager.forceReset();
    SyncStateManager.forceReset();
    console.log('User session data cleared completely');
  }

  static resetForTesting(): void {
    this.clearUserData();
    console.log('Session reset for testing - refresh to start fresh');
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

  static getCurrentSessionInfo(): { sessionId: string; hasProfile: boolean } {
    const sessionId = SessionStorageManager.getCurrentSessionId();
    const hasProfile = SessionStorageManager.hasValidData();
    return { sessionId, hasProfile };
  }
}

export type { UserProfile };
