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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50 pb-20">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/50 px-6 py-4">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/dashboard')}
            className="p-3 rounded-xl"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-playfair font-bold text-foreground">
            Profile
          </h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
            className="p-3 rounded-xl"
          >
            {isEditing ? <Save className="h-5 w-5" /> : <Edit3 className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 space-y-6">
        {/* Profile Photo & Basic Info */}
        <Card className="bg-white/80 backdrop-blur-sm border border-white/50 shadow-md">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center mx-auto">
                <User className="h-10 w-10 text-white" />
              </div>
              
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData({...formData, age: e.target.value})}
                      placeholder="Your age"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {formData.name || "Your Name"}
                  </h2>
                  <p className="text-gray-600">
                    {formData.age ? `${formData.age} years old` : "Age not set"}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Location & Bio */}
        <Card className="bg-white/80 backdrop-blur-sm border border-white/50 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-800">
              <MapPin className="h-5 w-5 mr-2" />
              About Me
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="City, State"
                  />
                </div>
                <div>
                  <Label htmlFor="occupation">Occupation</Label>
                  <Input
                    id="occupation"
                    value={formData.occupation}
                    onChange={(e) => setFormData({...formData, occupation: e.target.value})}
                    placeholder="Your job/career"
                  />
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                    placeholder="Tell others about yourself..."
                    rows={4}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{formData.location || "Location not set"}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Briefcase className="h-4 w-4 mr-2" />
                  <span>{formData.occupation || "Occupation not set"}</span>
                </div>
                <p className="text-gray-700 text-sm">
                  {formData.bio || "No bio yet. Edit your profile to add one!"}
                </p>
              </>
            )}
          </CardContent>
        </Card>

        {/* Relationship Readiness */}
        {profile.readinessScore && (
          <Card className={`border shadow-md ${getReadinessBackground(profile.readinessScore.overall)}`}>
            <CardHeader>
              <CardTitle className="flex items-center text-gray-800">
                <Heart className="h-5 w-5 mr-2" />
                Relationship Readiness
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className={`text-3xl font-bold ${getReadinessColor(profile.readinessScore.overall)}`}>
                  {profile.readinessScore.overall}%
                </div>
                <p className="text-sm text-gray-600 mt-1">
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
            className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white"
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
