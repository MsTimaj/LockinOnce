
import { Calendar } from "lucide-react";

const SessionInfo = () => {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-blue-500" />
          <span className="text-sm font-medium text-blue-800">Project Development Status</span>
        </div>
        <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
          Beta Demo - {currentDate}
        </span>
      </div>
      <p className="text-xs text-blue-700 mt-2">
        🚀 Core features complete • Advanced matching active • Ready for user testing
      </p>
    </div>
  );
};

export default SessionInfo;
