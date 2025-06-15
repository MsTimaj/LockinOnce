
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
    // Week 1: Foundation & Setup
    { id: 'playfair-font', title: 'Add Playfair Display font for headings', status: 'complete', category: 'foundation', priority: 'medium' },
    { id: 'ui-components', title: 'Create base UI components (Button, Input, Card, etc.)', status: 'complete', category: 'foundation', priority: 'high' },
    { id: 'dual-theme', title: 'Implement dual theme (Daylight/Twilight modes)', status: 'incomplete', category: 'foundation', priority: 'medium' },
    { id: 'routing', title: 'Set up routing structure for all screens', status: 'complete', category: 'foundation', priority: 'high' },
    { id: 'responsive-layout', title: 'Create responsive layout foundation', status: 'complete', category: 'foundation', priority: 'high' },

    // Week 2: Authentication & Onboarding
    { id: 'landing-screen', title: 'Landing/Welcome screen with LockInOnce philosophy', status: 'complete', category: 'authentication', priority: 'high' },
    { id: 'auth-system', title: 'User registration/login system', status: 'critical', category: 'authentication', priority: 'high', description: 'Requires Supabase integration' },
    { id: 'onboarding-welcome', title: 'Onboarding Step 1: Welcome & Philosophy explanation', status: 'complete', category: 'onboarding', priority: 'high' },
    { id: 'attachment-assessment', title: 'Onboarding Step 2: Attachment Style assessment', status: 'complete', category: 'onboarding', priority: 'high' },
    { id: 'birth-order', title: 'Onboarding Step 3: Birth Order & family dynamics', status: 'complete', category: 'onboarding', priority: 'medium' },
    { id: 'personality-assessment', title: 'Onboarding Step 4: Personality assessment (I/E + T/F)', status: 'complete', category: 'onboarding', priority: 'high' },
    { id: 'relationship-intent', title: 'Onboarding Step 5: Relationship Intent selection', status: 'complete', category: 'onboarding', priority: 'high' },
    { id: 'emotional-capacity', title: 'Onboarding Step 6: Emotional Capacity self-assessment', status: 'complete', category: 'onboarding', priority: 'high' },
    { id: 'attraction-layer', title: 'Onboarding Step 7: Attraction Layer (vibes, energy, style)', status: 'complete', category: 'onboarding', priority: 'medium' },
    { id: 'progress-tracking', title: 'Profile completion progress tracking', status: 'complete', category: 'onboarding', priority: 'medium' },

    // Week 3: Core Matching System
    { id: 'profile-dashboard', title: 'User profile dashboard/settings (basic version)', status: 'complete', category: 'matching', priority: 'high' },
    { id: 'compatibility-algorithm', title: 'Real compatibility algorithm implementation', status: 'critical', category: 'matching', priority: 'high', description: 'Currently using mock data' },
    { id: 'daily-matches', title: 'Daily matches dashboard', status: 'complete', category: 'matching', priority: 'high' },
    { id: 'match-detail', title: 'Individual match detail view', status: 'incomplete', category: 'matching', priority: 'high' },
    { id: 'connection-system', title: 'Connection request system (non-swipe)', status: 'incomplete', category: 'matching', priority: 'high' },
    { id: 'messaging', title: 'Basic messaging/conversation interface', status: 'incomplete', category: 'matching', priority: 'high' },

    // Love-vee AI Integration
    { id: 'lovevee-basic', title: 'Love-vee chat interface', status: 'complete', category: 'ai', priority: 'medium' },
    { id: 'lovevee-intelligence', title: 'Love-vee AI intelligence (real responses)', status: 'critical', category: 'ai', priority: 'high', description: 'Currently scripted responses' },
    { id: 'heart-animations', title: 'Heart animations for Love-vee interactions', status: 'in-progress', category: 'ai', priority: 'low', description: 'Needs debugging on all pages' },
    { id: 'coaching-sessions', title: 'Love-vee coaching sessions', status: 'incomplete', category: 'ai', priority: 'medium' },

    // Assessment Engine
    { id: 'assessment-scoring', title: 'Real assessment scoring system', status: 'critical', category: 'assessment', priority: 'high', description: 'Currently returns static results' },
    { id: 'readiness-scoring', title: 'Relationship readiness scoring', status: 'critical', category: 'assessment', priority: 'high' },
    { id: 'growth-roadmaps', title: 'Growth roadmaps for not-ready users', status: 'incomplete', category: 'assessment', priority: 'high' },
    { id: 'brutal-honesty', title: 'Brutal honesty feedback system', status: 'incomplete', category: 'assessment', priority: 'high' },

    // Design System
    { id: 'sunset-colors', title: 'Sunset Harmony color implementation', status: 'incomplete', category: 'design', priority: 'medium' },
    { id: 'glass-morphism', title: 'Glass morphism cards', status: 'complete', category: 'design', priority: 'low' },
    { id: 'micro-interactions', title: 'Enhanced micro-interactions', status: 'in-progress', category: 'design', priority: 'low' },

    // Data Management
    { id: 'user-state', title: 'User state management system', status: 'critical', category: 'data', priority: 'high', description: 'No persistence between sessions' },
    { id: 'data-persistence', title: 'Local storage/backend integration', status: 'critical', category: 'data', priority: 'high' },
    { id: 'analytics', title: 'Behavioral analytics collection', status: 'incomplete', category: 'data', priority: 'medium' },

    // Missing Screens
    { id: 'profile-management', title: 'Comprehensive profile management', status: 'incomplete', category: 'screens', priority: 'high' },
    { id: 'conversations-screen', title: 'Conversations/messaging screen', status: 'incomplete', category: 'screens', priority: 'high' },
    { id: 'compatibility-insights', title: 'Compatibility insights/education', status: 'incomplete', category: 'screens', priority: 'medium' },
    { id: 'settings-screen', title: 'App settings and preferences', status: 'incomplete', category: 'screens', priority: 'medium' },
    { id: 'growth-plan', title: 'Personal growth plan screen', status: 'incomplete', category: 'screens', priority: 'high' },
  ];

  const categories = [
    { id: 'all', name: 'All Items', icon: <Sparkles className="h-4 w-4" /> },
    { id: 'foundation', name: 'Foundation', icon: <Code className="h-4 w-4" /> },
    { id: 'authentication', name: 'Auth', icon: <Users className="h-4 w-4" /> },
    { id: 'onboarding', name: 'Onboarding', icon: <Heart className="h-4 w-4" /> },
    { id: 'matching', name: 'Matching', icon: <Users className="h-4 w-4" /> },
    { id: 'ai', name: 'Love-vee AI', icon: <MessageSquare className="h-4 w-4" /> },
    { id: 'assessment', name: 'Assessment', icon: <AlertTriangle className="h-4 w-4" /> },
    { id: 'design', name: 'Design', icon: <Palette className="h-4 w-4" /> },
    { id: 'data', name: 'Data', icon: <Database className="h-4 w-4" /> },
    { id: 'screens', name: 'Screens', icon: <Settings className="h-4 w-4" /> },
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
    const total = checklistData.length;
    const completed = checklistData.filter(item => item.status === 'complete').length;
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
                LockInOnce Development Status
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">Complete project checklist and roadmap</p>
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
              <span className="text-gray-600">Overall Progress</span>
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
