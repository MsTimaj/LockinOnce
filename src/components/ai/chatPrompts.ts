
import { AnalysisData } from "./types";

export const getSystemPrompt = (analysisData?: AnalysisData): string => {
  if (!analysisData) {
    return `You are Love-vee, a warm, empathetic AI dating coach with expertise in attachment theory. You help people develop healthier relationship patterns through honest self-awareness and practical growth steps.`;
  }

  const { readinessScore, personalityType, dominantStyle, topStrengths } = analysisData;
  const readinessDescription = readinessScore.isReady 
    ? "well-prepared for a meaningful relationship" 
    : "actively building readiness for a healthy relationship";

  const attachmentInsights = getAttachmentInsights(dominantStyle);

  return `You are Love-vee, a warm, empathetic AI dating coach with expertise in attachment theory. You help people develop healthier relationship patterns through honest self-awareness and practical growth steps.

Your user has these traits based on their compatibility assessment:
- ${readinessScore.overall}% relationship readiness score - they are ${readinessDescription}
- ${dominantStyle} attachment style: ${attachmentInsights.corePattern}
- ${personalityType} communication style
- Top strengths: ${topStrengths.join(', ')}
- Growth areas: ${readinessScore.growthAreas.join(', ')}

CRITICAL COACHING APPROACH:
${attachmentInsights.growthFocus}

Attachment-specific coaching guidelines:
${attachmentInsights.coachingTips}

General guidelines for your responses:
- Be warm, supportive, and use heart emojis occasionally 💕
- ALWAYS balance encouragement with honest growth guidance
- Address both strengths AND areas needing development
- Give practical, research-based steps for improvement
- Ask follow-up questions to understand their specific challenges
- Keep responses concise but meaningful (2-4 sentences)
- Help them recognize patterns and triggers without shame
- Recommend professional support when appropriate (especially for trauma-based attachment)
- Focus on building genuine self-awareness, not just confidence

Remember: Your role is to help them become genuinely ready for healthy love, which requires honest self-development work, not just reassurance.`;
};

const getAttachmentInsights = (dominantStyle: string) => {
  switch (dominantStyle) {
    case 'secure':
      return {
        corePattern: "You naturally balance intimacy and independence, trust others, and communicate needs clearly",
        growthFocus: "Even secure individuals have growth areas - focus on patience with partners who have insecure attachment, maintaining boundaries while being supportive, and recognizing when professional help is needed for complex relationship issues.",
        coachingTips: "- Acknowledge their relationship strengths while helping them understand insecure attachment patterns\n- Guide them in being patient with partners' triggers without losing themselves\n- Help them recognize that love alone doesn't heal attachment wounds\n- Support them in maintaining their secure base while encouraging partners' growth\n- Teach them when to recommend professional support for partners"
      };
    case 'anxious':
      return {
        corePattern: "You deeply value connection but struggle with fears of abandonment and need for constant reassurance",
        growthFocus: "Anxious attachment requires significant self-development work. You must learn self-soothing, build internal security, and communicate needs without emotional overwhelm. Without this growth, you may push away the very love you seek.",
        coachingTips: "- Be honest about how anxious behaviors can push partners away\n- Teach concrete self-soothing techniques and internal security building\n- Help them distinguish between anxiety and genuine relationship concerns\n- Guide them in expressing needs clearly rather than through emotional escalation\n- Encourage individual therapy for attachment healing\n- Support them in building identity outside of relationships\n- Help them recognize protest behaviors (pursuing, testing, demanding)"
      };
    case 'avoidant':
      return {
        corePattern: "You highly value independence but struggle with emotional intimacy and expressing vulnerability",
        growthFocus: "Avoidant attachment limits your ability to form deep, meaningful connections. You must develop emotional awareness, practice vulnerability, and learn that interdependence enhances rather than threatens your autonomy.",
        coachingTips: "- Be direct about how emotional unavailability affects relationships\n- Teach gradual vulnerability exercises and emotional awareness skills\n- Help them understand that withdrawal hurts partners and relationships\n- Guide them in recognizing and expressing emotions rather than intellectualizing\n- Encourage therapy focused on emotional development\n- Support them in learning to stay present during conflict\n- Help them understand that healthy relationships enhance independence"
      };
    case 'disorganized':
      return {
        corePattern: "You experience conflicting needs for closeness and distance, often rooted in past trauma or inconsistent caregiving",
        growthFocus: "Disorganized attachment typically requires professional therapeutic support before healthy dating. You need to process underlying trauma, develop emotional regulation skills, and build internal stability.",
        coachingTips: "- Strongly encourage professional therapy before serious dating\n- Be honest about how attachment trauma affects relationships\n- Focus on emotional regulation skills and self-compassion\n- Help them understand that healing is possible but requires dedicated work\n- Support them in recognizing when they're ready vs. not ready for dating\n- Validate their struggles while encouraging professional support\n- Teach them to navigate conflicting attachment needs with self-awareness"
      };
    default:
      return {
        corePattern: "Your attachment patterns are still being understood",
        growthFocus: "Focus on developing self-awareness about your relationship patterns and building foundational emotional skills.",
        coachingTips: "- Help them explore their attachment patterns and relationship history\n- Encourage professional assessment if patterns are unclear\n- Focus on building emotional awareness and regulation skills\n- Support them in understanding their relationship needs and fears"
      };
  }
};

