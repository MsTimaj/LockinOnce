import { ComprehensiveAssessmentResults } from "../assessmentScoring";
import { MatchProfile } from "./types";
import { calculateDetailedCompatibility } from "./detailedCompatibility";

export const generateCompatibleMatches = (userProfile: ComprehensiveAssessmentResults): MatchProfile[] => {
  const baseProfiles = [
    {
      id: "match_1",
      name: "Emma",
      age: 28,
      location: "2 miles away",
      bio: "Art curator who believes in deep connections and meaningful conversations. Looking for someone to explore galleries and life with.",
      photo: "https://images.unsplash.com/photo-1494790108755-2616b612b8c3?w=400&h=400&fit=crop&crop=face"
    },
    {
      id: "match_2", 
      name: "Sophia",
      age: 26,
      location: "5 miles away",
      bio: "Therapist passionate about personal growth and authentic relationships. Loves hiking, reading, and cozy coffee dates.",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face"
    },
    {
      id: "match_3",
      name: "Olivia", 
      age: 30,
      location: "3 miles away",
      bio: "Software engineer with a love for travel and learning new cultures. Seeking a partner for life's adventures.",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face"
    },
    {
      id: "match_4",
      name: "Isabella",
      age: 27,
      location: "4 miles away", 
      bio: "Marketing professional who loves cooking, yoga, and weekend farmers markets. Seeking genuine connection.",
      photo: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop&crop=face"
    },
    {
      id: "match_5",
      name: "Maya",
      age: 29,
      location: "6 miles away",
      bio: "Photographer and dog lover. Enjoys spontaneous road trips and quiet evenings at home with a good book.",
      photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop&crop=face"
    },
    {
      id: "match_6", 
      name: "Zoe",
      age: 25,
      location: "7 miles away",
      bio: "Graduate student in psychology. Passionate about mental health advocacy and building meaningful relationships.",
      photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face"
    },
    {
      id: "match_7",
      name: "Ava",
      age: 31,
      location: "8 miles away", 
      bio: "Architect who designs sustainable buildings. Loves rock climbing, environmental activism, and deep conversations.",
      photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face"
    },
    {
      id: "match_8",
      name: "Grace",
      age: 28,
      location: "9 miles away",
      bio: "Nurse who believes in healing through kindness. Enjoys dancing, volunteering, and exploring new neighborhoods.",
      photo: "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?w=400&h=400&fit=crop&crop=face"
    },
    {
      id: "match_9", 
      name: "Lily",
      age: 26,
      location: "10 miles away",
      bio: "Teacher passionate about education and community building. Loves board games, gardening, and weekend brunches.",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face"
    },
    {
      id: "match_10",
      name: "Chloe", 
      age: 29,
      location: "12 miles away",
      bio: "Writer and coffee enthusiast. Seeking someone who appreciates late-night conversations and Sunday morning adventures.",
      photo: "https://images.unsplash.com/photo-1548142813-c348350df52b?w=400&h=400&fit=crop&crop=face"
    }
  ];

  return baseProfiles.map((profile, index) => {
    const compatibleResults = generateCompatibleAssessmentResults(userProfile, index);
    const compatibilityScore = calculateDetailedCompatibility(userProfile, compatibleResults);
    
    return {
      ...profile,
      assessmentResults: compatibleResults,
      compatibilityScore,
      connectionStatus: 'none' as const,
      lastActive: "2 hours ago"
    };
  }).sort((a, b) => b.compatibilityScore.overall - a.compatibilityScore.overall); // Sort by compatibility score
};

const generateCompatibleAssessmentResults = (userProfile: ComprehensiveAssessmentResults, index: number): ComprehensiveAssessmentResults => {
  const userAttachmentStyle = userProfile?.attachmentStyle?.dominantStyle || 'secure';
  const userIntroversion = userProfile?.personality?.introversion || 50;
  const userExtroversion = userProfile?.personality?.extroversion || 50;
  const userThinking = userProfile?.personality?.thinking || 60;
  const userFeeling = userProfile?.personality?.feeling || 60;
  const userBirthOrder = userProfile?.birthOrder?.birthOrder || 'oldest';

  // Create naturally compatible profiles with some variety
  const attachmentOptions = ['secure', 'anxious', 'avoidant', 'disorganized'] as const;
  const compatibleAttachment = userAttachmentStyle === 'anxious' ? 'secure' : 
                              userAttachmentStyle === 'avoidant' ? 'secure' :
                              userAttachmentStyle === 'disorganized' ? 'secure' :
                              'secure'; // Default to secure for now

  return {
    attachmentStyle: {
      secure: 5,
      anxious: 0,
      avoidant: 0, 
      disorganized: 0,
      dominantStyle: 'secure' as const
    },
    personality: {
      introversion: userIntroversion > userExtroversion ? 40 : 80,
      extroversion: userExtroversion > userIntroversion ? 40 : 80,
      thinking: userThinking + (Math.random() * 20 - 10),
      feeling: userFeeling + (Math.random() * 20 - 10),
      dominantType: "Compatible Type"
    },
    birthOrder: {
      birthOrder: userBirthOrder === 'oldest' ? 'youngest' : 
                  userBirthOrder === 'youngest' ? 'oldest' : 
                  userBirthOrder === 'only' ? 'youngest' : 'oldest',
      familySize: "medium",
      parentalDynamics: "supportive"
    },
    relationshipIntent: {
      timeline: "1-2 years",
      commitment: "marriage",
      lifeGoals: "family_career",
      familyPlanning: "want_children",
      relocatation: "somewhat_flexible"
    },
    emotionalCapacity: {
      stressManagement: "healthy_coping",
      emotionalSupport: "natural_supporter",
      selfAwareness: "highly_aware",
      empathy: "highly_empathetic",
      resilience: "strong_resilience"
    },
    attractionLayer: null,
    physicalProximity: null,
    communicationStyle: null,
    lifeGoals: null,
    values: null,
    lifestyle: null,
    loveLanguages: null,
    financialValues: null
  };
};
