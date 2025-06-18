
import { CommunicationStyleResults } from "../CommunicationStyleAssessment";

export const scoreCommunicationStyle = (responses: Record<number, string>): CommunicationStyleResults => {
  // Analyze response patterns to determine communication style
  const directnessScore = calculateDirectnessScore(responses);
  const conflictStyleScore = calculateConflictStyleScore(responses);
  const listeningStyleScore = calculateListeningStyleScore(responses);
  const expressionStyleScore = calculateExpressionStyleScore(responses);

  return {
    communicationStyle: determineCommunicationStyle(directnessScore, expressionStyleScore),
    conflictResolution: determineConflictResolution(conflictStyleScore),
    expressionStyle: determineExpressionStyle(expressionStyleScore),
    listeningStyle: determineListeningStyle(listeningStyleScore)
  };
};

const calculateDirectnessScore = (responses: Record<number, string>): number => {
  let score = 0;
  
  // Question 1: Meeting disagreement
  if (responses[1] === 'speak_up_respectfully') score += 3;
  else if (responses[1] === 'ask_probing_questions') score += 2;
  else if (responses[1] === 'wait_for_private_moment') score += 1;
  else score += 0;

  // Question 5: Giving feedback
  if (responses[5] === 'direct_but_kind') score += 3;
  else if (responses[5] === 'ask_permission_first') score += 2;
  else if (responses[5] === 'sandwich_method') score += 1;
  else score += 0;

  return score;
};

const calculateConflictStyleScore = (responses: Record<number, string>): number => {
  let score = 0;
  
  // Question 3: Heated argument
  if (responses[3] === 'focus_on_underlying_feelings') score += 3;
  else if (responses[3] === 'suggest_break_cool_down') score += 2;
  else if (responses[3] === 'keep_talking_until_resolved') score += 1;
  else score += 0;

  // Question 2: Partner upset
  if (responses[2] === 'gently_persist') score += 3;
  else if (responses[2] === 'give_space_check_later') score += 2;
  else if (responses[2] === 'keep_asking_until_they_open_up') score += 1;
  else score += 0;

  return score;
};

const calculateListeningStyleScore = (responses: Record<number, string>): number => {
  let score = 0;
  
  // Question 4: Friend venting
  if (responses[4] === 'listen_reflect_feelings') score += 3;
  else if (responses[4] === 'ask_questions_help_them_think') score += 2;
  else if (responses[4] === 'share_similar_experience') score += 1;
  else score += 0;

  // Question 6: Receiving feedback
  if (responses[6] === 'ask_for_specifics') score += 3;
  else if (responses[6] === 'thank_them_process_internally') score += 2;
  else if (responses[6] === 'defensive_but_consider_later') score += 1;
  else score += 0;

  return score;
};

const calculateExpressionStyleScore = (responses: Record<number, string>): number => {
  let score = 0;
  
  // Question 7: Awkward silence
  if (responses[7] === 'ask_thoughtful_question') score += 3;
  else if (responses[7] === 'make_light_comment') score += 2;
  else if (responses[7] === 'comfortable_with_silence') score += 1;
  else score += 0;

  // Question 8: Future planning
  if (responses[8] === 'think_out_loud_together') score += 3;
  else if (responses[8] === 'ask_lots_of_questions') score += 2;
  else if (responses[8] === 'present_thought_through_ideas') score += 1;
  else score += 0;

  return score;
};

const determineCommunicationStyle = (directness: number, expression: number): string => {
  const combined = directness + expression;
  if (combined >= 5) return "direct_and_kind";
  if (combined >= 3) return "context_dependent";
  if (combined >= 2) return "gentle_and_indirect";
  return "very_direct";
};

const determineConflictResolution = (score: number): string => {
  if (score >= 5) return "collaborate_solutions";
  if (score >= 3) return "compromise_meet_middle";
  if (score >= 2) return "need_time_process";
  return "avoid_conflict";
};

const determineListeningStyle = (score: number): string => {
  if (score >= 5) return "active_empathetic";
  if (score >= 3) return "attentive_engaged";
  if (score >= 2) return "solution_oriented";
  return "selective_focused";
};

const determineExpressionStyle = (score: number): string => {
  if (score >= 5) return "open_and_honest";
  if (score >= 3) return "thoughtful_measured";
  if (score >= 2) return "actions_over_words";
  return "reserved_private";
};
