
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
  console.log('Calculating compatibility between user and match');
  
  const attachmentResult = calculateAttachmentCompatibility(user.attachmentStyle, match.attachmentStyle);
  const personalityResult = calculatePersonalityCompatibility(user.personality, match.personality);
  const birthOrderResult = calculateBirthOrderCompatibility(user.birthOrder, match.birthOrder);
  const valuesResult = calculateValuesCompatibility(user, match);

  console.log('Compatibility component scores:', {
    attachment: attachmentResult.score,
    personality: personalityResult.score,
    birthOrder: birthOrderResult.score,
    values: valuesResult.score
  });

  // Enhanced lifestyle compatibility based on available data
  const lifestyle = user.lifestyle && match.lifestyle ? 85 : 70;

  // Research-based breakdown calculations
  const emotional = Math.round((attachmentResult.score * 0.7 + (user.emotionalCapacity ? 25 : 15) + (match.emotionalCapacity ? 5 : 0)));
  const communication = Math.round((personalityResult.score * 0.6 + attachmentResult.score * 0.4));
  const goals = valuesResult.score;
  const intimacy = Math.round((attachmentResult.score * 0.5 + personalityResult.score * 0.3 + lifestyle * 0.2));

  // Research-weighted overall score (based on relationship science)
  // Attachment style is most predictive (40%)
  // Values alignment is second (25%) 
  // Personality compatibility (20%)
  // Birth order dynamics (10%)
  // Lifestyle match (5%)
  const overall = Math.round(
    (attachmentResult.score * 0.40 + 
     valuesResult.score * 0.25 + 
     personalityResult.score * 0.20 + 
     birthOrderResult.score * 0.10 + 
     lifestyle * 0.05)
  );

  console.log('Final compatibility score:', overall);

  // Generate research-based explanations
  const why_compatible: string[] = [];
  const potential_challenges: string[] = [];
  const relationship_strengths: string[] = [];

  // Attachment-based insights (most important predictor)
  if (attachmentResult.score >= 90) {
    why_compatible.push("Exceptional attachment security creates deep emotional safety and trust");
    relationship_strengths.push("Rock-solid foundation for emotional intimacy and conflict resolution");
  } else if (attachmentResult.score >= 75) {
    why_compatible.push(attachmentResult.explanation);
    relationship_strengths.push("Strong emotional compatibility with excellent growth potential");
  } else if (attachmentResult.score >= 60) {
    why_compatible.push("Good attachment compatibility with some areas for conscious development");
    potential_challenges.push("May need intentional work on attachment triggers and emotional regulation");
  } else {
    potential_challenges.push("Attachment styles may create recurring emotional conflicts without professional support");
  }

  // Personality-based insights
  if (personalityResult.score >= 85) {
    why_compatible.push(personalityResult.explanation);
    relationship_strengths.push("Natural personality harmony creates effortless daily interactions");
  } else if (personalityResult.score >= 70) {
    why_compatible.push("Personality differences create interesting complementarity");
    relationship_strengths.push("Different strengths that balance each other well");
  } else if (personalityResult.score < 60) {
    potential_challenges.push("Personality styles may clash without conscious effort to understand differences");
  }

  // Birth order insights (family dynamics predictor)
  if (birthOrderResult.score >= 80) {
    why_compatible.push(birthOrderResult.explanation);
    relationship_strengths.push("Natural relationship roles feel comfortable and familiar");
  } else if (birthOrderResult.score < 50) {
    potential_challenges.push("Family background differences may create conflicts around roles and expectations");
  }

  // Values and life goals insights (critical for long-term success)
  if (valuesResult.score >= 85) {
    why_compatible.push("Excellent alignment on life goals and relationship vision");
    relationship_strengths.push("Shared future vision creates strong partnership foundation");
  } else if (valuesResult.score >= 70) {
    why_compatible.push("Good values alignment with manageable differences");
  } else if (valuesResult.score < 60) {
    potential_challenges.push("Significant differences in life goals or relationship timeline may require major compromises");
  }

  // Overall relationship potential
  if (overall >= 85) {
    why_compatible.push("Research indicates excellent long-term relationship potential across all key dimensions");
    relationship_strengths.push("Multiple factors align for relationship success and satisfaction");
  } else if (overall >= 75) {
    why_compatible.push("Very high compatibility with strong foundation for lasting relationship");
  } else if (overall >= 65) {
    why_compatible.push("Good compatibility foundation with normal relationship work required");
  } else {
    potential_challenges.push("May require significant conscious effort and possibly professional support to build lasting relationship");
  }

  return {
    overall: Math.max(overall, 45), // Minimum threshold for showing matches
    attachment: attachmentResult.score,
    personality: personalityResult.score,
    birthOrder: birthOrderResult.score,
    values: valuesResult.score,
    lifestyle,
    breakdown: {
      emotional: Math.max(emotional, 40),
      communication: Math.max(communication, 40), 
      lifestyle: Math.max(lifestyle, 40),
      goals: Math.max(goals, 40),
      intimacy: Math.max(intimacy, 40)
    },
    explanations: {
      why_compatible,
      potential_challenges,
      relationship_strengths
    }
  };
};
