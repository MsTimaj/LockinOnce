
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
    scores[answer as keyof typeof scores]++;
  });

  // Determine dominant style with tie-breaking logic
  let dominantStyle = Object.entries(scores).reduce((a, b) => 
    scores[a[0] as keyof typeof scores] > scores[b[0] as keyof typeof scores] ? a : b
  )[0];

  // Handle ties by preferring more common styles in population
  const maxScore = Math.max(...Object.values(scores));
  const tiedStyles = Object.entries(scores).filter(([, score]) => score === maxScore);
  
  if (tiedStyles.length > 1) {
    // Population-based tie-breaking: secure > anxious > avoidant > disorganized
    const styleOrder = ['secure', 'anxious', 'avoidant', 'disorganized'];
    dominantStyle = tiedStyles
      .map(([style]) => style)
      .sort((a, b) => styleOrder.indexOf(a) - styleOrder.indexOf(b))[0];
  }

  return {
    ...scores,
    dominantStyle
  };
};
