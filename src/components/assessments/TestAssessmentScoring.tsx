
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RelationshipReadinessScore } from "@/utils/assessment/types";
import { Play, CheckCircle, AlertCircle, AlertTriangle } from "lucide-react";

interface TestResults {
  secureResults: RelationshipReadinessScore;
  anxiousResults: RelationshipReadinessScore;
  avoidantResults: RelationshipReadinessScore;
  partialScore: RelationshipReadinessScore;
}

const TestAssessmentScoring = () => {
  const [testResults, setTestResults] = useState<TestResults | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const runTests = async () => {
    setIsRunning(true);
    try {
      // Test functionality has been removed
      console.log('Test data files have been deleted - no tests available');
      setTestResults(null);
    } catch (error) {
      console.error('Test failed:', error);
    } finally {
      setIsRunning(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 65) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getReadinessIcon = (isReady: boolean) => {
    return isReady ? <CheckCircle className="h-4 w-4 text-green-500" /> : <AlertCircle className="h-4 w-4 text-yellow-500" />;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            Assessment Scoring Test Suite
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <p className="text-sm text-yellow-800">
                Test data files have been removed. Testing functionality is currently unavailable.
              </p>
            </div>
            <p className="text-muted-foreground">
              This component was used to validate assessment scoring algorithms, but the test data has been deleted.
            </p>
            <Button 
              onClick={runTests} 
              disabled={true}
              variant="secondary"
              className="opacity-50 cursor-not-allowed"
            >
              Tests Unavailable
            </Button>
          </div>
        </CardContent>
      </Card>

      {testResults && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(testResults).map(([key, result]) => {
            const testName = key.replace('Results', '').replace(/([A-Z])/g, ' $1').trim();
            const capitalizedName = testName.charAt(0).toUpperCase() + testName.slice(1);
            
            return (
              <Card key={key}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-lg">
                    {capitalizedName}
                    {getReadinessIcon(result.isReady)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Overall Score:</span>
                    <Badge className={`${getScoreColor(result.overall)} text-white`}>
                      {result.overall}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Breakdown:</h4>
                    {Object.entries(result.breakdown).map(([category, score]) => (
                      <div key={category} className="flex items-center justify-between text-sm">
                        <span className="capitalize">{category.replace(/([A-Z])/g, ' $1').trim()}:</span>
                        <span className={`px-2 py-1 rounded text-xs ${getScoreColor(score as number)} text-white`}>
                          {score as number}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-2 border-t">
                    <div className="text-sm">
                      <span className="text-green-600 font-medium">Strengths: {result.strengths.length}</span>
                      <span className="mx-2">•</span>
                      <span className="text-yellow-600 font-medium">Growth Areas: {result.growthAreas.length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {testResults && (
        <Card>
          <CardHeader>
            <CardTitle>Test Validation Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Secure attachment scores highest: {testResults.secureResults.overall}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Anxious attachment has moderate score: {testResults.anxiousResults.overall}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Avoidant attachment appropriately scored: {testResults.avoidantResults.overall}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Partial data handling works: {testResults.partialScore.overall}</span>
              </div>
              <div className="pt-2 text-xs text-muted-foreground">
                Check browser console for detailed test output and validation results.
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TestAssessmentScoring;
