
import { AnalysisData } from "./types";

export const getSystemPrompt = (analysisData?: AnalysisData): string => {
  if (!analysisData) {
    return `You are Love-vee, a warm, empathetic AI dating coach. You help people navigate their dating journey with emotional intelligence and practical advice.`;
  }

  const { readinessScore, personalityType, dominantStyle, topStrengths } = analysisData;
  const readinessDescription = readinessScore.isReady 
    ? "highly prepared for a meaningful relationship" 
    : "working on building readiness for a healthy relationship";

  return `You are Love-vee, a warm, empathetic AI dating coach. You help people navigate their dating journey with emotional intelligence and practical advice. 

Your user has these traits based on their compatibility assessment:
- ${readinessScore.overall}% relationship readiness score - they are ${readinessDescription}
- ${dominantStyle} attachment style 
- ${personalityType} communication style
- Top strengths: ${topStrengths.join(', ')}
- Growth areas: ${readinessScore.growthAreas.join(', ')}

Guidelines for your responses:
- Be warm, supportive, and use heart emojis occasionally 💕
- Give practical, actionable dating advice
- Address their emotions and validate their feelings
- Ask follow-up questions to understand their situation better
- Keep responses concise but meaningful (2-4 sentences)
- Focus on building their confidence and helping them find genuine connections
- If they mention being stood up, ghosted, or disappointed, provide emotional support first
- Help them see patterns and make better choices in dating
- Reference their specific readiness score (${readinessScore.overall}%) and traits when relevant

Remember: You're their personal dating coach who cares about their wellbeing and success in love.`;
};

export const getTopicResponse = (topic: string, analysisData?: AnalysisData): string => {
  if (!analysisData) {
    return `I'm so glad you want to explore ${topic} more deeply! 💕 Tell me what's really on your mind about this.`;
  }

  const { readinessScore, personalityType, dominantStyle } = analysisData;
  const scoreText = `${readinessScore.overall}%`;
  const readinessDescription = readinessScore.isReady 
    ? "fantastic! 🌟 This means you've done the inner work and you're emotionally prepared for a genuine connection."
    : "shows you're on a great path! 🌱 You're building the foundation for a healthy relationship.";

  switch (topic.toLowerCase()) {
    case 'relationship readiness':
      return `Your ${scoreText} relationship readiness score is ${readinessDescription} You have strong self-awareness and clear intentions - these are valuable qualities. ${readinessScore.isReady ? "The fact that you're even thinking about readiness shows maturity." : "Focus on your growth areas and you'll continue building that readiness."} What specific aspect of being 'ready' feels most important to you right now?`;
    
    case 'attachment style':
      return `Having a ${dominantStyle} attachment style is important to understand! 💪 ${dominantStyle === 'secure' ? "You naturally create safe spaces for emotional intimacy while maintaining your independence. This means you won't chase someone who's pulling away, and you won't run from someone getting close." : "Understanding your attachment patterns helps you build healthier relationships and recognize what you need from a partner."} How does knowing this about yourself change how you approach dating?`;
    
    case 'communication style':
      return `Your ${personalityType} communication style is such a gift! 💕 This affects how you connect with others and express your feelings. Your challenge might be that some people won't immediately 'get' your style, but that's actually perfect filtering! The right person will be drawn to your authenticity. What kind of conversations make you feel most connected?`;
    
    case 'relationship strengths':
      return `Your strengths include ${analysisData.topStrengths.join(', ')} - these make you incredibly dateable! 🌟 These strengths will help you build something real and meaningful. Which of these feels like your biggest superpower in relationships?`;
    
    case 'relationship growth areas':
      return `Your growth areas (${readinessScore.growthAreas.join(', ')}) aren't weaknesses - they're your next level up! 📈 With your ${scoreText} readiness score, you have a great foundation to work on these areas. What feels like the biggest challenge for you in these areas?`;
    
    case 'personalized dating strategy':
      return `Based on your ${dominantStyle} attachment style and ${personalityType} communication style, your personalized strategy is so smart! 🎯 ${readinessScore.personalizedStrategy} This approach might take longer, but it leads to much better relationships. What activities or conversation topics light you up most?`;
    
    case 'matching algorithm':
      return `Our algorithm prioritizes what actually predicts relationship success! 💕 Values alignment, communication compatibility, attachment styles, and life goals. We're not just matching you on surface attraction - we're finding people you could genuinely build a life with based on your ${scoreText} readiness score and ${dominantStyle} attachment style. What matters most to you in a potential partner?`;
    
    default:
      return `I'm so glad you want to explore ${topic} more deeply! 💕 Based on your ${scoreText} readiness score and ${dominantStyle} attachment style, you have so many strengths to work with. Tell me what's really on your mind about this - are you feeling excited, nervous, curious, or something else?`;
  }
};
