
export interface RelationshipIntentQuestion {
  id: number;
  text: string;
  options: Array<{
    value: string;
    text: string;
  }>;
}

export const relationshipIntentQuestions: RelationshipIntentQuestion[] = [
  {
    id: 1,
    text: "When making major life decisions (like career moves or living situations), you typically:",
    options: [
      { value: "independent_quick", text: "Make decisions quickly and independently - I trust my instincts" },
      { value: "consult_close", text: "Consult with close friends/family but ultimately decide alone" },
      { value: "prefer_partner_input", text: "Would prefer to have a life partner's input on major decisions" },
      { value: "wait_for_partnership", text: "Feel like something's missing when making big decisions alone" }
    ]
  },
  {
    id: 2,
    text: "Your friend just got engaged after dating for 8 months. Your honest reaction is:",
    options: [
      { value: "too_fast", text: "That seems really fast - I'd want to know someone much longer" },
      { value: "depends_on_person", text: "It depends on the person - some people know quickly" },
      { value: "romantic_ideal", text: "That's romantic - when you know, you know" },
      { value: "wish_that_were_me", text: "I'm genuinely excited for them and hope to find something similar" }
    ]
  },
  {
    id: 3,
    text: "When planning your next 2-3 years, you feel most energized thinking about:",
    options: [
      { value: "career_growth", text: "Career advancement and personal achievements" },
      { value: "adventure_exploration", text: "Travel, new experiences, and personal exploration" },
      { value: "building_relationship", text: "Building a deep, committed relationship" },
      { value: "balanced_growth", text: "Growing in partnership with someone special" }
    ]
  },
  {
    id: 4,
    text: "You're offered an amazing job opportunity in another city. Your first thought is:",
    options: [
      { value: "exciting_adventure", text: "Exciting! New city, new adventure - I'm flexible" },
      { value: "consider_connections", text: "I'd need to think about the relationships I'd be leaving behind" },
      { value: "discuss_with_partner", text: "This is definitely something I'd want to discuss with a serious partner" },
      { value: "location_matters_less", text: "The right relationship is more important than location" }
    ]
  },
  {
    id: 5,
    text: "At family gatherings when relatives ask about your love life, you:",
    options: [
      { value: "deflect_humor", text: "Change the subject or deflect with humor - it's not their business" },
      { value: "explain_standards", text: "Explain that you have high standards and won't settle" },
      { value: "share_hope", text: "Share that you're actively looking for something meaningful" },
      { value: "express_frustration", text: "Feel frustrated that it hasn't happened yet despite really wanting it" }
    ]
  },
  {
    id: 6,
    text: "When you see couples posting about anniversaries or milestones on social media, you:",
    options: [
      { value: "eye_roll", text: "Often roll your eyes - it feels performative or oversharing" },
      { value: "happy_but_distant", text: "Feel happy for them but it doesn't really affect you personally" },
      { value: "genuinely_excited", text: "Feel genuinely excited and hopeful about finding something similar" },
      { value: "longing_envy", text: "Feel a pang of longing or envy - you really want that" }
    ]
  },
  {
    id: 7,
    text: "Your ideal Saturday involves:",
    options: [
      { value: "solo_activities", text: "Pursuing personal hobbies and solo activities I'm passionate about" },
      { value: "friends_social", text: "Hanging out with friends and being social" },
      { value: "meaningful_connection", text: "Deep conversation and quality time with someone I care about" },
      { value: "domestic_partnership", text: "Simple domestic pleasures shared with a life partner" }
    ]
  },
  {
    id: 8,
    text: "When conflicts arise in your close relationships, you tend to:",
    options: [
      { value: "avoid_withdraw", text: "Avoid confrontation and withdraw until things blow over" },
      { value: "address_directly", text: "Address issues directly but expect quick resolution" },
      { value: "work_through_patiently", text: "Work through issues patiently because relationships matter" },
      { value: "committed_to_growth", text: "See conflicts as opportunities for deeper understanding and growth" }
    ]
  }
];
