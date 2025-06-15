
interface ProgressBarProps {
  completedCore: number;
  totalItems: number;
}

const ProgressBar = ({ completedCore, totalItems }: ProgressBarProps) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>Development Progress</span>
        <span className="font-medium">{Math.round((completedCore / totalItems) * 100)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div 
          className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-3 rounded-full transition-all duration-300"
          style={{ width: `${(completedCore / totalItems) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
