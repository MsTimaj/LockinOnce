
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, CheckCircle, Circle, AlertTriangle, Rocket } from "lucide-react";

interface UpdateChecklistProps {
  onClose: () => void;
}

const UpdateChecklist = ({ onClose }: UpdateChecklistProps) => {
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set([
    'assessment-flow',
    'ai-analysis',
    'match-generation',
    'ui-polish',
    'local-persistence',
    'compatibility-algorithm',
    'preferences-system',
    'match-pool'
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

  const mvpFeatures = [
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

  const criticalGaps = [
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

  const completedCount = mvpFeatures.length;
  const gapsCount = criticalGaps.filter(gap => completedItems.has(gap.id)).length;
  const totalProgress = ((completedCount + gapsCount) / (mvpFeatures.length + criticalGaps.length)) * 100;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <div>
            <CardTitle className="text-xl font-serif text-gray-800 flex items-center">
              <Rocket className="h-5 w-5 mr-2 text-rose-500" />
              MVP Status - December 2024
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              {Math.round(totalProgress)}% Complete • Core functionality ready for demo
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${totalProgress}%` }}
            />
          </div>

          {/* MVP Core Features (Completed) */}
          <div>
            <h3 className="text-lg font-semibold text-emerald-700 mb-3 flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              MVP Foundation ✅ COMPLETE
            </h3>
            <div className="space-y-2">
              {mvpFeatures.map((feature) => (
                <div key={feature.id} className="flex items-start space-x-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                  <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="font-medium text-emerald-800">{feature.title}</div>
                    <div className="text-sm text-emerald-700">{feature.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhancement Opportunities */}
          <div>
            <h3 className="text-lg font-semibold text-blue-700 mb-3 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Enhancement Opportunities
            </h3>
            <div className="space-y-2">
              {criticalGaps.map((gap) => {
                const isCompleted = completedItems.has(gap.id);
                return (
                  <div 
                    key={gap.id}
                    className={`flex items-start space-x-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      isCompleted 
                        ? 'bg-emerald-50 border-emerald-200' 
                        : 'bg-blue-50 border-blue-200 hover:bg-blue-100'
                    }`}
                    onClick={() => toggleItem(gap.id)}
                  >
                    {isCompleted ? (
                      <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5" />
                    ) : (
                      <Circle className="h-5 w-5 text-blue-500 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className={`font-medium ${isCompleted ? 'text-emerald-800' : 'text-blue-800'}`}>
                          {gap.title}
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            gap.priority === 'HIGH' 
                              ? 'bg-amber-100 text-amber-700' 
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {gap.priority}
                          </span>
                          <span className="text-xs text-gray-500">{gap.time}</span>
                        </div>
                      </div>
                      <div className={`text-sm ${isCompleted ? 'text-emerald-700' : 'text-blue-700'}`}>
                        {gap.description}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Current Status Summary */}
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
            <h4 className="font-semibold text-emerald-800 mb-2">🎯 Current MVP Status</h4>
            <div className="space-y-1 text-sm text-emerald-700">
              <div>✅ <strong>Complete User Journey</strong> - Assessment → AI Analysis → Smart Matches</div>
              <div>✅ <strong>Advanced Matching</strong> - Psychological compatibility with detailed scoring</div>
              <div>✅ <strong>Professional Experience</strong> - Ready for demo and user testing</div>
              <div>✅ <strong>Preference System</strong> - Age, gender, deal-breakers filtering working</div>
              <div className="pt-2 text-emerald-800 font-medium">
                🚀 MVP is functional and demo-ready! Enhancements are optional polish.
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-center pt-4">
            <Button 
              onClick={onClose}
              className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-8"
            >
              MVP Ready to Demo! 🎉
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateChecklist;
