
import { BirthOrderResults } from "@/components/assessments/BirthOrderAssessment";
import { CompatibilityResult } from "./types";

export const calculateBirthOrderCompatibility = (
  user: BirthOrderResults | null,
  match: BirthOrderResults | null
): CompatibilityResult => {
  if (!user || !match) return { score: 50, explanation: "Incomplete birth order data" };

  // Research-based birth order compatibility matrix
  const birthOrderMatrix: Record<string, Record<string, { score: number; explanation: string }>> = {
    oldest: {
      oldest: { 
        score: 65, 
        explanation: "Two firstborns can create a power struggle dynamic, but shared responsibility and leadership qualities can work well if both learn to compromise and take turns leading in different areas." 
      },
      middle: { 
        score: 88, 
        explanation: "Excellent pairing! Oldest provides structure and direction that middle children appreciate, while middle child's flexibility and social skills complement firstborn's more rigid approach." 
      },
      youngest: { 
        score: 92, 
        explanation: "Classic complementary match! Oldest child's natural caretaking and leadership pairs beautifully with youngest child's charm and acceptance of being cared for. Natural roles feel comfortable." 
      },
      only: { 
        score: 70, 
        explanation: "Good compatibility as both understand responsibility and high expectations. Only child's independence balances oldest child's tendency to take charge, though both may need to work on flexibility." 
      }
    },
    middle: {
      oldest: { 
        score: 88, 
        explanation: "Excellent pairing! Middle child's diplomatic nature and flexibility works well with oldest child's leadership style. Middle child feels appreciated for their unique perspective." 
      },
      middle: { 
        score: 85, 
        explanation: "Very compatible! Both middle children understand compromise, negotiation, and the importance of harmony. They're both flexible and skilled at seeing multiple perspectives." 
      },
      youngest: { 
        score: 80, 
        explanation: "Good match with mutual understanding of not being the 'first' in family hierarchy. Middle child's responsibility balances youngest child's free spirit, creating a harmonious dynamic." 
      },
      only: { 
        score: 75, 
        explanation: "Interesting dynamic where middle child's social skills help only child connect with others, while only child's confidence supports middle child's sometimes wavering self-esteem." 
      }
    },
    youngest: {
      oldest: { 
        score: 92, 
        explanation: "Perfect complementary pairing! Youngest child's charm and easygoing nature pairs beautifully with oldest child's protective and guiding instincts. Very natural relationship roles." 
      },
      middle: { 
        score: 80, 
        explanation: "Solid compatibility! Middle child's flexibility and diplomatic skills work well with youngest child's spontaneous nature. Both understand not being the primary focus in family." 
      },
      youngest: { 
        score: 60, 
        explanation: "Can work but requires conscious effort. Two youngest children may both expect to be taken care of, leading to issues with responsibility. However, shared playfulness and optimism are strengths." 
      },
      only: { 
        score: 72, 
        explanation: "Interesting balance where only child's self-reliance complements youngest child's social ease. Only child may enjoy taking care of youngest, while youngest brings fun and spontaneity." 
      }
    },
    only: {
      oldest: { 
        score: 70, 
        explanation: "Compatible pairing of two responsible, achievement-oriented personalities. Both understand high expectations and perfectionism, though they may need to work on relaxing together." 
      },
      middle: { 
        score: 75, 
        explanation: "Good balance where only child's direct approach complements middle child's diplomatic skills. Middle child helps only child understand group dynamics and compromise." 
      },
      youngest: { 
        score: 72, 
        explanation: "Complementary match where only child's maturity and responsibility balances youngest child's playful, carefree approach. Can create a protective, nurturing dynamic." 
      },
      only: { 
        score: 68, 
        explanation: "Both understand independence and may need to work on interdependence. Shared understanding of parental expectations and self-reliance, but may struggle with compromise and sharing space." 
      }
    }
  };

  // Get family size impact
  const getSizeFactor = (size1: string, size2: string): number => {
    // Similar family sizes often mean similar dynamics
    if (size1 === size2) return 5;
    // Large family + small family can work well (different perspectives)
    if ((size1 === 'large' && size2 === 'small') || (size1 === 'small' && size2 === 'large')) return 3;
    return 0;
  };

  // Get parenting style compatibility
  const getParentingFactor = (style1: string, style2: string): number => {
    // Similar parenting backgrounds often create understanding
    if (style1 === style2) return 3;
    // Complementary styles can also work well
    const complementary = [
      ['warm_supportive', 'structured_strict'],
      ['permissive_relaxed', 'structured_strict']
    ];
    const isComplementary = complementary.some(([a, b]) => 
      (style1 === a && style2 === b) || (style1 === b && style2 === a)
    );
    return isComplementary ? 2 : 0;
  };

  const baseResult = birthOrderMatrix[user.birthOrder]?.[match.birthOrder];
  if (!baseResult) return { score: 50, explanation: "Unable to assess birth order compatibility" };

  // Apply modifiers
  const sizeFactor = getSizeFactor(user.familySize, match.familySize);
  const parentingFactor = getParentingFactor(user.parentalDynamics, match.parentalDynamics);
  
  const adjustedScore = Math.min(95, baseResult.score + sizeFactor + parentingFactor);

  return {
    score: adjustedScore,
    explanation: baseResult.explanation
  };
};
