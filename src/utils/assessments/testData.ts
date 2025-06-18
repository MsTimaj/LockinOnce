

import { ComprehensiveAssessmentResults } from "@/utils/assessment/types";
import { AttachmentStyleResults } from "@/components/assessments/AttachmentStyleAssessment";
import { PersonalityResults } from "@/components/assessments/PersonalityAssessment";

// Test data for comprehensive scoring validation
export const createTestAssessmentResults = (): ComprehensiveAssessmentResults => ({
  attachmentStyle: {
    secure: 6,
    anxious: 1,
    avoidant: 1,
    disorganized: 0,
    dominantStyle: 'secure'
  } as AttachmentStyleResults,
  personality: {
    introversion: 3,
    extroversion: 3,
    thinking: 2,
    feeling: 4,
    dominantType: 'EF'
  } as PersonalityResults,
  birthOrder: {
    birthOrder: 'oldest',
    familySize: 'medium',
    parentalDynamics: 'warm_supportive',
    siblingGap: 'close_1_3_years'
  },
  relationshipIntent: {
    timeline: 'within_year',
    commitment: 'marriage',
    lifeGoals: 'family_career',
    familyPlanning: 'want_children',
    relocatation: 'somewhat_flexible'
  },
  emotionalCapacity: {
    stressManagement: 'healthy_coping',
    emotionalSupport: 'natural_supporter',
    selfAwareness: 'highly_aware',
    empathy: 'highly_empathetic',
    resilience: 'strong_resilience'
  },
  preferences: {
    genderPreference: 'women',
    ageRange: { min: 25, max: 35 },
    locationRadius: 25,
    dealBreakers: {
      religion: [],
      politics: [],
      lifestyle: []
    },
    mustHaves: {
      wantsChildren: true,
      education: ['bachelors'],
      careerAmbition: 'high'
    },
    personalInfo: {
      politicalLeaning: 'moderate',
      religiousLeaning: 'spiritual',
      background: 'mixed'
    }
  },
  attractionLayer: {
    physicalAttraction: 'important',
    emotionalConnection: 'essential',
    intellectualConnection: 'very_important',
    valuesAlignment: 'essential'
  },
  physicalProximity: {
    physicalAffection: 'moderate',
    personalSpace: 'balanced',
    intimacyPace: 'natural',
    touchComfort: 'comfortable'
  },
  communicationStyle: {
    communicationStyle: 'direct_and_kind',
    conflictResolution: 'collaborate_solutions',
    expressionStyle: 'open_and_honest',
    listeningStyle: 'active_empathetic'
  },
  lifeGoals: {
    careerAmbition: 'high',
    familyImportance: 'important',
    lifestylePreference: 'balanced',
    personalGrowth: 'continuous'
  },
  values: {
    coreValues: ['extremely_important'],
    relationshipValues: 'very_important',
    lifestyleValues: 'moderately_important',
    personalValues: 'very_important',
    sharedBeliefs: 'moderately_important'
  },
  lifestyle: {
    socialLevel: 'moderate',
    fitnessLevel: 'active',
    dietaryPreferences: 'flexible',
    workLifeBalance: 'balanced'
  },
  loveLanguages: {
    primaryLoveLanguage: 'quality_time',
    secondaryLoveLanguage: 'acts_of_service',
    tertiaryLoveLanguage: 'words_of_affirmation'
  },
  financialValues: {
    spendingStyle: 'balanced',
    savingPriority: 'high',
    financialGoals: 'security_growth',
    debtTolerance: 'low'
  }
});

// Test different attachment styles to verify scoring variations
export const createAnxiousAttachmentResults = (): ComprehensiveAssessmentResults => {
  const results = createTestAssessmentResults();
  results.attachmentStyle = {
    secure: 1,
    anxious: 6,
    avoidant: 1,
    disorganized: 0,
    dominantStyle: 'anxious'
  };
  results.emotionalCapacity = {
    stressManagement: 'some_difficulty',
    emotionalSupport: 'care_but_unsure',
    selfAwareness: 'moderately_aware',
    empathy: 'moderate_empathy',
    resilience: 'moderate_resilience'
  };
  return results;
};

export const createAvoidantAttachmentResults = (): ComprehensiveAssessmentResults => {
  const results = createTestAssessmentResults();
  results.attachmentStyle = {
    secure: 1,
    anxious: 1,
    avoidant: 6,
    disorganized: 0,
    dominantStyle: 'avoidant'
  };
  results.emotionalCapacity = {
    stressManagement: 'mostly_manage',
    emotionalSupport: 'struggle_supporting',
    selfAwareness: 'somewhat_aware',
    empathy: 'low_empathy',
    resilience: 'moderate_resilience'
  };
  results.communicationStyle = {
    communicationStyle: 'very_direct',
    conflictResolution: 'avoid_conflict',
    expressionStyle: 'reserved_private',
    listeningStyle: 'selective_focused'
  };
  return results;
};

export const createPartialAssessmentResults = (): ComprehensiveAssessmentResults => ({
  attachmentStyle: {
    secure: 4,
    anxious: 2,
    avoidant: 2,
    disorganized: 0,
    dominantStyle: 'secure'
  },
  personality: null,
  birthOrder: null,
  relationshipIntent: null,
  emotionalCapacity: {
    stressManagement: 'healthy_coping',
    emotionalSupport: 'natural_supporter',
    selfAwareness: 'highly_aware',
    empathy: 'highly_empathetic',
    resilience: 'strong_resilience'
  },
  preferences: null,
  attractionLayer: null,
  physicalProximity: null,
  communicationStyle: null,
  lifeGoals: null,
  values: null,
  lifestyle: null,
  loveLanguages: null,
  financialValues: null
});

