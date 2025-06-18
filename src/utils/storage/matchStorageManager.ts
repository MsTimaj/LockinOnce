
export interface MatchDecision {
  matchId: string;
  decision: 'interested' | 'passed';
  timestamp: string;
}

export interface MutualMatch {
  matchId: string;
  timestamp: string;
}

export class MatchStorageManager {
  private static readonly DECISIONS_KEY = 'lockinonce_match_decisions';
  private static readonly MUTUAL_MATCHES_KEY = 'lockinonce_mutual_matches';

  static saveDecision(matchId: string, decision: 'interested' | 'passed'): void {
    try {
      const decisions = this.getDecisions();
      const existingIndex = decisions.findIndex(d => d.matchId === matchId);
      
      const newDecision: MatchDecision = {
        matchId,
        decision,
        timestamp: new Date().toISOString()
      };

      if (existingIndex >= 0) {
        decisions[existingIndex] = newDecision;
      } else {
        decisions.push(newDecision);
      }

      localStorage.setItem(this.DECISIONS_KEY, JSON.stringify(decisions));
      console.log('Match decision saved:', { matchId, decision });

      // Create mutual match for demo - higher chance for first 3 matches
      if (decision === 'interested') {
        const chance = ['1', '2', '3'].includes(matchId) ? 0.8 : 0.3;
        if (Math.random() < chance) {
          this.createMutualMatch(matchId);
        }
      }
    } catch (error) {
      console.error('Failed to save match decision:', error);
    }
  }

  static getDecisions(): MatchDecision[] {
    try {
      const stored = localStorage.getItem(this.DECISIONS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to load match decisions:', error);
      return [];
    }
  }

  static getDecision(matchId: string): MatchDecision | null {
    const decisions = this.getDecisions();
    return decisions.find(d => d.matchId === matchId) || null;
  }

  static getPassedMatches(): string[] {
    return this.getDecisions()
      .filter(d => d.decision === 'passed')
      .map(d => d.matchId);
  }

  static getInterestedMatches(): string[] {
    return this.getDecisions()
      .filter(d => d.decision === 'interested')
      .map(d => d.matchId);
  }

  private static createMutualMatch(matchId: string): void {
    try {
      const mutualMatches = this.getMutualMatches();
      const exists = mutualMatches.some(m => m.matchId === matchId);
      
      if (!exists) {
        mutualMatches.push({
          matchId,
          timestamp: new Date().toISOString()
        });
        localStorage.setItem(this.MUTUAL_MATCHES_KEY, JSON.stringify(mutualMatches));
        console.log('Mutual match created:', matchId);
      }
    } catch (error) {
      console.error('Failed to create mutual match:', error);
    }
  }

  static getMutualMatches(): MutualMatch[] {
    try {
      const stored = localStorage.getItem(this.MUTUAL_MATCHES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to load mutual matches:', error);
      return [];
    }
  }

  static isMutualMatch(matchId: string): boolean {
    return this.getMutualMatches().some(m => m.matchId === matchId);
  }

  static clearAllDecisions(): void {
    localStorage.removeItem(this.DECISIONS_KEY);
    localStorage.removeItem(this.MUTUAL_MATCHES_KEY);
    console.log('All match decisions cleared');
  }
}
