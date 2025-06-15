
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Check, 
  X, 
  Clock, 
  AlertTriangle,
  Palette,
  Code,
  Users,
  Heart,
  MessageSquare,
  Settings,
  Database,
  Sparkles,
  Shield,
  Zap
} from "lucide-react";

interface ChecklistItem {
  id: string;
  title: string;
  status: 'complete' | 'incomplete' | 'in-progress' | 'critical';
  category: string;
  description?: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
}

interface ProjectStatusChecklistProps {
  onClose: () => void;
}

const ProjectStatusChecklist = ({ onClose }: ProjectStatusChecklistProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('critical');

  const checklistData: ChecklistItem[] = [
    // Foundation - COMPLETE
    { id: 'landing-page', title: 'Landing page with value proposition', status: 'complete', category: 'foundation', priority: 'high' },
    { id: 'ui-components', title: 'Base UI components and design system', status: 'complete', category: 'foundation', priority: 'high' },
    { id: 'routing', title: 'Core routing structure', status: 'complete', category: 'foundation', priority: 'high' },
    { id: 'responsive-design', title: 'Mobile-responsive design', status: 'complete', category: 'foundation', priority: 'high' },

    // Assessment System - COMPLETE
    { id: 'onboarding-flow', title: 'Complete 14-step assessment flow', status: 'complete', category: 'assessment', priority: 'high' },
    { id: 'progress-tracking', title: 'Assessment progress tracking', status: 'complete', category: 'assessment', priority: 'high' },
    { id: 'results-display', title: 'Assessment results display', status: 'complete', category: 'assessment', priority: 'high' },
    { id: 'readiness-scoring', title: 'Comprehensive readiness scoring system', status: 'complete', category: 'assessment', priority: 'high' },
    { id: 'modular-architecture', title: 'Modular assessment state management', status: 'complete', category: 'assessment', priority: 'medium', description: 'Recently refactored into focused modules' },

    // CRITICAL GAPS - Authentication & Backend
    { id: 'user-authentication', title: 'User authentication system', status: 'critical', category: 'critical', priority: 'critical', description: 'Currently using localStorage - need proper auth for MVP' },
    { id: 'data-persistence', title: 'Multi-device data synchronization', status: 'critical', category: 'critical', priority: 'critical', description: 'Essential for user data reliability' },
    { id: 'supabase-integration', title: 'Supabase backend integration', status: 'critical', category: 'critical', priority: 'critical', description: 'Required for real-time features and persistence' },

    // CRITICAL GAPS - Communication System
    { id: 'direct-messaging', title: 'Direct messaging system', status: 'critical', category: 'critical', priority: 'critical', description: 'Core dating app functionality - completely missing' },
    { id: 'real-time-chat', title: 'Real-time chat interface', status: 'critical', category: 'critical', priority: 'critical', description: 'Live messaging with history and status' },
    { id: 'connection-management', title: 'Connection request/acceptance flow', status: 'critical', category: 'critical', priority: 'critical', description: 'Manage user connections and match states' },
    { id: 'match-persistence', title: 'Persistent match interactions', status: 'critical', category: 'critical', priority: 'critical', description: 'Save likes, passes, and connection history' },

    // Matching System - ENHANCED BUT NEEDS WORK
    { id: 'match-generation', title: 'Generate matches from assessment data', status: 'complete', category: 'matching', priority: 'high' },
    { id: 'compatibility-scoring', title: 'Research-based compatibility calculation', status: 'complete', category: 'matching', priority: 'high', description: 'Recently enhanced with psychological research' },
    { id: 'mutual-matching', title: 'Mutual matching logic (both users interested)', status: 'incomplete', category: 'matching', priority: 'high', description: 'Currently one-sided matching only' },
    { id: 'match-pool-management', title: 'Smart match pool regeneration', status: 'incomplete', category: 'matching', priority: 'high', description: 'Passed users can reappear, no refresh logic' },
    { id: 'advanced-filtering', title: 'Match filtering and sorting options', status: 'incomplete', category: 'matching', priority: 'medium', description: 'Distance, age, compatibility score filters' },

    // AI Coach - NEEDS MAJOR ENHANCEMENT
    { id: 'lovevee-interface', title: 'Love-vee chat interface', status: 'complete', category: 'ai', priority: 'medium' },
    { id: 'context-aware-ai', title: 'Context-aware Love-vee responses', status: 'critical', category: 'critical', priority: 'critical', description: 'AI needs user assessment context for personalization' },
    { id: 'personalized-coaching', title: 'Personalized relationship coaching', status: 'incomplete', category: 'ai', priority: 'high', description: 'Coaching based on compatibility insights' },
    { id: 'conversation-starters', title: 'AI-generated conversation prompts', status: 'incomplete', category: 'ai', priority: 'medium', description: 'Help users start meaningful conversations' },

    // Dashboard & UX - NEEDS CONNECTION FEATURES
    { id: 'dashboard-connections', title: 'Connection status management in dashboard', status: 'incomplete', category: 'dashboard', priority: 'high', description: 'Track pending, connected, chatting states' },
    { id: 'match-interaction-history', title: 'Match interaction tracking', status: 'incomplete', category: 'dashboard', priority: 'medium', description: 'Remember user preferences and behavior' },
    { id: 'profile-insights', title: 'User profile insights page', status: 'incomplete', category: 'dashboard', priority: 'medium', description: 'Help users understand their assessment results' },

    // Data & State Management - PARTIALLY COMPLETE
    { id: 'local-storage', title: 'Local state management', status: 'complete', category: 'data', priority: 'high', description: 'Working but needs auth upgrade' },
    { id: 'state-architecture', title: 'Modular state management architecture', status: 'complete', category: 'data', priority: 'medium', description: 'Recently refactored for maintainability' },
    { id: 'real-time-sync', title: 'Real-time data synchronization', status: 'incomplete', category: 'data', priority: 'high', description: 'Required for messaging and live updates' },

    // Polish & Demo Ready
    { id: 'error-handling', title: 'Comprehensive error handling', status: 'incomplete', category: 'polish', priority: 'medium', description: 'Graceful handling of auth, network, and data errors' },
    { id: 'loading-states', title: 'Professional loading states', status: 'in-progress', category: 'polish', priority: 'low' },
    { id: 'final-ui-polish', title: 'Final UI/UX polish for demo', status: 'in-progress', category: 'polish', priority: 'low' },
    { id: 'performance-optimization', title: 'Performance optimization', status: 'incomplete', category: 'polish', priority: 'medium', description: 'Fast message delivery and smooth transitions' },

    // Future Enhancements (Post-MVP)
    { id: 'video-calling', title: 'Video calling integration', status: 'incomplete', category: 'future', priority: 'low', description: 'Advanced communication feature' },
    { id: 'advanced-ml', title: 'Machine learning match optimization', status: 'incomplete', category: 'future', priority: 'low', description: 'Learn from user behavior patterns' },
    { id: 'premium-features', title: 'Premium subscription features', status: 'incomplete', category: 'future', priority: 'low', description: 'Monetization strategy' },
  ];

  const categories = [
    { id: 'critical', name: 'Critical Gaps', icon: <AlertTriangle className="h-4 w-4" />, description: 'Must implement for MVP' },
    { id: 'all', name: 'All Items', icon: <Sparkles className="h-4 w-4" />, description: 'Complete overview' },
    { id: 'foundation', name: 'Foundation', icon: <Code className="h-4 w-4" />, description: 'Core infrastructure' },
    { id: 'assessment', name: 'Assessment', icon: <Heart className="h-4 w-4" />, description: 'User onboarding' },
    { id: 'matching', name: 'Matching', icon: <Users className="h-4 w-4" />, description: 'Compatibility system' },
    { id: 'ai', name: 'Love-vee AI', icon: <MessageSquare className="h-4 w-4" />, description: 'AI coaching' },
    { id: 'dashboard', name: 'Dashboard', icon: <Palette className="h-4 w-4" />, description: 'User interface' },
    { id: 'data', name: 'Data & Auth', icon: <Database className="h-4 w-4" />, description: 'Backend systems' },
    { id: 'polish', name: 'Polish', icon: <Settings className="h-4 w-4" />, description: 'Final touches' },
    { id: 'future', name: 'Future', icon: <Zap className="h-4 w-4" />, description: 'Post-MVP features' },
  ];

  const filteredItems = selectedCategory === 'all' 
    ? checklistData 
    : checklistData.filter(item => item.category === selectedCategory);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'complete': return <Check className="h-4 w-4 text-green-600" />;
      case 'in-progress': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'critical': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <X className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete': return 'bg-green-50 border-green-200';
      case 'in-progress': return 'bg-yellow-50 border-yellow-200';
      case 'critical': return 'bg-red-50 border-red-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'critical': return <Badge variant="destructive" className="text-xs bg-red-600">Critical</Badge>;
      case 'high': return <Badge variant="destructive" className="text-xs">High</Badge>;
      case 'medium': return <Badge variant="secondary" className="text-xs">Medium</Badge>;
      case 'low': return <Badge variant="outline" className="text-xs">Low</Badge>;
      default: return null;
    }
  };

  const calculateProgress = () => {
    const total = checklistData.filter(item => item.category !== 'future').length;
    const completed = checklistData.filter(item => item.status === 'complete' && item.category !== 'future').length;
    return Math.round((completed / total) * 100);
  };

  const getCriticalCount = () => {
    return checklistData.filter(item => item.status === 'critical').length;
  };

  const getCategoryStats = (categoryId: string) => {
    const items = categoryId === 'all' ? checklistData : checklistData.filter(item => item.category === categoryId);
    const completed = items.filter(item => item.status === 'complete').length;
    const critical = items.filter(item => item.status === 'critical').length;
    return { total: items.length, completed, critical };
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-5xl max-h-[90vh] overflow-hidden bg-white/95 backdrop-blur-xl border-0 shadow-2xl">
        <CardHeader className="pb-4 border-b bg-gradient-to-r from-rose-50 to-pink-50">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold text-gray-800">
                LockInOnce MVP Development Status
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                {getCriticalCount()} critical gaps identified for MVP completion
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-3 mt-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">MVP Progress (excluding future features)</span>
              <span className="font-semibold">{calculateProgress()}% Complete</span>
            </div>
            <Progress value={calculateProgress()} className="h-3" />
            
            {getCriticalCount() > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <span className="text-sm font-medium text-red-800">
                    {getCriticalCount()} critical features missing for MVP
                  </span>
                </div>
                <p className="text-xs text-red-700 mt-1">
                  Focus on authentication, messaging, and AI enhancement for demo readiness
                </p>
              </div>
            )}
          </div>
        </CardHeader>
        
        <div className="flex h-[calc(90vh-250px)]">
          {/* Sidebar */}
          <div className="w-72 border-r bg-gray-50/50 p-4 overflow-y-auto">
            <div className="space-y-2">
              {categories.map((category) => {
                const stats = getCategoryStats(category.id);
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex flex-col p-3 rounded-lg text-left transition-all ${
                      selectedCategory === category.id 
                        ? 'bg-rose-100 border border-rose-200 text-rose-800' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        {category.icon}
                        <span className="text-sm font-medium">{category.name}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {stats.completed}/{stats.total}
                        {stats.critical > 0 && <span className="text-red-500 ml-1">⚠{stats.critical}</span>}
                      </div>
                    </div>
                    <p className="text-xs text-gray-600">{category.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Content */}
          <CardContent className="flex-1 p-6 overflow-y-auto">
            <div className="space-y-3">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 rounded-lg border transition-all ${getStatusColor(item.status)}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="mt-0.5">
                        {getStatusIcon(item.status)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-medium text-sm text-gray-800">
                            {item.title}
                          </h3>
                          {getPriorityBadge(item.priority)}
                        </div>
                        
                        {item.description && (
                          <p className="text-xs text-gray-600">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default ProjectStatusChecklist;
