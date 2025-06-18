
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { EmotionalCapacityQuestion } from "./questions";

interface QuestionCardProps {
  question: EmotionalCapacityQuestion;
  selectedValue: string;
  onValueChange: (value: string) => void;
}

export const QuestionCard = ({ question, selectedValue, onValueChange }: QuestionCardProps) => {
  return (
    <Card className="card-glass">
      <CardContent className="p-6">
        <h3 className="text-lg font-medium mb-6 text-foreground leading-relaxed">
          {question.text}
        </h3>
        
        <RadioGroup 
          value={selectedValue} 
          onValueChange={onValueChange}
          className="space-y-4"
        >
          {question.options.map((option, index) => (
            <div key={`${question.id}-${option.value}-${index}`} className="flex items-start space-x-3 p-4 rounded-lg hover:bg-accent/50 transition-colors">
              <RadioGroupItem 
                value={option.value} 
                id={`q${question.id}-option-${index}`}
                className="mt-0.5 flex-shrink-0"
              />
              <Label 
                htmlFor={`q${question.id}-option-${index}`}
                className="text-sm leading-relaxed cursor-pointer flex-1"
              >
                {option.text}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};
