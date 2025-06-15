
import { ComprehensiveAssessmentResults } from "../assessmentScoring";
import { MatchProfile } from "./types";
import { calculateDetailedCompatibility } from "./detailedCompatibility";
import { baseProfiles } from "./mockProfiles";
import { filterProfilesByPreferences } from "./profileFiltering";
import { generateCompatibleAssessmentResults } from "./compatibleProfileGenerator";

export const generateCompatibleMatches = (userProfile: ComprehensiveAssessmentResults): MatchProfile[] => {
  // Filter matches based on user preferences
  const preferences = userProfile?.preferences;
  const filteredProfiles = filterProfilesByPreferences(baseProfiles, preferences);

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
