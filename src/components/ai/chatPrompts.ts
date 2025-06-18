
import { AnalysisData } from "./types";

export const getSystemPrompt = (analysisData?: AnalysisData): string => {
  if (!analysisData) {
    return `You are Love-vee, a warm, empathetic AI dating coach with expertise in attachment theory. You help people navigate their dating journey with emotional intelligence and practical advice.`;
  }

  const { readinessScore, personalityType, dominantStyle, topStrengths } = analysisData;
  const readinessDescription = readinessScore.isReady 
    ? "well-prepared for a meaningful relationship" 
    : "actively building readiness for a healthy relationship";

  const attachmentInsights = getAttachmentInsights(dominantStyle);

  return `You are Love-vee, a warm, empathetic AI dating coach with expertise in attachment theory. You help people navigate their dating journey with emotional intelligence and practical advice. 

Your user has these traits based on their compatibility assessment:
- ${readinessScore.overall}% relationship readiness score - they are ${readinessDescription}
- ${dominantStyle} attachment style: ${attachmentInsights.corePattern}
- ${personalityType} communication style
- Top strengths: ${topStrengths.join(', ')}
- Growth areas: ${readinessScore.growthAreas.join(', ')}

Attachment-specific coaching guidelines:
${attachmentInsights.coachingTips}

General guidelines for your responses:
- Be warm, supportive, and use heart emojis occasionally 💕
- Give practical, actionable dating advice rooted in attachment science
- Address their emotions and validate their feelings
- Ask follow-up questions to understand their situation better
- Keep responses concise but meaningful (2-4 sentences)
- Focus on building their confidence and helping them find genuine connections
- Reference their specific attachment style and readiness patterns when relevant
- Help them recognize their triggers and develop healthier relationship behaviors

Remember: You're their personal dating coach who understands their attachment style and cares about their wellbeing and success in love.`;
};

const getAttachmentInsights = (dominantStyle: string) => {
  switch (dominantStyle) {
    case 'secure':
      return {
        corePattern: "You naturally balance intimacy and independence, trust others, and communicate needs clearly",
        coachingTips: "- Acknowledge their relationship strengths and natural emotional intelligence\n- Help them recognize when partners may have different attachment needs\n- Support them in being patient with less secure partners while maintaining boundaries\n- Encourage them to trust their instincts about relationship compatibility"
      };
    case 'anxious':
      return {
        corePattern: "You deeply value connection but may worry about partner availability and seek frequent reassurance",
        coachingTips: "- Validate their deep capacity for love while helping them build self-soothing skills\n- Help them distinguish between intuition and anxiety-driven thoughts\n- Encourage secure partners who can provide consistency\n- Support them in developing independence alongside their relationships\n- Teach them to recognize their protest behaviors (pursuing, demanding) and healthier alternatives"
      };
    case 'avoidant':
      return {
        corePattern: "You highly value independence and may feel overwhelmed by emotional closeness or partner needs",
        coachingTips: "- Respect their need for space while gently encouraging emotional expression\n- Help them recognize the value of interdependence vs. complete independence\n- Support them in taking small steps toward vulnerability\n- Validate their discomfort with emotions while encouraging gradual openness\n- Help them understand that healthy relationships enhance rather than threaten autonomy"
      };
    case 'disorganized':
      return {
        corePattern: "You experience conflicting needs for closeness and distance, with unpredictable relationship emotions",
        coachingTips: "- Provide extra emotional validation and patience\n- Help them recognize their internal conflicts without judgment\n- Encourage professional therapy alongside dating advice\n- Support them in developing emotional regulation skills\n- Help them understand that healing is possible and they deserve love"
      };
    default:
      return {
        corePattern: "Your attachment patterns are still being understood",
        coachingTips: "- Focus on helping them develop self-awareness about their relationship patterns\n- Encourage exploration of their emotional needs and fears\n- Support them in building healthy relationship skills"
      };
  }
};

