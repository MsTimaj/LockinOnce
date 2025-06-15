
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
    'local-persistence'
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
      description: 'Psychological assessment capturing meaningful relationship data',
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
      title: '🔥 Persistent Match Decisions',
      description: 'Save likes/passes in localStorage - decisions should stick',
      priority: 'CRITICAL',
      time: '15 mins'
    },
    {
      id: 'mutual-matching',
      title: '🔥 Mutual Match Detection',
      description: 'Show when both users are interested (simulate for demo)',
      priority: 'CRITICAL',
      time: '20 mins'
    },
    {
      id: 'match-pool',
      title: '🔥 Smart Match Pool',
      description: 'Hide passed users, refresh pool when exhausted',
      priority: 'CRITICAL',
      time: '15 mins'
    },
    {
      id: 'connection-flow',
      title: '⚡ Connection States',
      description: 'Clear next steps after mutual interest',
      priority: 'HIGH',
      time: '10 mins'
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
              MVP Launch Checklist
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              {Math.round(totalProgress)}% Complete • Ready to ship core functionality
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

          {/* Critical Gaps */}
          <div>
            <h3 className="text-lg font-semibold text-rose-700 mb-3 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Critical Gaps (1 Hour to Ship)
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
                        : 'bg-rose-50 border-rose-200 hover:bg-rose-100'
                    }`}
                    onClick={() => toggleItem(gap.id)}
                  >
                    {isCompleted ? (
                      <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5" />
                    ) : (
                      <Circle className="h-5 w-5 text-rose-500 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className={`font-medium ${isCompleted ? 'text-emerald-800' : 'text-rose-800'}`}>
                          {gap.title}
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            gap.priority === 'CRITICAL' 
                              ? 'bg-red-100 text-red-700' 
                              : 'bg-amber-100 text-amber-700'
                          }`}>
                            {gap.priority}
                          </span>
                          <span className="text-xs text-gray-500">{gap.time}</span>
                        </div>
                      </div>
                      <div className={`text-sm ${isCompleted ? 'text-emerald-700' : 'text-rose-700'}`}>
                        {gap.description}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* MVP Demo Script */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">🎯 MVP Demo Script (5 mins)</h4>
            <div className="space-y-1 text-sm text-blue-700">
              <div>1. Assessment Flow (2 mins) - "Psychological-based matching"</div>
              <div>2. AI Results (1 min) - "Personalized readiness analysis"</div>
              <div>3. Smart Matches (2 mins) - "Compatibility-driven connections"</div>
              <div>4. User Interaction (30s) - "Interest/connection system"</div>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-center pt-4">
            <Button 
              onClick={onClose}
              className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-8"
            >
              Let's Ship This MVP! 🚀
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateChecklist;
