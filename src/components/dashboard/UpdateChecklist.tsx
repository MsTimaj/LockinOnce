
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, Star, Heart, MessageSquare, Camera, User, Target } from "lucide-react";

interface UpdateChecklistProps {
  onClose: () => void;
}

const UpdateChecklist = ({ onClose }: UpdateChecklistProps) => {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const checklistItems = [
    {
      id: "photos",
      icon: <Camera className="h-5 w-5" />,
      title: "Add 3+ Recent Photos",
      description: "Show your authentic self with varied, high-quality photos",
      priority: "high"
    },
    {
      id: "bio",
      icon: <User className="h-5 w-5" />,
      title: "Complete Your Bio",
      description: "Share your passions, values, and what you're looking for",
      priority: "high"
    },
    {
      id: "preferences",
      icon: <Target className="h-5 w-5" />,
      title: "Set Your Preferences",
      description: "Define age range, location, and relationship goals",
      priority: "medium"
    },
    {
      id: "interests",
      icon: <Heart className="h-5 w-5" />,
      title: "Add Interests & Hobbies",
      description: "Help us find compatible matches based on shared activities",
      priority: "medium"
    },
    {
      id: "prompts",
      icon: <MessageSquare className="h-5 w-5" />,
      title: "Answer Profile Prompts",
      description: "Give matches conversation starters and insights into your personality",
      priority: "low"
    },
    {
      id: "verification",
      icon: <Star className="h-5 w-5" />,
      title: "Verify Your Profile",
      description: "Build trust with a verified badge",
      priority: "low"
    }
  ];

  const toggleItem = (id: string) => {
    setCheckedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "border-l-red-500 bg-red-50/50";
      case "medium": return "border-l-amber-500 bg-amber-50/50";
      case "low": return "border-l-emerald-500 bg-emerald-50/50";
      default: return "border-l-gray-500 bg-gray-50/50";
    }
  };

  const completedCount = checkedItems.size;
  const totalCount = checklistItems.length;
  const progressPercentage = (completedCount / totalCount) * 100;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md max-h-[80vh] overflow-y-auto bg-white/95 backdrop-blur-xl border-0 shadow-2xl">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-gray-800">
              Profile Updates
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Progress</span>
              <span className="font-semibold">{completedCount}/{totalCount}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-rose-400 to-pink-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-3">
          {checklistItems.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-lg border-l-4 transition-all duration-200 cursor-pointer hover:shadow-md ${getPriorityColor(item.priority)} ${
                checkedItems.has(item.id) ? 'opacity-60' : ''
              }`}
              onClick={() => toggleItem(item.id)}
            >
              <div className="flex items-start space-x-3">
                <div className={`flex-shrink-0 mt-0.5 ${checkedItems.has(item.id) ? 'text-green-600' : 'text-gray-500'}`}>
                  {checkedItems.has(item.id) ? <Check className="h-5 w-5" /> : item.icon}
                </div>
                
                <div className="flex-1">
                  <h3 className={`font-semibold text-sm ${checkedItems.has(item.id) ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          <div className="pt-4 border-t">
            <Button
              className="w-full bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600"
              onClick={onClose}
            >
              Continue Matching
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateChecklist;
