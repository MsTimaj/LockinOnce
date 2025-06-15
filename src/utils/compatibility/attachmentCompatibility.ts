
import { AttachmentStyleResults } from "@/components/assessments/AttachmentStyleAssessment";
import { CompatibilityResult } from "./types";

export const calculateAttachmentCompatibility = (
  user: AttachmentStyleResults | null,
  match: AttachmentStyleResults | null
): CompatibilityResult => {
  if (!user || !match) return { score: 50, explanation: "Incomplete attachment data" };

  // Enhanced compatibility matrix based on attachment research
  const compatibilityMatrix: Record<string, Record<string, { score: number; explanation: string }>> = {
    secure: { 
      secure: { 
        score: 95, 
        explanation: "Two secure partners create the gold standard - high trust, effective communication, and emotional availability form an exceptionally stable foundation" 
      },
      anxious: { 
        score: 88, 
        explanation: "Secure partner's consistency and emotional availability naturally soothes anxious attachment fears, creating growth-oriented dynamic" 
      },
      avoidant: { 
        score: 78, 
        explanation: "Secure partner's patience and non-threatening approach can gradually help avoidant partner feel safe to be vulnerable" 
      },
      disorganized: { 
        score: 70, 
        explanation: "Secure partner provides crucial stability, though disorganized patterns may require additional therapeutic support for optimal functioning" 
      }
    },
    anxious: { 
      secure: { 
        score: 88, 
        explanation: "Secure partner's reliability and emotional consistency provides the reassurance anxious attachment craves for healing and growth" 
      },
      anxious: { 
        score: 55, 
        explanation: "Both partners' activation systems can amplify each other's fears, though shared emotional intensity can create deep bonds with good communication skills" 
      },
      avoidant: { 
        score: 35, 
        explanation: "Classic anxious-avoidant trap: anxious pursuit triggers avoidant withdrawal, creating painful cycle without conscious intervention" 
      },
      disorganized: { 
        score: 48, 
        explanation: "Both styles involve emotional dysregulation that can trigger each other, requiring significant self-awareness and coping strategies" 
      }
    },
    avoidant: { 
      secure: { 
        score: 78, 
        explanation: "Secure partner respects avoidant's need for space while gently encouraging emotional intimacy at a comfortable pace" 
      },
      anxious: { 
        score: 35, 
        explanation: "Avoidant's emotional distance activates anxious partner's abandonment fears, often leading to pursue-withdraw cycles" 
      },
      avoidant: { 
        score: 68, 
        explanation: "Mutual respect for independence and low emotional demands, though may struggle with deeper intimacy without intentional work" 
      },
      disorganized: { 
        score: 52, 
        explanation: "Avoidant's withdrawal may feel safer initially, but disorganized partner's unpredictability can trigger more distancing" 
      }
    },
    disorganized: { 
      secure: { 
        score: 70, 
        explanation: "Secure partner's emotional regulation and consistency offers healing opportunity, though progress may be gradual and requires patience" 
      },
      anxious: { 
        score: 48, 
        explanation: "Both experience emotional flooding and dysregulation, which can amplify chaos without strong external support systems" 
      },
      avoidant: { 
        score: 52, 
        explanation: "Disorganized partner's inconsistency may push avoidant partner further into withdrawal, limiting emotional connection" 
      },
      disorganized: { 
        score: 42, 
        explanation: "Two dysregulated systems can create significant turbulence, though shared understanding of trauma may foster deep empathy" 
      }
    }
  };

  const result = compatibilityMatrix[user.dominantStyle]?.[match.dominantStyle];
  return result || { score: 50, explanation: "Unable to assess attachment compatibility" };
};
