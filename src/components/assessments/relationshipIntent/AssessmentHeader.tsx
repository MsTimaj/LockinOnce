
interface AssessmentHeaderProps {
  currentQuestion: number;
  totalQuestions: number;
}

export const AssessmentHeader = ({ currentQuestion, totalQuestions }: AssessmentHeaderProps) => {
  const progress = Math.min((currentQuestion / totalQuestions) * 100, 95);

  return (
    <div className="text-center space-y-4">
      <h2 className="text-2xl font-playfair font-bold text-foreground">
        Relationship Intent
      </h2>
      <div className="card-glass p-4 border-l-4 border-accent">
        <p className="text-accent font-medium mb-2">
          For Serious Relationships Only
        </p>
        <p className="text-sm text-muted-foreground">
          <strong>Why this matters:</strong> Your behavioral patterns reveal your true relationship readiness better than direct questions. We analyze how you actually approach commitment, decision-making, and partnership to match you with someone whose actions align with yours.
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
