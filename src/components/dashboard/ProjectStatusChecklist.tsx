
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Target } from "lucide-react";
import { coreFeatures, nextPhaseFeatures } from "./projectStatus/statusData";
import ProgressBar from "./projectStatus/ProgressBar";
import CoreFeaturesSection from "./projectStatus/CoreFeaturesSection";
import NextPhaseFeaturesSection from "./projectStatus/NextPhaseFeaturesSection";
import StatusSummary from "./projectStatus/StatusSummary";

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

  const completedCore = coreFeatures.length;
  const completedNext = nextPhaseFeatures.filter(feature => completedItems.has(feature.id)).length;
  const totalItems = coreFeatures.length + nextPhaseFeatures.length;

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
          <ProgressBar completedCore={completedCore} totalItems={totalItems} />
          
          <CoreFeaturesSection features={coreFeatures} />
          
          <NextPhaseFeaturesSection 
            features={nextPhaseFeatures}
            completedItems={completedItems}
            onToggleItem={toggleItem}
          />
          
          <StatusSummary />

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
