
import { useState, useEffect } from "react";
import { UserStateManager } from "@/utils/userStateManager";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, RefreshCw } from "lucide-react";

const SessionInfo = () => {
  const [sessionInfo, setSessionInfo] = useState<{ sessionId: string; hasProfile: boolean } | null>(null);

  useEffect(() => {
    const info = UserStateManager.getCurrentSessionInfo();
    setSessionInfo(info);
  }, []);

  const handleNewSession = () => {
    UserStateManager.resetForTesting();
    window.location.reload();
  };

  if (!sessionInfo) return null;

  const displayId = sessionInfo.sessionId.substring(0, 12) + '...';

  return (
    <Card className="mb-4 bg-blue-50 border-blue-200">
      <CardContent className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-blue-600" />
            <div className="text-sm">
              <span className="text-blue-800 font-medium">Session: {displayId}</span>
              <span className="text-blue-600 ml-2">
                {sessionInfo.hasProfile ? '✓ Profile Active' : '○ No Profile'}
              </span>
            </div>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={handleNewSession}
            className="text-blue-600 border-blue-300 hover:bg-blue-100"
          >
            <RefreshCw className="h-3 w-3 mr-1" />
            New Session
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SessionInfo;
