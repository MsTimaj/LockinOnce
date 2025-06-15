
import { UserProfile } from "../types/userProfile";

export class ProfileFactory {
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
}
