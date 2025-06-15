import { ComprehensiveAssessmentResults, RelationshipReadinessScore } from "./types";

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

const calculateEmotionalReadiness = (results: ComprehensiveAssessmentResults): number => {
  let score = 50; // Base score
  let factors = 0;

  // Emotional Capacity Assessment (40% weight)
  if (results.emotionalCapacity) {
    const ec = results.emotionalCapacity;
    let emotionalScore = 0;
    let emotionalFactors = 0;

    if (ec.stressManagement) {
      emotionalScore += ec.stressManagement === 'healthy_coping' ? 95 : 
                       ec.stressManagement === 'mostly_manage' ? 75 : 
                       ec.stressManagement === 'some_difficulty' ? 55 : 35;
      emotionalFactors++;
    }

    if (ec.emotionalSupport) {
      emotionalScore += ec.emotionalSupport === 'natural_supporter' ? 90 :
                       ec.emotionalSupport === 'care_but_unsure' ? 70 : 
                       ec.emotionalSupport === 'struggle_supporting' ? 45 : 30;
      emotionalFactors++;
    }

    if (ec.selfAwareness) {
      emotionalScore += ec.selfAwareness === 'highly_aware' ? 95 :
                       ec.selfAwareness === 'moderately_aware' ? 75 : 
                       ec.selfAwareness === 'somewhat_aware' ? 55 : 35;
      emotionalFactors++;
    }

    if (ec.empathy) {
      emotionalScore += ec.empathy === 'highly_empathetic' ? 90 :
                       ec.empathy === 'moderate_empathy' ? 70 : 
                       ec.empathy === 'low_empathy' ? 40 : 25;
      emotionalFactors++;
    }

    if (ec.resilience) {
      emotionalScore += ec.resilience === 'strong_resilience' ? 90 :
                       ec.resilience === 'moderate_resilience' ? 70 : 
                       ec.resilience === 'low_resilience' ? 45 : 25;
      emotionalFactors++;
    }

    if (emotionalFactors > 0) {
      score += (emotionalScore / emotionalFactors) * 0.4;
      factors += 0.4;
    }
  }

  // Attachment Style (35% weight)
  if (results.attachmentStyle) {
    const attachmentScore = results.attachmentStyle.dominantStyle === 'secure' ? 95 : 
                           results.attachmentStyle.dominantStyle === 'anxious' ? 60 :
                           results.attachmentStyle.dominantStyle === 'avoidant' ? 50 : 40;
    score += attachmentScore * 0.35;
    factors += 0.35;
  }

  // Love Languages awareness (15% weight) - indicates emotional intelligence
  if (results.loveLanguages) {
    let loveLanguageScore = 70; // Base for having awareness
    
    // Higher score if they understand multiple languages
    const ll = results.loveLanguages;
    const languageCount = [ll.primaryLoveLanguage, ll.secondaryLoveLanguage].filter(val => val).length;
    loveLanguageScore += Math.min(languageCount * 10, 25);
    
    score += loveLanguageScore * 0.15;
    factors += 0.15;
  }

  // Values clarity (10% weight) - clear values indicate emotional maturity
  if (results.values) {
    const values = results.values;
    let valuesScore = 60;
    
    // Score based on how defined their values are
    const definedValues = Object.values(values).filter(val => val && val !== 'neutral').length;
    valuesScore += Math.min(definedValues * 4, 30);
    
    score += valuesScore * 0.1;
    factors += 0.1;
  }

  // Normalize score if we have partial data
  if (factors > 0 && factors < 1) {
    score = score / factors;
  }

  return Math.max(20, Math.min(100, Math.round(score)));
};

