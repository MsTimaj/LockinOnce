
import { Target, Users, Zap, CheckCircle, MessageSquare } from "lucide-react";

const StatusSummary = () => {
  return (
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
  );
};

export default StatusSummary;
