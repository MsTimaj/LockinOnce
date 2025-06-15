
import { Zap, CheckCircle, Circle } from "lucide-react";
import { NextPhaseFeature } from './types';

interface NextPhaseFeaturesSectionProps {
  features: NextPhaseFeature[];
  completedItems: Set<string>;
  onToggleItem: (id: string) => void;
}

const NextPhaseFeaturesSection = ({ features, completedItems, onToggleItem }: NextPhaseFeaturesSectionProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-blue-700 mb-3 flex items-center">
        <Zap className="h-5 w-5 mr-2" />
        Next Phase Enhancements (Optional)
      </h3>
      <div className="space-y-3">
        {features.map((feature) => {
          const isCompleted = completedItems.has(feature.id);
          return (
            <div 
              key={feature.id}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                isCompleted 
                  ? 'bg-emerald-50 border-emerald-200' 
                  : 'bg-blue-50 border-blue-200 hover:bg-blue-100'
              }`}
              onClick={() => onToggleItem(feature.id)}
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
  );
};

export default NextPhaseFeaturesSection;
