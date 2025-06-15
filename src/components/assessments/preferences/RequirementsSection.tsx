
import React from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface RequirementsSectionProps {
  educationRequirements: string[];
  handleEducationRequirement: (education: string, checked: boolean) => void;
}

const RequirementsSection = ({
  educationRequirements,
  handleEducationRequirement
}: RequirementsSectionProps) => {
  const educationOptions = [
    "High School",
    "Some College", 
    "Bachelor's Degree",
    "Master's Degree",
    "PhD/Doctorate",
    "Trade School"
  ];

  return (
    <div className="space-y-3">
      <Label className="text-base font-medium">Education Requirements (optional):</Label>
      <div className="grid grid-cols-2 gap-3">
        {educationOptions.map((education) => (
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
  );
};

export default RequirementsSection;
