
import { ComprehensiveAssessmentResults } from "../assessmentScoring";
import { CompatibilityScore } from "./types";
import { calculateAttachmentCompatibility } from "./attachmentCompatibility";
import { calculatePersonalityCompatibility } from "./personalityCompatibility";
import { calculateBirthOrderCompatibility } from "./birthOrderCompatibility";
import { calculateValuesCompatibility } from "./valuesCompatibility";

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
