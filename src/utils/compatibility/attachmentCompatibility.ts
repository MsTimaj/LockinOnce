
import { AttachmentStyleResults } from "@/components/assessments/AttachmentStyleAssessment";
import { CompatibilityResult } from "./types";

export const calculateAttachmentCompatibility = (
  user: AttachmentStyleResults | null,
  match: AttachmentStyleResults | null
): CompatibilityResult => {
  if (!user || !match) return { score: 50, explanation: "Incomplete attachment data" };

  const userStyle = user.dominantStyle;
  const matchStyle = match.dominantStyle;

  console.log(`Calculating attachment compatibility: ${userStyle} + ${matchStyle}`);

  // Research-based attachment compatibility matrix
  // Based on adult attachment theory and empirical studies
  const compatibilityMatrix: Record<string, Record<string, { score: number; explanation: string }>> = {
    secure: {
      secure: { 
        score: 95, 
        explanation: "Two secure partners create the gold standard - emotional safety, effective communication, and mutual growth support" 
      },
      anxious: { 
        score: 85, 
        explanation: "Secure partner provides stability and reassurance that helps anxious partner feel safe and valued" 
      },
      avoidant: { 
        score: 80, 
        explanation: "Secure partner's patience and emotional availability can help avoidant partner slowly open up" 
      },
      disorganized: { 
        score: 75, 
        explanation: "Secure partner's consistency provides healing environment for disorganized attachment patterns" 
      }
    },
    anxious: {
      secure: { 
        score: 85, 
        explanation: "Secure partner's reliability and emotional attunement helps anxious partner develop greater security" 
      },
      anxious: { 
        score: 45, 
        explanation: "Two anxious partners may amplify each other's fears and create emotional volatility without conscious work" 
      },
      avoidant: { 
        score: 35, 
        explanation: "Classic anxious-avoidant trap - pursuit and distance cycle that escalates both partners' triggers" 
      },
      disorganized: { 
        score: 40, 
        explanation: "Both partners have significant attachment wounds that may trigger each other without professional support" 
      }
    },
    avoidant: {
      secure: { 
        score: 80, 
        explanation: "Secure partner's non-threatening emotional presence allows avoidant partner to gradually increase intimacy" 
      },
      anxious: { 
        score: 35, 
        explanation: "Avoidant withdrawal triggers anxious partner's abandonment fears, creating destructive pursue-distance cycle" 
      },
      avoidant: { 
        score: 60, 
        explanation: "Two avoidant partners may feel comfortable but risk emotional distance and lack of deep intimacy" 
      },
      disorganized: { 
        score: 45, 
        explanation: "Avoidant's emotional unavailability may trigger disorganized partner's chaos and fear patterns" 
      }
    },
    disorganized: {
      secure: { 
        score: 75, 
        explanation: "Secure partner's emotional regulation and consistency provides stabilizing influence for healing" 
      },
      anxious: { 
        score: 40, 
        explanation: "Disorganized unpredictability may intensify anxious partner's fear and hypervigilance" 
      },
      avoidant: { 
        score: 45, 
        explanation: "Disorganized emotional intensity may cause avoidant partner to withdraw further" 
      },
      disorganized: { 
        score: 35, 
        explanation: "Two disorganized partners may create chaotic emotional environment without professional intervention" 
      }
    }
  };

  const result = compatibilityMatrix[userStyle]?.[matchStyle] || { score: 50, explanation: "Unknown attachment combination" };
  
  console.log(`Attachment compatibility result: ${result.score}% - ${result.explanation}`);
  
  return result;
};
