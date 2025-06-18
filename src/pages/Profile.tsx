
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, User, Edit3, Save, MapPin, Briefcase, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { UserStateManager } from "@/utils/userStateManager";
import NavigationFooter from "@/components/dashboard/NavigationFooter";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    location: "",
    bio: "",
    occupation: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const userProfile = await UserStateManager.getUserProfile();
        if (userProfile) {
          setProfile(userProfile);
          setFormData({
            name: userProfile.basicInfo?.name || "",
            age: userProfile.basicInfo?.age?.toString() || "",
            location: userProfile.basicInfo?.location || "",
            bio: userProfile.basicInfo?.bio || "",
            occupation: userProfile.basicInfo?.occupation || ""
          });
        }
      } catch (error) {
        console.error('Failed to load profile:', error);
      }
    };

    loadProfile();
  }, []);

  const handleSave = async () => {
    try {
      // Update user profile with new information
      const updatedProfile = {
        ...profile,
        basicInfo: {
          ...profile.basicInfo,
          name: formData.name,
          age: parseInt(formData.age),
          location: formData.location,
          bio: formData.bio,
          occupation: formData.occupation
        }
      };
      
      await UserStateManager.saveUserProfile(updatedProfile);
      setProfile(updatedProfile);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save profile:', error);
    }
  };

  const getReadinessColor = (score: number) => {
    if (score >= 80) return "text-emerald-600";
    if (score >= 60) return "text-amber-600";
    return "text-red-500";
  };

  const getReadinessBackground = (score: number) => {
    if (score >= 80) return "bg-emerald-50 border-emerald-200";
    if (score >= 60) return "bg-amber-50 border-amber-200";
    return "bg-red-50 border-red-200";
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50 flex items-center justify-center px-3 sm:px-4">
        <div className="text-center">
          <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm sm:text-base">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50 pb-20 sm:pb-24">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-white/30 sticky top-0 z-30">
        <div className="max-w-sm mx-auto px-3 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/dashboard')}
              className="h-8 w-8 sm:h-10 sm:w-10 p-0 rounded-full hover:bg-gray-100 min-h-[44px] min-w-[44px] flex-shrink-0"
            >
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <div className="flex-1 min-w-0 text-center">
              <h1 className="text-lg sm:text-xl font-bold text-gray-800 truncate">Profile</h1>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              className="h-8 w-8 sm:h-10 sm:w-10 p-0 rounded-full hover:bg-gray-100 min-h-[44px] min-w-[44px] flex-shrink-0"
            >
              {isEditing ? <Save className="h-4 w-4 sm:h-5 sm:w-5" /> : <Edit3 className="h-4 w-4 sm:h-5 sm:w-5" />}
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full max-w-sm mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6 overflow-x-hidden">
        {/* Profile Photo & Basic Info */}
        <Card className="bg-white/80 backdrop-blur-sm border border-white/50 shadow-md">
          <CardContent className="p-4 sm:p-6">
            <div className="text-center space-y-3 sm:space-y-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center mx-auto">
                <User className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </div>
              
              {isEditing ? (
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-sm">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Your name"
                      className="mt-1 w-full min-h-[44px]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="age" className="text-sm">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData({...formData, age: e.target.value})}
                      placeholder="Your age"
                      className="mt-1 w-full min-h-[44px]"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800 break-words">
                    {formData.name || "Your Name"}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600">
                    {formData.age ? `${formData.age} years old` : "Age not set"}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Location & Bio */}
        <Card className="bg-white/80 backdrop-blur-sm border border-white/50 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-gray-800 text-base sm:text-lg">
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0" />
              <span>About Me</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4 pt-0">
            {isEditing ? (
              <>
                <div>
                  <Label htmlFor="location" className="text-sm">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="City, State"
                    className="mt-1 w-full min-h-[44px]"
                  />
                </div>
                <div>
                  <Label htmlFor="occupation" className="text-sm">Occupation</Label>
                  <Input
                    id="occupation"
                    value={formData.occupation}
                    onChange={(e) => setFormData({...formData, occupation: e.target.value})}
                    placeholder="Your job/career"
                    className="mt-1 w-full min-h-[44px]"
                  />
                </div>
                <div>
                  <Label htmlFor="bio" className="text-sm">Bio</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                    placeholder="Tell others about yourself..."
                    rows={4}
                    className="mt-1 resize-none w-full"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center text-gray-600 min-w-0">
                  <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
                  <span className="truncate text-sm sm:text-base">{formData.location || "Location not set"}</span>
                </div>
                <div className="flex items-center text-gray-600 min-w-0">
                  <Briefcase className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
                  <span className="truncate text-sm sm:text-base">{formData.occupation || "Occupation not set"}</span>
                </div>
                <p className="text-gray-700 text-sm sm:text-base break-words leading-relaxed">
                  {formData.bio || "No bio yet. Edit your profile to add one!"}
                </p>
              </>
            )}
          </CardContent>
        </Card>

        {/* Relationship Readiness */}
        {profile.readinessScore && (
          <Card className={`border shadow-md ${getReadinessBackground(profile.readinessScore.overall)}`}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-gray-800 text-base sm:text-lg">
                <Heart className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0" />
                <span>Relationship Readiness</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-center">
                <div className={`text-2xl sm:text-3xl font-bold ${getReadinessColor(profile.readinessScore.overall)}`}>
                  {profile.readinessScore.overall}%
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  {profile.readinessScore.isReady ? "Ready for a relationship!" : "Keep growing!"}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Save Button */}
        {isEditing && (
          <Button 
            onClick={handleSave}
            className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white min-h-[48px] text-sm sm:text-base"
          >
            Save Changes
          </Button>
        )}
      </div>

      <NavigationFooter />
    </div>
  );
};

export default Profile;
