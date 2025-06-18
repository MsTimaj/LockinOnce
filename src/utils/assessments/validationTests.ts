
import { RelationshipReadinessScore } from "@/utils/assessment/types";

export const runValidationTests = (testResults: {
  secureResults: RelationshipReadinessScore;
  anxiousResults: RelationshipReadinessScore;
  avoidantResults: RelationshipReadinessScore;
  partialScore: RelationshipReadinessScore;
}) => {
  console.log('🔍 Validation Checks:');
  
  // Check score ranges
  const allScores = [testResults.secureResults, testResults.anxiousResults, testResults.avoidantResults, testResults.partialScore];
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
      const isLower = result.overall < testResults.secureResults.overall;
      console.log(`✓ ${testName} attachment scores lower than secure: ${isLower} (${result.overall} vs ${testResults.secureResults.overall})`);
    }
  });
};