const calculateCommunicationSkills = (results: ComprehensiveAssessmentResults): number => {
  let score = 50;
  let factors = 0;

  // Communication Style Assessment (50% weight)
  if (results.communicationStyle) {
    const cs = results.communicationStyle;
    let commScore = 0;
    let commFactors = 0;

    if (cs.communicationStyle) {
      commScore += cs.communicationStyle === 'direct_and_kind' ? 90 :
                   cs.communicationStyle === 'gentle_and_indirect' ? 75 :
                   cs.communicationStyle === 'very_direct' ? 60 : 40;
      commFactors++;
    }

    if (cs.conflictResolution) {
      commScore += cs.conflictResolution === 'collaborate_solutions' ? 95 :
                   cs.conflictResolution === 'compromise_meet_middle' ? 80 :
                   cs.conflictResolution === 'avoid_conflict' ? 45 : 35;
      commFactors++;
    }

    if (cs.expressionStyle) {
      commScore += cs.expressionStyle === 'open_and_honest' ? 90 :
                   cs.expressionStyle === 'thoughtful_measured' ? 85 :
                   cs.expressionStyle === 'reserved_private' ? 55 : 40;
      commFactors++;
    }

    if (cs.listeningStyle) {
      commScore += cs.listeningStyle === 'active_empathetic' ? 95 :
                   cs.listeningStyle === 'attentive_engaged' ? 80 :
                   cs.listeningStyle === 'selective_focused' ? 55 : 35;
      commFactors++;
    }

    if (commFactors > 0) {
      score += (commScore / commFactors) * 0.5;
      factors += 0.5;
    }
  }

  // Emotional Capacity - Communication aspects (30% weight)
  if (results.emotionalCapacity?.emotionalSupport) {
    const supportScore = results.emotionalCapacity.emotionalSupport === 'natural_supporter' ? 90 :
                        results.emotionalCapacity.emotionalSupport === 'care_but_unsure' ? 70 : 45;
    score += supportScore * 0.3;
    factors += 0.3;
  }

  // Love Languages - indicates communication awareness (20% weight)
  if (results.loveLanguages) {
    let langScore = 65;
    // Check if they value verbal communication
    if (results.loveLanguages.primaryLoveLanguage === 'words_of_affirmation' || 
        results.loveLanguages.secondaryLoveLanguage === 'words_of_affirmation') {
      langScore += 15; // Values verbal communication
    }
    
    score += langScore * 0.2;
    factors += 0.2;
  }

  // Normalize score if we have partial data
  if (factors > 0 && factors < 1) {
    score = score / factors;
  }

  return Math.max(25, Math.min(100, Math.round(score)));
};

const calculateSelfAwareness = (results: ComprehensiveAssessmentResults): number => {
  let score = 50;
  let factors = 0;

  // Emotional Capacity - Self Awareness (30% weight)
  if (results.emotionalCapacity?.selfAwareness) {
    const awarenessScore = results.emotionalCapacity.selfAwareness === 'highly_aware' ? 95 :
                          results.emotionalCapacity.selfAwareness === 'moderately_aware' ? 75 : 50;
    score += awarenessScore * 0.3;
    factors += 0.3;
  }

  // Personality Assessment completion indicates self-reflection (25% weight)
  if (results.personality) {
    let personalityScore = 70; // Base for completing personality assessment
    
    // Balanced personality traits often indicate better self-awareness
    const traits = [
      results.personality.introversion || 50,
      results.personality.extroversion || 50,
      results.personality.thinking || 50,
      results.personality.feeling || 50
    ];
    
    // Less extreme scores often indicate better self-understanding
    const extremeness = traits.reduce((sum, trait) => sum + Math.abs(trait - 50), 0) / traits.length;
    personalityScore += Math.max(0, 25 - extremeness * 0.5);
    
    score += personalityScore * 0.25;
    factors += 0.25;
  }

  // Values clarity (20% weight)
  if (results.values) {
    let valuesScore = 60;
    const definedValues = Object.values(results.values).filter(val => val && val !== 'neutral').length;
    valuesScore += Math.min(definedValues * 5, 35);
    
    score += valuesScore * 0.2;
    factors += 0.2;
  }

  // Life Goals clarity (15% weight)
  if (results.lifeGoals) {
    let goalsScore = 65;
    const definedGoals = Object.values(results.lifeGoals).filter(val => val && val !== 'neutral').length;
    goalsScore += Math.min(definedGoals * 4, 30);
    
    score += goalsScore * 0.15;
    factors += 0.15;
  }

  // Financial Values awareness (10% weight)
  if (results.financialValues) {
    let financialScore = 70;
    const definedFinancial = Object.values(results.financialValues).filter(val => val && val !== 'neutral').length;
    financialScore += Math.min(definedFinancial * 3, 25);
    
    score += financialScore * 0.1;
    factors += 0.1;
  }

  // Normalize score if we have partial data
  if (factors > 0 && factors < 1) {
    score = score / factors;
  }

  return Math.max(30, Math.min(100, Math.round(score)));
};

