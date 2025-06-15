
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PersonalInfoSectionProps {
  politicalLeaning: string;
  setPoliticalLeaning: (value: string) => void;
  religiousLeaning: string;
  setReligiousLeaning: (value: string) => void;
  background: string;
  setBackground: (value: string) => void;
}

const PersonalInfoSection = ({
  politicalLeaning,
  setPoliticalLeaning,
  religiousLeaning,
  setReligiousLeaning,
  background,
  setBackground
}: PersonalInfoSectionProps) => {
  return (
    <div className="border-b pb-6">
      <h3 className="text-lg font-semibold mb-4">About You</h3>
      
      {/* Political Leaning */}
      <div className="space-y-3 mb-6">
        <Label className="text-base font-medium">Your Political Leaning:</Label>
        <Select value={politicalLeaning} onValueChange={setPoliticalLeaning}>
          <SelectTrigger>
            <SelectValue placeholder="Select your political leaning" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="very_liberal">Very Liberal</SelectItem>
            <SelectItem value="liberal">Liberal</SelectItem>
            <SelectItem value="moderate">Moderate</SelectItem>
            <SelectItem value="conservative">Conservative</SelectItem>
            <SelectItem value="very_conservative">Very Conservative</SelectItem>
            <SelectItem value="libertarian">Libertarian</SelectItem>
            <SelectItem value="apolitical">Not Political</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Religious Leaning */}
      <div className="space-y-3 mb-6">
        <Label className="text-base font-medium">Your Religious/Spiritual Beliefs:</Label>
        <Select value={religiousLeaning} onValueChange={setReligiousLeaning}>
          <SelectTrigger>
            <SelectValue placeholder="Select your religious/spiritual beliefs" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="christian">Christian</SelectItem>
            <SelectItem value="catholic">Catholic</SelectItem>
            <SelectItem value="jewish">Jewish</SelectItem>
            <SelectItem value="muslim">Muslim</SelectItem>
            <SelectItem value="hindu">Hindu</SelectItem>
            <SelectItem value="buddhist">Buddhist</SelectItem>
            <SelectItem value="spiritual">Spiritual but not Religious</SelectItem>
            <SelectItem value="agnostic">Agnostic</SelectItem>
            <SelectItem value="atheist">Atheist</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Background */}
      <div className="space-y-3">
        <Label className="text-base font-medium">Your Background:</Label>
        <Select value={background} onValueChange={setBackground}>
          <SelectTrigger>
            <SelectValue placeholder="Select your background" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="white">White/Caucasian</SelectItem>
            <SelectItem value="black">Black/African American</SelectItem>
            <SelectItem value="hispanic">Hispanic/Latino</SelectItem>
            <SelectItem value="asian">Asian</SelectItem>
            <SelectItem value="native_american">Native American</SelectItem>
            <SelectItem value="middle_eastern">Middle Eastern</SelectItem>
            <SelectItem value="pacific_islander">Pacific Islander</SelectItem>
            <SelectItem value="mixed">Mixed/Multiracial</SelectItem>
            <SelectItem value="other">Other</SelectItem>
            <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default PersonalInfoSection;
