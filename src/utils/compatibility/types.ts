
import { AttachmentStyleResults } from "@/components/assessments/AttachmentStyleAssessment";
import { PersonalityResults } from "@/components/assessments/PersonalityAssessment";
import { BirthOrderResults } from "@/components/assessments/BirthOrderAssessment";
import { ComprehensiveAssessmentResults } from "../assessmentScoring";

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

export interface CompatibilityResult {
  score: number;
  explanation: string;
}
