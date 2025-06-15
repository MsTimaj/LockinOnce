
import { MatchProfile } from "./types";
import { MatchStorageManager } from "../storage/matchStorageManager";
import { generateCompatibleMatches } from "./matchGeneration";
import { ComprehensiveAssessmentResults } from "../assessmentScoring";

export class MatchPoolManager {
  private static readonly POOL_SIZE = 10;
  private static readonly REFRESH_THRESHOLD = 3; // Refresh when less than 3 active matches

  static getActiveMatches(allMatches: MatchProfile[]): MatchProfile[] {
    const passedMatches = MatchStorageManager.getPassedMatches();
    return allMatches.filter(match => !passedMatches.includes(match.id));
  }

  static updateMatchStatuses(matches: MatchProfile[]): MatchProfile[] {
    return matches.map(match => {
      const decision = MatchStorageManager.getDecision(match.id);
      const isMutual = MatchStorageManager.isMutualMatch(match.id);
      
      if (decision) {
        if (decision.decision === 'interested') {
          return {
            ...match,
            connectionStatus: isMutual ? 'mutual' as const : 'interested' as const
          };
        } else {
          return {
            ...match,
            connectionStatus: 'passed' as const
          };
        }
      }
      
      return {
        ...match,
        connectionStatus: 'none' as const
      };
    });
  }

  static shouldRefreshPool(activeMatches: MatchProfile[]): boolean {
    return activeMatches.length < this.REFRESH_THRESHOLD;
  }

  static generateFreshMatches(userProfile: ComprehensiveAssessmentResults, existingMatches: MatchProfile[]): MatchProfile[] {
    console.log('Generating fresh matches for pool refresh');
    
    // Generate new matches and ensure they don't conflict with existing ones
    const existingIds = existingMatches.map(m => m.id);
    const newMatches = generateCompatibleMatches(userProfile);
    
    // Filter out any that already exist and add some variation
    const freshMatches = newMatches
      .filter(match => !existingIds.includes(match.id))
      .slice(0, this.POOL_SIZE);
    
    console.log(`Generated ${freshMatches.length} fresh matches`);
    return freshMatches;
  }

  static getMutualMatches(matches: MatchProfile[]): MatchProfile[] {
    return matches.filter(match => MatchStorageManager.isMutualMatch(match.id));
  }
}
