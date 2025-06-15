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
      photo: "https://images.unsplash.com/photo-1494790108755-2616b612b8c3?w=400&h=400&fit=crop&crop=face",
      gender: "woman",
      distance: 2,
      wantsChildren: true,
      education: "Master's Degree",
      careerAmbition: "moderate",
      religion: "Spiritual but not Religious",
      politics: "Liberal",
      lifestyle: "Active"
    },
    {
      id: "match_2", 
      name: "Sophia",
      age: 26,
      location: "5 miles away",
      bio: "Therapist passionate about personal growth and authentic relationships. Loves hiking, reading, and cozy coffee dates.",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      gender: "woman",
      distance: 5,
      wantsChildren: true,
      education: "Master's Degree",
      careerAmbition: "high",
      religion: "Agnostic",
      politics: "Moderate",
      lifestyle: "Balanced"
    },
    {
      id: "match_3",
      name: "Olivia", 
      age: 30,
      location: "3 miles away",
      bio: "Software engineer with a love for travel and learning new cultures. Seeking a partner for life's adventures.",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
      gender: "woman",
      distance: 3,
      wantsChildren: false,
      education: "Bachelor's Degree",
      careerAmbition: "high",
      religion: "Atheist",
      politics: "Liberal",
      lifestyle: "Active"
    },
    {
      id: "match_4",
      name: "Isabella",
      age: 27,
      location: "4 miles away", 
      bio: "Marketing professional who loves cooking, yoga, and weekend farmers markets. Seeking genuine connection.",
      photo: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop&crop=face",
      gender: "woman",
      distance: 4,
      wantsChildren: true,
      education: "Bachelor's Degree",
      careerAmbition: "moderate",
      religion: "Christian",
      politics: "Conservative",
      lifestyle: "Balanced"
    },
    {
      id: "match_5",
      name: "Maya",
      age: 29,
      location: "6 miles away",
      bio: "Photographer and dog lover. Enjoys spontaneous road trips and quiet evenings at home with a good book.",
      photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop&crop=face",
      gender: "woman",
      distance: 6,
      wantsChildren: null,
      education: "Some College",
      careerAmbition: "low",
      religion: "Spiritual but not Religious",
      politics: "Liberal",
      lifestyle: "Relaxed"
    },
    {
      id: "match_6", 
      name: "Zoe",
      age: 25,
      location: "7 miles away",
      bio: "Graduate student in psychology. Passionate about mental health advocacy and building meaningful relationships.",
      photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face",
      gender: "woman",
      distance: 7,
      wantsChildren: true,
      education: "Master's Degree",
      careerAmbition: "high",
      religion: "Agnostic",
      politics: "Liberal",
      lifestyle: "Active"
    },
    {
      id: "match_7",
      name: "Ava",
      age: 31,
      location: "8 miles away", 
      bio: "Architect who designs sustainable buildings. Loves rock climbing, environmental activism, and deep conversations.",
      photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face",
      gender: "woman",
      distance: 8,
      wantsChildren: false,
      education: "Master's Degree",
      careerAmbition: "high",
      religion: "Atheist",
      politics: "Very Liberal",
      lifestyle: "Very Active"
    },
    {
      id: "match_8",
      name: "Grace",
      age: 28,
      location: "9 miles away",
      bio: "Nurse who believes in healing through kindness. Enjoys dancing, volunteering, and exploring new neighborhoods.",
      photo: "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?w=400&h=400&fit=crop&crop=face",
      gender: "woman",
      distance: 9,
      wantsChildren: true,
      education: "Bachelor's Degree",
      careerAmbition: "moderate",
      religion: "Christian",
      politics: "Moderate",
      lifestyle: "Active"
    },
    {
      id: "match_9", 
      name: "Lily",
      age: 26,
      location: "10 miles away",
      bio: "Teacher passionate about education and community building. Loves board games, gardening, and weekend brunches.",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
      gender: "woman",
      distance: 10,
      wantsChildren: true,
      education: "Bachelor's Degree",
      careerAmbition: "moderate",
      religion: "Christian",
      politics: "Conservative",
      lifestyle: "Balanced"
    },
    {
      id: "match_10",
      name: "Chloe", 
      age: 29,
      location: "12 miles away",
      bio: "Writer and coffee enthusiast. Seeking someone who appreciates late-night conversations and Sunday morning adventures.",
      photo: "https://images.unsplash.com/photo-1548142813-c348350df52b?w=400&h=400&fit=crop&crop=face",
      gender: "woman",
      distance: 12,
      wantsChildren: null,
      education: "Master's Degree",
      careerAmbition: "moderate",
      religion: "Agnostic",
      politics: "Liberal",
      lifestyle: "Balanced"
    }
  ];

  // Filter matches based on user preferences
  const preferences = userProfile?.preferences;
  let filteredProfiles = baseProfiles;

  if (preferences) {
    filteredProfiles = baseProfiles.filter(profile => {
      // Gender preference filter
      if (preferences.genderPreference && preferences.genderPreference !== "everyone") {
        const genderMatch = preferences.genderPreference === "women" && profile.gender === "woman" ||
                           preferences.genderPreference === "men" && profile.gender === "man" ||
                           preferences.genderPreference === "nonbinary" && profile.gender === "nonbinary";
        if (!genderMatch) return false;
      }

      // Age range filter
      if (profile.age < preferences.ageRange.min || profile.age > preferences.ageRange.max) {
        return false;
      }

      // Distance filter
      if (profile.distance > preferences.locationRadius) {
        return false;
      }

      // Deal-breaker filters
      if (preferences.dealBreakers.religion.length > 0) {
        if (preferences.dealBreakers.religion.includes(profile.religion)) {
          return false;
        }
      }

      if (preferences.dealBreakers.politics.length > 0) {
        if (preferences.dealBreakers.politics.includes(profile.politics)) {
          return false;
        }
      }

      // Children compatibility (if user has strong preference)
      if (preferences.mustHaves.wantsChildren !== null && profile.wantsChildren !== null) {
        if (preferences.mustHaves.wantsChildren !== profile.wantsChildren) {
          return false;
        }
      }

      // Education requirements
      if (preferences.mustHaves.education.length > 0) {
        if (!preferences.mustHaves.education.includes(profile.education)) {
          return false;
        }
      }

      return true;
    });
  }

  return filteredProfiles.map((profile, index) => {
    const compatibleResults = generateCompatibleAssessmentResults(userProfile, index);
    const compatibilityScore = calculateDetailedCompatibility(userProfile, compatibleResults);
    
    return {
      id: profile.id,
      name: profile.name,
      age: profile.age,
      location: profile.location,
      bio: profile.bio,
      photo: profile.photo,
      assessmentResults: compatibleResults,
      compatibilityScore,
      connectionStatus: 'none' as const,
      lastActive: "2 hours ago"
    };
  }).sort((a, b) => b.compatibilityScore.overall - a.compatibilityScore.overall);
};

const generateCompatibleAssessmentResults = (userProfile: ComprehensiveAssessmentResults, index: number): ComprehensiveAssessmentResults => {
  const userAttachmentStyle = userProfile?.attachmentStyle?.dominantStyle || 'secure';
  const userIntroversion = userProfile?.personality?.introversion || 50;
  const userExtroversion = userProfile?.personality?.extroversion || 50;
  const userThinking = userProfile?.personality?.thinking || 60;
  const userFeeling = userProfile?.personality?.feeling || 60;
  const userBirthOrder = userProfile?.birthOrder?.birthOrder || 'oldest';

  const compatibleAttachment = userAttachmentStyle === 'anxious' ? 'secure' : 
                              userAttachmentStyle === 'avoidant' ? 'secure' :
                              userAttachmentStyle === 'disorganized' ? 'secure' :
                              'secure';

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
    preferences: null, // Match profiles don't need to store preferences
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
