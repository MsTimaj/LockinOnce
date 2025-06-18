
export interface EmotionalCapacityResults {
  stressManagement: string;
  emotionalSupport: string;
  selfAwareness: string;
  empathy: string;
  resilience: string;
  overallMaturity: string;
  insights: string[];
  strengths: string[];
  growthAreas: string[];
}

const SCORING_WEIGHTS = {
  emotionally_mature: { stress: 3, support: 3, awareness: 3, empathy: 3, resilience: 3 },
  self_aware_working: { stress: 2, support: 2, awareness: 3, empathy: 2, resilience: 2 },
  emotionally_reactive: { stress: 1, support: 1, awareness: 1, empathy: 1, resilience: 1 },
  empathetic_patient: { stress: 2, support: 3, awareness: 2, empathy: 3, resilience: 2 },
  caring_but_pushy: { stress: 2, support: 2, awareness: 2, empathy: 2, resilience: 2 },
  emotionally_distant: { stress: 2, support: 1, awareness: 1, empathy: 1, resilience: 2 },
  conflict_mature: { stress: 3, support: 2, awareness: 3, empathy: 2, resilience: 3 },
  conflict_reactive: { stress: 1, support: 1, awareness: 1, empathy: 1, resilience: 1 },
  conflict_learning: { stress: 2, support: 2, awareness: 2, empathy: 2, resilience: 2 },
  stress_resilient: { stress: 3, support: 2, awareness: 2, empathy: 2, resilience: 3 },
  stress_aware: { stress: 2, support: 2, awareness: 3, empathy: 2, resilience: 2 },
  stress_overwhelmed: { stress: 1, support: 1, awareness: 1, empathy: 1, resilience: 1 },
  disappointment_healthy: { stress: 2, support: 2, awareness: 3, empathy: 2, resilience: 2 },
  disappointment_sensitive: { stress: 2, support: 2, awareness: 2, empathy: 3, resilience: 1 },
  disappointment_extreme: { stress: 1, support: 1, awareness: 1, empathy: 1, resilience: 1 },
  naturally_supportive: { stress: 2, support: 3, awareness: 2, empathy: 3, resilience: 2 },
  caring_but_directive: { stress: 2, support: 2, awareness: 2, empathy: 2, resilience: 2 },
  support_avoidant: { stress: 2, support: 1, awareness: 1, empathy: 1, resilience: 2 },
  resilient_learner: { stress: 2, support: 2, awareness: 3, empathy: 2, resilience: 3 },
  cautious_recoverer: { stress: 2, support: 2, awareness: 2, empathy: 2, resilience: 2 },
  recovery_struggles: { stress: 1, support: 1, awareness: 1, empathy: 1, resilience: 1 },
  emotionally_stable: { stress: 3, support: 2, awareness: 2, empathy: 2, resilience: 2 },
  empathetic_but_affected: { stress: 1, support: 2, awareness: 2, empathy: 3, resilience: 1 },
  emotionally_reactive_moods: { stress: 1, support: 1, awareness: 1, empathy: 1, resilience: 1 }
};

export function calculateEmotionalCapacityResults(answers: Record<number, string>): EmotionalCapacityResults {
  const scores = {
    stress: 0,
    support: 0,
    awareness: 0,
    empathy: 0,
    resilience: 0
  };

  let totalAnswers = 0;

  // Calculate weighted scores
  Object.values(answers).forEach(answer => {
    const weights = SCORING_WEIGHTS[answer as keyof typeof SCORING_WEIGHTS];
    if (weights) {
      scores.stress += weights.stress;
      scores.support += weights.support;
      scores.awareness += weights.awareness;
      scores.empathy += weights.empathy;
      scores.resilience += weights.resilience;
      totalAnswers++;
    }
  });

  // Normalize scores
  const avgStress = scores.stress / totalAnswers;
  const avgSupport = scores.support / totalAnswers;
  const avgAwareness = scores.awareness / totalAnswers;
  const avgEmpathy = scores.empathy / totalAnswers;
  const avgResilience = scores.resilience / totalAnswers;
  const overallAvg = (avgStress + avgSupport + avgAwareness + avgEmpathy + avgResilience) / 5;

  const getLevel = (score: number): string => {
    if (score >= 2.5) return "high";
    if (score >= 1.8) return "moderate";
    return "developing";
  };

  const stressManagement = getLevel(avgStress);
  const emotionalSupport = getLevel(avgSupport);
  const selfAwareness = getLevel(avgAwareness);
  const empathy = getLevel(avgEmpathy);
  const resilience = getLevel(avgResilience);
  const overallMaturity = getLevel(overallAvg);

  // Generate insights based on patterns
  const insights: string[] = [];
  const strengths: string[] = [];
  const growthAreas: string[] = [];

  if (avgStress >= 2.5) {
    strengths.push("Strong stress management - you handle pressure without it affecting your relationships");
  } else if (avgStress < 1.8) {
    growthAreas.push("Stress management - developing better coping strategies could improve your relationship stability");
  }

  if (avgSupport >= 2.5) {
    strengths.push("Natural emotional supporter - others likely feel heard and validated by you");
  } else if (avgSupport < 1.8) {
    growthAreas.push("Emotional support skills - learning to be present with others' emotions");
  }

  if (avgAwareness >= 2.5) {
    strengths.push("High self-awareness - you understand your emotional patterns and reactions");
  } else if (avgAwareness < 1.8) {
    growthAreas.push("Self-awareness - understanding your emotional triggers and patterns");
  }

  if (avgEmpathy >= 2.5) {
    strengths.push("Strong empathy - you naturally tune into others' emotional states");
  } else if (avgEmpathy < 1.8) {
    growthAreas.push("Empathy development - becoming more attuned to others' emotional needs");
  }

  if (avgResilience >= 2.5) {
    strengths.push("Emotional resilience - you bounce back well from relationship challenges");
  } else if (avgResilience < 1.8) {
    growthAreas.push("Emotional resilience - building your ability to recover from setbacks");
  }

  // Pattern-based insights
  if (overallAvg >= 2.3) {
    insights.push("Your behavioral patterns suggest strong emotional maturity - you're likely ready for the emotional demands of a serious relationship.");
  } else if (overallAvg >= 1.8) {
    insights.push("You show good emotional awareness with room for growth - you're developing the skills needed for deep partnership.");
  } else {
    insights.push("Your responses suggest you're in an active growth phase emotionally - focusing on emotional development could enhance your relationship readiness.");
  }

  if (avgAwareness > avgSupport + 0.5) {
    insights.push("You understand yourself well but may benefit from practicing emotional support skills with others.");
  }

  if (avgEmpathy > avgResilience + 0.5) {
    insights.push("Your high empathy is a strength, but building resilience will help you maintain emotional stability in relationships.");
  }

  return {
    stressManagement,
    emotionalSupport,
    selfAwareness,
    empathy,
    resilience,
    overallMaturity,
    insights,
    strengths,
    growthAreas
  };
}
