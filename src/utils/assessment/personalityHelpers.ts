
import { PersonalityResults } from "@/components/assessments/PersonalityAssessment";

export const getDominantPersonalityType = (personality: PersonalityResults | null): string => {
  if (!personality) return "Balanced Personality";
  
  const introExtro = (personality.introversion || 50) > (personality.extroversion || 50) ? "Introverted" : "Extroverted";
  const thinkFeel = (personality.thinking || 50) > (personality.feeling || 50) ? "Thinking" : "Feeling";
  
  return `${introExtro} ${thinkFeel}`;
};
