
import { ComprehensiveAssessmentResults } from "../assessmentScoring";
import { CompatibilityResult } from "./types";

export const calculateValuesCompatibility = (
  user: ComprehensiveAssessmentResults,
  match: ComprehensiveAssessmentResults
): CompatibilityResult => {
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
