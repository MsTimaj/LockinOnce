
import { MatchProfile } from "@/utils/compatibilityCalculator";

const createMatch = (
  id: string, 
  name: string, 
  age: number, 
  location: string, 
  bio: string, 
  photo: string,
  baseScores: Partial<{ attachment: number; personality: number; birthOrder: number }>
): MatchProfile => {
  const compatibilityScore = {
    attachment: baseScores.attachment || Math.floor(Math.random() * 30) + 70,
    personality: baseScores.personality || Math.floor(Math.random() * 30) + 70,
    birthOrder: baseScores.birthOrder || Math.floor(Math.random() * 30) + 70,
    values: Math.floor(Math.random() * 30) + 70,
    lifestyle: Math.floor(Math.random() * 30) + 70,
    overall: 0,
    breakdown: {
      emotional: Math.floor(Math.random() * 30) + 70,
      communication: Math.floor(Math.random() * 30) + 70,
      lifestyle: Math.floor(Math.random() * 30) + 70,
      goals: Math.floor(Math.random() * 30) + 70,
      intimacy: Math.floor(Math.random() * 30) + 70
    },
    explanations: {
      why_compatible: ["Strong emotional connection potential", "Complementary communication styles"],
      relationship_strengths: ["Deep understanding", "Mutual growth opportunities"],
      potential_challenges: ["Different pace preferences"]
    }
  };
  
  compatibilityScore.overall = Math.round(
    (compatibilityScore.attachment * 0.3 + 
     compatibilityScore.personality * 0.25 + 
     compatibilityScore.birthOrder * 0.2 + 
     compatibilityScore.values * 0.15 + 
     compatibilityScore.lifestyle * 0.1)
  );

  return {
    id,
    name,
    age,
    location,
    bio,
    photo,
    compatibilityScore,
    assessmentResults: {
      attachmentStyle: null,
      personality: null,
      birthOrder: null,
      relationshipIntent: null,
      emotionalCapacity: null,
      attractionLayer: null,
      physicalProximity: null,
      communicationStyle: null,
      lifeGoals: null,
      values: null,
      lifestyle: null,
      loveLanguages: null,
      financialValues: null,
    },
    connectionStatus: 'none' as const,
    lastActive: "2 hours ago"
  };
};

export const mockMatches: MatchProfile[] = [
  createMatch(
    "1",
    "Emma",
    28,
    "Downtown • 2 miles away",
    "Art curator who believes in deep connections and meaningful conversations. Looking for someone to explore galleries and life with.",
    "https://images.unsplash.com/photo-1494790108755-2616b612b190?w=150&h=150&fit=crop&crop=face",
    { attachment: 92, personality: 88, birthOrder: 85 }
  ),
  createMatch(
    "2", 
    "Sarah",
    26,
    "Midtown • 3 miles away",
    "Therapist passionate about personal growth and authentic relationships. Loves hiking, reading, and cozy coffee dates.",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    { attachment: 89, personality: 82, birthOrder: 78 }
  ),
  createMatch(
    "3",
    "Maya",
    30,
    "Uptown • 1 mile away", 
    "Software engineer with a love for travel and learning new cultures. Seeking a partner for life's adventures.",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    { attachment: 85, personality: 90, birthOrder: 82 }
  ),
  createMatch(
    "4",
    "Zoe",
    29,
    "Westside • 4 miles away",
    "Veterinarian who adores animals and nature. Looking for someone who shares my values of compassion and family.",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
    { attachment: 87, personality: 85, birthOrder: 88 }
  ),
  createMatch(
    "5",
    "Lily",
    27,
    "East End • 2 miles away",
    "Teacher and aspiring writer who believes in the power of stories. Ready to write our next chapter together.",
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=150&h=150&fit=crop&crop=face",
    { attachment: 83, personality: 87, birthOrder: 80 }
  )
];
