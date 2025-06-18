
export interface BirthOrderQuestion {
  id: number;
  text: string;
  options: {
    value: string;
    text: string;
  }[];
}

export const birthOrderQuestions: BirthOrderQuestion[] = [
  {
    id: 1,
    text: "When working on a group project, you naturally tend to:",
    options: [
      { value: "oldest", text: "Take charge and organize everyone's responsibilities" },
      { value: "middle", text: "Help mediate between different viewpoints and find compromise" },
      { value: "youngest", text: "Contribute creative ideas and go with the group's flow" },
      { value: "only", text: "Prefer to handle your portion independently with minimal group coordination" }
    ]
  },
  {
    id: 2,
    text: "In your family or close friend group, people often come to you when they need:",
    options: [
      { value: "oldest", text: "Advice on important decisions or life direction" },
      { value: "middle", text: "Someone to listen and help resolve conflicts peacefully" },
      { value: "youngest", text: "Emotional support and encouragement to lighten their mood" },
      { value: "only", text: "Well-researched information or a thoughtful, independent perspective" }
    ]
  },
  {
    id: 3,
    text: "When facing a challenging situation, your instinct is to:",
    options: [
      { value: "oldest", text: "Analyze the problem systematically and create a structured plan" },
      { value: "middle", text: "Consider how it affects everyone involved before taking action" },
      { value: "youngest", text: "Trust that things will work out and adapt as you go" },
      { value: "only", text: "Research thoroughly and handle it independently" }
    ]
  },
  {
    id: 4,
    text: "Your approach to rules and authority figures is typically:",
    options: [
      { value: "oldest", text: "Respect authority and often find yourself in leadership roles" },
      { value: "middle", text: "Navigate diplomatically, knowing when to follow and when to question" },
      { value: "youngest", text: "Challenge authority when it doesn't make sense to you" },
      { value: "only", text: "Maintain independence while showing appropriate respect" }
    ]
  },
  {
    id: 5,
    text: "When it comes to taking risks, you:",
    options: [
      { value: "oldest", text: "Carefully weigh pros and cons before making calculated decisions" },
      { value: "middle", text: "Take moderate risks after considering how they affect others" },
      { value: "youngest", text: "Are willing to take bold risks and learn from the experience" },
      { value: "only", text: "Take well-researched risks based on your own analysis" }
    ]
  },
  {
    id: 6,
    text: "In social situations, you tend to:",
    options: [
      { value: "oldest", text: "Take responsibility for making sure everyone is comfortable" },
      { value: "middle", text: "Act as the social bridge, connecting different people and groups" },
      { value: "youngest", text: "Bring energy and humor to keep things light and fun" },
      { value: "only", text: "Prefer deeper one-on-one conversations over large group dynamics" }
    ]
  },
  {
    id: 7,
    text: "Your relationship with perfectionism is:",
    options: [
      { value: "oldest", text: "High standards are important - you often feel responsible for excellence" },
      { value: "middle", text: "You strive for quality but are flexible when compromise is needed" },
      { value: "youngest", text: "You focus more on creativity and authenticity than perfection" },
      { value: "only", text: "You have very high personal standards but don't impose them on others" }
    ]
  },
  {
    id: 8,
    text: "When someone asks for help with a problem, you typically:",
    options: [
      { value: "oldest", text: "Give direct advice and practical steps to solve it" },
      { value: "middle", text: "Listen carefully and help them see different perspectives" },
      { value: "youngest", text: "Offer emotional support and help them feel better about it" },
      { value: "only", text: "Share relevant knowledge or resources they might find useful" }
    ]
  },
  {
    id: 9,
    text: "Your comfort level with being the center of attention is:",
    options: [
      { value: "oldest", text: "Comfortable when it's related to achievements or leadership" },
      { value: "middle", text: "You prefer supporting others rather than being in the spotlight" },
      { value: "youngest", text: "You naturally draw attention and often enjoy entertaining others" },
      { value: "only", text: "You prefer recognition for your work rather than personal attention" }
    ]
  },
  {
    id: 10,
    text: "When planning a vacation with friends, you:",
    options: [
      { value: "oldest", text: "Take charge of logistics and ensure everyone's needs are met" },
      { value: "middle", text: "Help coordinate everyone's preferences and find activities all will enjoy" },
      { value: "youngest", text: "Suggest fun, spontaneous activities and go with whatever sounds exciting" },
      { value: "only", text: "Research thoroughly and prefer having your own space and schedule flexibility" }
    ]
  }
];
