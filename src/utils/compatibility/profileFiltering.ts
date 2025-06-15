
import { BaseProfile } from "./mockProfiles";
import { PreferencesResults } from "../assessmentScoring";

export const filterProfilesByPreferences = (
  profiles: BaseProfile[],
  preferences: PreferencesResults | null
): BaseProfile[] => {
  if (!preferences) return profiles;

  return profiles.filter(profile => {
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
};
