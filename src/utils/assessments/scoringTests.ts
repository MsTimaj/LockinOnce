
import { calculateRelationshipReadiness } from "@/utils/assessment/readinessCalculator";
import { 
  createTestAssessmentResults, 
  createAnxiousAttachmentResults, 
  createAvoidantAttachmentResults, 
  createPartialAssessmentResults 
} from "./testData";

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
  const partialScore = calculateRelationshipReadiness(createPartialAssessmentResults());
  console.log('Partial Data Overall Score:', partialScore.overall);
  console.log('Partial Data Breakdown:', partialScore.breakdown);
  console.log('---\n');

  return {
    secureResults,
    anxiousResults,
    avoidantResults,
    partialScore
  };
};
