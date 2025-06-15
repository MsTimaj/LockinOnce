
import { MVPFeature, CriticalGap } from './types';

export const mvpFeatures: MVPFeature[] = [
  {
    id: 'assessment-flow',
    title: '✅ Complete Assessment Flow',
    description: '15-step psychological assessment with progress tracking',
    status: 'completed'
  },
  {
    id: 'ai-analysis',
    title: '✅ AI Results Analysis',
    description: 'Personalized readiness scores and compatibility insights',
    status: 'completed'
  },
  {
    id: 'match-generation',
    title: '✅ Smart Match Generation',
    description: 'Research-based compatibility algorithm with detailed scoring',
    status: 'completed'
  },
  {
    id: 'compatibility-algorithm',
    title: '✅ Advanced Compatibility Engine',
    description: 'Multi-dimensional scoring with attachment, personality, values',
    status: 'completed'
  },
  {
    id: 'preferences-system',
    title: '✅ Preference Filtering System',
    description: 'Age, gender, deal-breakers, and must-haves filtering',
    status: 'completed'
  },
  {
    id: 'match-pool',
    title: '✅ Match Pool Management',
    description: 'Smart filtering of passed users and pool refresh logic',
    status: 'completed'
  },
  {
    id: 'ui-polish',
    title: '✅ Professional UI/UX',
    description: 'Dating app quality interface and user experience',
    status: 'completed'
  },
  {
    id: 'local-persistence',
    title: '✅ Session Persistence',
    description: 'User data and progress saved locally for testing',
    status: 'completed'
  }
];

export const criticalGaps: CriticalGap[] = [
  {
    id: 'match-decisions',
    title: '🔥 Enhanced Match Decisions',
    description: 'Improve decision persistence and mutual match detection',
    priority: 'HIGH',
    time: '20 mins'
  },
  {
    id: 'connection-flow',
    title: '⚡ Connection States UI',
    description: 'Better visual feedback for match interactions',
    priority: 'MEDIUM',
    time: '15 mins'
  },
  {
    id: 'messaging-system',
    title: '🚀 Basic Messaging System',
    description: 'Simple chat interface for connected matches',
    priority: 'HIGH',
    time: '45 mins'
  }
];
