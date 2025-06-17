
import { MatchProfile } from "./types";

export const filterProfilesByPreferences = (profiles: any[], preferences: any): any[] => {
  if (!preferences) {
    return profiles;
  }

  return profiles.filter(profile => {
    // Gender preference filtering - STRICT enforcement
    if (preferences.genderPreference && preferences.genderPreference !== 'any') {
      if (!profile.gender || profile.gender !== preferences.genderPreference) {
        return false;
      }
    }

    // Age range filtering
    if (preferences.ageRange?.min !== undefined && preferences.ageRange?.max !== undefined) {
      if (profile.age < preferences.ageRange.min || profile.age > preferences.ageRange.max) {
        return false;
      }
    }

    // Deal breakers filtering
    if (preferences.dealBreakers) {
      // Religion deal breakers
      if (preferences.dealBreakers.religion?.length > 0 && profile.religion) {
        if (preferences.dealBreakers.religion.includes(profile.religion)) {
          return false;
        }
      }

      // Politics deal breakers
      if (preferences.dealBreakers.politics?.length > 0 && profile.politics) {
        if (preferences.dealBreakers.politics.includes(profile.politics)) {
          return false;
        }
      }

      // Lifestyle deal breakers
      if (preferences.dealBreakers.lifestyle?.length > 0 && profile.lifestyle) {
        if (preferences.dealBreakers.lifestyle.some((dealBreaker: string) => 
          profile.lifestyle.includes(dealBreaker))) {
          return false;
        }
      }
    }

    // Must-haves filtering
    if (preferences.mustHaves) {
      // Children preference
      if (preferences.mustHaves.wantsChildren !== null && preferences.mustHaves.wantsChildren !== undefined) {
        if (profile.wantsChildren !== preferences.mustHaves.wantsChildren) {
          // Allow some flexibility for "maybe" responses
          if (preferences.mustHaves.wantsChildren !== "maybe" && profile.wantsChildren !== "maybe") {
            return false;
          }
        }
      }

      // Education requirements
      if (preferences.mustHaves.education?.length > 0 && profile.education) {
        if (!preferences.mustHaves.education.includes(profile.education)) {
          return false;
        }
      }
    }

    return true;
  });
};
