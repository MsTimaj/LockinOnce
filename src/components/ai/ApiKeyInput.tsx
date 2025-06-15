
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ApiKeyInputProps {
  apiKey: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

const ApiKeyInput = ({ apiKey, onChange, onSubmit }: ApiKeyInputProps) => {
  return (
    <div className="p-4 bg-amber-50 border-b border-amber-200">
      <p className="text-sm text-amber-800 mb-2">Enter your Anthropic API key to enable AI responses:</p>
      <div className="flex space-x-2">
        <Input
          type="password"
          value={apiKey}
          onChange={(e) => onChange(e.target.value)}
          placeholder="sk-ant-..."
          className="flex-1 text-xs"
        />
        <Button size="sm" onClick={onSubmit}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default ApiKeyInput;
