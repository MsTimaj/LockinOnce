
import { ComprehensiveAssessmentResults } from "../assessmentScoring";
import { MatchProfile } from "./types";
import { calculateDetailedCompatibility } from "./detailedCompatibility";
import { baseProfiles } from "./mockProfiles";
import { filterProfilesByPreferences } from "./profileFiltering";
import { generateCompatibleAssessmentResults } from "./compatibleProfileGenerator";

export const generateCompatibleMatches = (userProfile: ComprehensiveAssessmentResults): MatchProfile[] => {
  console.log('Generating matches for user profile with STRICT preferences enforcement:', userProfile);
  
  // Get user preferences
  const preferences = userProfile?.preferences;
  console.log('User preferences for STRICT matching:', preferences);
  
  if (!preferences) {
    console.log('No preferences found, using all profiles');
    return generateMatchesFromProfiles(baseProfiles, userProfile);
  }

  // ONLY strict preference matches - NO flexible matching
  const strictMatches = filterProfilesByPreferences(baseProfiles, preferences);
  console.log(`Found ${strictMatches.length} STRICT preference matches from ${baseProfiles.length} total profiles`);

  // If no matches meet strict criteria, inform user but don't compromise
  if (strictMatches.length === 0) {
    console.log('No matches found with strict criteria - user needs to adjust preferences');
    return []; // Return empty array instead of compromising
  }

  return generateMatchesFromProfiles(strictMatches, userProfile);
};

const generateMatchesFromProfiles = (profiles: any[], userProfile: ComprehensiveAssessmentResults): MatchProfile[] => {
  return profiles.map((profile, index) => {
    // Generate assessment results that are scientifically compatible
    const compatibleResults = generateCompatibleAssessmentResults(userProfile, index);
    
    // Calculate compatibility score using research-based algorithms
    const compatibilityScore = calculateDetailedCompatibility(userProfile, compatibleResults);
    
    console.log(`Generated match for ${profile.name} with compatibility score: ${compatibilityScore.overall}%`);
    
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
