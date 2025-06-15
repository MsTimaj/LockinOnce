
import { ComprehensiveAssessmentResults, RelationshipReadinessScore } from "./assessmentScoring";

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

  static saveUserProfile(profile: UserProfile): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(profile));
      console.log('User profile saved to localStorage');
    } catch (error) {
      console.error('Failed to save user profile:', error);
    }
  }

  static getUserProfile(): UserProfile | null {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load user profile:', error);
    }
    return null;
  }

  static updateAssessmentResult<T extends keyof ComprehensiveAssessmentResults>(
    assessmentType: T, 
    result: ComprehensiveAssessmentResults[T]
  ): void {
    const profile = this.getUserProfile() || this.createNewProfile();
    profile.assessmentResults[assessmentType] = result;
    profile.lastUpdated = new Date().toISOString();
    this.saveUserProfile(profile);
  }

  static updateOnboardingProgress(phase: number, step: number): void {
    const profile = this.getUserProfile() || this.createNewProfile();
    profile.currentStep = { phase, step };
    profile.lastUpdated = new Date().toISOString();
    this.saveUserProfile(profile);
  }

  static markOnboardingComplete(): void {
    const profile = this.getUserProfile() || this.createNewProfile();
    profile.onboardingCompleted = true;
    profile.lastUpdated = new Date().toISOString();
    this.saveUserProfile(profile);
  }

  static saveReadinessScore(score: RelationshipReadinessScore): void {
    const profile = this.getUserProfile() || this.createNewProfile();
    profile.readinessScore = score;
    profile.lastUpdated = new Date().toISOString();
    this.saveUserProfile(profile);
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

  static hasCompletedOnboarding(): boolean {
    const profile = this.getUserProfile();
    return profile?.onboardingCompleted || false;
  }

  static getOnboardingProgress(): { phase: number; step: number } {
    const profile = this.getUserProfile();
    return profile?.currentStep || { phase: 1, step: 1 };
  }

  static isAssessmentComplete(): boolean {
    const profile = this.getUserProfile();
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
