
import { BirthOrderResults } from "@/components/assessments/BirthOrderAssessment";
import { CompatibilityResult } from "./types";

export const calculateBirthOrderCompatibility = (
  user: BirthOrderResults | null,
  match: BirthOrderResults | null
): CompatibilityResult => {
  if (!user || !match) return { score: 50, explanation: "Incomplete birth order data" };

  // Research-based birth order compatibility matrix
  const compatibilityMatrix: Record<string, Record<string, { score: number; explanation: string }>> = {
    oldest: { 
      youngest: { 
        score: 92, 
        explanation: "Classic high-compatibility pairing - oldest's natural leadership meshes perfectly with youngest's comfort being guided and cared for" 
      },
      middle: { 
        score: 80, 
        explanation: "Oldest provides clear direction while middle child's diplomatic skills and flexibility complement the partnership beautifully" 
      },
      only: { 
        score: 75, 
        explanation: "Both comfortable with responsibility and high achievement, though may need to negotiate leadership roles consciously" 
      },
      oldest: { 
        score: 62, 
        explanation: "Two natural leaders can create power struggles, but mutual respect for competence and shared responsibility ethic build strong foundation" 
      }
    },
    middle: { 
      middle: { 
        score: 88, 
        explanation: "Both excel at compromise and seeing multiple perspectives - natural peacemakers who create harmonious, balanced relationships" 
      },
      oldest: { 
        score: 80, 
        explanation: "Middle child's adaptability and conflict-resolution skills perfectly complement oldest's leadership and decision-making confidence" 
      },
      youngest: { 
        score: 76, 
        explanation: "Middle child's nurturing nature balances youngest's need for attention while youngest brings playfulness to the relationship" 
      },
      only: { 
        score: 72, 
        explanation: "Middle child's social skills and flexibility help only child learn collaboration while gaining from their focus and determination" 
      }
    },
    youngest: { 
      oldest: { 
        score: 92, 
        explanation: "Ideal complementary match - youngest's spontaneity and charm perfectly balanced by oldest's stability and protective instincts" 
      },
      only: { 
        score: 78, 
        explanation: "Youngest's social energy and creativity beautifully complement only child's focus and independence, creating dynamic balance" 
      },
      middle: { 
        score: 76, 
        explanation: "Middle child provides emotional stability and patience while youngest brings excitement and helps middle child feel special" 
      },
      youngest: { 
        score: 58, 
        explanation: "Both may expect partner to take charge and make decisions - requires conscious development of leadership skills by one partner" 
      }
    },
    only: { 
      only: { 
        score: 85, 
        explanation: "Shared independence and self-sufficiency create respect-based relationship with mutual understanding of alone time needs" 
      },
      youngest: { 
        score: 78, 
        explanation: "Only child's maturity and focus provide grounding for youngest's energy while learning spontaneity and social ease" 
      },
      oldest: { 
        score: 75, 
        explanation: "Both comfortable leading and taking responsibility - success depends on dividing domains and respecting each other's expertise" 
      },
      middle: { 
        score: 72, 
        explanation: "Only child learns valuable collaboration skills from middle child's diplomatic nature while providing decisiveness and direction" 
      }
    }
  };

  const result = compatibilityMatrix[user.birthOrder]?.[match.birthOrder];
  return result || { score: 50, explanation: "Unable to assess birth order compatibility" };
};
