
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { randomizeQuestionsWithOptions } from "@/utils/assessments/questionRandomizer";
import { useScrollToTop } from "./hooks/useScrollToTop";
import { emotionalCapacityQuestions } from "./emotionalCapacity/questions";
import { calculateEmotionalCapacityResults, EmotionalCapacityResults } from "./emotionalCapacity/scoring";
import { AssessmentHeader } from "./emotionalCapacity/AssessmentHeader";
import { QuestionCard } from "./emotionalCapacity/QuestionCard";

interface EmotionalCapacityAssessmentProps {
  onComplete: (results: EmotionalCapacityResults) => void;
}

// Re-export the results type for backward compatibility
export type { EmotionalCapacityResults } from "./emotionalCapacity/scoring";

const EmotionalCapacityAssessment = ({ onComplete }: EmotionalCapacityAssessmentProps) => {
  useScrollToTop();
  
  const [questions] = useState(() => randomizeQuestionsWithOptions(emotionalCapacityQuestions));
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
      const results = calculateEmotionalCapacityResults(answers);
      console.log('Emotional Capacity Results:', results);
      onComplete(results);
    }
  };

  const currentQuestionData = questions[currentQuestion];

  return (
    <div className="space-y-6">
      <AssessmentHeader 
        currentQuestion={currentQuestion} 
        totalQuestions={questions.length} 
      />

      <QuestionCard
        question={currentQuestionData}
        selectedValue={answers[currentQuestionData.id] || ""}
        onValueChange={handleAnswer}
      />

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

export default EmotionalCapacityAssessment;
