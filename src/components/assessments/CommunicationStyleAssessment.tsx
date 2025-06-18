
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { communicationStyleQuestions } from "./communicationStyle/questions";
import { scoreCommunicationStyle } from "./communicationStyle/scoring";
import { AssessmentHeader } from "./communicationStyle/AssessmentHeader";
import { QuestionCard } from "./communicationStyle/QuestionCard";
import { useScrollToTop } from "./hooks/useScrollToTop";

interface CommunicationStyleAssessmentProps {
  onComplete: (results: CommunicationStyleResults) => void;
}

export interface CommunicationStyleResults {
  communicationStyle: string;
  conflictResolution: string;
  expressionStyle: string;
  listeningStyle: string;
}

const CommunicationStyleAssessment = ({ onComplete }: CommunicationStyleAssessmentProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<Record<number, string>>({});
  
  useScrollToTop(currentQuestion);

  const handleAnswerSelect = (value: string) => {
    console.log(`Question ${currentQuestion + 1} answered:`, value);
    const newResponses = {
      ...responses,
      [communicationStyleQuestions[currentQuestion].id]: value
    };
    setResponses(newResponses);
  };

  const handleNext = () => {
    if (currentQuestion < communicationStyleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Assessment complete
      console.log('Communication Style Assessment completed with responses:', responses);
      const results = scoreCommunicationStyle(responses);
      console.log('Communication Style Results:', results);
      onComplete(results);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const currentQuestionData = communicationStyleQuestions[currentQuestion];
  const currentResponse = responses[currentQuestionData.id] || "";
  const canProceed = currentResponse !== "";
  const isLastQuestion = currentQuestion === communicationStyleQuestions.length - 1;

  return (
    <div className="space-y-6">
      <AssessmentHeader 
        currentQuestion={currentQuestion}
        totalQuestions={communicationStyleQuestions.length}
      />

      <QuestionCard
        question={currentQuestionData}
        selectedValue={currentResponse}
        onValueChange={handleAnswerSelect}
      />

      <div className="flex justify-between items-center pt-4">
        <Button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Previous</span>
        </Button>

        <Button 
          onClick={handleNext}
          disabled={!canProceed}
          className="btn-gradient flex items-center space-x-2"
        >
          <span>{isLastQuestion ? 'Complete Assessment' : 'Next'}</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CommunicationStyleAssessment;
