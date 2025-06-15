import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Phase 1 Assessments
import WelcomePhilosophyAssessment from "@/components/assessments/WelcomePhilosophyAssessment";
import AttachmentStyleAssessment, { AttachmentStyleResults } from "@/components/assessments/AttachmentStyleAssessment";
import BirthOrderAssessment, { BirthOrderResults } from "@/components/assessments/BirthOrderAssessment";
import PersonalityAssessment, { PersonalityResults } from "@/components/assessments/PersonalityAssessment";
import RelationshipIntentAssessment, { RelationshipIntentResults } from "@/components/assessments/RelationshipIntentAssessment";
import EmotionalCapacityAssessment, { EmotionalCapacityResults } from "@/components/assessments/EmotionalCapacityAssessment";
import AttractionLayerAssessment, { AttractionLayerResults } from "@/components/assessments/AttractionLayerAssessment";
import PhysicalProximityAssessment, { PhysicalProximityResults } from "@/components/assessments/PhysicalProximityAssessment";
import CommunicationStyleAssessment, { CommunicationStyleResults } from "@/components/assessments/CommunicationStyleAssessment";
import LifeGoalsAssessment, { LifeGoalsResults } from "@/components/assessments/LifeGoalsAssessment";

// Phase 2 Assessments
import ProximityIntimacyAssessment from "@/components/assessments/ProximityIntimacyAssessment";
import ValuesAssessment, { ValuesResults } from "@/components/assessments/ValuesAssessment";
import LifestyleCompatibilityAssessment, { LifestyleCompatibilityResults } from "@/components/assessments/LifestyleCompatibilityAssessment";
import LoveLanguagesAssessment, { LoveLanguagesResults } from "@/components/assessments/LoveLanguagesAssessment";
import FinancialValuesAssessment, { FinancialValuesResults } from "@/components/assessments/FinancialValuesAssessment";

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentPhase, setCurrentPhase] = useState(1);
  
  // Phase 1 Results
  const [attachmentResults, setAttachmentResults] = useState<AttachmentStyleResults | null>(null);
  const [birthOrderResults, setBirthOrderResults] = useState<BirthOrderResults | null>(null);
  const [personalityResults, setPersonalityResults] = useState<PersonalityResults | null>(null);
  const [relationshipIntentResults, setRelationshipIntentResults] = useState<RelationshipIntentResults | null>(null);
  const [emotionalCapacityResults, setEmotionalCapacityResults] = useState<EmotionalCapacityResults | null>(null);
  const [attractionLayerResults, setAttractionLayerResults] = useState<AttractionLayerResults | null>(null);
  const [physicalProximityResults, setPhysicalProximityResults] = useState<PhysicalProximityResults | null>(null);
  const [communicationStyleResults, setCommunicationStyleResults] = useState<CommunicationStyleResults | null>(null);
  const [lifeGoalsResults, setLifeGoalsResults] = useState<LifeGoalsResults | null>(null);
  
  // Phase 2 Results
  const [valuesResults, setValuesResults] = useState<ValuesResults | null>(null);
  const [lifestyleResults, setLifestyleResults] = useState<LifestyleCompatibilityResults | null>(null);
  const [loveLanguagesResults, setLoveLanguagesResults] = useState<LoveLanguagesResults | null>(null);
  const [financialValuesResults, setFinancialValuesResults] = useState<FinancialValuesResults | null>(null);

  const phase1Steps = 10;
  const phase2Steps = 5;
  const totalSteps = currentPhase === 1 ? phase1Steps : phase2Steps;
  const navigate = useNavigate();

  const progress = (currentStep / totalSteps) * 100;

  const nextStep = () => {
    if (currentPhase === 1 && currentStep < phase1Steps) {
      setCurrentStep(currentStep + 1);
    } else if (currentPhase === 1 && currentStep === phase1Steps) {
      // Transition to Phase 2
      setCurrentPhase(2);
      setCurrentStep(1);
    } else if (currentPhase === 2 && currentStep < phase2Steps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Navigate to AI Results Summary when all assessments are complete
      navigate('/ai-results');
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else if (currentPhase === 2) {
      // Go back to Phase 1
      setCurrentPhase(1);
      setCurrentStep(phase1Steps);
    }
  };

  const handleWelcomeComplete = () => {
    nextStep();
  };

  // Phase 1 Handlers
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

  // Phase 2 Handlers
  const handleProximityIntimacyComplete = () => {
    console.log('Proximity Intimacy Assessment Complete');
    nextStep();
  };

  const handleValuesComplete = (results: ValuesResults) => {
    setValuesResults(results);
    console.log('Values Results:', results);
    nextStep();
  };

  const handleLifestyleComplete = (results: LifestyleCompatibilityResults) => {
    setLifestyleResults(results);
    console.log('Lifestyle Compatibility Results:', results);
    nextStep();
  };

  const handleLoveLanguagesComplete = (results: LoveLanguagesResults) => {
    setLoveLanguagesResults(results);
    console.log('Love Languages Results:', results);
    nextStep();
  };

  const handleFinancialValuesComplete = (results: FinancialValuesResults) => {
    setFinancialValuesResults(results);
    console.log('Financial Values Results:', results);
    nextStep();
  };

  const renderPhase1Step = () => {
    switch (currentStep) {
      case 1:
        return <WelcomePhilosophyAssessment onComplete={handleWelcomeComplete} />;
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
        return null;
    }
  };

  const renderPhase2Step = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-playfair font-bold text-foreground">
              Phase 2: Deep Compatibility Suite
            </h2>
            <div className="card-glass p-6">
              <p className="text-lg text-muted-foreground mb-4">
                Congratulations on completing Phase 1! You've shown serious commitment to finding lasting love.
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Phase 2 takes 20-25 minutes and unlocks enhanced matching capabilities based on deeper compatibility factors.
              </p>
              <div className="space-y-2 text-left">
                <p className="text-xs text-muted-foreground">✓ Advanced intimacy and proximity preferences</p>
                <p className="text-xs text-muted-foreground">✓ Core values and lifestyle compatibility</p>
                <p className="text-xs text-muted-foreground">✓ Love languages and financial alignment</p>
                <p className="text-xs text-muted-foreground">✓ Enhanced match quality and precision</p>
              </div>
            </div>
            <Button onClick={nextStep} className="btn-gradient px-8">
              Continue to Phase 2
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        );
      case 2:
        return <ProximityIntimacyAssessment onComplete={handleProximityIntimacyComplete} />;
      case 3:
        return <ValuesAssessment onComplete={handleValuesComplete} />;
      case 4:
        return <LifestyleCompatibilityAssessment onComplete={handleLifestyleComplete} />;
      case 5:
        return <LoveLanguagesAssessment onComplete={handleLoveLanguagesComplete} />;
      case 6:
        return <FinancialValuesAssessment onComplete={handleFinancialValuesComplete} />;
      default:
        return null;
    }
  };

  const renderCurrentStep = () => {
    if (currentPhase === 1) {
      return renderPhase1Step();
    } else {
      return renderPhase2Step();
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
            onClick={() => (currentStep === 1 && currentPhase === 1) ? navigate('/') : prevStep()}
            className="p-3 rounded-xl"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1 mx-4">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground text-center mt-2">
              Phase {currentPhase}: Step {currentStep} of {totalSteps}
            </p>
          </div>
          <div className="w-12" /> {/* Spacer for balance */}
        </div>

        {/* Content Card */}
        <Card className="card-glass p-8 mb-8">
          <CardContent className="pt-0">
            {renderCurrentStep()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;
