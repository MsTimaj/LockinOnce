
import { ComprehensiveAssessmentResults } from "../assessmentScoring";
import { UserProfile } from "../types/userProfile";

export class AssessmentProgressManager {
  static async updateOnboardingProgress(
    profile: UserProfile,
    phase: number,
    step: number
  ): Promise<UserProfile> {
    profile.currentStep = { phase, step };
    profile.lastUpdated = new Date().toISOString();
    console.log(`Updated onboarding progress: phase ${phase}, step ${step}`);
    return profile;
  }

  static async updateAssessmentResult<T extends keyof ComprehensiveAssessmentResults>(
    profile: UserProfile,
    assessmentType: T,
    result: ComprehensiveAssessmentResults[T]
  ): Promise<UserProfile> {
    profile.assessmentResults[assessmentType] = result;
    profile.lastUpdated = new Date().toISOString();
    console.log(`Updated assessment result for ${assessmentType}`);
    return profile;
  }

  static isAssessmentComplete(profile: UserProfile): boolean {
    if (!profile?.assessmentResults) {
      console.log('No assessment results found');
      return false;
    }
    
    // Count valid assessment results
    const results = profile.assessmentResults;
    const validAssessments = Object.values(results).filter(result => 
      result && typeof result === 'object'
    ).length;
    
    const isComplete = validAssessments >= 8; // Lowered threshold for more realistic completion
    
    console.log('Assessment completion check:', { 
      validAssessments,
      isComplete,
      threshold: 8
    });
    
    return isComplete;
  }

  static getOnboardingProgress(profile: UserProfile | null): { phase: number; step: number } {
    return profile?.currentStep || { phase: 1, step: 1 };
  }
}
