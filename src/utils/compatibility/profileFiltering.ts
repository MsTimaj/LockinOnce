
import { MatchProfile } from "./types";

export const filterProfilesByPreferences = (profiles: any[], preferences: any): any[] => {
  if (!preferences) {
    return profiles;
  }

  console.log('Filtering profiles with preferences:', preferences);

  return profiles.filter(profile => {
    console.log('Checking profile:', profile.name, 'against preferences');

    // Gender preference filtering - STRICT enforcement for top matches
    if (preferences.genderPreference && preferences.genderPreference !== 'any' && preferences.genderPreference !== 'everyone') {
      if (!profile.gender || profile.gender !== preferences.genderPreference) {
        console.log(`Filtered out ${profile.name}: gender ${profile.gender} doesn't match preference ${preferences.genderPreference}`);
        return false;
      }
    }

    // Age range filtering - STRICT enforcement
    if (preferences.ageRange) {
      const minAge = preferences.ageRange.min || preferences.ageRange[0];
      const maxAge = preferences.ageRange.max || preferences.ageRange[1];
      
      if (minAge && maxAge) {
        if (profile.age < minAge || profile.age > maxAge) {
          console.log(`Filtered out ${profile.name}: age ${profile.age} not in range ${minAge}-${maxAge}`);
          return false;
        }
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

    // Deal breakers filtering - STRICT enforcement
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

// New function to get flexible matches for remaining slots
export const getFlexibleMatches = (profiles: any[], preferences: any, strictMatches: any[]): any[] => {
  if (!preferences) {
    return profiles.filter(p => !strictMatches.find(sm => sm.id === p.id));
  }

  const usedIds = strictMatches.map(m => m.id);
  
  return profiles.filter(profile => {
    // Skip already used profiles
    if (usedIds.includes(profile.id)) return false;

    // Gender is still enforced (this is typically non-negotiable)
    if (preferences.genderPreference && preferences.genderPreference !== 'any' && preferences.genderPreference !== 'everyone') {
      if (!profile.gender || profile.gender !== preferences.genderPreference) {
        return false;
      }
    }

    // Age range can be more flexible (±5 years)
    if (preferences.ageRange) {
      const minAge = (preferences.ageRange.min || preferences.ageRange[0]) - 5;
      const maxAge = (preferences.ageRange.max || preferences.ageRange[1]) + 5;
      
      if (profile.age < minAge || profile.age > maxAge) {
        return false;
      }
    }

    // Deal breakers are still enforced
    if (preferences.dealBreakers) {
      if (preferences.dealBreakers.religion?.length > 0 && profile.religion) {
        if (preferences.dealBreakers.religion.includes(profile.religion)) {
          return false;
        }
      }
      if (preferences.dealBreakers.politics?.length > 0 && profile.politics) {
        if (preferences.dealBreakers.politics.includes(profile.politics)) {
          return false;
        }
      }
      if (preferences.dealBreakers.lifestyle?.length > 0 && profile.lifestyle) {
        if (preferences.dealBreakers.lifestyle.some((dealBreaker: string) => 
          profile.lifestyle.includes(dealBreaker))) {
          return false;
        }
      }
    }

    return true;
  });
};
