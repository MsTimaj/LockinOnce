
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

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
    wantsChildren: boolean | null;
    education: string[];
    careerAmbition: string;
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
  const [wantsChildren, setWantsChildren] = useState<boolean | null>(null);
  const [educationRequirements, setEducationRequirements] = useState<string[]>([]);
  const [careerAmbition, setCareerAmbition] = useState<string>("");

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
      }
    };
    onComplete(results);
  };

  const isValid = genderPreference && careerAmbition && wantsChildren !== null;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-serif">Dating Preferences</CardTitle>
        <CardDescription>
          Help us find your ideal matches by sharing your preferences and deal-breakers.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Gender Preference */}
        <div className="space-y-3">
          <Label className="text-base font-medium">I'm interested in dating:</Label>
          <Select value={genderPreference} onValueChange={setGenderPreference}>
            <SelectTrigger>
              <SelectValue placeholder="Select gender preference" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="women">Women</SelectItem>
              <SelectItem value="men">Men</SelectItem>
              <SelectItem value="nonbinary">Non-binary people</SelectItem>
              <SelectItem value="everyone">Everyone</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Age Range */}
        <div className="space-y-3">
          <Label className="text-base font-medium">
            Age Range: {ageRange[0]} - {ageRange[1]} years old
          </Label>
          <Slider
            value={ageRange}
            onValueChange={setAgeRange}
            min={18}
            max={65}
            step={1}
            className="w-full"
          />
        </div>

        {/* Location Radius */}
        <div className="space-y-3">
          <Label className="text-base font-medium">
            Maximum Distance: {locationRadius[0]} miles
          </Label>
          <Slider
            value={locationRadius}
            onValueChange={setLocationRadius}
            min={5}
            max={100}
            step={5}
            className="w-full"
          />
        </div>

        {/* Children Preference */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Do you want children?</Label>
          <div className="flex space-x-4">
            <Button
              type="button"
              variant={wantsChildren === true ? "default" : "outline"}
              onClick={() => setWantsChildren(true)}
            >
              Yes
            </Button>
            <Button
              type="button"
              variant={wantsChildren === false ? "default" : "outline"}
              onClick={() => setWantsChildren(false)}
            >
              No
            </Button>
            <Button
              type="button"
              variant={wantsChildren === null ? "default" : "outline"}
              onClick={() => setWantsChildren(null)}
            >
              Maybe/Unsure
            </Button>
          </div>
        </div>

        {/* Career Ambition */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Career Ambition Level:</Label>
          <Select value={careerAmbition} onValueChange={setCareerAmbition}>
            <SelectTrigger>
              <SelectValue placeholder="Select ambition level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Work-life balance focused</SelectItem>
              <SelectItem value="moderate">Moderately ambitious</SelectItem>
              <SelectItem value="high">Highly ambitious</SelectItem>
              <SelectItem value="any">No preference</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Education Requirements */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Education Requirements (optional):</Label>
          <div className="grid grid-cols-2 gap-3">
            {["High School", "Some College", "Bachelor's Degree", "Master's Degree", "PhD/Doctorate", "Trade School"].map((education) => (
              <div key={education} className="flex items-center space-x-2">
                <Checkbox
                  id={education}
                  checked={educationRequirements.includes(education)}
                  onCheckedChange={(checked) => handleEducationRequirement(education, checked as boolean)}
                />
                <Label htmlFor={education} className="text-sm">{education}</Label>
              </div>
            ))}
          </div>
        </div>

        {/* Deal Breakers - Religion */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Religious Deal-breakers (optional):</Label>
          <div className="grid grid-cols-2 gap-3">
            {["Very Religious", "Atheist", "Different Faith", "Spiritual but not Religious"].map((religion) => (
              <div key={religion} className="flex items-center space-x-2">
                <Checkbox
                  id={religion}
                  checked={religionDealBreakers.includes(religion)}
                  onCheckedChange={(checked) => handleReligionDealBreaker(religion, checked as boolean)}
                />
                <Label htmlFor={religion} className="text-sm">{religion}</Label>
              </div>
            ))}
          </div>
        </div>

        {/* Deal Breakers - Politics */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Political Deal-breakers (optional):</Label>
          <div className="grid grid-cols-2 gap-3">
            {["Very Conservative", "Very Liberal", "Politically Apathetic", "Extremist Views"].map((politics) => (
              <div key={politics} className="flex items-center space-x-2">
                <Checkbox
                  id={politics}
                  checked={politicsDealBreakers.includes(politics)}
                  onCheckedChange={(checked) => handlePoliticsDealBreaker(politics, checked as boolean)}
                />
                <Label htmlFor={politics} className="text-sm">{politics}</Label>
              </div>
            ))}
          </div>
        </div>

        {/* Deal Breakers - Lifestyle */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Lifestyle Deal-breakers (optional):</Label>
          <div className="grid grid-cols-2 gap-3">
            {["Heavy Smoking", "Heavy Drinking", "Drug Use", "Workaholic", "Couch Potato", "Party Lifestyle"].map((lifestyle) => (
              <div key={lifestyle} className="flex items-center space-x-2">
                <Checkbox
                  id={lifestyle}
                  checked={lifestyleDealBreakers.includes(lifestyle)}
                  onCheckedChange={(checked) => handleLifestyleDealBreaker(lifestyle, checked as boolean)}
                />
                <Label htmlFor={lifestyle} className="text-sm">{lifestyle}</Label>
              </div>
            ))}
          </div>
        </div>

        <Button 
          onClick={handleSubmit} 
          disabled={!isValid}
          className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
        >
          Continue
        </Button>
      </CardContent>
    </Card>
  );
};

export default PreferencesAssessment;
