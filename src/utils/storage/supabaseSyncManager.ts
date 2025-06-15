
import { supabase } from "@/integrations/supabase/client";
import { UserProfile } from "../types/userProfile";
import { LocalStorageManager } from "./localStorageManager";

export class SupabaseSyncManager {
  static async syncToSupabase(profile: UserProfile): Promise<void> {
    try {
      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          id: profile.id,
          assessment_results: profile.assessmentResults as any,
          readiness_score: profile.readinessScore as any,
          onboarding_completed: profile.onboardingCompleted,
          current_step: profile.currentStep as any,
          last_updated: profile.lastUpdated
        });

      if (error) throw error;
      console.log('Profile synced to Supabase');
    } catch (error) {
      console.error('Failed to sync to Supabase:', error);
      // Don't block the user flow - localStorage still works
    }
  }

  static async backgroundSyncCheck(profileId: string): Promise<void> {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', profileId)
        .order('last_updated', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error || !data) return;

      const localProfile = LocalStorageManager.getProfile();
      if (!localProfile) return;

      const supabaseLastUpdated = new Date(data.last_updated || data.created_at || '');
      const localLastUpdated = new Date(localProfile.lastUpdated);

      // If Supabase has newer data, update localStorage
      if (supabaseLastUpdated > localLastUpdated) {
        const updatedProfile = this.convertFromSupabase(data);
        LocalStorageManager.saveProfile(updatedProfile);
        console.log('Updated localStorage from Supabase');
      }
    } catch (error) {
      console.error('Background sync check failed:', error);
    }
  }

  static async restoreFromSupabase(): Promise<UserProfile | null> {
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
      LocalStorageManager.saveProfile(profile);
      console.log('Profile restored from Supabase');
      return profile;
    } catch (error) {
      console.error('Failed to restore from Supabase:', error);
      return null;
    }
  }

  private static convertFromSupabase(data: any): UserProfile {
    return {
      id: data.id,
      createdAt: data.created_at,
      lastUpdated: data.last_updated || data.created_at,
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
      current_step: data.current_step || { phase: 1, step: 1 }
    };
  }
}
