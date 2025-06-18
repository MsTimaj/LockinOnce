
import { MatchProfile } from "./types";

export const filterProfilesByPreferences = (profiles: any[], preferences: any): any[] => {
  if (!preferences) {
    return profiles;
  }

  console.log('Filtering profiles with preferences:', preferences);

  return profiles.filter(profile => {
    console.log('Checking profile:', profile.name, 'against preferences');

    // Gender preference filtering - STRICT enforcement
    if (preferences.genderPreference && preferences.genderPreference !== 'any' && preferences.genderPreference !== 'everyone') {
      if (!profile.gender || profile.gender !== preferences.genderPreference) {
        console.log(`Filtered out ${profile.name}: gender ${profile.gender} doesn't match preference ${preferences.genderPreference}`);
        return false;
      }
    }

    // Age range filtering
    if (preferences.ageRange?.length === 2) {
      const [minAge, maxAge] = preferences.ageRange;
      if (profile.age < minAge || profile.age > maxAge) {
        console.log(`Filtered out ${profile.name}: age ${profile.age} not in range ${minAge}-${maxAge}`);
        return false;
      }
    }

    // Children preference filtering
    if (preferences.wantsChildren !== null && preferences.wantsChildren !== undefined) {
      if (profile.wantsChildren !== preferences.wantsChildren) {
        // Allow some flexibility for "maybe" responses
        if (preferences.wantsChildren !== "maybe" && profile.wantsChildren !== "maybe") {
          console.log(`Filtered out ${profile.name}: children preference ${profile.wantsChildren} doesn't match ${preferences.wantsChildren}`);
          return false;
        }
      }
    }

    // Deal breakers filtering
    if (preferences.dealBreakers) {
      // Religion deal breakers
      if (preferences.dealBreakers.religion?.length > 0 && profile.religion) {
        if (preferences.dealBreakers.religion.includes(profile.religion)) {
          console.log(`Filtered out ${profile.name}: religion ${profile.religion} is a deal breaker`);
          return false;
        }
      }

      // Politics deal breakers
      if (preferences.dealBreakers.politics?.length > 0 && profile.politics) {
        if (preferences.dealBreakers.politics.includes(profile.politics)) {
          console.log(`Filtered out ${profile.name}: politics ${profile.politics} is a deal breaker`);
          return false;
        }
      }

      // Lifestyle deal breakers
      if (preferences.dealBreakers.lifestyle?.length > 0 && profile.lifestyle) {
        if (preferences.dealBreakers.lifestyle.some((dealBreaker: string) => 
          profile.lifestyle.includes(dealBreaker))) {
          console.log(`Filtered out ${profile.name}: lifestyle conflicts with deal breakers`);
          return false;
        }
      }
    }

    // Must-haves filtering
    if (preferences.mustHaves) {
      // Education requirements
      if (preferences.mustHaves.education?.length > 0 && profile.education) {
        if (!preferences.mustHaves.education.includes(profile.education)) {
          console.log(`Filtered out ${profile.name}: education ${profile.education} not in must-haves`);
          return false;
        }
      }

      // Career ambition matching
      if (preferences.careerAmbition && preferences.careerAmbition !== 'any' && profile.careerAmbition) {
        if (profile.careerAmbition !== preferences.careerAmbition) {
          console.log(`Filtered out ${profile.name}: career ambition ${profile.careerAmbition} doesn't match ${preferences.careerAmbition}`);
          return false;
        }
      }
    }

    console.log(`${profile.name} passed all filters`);
    return true;
  });
};