const calculateRelationshipGoals = (results: ComprehensiveAssessmentResults): number => {
  let score = 50;
  let factors = 0;

  // Relationship Intent (40% weight)
  if (results.relationshipIntent) {
    const ri = results.relationshipIntent;
    let intentScore = 0;
    let intentFactors = 0;

    // Use actual property names from RelationshipIntentResults
    if (ri.timeline) {
      intentScore += ri.timeline === 'within_year' ? 90 :
                    ri.timeline === '1_2_years' ? 85 :
                    ri.timeline === '2_3_years' ? 75 : 60;
      intentFactors++;
    }

    if (ri.commitment) {
      intentScore += ri.commitment === 'marriage' ? 95 :
                    ri.commitment === 'life_partnership' ? 85 :
                    ri.commitment === 'long_term_exclusive' ? 70 : 50;
      intentFactors++;
    }

    if (ri.familyPlanning) {
      intentScore += ri.familyPlanning === 'want_children' ? 85 :
                    ri.familyPlanning === 'maybe_children' ? 75 :
                    ri.familyPlanning === 'no_children' ? 80 : 60;
      intentFactors++;
    }

    if (ri.relocatation) { // Note: using the actual property name with typo
      intentScore += ri.relocatation === 'very_flexible' ? 85 :
                    ri.relocatation === 'somewhat_flexible' ? 75 :
                    ri.relocatation === 'location_committed' ? 65 : 50;
      intentFactors++;
    }

    if (intentFactors > 0) {
      score += (intentScore / intentFactors) * 0.4;
      factors += 0.4;
    }
  }

  // Life Goals alignment (30% weight)
  if (results.lifeGoals) {
    let goalsScore = 60;
    const definedGoals = Object.values(results.lifeGoals).filter(val => val && val !== 'neutral').length;
    goalsScore += Math.min(definedGoals * 5, 35);
    
    score += goalsScore * 0.3;
    factors += 0.3;
  }

  // Preferences clarity (20% weight) - shows intentionality
  if (results.preferences) {
    let prefScore = 70;
    
    // Having clear preferences shows intentionality
    if (results.preferences.mustHaves?.wantsChildren !== null) prefScore += 10;
    if (results.preferences.dealBreakers?.religion?.length > 0) prefScore += 5;
    if (results.preferences.dealBreakers?.lifestyle?.length > 0) prefScore += 5;
    if (results.preferences.mustHaves?.education?.length > 0) prefScore += 5;
    
    score += Math.min(prefScore, 95) * 0.2;
    factors += 0.2;
  }

  // Financial Values (10% weight) - indicates future planning
  if (results.financialValues) {
    let financialScore = 65;
    const definedFinancial = Object.values(results.financialValues).filter(val => val && val !== 'neutral').length;
    financialScore += Math.min(definedFinancial * 4, 30);
    
    score += financialScore * 0.1;
    factors += 0.1;
  }

  // Normalize score if we have partial data
  if (factors > 0 && factors < 1) {
    score = score / factors;
  }

  return Math.max(25, Math.min(100, Math.round(score)));
};

const calculateAttachmentSecurity = (results: ComprehensiveAssessmentResults): number => {
  let score = 50;

  if (results.attachmentStyle) {
    score = results.attachmentStyle.dominantStyle === 'secure' ? 90 :
            results.attachmentStyle.dominantStyle === 'anxious' ? 65 :
            results.attachmentStyle.dominantStyle === 'avoidant' ? 55 : 45;

    // Boost score based on emotional capacity
    if (results.emotionalCapacity?.resilience === 'strong_resilience') {
      score += 10;
    } else if (results.emotionalCapacity?.resilience === 'moderate_resilience') {
      score += 5;
    }

    // Factor in empathy for relationship security
    if (results.emotionalCapacity?.empathy === 'highly_empathetic') {
      score += 8;
    } else if (results.emotionalCapacity?.empathy === 'moderate_empathy') {
      score += 4;
    }
  }

  return Math.max(20, Math.min(100, Math.round(score)));
};

export const calculateRelationshipReadiness = (results: ComprehensiveAssessmentResults): RelationshipReadinessScore => {
  console.log('Calculating comprehensive relationship readiness from assessment results...');

  // Calculate each dimension with proper weighting
  const emotionalReadiness = calculateEmotionalReadiness(results);
  const communicationSkills = calculateCommunicationSkills(results);
  const selfAwareness = calculateSelfAwareness(results);
  const relationshipGoals = calculateRelationshipGoals(results);
  const attachmentSecurity = calculateAttachmentSecurity(results);

  console.log('Individual scores:', {
    emotionalReadiness,
    communicationSkills,
    selfAwareness,
    relationshipGoals,
    attachmentSecurity
  });

  // Weighted overall score
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

  console.log('Final readiness calculation:', { overall, scores, strengths: strengths.length, growthAreas: growthAreas.length });

  return {
    overall,
    breakdown: scores,
    strengths,
    growthAreas,
    personalizedStrategy,
    isReady: overall >= 70
  };
};
