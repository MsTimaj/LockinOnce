
import { AttachmentStyleResults } from "@/components/assessments/AttachmentStyleAssessment";
import { PersonalityResults } from "@/components/assessments/PersonalityAssessment";
import { BirthOrderResults } from "@/components/assessments/BirthOrderAssessment";

export interface CompatibilityScore {
  overall: number;
  attachment: number;
  personality: number;
  birthOrder: number;
  values: number;
  lifestyle: number;
}

export interface MatchProfile {
  id: string;
  name: string;
  age: number;
  location: string;
  bio: string;
  photo: string;
  attachmentResults?: AttachmentStyleResults;
  personalityResults?: PersonalityResults;
  birthOrderResults?: BirthOrderResults;
  compatibilityScore: CompatibilityScore;
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
  
  // Check for complementary introversion/extroversion
  const userIsIntrovert = user.introversion > user.extroversion;
  const matchIsIntrovert = match.introversion > match.extroversion;
  
  if (userIsIntrovert !== matchIsIntrovert) {
    score += 20; // Complementary types get bonus
  } else if (userIsIntrovert === matchIsIntrovert) {
    score += 10; // Same types still work but less bonus
  }

  // Check for thinking/feeling balance
  const userIsThinking = user.thinking > user.feeling;
  const matchIsThinking = match.thinking > match.feeling;
  
  if (userIsThinking === matchIsThinking) {
    score += 15; // Similar decision-making styles get bonus
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

export const calculateOverallCompatibility = (match: MatchProfile): CompatibilityScore => {
  const attachment = match.compatibilityScore?.attachment || 75;
  const personality = match.compatibilityScore?.personality || 75;
  const birthOrder = match.compatibilityScore?.birthOrder || 75;
  const values = Math.floor(Math.random() * 30) + 70; // Placeholder
  const lifestyle = Math.floor(Math.random() * 30) + 70; // Placeholder

  const overall = Math.round(
    (attachment * 0.3 + personality * 0.25 + birthOrder * 0.2 + values * 0.15 + lifestyle * 0.1)
  );

  return {
    overall,
    attachment,
    personality,
    birthOrder,
    values,
    lifestyle
  };
};
