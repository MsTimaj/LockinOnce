
import { ComprehensiveAssessmentResults, RelationshipReadinessScore } from "./assessmentScoring";
import { supabase } from "@/integrations/supabase/client";

export interface UserProfile {
  id: string;
  createdAt: string;
  lastUpdated: string;
  basicInfo: {
    name?: string;
    age?: number;
    location?: string;
    bio?: string;
    photos?: string[];
  };
  assessmentResults: ComprehensiveAssessmentResults;
  readinessScore?: RelationshipReadinessScore;
  onboardingCompleted: boolean;
  currentStep: {
    phase: number;
    step: number;
  };
}

export class UserStateManager {
  private static readonly STORAGE_KEY = 'lockinonce_user_profile';
  private static readonly TEMP_RESULTS_KEY = 'lockinonce_temp_results';

  // Save to both localStorage and Supabase
  static async saveUserProfile(profile: UserProfile): Promise<void> {
    try {
      // Always save to localStorage first (immediate)
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(profile));
      console.log('User profile saved to localStorage');

      // Then sync to Supabase (background)
      await this.syncToSupabase(profile);
    } catch (error) {
      console.error('Failed to save user profile:', error);
    }
  }

  // Sync profile to Supabase
  private static async syncToSupabase(profile: UserProfile): Promise<void> {
    try {
      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          id: profile.id,
          created_at: profile.createdAt,
          last_updated: profile.lastUpdated,
          basic_info: profile.basicInfo,
          assessment_results: profile.assessmentResults,
          readiness_score: profile.readinessScore,
          onboarding_completed: profile.onboardingCompleted,
          current_step: profile.currentStep
        });

      if (error) throw error;
      console.log('Profile synced to Supabase');
    } catch (error) {
      console.error('Failed to sync to Supabase:', error);
      // Don't block the user flow - localStorage still works
    }
  }

  // Load from localStorage first, fallback to Supabase
  static async getUserProfile(): Promise<UserProfile | null> {
    try {
      // First try localStorage (fast)
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const profile = JSON.parse(stored);
        // Background sync check with Supabase
        this.backgroundSyncCheck(profile.id);
        return profile;
      }

      // If no localStorage, try to restore from Supabase
      return await this.restoreFromSupabase();
    } catch (error) {
      console.error('Failed to load user profile:', error);
      return null;
    }
  }

  // Background check if Supabase has newer data
  private static async backgroundSyncCheck(profileId: string): Promise<void> {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', profileId)
        .maybeSingle();

      if (error || !data) return;

      const localStored = localStorage.getItem(this.STORAGE_KEY);
      if (!localStored) return;

      const localProfile = JSON.parse(localStored);
      const supabaseLastUpdated = new Date(data.last_updated);
      const localLastUpdated = new Date(localProfile.lastUpdated);

      // If Supabase has newer data, update localStorage
      if (supabaseLastUpdated > localLastUpdated) {
        const updatedProfile = this.convertFromSupabase(data);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedProfile));
        console.log('Updated localStorage from Supabase');
      }
    } catch (error) {
      console.error('Background sync check failed:', error);
    }
  }

  // Restore profile from Supabase if localStorage is empty
  private static async restoreFromSupabase(): Promise<UserProfile | null> {
    try {
      // Get the most recent profile (in case user has multiple devices)
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .order('last_updated', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error || !data) return null;

      const profile = this.convertFromSupabase(data);
      // Save to localStorage for next time
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(profile));
      console.log('Profile restored from Supabase');
      return profile;
    } catch (error) {
      console.error('Failed to restore from Supabase:', error);
      return null;
    }
  }

  // Convert Supabase data format to UserProfile format
  private static convertFromSupabase(data: any): UserProfile {
    return {
      id: data.id,
      createdAt: data.created_at,
      lastUpdated: data.last_updated,
      basicInfo: data.basic_info || {},
      assessmentResults: data.assessment_results || {
        attachmentStyle: null,
        personality: null,
        birthOrder: null,
        relationshipIntent: null,
        emotionalCapacity: null,
        attractionLayer: null,
        physicalProximity: null,
        communicationStyle: null,
        lifeGoals: null,
        values: null,
        lifestyle: null,
        loveLanguages: null,
        financialValues: null,
      },
      readinessScore: data.readiness_score,
      onboardingCompleted: data.onboarding_completed || false,
      currentStep: data.current_step || { phase: 1, step: 1 }
    };
  }

  static async updateAssessmentResult<T extends keyof ComprehensiveAssessmentResults>(
    assessmentType: T, 
    result: ComprehensiveAssessmentResults[T]
  ): Promise<void> {
    const profile = await this.getUserProfile() || this.createNewProfile();
    profile.assessmentResults[assessmentType] = result;
    profile.lastUpdated = new Date().toISOString();
    await this.saveUserProfile(profile);
  }

  static async updateOnboardingProgress(phase: number, step: number): Promise<void> {
    const profile = await this.getUserProfile() || this.createNewProfile();
    profile.currentStep = { phase, step };
    profile.lastUpdated = new Date().toISOString();
    await this.saveUserProfile(profile);
  }

  static async markOnboardingComplete(): Promise<void> {
    const profile = await this.getUserProfile() || this.createNewProfile();
    profile.onboardingCompleted = true;
    profile.lastUpdated = new Date().toISOString();
    await this.saveUserProfile(profile);
  }

  static async saveReadinessScore(score: RelationshipReadinessScore): Promise<void> {
    const profile = await this.getUserProfile() || this.createNewProfile();
    profile.readinessScore = score;
    profile.lastUpdated = new Date().toISOString();
    await this.saveUserProfile(profile);
  }

  static createNewProfile(): UserProfile {
    return {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      basicInfo: {},
      assessmentResults: {
        attachmentStyle: null,
        personality: null,
        birthOrder: null,
        relationshipIntent: null,
        emotionalCapacity: null,
        attractionLayer: null,
        physicalProximity: null,
        communicationStyle: null,
        lifeGoals: null,
        values: null,
        lifestyle: null,
        loveLanguages: null,
        financialValues: null,
      },
      onboardingCompleted: false,
      currentStep: { phase: 1, step: 1 }
    };
  }

  static clearUserData(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    localStorage.removeItem(this.TEMP_RESULTS_KEY);
    console.log('User data cleared');
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
