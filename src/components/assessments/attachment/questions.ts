
import { AttachmentQuestion } from "./types";

const baseAttachmentQuestions: AttachmentQuestion[] = [
  {
    id: 1,
    text: "Your partner hasn't responded to your text for 4 hours, but they usually reply within an hour. Your first thought is:",
    options: [
      { value: "secure", text: "They're probably busy - I'll hear from them when they're free" },
      { value: "anxious", text: "Did I say something wrong? I should probably check in again" },
      { value: "avoidant", text: "Good, I have some space to focus on my own things" },
      { value: "disorganized", text: "I feel confused - part of me worries, part of me feels relieved" }
    ]
  },
  {
    id: 2,
    text: "It's Friday evening and your partner suggests staying in and ordering takeout instead of the restaurant reservation you made. You typically:",
    options: [
      { value: "secure", text: "Go with the flow - either option sounds nice as long as we're together" },
      { value: "anxious", text: "Wonder if they're losing interest in making effort for our relationship" },
      { value: "avoidant", text: "Feel relieved - staying in means less pressure and more comfort" },
      { value: "disorganized", text: "Feel torn between disappointment and relief, unsure what I actually prefer" }
    ]
  },
  {
    id: 3,
    text: "When someone you're dating wants to talk about 'where this is going,' your instinct is to:",
    options: [
      { value: "secure", text: "Appreciate their openness and share my own thoughts honestly" },
      { value: "anxious", text: "Feel anxious but also hopeful - I've been wanting this conversation too" },
      { value: "avoidant", text: "Feel a bit trapped and wish we could just enjoy things as they are" },
      { value: "disorganized", text: "Feel simultaneously excited and panicked about defining things" }
    ]
  },
  {
    id: 4,
    text: "Your ideal Sunday morning with a romantic partner would be:",
    options: [
      { value: "secure", text: "A mix of together time and personal space - maybe coffee together, then our own activities" },
      { value: "anxious", text: "Spending the whole morning together, talking and being close" },
      { value: "avoidant", text: "Parallel activities - being in the same space but doing our own things" },
      { value: "disorganized", text: "I'd want closeness but also feel like I need space - it's confusing" }
    ]
  },
  {
    id: 5,
    text: "A friend asks for your advice: 'My partner seems emotionally distant lately.' You'd probably say:",
    options: [
      { value: "secure", text: "Have you talked to them about it? They might be stressed about something else" },
      { value: "anxious", text: "That's concerning - distance usually means something is wrong in the relationship" },
      { value: "avoidant", text: "Maybe they just need some space. Not everyone is emotionally expressive all the time" },
      { value: "disorganized", text: "That's hard to read - it could mean anything, which would drive me crazy" }
    ]
  },
  {
    id: 6,
    text: "After a really great first date, you typically:",
    options: [
      { value: "secure", text: "Feel happy and text them the next day to say I had a good time" },
      { value: "anxious", text: "Feel excited but worry about when they'll text and what it means if they don't" },
      { value: "avoidant", text: "Feel good but also need some time to process before reaching out" },
      { value: "disorganized", text: "Feel excited but also surprisingly anxious about what comes next" }
    ]
  },
  {
    id: 7,
    text: "When you think about past relationships that ended, you usually:",
    options: [
      { value: "secure", text: "Learned something valuable even if it was sad when they ended" },
      { value: "anxious", text: "Wonder if I was too much or not enough for them" },
      { value: "avoidant", text: "Feel like I'm better off focusing on myself and my own goals" },
      { value: "disorganized", text: "Have mixed feelings - sometimes missing them, sometimes feeling relieved" }
    ]
  },
  {
    id: 8,
    text: "Your partner seems upset but says 'I'm fine' when you ask what's wrong. You:",
    options: [
      { value: "secure", text: "Give them space but let them know I'm here when they're ready to talk" },
      { value: "anxious", text: "Keep gently asking because I can tell something's bothering them" },
      { value: "avoidant", text: "Take them at their word - if they wanted to talk about it, they would" },
      { value: "disorganized", text: "Feel confused about whether to push or back off" }
    ]
  },
  {
    id: 9,
    text: "In your family growing up, when someone was upset, the usual response was:",
    options: [
      { value: "secure", text: "Talk it through together and find a way to help" },
      { value: "anxious", text: "A lot of emotional intensity and focus on fixing the problem immediately" },
      { value: "avoidant", text: "Give them space to work it out on their own" },
      { value: "disorganized", text: "Unpredictable - sometimes ignored, sometimes overwhelming attention" }
    ]
  },
  {
    id: 10,
    text: "When you imagine your ideal long-term relationship, you picture:",
    options: [
      { value: "secure", text: "Two independent people who choose to build a life together" },
      { value: "anxious", text: "Being deeply connected and central to each other's happiness" },
      { value: "avoidant", text: "Maintaining your individual identities while sharing some key experiences" },
      { value: "disorganized", text: "Feeling safe and close, though that feels almost too good to be true" }
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
