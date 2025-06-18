
import { runScoringTests, testIndividualScoring } from "./scoringTest";

// Main test runner that can be called from console or component
export const runAllAssessmentTests = () => {
  console.clear();
  console.log('🚀 Running Complete Assessment Scoring Validation\n');
  console.log('=' .repeat(60));
  
  try {
    // Run comprehensive scoring tests
    const results = runScoringTests();
    
    console.log('\n' + '=' .repeat(60));
    
    // Run individual component tests
    testIndividualScoring();
    
    console.log('\n' + '=' .repeat(60));
    console.log('✅ All Assessment Tests Completed Successfully!');
    
    return results;
  } catch (error) {
    console.error('❌ Test execution failed:', error);
    throw error;
  }
};

// Helper to run tests in browser console
if (typeof window !== 'undefined') {
  (window as any).runAssessmentTests = runAllAssessmentTests;
}
