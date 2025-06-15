import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AttachmentStyleAssessment, { AttachmentStyleResults } from "@/components/assessments/AttachmentStyleAssessment";
import BirthOrderAssessment, { BirthOrderResults } from "@/components/assessments/BirthOrderAssessment";
import PersonalityAssessment, { PersonalityResults } from "@/components/assessments/PersonalityAssessment";
import RelationshipIntentAssessment, { RelationshipIntentResults } from "@/components/assessments/RelationshipIntentAssessment";
import EmotionalCapacityAssessment, { EmotionalCapacityResults } from "@/components/assessments/EmotionalCapacityAssessment";
import AttractionLayerAssessment, { AttractionLayerResults } from "@/components/assessments/AttractionLayerAssessment";
import PhysicalProximityAssessment, { PhysicalProximityResults } from "@/components/assessments/PhysicalProximityAssessment";
import CommunicationStyleAssessment, { CommunicationStyleResults } from "@/components/assessments/CommunicationStyleAssessment";
import LifeGoalsAssessment, { LifeGoalsResults } from "@/components/assessments/LifeGoalsAssessment";

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [attachmentResults, setAttachmentResults] = useState<AttachmentStyleResults | null>(null);
  const [birthOrderResults, setBirthOrderResults] = useState<BirthOrderResults | null>(null);
  const [personalityResults, setPersonalityResults] = useState<PersonalityResults | null>(null);
  const [relationshipIntentResults, setRelationshipIntentResults] = useState<RelationshipIntentResults | null>(null);
  const [emotionalCapacityResults, setEmotionalCapacityResults] = useState<EmotionalCapacityResults | null>(null);
  const [attractionLayerResults, setAttractionLayerResults] = useState<AttractionLayerResults | null>(null);
  const [physicalProximityResults, setPhysicalProximityResults] = useState<PhysicalProximityResults | null>(null);
  const [communicationStyleResults, setCommunicationStyleResults] = useState<CommunicationStyleResults | null>(null);
  const [lifeGoalsResults, setLifeGoalsResults] = useState<LifeGoalsResults | null>(null);
  const totalSteps = 10;
  const navigate = useNavigate();

  const progress = (currentStep / totalSteps) * 100;

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Navigate to dashboard when all assessments are complete
      navigate('/dashboard');
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

  const handlePersonalityComplete = (results: PersonalityResults) => {
    setPersonalityResults(results);
    console.log('Personality Results:', results);
    nextStep();
  };

  const handleRelationshipIntentComplete = (results: RelationshipIntentResults) => {
    setRelationshipIntentResults(results);
    console.log('Relationship Intent Results:', results);
    nextStep();
  };

  const handleEmotionalCapacityComplete = (results: EmotionalCapacityResults) => {
    setEmotionalCapacityResults(results);
    console.log('Emotional Capacity Results:', results);
    nextStep();
  };

  const handleAttractionLayerComplete = (results: AttractionLayerResults) => {
    setAttractionLayerResults(results);
    console.log('Attraction Layer Results:', results);
    nextStep();
  };

  const handlePhysicalProximityComplete = (results: PhysicalProximityResults) => {
    setPhysicalProximityResults(results);
    console.log('Physical Proximity Results:', results);
    nextStep();
  };

  const handleCommunicationStyleComplete = (results: CommunicationStyleResults) => {
    setCommunicationStyleResults(results);
    console.log('Communication Style Results:', results);
    nextStep();
  };

  const handleLifeGoalsComplete = (results: LifeGoalsResults) => {
    setLifeGoalsResults(results);
    console.log('Life Goals Results:', results);
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
              This will take about 18-22 minutes and help us find your most compatible matches.
            </p>
            <div className="card-glass p-6 border-l-4 border-accent">
              <p className="text-accent font-medium mb-2">
                For Serious Relationships Only
              </p>
              <p className="text-sm text-muted-foreground">
                LockInOnce is designed exclusively for people seeking deep, lasting love. 
                No casual dating - we focus on true compatibility for long-term partnerships.
              </p>
            </div>
            <div className="card-glass p-6">
              <h3 className="text-primary font-medium mb-3">Our Philosophy</h3>
              <p className="text-sm text-muted-foreground mb-4">
                "Deep compatibility isn't about finding someone identical to you—
                it's about finding someone who complements your emotional patterns and shares your commitment to growth."
              </p>
              <div className="space-y-2 text-left">
                <p className="text-xs text-muted-foreground">✓ Science-based compatibility matching</p>
                <p className="text-xs text-muted-foreground">✓ Focus on emotional maturity and readiness</p>
                <p className="text-xs text-muted-foreground">✓ Commitment to long-term partnership goals</p>
                <p className="text-xs text-muted-foreground">✓ Comprehensive 9-assessment compatibility profile</p>
              </div>
            </div>
          </div>
        );
      case 2:
        return <AttachmentStyleAssessment onComplete={handleAttachmentComplete} />;
      case 3:
        return <BirthOrderAssessment onComplete={handleBirthOrderComplete} />;
      case 4:
        return <PersonalityAssessment onComplete={handlePersonalityComplete} />;
      case 5:
        return <RelationshipIntentAssessment onComplete={handleRelationshipIntentComplete} />;
      case 6:
        return <EmotionalCapacityAssessment onComplete={handleEmotionalCapacityComplete} />;
      case 7:
        return <AttractionLayerAssessment onComplete={handleAttractionLayerComplete} />;
      case 8:
        return <PhysicalProximityAssessment onComplete={handlePhysicalProximityComplete} />;
      case 9:
        return <CommunicationStyleAssessment onComplete={handleCommunicationStyleComplete} />;
      case 10:
        return <LifeGoalsAssessment onComplete={handleLifeGoalsComplete} />;
      default:
        return (
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-playfair font-bold text-foreground">
              Assessment Complete!
            </h2>
            <p className="text-lg text-muted-foreground">
              Redirecting to your dashboard...
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

        {/* Navigation - Only show for welcome step */}
        {currentStep === 1 && (
          <div className="flex justify-center">
            <Button 
              onClick={nextStep}
              className="btn-gradient px-8"
            >
              Start Assessment
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
