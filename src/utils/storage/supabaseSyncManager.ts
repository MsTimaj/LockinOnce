
import { supabase } from "@/integrations/supabase/client";
import { UserProfile } from "../types/userProfile";
import { LocalStorageManager } from "./localStorageManager";

export class SupabaseSyncManager {
  static async syncToSupabase(profile: UserProfile): Promise<UserProfile> {
    try {
      // If profile has no ID or invalid ID, let Supabase generate one
      const shouldInsert = !profile.id || !this.isValidUUID(profile.id);
      
      if (shouldInsert) {
        console.log('Creating new profile in Supabase with auto-generated UUID');
        const { data, error } = await supabase
          .from('user_profiles')
          .insert({
            assessment_results: profile.assessmentResults as any,
            readiness_score: profile.readinessScore as any,
            onboarding_completed: profile.onboardingCompleted,
            current_step: profile.currentStep as any,
            last_updated: profile.lastUpdated
          })
          .select()
          .single();

        if (error) {
          console.error('Supabase insert error:', error);
          throw error;
        }

        // Update profile with the new UUID from Supabase
        const updatedProfile = this.convertFromSupabase(data);
        console.log('Profile created in Supabase with ID:', updatedProfile.id);
        return updatedProfile;
      } else {
        // Update existing profile
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
          console.error('Supabase update error:', error);
          throw error;
        }
        console.log('Profile updated in Supabase successfully');
        return profile;
      }
    } catch (error) {
      console.error('Failed to sync to Supabase:', error);
      throw error;
    }
  }

  static async backgroundSyncCheck(profileId: string): Promise<void> {
    try {
      // Skip sync check for invalid UUIDs
      if (!this.isValidUUID(profileId)) {
        console.log('Skipping background sync check for invalid UUID:', profileId);
        return;
      }

      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', profileId)
        .order('last_updated', { ascending: false })
        .limit(1)
        .maybeSingle();

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

      if (supabaseLastUpdated > localLastUpdated) {
        const updatedProfile = this.convertFromSupabase(data);
        LocalStorageManager.saveProfile(updatedProfile);
        console.log('Updated localStorage from Supabase');
      } else {
        console.log('Local profile is up to date');
      }
    } catch (error) {
      console.log('Background sync check skipped due to error:', error);
    }
  }

  static async restoreFromSupabase(): Promise<UserProfile | null> {
    try {
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

  private static isValidUUID(str: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(str);
  }
}
