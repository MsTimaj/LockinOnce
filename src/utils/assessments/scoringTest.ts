
import { calculateRelationshipReadiness } from "@/utils/assessment/readinessCalculator";
import { ComprehensiveAssessmentResults } from "@/utils/assessment/types";
import { AttachmentStyleResults } from "@/components/assessments/AttachmentStyleAssessment";
import { PersonalityResults } from "@/components/assessments/PersonalityAssessment";

// Test data for comprehensive scoring validation
const createTestAssessmentResults = (): ComprehensiveAssessmentResults => ({
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
    birthPosition: 'firstborn',
    familySize: 'medium',
    parentingStyle: 'authoritative',
    siblingGap: 'close'
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
    intellectualCompatibility: 'very_important',
    sharedValues: 'essential'
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
    familyOrientation: 'important',
    lifestyle: 'balanced',
    personalGrowth: 'continuous'
  },
  values: {
    honesty: 'extremely_important',
    loyalty: 'very_important',
    adventure: 'moderately_important',
    stability: 'very_important',
    spirituality: 'moderately_important'
  },
  lifestyle: {
    socialLevel: 'moderate',
    fitnessLevel: 'active',
    dietaryStyle: 'flexible',
    workLifeBalance: 'balanced'
  },
  loveLanguages: {
    primaryLoveLanguage: 'quality_time',
    secondaryLoveLanguage: 'words_of_affirmation',
    physicalTouch: 'moderate',
    actsOfService: 'high',
    giftGiving: 'low'
  },
  financialValues: {
    spendingStyle: 'balanced',
    savingPriority: 'high',
    financialGoals: 'security_growth',
    debtTolerance: 'low'
  }
});

// Test different attachment styles to verify scoring variations
const createAnxiousAttachmentResults = (): ComprehensiveAssessmentResults => {
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

const createAvoidantAttachmentResults = (): ComprehensiveAssessmentResults => {
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

export const runScoringTests = () => {
  console.log('🧪 Starting Assessment Scoring Tests...\n');

  // Test 1: Secure attachment with high emotional capacity
  console.log('Test 1: Secure Attachment Profile');
  const secureResults = calculateRelationshipReadiness(createTestAssessmentResults());
  console.log('Overall Score:', secureResults.overall);
  console.log('Breakdown:', secureResults.breakdown);
  console.log('Is Ready:', secureResults.isReady);
  console.log('Strengths Count:', secureResults.strengths.length);
  console.log('Growth Areas Count:', secureResults.growthAreas.length);
  console.log('---\n');

  // Test 2: Anxious attachment with moderate capacity
  console.log('Test 2: Anxious Attachment Profile');
  const anxiousResults = calculateRelationshipReadiness(createAnxiousAttachmentResults());
  console.log('Overall Score:', anxiousResults.overall);
  console.log('Breakdown:', anxiousResults.breakdown);
  console.log('Is Ready:', anxiousResults.isReady);
  console.log('Strengths Count:', anxiousResults.strengths.length);
  console.log('Growth Areas Count:', anxiousResults.growthAreas.length);
  console.log('---\n');

  // Test 3: Avoidant attachment with communication challenges
  console.log('Test 3: Avoidant Attachment Profile');
  const avoidantResults = calculateRelationshipReadiness(createAvoidantAttachmentResults());
  console.log('Overall Score:', avoidantResults.overall);
  console.log('Breakdown:', avoidantResults.breakdown);
  console.log('Is Ready:', avoidantResults.isReady);
  console.log('Strengths Count:', avoidantResults.strengths.length);
  console.log('Growth Areas Count:', avoidantResults.growthAreas.length);
  console.log('---\n');

  // Test 4: Partial data test
  console.log('Test 4: Partial Assessment Data');
  const partialResults: ComprehensiveAssessmentResults = {
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
  };
  
  const partialScore = calculateRelationshipReadiness(partialResults);
  console.log('Partial Data Overall Score:', partialScore.overall);
  console.log('Partial Data Breakdown:', partialScore.breakdown);
  console.log('---\n');

  // Validation checks
  console.log('🔍 Validation Checks:');
  
  // Check score ranges
  const allScores = [secureResults, anxiousResults, avoidantResults, partialScore];
  allScores.forEach((result, index) => {
    const testName = ['Secure', 'Anxious', 'Avoidant', 'Partial'][index];
    
    // Overall score should be 0-100
    const validOverall = result.overall >= 0 && result.overall <= 100;
    console.log(`✓ ${testName} - Overall score in range (0-100): ${validOverall} (${result.overall})`);
    
    // All breakdown scores should be 0-100
    Object.entries(result.breakdown).forEach(([key, score]) => {
      const validBreakdown = score >= 0 && score <= 100;
      if (!validBreakdown) {
        console.log(`❌ ${testName} - ${key} score out of range: ${score}`);
      }
    });
    
    // Secure attachment should score higher than insecure
    if (index === 0) {
      console.log(`✓ Secure attachment score: ${result.overall}`);
    } else if (index === 1 || index === 2) {
      const isLower = result.overall < secureResults.overall;
      console.log(`✓ ${testName} attachment scores lower than secure: ${isLower} (${result.overall} vs ${secureResults.overall})`);
    }
  });

  console.log('\n🎯 Scoring Tests Complete!');
  
  return {
    secureResults,
    anxiousResults,
    avoidantResults,
    partialScore
  };
};

// Individual component scoring tests
export const testIndividualScoring = () => {
  console.log('🔬 Testing Individual Component Scoring...\n');
  
  // Test attachment security scoring specifically
  const highSecure = createTestAssessmentResults();
  const result1 = calculateRelationshipReadiness(highSecure);
  console.log('High Secure Attachment Security Score:', result1.breakdown.attachmentSecurity);
  
  const highAnxious = createAnxiousAttachmentResults();
  const result2 = calculateRelationshipReadiness(highAnxious);
  console.log('Anxious Attachment Security Score:', result2.breakdown.attachmentSecurity);
  
  const highAvoidant = createAvoidantAttachmentResults();
  const result3 = calculateRelationshipReadiness(highAvoidant);
  console.log('Avoidant Attachment Security Score:', result3.breakdown.attachmentSecurity);
  
  console.log('\nAttachment Security Scoring Validation:');
  console.log('✓ Secure > Anxious:', result1.breakdown.attachmentSecurity > result2.breakdown.attachmentSecurity);
  console.log('✓ Secure > Avoidant:', result1.breakdown.attachmentSecurity > result3.breakdown.attachmentSecurity);
  console.log('✓ Anxious vs Avoidant reasonable:', Math.abs(result2.breakdown.attachmentSecurity - result3.breakdown.attachmentSecurity) < 20);
};
