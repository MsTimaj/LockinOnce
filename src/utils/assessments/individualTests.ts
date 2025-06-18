
import { calculateRelationshipReadiness } from "@/utils/assessment/readinessCalculator";
import { 
  createTestAssessmentResults, 
  createAnxiousAttachmentResults, 
  createAvoidantAttachmentResults 
} from "./testData";

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
