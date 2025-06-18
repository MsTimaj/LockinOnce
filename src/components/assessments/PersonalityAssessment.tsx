
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import { randomizeQuestionsWithOptions } from "@/utils/assessments/questionRandomizer";

interface PersonalityAssessmentProps {
  onComplete: (results: PersonalityResults) => void;
}

export interface PersonalityResults {
  introversion: number;
  extroversion: number;
  thinking: number;
  feeling: number;
  dominantType: string;
}

const baseQuestions = [
  {
    id: 1,
    text: "When making important decisions, I typically:",
    options: [
      { value: "thinking", text: "Analyze facts and logic first, then consider emotions" },
      { value: "feeling", text: "Consider how it affects people and relationships first" },
    ]
  },
  {
    id: 2,
    text: "In social situations, I usually:",
    options: [
      { value: "extroversion", text: "Feel energized and seek out conversations" },
      { value: "introversion", text: "Prefer smaller groups or one-on-one interactions" },
    ]
  },
  {
    id: 3,
    text: "When processing information, I tend to:",
    options: [
      { value: "thinking", text: "Focus on objective facts and logical consistency" },
      { value: "feeling", text: "Consider personal values and emotional impact" },
    ]
  },
  {
    id: 4,
    text: "After a long day, I prefer to:",
    options: [
      { value: "introversion", text: "Recharge alone or with close family/friends" },
      { value: "extroversion", text: "Go out and socialize to re-energize" },
    ]
  },
  {
    id: 5,
    text: "When giving feedback, I:",
    options: [
      { value: "thinking", text: "Focus on what can be improved objectively" },
      { value: "feeling", text: "Consider the person's feelings and motivations" },
    ]
  },
  {
    id: 6,
    text: "In group settings, I typically:",
    options: [
      { value: "extroversion", text: "Speak up quickly and think out loud" },
      { value: "introversion", text: "Listen first, then share thoughtful responses" },
    ]
  }
];

const PersonalityAssessment = ({ onComplete }: PersonalityAssessmentProps) => {
  const [questions] = useState(() => randomizeQuestionsWithOptions(baseQuestions));
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
      introversion: 0,
      extroversion: 0,
      thinking: 0,
      feeling: 0
    };

    Object.values(answers).forEach(answer => {
      scores[answer as keyof typeof scores]++;
    });

    const ieType = scores.introversion > scores.extroversion ? 'I' : 'E';
    const tfType = scores.thinking > scores.feeling ? 'T' : 'F';
    const dominantType = `${ieType}${tfType}`;

    const results: PersonalityResults = {
      ...scores,
      dominantType
    };

    onComplete(results);
  };

  const currentQuestionData = questions[currentQuestion];
  // Progress should only reach 100% when all questions are answered
  // Current question is 0-indexed, so progress = currentQuestion / questions.length * 100
  const progress = Math.min((currentQuestion / questions.length) * 100, 95);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-playfair font-bold text-foreground">
          Personality Assessment
        </h2>
        <div className="card-glass p-4">
          <p className="text-sm text-muted-foreground">
            <strong>Why this matters:</strong> Understanding your core personality traits (Introversion/Extroversion + Thinking/Feeling) helps us match you with someone whose energy and decision-making style complements yours for long-term harmony.
          </p>
        </div>
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
              <div key={`${currentQuestionData.id}-${option.value}-${index}`} className="flex items-start space-x-3 p-4 rounded-lg hover:bg-accent/50 transition-colors">
                <RadioGroupItem 
                  value={option.value} 
                  id={`q${currentQuestionData.id}-option-${index}`}
                  className="mt-0.5"
                />
                <Label 
                  htmlFor={`q${currentQuestionData.id}-option-${index}`}
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

export default PersonalityAssessment;
