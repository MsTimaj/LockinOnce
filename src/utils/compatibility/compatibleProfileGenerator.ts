
import { ComprehensiveAssessmentResults } from "../assessmentScoring";

export const generateCompatibleAssessmentResults = (
  userProfile: ComprehensiveAssessmentResults, 
  index: number
): ComprehensiveAssessmentResults => {
  const userAttachmentStyle = userProfile?.attachmentStyle?.dominantStyle || 'secure';
  const userIntroversion = userProfile?.personality?.introversion || 50;
  const userExtroversion = userProfile?.personality?.extroversion || 50;
  const userThinking = userProfile?.personality?.thinking || 50;
  const userFeeling = userProfile?.personality?.feeling || 50;
  const userBirthOrder = userProfile?.birthOrder?.birthOrder || 'oldest';

  // Research-based attachment compatibility:
  // Secure pairs well with any style but especially secure
  // Anxious pairs best with secure (avoids anxious-avoidant trap)
  // Avoidant pairs best with secure
  // Disorganized pairs best with secure
  const getCompatibleAttachment = (userStyle: string) => {
    switch (userStyle) {
      case 'secure':
        return Math.random() < 0.7 ? 'secure' : ['anxious', 'avoidant'][Math.floor(Math.random() * 2)];
      case 'anxious':
        return 'secure'; // Anxious needs secure partner for stability
      case 'avoidant':
        return 'secure'; // Avoidant needs secure partner to feel safe opening up
      case 'disorganized':
        return 'secure'; // Disorganized needs secure partner for healing
      default:
        return 'secure';
    }
  };

  const compatibleAttachment = getCompatibleAttachment(userAttachmentStyle);

  // Research-based personality compatibility:
  // Complementary introversion/extroversion works well
  // Similar thinking/feeling styles work better for core values
  const isUserIntrovert = userIntroversion > userExtroversion;
  const isUserThinker = userThinking > userFeeling;

  // Create complementary personality for better compatibility
  const matchIntroversion = isUserIntrovert ? 30 + Math.random() * 20 : 70 + Math.random() * 20; // Complementary
  const matchExtroversion = isUserIntrovert ? 70 + Math.random() * 20 : 30 + Math.random() * 20; // Complementary
  
  // Similar thinking/feeling for value alignment
  const matchThinking = isUserThinker ? userThinking + (Math.random() * 20 - 10) : userThinking + (Math.random() * 30 - 15);
  const matchFeeling = !isUserThinker ? userFeeling + (Math.random() * 20 - 10) : userFeeling + (Math.random() * 30 - 15);

  // Research-based birth order compatibility:
  // Opposites often work well (oldest with youngest, etc.)
  const getCompatibleBirthOrder = (userOrder: string) => {
    switch (userOrder) {
      case 'oldest':
        return Math.random() < 0.6 ? 'youngest' : 'middle';
      case 'youngest':
        return Math.random() < 0.6 ? 'oldest' : 'middle';
      case 'middle':
        return ['oldest', 'youngest'][Math.floor(Math.random() * 2)];
      case 'only':
        return 'youngest'; // Only children often pair well with youngest
      default:
        return 'middle';
    }
  };

  const compatibleBirthOrder = getCompatibleBirthOrder(userBirthOrder);

  // Generate relationship intent that aligns with user's goals
  const userIntent = userProfile?.relationshipIntent;
  const compatibleIntent = {
    timeline: userIntent?.timeline || "1-2 years",
    commitment: userIntent?.commitment || "marriage",
    lifeGoals: userIntent?.lifeGoals || "family_career",
    familyPlanning: userIntent?.familyPlanning || "want_children",
    relocatation: userIntent?.relocatation || "somewhat_flexible"
  };

  // Generate high emotional capacity for compatibility with updated interface
  const compatibleEmotionalCapacity = {
    stressManagement: "high",
    emotionalSupport: "high", 
    selfAwareness: "high",
    empathy: "high",
    resilience: "high",
    overallMaturity: "high",
    insights: [
      "Shows strong emotional intelligence in challenging situations",
      "Naturally supportive and understanding of others' needs",
      "Maintains emotional stability under pressure"
    ],
    strengths: [
      "Excellent stress management skills",
      "Natural emotional supporter",
      "High self-awareness and empathy"
    ],
    growthAreas: []
  };

  // Create attachment style scores based on dominant style
  const attachmentScores = {
    secure: compatibleAttachment === 'secure' ? 5 : 0,
    anxious: compatibleAttachment === 'anxious' ? 5 : 0,
    avoidant: compatibleAttachment === 'avoidant' ? 5 : 0,
    disorganized: compatibleAttachment === 'disorganized' ? 5 : 0
  };

  return {
    attachmentStyle: {
      ...attachmentScores,
      dominantStyle: compatibleAttachment as any
    },
    personality: {
      introversion: Math.max(0, Math.min(100, matchIntroversion)),
      extroversion: Math.max(0, Math.min(100, matchExtroversion)),
      thinking: Math.max(0, Math.min(100, matchThinking)),
      feeling: Math.max(0, Math.min(100, matchFeeling)),
      dominantType: "Compatible Type"
    },
    birthOrder: {
      birthOrder: compatibleBirthOrder as any,
      familySize: "medium",
      parentalDynamics: "warm_supportive",
      siblingGap: "moderate_4_6_years"
    },
    relationshipIntent: compatibleIntent,
    emotionalCapacity: compatibleEmotionalCapacity,
    preferences: null,
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
