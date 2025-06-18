
import { ComprehensiveAssessmentResults } from "../assessmentScoring";
import { MatchProfile } from "./types";
import { calculateDetailedCompatibility } from "./detailedCompatibility";
import { baseProfiles } from "./mockProfiles";
import { filterProfilesByPreferences, getFlexibleMatches } from "./profileFiltering";
import { generateCompatibleAssessmentResults } from "./compatibleProfileGenerator";

export const generateCompatibleMatches = (userProfile: ComprehensiveAssessmentResults): MatchProfile[] => {
  console.log('Generating matches for user profile:', userProfile);
  
  // Get user preferences
  const preferences = userProfile?.preferences;
  console.log('User preferences for matching:', preferences);
  
  if (!preferences) {
    console.log('No preferences found, using all profiles');
    return generateMatchesFromProfiles(baseProfiles, userProfile);
  }

  // Step 1: Get strict preference matches (for top 3 spots)
  const strictMatches = filterProfilesByPreferences(baseProfiles, preferences);
  console.log(`Found ${strictMatches.length} strict preference matches from ${baseProfiles.length} total`);

  // Step 2: Get flexible matches for remaining spots if needed
  const flexibleMatches = strictMatches.length < 8 
    ? getFlexibleMatches(baseProfiles, preferences, strictMatches)
    : [];
  
  console.log(`Found ${flexibleMatches.length} flexible matches`);

  // Step 3: Combine matches, prioritizing strict matches
  const allCandidates = [...strictMatches, ...flexibleMatches];
  
  // If still no matches, provide a small subset to avoid empty state
  const finalCandidates = allCandidates.length > 0 ? allCandidates : baseProfiles.slice(0, 3);
  
  if (allCandidates.length === 0) {
    console.log('No matches found even with flexible criteria - showing subset of all profiles');
  }

  return generateMatchesFromProfiles(finalCandidates, userProfile);
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
