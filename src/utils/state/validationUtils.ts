
export class ValidationUtils {
  static isValidUUID(str: string): boolean {
    if (!str || typeof str !== 'string') return false;
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(str);
  }

  static isValidProfile(profile: any): boolean {
    if (!profile || typeof profile !== 'object') return false;
    if (!profile.id || typeof profile.id !== 'string') return false;
    if (!profile.createdAt || typeof profile.createdAt !== 'string') return false;
    if (!profile.lastUpdated || typeof profile.lastUpdated !== 'string') return false;
    if (typeof profile.onboardingCompleted !== 'boolean') return false;
    return true;
  }
}
