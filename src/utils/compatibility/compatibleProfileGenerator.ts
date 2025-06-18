
import { ComprehensiveAssessmentResults } from "../assessmentScoring";

export const generateCompatibleAssessmentResults = (
  userProfile: ComprehensiveAssessmentResults, 
  index: number
): ComprehensiveAssessmentResults => {
  const userAttachmentStyle = userProfile?.attachmentStyle?.dominantStyle || 'secure';
  const userIntroversion = userProfile?.personality?.introversion || 50;
  const userExtroversion = userProfile?.personality?.extroversion || 50;
  const userThinking = userProfile?.personality?.thinking || 60;
  const userFeeling = userProfile?.personality?.feeling || 60;
  const userBirthOrder = userProfile?.birthOrder?.birthOrder || 'oldest';

  const compatibleAttachment = userAttachmentStyle === 'anxious' ? 'secure' : 
                              userAttachmentStyle === 'avoidant' ? 'secure' :
                              userAttachmentStyle === 'disorganized' ? 'secure' :
                              'secure';

  return {
    attachmentStyle: {
      secure: 5,
      anxious: 0,
      avoidant: 0, 
      disorganized: 0,
      dominantStyle: 'secure' as const
    },
    personality: {
      introversion: userIntroversion > userExtroversion ? 40 : 80,
      extroversion: userExtroversion > userIntroversion ? 40 : 80,
      thinking: userThinking + (Math.random() * 20 - 10),
      feeling: userFeeling + (Math.random() * 20 - 10),
      dominantType: "Compatible Type"
    },
    birthOrder: {
      birthOrder: userBirthOrder === 'oldest' ? 'youngest' : 
                  userBirthOrder === 'youngest' ? 'oldest' : 
                  userBirthOrder === 'only' ? 'youngest' : 'oldest',
      familySize: "medium",
      parentalDynamics: "warm_supportive",
      siblingGap: "moderate_4_6_years"
    },
    relationshipIntent: {
      timeline: "1-2 years",
      commitment: "marriage",
      lifeGoals: "family_career",
      familyPlanning: "want_children",
      relocatation: "somewhat_flexible"
    },
    emotionalCapacity: {
      stressManagement: "healthy_coping",
      emotionalSupport: "natural_supporter",
      selfAwareness: "highly_aware",
      empathy: "highly_empathetic",
      resilience: "strong_resilience"
    },
    preferences: null, // Match profiles don't need to store preferences
    attractionLayer: null,
    physicalProximity: null,
    communicationStyle: null,
    lifeGoals: null,
    values: null,
    lifestyle: null,
    loveLanguages: null,
    financialValues: null
  };
};
