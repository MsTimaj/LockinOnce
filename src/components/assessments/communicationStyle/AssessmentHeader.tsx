
interface AssessmentHeaderProps {
  currentQuestion: number;
  totalQuestions: number;
}

export const AssessmentHeader = ({ currentQuestion, totalQuestions }: AssessmentHeaderProps) => {
  const progress = Math.min((currentQuestion / totalQuestions) * 100, 95);

  return (
    <div className="text-center space-y-4">
      <h2 className="text-2xl font-playfair font-bold text-foreground">
        Communication Style
      </h2>
      <div className="card-glass p-4 border-l-4 border-accent">
        <p className="text-accent font-medium mb-2">
          How You Actually Communicate
        </p>
        <p className="text-sm text-muted-foreground">
          <strong>Why this matters:</strong> Real communication patterns emerge in challenging moments, not comfortable conversations. We analyze how you handle conflict, give feedback, and respond under pressure to match you with someone whose communication style creates harmony, not friction.
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
