
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, CheckCircle, Circle, Zap, Clock, Target } from "lucide-react";

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
    'session-management'
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
      description: '14 research-based assessments capturing relationship readiness',
      status: 'completed'
    },
    {
      id: 'compatibility-algorithm',
      title: '✅ Advanced Compatibility Algorithm',
      description: 'Multi-dimensional scoring with attachment, personality, values',
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
      description: 'Compatible profiles with detailed explanations',
      status: 'completed'
    },
    {
      id: 'ui-components',
      title: '✅ Professional UI Components',
      description: 'Dating app quality interface and user experience',
      status: 'completed'
    },
    {
      id: 'session-management',
      title: '✅ Session Management',
      description: 'User state persistence and data handling',
      status: 'completed'
    }
  ];

  const criticalMvpGaps = [
    {
      id: 'persistent-decisions',
      title: 'Persistent Match Decisions',
      description: 'Save user likes/passes across sessions',
      priority: 'CRITICAL',
      time: '15 mins',
      impact: 'Users can actually interact with matches meaningfully'
    },
    {
      id: 'mutual-matching',
      title: 'Mutual Match Logic',
      description: 'Detect and show mutual interest between users',
      priority: 'CRITICAL', 
      time: '20 mins',
      impact: 'Core dating app functionality - the "match" moment'
    },
    {
      id: 'smart-pool',
      title: 'Smart Match Pool Management',
      description: 'Hide passed users, refresh intelligently',
      priority: 'HIGH',
      time: '15 mins',
      impact: 'Prevents seeing same rejected matches repeatedly'
    },
    {
      id: 'connection-states',
      title: 'Connection Flow States',
      description: 'Clear progression from interest → match → next steps',
      priority: 'HIGH',
      time: '10 mins',
      impact: 'Users understand what happens after matching'
    }
  ];

  const completedCore = coreFeatures.length;
  const completedGaps = criticalMvpGaps.filter(gap => completedItems.has(gap.id)).length;
  const totalItems = coreFeatures.length + criticalMvpGaps.length;
  const progressPercentage = ((completedCore + completedGaps) / totalItems) * 100;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-auto">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <div>
            <CardTitle className="text-xl font-serif text-gray-800 flex items-center">
              <Target className="h-5 w-5 mr-2 text-blue-500" />
              MVP Launch Status
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              {Math.round(progressPercentage)}% Complete • {completedGaps}/4 critical gaps addressed
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
              <span>Launch Readiness</span>
              <span className="font-medium">{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-400 to-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Core Features (Completed) */}
          <div>
            <h3 className="text-lg font-semibold text-emerald-700 mb-3 flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              Core MVP Features ✅ READY
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

          {/* Critical MVP Gaps */}
          <div>
            <h3 className="text-lg font-semibold text-rose-700 mb-3 flex items-center">
              <Zap className="h-5 w-5 mr-2" />
              Critical for Functional MVP (1 Hour Total)
            </h3>
            <div className="space-y-3">
              {criticalMvpGaps.map((gap) => {
                const isCompleted = completedItems.has(gap.id);
                return (
                  <div 
                    key={gap.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      isCompleted 
                        ? 'bg-emerald-50 border-emerald-200' 
                        : 'bg-amber-50 border-amber-200 hover:bg-amber-100'
                    }`}
                    onClick={() => toggleItem(gap.id)}
                  >
                    <div className="flex items-start space-x-3">
                      {isCompleted ? (
                        <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                      ) : (
                        <Circle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className={`font-medium ${isCompleted ? 'text-emerald-800' : 'text-amber-800'}`}>
                            {gap.title}
                          </div>
                          <div className="flex items-center space-x-2 flex-shrink-0">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              gap.priority === 'CRITICAL' 
                                ? 'bg-red-100 text-red-700' 
                                : 'bg-amber-100 text-amber-700'
                            }`}>
                              {gap.priority}
                            </span>
                            <div className="flex items-center text-xs text-gray-500">
                              <Clock className="h-3 w-3 mr-1" />
                              {gap.time}
                            </div>
                          </div>
                        </div>
                        <div className={`text-sm mb-2 ${isCompleted ? 'text-emerald-700' : 'text-amber-700'}`}>
                          {gap.description}
                        </div>
                        <div className="text-xs text-gray-600 italic">
                          Impact: {gap.impact}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* MVP Strategy Summary */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
              <Target className="h-4 w-4 mr-2" />
              MVP Strategy: Prove Core Value
            </h4>
            <div className="space-y-2 text-sm text-blue-700">
              <div>✅ <strong>Assessment captures meaningful data</strong> - Users get real insights</div>
              <div>✅ <strong>Algorithm produces quality matches</strong> - Compatibility scores are valuable</div>
              <div>✅ <strong>Professional experience</strong> - Feels like a real dating platform</div>
              <div className="pt-2 text-blue-800 font-medium">
                🎯 Complete the 4 critical gaps above = Fully functional matching experience
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
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8"
            >
              Let's Complete the MVP! 🚀
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectStatusChecklist;
