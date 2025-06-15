
import { AttachmentStyleResults } from "@/components/assessments/AttachmentStyleAssessment";
import { PersonalityResults } from "@/components/assessments/PersonalityAssessment";
import { BirthOrderResults } from "@/components/assessments/BirthOrderAssessment";
import { RelationshipIntentResults } from "@/components/assessments/RelationshipIntentAssessment";
import { EmotionalCapacityResults } from "@/components/assessments/EmotionalCapacityAssessment";
import { AttractionLayerResults } from "@/components/assessments/AttractionLayerAssessment";
import { PhysicalProximityResults } from "@/components/assessments/PhysicalProximityAssessment";
import { CommunicationStyleResults } from "@/components/assessments/CommunicationStyleAssessment";
import { LifeGoalsResults } from "@/components/assessments/LifeGoalsAssessment";
import { ValuesResults } from "@/components/assessments/ValuesAssessment";
import { LifestyleCompatibilityResults } from "@/components/assessments/LifestyleCompatibilityAssessment";
import { LoveLanguagesResults } from "@/components/assessments/LoveLanguagesAssessment";
import { FinancialValuesResults } from "@/components/assessments/FinancialValuesAssessment";

export interface PreferencesResults {
  genderPreference: string;
  ageRange: {
    min: number;
    max: number;
  };
  locationRadius: number;
  dealBreakers: {
    religion: string[];
    politics: string[];
    lifestyle: string[];
  };
  mustHaves: {
    wantsChildren: boolean | null;
    education: string[];
    careerAmbition: string;
  };
  personalInfo: {
    politicalLeaning: string;
    religiousLeaning: string;
    background: string;
  };
}

export interface ComprehensiveAssessmentResults {
  attachmentStyle: AttachmentStyleResults | null;
  personality: PersonalityResults | null;
  birthOrder: BirthOrderResults | null;
  relationshipIntent: RelationshipIntentResults | null;
  emotionalCapacity: EmotionalCapacityResults | null;
  preferences: PreferencesResults | null;
  attractionLayer: AttractionLayerResults | null;
  physicalProximity: PhysicalProximityResults | null;
  communicationStyle: CommunicationStyleResults | null;
  lifeGoals: LifeGoalsResults | null;
  values: ValuesResults | null;
  lifestyle: LifestyleCompatibilityResults | null;
  loveLanguages: LoveLanguagesResults | null;
  financialValues: FinancialValuesResults | null;
}

export interface RelationshipReadinessScore {
  overall: number;
  breakdown: {
    emotionalReadiness: number;
    communicationSkills: number;
    selfAwareness: number;
    relationshipGoals: number;
    attachmentSecurity: number;
  };
  strengths: string[];
  growthAreas: string[];
  personalizedStrategy: string;
  isReady: boolean;
}
