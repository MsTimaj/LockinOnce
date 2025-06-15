
export interface MVPFeature {
  id: string;
  title: string;
  description: string;
  status: 'completed';
}

export interface CriticalGap {
  id: string;
  title: string;
  description: string;
  priority: 'HIGH' | 'MEDIUM';
  time: string;
}
