
import { MatchProfile } from "./types";

export const filterProfilesByPreferences = (profiles: any[], preferences: any): any[] => {
  if (!preferences) {
    return profiles;
  }

  console.log('Filtering profiles with STRICT preferences enforcement for ALL matches:', preferences);

  return profiles.filter(profile => {
    console.log('Checking profile:', profile.name, 'against strict preferences');

    // Gender preference filtering - ABSOLUTELY STRICT for ALL matches
    if (preferences.genderPreference && preferences.genderPreference !== 'any' && preferences.genderPreference !== 'everyone') {
      // Map preference values to profile gender values
      const genderMap: Record<string, string> = {
        'women': 'female',
        'men': 'male',
        'nonbinary': 'nonbinary'
      };
      
      const expectedGender = genderMap[preferences.genderPreference] || preferences.genderPreference;
      
      if (!profile.gender || profile.gender !== expectedGender) {
        console.log(`Filtered out ${profile.name}: gender ${profile.gender} doesn't match strict preference ${preferences.genderPreference} (${expectedGender})`);
        return false;
      }
    }

    // Age range filtering - ABSOLUTELY STRICT for ALL matches
    if (preferences.ageRange) {
      const minAge = preferences.ageRange.min || preferences.ageRange[0];
      const maxAge = preferences.ageRange.max || preferences.ageRange[1];
      
      if (minAge && maxAge) {
        if (profile.age < minAge || profile.age > maxAge) {
          console.log(`Filtered out ${profile.name}: age ${profile.age} not in strict range ${minAge}-${maxAge}`);
          return false;
        }
      }
    }

    // Children preference filtering - STRICT (only "maybe" allows flexibility)
    if (preferences.wantsChildren !== null && preferences.wantsChildren !== undefined && preferences.wantsChildren !== "maybe") {
      if (profile.wantsChildren !== preferences.wantsChildren && profile.wantsChildren !== "maybe") {
        console.log(`Filtered out ${profile.name}: children preference ${profile.wantsChildren} doesn't match strict preference ${preferences.wantsChildren}`);
        return false;
      }
    }

    // Deal breakers filtering - ABSOLUTELY STRICT for ALL matches
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

    // Must-haves filtering - STRICT for ALL matches
    if (preferences.mustHaves) {
      // Education requirements
      if (preferences.mustHaves.education?.length > 0 && profile.education) {
        if (!preferences.mustHaves.education.includes(profile.education)) {
          console.log(`Filtered out ${profile.name}: education ${profile.education} not in must-haves`);
          return false;
        }
      }

      // Career ambition matching - STRICT
      if (preferences.careerAmbition && preferences.careerAmbition !== 'any' && profile.careerAmbition) {
        if (profile.careerAmbition !== preferences.careerAmbition) {
          console.log(`Filtered out ${profile.name}: career ambition ${profile.careerAmbition} doesn't match strict requirement ${preferences.careerAmbition}`);
          return false;
        }
      }
    }

    console.log(`${profile.name} passed ALL strict filters`);
    return true;
  });
};

// Remove flexible matching - ALL matches are now strict
export const getFlexibleMatches = (profiles: any[], preferences: any, strictMatches: any[]): any[] => {
  // No flexible matches - return empty array
  console.log('Flexible matching disabled - all matches must be strict');
  return [];
};
