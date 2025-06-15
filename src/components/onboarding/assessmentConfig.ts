
import WelcomePhilosophyAssessment from "@/components/assessments/WelcomePhilosophyAssessment";
import AttachmentStyleAssessment from "@/components/assessments/AttachmentStyleAssessment";
import PersonalityAssessment from "@/components/assessments/PersonalityAssessment";
import BirthOrderAssessment from "@/components/assessments/BirthOrderAssessment";
import RelationshipIntentAssessment from "@/components/assessments/RelationshipIntentAssessment";
import EmotionalCapacityAssessment from "@/components/assessments/EmotionalCapacityAssessment";
import AttractionLayerAssessment from "@/components/assessments/AttractionLayerAssessment";
import PhysicalProximityAssessment from "@/components/assessments/PhysicalProximityAssessment";
import CommunicationStyleAssessment from "@/components/assessments/CommunicationStyleAssessment";
import LifeGoalsAssessment from "@/components/assessments/LifeGoalsAssessment";
import ValuesAssessment from "@/components/assessments/ValuesAssessment";
import LifestyleCompatibilityAssessment from "@/components/assessments/LifestyleCompatibilityAssessment";
import LoveLanguagesAssessment from "@/components/assessments/LoveLanguagesAssessment";
import FinancialValuesAssessment from "@/components/assessments/FinancialValuesAssessment";
import PreferencesAssessment from "@/components/assessments/PreferencesAssessment";

export interface AssessmentConfig {
  component: React.ComponentType<{ onComplete: (results?: any) => void }>;
  title: string;
  onComplete: (results?: any) => void;
}

export const createAssessments = (handleStepComplete: (results: any) => void): AssessmentConfig[] => [
  { 
    component: WelcomePhilosophyAssessment, 
    title: "Welcome",
    onComplete: () => handleStepComplete(null)
  },
  { 
    component: AttachmentStyleAssessment, 
    title: "Attachment Style",
    onComplete: handleStepComplete
  },
  { 
    component: PersonalityAssessment, 
    title: "Personality",
    onComplete: handleStepComplete
  },
  { 
    component: BirthOrderAssessment, 
    title: "Birth Order",
    onComplete: handleStepComplete
  },
  { 
    component: RelationshipIntentAssessment, 
    title: "Relationship Intent",
    onComplete: handleStepComplete
  },
  { 
    component: EmotionalCapacityAssessment, 
    title: "Emotional Capacity",
    onComplete: handleStepComplete
  },
  { 
    component: AttractionLayerAssessment, 
    title: "Attraction Layer",
    onComplete: handleStepComplete
  },
  { 
    component: PhysicalProximityAssessment, 
    title: "Physical Proximity",
    onComplete: handleStepComplete
  },
  { 
    component: CommunicationStyleAssessment, 
    title: "Communication Style",
    onComplete: handleStepComplete
  },
  { 
    component: LifeGoalsAssessment, 
    title: "Life Goals",
    onComplete: handleStepComplete
  },
  { 
    component: ValuesAssessment, 
    title: "Values",
    onComplete: handleStepComplete
  },
  { 
    component: LifestyleCompatibilityAssessment, 
    title: "Lifestyle",
    onComplete: handleStepComplete
  },
  { 
    component: LoveLanguagesAssessment, 
    title: "Love Languages",
    onComplete: handleStepComplete
  },
  { 
    component: FinancialValuesAssessment, 
    title: "Financial Values",
    onComplete: handleStepComplete
  },
  { 
    component: PreferencesAssessment, 
    title: "Dating Preferences",
    onComplete: handleStepComplete
  }
];

export const assessmentMap = [
  null, // Step 0: Welcome step
  'attachmentStyle', // Step 1
  'personality', // Step 2
  'birthOrder', // Step 3
  'relationshipIntent', // Step 4
  'emotionalCapacity', // Step 5
  'attractionLayer', // Step 6
  'physicalProximity', // Step 7
  'communicationStyle', // Step 8
  'lifeGoals', // Step 9
  'values', // Step 10
  'lifestyle', // Step 11
  'loveLanguages', // Step 12
  'financialValues', // Step 13
  'preferences' // Step 14: MOVED - Dating Preferences (now last)
] as const;