export const getTopicResponse = (topic: string, analysisData?: AnalysisData): string => {
  if (!analysisData) {
    return `I'm so glad you want to explore ${topic} more deeply! 💕 Tell me what's really on your mind about this.`;
  }

  const { readinessScore, personalityType, dominantStyle } = analysisData;
  const scoreText = `${readinessScore.overall}%`;
  const attachmentInsights = getAttachmentInsights(dominantStyle);

  switch (topic.toLowerCase()) {
    case 'relationship readiness':
      return `Your ${scoreText} relationship readiness score reflects your current emotional and relational development! 💕 ${readinessScore.isReady ? "This shows you've built important self-awareness and relationship skills." : "This indicates you're actively growing and building the foundation for healthy love."} With your ${dominantStyle} attachment style, ${getReadinessAdviceByAttachment(dominantStyle, readinessScore.overall)} What feels most important to you about being ready for love?`;
    
    case 'attachment style':
      return `Having ${dominantStyle} attachment means ${attachmentInsights.corePattern.toLowerCase()}. 💪 ${getAttachmentSpecificAdvice(dominantStyle)} This isn't about being "good" or "bad" - it's about understanding your relationship blueprint so you can work with it effectively! How does this resonate with your past relationship experiences?`;
    
    case 'communication style':
      return `Your ${personalityType} communication style, combined with your ${dominantStyle} attachment, creates a unique relationship approach! 💕 ${getCommunicationAttachmentAdvice(personalityType, dominantStyle)} The right person will appreciate your authentic way of connecting. What kind of conversations make you feel most understood?`;
    
    case 'relationship strengths':
      return `Your strengths (${analysisData.topStrengths.join(', ')}) are genuine assets! 🌟 With ${dominantStyle} attachment, these strengths help you ${getStrengthsByAttachment(dominantStyle)} Which of these feels like your biggest relationship superpower?`;
    
    case 'relationship growth areas':
      return `Your growth areas (${readinessScore.growthAreas.join(', ')}) are opportunities for deeper love! 📈 Given your ${dominantStyle} attachment style, ${getGrowthAdviceByAttachment(dominantStyle)} Growth takes courage, and you're already showing that by being here. What feels like the biggest opportunity for you?`;
    
    default:
      return `I love that you want to explore ${topic} more deeply! 💕 With your ${dominantStyle} attachment style and ${scoreText} readiness score, you have a unique relationship blueprint. ${attachmentInsights.corePattern} Tell me what's really on your heart about this - what are you feeling curious, excited, or maybe nervous about?`;
  }
};

const getReadinessAdviceByAttachment = (style: string, score: number): string => {
  if (score >= 70) {
    switch (style) {
      case 'secure': return "your natural emotional balance gives you a strong foundation for partnership.";
      case 'anxious': return "you've developed good self-awareness about your attachment needs.";
      case 'avoidant': return "you've made meaningful progress in emotional openness.";
      default: return "you've done important work on your relationship patterns.";
    }
  } else {
    switch (style) {
      case 'secure': return "you have great emotional instincts to build upon.";
      case 'anxious': return "focusing on self-soothing and building security within yourself will be transformative.";
      case 'avoidant': return "practicing emotional vulnerability in small steps will open new possibilities.";
      default: return "developing emotional awareness and regulation skills will be incredibly valuable.";
    }
  }
};

const getAttachmentSpecificAdvice = (style: string): string => {
  switch (style) {
    case 'secure': return "This is a wonderful foundation - you create safety for yourself and others naturally.";
    case 'anxious': return "Your deep capacity for love is beautiful, and learning to self-soothe will make you even more amazing in relationships.";
    case 'avoidant': return "Your independence is valuable, and gradually allowing interdependence will add richness to your connections.";
    case 'disorganized': return "Your complexity in relationships makes sense given your experiences, and healing is absolutely possible.";
    default: return "Understanding your patterns is the first step toward healthier, more fulfilling relationships.";
  }
};

const getCommunicationAttachmentAdvice = (personality: string, attachment: string): string => {
  if (attachment === 'secure') {
    return "Your secure attachment helps you communicate authentically and handle differences well.";
  } else if (attachment === 'anxious') {
    return "Learning to express needs clearly rather than through emotional escalation will be powerful for you.";
  } else if (attachment === 'avoidant') {
    return "Practicing sharing your inner world, even in small ways, will deepen your connections.";
  }
  return "Understanding both your communication and attachment styles helps you connect more effectively.";
};

const getStrengthsByAttachment = (style: string): string => {
  switch (style) {
    case 'secure': return "create natural safety and trust in relationships.";
    case 'anxious': return "show deep care and commitment to your connections.";
    case 'avoidant': return "bring stability and thoughtfulness to partnerships.";
    default: return "bring unique qualities to your relationships.";
  }
};

const getGrowthAdviceByAttachment = (style: string): string => {
  switch (style) {
    case 'secure': return "you're already well-positioned to work on these areas within a healthy relationship.";
    case 'anxious': return "building internal security and self-soothing skills will transform your relationship experience.";
    case 'avoidant': return "gradually practicing emotional openness and interdependence will feel challenging but rewarding.";
    default: return "understanding your attachment patterns will accelerate your growth in these areas.";
  }
};
