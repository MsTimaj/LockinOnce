
import { Button } from "@/components/ui/button";

interface ApiKeyInputProps {
  apiKey: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

const ApiKeyInput = ({ apiKey, onChange, onSubmit }: ApiKeyInputProps) => {
  return (
    <div className="p-4 bg-blue-50 border-b border-blue-200">
      <div className="text-center">
        <p className="text-sm text-blue-800 font-medium mb-1">💬 Demo Mode</p>
        <p className="text-xs text-blue-700">AI chat responses are not active in this demo version. This feature would provide personalized dating advice and conversation starters.</p>
      </div>
    </div>
  );
};

export default ApiKeyInput;
