
export interface EmotionalCapacityQuestion {
  id: number;
  text: string;
  options: {
    text: string;
    value: string;
  }[];
}

export const emotionalCapacityQuestions: EmotionalCapacityQuestion[] = [
  {
    id: 1,
    text: "You've had a terrible day at work - your boss criticized your project in front of the team. When you get home, your partner wants to share exciting news about their promotion. You:",
    options: [
      {
        text: "Take a moment to acknowledge your feelings, then genuinely celebrate with them - you don't want your bad day to overshadow their good news",
        value: "emotionally_mature"
      },
      {
        text: "Try to be happy for them but struggle to hide that you're upset - you apologize and explain you need a few minutes to decompress first",
        value: "self_aware_working"
      },
      {
        text: "Feel overwhelmed by having to switch emotional gears and either withdraw or can't help but bring up your bad day",
        value: "emotionally_reactive"
      }
    ]
  },
  {
    id: 2,
    text: "Your partner has been unusually quiet and withdrawn for the past few days. When you ask what's wrong, they say 'nothing' but their body language suggests otherwise. You:",
    options: [
      {
        text: "Give them space initially, then gently let them know you're there when they're ready to talk - you create a safe environment without pressuring",
        value: "empathetic_patient"
      },
      {
        text: "Keep asking because you can tell something's wrong - you want to help but aren't sure how to approach it without making it worse",
        value: "caring_but_pushy"
      },
      {
        text: "Take their 'nothing' at face value and move on - if they wanted to talk, they would say something",
        value: "emotionally_distant"
      }
    ]
  },
  {
    id: 3,
    text: "During a heated discussion about finances, your partner raises their voice and says something hurtful about your spending habits. In the moment, you:",
    options: [
      {
        text: "Feel hurt but recognize they're stressed - you pause the conversation and suggest taking a break to cool down before continuing",
        value: "conflict_mature"
      },
      {
        text: "Feel defensive and hurt - you either shut down completely or match their energy level, making the argument worse",
        value: "conflict_reactive"
      },
      {
        text: "Point out that they're being hurtful and try to redirect to the actual issue, though you're clearly affected by their tone",
        value: "conflict_learning"
      }
    ]
  },
  {
    id: 4,
    text: "You're going through a stressful period - work deadlines, family issues, and financial pressure all hitting at once. Over the past two weeks, you notice you've been:",
    options: [
      {
        text: "Using your usual coping strategies (exercise, talking to friends, etc.) and communicating with your partner about what you need",
        value: "stress_resilient"
      },
      {
        text: "Feeling overwhelmed and sometimes snapping at people, but you recognize it and apologize - you're struggling but trying to manage",
        value: "stress_aware"
      },
      {
        text: "Either completely withdrawing from everyone or becoming irritable without really understanding why - stress affects all your relationships",
        value: "stress_overwhelmed"
      }
    ]
  },
  {
    id: 5,
    text: "Your partner made plans with friends on a night you were hoping to spend together, but they forgot to mention it until the last minute. Your honest reaction is:",
    options: [
      {
        text: "Disappointed but understanding - you express that you were looking forward to time together and ask if you can plan something for another night",
        value: "disappointment_healthy"
      },
      {
        text: "More hurt than you expected to be - you try to be understanding but struggle with feeling like they didn't consider you",
        value: "disappointment_sensitive"
      },
      {
        text: "Either completely fine with it (maybe even relieved) or disproportionately upset - you have trouble gauging appropriate emotional responses",
        value: "disappointment_extreme"
      }
    ]
  },
  {
    id: 6,
    text: "Think about how you typically support friends going through breakups or major life challenges. Honestly, you usually:",
    options: [
      {
        text: "Listen actively, validate their feelings, and offer practical help - people often say you make them feel heard and supported",
        value: "naturally_supportive"
      },
      {
        text: "Want to help but sometimes jump to giving advice or trying to 'fix' things when they just need someone to listen",
        value: "caring_but_directive"
      },
      {
        text: "Feel uncomfortable with intense emotions and either change the subject or offer surface-level support",
        value: "support_avoidant"
      }
    ]
  },
  {
    id: 7,
    text: "After a relationship ends (romantic or close friendship), you typically:",
    options: [
      {
        text: "Process your emotions, learn from the experience, and remain open to similar relationships in the future",
        value: "resilient_learner"
      },
      {
        text: "Take time to heal and eventually bounce back, though you might be more cautious initially in new relationships",
        value: "cautious_recoverer"
      },
      {
        text: "Either bounce back too quickly without processing, or struggle to trust and open up again for a long time",
        value: "recovery_struggles"
      }
    ]
  },
  {
    id: 8,
    text: "When you're in a good mood and your partner is having a rough day, you find yourself:",
    options: [
      {
        text: "Naturally adjusting your energy to be supportive while maintaining your own emotional stability",
        value: "emotionally_stable"
      },
      {
        text: "Wanting to cheer them up but sometimes feeling guilty about being happy when they're struggling",
        value: "empathetic_but_affected"
      },
      {
        text: "Either becoming defensive about your good mood or having your mood completely shift to match theirs",
        value: "emotionally_reactive_moods"
      }
    ]
  }
];
