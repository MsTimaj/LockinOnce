
import { ComprehensiveAssessmentResults } from "./types";

export const getTopStrengths = (results: ComprehensiveAssessmentResults): string[] => {
  const strengths: string[] = [];
  
  if (results.attachmentStyle?.dominantStyle === 'secure') {
    strengths.push("Secure Attachment Style");
  }
  
  if (results.emotionalCapacity?.empathy === 'highly_empathetic') {
    strengths.push("High Empathy");
  }
  
  if (results.communicationStyle) {
    strengths.push("Clear Communication");
  }
  
  if (results.relationshipIntent) {
    strengths.push("Relationship Commitment");
  }
  
  if (results.emotionalCapacity?.resilience === 'strong_resilience') {
    strengths.push("Emotional Resilience");
  }
  
  if (strengths.length < 3) {
    const defaultStrengths = ["Self-Awareness", "Growth Mindset", "Authenticity"];
    strengths.push(...defaultStrengths.slice(0, 3 - strengths.length));
  }
  
  return strengths.slice(0, 5);
};
