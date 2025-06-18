
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { randomizeQuestionsWithOptions } from "@/utils/assessments/questionRandomizer";
import { useScrollToTop } from "./hooks/useScrollToTop";
import { relationshipIntentQuestions } from "./relationshipIntent/questions";
import { calculateRelationshipIntentResults, RelationshipIntentResults } from "./relationshipIntent/scoring";
import { AssessmentHeader } from "./relationshipIntent/AssessmentHeader";
import { QuestionCard } from "./relationshipIntent/QuestionCard";

interface RelationshipIntentAssessmentProps {
  onComplete: (results: RelationshipIntentResults) => void;
}

// Re-export the results type for backward compatibility
export type { RelationshipIntentResults } from "./relationshipIntent/scoring";

const RelationshipIntentAssessment = ({ onComplete }: RelationshipIntentAssessmentProps) => {
  useScrollToTop();
  
  const [questions] = useState(() => randomizeQuestionsWithOptions(relationshipIntentQuestions));
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
      const results = calculateRelationshipIntentResults(answers);
      console.log('Relationship Intent Results:', results);
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

export default RelationshipIntentAssessment;
