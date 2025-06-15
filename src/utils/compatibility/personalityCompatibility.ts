
import { PersonalityResults } from "@/components/assessments/PersonalityAssessment";
import { CompatibilityResult } from "./types";

export const calculatePersonalityCompatibility = (
  user: PersonalityResults | null,
  match: PersonalityResults | null
): CompatibilityResult => {
  if (!user || !match) return { score: 50, explanation: "Incomplete personality data" };

  let score = 40; // Base compatibility
  let explanationParts: string[] = [];
  
  // Energy orientation compatibility (research shows complementary works well)
  const userIsIntrovert = (user.introversion || 50) > (user.extroversion || 50);
  const matchIsIntrovert = (match.introversion || 50) > (match.extroversion || 50);
  
  if (userIsIntrovert !== matchIsIntrovert) {
    score += 30; // Complementary introvert-extrovert scores highest
    explanationParts.push("Complementary energy styles - introvert provides depth and reflection while extrovert brings social connection and external stimulation");
  } else if (userIsIntrovert === matchIsIntrovert && userIsIntrovert) {
    score += 22;
    explanationParts.push("Both introverts create peaceful, deep connection with shared need for quiet intimacy and meaningful conversation");
  } else {
    score += 20;
    explanationParts.push("Both extroverts energize each other through shared love of social activities and external engagement");
  }

  // Decision-making compatibility (similar works better for core values)
  const userIsThinking = (user.thinking || 50) > (user.feeling || 50);
  const matchIsThinking = (match.thinking || 50) > (match.feeling || 50);
  
  if (userIsThinking === matchIsThinking) {
    score += 25;
    if (userIsThinking) {
      explanationParts.push("Both approach decisions logically, creating clear communication and aligned problem-solving methods");
    } else {
      explanationParts.push("Both prioritize emotions and values, fostering deep empathy and heart-centered decision making");
    }
  } else {
    score += 12;
    explanationParts.push("Different decision-making styles require conscious effort to bridge logical and emotional perspectives");
  }

  // Intensity compatibility bonus
  const userIntensity = Math.abs((user.introversion || 50) - 50) + Math.abs((user.thinking || 50) - 50);
  const matchIntensity = Math.abs((match.introversion || 50) - 50) + Math.abs((match.thinking || 50) - 50);
  const intensityDiff = Math.abs(userIntensity - matchIntensity);
  
  if (intensityDiff < 20) {
    score += 5;
    explanationParts.push("Similar personality intensity levels create natural understanding and rhythm");
  }

  return { 
    score: Math.min(score, 100), 
    explanation: explanationParts.join("; ") 
  };
};
