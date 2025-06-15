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
  Sparkles
} from "lucide-react";

interface ChecklistItem {
  id: string;
  title: string;
  status: 'complete' | 'incomplete' | 'in-progress' | 'critical';
  category: string;
  description?: string;
  priority: 'high' | 'medium' | 'low';
}

interface ProjectStatusChecklistProps {
  onClose: () => void;
}

const ProjectStatusChecklist = ({ onClose }: ProjectStatusChecklistProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const checklistData: ChecklistItem[] = [
    // Core MVP Foundation - COMPLETE
    { id: 'landing-page', title: 'Landing page with value proposition', status: 'complete', category: 'foundation', priority: 'high' },
    { id: 'ui-components', title: 'Base UI components and design system', status: 'complete', category: 'foundation', priority: 'high' },
    { id: 'routing', title: 'Core routing structure', status: 'complete', category: 'foundation', priority: 'high' },
    { id: 'responsive-design', title: 'Mobile-responsive design', status: 'complete', category: 'foundation', priority: 'high' },

    // Assessment System - COMPLETE
    { id: 'onboarding-flow', title: 'Complete 14-step assessment flow', status: 'complete', category: 'assessment', priority: 'high' },
    { id: 'progress-tracking', title: 'Assessment progress tracking', status: 'complete', category: 'assessment', priority: 'high' },
    { id: 'results-display', title: 'Assessment results display', status: 'complete', category: 'assessment', priority: 'high' },
    { id: 'readiness-scoring', title: 'Comprehensive readiness scoring system', status: 'complete', category: 'assessment', priority: 'high' },

    // Matching System - SIGNIFICANTLY IMPROVED
    { id: 'match-generation', title: 'Generate matches from assessment data', status: 'complete', category: 'matching', priority: 'high' },
    { id: 'compatibility-scoring', title: 'Research-based compatibility calculation algorithm', status: 'complete', category: 'matching', priority: 'high', description: 'Enhanced with psychological research and detailed explanations' },
    { id: 'match-detail-views', title: 'Detailed match profiles with compatibility breakdown', status: 'in-progress', category: 'matching', priority: 'high', description: 'Algorithm complete, UI improvements needed' },
    { id: 'connection-system', title: 'Simple connection/interest system', status: 'incomplete', category: 'matching', priority: 'high', description: 'Basic like/pass functionality for MVP' },

    // AI Coach - NEEDS ENHANCEMENT
    { id: 'lovevee-interface', title: 'Love-vee chat interface', status: 'complete', category: 'ai', priority: 'medium' },
    { id: 'lovevee-responses', title: 'Contextual Love-vee responses', status: 'in-progress', category: 'ai', priority: 'medium', description: 'Needs more intelligent, context-aware responses' },
    { id: 'coaching-advice', title: 'Relationship coaching content', status: 'incomplete', category: 'ai', priority: 'medium' },

    // Data & Persistence - ENHANCED
    { id: 'local-storage', title: 'Reliable localStorage management', status: 'complete', category: 'data', priority: 'high' },
    { id: 'state-persistence', title: 'User state persistence between sessions', status: 'complete', category: 'data', priority: 'high', description: 'Recently refactored into modular architecture' },
    { id: 'state-architecture', title: 'Modular state management architecture', status: 'complete', category: 'data', priority: 'medium', description: 'Refactored into ValidationUtils, NavigationStateManager, etc.' },

    // User Experience Enhancements
    { id: 'profile-insights', title: 'User profile insights page', status: 'incomplete', category: 'ux', priority: 'medium', description: 'Help users understand their own assessment results' },
    { id: 'match-diversity', title: 'Diverse, realistic match profiles', status: 'in-progress', category: 'ux', priority: 'medium', description: 'Basic profiles exist, need enhancement' },
    { id: 'compatibility-education', title: 'Compatibility explanations for users', status: 'in-progress', category: 'ux', priority: 'medium', description: 'Algorithm provides explanations, UI integration needed' },

    // Polish & Demo Ready
    { id: 'error-handling', title: 'Graceful error handling throughout app', status: 'incomplete', category: 'polish', priority: 'medium' },
    { id: 'loading-states', title: 'Proper loading states and feedback', status: 'in-progress', category: 'polish', priority: 'low' },
    { id: 'final-ui-polish', title: 'Final UI/UX polish for demo', status: 'in-progress', category: 'polish', priority: 'low' },

    // Future Enhancements (Post-MVP)
    { id: 'authentication', title: 'User authentication system', status: 'incomplete', category: 'future', priority: 'low', description: 'Not needed for MVP demo' },
    { id: 'real-messaging', title: 'Real-time messaging system', status: 'incomplete', category: 'future', priority: 'low', description: 'Post-MVP feature' },
    { id: 'advanced-matching', title: 'Advanced matching algorithms', status: 'incomplete', category: 'future', priority: 'low', description: 'Current algorithm sufficient for MVP' },
  ];

  const categories = [
    { id: 'all', name: 'All Items', icon: <Sparkles className="h-4 w-4" /> },
    { id: 'foundation', name: 'Foundation', icon: <Code className="h-4 w-4" /> },
    { id: 'assessment', name: 'Assessment', icon: <Heart className="h-4 w-4" /> },
    { id: 'matching', name: 'Matching', icon: <Users className="h-4 w-4" /> },
    { id: 'ai', name: 'Love-vee AI', icon: <MessageSquare className="h-4 w-4" /> },
    { id: 'data', name: 'Data', icon: <Database className="h-4 w-4" /> },
    { id: 'ux', name: 'User Experience', icon: <Palette className="h-4 w-4" /> },
    { id: 'polish', name: 'Polish', icon: <Settings className="h-4 w-4" /> },
    { id: 'future', name: 'Future Features', icon: <AlertTriangle className="h-4 w-4" /> },
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

  const getCategoryStats = (categoryId: string) => {
    const items = categoryId === 'all' ? checklistData : checklistData.filter(item => item.category === categoryId);
    const completed = items.filter(item => item.status === 'complete').length;
    const critical = items.filter(item => item.status === 'critical').length;
    return { total: items.length, completed, critical };
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden bg-white/95 backdrop-blur-xl border-0 shadow-2xl">
        <CardHeader className="pb-4 border-b bg-gradient-to-r from-rose-50 to-pink-50">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold text-gray-800">
                LockInOnce MVP Development Status
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">Recently enhanced compatibility algorithms and state management</p>
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
          </div>
        </CardHeader>
        
        <div className="flex h-[calc(90vh-200px)]">
          {/* Sidebar */}
          <div className="w-64 border-r bg-gray-50/50 p-4 overflow-y-auto">
            <div className="space-y-2">
              {categories.map((category) => {
                const stats = getCategoryStats(category.id);
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all ${
                      selectedCategory === category.id 
                        ? 'bg-rose-100 border border-rose-200 text-rose-800' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      {category.icon}
                      <span className="text-sm font-medium">{category.name}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {stats.completed}/{stats.total}
                      {stats.critical > 0 && <span className="text-red-500 ml-1">⚠</span>}
                    </div>
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
