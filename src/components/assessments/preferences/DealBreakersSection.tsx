
import React from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface DealBreakersSectionProps {
  religionDealBreakers: string[];
  handleReligionDealBreaker: (religion: string, checked: boolean) => void;
  politicsDealBreakers: string[];
  handlePoliticsDealBreaker: (politics: string, checked: boolean) => void;
  lifestyleDealBreakers: string[];
  handleLifestyleDealBreaker: (lifestyle: string, checked: boolean) => void;
}

const DealBreakersSection = ({
  religionDealBreakers,
  handleReligionDealBreaker,
  politicsDealBreakers,
  handlePoliticsDealBreaker,
  lifestyleDealBreakers,
  handleLifestyleDealBreaker
}: DealBreakersSectionProps) => {
  const religionOptions = ["Very Religious", "Atheist", "Different Faith", "Spiritual but not Religious"];
  const politicsOptions = ["Very Conservative", "Very Liberal", "Politically Apathetic", "Extremist Views"];
  const lifestyleOptions = ["Heavy Smoking", "Heavy Drinking", "Drug Use", "Workaholic", "Couch Potato", "Party Lifestyle"];

  return (
    <>
      {/* Deal Breakers - Religion */}
      <div className="space-y-3">
        <Label className="text-base font-medium">Religious Deal-breakers (optional):</Label>
        <div className="grid grid-cols-2 gap-3">
          {religionOptions.map((religion) => (
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
          {politicsOptions.map((politics) => (
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
          {lifestyleOptions.map((lifestyle) => (
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
    </>
  );
};

export default DealBreakersSection;
