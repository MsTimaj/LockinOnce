
import { ComprehensiveAssessmentResults } from "../assessmentScoring";
import { MatchProfile } from "./types";
import { calculateDetailedCompatibility } from "./detailedCompatibility";
import { baseProfiles } from "./mockProfiles";
import { filterProfilesByPreferences } from "./profileFiltering";
import { generateCompatibleAssessmentResults } from "./compatibleProfileGenerator";

export const generateCompatibleMatches = (userProfile: ComprehensiveAssessmentResults): MatchProfile[] => {
  // Filter matches based on user preferences (if they exist)
  const preferences = userProfile?.preferences;
  console.log('User preferences for filtering:', preferences);
  
  const filteredProfiles = preferences 
    ? filterProfilesByPreferences(baseProfiles, preferences)
    : baseProfiles;

  console.log(`Filtered ${filteredProfiles.length} profiles from ${baseProfiles.length} total`);

  // If no profiles match preferences, return a subset of all profiles to avoid empty state
  const profilesToUse = filteredProfiles.length > 0 ? filteredProfiles : baseProfiles.slice(0, 3);
  
  if (filteredProfiles.length === 0) {
    console.log('No profiles matched preferences - showing subset of all profiles');
  }

  return profilesToUse.map((profile, index) => {
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
