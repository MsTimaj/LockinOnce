
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";

interface AttachmentStyleAssessmentProps {
  onComplete: (results: AttachmentStyleResults) => void;
}

export interface AttachmentStyleResults {
  secure: number;
  anxious: number;
  avoidant: number;
  disorganized: number;
  dominantStyle: string;
}

const questions = [
  {
    id: 1,
    text: "When my partner is away for an extended period, I:",
    options: [
      { value: "secure", text: "Miss them but trust they'll return and maintain my own activities" },
      { value: "anxious", text: "Feel anxious and worry about our relationship constantly" },
      { value: "avoidant", text: "Feel relieved to have space and independence" },
      { value: "disorganized", text: "Have mixed feelings - sometimes missing them, sometimes feeling relieved" }
    ]
  },
  {
    id: 2,
    text: "During conflicts with my partner, I typically:",
    options: [
      { value: "secure", text: "Stay calm and work together to find solutions" },
      { value: "anxious", text: "Get emotional and seek immediate reassurance" },
      { value: "avoidant", text: "Withdraw and prefer to handle things alone" },
      { value: "disorganized", text: "React unpredictably - sometimes pursuing, sometimes withdrawing" }
    ]
  },
  {
    id: 3,
    text: "When it comes to expressing my feelings in relationships, I:",
    options: [
      { value: "secure", text: "Find it natural and comfortable to share openly" },
      { value: "anxious", text: "Share intensely and frequently, seeking validation" },
      { value: "avoidant", text: "Prefer to keep feelings private and maintain independence" },
      { value: "disorganized", text: "Struggle with inconsistent emotional expression" }
    ]
  },
  {
    id: 4,
    text: "My typical approach to intimacy is:",
    options: [
      { value: "secure", text: "I'm comfortable with closeness and maintain my sense of self" },
      { value: "anxious", text: "I crave closeness but worry about being abandoned" },
      { value: "avoidant", text: "I value independence and can feel overwhelmed by too much closeness" },
      { value: "disorganized", text: "I want intimacy but find it scary and unpredictable" }
    ]
  },
  {
    id: 5,
    text: "When my partner seems distant or preoccupied, I:",
    options: [
      { value: "secure", text: "Give them space while being available for support" },
      { value: "anxious", text: "Immediately worry and try to reconnect or get reassurance" },
      { value: "avoidant", text: "Use it as an opportunity to focus on my own interests" },
      { value: "disorganized", text: "Feel confused and react inconsistently" }
    ]
  }
];

const AttachmentStyleAssessment = ({ onComplete }: AttachmentStyleAssessmentProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: value
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
  };

  const calculateResults = () => {
    const scores = {
      secure: 0,
      anxious: 0,
      avoidant: 0,
      disorganized: 0
    };

    Object.values(answers).forEach(answer => {
      scores[answer as keyof typeof scores]++;
    });

    const dominantStyle = Object.entries(scores).reduce((a, b) => 
      scores[a[0] as keyof typeof scores] > scores[b[0] as keyof typeof scores] ? a : b
    )[0];

    const results: AttachmentStyleResults = {
      ...scores,
      dominantStyle
    };

    onComplete(results);
  };

  const currentQuestionData = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-playfair font-bold text-foreground">
          Attachment Style Assessment
        </h2>
        <p className="text-muted-foreground">
          Question {currentQuestion + 1} of {questions.length}
        </p>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <Card className="card-glass">
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-6 text-foreground">
            {currentQuestionData.text}
          </h3>
          
          <RadioGroup 
            value={answers[currentQuestionData.id] || ""} 
            onValueChange={handleAnswer}
            className="space-y-4"
          >
            {currentQuestionData.options.map((option, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 rounded-lg hover:bg-accent/50 transition-colors">
                <RadioGroupItem 
                  value={option.value} 
                  id={`option-${index}`}
                  className="mt-0.5"
                />
                <Label 
                  htmlFor={`option-${index}`} 
                  className="text-sm leading-relaxed cursor-pointer flex-1"
                >
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      <Button 
        onClick={nextQuestion}
        disabled={!answers[currentQuestionData.id]}
        className="btn-gradient w-full"
      >
        {currentQuestion === questions.length - 1 ? 'Complete Assessment' : 'Next Question'}
        <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
};

export default AttachmentStyleAssessment;
