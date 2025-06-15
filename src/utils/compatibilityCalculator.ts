
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
  explanations: {
    why_compatible: string[];
    potential_challenges: string[];
    relationship_strengths: string[];
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
  connectionStatus: 'none' | 'interested' | 'passed';
  lastActive: string;
}

export const calculateAttachmentCompatibility = (
  user: AttachmentStyleResults | null,
  match: AttachmentStyleResults | null
): { score: number; explanation: string } => {
  if (!user || !match) return { score: 50, explanation: "Incomplete attachment data" };

  const compatibilityMatrix: Record<string, Record<string, { score: number; explanation: string }>> = {
    secure: { 
      secure: { score: 95, explanation: "Both partners have secure attachment, creating a stable foundation for trust and intimacy" },
      anxious: { score: 85, explanation: "Secure attachment can provide stability for anxious partner's emotional needs" },
      avoidant: { score: 70, explanation: "Secure partner can help avoidant partner open up emotionally over time" },
      disorganized: { score: 60, explanation: "Secure attachment provides grounding, but requires patience and understanding" }
    },
    anxious: { 
      secure: { score: 85, explanation: "Secure partner provides the consistency and reassurance anxious attachment needs" },
      anxious: { score: 60, explanation: "Both partners may struggle with emotional regulation and need extra communication" },
      avoidant: { score: 40, explanation: "Classic anxious-avoidant trap - different emotional needs create conflict" },
      disorganized: { score: 55, explanation: "Both styles need healing work for relationship stability" }
    },
    avoidant: { 
      secure: { score: 70, explanation: "Secure partner respects independence while encouraging emotional connection" },
      anxious: { score: 40, explanation: "Avoidant withdrawal triggers anxious partner's fears of abandonment" },
      avoidant: { score: 65, explanation: "Both value independence but may struggle with emotional intimacy" },
      disorganized: { score: 50, explanation: "Different avoidance strategies may create distance" }
    },
    disorganized: { 
      secure: { score: 60, explanation: "Secure partner provides stability, but disorganized attachment needs therapeutic support" },
      anxious: { score: 55, explanation: "Both styles involve emotional dysregulation requiring extra patience" },
      avoidant: { score: 50, explanation: "Mixed signals from disorganized style may trigger avoidant withdrawal" },
      disorganized: { score: 45, explanation: "Both partners need healing work before building healthy relationship patterns" }
    }
  };

  const result = compatibilityMatrix[user.dominantStyle]?.[match.dominantStyle];
  return result || { score: 50, explanation: "Unable to assess attachment compatibility" };
};

export const calculatePersonalityCompatibility = (
  user: PersonalityResults | null,
  match: PersonalityResults | null
): { score: number; explanation: string } => {
  if (!user || !match) return { score: 50, explanation: "Incomplete personality data" };

  let score = 50;
  let explanationParts: string[] = [];
  
  const userIsIntrovert = (user.introversion || 50) > (user.extroversion || 50);
  const matchIsIntrovert = (match.introversion || 50) > (match.extroversion || 50);
  
  if (userIsIntrovert !== matchIsIntrovert) {
    score += 25;
    explanationParts.push("Complementary introvert-extrovert dynamic creates balance");
  } else if (userIsIntrovert === matchIsIntrovert && userIsIntrovert) {
    score += 15;
    explanationParts.push("Both introverts appreciate quiet intimacy and deep connection");
  } else {
    score += 15;
    explanationParts.push("Both extroverts enjoy social activities and external stimulation");
  }

  const userIsThinking = (user.thinking || 50) > (user.feeling || 50);
  const matchIsThinking = (match.thinking || 50) > (match.feeling || 50);
  
  if (userIsThinking === matchIsThinking) {
    score += 20;
    if (userIsThinking) {
      explanationParts.push("Both approach decisions logically and value rational discussion");
    } else {
      explanationParts.push("Both prioritize emotions and values in decision-making");
    }
  } else {
    score += 5;
    explanationParts.push("Different decision-making styles may require compromise");
  }

  return { 
    score: Math.min(score, 100), 
    explanation: explanationParts.join("; ") 
  };
};

