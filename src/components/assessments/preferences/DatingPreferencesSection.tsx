
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";

interface DatingPreferencesSectionProps {
  genderPreference: string;
  setGenderPreference: (value: string) => void;
  ageRange: number[];
  setAgeRange: (value: number[]) => void;
  locationRadius: number[];
  setLocationRadius: (value: number[]) => void;
  wantsChildren: boolean | null | string;
  setWantsChildren: (value: boolean | null | string) => void;
  careerAmbition: string;
  setCareerAmbition: (value: string) => void;
}

const DatingPreferencesSection = ({
  genderPreference,
  setGenderPreference,
  ageRange,
  setAgeRange,
  locationRadius,
  setLocationRadius,
  wantsChildren,
  setWantsChildren,
  careerAmbition,
  setCareerAmbition
}: DatingPreferencesSectionProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Dating Preferences</h3>
      
      {/* Gender Preference */}
      <div className="space-y-3 mb-6">
        <Label className="text-base font-medium">I'm interested in dating: *</Label>
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
      <div className="space-y-3 mb-6">
        <Label className="text-base font-medium">
          Age Range: {ageRange[0]} - {ageRange[1]} years old *
        </Label>
        <div className="px-3">
          <Slider
            value={ageRange}
            onValueChange={setAgeRange}
            min={18}
            max={65}
            step={1}
            className="w-full"
            minStepsBetweenThumbs={1}
          />
        </div>
        <div className="flex justify-between text-sm text-muted-foreground px-3">
          <span>18</span>
          <span>65</span>
        </div>
      </div>

      {/* Location Radius */}
      <div className="space-y-3 mb-6">
        <Label className="text-base font-medium">
          Maximum Distance: {locationRadius[0]} miles
        </Label>
        <div className="px-3">
          <Slider
            value={locationRadius}
            onValueChange={setLocationRadius}
            min={5}
            max={100}
            step={5}
            className="w-full"
          />
        </div>
        <div className="flex justify-between text-sm text-muted-foreground px-3">
          <span>5 miles</span>
          <span>100 miles</span>
        </div>
      </div>

      {/* Children Preference */}
      <div className="space-y-3 mb-6">
        <Label className="text-base font-medium">Do you want children? *</Label>
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
            variant={wantsChildren === "maybe" ? "default" : "outline"}
            onClick={() => setWantsChildren("maybe")}
          >
            Maybe/Unsure
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">Note: "Maybe/Unsure" can match with both "Yes" and "No"</p>
      </div>

      {/* Career Ambition */}
      <div className="space-y-3 mb-6">
        <Label className="text-base font-medium">Career Ambition Level: *</Label>
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
    </div>
  );
};

export default DatingPreferencesSection;
