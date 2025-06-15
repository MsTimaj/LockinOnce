
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, CheckCircle, Circle, Target, Zap, Users, MessageSquare } from "lucide-react";

interface ProjectStatusChecklistProps {
  onClose: () => void;
}

const ProjectStatusChecklist = ({ onClose }: ProjectStatusChecklistProps) => {
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set([
    'assessment-system',
    'compatibility-algorithm',
    'ai-analysis',
    'match-generation',
    'ui-components',
    'session-management',
    'preference-filtering',
    'match-decisions',
    'pool-management'
  ]));

  const toggleItem = (id: string) => {
    const newCompleted = new Set(completedItems);
    if (newCompleted.has(id)) {
      newCompleted.delete(id);
    } else {
      newCompleted.add(id);
    }
    setCompletedItems(newCompleted);
  };

  const coreFeatures = [
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

  const nextPhaseFeatures = [
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

  const completedCore = coreFeatures.length;
  const completedNext = nextPhaseFeatures.filter(feature => completedItems.has(feature.id)).length;
  const totalItems = coreFeatures.length + nextPhaseFeatures.length;
  const progressPercentage = ((completedCore + completedNext) / totalItems) * 100;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-auto">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <div>
            <CardTitle className="text-xl font-serif text-gray-800 flex items-center">
              <Target className="h-5 w-5 mr-2 text-blue-500" />
              Project Development Status
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              MVP Complete ({completedCore}/9) • Ready for user testing and enhancement
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Overall Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Development Progress</span>
              <span className="font-medium">{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${(completedCore / totalItems) * 100}%` }}
              />
            </div>
          </div>

          {/* Core MVP Features (Completed) */}
          <div>
            <h3 className="text-lg font-semibold text-emerald-700 mb-3 flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              Core MVP Features ✅ COMPLETE
            </h3>
            <div className="grid gap-2">
              {coreFeatures.map((feature) => (
                <div key={feature.id} className="flex items-start space-x-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                  <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-emerald-800">{feature.title}</div>
                    <div className="text-sm text-emerald-700">{feature.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Phase Features */}
          <div>
            <h3 className="text-lg font-semibold text-blue-700 mb-3 flex items-center">
              <Zap className="h-5 w-5 mr-2" />
              Next Phase Enhancements (Optional)
            </h3>
            <div className="space-y-3">
              {nextPhaseFeatures.map((feature) => {
                const isCompleted = completedItems.has(feature.id);
                return (
                  <div 
                    key={feature.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      isCompleted 
                        ? 'bg-emerald-50 border-emerald-200' 
                        : 'bg-blue-50 border-blue-200 hover:bg-blue-100'
                    }`}
                    onClick={() => toggleItem(feature.id)}
                  >
                    <div className="flex items-start space-x-3">
                      {isCompleted ? (
                        <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                      ) : (
                        <Circle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className={`font-medium ${isCompleted ? 'text-emerald-800' : 'text-blue-800'}`}>
                            {feature.title}
                          </div>
                          <div className="flex items-center space-x-2 flex-shrink-0">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              feature.priority === 'NEXT' 
                                ? 'bg-blue-100 text-blue-700' 
                                : 'bg-gray-100 text-gray-700'
                            }`}>
                              {feature.priority}
                            </span>
                            <span className="text-xs text-gray-500">{feature.time}</span>
                          </div>
                        </div>
                        <div className={`text-sm mb-2 ${isCompleted ? 'text-emerald-700' : 'text-blue-700'}`}>
                          {feature.description}
                        </div>
                        <div className="text-xs text-gray-600 italic">
                          Impact: {feature.impact}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Current Status Summary */}
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
            <h4 className="font-semibold text-emerald-800 mb-3 flex items-center">
              <Target className="h-4 w-4 mr-2" />
              Current Status: MVP Complete & Demo Ready
            </h4>
            <div className="space-y-2 text-sm text-emerald-700">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                <strong>Full User Journey:</strong> Assessment → AI Analysis → Smart Matches
              </div>
              <div className="flex items-center">
                <Zap className="h-4 w-4 mr-2" />
                <strong>Advanced Matching:</strong> Psychological compatibility with explanations
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" />
                <strong>Match Interactions:</strong> Like/pass system with persistence
              </div>
              <div className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-2" />
                <strong>Ready for:</strong> User testing, demos, and feedback collection
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 pt-4">
            <Button 
              variant="outline"
              onClick={onClose}
              className="px-6"
            >
              Close
            </Button>
            <Button 
              onClick={onClose}
              className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-8"
            >
              MVP Ready! 🎉
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectStatusChecklist;
