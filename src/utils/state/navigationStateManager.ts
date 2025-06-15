
export class NavigationStateManager {
  private static navigationInProgress = false;

  static isNavigationInProgress(): boolean {
    return this.navigationInProgress;
  }

  static setNavigationInProgress(inProgress: boolean): void {
    this.navigationInProgress = inProgress;
    if (inProgress) {
      console.log('Navigation flag set');
    } else {
      console.log('Navigation flag cleared');
    }
  }

  static forceReset(): void {
    console.log('Force resetting navigation flags');
    this.navigationInProgress = false;
  }

  static async withNavigationLock<T>(operation: () => Promise<T>): Promise<T> {
    if (this.navigationInProgress) {
      console.log('Navigation already in progress, skipping operation');
      throw new Error('Navigation in progress');
    }

    this.setNavigationInProgress(true);
    
    try {
      const result = await operation();
      return result;
    } finally {
      // Clear navigation flag quickly to prevent blocks
      setTimeout(() => {
        this.setNavigationInProgress(false);
      }, 50);
    }
  }
}
