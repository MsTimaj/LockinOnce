
import { ComprehensiveAssessmentResults, RelationshipReadinessScore } from "../assessmentScoring";

export interface UserProfile {
  id: string;
  createdAt: string;
  lastUpdated: string;
  basicInfo: {
    name?: string;
    age?: number;
    location?: string;
    bio?: string;
    occupation?: string;
    photos?: string[];
  };
  assessmentResults: ComprehensiveAssessmentResults;
  readinessScore?: RelationshipReadinessScore;
  onboardingCompleted: boolean;
  currentStep: {
    phase: number;
    step: number;
  };
}
