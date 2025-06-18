
import { AttachmentStyleResults } from "@/components/assessments/AttachmentStyleAssessment";
import { CompatibilityResult } from "./types";

export const calculateAttachmentCompatibility = (
  user: AttachmentStyleResults | null,
  match: AttachmentStyleResults | null
): CompatibilityResult => {
  if (!user || !match) return { score: 50, explanation: "Incomplete attachment data" };

  // Research-based compatibility matrix with nuanced explanations
  const compatibilityMatrix: Record<string, Record<string, { score: number; explanation: string }>> = {
    secure: { 
      secure: { 
        score: 92, 
        explanation: "Two secure partners create exceptional relationship stability. Both can communicate needs clearly, handle conflict constructively, and support each other's growth while maintaining individual identity. This pairing has the highest relationship satisfaction rates." 
      },
      anxious: { 
        score: 85, 
        explanation: "Secure partner's consistency and emotional availability naturally calms anxious attachment fears. The secure partner provides the reliability anxious attachment craves, while anxious partner's emotional expressiveness can deepen the secure partner's emotional range." 
      },
      avoidant: { 
        score: 75, 
        explanation: "Secure partner's patience and non-threatening approach helps avoidant partner feel safe to gradually open up. The secure partner doesn't pursue anxiously, respecting avoidant's need for space while maintaining connection. Growth happens slowly but steadily." 
      },
      disorganized: { 
        score: 68, 
        explanation: "Secure partner provides crucial emotional regulation and consistency. However, disorganized attachment's unpredictability can challenge even secure partners. Success requires the secure partner to maintain strong boundaries while offering patient support." 
      }
    },
    anxious: { 
      secure: { 
        score: 85, 
        explanation: "Secure partner's emotional consistency provides the reassurance anxious attachment needs for healing. The secure partner doesn't get overwhelmed by anxious emotions and can provide calm, steady support while gently encouraging self-reliance." 
      },
      anxious: { 
        score: 45, 
        explanation: "Two anxiously attached partners can create an intense but unstable dynamic. Both may compete for reassurance, amplify each other's fears, and struggle with emotional regulation. However, shared understanding of attachment needs can create deep empathy if both work on self-soothing." 
      },
      avoidant: { 
        score: 25, 
        explanation: "This creates the classic 'anxious-avoidant trap.' Anxious partner's pursuit of closeness triggers avoidant partner's withdrawal, which intensifies anxious partner's fear of abandonment. Breaking this cycle requires significant conscious effort and often professional support." 
      },
      disorganized: { 
        score: 38, 
        explanation: "Both styles involve emotional dysregulation, which can create chaotic relationship dynamics. Anxious partner seeks consistency that disorganized partner struggles to provide, while disorganized partner's unpredictability triggers anxious partner's abandonment fears." 
      }
    },
    avoidant: { 
      secure: { 
        score: 75, 
        explanation: "Secure partner respects avoidant's need for independence while providing gentle, consistent connection. The secure partner doesn't take avoidant behaviors personally and can slowly help avoidant partner feel safe with emotional intimacy." 
      },
      anxious: { 
        score: 25, 
        explanation: "Anxious partner's emotional needs and pursuit of closeness can feel overwhelming to avoidant partner, leading to withdrawal. This triggers anxious partner's abandonment fears, creating a painful pursue-withdraw cycle that's difficult to break without intervention." 
      },
      avoidant: { 
        score: 60, 
        explanation: "Two avoidant partners respect each other's independence and don't pressure for emotional intimacy. While this reduces conflict, it can also limit emotional depth and growth. The relationship may feel stable but lack the vulnerability needed for deeper connection." 
      },
      disorganized: { 
        score: 48, 
        explanation: "Avoidant partner's emotional withdrawal may initially seem safe to disorganized partner, but disorganized partner's unpredictable emotional needs can trigger more avoidant behavior, leading to increased distance and misunderstanding." 
      }
    },
    disorganized: { 
      secure: { 
        score: 68, 
        explanation: "Secure partner's emotional regulation and consistency offers healing potential for disorganized attachment. However, disorganized partner's internal chaos and unpredictable behaviors can challenge even secure partners. Success requires patience, boundaries, and often therapeutic support." 
      },
      anxious: { 
        score: 38, 
        explanation: "Both partners struggle with emotional regulation, which can amplify chaos and instability. Anxious partner's need for consistency conflicts with disorganized partner's unpredictable patterns, creating mutual triggering and escalation without strong external support." 
      },
      avoidant: { 
        score: 48, 
        explanation: "Disorganized partner's emotional unpredictability can push avoidant partner into deeper withdrawal for self-protection. This leaves disorganized partner feeling abandoned, potentially intensifying their chaotic patterns and creating more distance." 
      },
      disorganized: { 
        score: 35, 
        explanation: "Two disorganized attachment styles can create significant relationship turbulence with competing needs for closeness and distance. However, shared understanding of trauma and emotional chaos can foster deep empathy if both partners are committed to healing work." 
      }
    }
  };

  const result = compatibilityMatrix[user.dominantStyle]?.[match.dominantStyle];
  return result || { score: 50, explanation: "Unable to assess attachment compatibility with available data" };
};
