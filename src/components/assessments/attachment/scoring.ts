
import { AttachmentStyleResults } from "./types";

export const calculateAttachmentResults = (answers: Record<number, string>): AttachmentStyleResults => {
  const scores = {
    secure: 0,
    anxious: 0,
    avoidant: 0,
    disorganized: 0
  };

  // Count responses for each attachment style
  Object.values(answers).forEach(answer => {
    if (answer && scores.hasOwnProperty(answer)) {
      scores[answer as keyof typeof scores]++;
    }
  });

  console.log('Raw attachment scores:', scores);
  
  // Calculate total responses to get percentages
  const totalResponses = Object.values(scores).reduce((sum, score) => sum + score, 0);
  
  // Convert to percentages for more nuanced analysis
  const percentageScores = {
    secure: totalResponses > 0 ? Math.round((scores.secure / totalResponses) * 100) : 0,
    anxious: totalResponses > 0 ? Math.round((scores.anxious / totalResponses) * 100) : 0,
    avoidant: totalResponses > 0 ? Math.round((scores.avoidant / totalResponses) * 100) : 0,
    disorganized: totalResponses > 0 ? Math.round((scores.disorganized / totalResponses) * 100) : 0
  };

  console.log('Percentage attachment scores:', percentageScores);

  // Determine dominant style with enhanced tie-breaking logic
  let dominantStyle = Object.entries(scores).reduce((a, b) => 
    scores[a[0] as keyof typeof scores] > scores[b[0] as keyof typeof scores] ? a : b
  )[0];

  // Handle ties with more sophisticated logic
  const maxScore = Math.max(...Object.values(scores));
  const tiedStyles = Object.entries(scores).filter(([, score]) => score === maxScore);
  
  if (tiedStyles.length > 1) {
    console.log('Tie detected between styles:', tiedStyles.map(([style]) => style));
    
    // Enhanced tie-breaking considering psychological research:
    // 1. If secure is tied, prefer secure (most common and stable)
    // 2. If anxious and avoidant are tied, consider disorganized (conflicting patterns)
    // 3. Population-based preference order: secure > anxious > avoidant > disorganized
    
    const tiedStyleNames = tiedStyles.map(([style]) => style);
    
    if (tiedStyleNames.includes('secure')) {
      dominantStyle = 'secure';
    } else if (tiedStyleNames.includes('anxious') && tiedStyleNames.includes('avoidant')) {
      // Anxious-avoidant tie suggests internal conflict (disorganized tendency)
      dominantStyle = 'disorganized';
    } else {
      // Use population frequency as tie-breaker
      const styleOrder = ['secure', 'anxious', 'avoidant', 'disorganized'];
      dominantStyle = tiedStyles
        .map(([style]) => style)
        .sort((a, b) => styleOrder.indexOf(a) - styleOrder.indexOf(b))[0];
    }
    
    console.log('Tie resolved to:', dominantStyle);
  }

  // Return both raw scores and percentages for more detailed analysis
  return {
    secure: scores.secure,
    anxious: scores.anxious,
    avoidant: scores.avoidant,
    disorganized: scores.disorganized,
    dominantStyle,
    percentages: percentageScores,
    totalResponses
  };
};
