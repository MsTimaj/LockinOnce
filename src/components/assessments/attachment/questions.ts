
import { AttachmentQuestion } from "./types";

const baseAttachmentQuestions: AttachmentQuestion[] = [
  {
    id: 1,
    text: "When my partner is away for an extended period, I:",
    options: [
      { value: "secure", text: "Miss them but trust they'll return and maintain my own activities" },
      { value: "anxious", text: "Feel anxious and worry about our relationship constantly" },
      { value: "avoidant", text: "Feel relieved to have space and independence" },
      { value: "disorganized", text: "Have mixed feelings - sometimes missing them, sometimes feeling relieved" }
    ]
  },
  {
    id: 2,
    text: "During conflicts with my partner, I typically:",
    options: [
      { value: "secure", text: "Stay calm and work together to find solutions" },
      { value: "anxious", text: "Get emotional and seek immediate reassurance" },
      { value: "avoidant", text: "Withdraw and prefer to handle things alone" },
      { value: "disorganized", text: "React unpredictably - sometimes pursuing, sometimes withdrawing" }
    ]
  },
  {
    id: 3,
    text: "When it comes to expressing my feelings in relationships, I:",
    options: [
      { value: "secure", text: "Find it natural and comfortable to share openly" },
      { value: "anxious", text: "Share intensely and frequently, seeking validation" },
      { value: "avoidant", text: "Prefer to keep feelings private and maintain independence" },
      { value: "disorganized", text: "Struggle with inconsistent emotional expression" }
    ]
  },
  {
    id: 4,
    text: "My typical approach to intimacy is:",
    options: [
      { value: "secure", text: "I'm comfortable with closeness and maintain my sense of self" },
      { value: "anxious", text: "I crave closeness but worry about being abandoned" },
      { value: "avoidant", text: "I value independence and can feel overwhelmed by too much closeness" },
      { value: "disorganized", text: "I want intimacy but find it scary and unpredictable" }
    ]
  },
  {
    id: 5,
    text: "When my partner seems distant or preoccupied, I:",
    options: [
      { value: "secure", text: "Give them space while being available for support" },
      { value: "anxious", text: "Immediately worry and try to reconnect or get reassurance" },
      { value: "avoidant", text: "Use it as an opportunity to focus on my own interests" },
      { value: "disorganized", text: "Feel confused and react inconsistently" }
    ]
  },
  {
    id: 6,
    text: "When I feel hurt by my partner's actions, I:",
    options: [
      { value: "secure", text: "Express my feelings clearly and work toward understanding" },
      { value: "anxious", text: "Become emotional and need immediate reassurance that they still care" },
      { value: "avoidant", text: "Tend to shut down and process the hurt internally" },
      { value: "disorganized", text: "Feel overwhelmed and react in ways that confuse even myself" }
    ]
  },
  {
    id: 7,
    text: "In past relationships, I've typically:",
    options: [
      { value: "secure", text: "Maintained my independence while being committed to the relationship" },
      { value: "anxious", text: "Worried frequently about whether my partner truly loved me" },
      { value: "avoidant", text: "Felt suffocated when partners wanted too much closeness" },
      { value: "disorganized", text: "Experienced intense highs and lows with unpredictable patterns" }
    ]
  },
  {
    id: 8,
    text: "When thinking about commitment, I:",
    options: [
      { value: "secure", text: "Feel excited about building a life with the right person" },
      { value: "anxious", text: "Want commitment but worry about being hurt or abandoned" },
      { value: "avoidant", text: "Feel nervous about losing my freedom and independence" },
      { value: "disorganized", text: "Have conflicting feelings - wanting it but also fearing it" }
    ]
  }
];

// Fisher-Yates shuffle algorithm
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Randomize questions and also randomize the options within each question
const randomizeQuestions = (): AttachmentQuestion[] => {
  const shuffledQuestions = shuffleArray(baseAttachmentQuestions);
  
  // Also randomize the options within each question
  return shuffledQuestions.map(question => ({
    ...question,
    options: shuffleArray(question.options)
  }));
};

export const attachmentQuestions = randomizeQuestions();
