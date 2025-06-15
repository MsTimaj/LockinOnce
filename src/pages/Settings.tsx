
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Bell, Shield, Eye, Volume2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    notifications: {
      pushNotifications: true,
      emailNotifications: false,
      matchNotifications: true,
      messageNotifications: true,
    },
    privacy: {
      profileVisibility: true,
      showOnlineStatus: false,
      allowMessagePreviews: true,
    },
    preferences: {
      soundEffects: true,
      vibration: true,
      darkMode: false,
    },
    account: {
      email: "user@example.com",
      phoneNumber: "",
    }
  });

  const handleBack = () => {
    navigate(-1);
  };

  const updateSetting = (category: string, setting: string, value: boolean | string) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-white/30 sticky top-0 z-30">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="h-10 w-10 p-0 rounded-full hover:bg-gray-100"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Settings</h1>
              <p className="text-sm text-gray-600">Manage your preferences</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-blue-500" />
              <span>Notifications</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="push-notifications">Push Notifications</Label>
              <Switch
                id="push-notifications"
                checked={settings.notifications.pushNotifications}
                onCheckedChange={(checked) => updateSetting('notifications', 'pushNotifications', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <Switch
                id="email-notifications"
                checked={settings.notifications.emailNotifications}
                onCheckedChange={(checked) => updateSetting('notifications', 'emailNotifications', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="match-notifications">New Match Alerts</Label>
              <Switch
                id="match-notifications"
                checked={settings.notifications.matchNotifications}
                onCheckedChange={(checked) => updateSetting('notifications', 'matchNotifications', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="message-notifications">Message Notifications</Label>
              <Switch
                id="message-notifications"
                checked={settings.notifications.messageNotifications}
                onCheckedChange={(checked) => updateSetting('notifications', 'messageNotifications', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-green-500" />
              <span>Privacy</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="profile-visibility">Profile Visible to Others</Label>
              <Switch
                id="profile-visibility"
                checked={settings.privacy.profileVisibility}
                onCheckedChange={(checked) => updateSetting('privacy', 'profileVisibility', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="online-status">Show Online Status</Label>
              <Switch
                id="online-status"
                checked={settings.privacy.showOnlineStatus}
                onCheckedChange={(checked) => updateSetting('privacy', 'showOnlineStatus', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="message-previews">Allow Message Previews</Label>
              <Switch
                id="message-previews"
                checked={settings.privacy.allowMessagePreviews}
                onCheckedChange={(checked) => updateSetting('privacy', 'allowMessagePreviews', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* App Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Volume2 className="h-5 w-5 text-purple-500" />
              <span>App Preferences</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="sound-effects">Sound Effects</Label>
              <Switch
                id="sound-effects"
                checked={settings.preferences.soundEffects}
                onCheckedChange={(checked) => updateSetting('preferences', 'soundEffects', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="vibration">Vibration</Label>
              <Switch
                id="vibration"
                checked={settings.preferences.vibration}
                onCheckedChange={(checked) => updateSetting('preferences', 'vibration', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode">Dark Mode</Label>
              <Switch
                id="dark-mode"
                checked={settings.preferences.darkMode}
                onCheckedChange={(checked) => updateSetting('preferences', 'darkMode', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Account */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Eye className="h-5 w-5 text-orange-500" />
              <span>Account</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={settings.account.email}
                onChange={(e) => updateSetting('account', 'email', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={settings.account.phoneNumber}
                onChange={(e) => updateSetting('account', 'phoneNumber', e.target.value)}
                placeholder="Optional"
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="space-y-3 pt-4">
          <Button variant="outline" className="w-full">
            Reset to Defaults
          </Button>
          <Button variant="destructive" className="w-full">
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
