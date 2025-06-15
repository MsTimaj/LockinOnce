
export class SyncStateManager {
  private static syncInProgress = false;

  static isSyncInProgress(): boolean {
    return this.syncInProgress;
  }

  static setSyncInProgress(inProgress: boolean): void {
    this.syncInProgress = inProgress;
  }

  static async withSyncLock<T>(operation: () => Promise<T>): Promise<T> {
    // Prevent concurrent syncs
    if (this.syncInProgress) {
      console.log('Sync already in progress, queuing operation...');
      await new Promise(resolve => setTimeout(resolve, 100));
      return this.withSyncLock(operation);
    }

    this.setSyncInProgress(true);

    try {
      const result = await operation();
      return result;
    } finally {
      this.setSyncInProgress(false);
    }
  }

  static forceReset(): void {
    console.log('Force resetting sync flags');
    this.syncInProgress = false;
  }
}
