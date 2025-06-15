
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";

interface FinancialValuesAssessmentProps {
  onComplete: (results: FinancialValuesResults) => void;
}

export interface FinancialValuesResults {
  spendingStyle: string;
  financialGoals: string;
  moneyManagement: string;
  financialSecurity: string;
  financialDecisions: string;
}

const FinancialValuesAssessment = ({ onComplete }: FinancialValuesAssessmentProps) => {
  const [spendingStyle, setSpendingStyle] = useState("");
  const [financialGoals, setFinancialGoals] = useState("");
  const [moneyManagement, setMoneyManagement] = useState("");
  const [financialSecurity, setFinancialSecurity] = useState("");
  const [financialDecisions, setFinancialDecisions] = useState("");

  const handleComplete = () => {
    const results: FinancialValuesResults = {
      spendingStyle,
      financialGoals,
      moneyManagement,
      financialSecurity,
      financialDecisions
    };
    console.log('Financial Values Results:', results);
    onComplete(results);
  };

  const isComplete = spendingStyle && financialGoals && moneyManagement && financialSecurity && financialDecisions;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-playfair font-bold text-foreground">
          Financial Values & Goals
        </h2>
        <div className="card-glass p-4">
          <p className="text-sm text-muted-foreground">
            <strong>Why this matters:</strong> Financial compatibility is crucial for long-term relationship success. Understanding your money management style and financial goals helps us match you with someone who shares similar financial values and approaches.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Spending Style */}
        <Card className="card-glass">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4 text-foreground">
              Your spending style:
            </h3>
            <RadioGroup value={spendingStyle} onValueChange={setSpendingStyle}>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="conservative" id="conservative" />
                <Label htmlFor="conservative" className="cursor-pointer flex-1">Conservative - Careful with money, prefer saving over spending</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="balanced" id="balanced" />
                <Label htmlFor="balanced" className="cursor-pointer flex-1">Balanced - Mix of saving and enjoying money responsibly</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="generous" id="generous" />
                <Label htmlFor="generous" className="cursor-pointer flex-1">Generous - Enjoy spending on experiences and others</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Financial Goals */}
        <Card className="card-glass">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4 text-foreground">
              Your primary financial goal:
            </h3>
            <RadioGroup value={financialGoals} onValueChange={setFinancialGoals}>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="security" id="security" />
                <Label htmlFor="security" className="cursor-pointer flex-1">Financial security and emergency fund</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="experiences" id="experiences" />
                <Label htmlFor="experiences" className="cursor-pointer flex-1">Funding experiences and adventures</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="investment" id="investment" />
                <Label htmlFor="investment" className="cursor-pointer flex-1">Long-term investment and wealth building</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="family" id="family" />
                <Label htmlFor="family" className="cursor-pointer flex-1">Saving for family and future together</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Money Management */}
        <Card className="card-glass">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4 text-foreground">
              Your approach to money management:
            </h3>
            <RadioGroup value={moneyManagement} onValueChange={setMoneyManagement}>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="detailed_budget" id="detailed-budget" />
                <Label htmlFor="detailed-budget" className="cursor-pointer flex-1">Detailed budgeting and tracking every expense</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="general_awareness" id="general-awareness" />
                <Label htmlFor="general-awareness" className="cursor-pointer flex-1">General awareness of spending with loose tracking</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="intuitive" id="intuitive" />
                <Label htmlFor="intuitive" className="cursor-pointer flex-1">Intuitive approach based on income and needs</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Financial Security */}
        <Card className="card-glass">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4 text-foreground">
              Financial security means to you:
            </h3>
            <RadioGroup value={financialSecurity} onValueChange={setFinancialSecurity}>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="basic_needs" id="basic-needs" />
                <Label htmlFor="basic-needs" className="cursor-pointer flex-1">Having basic needs covered comfortably</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="comfortable_lifestyle" id="comfortable-lifestyle" />
                <Label htmlFor="comfortable-lifestyle" className="cursor-pointer flex-1">Maintaining a comfortable lifestyle without worry</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="financial_freedom" id="financial-freedom" />
                <Label htmlFor="financial-freedom" className="cursor-pointer flex-1">Complete financial freedom and independence</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Financial Decisions */}
        <Card className="card-glass">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4 text-foreground">
              In a relationship, financial decisions should be:
            </h3>
            <RadioGroup value={financialDecisions} onValueChange={setFinancialDecisions}>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="joint" id="joint" />
                <Label htmlFor="joint" className="cursor-pointer flex-1">Made jointly with full transparency and agreement</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="collaborative" id="collaborative" />
                <Label htmlFor="collaborative" className="cursor-pointer flex-1">Collaborative for major decisions, individual for personal spending</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50">
                <RadioGroupItem value="independent" id="independent" />
                <Label htmlFor="independent" className="cursor-pointer flex-1">Largely independent with shared responsibilities</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      </div>

      <Button 
        onClick={handleComplete}
        disabled={!isComplete}
        className="btn-gradient w-full"
      >
        Continue
        <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
};

export default FinancialValuesAssessment;