export const calculateBirthOrderCompatibility = (
  user: BirthOrderResults | null,
  match: BirthOrderResults | null
): { score: number; explanation: string } => {
  if (!user || !match) return { score: 50, explanation: "Incomplete birth order data" };

  const compatibilityMatrix: Record<string, Record<string, { score: number; explanation: string }>> = {
    oldest: { 
      youngest: { score: 90, explanation: "Classic oldest-youngest pairing - natural leader with someone who appreciates guidance" },
      middle: { score: 75, explanation: "Oldest provides direction while middle child brings flexibility and diplomacy" },
      only: { score: 70, explanation: "Both comfortable with responsibility and independence" },
      oldest: { score: 60, explanation: "Two leaders may compete for control but can respect each other's capabilities" }
    },
    middle: { 
      middle: { score: 85, explanation: "Both skilled at compromise and seeing multiple perspectives" },
      oldest: { score: 75, explanation: "Middle child's adaptability complements oldest's natural leadership" },
      youngest: { score: 70, explanation: "Middle child's peacemaking skills balance youngest's attention needs" },
      only: { score: 65, explanation: "Middle child's social skills complement only child's independence" }
    },
    youngest: { 
      oldest: { score: 90, explanation: "Youngest appreciates oldest's stability and guidance in relationship" },
      only: { score: 75, explanation: "Youngest's spontaneity balances only child's structured approach" },
      middle: { score: 70, explanation: "Middle child provides stability while youngest brings energy and fun" },
      youngest: { score: 55, explanation: "Both may expect the other to take initiative in relationship decisions" }
    },
    only: { 
      only: { score: 80, explanation: "Both value independence and personal space while sharing ambitious drives" },
      youngest: { score: 75, explanation: "Only child's maturity balances youngest's playful energy" },
      oldest: { score: 70, explanation: "Both comfortable with leadership roles and taking responsibility" },
      middle: { score: 65, explanation: "Only child learns compromise while middle child appreciates decisiveness" }
    }
  };

  const result = compatibilityMatrix[user.birthOrder]?.[match.birthOrder];
  return result || { score: 50, explanation: "Unable to assess birth order compatibility" };
};

export const calculateDetailedCompatibility = (
  user: ComprehensiveAssessmentResults,
  match: ComprehensiveAssessmentResults
): CompatibilityScore => {
  const attachmentResult = calculateAttachmentCompatibility(user.attachmentStyle, match.attachmentStyle);
  const personalityResult = calculatePersonalityCompatibility(user.personality, match.personality);
  const birthOrderResult = calculateBirthOrderCompatibility(user.birthOrder, match.birthOrder);

  // Simple values and lifestyle compatibility for MVP
  const values = user.relationshipIntent && match.relationshipIntent ? 85 : 60;
  const lifestyle = user.lifestyle && match.lifestyle ? 80 : 65;

  const emotional = Math.round((attachmentResult.score * 0.7 + (user.emotionalCapacity ? 30 : 10)));
  const communication = Math.round((personalityResult.score * 0.8 + 20));
  const goals = values;
  const intimacy = Math.round((attachmentResult.score * 0.6 + lifestyle * 0.4));

  const overall = Math.round(
    (attachmentResult.score * 0.3 + personalityResult.score * 0.25 + birthOrderResult.score * 0.2 + values * 0.15 + lifestyle * 0.1)
  );

  // Generate compatibility explanations
  const why_compatible: string[] = [];
  const potential_challenges: string[] = [];
  const relationship_strengths: string[] = [];

  if (attachmentResult.score >= 80) {
    why_compatible.push(attachmentResult.explanation);
    relationship_strengths.push("Strong emotional foundation and trust-building ability");
  } else if (attachmentResult.score < 60) {
    potential_challenges.push("May need to work on emotional communication and trust-building");
  }

  if (personalityResult.score >= 80) {
    why_compatible.push(personalityResult.explanation);
    relationship_strengths.push("Complementary personalities that bring out the best in each other");
  }

  if (birthOrderResult.score >= 80) {
    why_compatible.push(birthOrderResult.explanation);
    relationship_strengths.push("Natural relationship dynamics based on family roles");
  }

  if (values >= 80) {
    relationship_strengths.push("Aligned life goals and relationship timeline");
  }

  if (overall >= 85) {
    why_compatible.push("Exceptional overall compatibility across multiple dimensions");
  }

  return {
    overall,
    attachment: attachmentResult.score,
    personality: personalityResult.score,
    birthOrder: birthOrderResult.score,
    values,
    lifestyle,
    breakdown: {
      emotional,
      communication,
      lifestyle,
      goals,
      intimacy
    },
    explanations: {
      why_compatible,
      potential_challenges,
      relationship_strengths
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
