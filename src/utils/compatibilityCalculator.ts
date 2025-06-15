
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

  // Enhanced compatibility matrix based on attachment research
  const compatibilityMatrix: Record<string, Record<string, { score: number; explanation: string }>> = {
    secure: { 
      secure: { 
        score: 95, 
        explanation: "Two secure partners create the gold standard - high trust, effective communication, and emotional availability form an exceptionally stable foundation" 
      },
      anxious: { 
        score: 88, 
        explanation: "Secure partner's consistency and emotional availability naturally soothes anxious attachment fears, creating growth-oriented dynamic" 
      },
      avoidant: { 
        score: 78, 
        explanation: "Secure partner's patience and non-threatening approach can gradually help avoidant partner feel safe to be vulnerable" 
      },
      disorganized: { 
        score: 70, 
        explanation: "Secure partner provides crucial stability, though disorganized patterns may require additional therapeutic support for optimal functioning" 
      }
    },
    anxious: { 
      secure: { 
        score: 88, 
        explanation: "Secure partner's reliability and emotional consistency provides the reassurance anxious attachment craves for healing and growth" 
      },
      anxious: { 
        score: 55, 
        explanation: "Both partners' activation systems can amplify each other's fears, though shared emotional intensity can create deep bonds with good communication skills" 
      },
      avoidant: { 
        score: 35, 
        explanation: "Classic anxious-avoidant trap: anxious pursuit triggers avoidant withdrawal, creating painful cycle without conscious intervention" 
      },
      disorganized: { 
        score: 48, 
        explanation: "Both styles involve emotional dysregulation that can trigger each other, requiring significant self-awareness and coping strategies" 
      }
    },
    avoidant: { 
      secure: { 
        score: 78, 
        explanation: "Secure partner respects avoidant's need for space while gently encouraging emotional intimacy at a comfortable pace" 
      },
      anxious: { 
        score: 35, 
        explanation: "Avoidant's emotional distance activates anxious partner's abandonment fears, often leading to pursue-withdraw cycles" 
      },
      avoidant: { 
        score: 68, 
        explanation: "Mutual respect for independence and low emotional demands, though may struggle with deeper intimacy without intentional work" 
      },
      disorganized: { 
        score: 52, 
        explanation: "Avoidant's withdrawal may feel safer initially, but disorganized partner's unpredictability can trigger more distancing" 
      }
    },
    disorganized: { 
      secure: { 
        score: 70, 
        explanation: "Secure partner's emotional regulation and consistency offers healing opportunity, though progress may be gradual and requires patience" 
      },
      anxious: { 
        score: 48, 
        explanation: "Both experience emotional flooding and dysregulation, which can amplify chaos without strong external support systems" 
      },
      avoidant: { 
        score: 52, 
        explanation: "Disorganized partner's inconsistency may push avoidant partner further into withdrawal, limiting emotional connection" 
      },
      disorganized: { 
        score: 42, 
        explanation: "Two dysregulated systems can create significant turbulence, though shared understanding of trauma may foster deep empathy" 
      }
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

  let score = 40; // Base compatibility
  let explanationParts: string[] = [];
  
  // Energy orientation compatibility (research shows complementary works well)
  const userIsIntrovert = (user.introversion || 50) > (user.extroversion || 50);
  const matchIsIntrovert = (match.introversion || 50) > (match.extroversion || 50);
  
  if (userIsIntrovert !== matchIsIntrovert) {
    score += 30; // Complementary introvert-extrovert scores highest
    explanationParts.push("Complementary energy styles - introvert provides depth and reflection while extrovert brings social connection and external stimulation");
  } else if (userIsIntrovert === matchIsIntrovert && userIsIntrovert) {
    score += 22;
    explanationParts.push("Both introverts create peaceful, deep connection with shared need for quiet intimacy and meaningful conversation");
  } else {
    score += 20;
    explanationParts.push("Both extroverts energize each other through shared love of social activities and external engagement");
  }

  // Decision-making compatibility (similar works better for core values)
  const userIsThinking = (user.thinking || 50) > (user.feeling || 50);
  const matchIsThinking = (match.thinking || 50) > (match.feeling || 50);
  
  if (userIsThinking === matchIsThinking) {
    score += 25;
    if (userIsThinking) {
      explanationParts.push("Both approach decisions logically, creating clear communication and aligned problem-solving methods");
    } else {
      explanationParts.push("Both prioritize emotions and values, fostering deep empathy and heart-centered decision making");
    }
  } else {
    score += 12;
    explanationParts.push("Different decision-making styles require conscious effort to bridge logical and emotional perspectives");
  }

  // Intensity compatibility bonus
  const userIntensity = Math.abs((user.introversion || 50) - 50) + Math.abs((user.thinking || 50) - 50);
  const matchIntensity = Math.abs((match.introversion || 50) - 50) + Math.abs((match.thinking || 50) - 50);
  const intensityDiff = Math.abs(userIntensity - matchIntensity);
  
  if (intensityDiff < 20) {
    score += 5;
    explanationParts.push("Similar personality intensity levels create natural understanding and rhythm");
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

  // Research-based birth order compatibility matrix
  const compatibilityMatrix: Record<string, Record<string, { score: number; explanation: string }>> = {
    oldest: { 
      youngest: { 
        score: 92, 
        explanation: "Classic high-compatibility pairing - oldest's natural leadership meshes perfectly with youngest's comfort being guided and cared for" 
      },
      middle: { 
        score: 80, 
        explanation: "Oldest provides clear direction while middle child's diplomatic skills and flexibility complement the partnership beautifully" 
      },
      only: { 
        score: 75, 
        explanation: "Both comfortable with responsibility and high achievement, though may need to negotiate leadership roles consciously" 
      },
      oldest: { 
        score: 62, 
        explanation: "Two natural leaders can create power struggles, but mutual respect for competence and shared responsibility ethic build strong foundation" 
      }
    },
    middle: { 
      middle: { 
        score: 88, 
        explanation: "Both excel at compromise and seeing multiple perspectives - natural peacemakers who create harmonious, balanced relationships" 
      },
      oldest: { 
        score: 80, 
        explanation: "Middle child's adaptability and conflict-resolution skills perfectly complement oldest's leadership and decision-making confidence" 
      },
      youngest: { 
        score: 76, 
        explanation: "Middle child's nurturing nature balances youngest's need for attention while youngest brings playfulness to the relationship" 
      },
      only: { 
        score: 72, 
        explanation: "Middle child's social skills and flexibility help only child learn collaboration while gaining from their focus and determination" 
      }
    },
    youngest: { 
      oldest: { 
        score: 92, 
        explanation: "Ideal complementary match - youngest's spontaneity and charm perfectly balanced by oldest's stability and protective instincts" 
      },
      only: { 
        score: 78, 
        explanation: "Youngest's social energy and creativity beautifully complement only child's focus and independence, creating dynamic balance" 
      },
      middle: { 
        score: 76, 
        explanation: "Middle child provides emotional stability and patience while youngest brings excitement and helps middle child feel special" 
      },
      youngest: { 
        score: 58, 
        explanation: "Both may expect partner to take charge and make decisions - requires conscious development of leadership skills by one partner" 
      }
    },
    only: { 
      only: { 
        score: 85, 
        explanation: "Shared independence and self-sufficiency create respect-based relationship with mutual understanding of alone time needs" 
      },
      youngest: { 
        score: 78, 
        explanation: "Only child's maturity and focus provide grounding for youngest's energy while learning spontaneity and social ease" 
      },
      oldest: { 
        score: 75, 
        explanation: "Both comfortable leading and taking responsibility - success depends on dividing domains and respecting each other's expertise" 
      },
      middle: { 
        score: 72, 
        explanation: "Only child learns valuable collaboration skills from middle child's diplomatic nature while providing decisiveness and direction" 
      }
    }
  };

  const result = compatibilityMatrix[user.birthOrder]?.[match.birthOrder];
  return result || { score: 50, explanation: "Unable to assess birth order compatibility" };
};

export const calculateValuesCompatibility = (
  user: ComprehensiveAssessmentResults,
  match: ComprehensiveAssessmentResults
): { score: number; explanation: string } => {
  if (!user.relationshipIntent || !match.relationshipIntent) {
    return { score: 60, explanation: "Limited relationship intent data available" };
  }

  let score = 50;
  let explanationParts: string[] = [];

  // Timeline compatibility (critical for relationship success)
  if (user.relationshipIntent.timeline === match.relationshipIntent.timeline) {
    score += 25;
    explanationParts.push("Perfectly aligned relationship timelines create shared urgency and commitment levels");
  } else {
    const timelines = ["casual", "6_months", "1-2_years", "long_term"];
    const userIndex = timelines.indexOf(user.relationshipIntent.timeline);
    const matchIndex = timelines.indexOf(match.relationshipIntent.timeline);
    const diff = Math.abs(userIndex - matchIndex);
    
    if (diff === 1) {
      score += 15;
      explanationParts.push("Similar relationship timelines with minor differences that can be navigated with communication");
    } else {
      score += 5;
      explanationParts.push("Different relationship timelines may require significant compromise and discussion");
    }
  }

  // Commitment style compatibility
  if (user.relationshipIntent.commitment === match.relationshipIntent.commitment) {
    score += 20;
    explanationParts.push("Identical commitment goals create clear shared direction for the relationship");
  } else {
    score += 8;
    explanationParts.push("Different commitment preferences require ongoing dialogue about relationship direction");
  }

  // Family planning alignment (crucial for long-term compatibility)
  if (user.relationshipIntent.familyPlanning === match.relationshipIntent.familyPlanning) {
    score += 20;
    explanationParts.push("Complete agreement on family planning eliminates major potential source of conflict");
  } else {
    const familyMatrix: Record<string, Record<string, number>> = {
      "want_children": { "maybe_children": 10, "no_children": 0, "have_children": 15 },
      "maybe_children": { "want_children": 10, "no_children": 8, "have_children": 12 },
      "no_children": { "want_children": 0, "maybe_children": 8, "have_children": 5 },
      "have_children": { "want_children": 15, "maybe_children": 12, "no_children": 5 }
    };
    
    const compatScore = familyMatrix[user.relationshipIntent.familyPlanning]?.[match.relationshipIntent.familyPlanning] || 5;
    score += compatScore;
    
    if (compatScore === 0) {
      explanationParts.push("Fundamental disagreement on children may create irreconcilable difference");
    } else if (compatScore < 10) {
      explanationParts.push("Significant differences in family planning require deep discussion and compromise");
    } else {
      explanationParts.push("Family planning differences are manageable with open communication");
    }
  }

  return {
    score: Math.min(score, 100),
    explanation: explanationParts.join("; ")
  };
};

export const calculateDetailedCompatibility = (
  user: ComprehensiveAssessmentResults,
  match: ComprehensiveAssessmentResults
): CompatibilityScore => {
  const attachmentResult = calculateAttachmentCompatibility(user.attachmentStyle, match.attachmentStyle);
  const personalityResult = calculatePersonalityCompatibility(user.personality, match.personality);
  const birthOrderResult = calculateBirthOrderCompatibility(user.birthOrder, match.birthOrder);
  const valuesResult = calculateValuesCompatibility(user, match);

  // Enhanced lifestyle compatibility
  const lifestyle = user.lifestyle && match.lifestyle ? 82 : 68;

  // More sophisticated breakdown calculations
  const emotional = Math.round((attachmentResult.score * 0.8 + (user.emotionalCapacity ? 20 : 10)));
  const communication = Math.round((personalityResult.score * 0.7 + attachmentResult.score * 0.3));
  const goals = valuesResult.score;
  const intimacy = Math.round((attachmentResult.score * 0.6 + lifestyle * 0.4));

  // Weighted overall score emphasizing most predictive factors
  const overall = Math.round(
    (attachmentResult.score * 0.35 + valuesResult.score * 0.25 + personalityResult.score * 0.20 + birthOrderResult.score * 0.15 + lifestyle * 0.05)
  );

  // Generate detailed compatibility explanations
  const why_compatible: string[] = [];
  const potential_challenges: string[] = [];
  const relationship_strengths: string[] = [];

  // Attachment-based insights
  if (attachmentResult.score >= 85) {
    why_compatible.push(attachmentResult.explanation);
    relationship_strengths.push("Exceptional emotional security and trust-building foundation");
  } else if (attachmentResult.score >= 70) {
    why_compatible.push("Good emotional compatibility with growth potential");
    relationship_strengths.push("Solid emotional foundation with room for deeper intimacy development");
  } else if (attachmentResult.score < 60) {
    potential_challenges.push("Attachment styles may create emotional distance or conflict without conscious work");
  }

  // Personality-based insights
  if (personalityResult.score >= 80) {
    why_compatible.push(personalityResult.explanation);
    relationship_strengths.push("Personality styles create natural harmony and understanding");
  } else if (personalityResult.score < 60) {
    potential_challenges.push("Different personality approaches may require extra communication and patience");
  }

  // Birth order insights
  if (birthOrderResult.score >= 85) {
    why_compatible.push(birthOrderResult.explanation);
    relationship_strengths.push("Natural relationship roles and dynamics feel effortless");
  }

  // Values insights
  if (valuesResult.score >= 80) {
    why_compatible.push("Strong alignment on relationship goals and life direction");
    relationship_strengths.push("Shared vision for the future creates unified partnership");
  } else if (valuesResult.score < 60) {
    potential_challenges.push("Different life goals or timelines may require significant compromise");
  }

  // Overall compatibility insights
  if (overall >= 90) {
    why_compatible.push("Exceptional compatibility across all major relationship dimensions");
  } else if (overall >= 80) {
    why_compatible.push("Very high compatibility with minor areas for growth");
  } else if (overall >= 70) {
    why_compatible.push("Good compatibility foundation with some differences to navigate");
  }

  return {
    overall,
    attachment: attachmentResult.score,
    personality: personalityResult.score,
    birthOrder: birthOrderResult.score,
    values: valuesResult.score,
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
