
import { CheckCircle } from "lucide-react";
import { CoreFeature } from './types';

interface CoreFeaturesSectionProps {
  features: CoreFeature[];
}

const CoreFeaturesSection = ({ features }: CoreFeaturesSectionProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-emerald-700 mb-3 flex items-center">
        <CheckCircle className="h-5 w-5 mr-2" />
        Core MVP Features ✅ COMPLETE
      </h3>
      <div className="grid gap-2">
        {features.map((feature) => (
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
  );
};

export default CoreFeaturesSection;
