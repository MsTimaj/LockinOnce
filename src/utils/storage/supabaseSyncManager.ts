
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

      if (error) {
        console.error('Supabase sync error:', error);
        throw error;
      }
      console.log('Profile synced to Supabase successfully');
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

      // Handle case where profile doesn't exist yet (normal for new users)
      if (error) {
        console.log('Background sync check - profile not found in Supabase yet:', profileId);
        return;
      }

      if (!data) {
        console.log('Background sync check - no data found for profile:', profileId);
        return;
      }

      const localProfile = LocalStorageManager.getProfile();
      if (!localProfile) {
        console.log('Background sync check - no local profile found');
        return;
      }

      const supabaseLastUpdated = new Date(data.last_updated || data.created_at || '');
      const localLastUpdated = new Date(localProfile.lastUpdated);

      // If Supabase has newer data, update localStorage
      if (supabaseLastUpdated > localLastUpdated) {
        const updatedProfile = this.convertFromSupabase(data);
        LocalStorageManager.saveProfile(updatedProfile);
        console.log('Updated localStorage from Supabase');
      } else {
        console.log('Local profile is up to date');
      }
    } catch (error) {
      console.log('Background sync check skipped due to error:', error);
      // Silently fail - this is a background operation
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

      if (error) {
        console.log('No profile found in Supabase to restore:', error);
        return null;
      }

      if (!data) {
        console.log('No profile data found in Supabase');
        return null;
      }

      const profile = this.convertFromSupabase(data);
      // Save to localStorage for next time
      LocalStorageManager.saveProfile(profile);
      console.log('Profile restored from Supabase');
      return profile;
    } catch (error) {
      console.log('Failed to restore from Supabase, starting fresh:', error);
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
      currentStep: data.current_step || { phase: 1, step: 1 }
    };
  }
}
