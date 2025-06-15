
import { ComprehensiveAssessmentResults } from "../assessmentScoring";
import { MatchProfile } from "./types";
import { calculateDetailedCompatibility } from "./detailedCompatibility";

export const generateCompatibleMatches = (userProfile: ComprehensiveAssessmentResults): MatchProfile[] => {
  const baseProfiles = [
    {
      id: "match_1",
      name: "Emma",
      age: 28,
      location: "2 miles away",
      bio: "Art curator who believes in deep connections and meaningful conversations. Looking for someone to explore galleries and life with.",
      photo: "https://images.unsplash.com/photo-1494790108755-2616b612b8c3?w=400&h=400&fit=crop&crop=face"
    },
    {
      id: "match_2", 
      name: "Sophia",
      age: 26,
      location: "5 miles away",
      bio: "Therapist passionate about personal growth and authentic relationships. Loves hiking, reading, and cozy coffee dates.",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face"
    },
    {
      id: "match_3",
      name: "Olivia", 
      age: 30,
      location: "3 miles away",
      bio: "Software engineer with a love for travel and learning new cultures. Seeking a partner for life's adventures.",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face"
    }
  ];

  return baseProfiles.map(profile => {
    const compatibleResults = generateCompatibleAssessmentResults(userProfile);
    const compatibilityScore = calculateDetailedCompatibility(userProfile, compatibleResults);
    
    return {
      ...profile,
      assessmentResults: compatibleResults,
      compatibilityScore,
      connectionStatus: 'none' as const,
      lastActive: "2 hours ago"
    };
  });
};

const generateCompatibleAssessmentResults = (userProfile: ComprehensiveAssessmentResults): ComprehensiveAssessmentResults => {
  const userAttachmentStyle = userProfile?.attachmentStyle?.dominantStyle || 'secure';
  const userIntroversion = userProfile?.personality?.introversion || 50;
  const userExtroversion = userProfile?.personality?.extroversion || 50;
  const userThinking = userProfile?.personality?.thinking || 60;
  const userFeeling = userProfile?.personality?.feeling || 60;
  const userBirthOrder = userProfile?.birthOrder?.birthOrder || 'oldest';

  // Create naturally compatible profiles with some variety
  const attachmentOptions = ['secure', 'anxious', 'avoidant', 'disorganized'] as const;
  const compatibleAttachment = userAttachmentStyle === 'anxious' ? 'secure' : 
                              userAttachmentStyle === 'avoidant' ? 'secure' :
                              userAttachmentStyle === 'disorganized' ? 'secure' :
                              'secure'; // Default to secure for now

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
      parentalDynamics: "supportive"
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
