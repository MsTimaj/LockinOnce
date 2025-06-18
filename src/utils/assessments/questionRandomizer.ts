
// Fisher-Yates shuffle algorithm
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Generic function to randomize questions with options
export const randomizeQuestionsWithOptions = <T extends { options: any[] }>(questions: T[]): T[] => {
  const shuffledQuestions = shuffleArray(questions);
  
  return shuffledQuestions.map(question => ({
    ...question,
    options: shuffleArray(question.options)
  }));
};

// For simpler question arrays without options
export const randomizeSimpleQuestions = <T>(questions: T[]): T[] => {
  return shuffleArray(questions);
};
