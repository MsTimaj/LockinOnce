
interface AssessmentHeaderProps {
  currentQuestion: number;
  totalQuestions: number;
}

const AssessmentHeader = ({ currentQuestion, totalQuestions }: AssessmentHeaderProps) => {
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="text-center space-y-4">
      <h2 className="text-2xl font-playfair font-bold text-foreground">
        Attachment Style Assessment
      </h2>
      <div className="card-glass p-4">
        <p className="text-sm text-muted-foreground">
          <strong>Why this matters:</strong> Your attachment style shapes how you connect, communicate, and handle conflict in relationships. Understanding this helps us match you with someone whose style complements yours for deeper compatibility.
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

export default AssessmentHeader;
