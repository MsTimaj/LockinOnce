import { AttachmentStyleResults } from "@/components/assessments/AttachmentStyleAssessment";
import { PersonalityResults } from "@/components/assessments/PersonalityAssessment";
import { BirthOrderResults } from "@/components/assessments/BirthOrderAssessment";
import { ComprehensiveAssessmentResults } from "./assessmentScoring";

export interface CompatibilityScore {
  overall: number;
  attachment: number;
  personality: number;
  birthOrder: number;
  values: number;
  lifestyle: number;
  breakdown: {
    emotional: number;
    communication: number;
    lifestyle: number;
    goals: number;
    intimacy: number;
  };
}

export interface MatchProfile {
  id: string;
  name: string;
  age: number;
  location: string;
  bio: string;
  photo: string;
  assessmentResults: ComprehensiveAssessmentResults;
  compatibilityScore: CompatibilityScore;
  connectionStatus: 'none' | 'pending' | 'connected';
  lastActive: string;
}

export const calculateAttachmentCompatibility = (
  user: AttachmentStyleResults | null,
  match: AttachmentStyleResults | null
): number => {
  if (!user || !match) return 50;

  const compatibilityMatrix: Record<string, Record<string, number>> = {
    secure: { secure: 95, anxious: 85, avoidant: 70, disorganized: 60 },
    anxious: { secure: 85, anxious: 60, avoidant: 40, disorganized: 55 },
    avoidant: { secure: 70, anxious: 40, avoidant: 65, disorganized: 50 },
    disorganized: { secure: 60, anxious: 55, avoidant: 50, disorganized: 45 }
  };

  return compatibilityMatrix[user.dominantStyle]?.[match.dominantStyle] || 50;
};

export const calculatePersonalityCompatibility = (
  user: PersonalityResults | null,
  match: PersonalityResults | null
): number => {
  if (!user || !match) return 50;

  let score = 50;
  
  const userIsIntrovert = (user.introversion || 50) > (user.extroversion || 50);
  const matchIsIntrovert = (match.introversion || 50) > (match.extroversion || 50);
  
  if (userIsIntrovert !== matchIsIntrovert) {
    score += 25;
  } else if (userIsIntrovert === matchIsIntrovert) {
    score += 15;
  }

  const userIsThinking = (user.thinking || 50) > (user.feeling || 50);
  const matchIsThinking = (match.thinking || 50) > (match.feeling || 50);
  
  if (userIsThinking === matchIsThinking) {
    score += 20;
  } else {
    score += 5;
  }

  return Math.min(score, 100);
};

export const calculateBirthOrderCompatibility = (
  user: BirthOrderResults | null,
  match: BirthOrderResults | null
): number => {
  if (!user || !match) return 50;

  const compatibilityMatrix: Record<string, Record<string, number>> = {
    oldest: { youngest: 90, middle: 75, only: 70, oldest: 60 },
    middle: { middle: 85, oldest: 75, youngest: 70, only: 65 },
    youngest: { oldest: 90, only: 75, middle: 70, youngest: 55 },
    only: { only: 80, youngest: 75, oldest: 70, middle: 65 }
  };

  return compatibilityMatrix[user.birthOrder]?.[match.birthOrder] || 50;
};

export const calculateValuesCompatibility = (
  user: ComprehensiveAssessmentResults,
  match: ComprehensiveAssessmentResults
): number => {
  let score = 50;
  
  if (user.relationshipIntent && match.relationshipIntent) {
    score += 25;
  }

  if (user.lifeGoals && match.lifeGoals) {
    score += 20;
  }

  return Math.min(score, 100);
};

export const calculateLifestyleCompatibility = (
  user: ComprehensiveAssessmentResults,
  match: ComprehensiveAssessmentResults
): number => {
  let score = 50;

  if (user.lifestyle && match.lifestyle) {
    score += 20;
  }

  if (user.physicalProximity && match.physicalProximity) {
    score += 15;
  }

  return Math.min(score, 100);
};

export const calculateDetailedCompatibility = (
  user: ComprehensiveAssessmentResults,
  match: ComprehensiveAssessmentResults
): CompatibilityScore => {
  const attachment = calculateAttachmentCompatibility(user.attachmentStyle, match.attachmentStyle);
  const personality = calculatePersonalityCompatibility(user.personality, match.personality);
  const birthOrder = calculateBirthOrderCompatibility(user.birthOrder, match.birthOrder);
  const values = calculateValuesCompatibility(user, match);
  const lifestyle = calculateLifestyleCompatibility(user, match);

  const emotional = Math.round((attachment * 0.6 + (user.emotionalCapacity ? 40 : 20)) * 0.7);
  const communication = Math.round((personality * 0.7 + (user.communicationStyle ? 30 : 20)));
  const lifestyleScore = lifestyle;
  const goals = values;
  const intimacy = Math.round((attachment * 0.4 + lifestyle * 0.6));

  const overall = Math.round(
    (attachment * 0.25 + personality * 0.25 + birthOrder * 0.15 + values * 0.20 + lifestyle * 0.15)
  );

  return {
    overall,
    attachment,
    personality,
    birthOrder,
    values,
    lifestyle,
    breakdown: {
      emotional,
      communication,
      lifestyle: lifestyleScore,
      goals,
      intimacy
    }
  };
};

export const generateCompatibleMatches = (userProfile: ComprehensiveAssessmentResults): MatchProfile[] => {
  const baseProfiles = [
    {
      id: "match_1",
      name: "Emma",
      age: 28,
      location: "2 miles away",
      bio: "Love hiking, good coffee, and deep conversations. Looking for genuine connection and shared adventures.",
      photo: "https://images.unsplash.com/photo-1494790108755-2616b612b8c3?w=400&h=400&fit=crop&crop=face"
    },
    {
      id: "match_2", 
      name: "Sophia",
      age: 26,
      location: "5 miles away",
      bio: "Yoga instructor and book lover. Passionate about mindfulness, travel, and building meaningful relationships.",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face"
    },
    {
      id: "match_3",
      name: "Olivia", 
      age: 30,
      location: "3 miles away",
      bio: "Marketing professional who loves cooking, art galleries, and weekend getaways. Ready for something real.",
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
  const compatibleAttachment = userProfile.attachmentStyle?.dominantStyle === 'secure' ? 'secure' :
                              userProfile.attachmentStyle?.dominantStyle === 'anxious' ? 'secure' :
                              userProfile.attachmentStyle?.dominantStyle === 'avoidant' ? 'secure' : 'secure';

  return {
    attachmentStyle: {
      secure: compatibleAttachment === 'secure' ? 5 : 0,
      anxious: 0,
      avoidant: 0,
      disorganized: 0,
      dominantStyle: compatibleAttachment
    },
    personality: {
      introversion: userProfile.personality?.introversion ? 40 : 80,
      extroversion: userProfile.personality?.extroversion ? 40 : 80,
      thinking: userProfile.personality?.thinking || 60,
      feeling: userProfile.personality?.feeling || 60,
      dominantType: "Compatible Type"
    },
    birthOrder: {
      birthOrder: userProfile.birthOrder?.birthOrder === 'oldest' ? 'youngest' : 'oldest',
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
