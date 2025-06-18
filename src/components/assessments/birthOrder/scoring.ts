
export interface BirthOrderResults {
  birthOrder: string;
  familySize: string;
  parentalDynamics: string;
  siblingGap: string;
}

export const calculateBirthOrderResults = (answers: Record<number, string>): BirthOrderResults => {
  const scores = {
    oldest: 0,
    middle: 0,
    youngest: 0,
    only: 0
  };

  // Count responses for each birth order type
  Object.values(answers).forEach(answer => {
    if (answer && scores.hasOwnProperty(answer)) {
      scores[answer as keyof typeof scores]++;
    }
  });

  console.log('Raw birth order scores:', scores);

  // Determine dominant birth order pattern
  const dominantOrder = Object.entries(scores).reduce((a, b) => 
    scores[a[0] as keyof typeof scores] > scores[b[0] as keyof typeof scores] ? a : b
  )[0];

  // Map behavioral patterns to family structure insights
  const familySize = dominantOrder === 'only' ? 'small' : 
                   dominantOrder === 'middle' ? 'large' : 'medium';
  
  const parentalDynamics = dominantOrder === 'oldest' ? 'structured_strict' :
                         dominantOrder === 'middle' ? 'warm_supportive' :
                         dominantOrder === 'youngest' ? 'permissive_relaxed' :
                         'warm_supportive';

  const siblingGap = dominantOrder === 'only' ? 'no_siblings' :
                    dominantOrder === 'middle' ? 'close_1_3_years' :
                    'moderate_4_6_years';

  const results: BirthOrderResults = {
    birthOrder: dominantOrder,
    familySize,
    parentalDynamics,
    siblingGap
  };

  console.log('Final birth order results:', results);
  return results;
};
