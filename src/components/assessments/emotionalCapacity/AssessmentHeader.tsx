
interface AssessmentHeaderProps {
  currentQuestion: number;
  totalQuestions: number;
}

export const AssessmentHeader = ({ currentQuestion, totalQuestions }: AssessmentHeaderProps) => {
  const progress = Math.min((currentQuestion / totalQuestions) * 100, 95);

  return (
    <div className="text-center space-y-4">
      <h2 className="text-2xl font-playfair font-bold text-foreground">
        Emotional Capacity
      </h2>
      <div className="card-glass p-4 border-l-4 border-accent">
        <p className="text-accent font-medium mb-2">
          Behavioral Emotional Intelligence
        </p>
        <p className="text-sm text-muted-foreground">
          <strong>Why this matters:</strong> Your responses to emotional situations reveal your true capacity for handling the ups and downs of partnership. We analyze how you actually navigate stress, support others, and manage relationship challenges - not just how you think you do.
        </p>
      </div>
      <p className="text-muted-foreground">
        Question {currentQuestion + 1} of {totalQuestions}
      </p>
      <div className="w-full bg-muted rounded-full h-2">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
