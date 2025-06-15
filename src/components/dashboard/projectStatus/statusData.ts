
import { CoreFeature, NextPhaseFeature } from './types';

export const coreFeatures: CoreFeature[] = [
  {
    id: 'assessment-system',
    title: '✅ Comprehensive Assessment System',
    description: '15 research-based assessments with preferences',
    status: 'completed'
  },
  {
    id: 'compatibility-algorithm',
    title: '✅ Advanced Compatibility Algorithm',
    description: 'Multi-dimensional scoring with detailed explanations',
    status: 'completed'
  },
  {
    id: 'ai-analysis',
    title: '✅ AI-Powered Analysis',
    description: 'Personalized insights and relationship readiness scoring',
    status: 'completed'
  },
  {
    id: 'match-generation',
    title: '✅ Smart Match Generation',
    description: 'Compatible profiles with filtering and explanations',
    status: 'completed'
  },
  {
    id: 'preference-filtering',
    title: '✅ Advanced Preference Filtering',
    description: 'Age, gender, deal-breakers, must-haves system',
    status: 'completed'
  },
  {
    id: 'match-decisions',
    title: '✅ Match Decision System',
    description: 'Like/pass tracking with persistent storage',
    status: 'completed'
  },
  {
    id: 'pool-management',
    title: '✅ Smart Pool Management',
    description: 'Hide passed users, mutual match detection',
    status: 'completed'
  },
  {
    id: 'ui-components',
    title: '✅ Professional UI Components',
    description: 'Dating app quality interface and UX',
    status: 'completed'
  },
  {
    id: 'session-management',
    title: '✅ Session Management',
    description: 'User state persistence and data handling',
    status: 'completed'
  }
];

export const nextPhaseFeatures: NextPhaseFeature[] = [
  {
    id: 'messaging-system',
    title: 'Real-time Messaging',
    description: 'Chat interface for connected matches',
    priority: 'NEXT',
    time: '2-3 hours',
    impact: 'Enable actual communication between matches'
  },
  {
    id: 'user-authentication',
    title: 'User Authentication',
    description: 'Supabase auth for multi-device access',
    priority: 'NEXT', 
    time: '1-2 hours',
    impact: 'Persistent accounts across devices'
  },
  {
    id: 'enhanced-ai',
    title: 'Context-Aware AI Coach',
    description: 'Love-vee responses based on user compatibility data',
    priority: 'POLISH',
    time: '1 hour',
    impact: 'More personalized coaching experience'
  }
];
