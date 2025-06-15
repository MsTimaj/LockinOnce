
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AttachmentStyleAssessment, { AttachmentStyleResults } from "@/components/assessments/AttachmentStyleAssessment";
import BirthOrderAssessment, { BirthOrderResults } from "@/components/assessments/BirthOrderAssessment";

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [attachmentResults, setAttachmentResults] = useState<AttachmentStyleResults | null>(null);
  const [birthOrderResults, setBirthOrderResults] = useState<BirthOrderResults | null>(null);
  const totalSteps = 7;
  const navigate = useNavigate();

  const progress = (currentStep / totalSteps) * 100;

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAttachmentComplete = (results: AttachmentStyleResults) => {
    setAttachmentResults(results);
    console.log('Attachment Style Results:', results);
    nextStep();
  };

  const handleBirthOrderComplete = (results: BirthOrderResults) => {
    setBirthOrderResults(results);
    console.log('Birth Order Results:', results);
    nextStep();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-playfair font-bold text-foreground">
              Welcome to LockInOnce
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Let's create your profile based on proven relationship science. 
              This will take about 8-10 minutes and help us find your most compatible matches.
            </p>
            <div className="card-glass p-6">
              <p className="text-primary font-medium">
                "Deep compatibility isn't about finding someone identical to you—
                it's about finding someone who complements your emotional patterns."
              </p>
            </div>
          </div>
        );
      case 2:
        return <AttachmentStyleAssessment onComplete={handleAttachmentComplete} />;
      case 3:
        return <BirthOrderAssessment onComplete={handleBirthOrderComplete} />;
      case 4:
        return (
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-playfair font-bold text-foreground">
              Your Profile Summary
            </h2>
            <p className="text-lg text-muted-foreground">
              Here's what we've learned about you so far.
            </p>
            <div className="space-y-4">
              {attachmentResults && (
                <div className="card-glass p-4 text-left">
                  <p className="text-sm text-muted-foreground mb-2">Attachment Style:</p>
                  <p className="text-primary font-medium capitalize">{attachmentResults.dominantStyle}</p>
                </div>
              )}
              {birthOrderResults && (
                <div className="card-glass p-4 text-left">
                  <p className="text-sm text-muted-foreground mb-2">Family Background:</p>
                  <p className="text-primary font-medium capitalize">{birthOrderResults.birthOrder} child</p>
                </div>
              )}
            </div>
            <div className="text-left space-y-4">
              <p className="text-accent font-medium">Step 4 of 7 - Coming next...</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-playfair font-bold text-foreground">
              Step {currentStep} of {totalSteps}
            </h2>
            <p className="text-lg text-muted-foreground">
              More assessment steps coming soon...
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 px-6 py-8">
      {/* Header with Progress */}
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => currentStep === 1 ? navigate('/') : prevStep()}
            className="p-3 rounded-xl"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1 mx-4">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground text-center mt-2">
              Step {currentStep} of {totalSteps}
            </p>
          </div>
          <div className="w-12" /> {/* Spacer for balance */}
        </div>

        {/* Content Card */}
        <Card className="card-glass p-8 mb-8">
          <CardContent className="pt-0">
            {renderStep()}
          </CardContent>
        </Card>

        {/* Navigation */}
        {currentStep !== 2 && currentStep !== 3 && (
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-8"
            >
              Previous
            </Button>
            <Button 
              onClick={nextStep}
              disabled={currentStep === totalSteps}
              className="btn-gradient px-8"
            >
              {currentStep === totalSteps ? 'Complete' : 'Continue'}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
