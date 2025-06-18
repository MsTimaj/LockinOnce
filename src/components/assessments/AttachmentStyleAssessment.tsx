
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AttachmentStyleAssessmentProps, AttachmentStyleResults } from "./attachment/types";
import { attachmentQuestions } from "./attachment/questions";
import { calculateAttachmentResults } from "./attachment/scoring";
import { randomizeQuestionsWithOptions } from "@/utils/assessments/questionRandomizer";
import { useScrollToTop } from "./hooks/useScrollToTop";
import AssessmentHeader from "./attachment/AssessmentHeader";
import QuestionCard from "./attachment/QuestionCard";

const AttachmentStyleAssessment = ({ onComplete }: AttachmentStyleAssessmentProps) => {
  useScrollToTop();
  
  const [questions] = useState(() => randomizeQuestionsWithOptions(attachmentQuestions));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleAnswer = (value: string) => {
    console.log('Answer selected:', value, 'for question:', questions[currentQuestion].id);
    setAnswers(prev => {
      const updated = {
        ...prev,
        [questions[currentQuestion].id]: value
      };
      console.log('Updated answers:', updated);
      return updated;
    });
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      completeAssessment();
    }
  };

  const completeAssessment = () => {
    const results = calculateAttachmentResults(answers);
    console.log('Attachment Style Results:', results);
    onComplete(results);
  };

  const currentQuestionData = questions[currentQuestion];
  const currentAnswer = answers[currentQuestionData.id] || "";

  console.log('Current answer for question', currentQuestionData.id, ':', currentAnswer);

  return (
    <div className="space-y-6">
      <AssessmentHeader 
        currentQuestion={currentQuestion}
        totalQuestions={questions.length}
      />

      <QuestionCard
        question={currentQuestionData}
        currentAnswer={currentAnswer}
        onAnswer={handleAnswer}
      />

      <Button 
        onClick={nextQuestion}
        disabled={!currentAnswer}
        className="btn-gradient w-full"
      >
        {currentQuestion === questions.length - 1 ? 'Complete Assessment' : 'Next Question'}
        <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
};

export default AttachmentStyleAssessment;
export type { AttachmentStyleResults };