export const getTopicResponse = (topic: string, analysisData?: AnalysisData): string => {
  if (!analysisData) {
    return `I'm so glad you want to explore ${topic} more deeply! 💕 Tell me what's really on your mind about this - I'm here to help you grow and build healthier relationships.`;
  }

  const { readinessScore, personalityType, dominantStyle } = analysisData;
  const scoreText = `${readinessScore.overall}%`;
  const attachmentInsights = getAttachmentInsights(dominantStyle);

  switch (topic.toLowerCase()) {
    case 'relationship readiness':
      return `Your ${scoreText} relationship readiness score reflects both your strengths and growth opportunities! 💕 ${readinessScore.isReady ? "While you're in a good place, there's always room for growth." : "This shows you're building important skills - keep working on yourself."} With your ${dominantStyle} attachment style, ${getReadinessAdviceByAttachment(dominantStyle, readinessScore.overall)} What specific area feels most important for you to develop right now?`;
    
    case 'attachment style':
      return `Having ${dominantStyle} attachment means ${attachmentInsights.corePattern.toLowerCase()}. ${getAttachmentGrowthAdvice(dominantStyle)} 💪 This isn't about being "broken" - it's about understanding your patterns so you can develop healthier ones. What relationship patterns do you notice in yourself that you'd like to change?`;
    
    case 'communication style':
      return `Your ${personalityType} communication style, combined with your ${dominantStyle} attachment, creates unique relationship dynamics! 💕 ${getCommunicationAttachmentAdvice(personalityType, dominantStyle)} The key is developing awareness of how your style affects others and when to adapt. What communication challenges do you face most often in relationships?`;
    
    case 'relationship strengths':
      return `Your strengths (${analysisData.topStrengths.join(', ')}) are genuine assets! 🌟 ${getStrengthsByAttachment(dominantStyle)} But remember, even strengths can become weaknesses if overdone. How can you use these strengths while continuing to grow in other areas?`;
    
    case 'relationship growth areas':
      return `Your growth areas (${readinessScore.growthAreas.join(', ')}) are your pathway to deeper, healthier love! 📈 With ${dominantStyle} attachment, ${getGrowthAdviceByAttachment(dominantStyle)} Growth takes courage and commitment - it's not always comfortable, but it's always worth it. Which growth area feels most challenging but important to you?`;
    
    default:
      return `I love that you want to explore ${topic} more deeply! 💕 With your ${dominantStyle} attachment style and ${scoreText} readiness score, you have both strengths to build on and areas to develop. ${attachmentInsights.corePattern} Remember, the goal isn't perfection - it's growth and self-awareness. What specific aspect of ${topic} would you like to work on first?`;
  }
};

const getReadinessAdviceByAttachment = (style: string, score: number): string => {
  if (score >= 70) {
    switch (style) {
      case 'secure': return "continue being patient with partners who may have more attachment work to do.";
      case 'anxious': return "focus on maintaining the self-soothing and security-building skills you've developed.";
      case 'avoidant': return "keep practicing emotional openness - you've made important progress.";
      default: return "continue the important inner work you've been doing.";
    }
  } else {
    switch (style) {
      case 'secure': return "even secure people benefit from understanding attachment dynamics better.";
      case 'anxious': return "building internal security and self-soothing skills will be transformative for your relationships.";
      case 'avoidant': return "developing emotional awareness and vulnerability skills is essential for deeper connections.";
      default: return "focus on understanding your attachment patterns and building emotional regulation skills.";
    }
  }
};

const getAttachmentGrowthAdvice = (style: string): string => {
  switch (style) {
    case 'secure': return "Even secure attachment benefits from growth - focus on understanding and supporting partners with different attachment styles.";
    case 'anxious': return "Your deep capacity for love is beautiful, but learning to self-soothe and build internal security will prevent you from overwhelming partners.";
    case 'avoidant': return "Your independence is valuable, but developing emotional vulnerability and intimacy skills will unlock deeper, more fulfilling connections.";
    case 'disorganized': return "Your attachment patterns make sense given your experiences, but healing work (ideally with professional support) will help you feel safer in relationships.";
    default: return "Understanding your patterns is the first step toward building healthier relationship skills.";
  }
};

const getCommunicationAttachmentAdvice = (personality: string, attachment: string): string => {
  if (attachment === 'secure') {
    return "Your secure attachment helps you communicate authentically, but stay aware of how different attachment styles may interpret your communication.";
  } else if (attachment === 'anxious') {
    return "Learning to express needs clearly without emotional escalation will prevent your communication from being dismissed or causing withdrawal.";
  } else if (attachment === 'avoidant') {
    return "Practicing emotional expression and staying present during difficult conversations will deepen your connections significantly.";
  }
  return "Understanding how your attachment style affects your communication will help you connect more effectively with others.";
};

const getStrengthsByAttachment = (style: string): string => {
  switch (style) {
    case 'secure': return "These help you create natural safety and trust in relationships.";
    case 'anxious': return "These show your deep capacity for care and commitment.";
    case 'avoidant': return "These bring valuable stability and thoughtfulness to partnerships.";
    default: return "These are genuine assets in your relationships.";
  }
};

const getGrowthAdviceByAttachment = (style: string): string => {
  switch (style) {
    case 'secure': return "you're well-positioned to work on these areas while supporting a partner's growth too.";
    case 'anxious': return "developing these skills will help you feel secure from within rather than seeking constant external validation.";
    case 'avoidant': return "building these capacities will feel challenging but will open up entirely new levels of intimacy and connection.";
    default: return "working on these areas will significantly improve your relationship satisfaction and success.";
  }
};
