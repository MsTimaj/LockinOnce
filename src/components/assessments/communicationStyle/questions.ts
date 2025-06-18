
export interface CommunicationStyleQuestion {
  id: number;
  text: string;
  options: {
    value: string;
    text: string;
  }[];
}

export const communicationStyleQuestions: CommunicationStyleQuestion[] = [
  {
    id: 1,
    text: "You're in a team meeting and someone presents an idea you strongly disagree with. The room seems to be warming up to it. What do you typically do?",
    options: [
      {
        value: "speak_up_respectfully",
        text: "I speak up respectfully, explaining my concerns and offering alternative solutions"
      },
      {
        value: "wait_for_private_moment",
        text: "I wait to share my thoughts privately with the presenter after the meeting"
      },
      {
        value: "ask_probing_questions",
        text: "I ask thoughtful questions to help everyone see potential issues without being confrontational"
      },
      {
        value: "stay_quiet_unless_asked",
        text: "I usually stay quiet unless directly asked for my opinion"
      }
    ]
  },
  {
    id: 2,
    text: "Your partner seems upset but says 'I'm fine' when you ask what's wrong. How do you usually respond?",
    options: [
      {
        value: "gently_persist",
        text: "I gently say something like 'You seem upset, I'm here when you're ready to talk'"
      },
      {
        value: "give_space_check_later",
        text: "I give them space but check in again later when they might be more open"
      },
      {
        value: "accept_at_face_value",
        text: "I accept their answer - if they say they're fine, I trust that"
      },
      {
        value: "keep_asking_until_they_open_up",
        text: "I keep gently asking because I know something's bothering them"
      }
    ]
  },
  {
    id: 3,
    text: "During an argument with someone close to you, you notice you're both getting heated. What's your natural tendency?",
    options: [
      {
        value: "suggest_break_cool_down",
        text: "I suggest we take a break to cool down and revisit this when we're calmer"
      },
      {
        value: "keep_talking_until_resolved",
        text: "I prefer to keep talking until we work it out - I don't like leaving things unresolved"
      },
      {
        value: "withdraw_avoid_escalation",
        text: "I tend to withdraw or change the subject to avoid escalating further"
      },
      {
        value: "focus_on_underlying_feelings",
        text: "I try to shift focus to how we're both feeling rather than who's right"
      }
    ]
  },
  {
    id: 4,
    text: "A friend is venting to you about a problem they're having. Your instinct is usually to:",
    options: [
      {
        value: "listen_reflect_feelings",
        text: "Listen and reflect back what I'm hearing: 'That sounds really frustrating'"
      },
      {
        value: "offer_practical_solutions",
        text: "Offer practical suggestions and solutions to help them fix the problem"
      },
      {
        value: "share_similar_experience",
        text: "Share a similar experience I've had to show I understand"
      },
      {
        value: "ask_questions_help_them_think",
        text: "Ask questions to help them think through their options"
      }
    ]
  },
  {
    id: 5,
    text: "You need to give constructive feedback to someone about something sensitive. How do you typically approach this?",
    options: [
      {
        value: "direct_but_kind",
        text: "I'm direct but kind - I state the issue clearly while emphasizing I care about them"
      },
      {
        value: "sandwich_method",
        text: "I use the 'sandwich' approach - positive, then concern, then positive again"
      },
      {
        value: "ask_permission_first",
        text: "I ask if they're open to feedback first, then share my observations gently"
      },
      {
        value: "wait_for_right_moment",
        text: "I wait for the right moment and setting, then speak very tactfully"
      }
    ]
  },
  {
    id: 6,
    text: "Someone close to you gives you feedback that stings, even though it might be true. Your immediate reaction is usually:",
    options: [
      {
        value: "defensive_but_consider_later",
        text: "I feel defensive at first, but later I think about whether there's truth in it"
      },
      {
        value: "thank_them_process_internally",
        text: "I thank them for their honesty and process my feelings about it privately"
      },
      {
        value: "ask_for_specifics",
        text: "I ask for specific examples so I can better understand their perspective"
      },
      {
        value: "shut_down_withdraw",
        text: "I tend to shut down or withdraw until I can process the emotional impact"
      }
    ]
  },
  {
    id: 7,
    text: "In social settings, when there's an awkward silence in the conversation, you typically:",
    options: [
      {
        value: "comfortable_with_silence",
        text: "I'm comfortable with silence - it doesn't bother me much"
      },
      {
        value: "ask_thoughtful_question",
        text: "I ask a thoughtful question to get the conversation flowing again"
      },
      {
        value: "make_light_comment",
        text: "I make a light comment or joke to ease the tension"
      },
      {
        value: "feel_compelled_to_fill_silence",
        text: "I feel compelled to say something, even if it's just small talk"
      }
    ]
  },
  {
    id: 8,
    text: "When discussing future plans with a partner, you tend to:",
    options: [
      {
        value: "think_out_loud_together",
        text: "Think out loud together, exploring different possibilities as we talk"
      },
      {
        value: "present_thought_through_ideas",
        text: "Present ideas I've already thought through, then get their input"
      },
      {
        value: "ask_lots_of_questions",
        text: "Ask lots of questions about their hopes and concerns first"
      },
      {
        value: "prefer_structured_discussion",
        text: "Prefer structured discussions with clear topics and decision points"
      }
    ]
  }
];
