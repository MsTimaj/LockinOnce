import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PersonalInfoSection from "./preferences/PersonalInfoSection";
import DatingPreferencesSection from "./preferences/DatingPreferencesSection";
import RequirementsSection from "./preferences/RequirementsSection";
import DealBreakersSection from "./preferences/DealBreakersSection";

interface PreferencesData {
  genderPreference: string;
  ageRange: {
    min: number;
    max: number;
  };
  locationRadius: number;
  dealBreakers: {
    religion: string[];
    politics: string[];
    lifestyle: string[];
  };
  mustHaves: {
    wantsChildren: boolean | null | string;
    education: string[];
    careerAmbition: string;
  };
  personalInfo: {
    politicalLeaning: string;
    religiousLeaning: string;
    background: string;
  };
}

interface PreferencesAssessmentProps {
  onComplete: (results: PreferencesData) => void;
}

const PreferencesAssessment = ({ onComplete }: PreferencesAssessmentProps) => {
  const [genderPreference, setGenderPreference] = useState<string>("");
  const [ageRange, setAgeRange] = useState<number[]>([25, 35]);
  const [locationRadius, setLocationRadius] = useState<number[]>([25]);
  const [religionDealBreakers, setReligionDealBreakers] = useState<string[]>([]);
  const [politicsDealBreakers, setPoliticsDealBreakers] = useState<string[]>([]);
  const [lifestyleDealBreakers, setLifestyleDealBreakers] = useState<string[]>([]);
  const [wantsChildren, setWantsChildren] = useState<boolean | null | string>(null);
  const [educationRequirements, setEducationRequirements] = useState<string[]>([]);
  const [careerAmbition, setCareerAmbition] = useState<string>("");
  
  // Personal info fields
  const [politicalLeaning, setPoliticalLeaning] = useState<string>("");
  const [religiousLeaning, setReligiousLeaning] = useState<string>("");
  const [background, setBackground] = useState<string>("");

  const handleReligionDealBreaker = (religion: string, checked: boolean) => {
    if (checked) {
      setReligionDealBreakers(prev => [...prev, religion]);
    } else {
      setReligionDealBreakers(prev => prev.filter(r => r !== religion));
    }
  };

  const handlePoliticsDealBreaker = (politics: string, checked: boolean) => {
    if (checked) {
      setPoliticsDealBreakers(prev => [...prev, politics]);
    } else {
      setPoliticsDealBreakers(prev => prev.filter(p => p !== politics));
    }
  };

  const handleLifestyleDealBreaker = (lifestyle: string, checked: boolean) => {
    if (checked) {
      setLifestyleDealBreakers(prev => [...prev, lifestyle]);
    } else {
      setLifestyleDealBreakers(prev => prev.filter(l => l !== lifestyle));
    }
  };

  const handleEducationRequirement = (education: string, checked: boolean) => {
    if (checked) {
      setEducationRequirements(prev => [...prev, education]);
    } else {
      setEducationRequirements(prev => prev.filter(e => e !== education));
    }
  };

  const handleSubmit = () => {
    const results: PreferencesData = {
      genderPreference,
      ageRange: {
        min: ageRange[0],
        max: ageRange[1]
      },
      locationRadius: locationRadius[0],
      dealBreakers: {
        religion: religionDealBreakers,
        politics: politicsDealBreakers,
        lifestyle: lifestyleDealBreakers
      },
      mustHaves: {
        wantsChildren,
        education: educationRequirements,
        careerAmbition
      },
      personalInfo: {
        politicalLeaning,
        religiousLeaning,
        background
      }
    };
    onComplete(results);
  };

  // Fixed validation - treat "maybe" as a valid selection
  const isValid = genderPreference && careerAmbition && (wantsChildren === true || wantsChildren === false || wantsChildren === "maybe");

  // Debug logging to help identify the issue
  useEffect(() => {
    console.log('Validation Debug:', {
      genderPreference,
      careerAmbition, 
      wantsChildren,
      isValid
    });
  }, [genderPreference, careerAmbition, wantsChildren, isValid]);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-serif">Dating Preferences & Personal Info</CardTitle>
        <CardDescription>
          Help us find your ideal matches by sharing your preferences, deal-breakers, and personal background.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <PersonalInfoSection
          politicalLeaning={politicalLeaning}
          setPoliticalLeaning={setPoliticalLeaning}
          religiousLeaning={religiousLeaning}
          setReligiousLeaning={setReligiousLeaning}
          background={background}
          setBackground={setBackground}
        />

        <DatingPreferencesSection
          genderPreference={genderPreference}
          setGenderPreference={setGenderPreference}
          ageRange={ageRange}
          setAgeRange={setAgeRange}
          locationRadius={locationRadius}
          setLocationRadius={setLocationRadius}
          wantsChildren={wantsChildren}
          setWantsChildren={setWantsChildren}
          careerAmbition={careerAmbition}
          setCareerAmbition={setCareerAmbition}
        />

        <RequirementsSection
          educationRequirements={educationRequirements}
          handleEducationRequirement={handleEducationRequirement}
        />

        <DealBreakersSection
          religionDealBreakers={religionDealBreakers}
          handleReligionDealBreaker={handleReligionDealBreaker}
          politicsDealBreakers={politicsDealBreakers}
          handlePoliticsDealBreaker={handlePoliticsDealBreaker}
          lifestyleDealBreakers={lifestyleDealBreakers}
          handleLifestyleDealBreaker={handleLifestyleDealBreaker}
        />

        <div className="border-t pt-6">
          <div className="mb-4 text-sm text-muted-foreground">
            * Required fields: Gender preference, Career ambition, Children preference
          </div>
          <Button 
            onClick={handleSubmit} 
            disabled={!isValid}
            className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
          >
            Complete Assessment
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PreferencesAssessment;
