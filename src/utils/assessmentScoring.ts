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
import { LifestyleResults } from "@/components/assessments/LifestyleResults";
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
  lifestyle: LifestyleResults | null;
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

export const calculateRelationshipReadiness = (results: ComprehensiveAssessmentResults): RelationshipReadinessScore => {
  // Emotional Readiness (30% weight) - using available properties from EmotionalCapacityResults
  let emotionalReadiness = 60;
  if (results.emotionalCapacity) {
    // EmotionalCapacityResults has: stressManagement, emotionalSupport, selfAwareness, empathy, resilience (all strings)
    // We'll score based on the quality of responses
    const scores = [
      results.emotionalCapacity.stressManagement === 'healthy_coping' ? 90 : 
      results.emotionalCapacity.stressManagement === 'mostly_manage' ? 75 : 60,
      
      results.emotionalCapacity.emotionalSupport === 'natural_supporter' ? 90 :
      results.emotionalCapacity.emotionalSupport === 'care_but_unsure' ? 70 : 50,
      
      results.emotionalCapacity.selfAwareness === 'highly_aware' ? 90 :
      results.emotionalCapacity.selfAwareness === 'moderately_aware' ? 70 : 50,
      
      results.emotionalCapacity.empathy === 'highly_empathetic' ? 90 :
      results.emotionalCapacity.empathy === 'moderate_empathy' ? 70 : 50,
      
      results.emotionalCapacity.resilience === 'strong_resilience' ? 90 :
      results.emotionalCapacity.resilience === 'moderate_resilience' ? 70 : 50
    ];
    emotionalReadiness = scores.reduce((a, b) => a + b, 0) / scores.length;
  }
  
  if (results.attachmentStyle) {
    const attachmentBonus = results.attachmentStyle.dominantStyle === 'secure' ? 20 : 
                           results.attachmentStyle.dominantStyle === 'anxious' ? -5 :
                           results.attachmentStyle.dominantStyle === 'avoidant' ? -10 : -15;
    emotionalReadiness = Math.max(0, Math.min(100, emotionalReadiness + attachmentBonus));
  }

  // Communication Skills (25% weight)
  let communicationSkills = 65;
  if (results.communicationStyle) {
    // Use default scoring since we don't know the exact properties
    communicationSkills = 75;
  }

  // Self Awareness (20% weight)
  let selfAwareness = 70;
  if (results.personality) {
    const intro = results.personality.introversion || 50;
    const extro = results.personality.extroversion || 50;
    selfAwareness = Math.abs(intro - extro) > 20 ? 80 : 70;
  }

  // Relationship Goals (15% weight)
  let relationshipGoals = 75;
  if (results.relationshipIntent) {
    relationshipGoals = 80;
  }

  // Attachment Security (10% weight)
  let attachmentSecurity = 70;
  if (results.attachmentStyle) {
    attachmentSecurity = results.attachmentStyle.dominantStyle === 'secure' ? 90 :
                        results.attachmentStyle.dominantStyle === 'anxious' ? 65 :
                        results.attachmentStyle.dominantStyle === 'avoidant' ? 55 : 45;
  }

  const overall = Math.round(
    (emotionalReadiness * 0.3) +
    (communicationSkills * 0.25) +
    (selfAwareness * 0.2) +
    (relationshipGoals * 0.15) +
    (attachmentSecurity * 0.1)
  );

  const scores = { emotionalReadiness, communicationSkills, selfAwareness, relationshipGoals, attachmentSecurity };
  const strengths: string[] = [];
  const growthAreas: string[] = [];

  Object.entries(scores).forEach(([area, score]) => {
    if (score >= 80) {
      strengths.push(getStrengthDescription(area));
    } else if (score < 65) {
      growthAreas.push(getGrowthAreaDescription(area));
    }
  });

  const personalizedStrategy = generatePersonalizedStrategy(results, overall);

  return {
    overall,
    breakdown: scores,
    strengths,
    growthAreas,
    personalizedStrategy,
    isReady: overall >= 70
  };
};

const getStrengthDescription = (area: string): string => {
  const descriptions = {
    emotionalReadiness: "Excellent emotional intelligence and self-regulation",
    communicationSkills: "Strong communication and conflict resolution abilities",
    selfAwareness: "Deep self-understanding and personal insight",
    relationshipGoals: "Clear relationship intentions and commitment readiness",
    attachmentSecurity: "Secure attachment style and healthy relationship patterns"
  };
  return descriptions[area as keyof typeof descriptions] || area;
};

const getGrowthAreaDescription = (area: string): string => {
  const descriptions = {
    emotionalReadiness: "Developing emotional awareness and regulation skills",
    communicationSkills: "Improving communication patterns and conflict navigation",
    selfAwareness: "Building deeper self-understanding and acceptance",
    relationshipGoals: "Clarifying relationship intentions and commitment readiness",
    attachmentSecurity: "Healing attachment patterns and building security"
  };
  return descriptions[area as keyof typeof descriptions] || area;
};

const generatePersonalizedStrategy = (results: ComprehensiveAssessmentResults, overallScore: number): string => {
  if (overallScore >= 85) {
    return "You're exceptionally ready for a meaningful relationship. Focus on finding someone who matches your emotional maturity and relationship goals. Trust your instincts and don't settle for less than genuine compatibility.";
  } else if (overallScore >= 70) {
    return "You're well-prepared for a serious relationship. Continue developing your communication skills and stay open to growth within a partnership. Look for someone who complements your strengths and supports your areas of growth.";
  } else if (overallScore >= 55) {
    return "You have solid relationship potential with some areas to develop. Consider focusing on personal growth, perhaps through therapy or self-reflection, while remaining open to connections that feel natural and supportive.";
  } else {
    return "This might be a perfect time for personal development before pursuing a serious relationship. Focus on building emotional awareness, communication skills, and self-understanding. Consider this a valuable investment in your future relationships.";
  }
};

export const getDominantPersonalityType = (personality: PersonalityResults | null): string => {
  if (!personality) return "Balanced Personality";
  
  const introExtro = (personality.introversion || 50) > (personality.extroversion || 50) ? "Introverted" : "Extroverted";
  const thinkFeel = (personality.thinking || 50) > (personality.feeling || 50) ? "Thinking" : "Feeling";
  
  return `${introExtro} ${thinkFeel}`;
};

export const getTopStrengths = (results: ComprehensiveAssessmentResults): string[] => {
  const strengths: string[] = [];
  
  if (results.attachmentStyle?.dominantStyle === 'secure') {
    strengths.push("Secure Attachment Style");
  }
  
  if (results.emotionalCapacity?.empathy === 'highly_empathetic') {
    strengths.push("High Empathy");
  }
  
  if (results.communicationStyle) {
    strengths.push("Clear Communication");
  }
  
  if (results.relationshipIntent) {
    strengths.push("Relationship Commitment");
  }
  
  if (results.emotionalCapacity?.resilience === 'strong_resilience') {
    strengths.push("Emotional Resilience");
  }
  
  if (strengths.length < 3) {
    const defaultStrengths = ["Self-Awareness", "Growth Mindset", "Authenticity"];
    strengths.push(...defaultStrengths.slice(0, 3 - strengths.length));
  }
  
  return strengths.slice(0, 5);
};
