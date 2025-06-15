
import { AttachmentStyleResults } from "@/components/assessments/AttachmentStyleAssessment";
import { PersonalityResults } from "@/components/assessments/PersonalityAssessment";
import { BirthOrderResults } from "@/components/assessments/BirthOrderAssessment";
import { ComprehensiveAssessmentResults } from "./assessmentScoring";
import { UserStateManager } from "./userStateManager";

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
  
  // Check for complementary introversion/extroversion (opposites attract in this case)
  const userIsIntrovert = user.introversion > user.extroversion;
  const matchIsIntrovert = match.introversion > match.extroversion;
  
  if (userIsIntrovert !== matchIsIntrovert) {
    score += 25; // Complementary types get bonus
  } else if (userIsIntrovert === matchIsIntrovert) {
    score += 15; // Same types still work but less bonus
  }

  // Check for thinking/feeling compatibility (similar is better)
  const userIsThinking = user.thinking > user.feeling;
  const matchIsThinking = match.thinking > match.feeling;
  
  if (userIsThinking === matchIsThinking) {
    score += 20; // Similar decision-making styles get bonus
  } else {
    score += 5; // Different styles can still work
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
  
  // Check relationship intent alignment
  if (user.relationshipIntent && match.relationshipIntent) {
    const userSeriousness = user.relationshipIntent.seriousness;
    const matchSeriousness = match.relationshipIntent.seriousness;
    
    if (userSeriousness === matchSeriousness) {
      score += 25;
    } else if (
      (userSeriousness === 'marriage' && matchSeriousness === 'longTerm') ||
      (userSeriousness === 'longTerm' && matchSeriousness === 'marriage')
    ) {
      score += 15;
    }
  }

  // Check life goals alignment
  if (user.lifeGoals && match.lifeGoals) {
    const commonGoals = Object.keys(user.lifeGoals).filter(
      goal => user.lifeGoals?.[goal as keyof typeof user.lifeGoals] === 
              match.lifeGoals?.[goal as keyof typeof match.lifeGoals]
    );
    score += Math.min(20, commonGoals.length * 5);
  }

  return Math.min(score, 100);
};

export const calculateLifestyleCompatibility = (
  user: ComprehensiveAssessmentResults,
  match: ComprehensiveAssessmentResults
): number => {
  let score = 50;

  // Check lifestyle preferences
  if (user.lifestyle && match.lifestyle) {
    // Add logic based on lifestyle compatibility results
    // This would need to be implemented based on the specific lifestyle assessment structure
    score += 20;
  }

  // Check physical proximity preferences
  if (user.physicalProximity && match.physicalProximity) {
    const userProximity = user.physicalProximity.preferredDistance;
    const matchProximity = match.physicalProximity.preferredDistance;
    
    if (userProximity === matchProximity) {
      score += 15;
    } else {
      score += 5;
    }
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

  // Calculate detailed breakdown
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
  // This would typically come from a database, but for now we'll generate compatible profiles
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
    // Generate compatible assessment results based on user's profile
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
  // Generate compatible results based on user's profile
  // This is a simplified version - in reality, this would be much more sophisticated
  
  const compatibleAttachment = userProfile.attachmentStyle?.dominantStyle === 'secure' ? 'secure' :
                              userProfile.attachmentStyle?.dominantStyle === 'anxious' ? 'secure' :
                              userProfile.attachmentStyle?.dominantStyle === 'avoidant' ? 'secure' : 'secure';

  return {
    attachmentStyle: {
      dominantStyle: compatibleAttachment,
      scores: { secure: 80, anxious: 10, avoidant: 5, disorganized: 5 },
      description: "Shows consistent patterns of secure attachment with healthy relationship dynamics."
    },
    personality: {
      introversion: userProfile.personality?.introversion ? 40 : 80, // Complementary
      extroversion: userProfile.personality?.extroversion ? 40 : 80,
      thinking: userProfile.personality?.thinking || 60,
      feeling: userProfile.personality?.feeling || 60,
      introspection: 75,
      selfAcceptance: 80
    },
    birthOrder: {
      birthOrder: userProfile.birthOrder?.birthOrder === 'oldest' ? 'youngest' : 'oldest',
      traits: ["Balanced", "Adaptable", "Caring"]
    },
    relationshipIntent: {
      seriousness: userProfile.relationshipIntent?.seriousness || 'longTerm',
      timeline: "1-2 years",
      qualities: ["Emotional maturity", "Shared values", "Physical attraction"]
    },
    emotionalCapacity: {
      selfAwareness: 80,
      empathy: 85,
      regulation: 78
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
