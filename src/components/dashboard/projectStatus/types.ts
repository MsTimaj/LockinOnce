
export interface CoreFeature {
  id: string;
  title: string;
  description: string;
  status: 'completed';
}

export interface NextPhaseFeature {
  id: string;
  title: string;
  description: string;
  priority: 'NEXT' | 'POLISH';
  time: string;
  impact: string;
}
