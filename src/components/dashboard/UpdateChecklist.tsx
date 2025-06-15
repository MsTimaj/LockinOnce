
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Rocket } from "lucide-react";
import { mvpFeatures, criticalGaps } from './updateChecklist/checklistData';
import MVPFeaturesSection from './updateChecklist/MVPFeaturesSection';
import EnhancementOpportunitiesSection from './updateChecklist/EnhancementOpportunitiesSection';
import StatusSummary from './updateChecklist/StatusSummary';
import ProgressBar from './updateChecklist/ProgressBar';

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
          <ProgressBar progress={totalProgress} />
          
          <MVPFeaturesSection features={mvpFeatures} />
          
          <EnhancementOpportunitiesSection 
            gaps={criticalGaps}
            completedItems={completedItems}
            onToggleItem={toggleItem}
          />
          
          <StatusSummary />

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
