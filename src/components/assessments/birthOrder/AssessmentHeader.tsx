
interface AssessmentHeaderProps {
  currentQuestion: number;
  totalQuestions: number;
}

export const AssessmentHeader = ({ currentQuestion, totalQuestions }: AssessmentHeaderProps) => {
  const progress = Math.min((currentQuestion / totalQuestions) * 100, 95);

  return (
    <div className="text-center space-y-4">
      <h2 className="text-2xl font-playfair font-bold text-foreground">
        Family Background
      </h2>
      <div className="card-glass p-4">
        <p className="text-sm text-muted-foreground">
          <strong>Why this matters:</strong> Your natural behavioral patterns and leadership style often reflect family dynamics that shaped your personality. Understanding these patterns helps us match you with someone whose approach to relationships complements yours.
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
