
import { CheckCircle, Circle, AlertTriangle } from "lucide-react";
import { CriticalGap } from './types';

interface EnhancementOpportunitiesSectionProps {
  gaps: CriticalGap[];
  completedItems: Set<string>;
  onToggleItem: (id: string) => void;
}

const EnhancementOpportunitiesSection = ({ gaps, completedItems, onToggleItem }: EnhancementOpportunitiesSectionProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-blue-700 mb-3 flex items-center">
        <AlertTriangle className="h-5 w-5 mr-2" />
        Enhancement Opportunities
      </h3>
      <div className="space-y-2">
        {gaps.map((gap) => {
          const isCompleted = completedItems.has(gap.id);
          return (
            <div 
              key={gap.id}
              className={`flex items-start space-x-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                isCompleted 
                  ? 'bg-emerald-50 border-emerald-200' 
                  : 'bg-blue-50 border-blue-200 hover:bg-blue-100'
              }`}
              onClick={() => onToggleItem(gap.id)}
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
  );
};

export default EnhancementOpportunitiesSection;
