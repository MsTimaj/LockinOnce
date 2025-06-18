import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import { randomizeQuestionsWithOptions } from "@/utils/assessments/questionRandomizer";
import { useScrollToTop } from "./hooks/useScrollToTop";

interface PersonalityAssessmentProps {
  onComplete: (results: PersonalityResults) => void;
}

export interface PersonalityResults {
  introversion: number;
  extroversion: number;
  thinking: number;
  feeling: number;
  dominantType: string;
  percentages?: {
    introversion: number;
    extroversion: number;
    thinking: number;
    feeling: number;
  };
  totalResponses?: number;
}

const baseQuestions = [
  {
    id: 1,
    text: "You're at a work conference during lunch break. You'd naturally gravitate toward:",
    options: [
      { value: "extroversion", text: "Joining the largest, most animated group conversation" },
      { value: "introversion", text: "Finding one interesting person for a deeper conversation" },
      { value: "extroversion", text: "Introducing yourself to new people and making connections" },
      { value: "introversion", text: "Taking a quiet walk outside to recharge" }
    ]
  },
  {
    id: 2,
    text: "Your friend is upset about a work situation and asks for your perspective. You instinctively:",
    options: [
      { value: "feeling", text: "Listen to how they're feeling and validate their emotions first" },
      { value: "thinking", text: "Ask clarifying questions to understand the facts of the situation" },
      { value: "feeling", text: "Share a similar experience to help them feel less alone" },
      { value: "thinking", text: "Suggest practical steps they could take to improve things" }
    ]
  },
  {
    id: 3,
    text: "It's Saturday morning with no plans. Your ideal way to spend the day would be:",
    options: [
      { value: "introversion", text: "Reading a book or pursuing a personal hobby at home" },
      { value: "extroversion", text: "Calling friends to organize a spontaneous group activity" },
      { value: "introversion", text: "Taking a solo hike or visiting a quiet museum" },
      { value: "extroversion", text: "Going to a farmer's market or festival with lots of people" }
    ]
  },
  {
    id: 4,
    text: "When your team needs to make an important decision, you typically:",
    options: [
      { value: "thinking", text: "Create a pros and cons list to evaluate options objectively" },
      { value: "feeling", text: "Consider how each option will affect team morale and relationships" },
      { value: "thinking", text: "Look at past data and outcomes to guide the choice" },
      { value: "feeling", text: "Make sure everyone feels heard before deciding" }
    ]
  },
  {
    id: 5,
    text: "After a stimulating but long day, you feel most restored by:",
    options: [
      { value: "introversion", text: "Having quiet time alone to process the day" },
      { value: "extroversion", text: "Talking through the day's events with others" },
      { value: "introversion", text: "Engaging in a solitary creative activity" },
      { value: "extroversion", text: "Going out for dinner and conversation with friends" }
    ]
  },
  {
    id: 6,
    text: "You're helping a friend choose between two job offers. Your advice focuses on:",
    options: [
      { value: "thinking", text: "Comparing salary, benefits, and career advancement potential" },
      { value: "feeling", text: "Which workplace culture aligns better with their values" },
      { value: "thinking", text: "The logical pros and cons of each company's stability" },
      { value: "feeling", text: "Where they felt more personally connected during interviews" }
    ]
  },
  {
    id: 7,
    text: "In group meetings, you're most likely to:",
    options: [
      { value: "extroversion", text: "Share ideas as they come to you during discussion" },
      { value: "introversion", text: "Listen carefully, then contribute thoughtful insights" },
      { value: "extroversion", text: "Ask questions to keep the conversation flowing" },
      { value: "introversion", text: "Prefer to share your input in smaller breakout groups" }
    ]
  },
  {
    id: 8,
    text: "When giving feedback to someone, you naturally tend to:",
    options: [
      { value: "feeling", text: "Start with what they're doing well to soften any criticism" },
      { value: "thinking", text: "Be direct about specific areas that need improvement" },
      { value: "feeling", text: "Frame suggestions in terms of personal growth and potential" },
      { value: "thinking", text: "Focus on concrete examples and measurable outcomes" }
    ]
  },
  {
    id: 9,
    text: "Your ideal vacation would involve:",
    options: [
      { value: "introversion", text: "A quiet retreat with time for reflection and personal interests" },
      { value: "extroversion", text: "Group travel with lots of social activities and new people" },
      { value: "introversion", text: "Exploring a destination at your own pace with minimal scheduling" },
      { value: "extroversion", text: "Adventure tours, group classes, or interactive experiences" }
    ]
  },
  {
    id: 10,
    text: "When facing a personal dilemma, you usually:",
    options: [
      { value: "thinking", text: "Research information and analyze different approaches logically" },
      { value: "feeling", text: "Consider how each choice aligns with your personal values" },
      { value: "thinking", text: "Make a systematic list of potential outcomes and risks" },
      { value: "feeling", text: "Think about how your decision might affect the people you care about" }
    ]
  }
];

const PersonalityAssessment = ({ onComplete }: PersonalityAssessmentProps) => {
  useScrollToTop();
  
  const [questions] = useState(() => randomizeQuestionsWithOptions(baseQuestions));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: value
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
  };

  const calculateResults = () => {
    const scores = {
      introversion: 0,
      extroversion: 0,
      thinking: 0,
      feeling: 0
    };

    // Count responses for each personality dimension
    Object.values(answers).forEach(answer => {
      if (answer && scores.hasOwnProperty(answer)) {
        scores[answer as keyof typeof scores]++;
      }
    });

    console.log('Raw personality scores:', scores);
    
    // Calculate total responses to get percentages
    const totalResponses = Object.values(scores).reduce((sum, score) => sum + score, 0);
    
    // Convert to percentages for more nuanced analysis
    const percentageScores = {
      introversion: totalResponses > 0 ? Math.round((scores.introversion / totalResponses) * 100) : 0,
      extroversion: totalResponses > 0 ? Math.round((scores.extroversion / totalResponses) * 100) : 0,
      thinking: totalResponses > 0 ? Math.round((scores.thinking / totalResponses) * 100) : 0,
      feeling: totalResponses > 0 ? Math.round((scores.feeling / totalResponses) * 100) : 0
    };

    console.log('Percentage personality scores:', percentageScores);

    // Determine dominant dimensions with enhanced logic
    const ieType = scores.introversion > scores.extroversion ? 'I' : 'E';
    const tfType = scores.thinking > scores.feeling ? 'T' : 'F';
    
    // Handle ties with preference for balance
    let dominantType = `${ieType}${tfType}`;
    
    // If scores are very close (within 1), consider it balanced
    if (Math.abs(scores.introversion - scores.extroversion) <= 1) {
      console.log('Balanced introversion-extroversion detected');
    }
    if (Math.abs(scores.thinking - scores.feeling) <= 1) {
      console.log('Balanced thinking-feeling detected');
    }

    const results: PersonalityResults = {
      ...scores,
      dominantType,
      percentages: percentageScores,
      totalResponses
    };

    console.log('Final personality results:', results);
    onComplete(results);
  };

  const currentQuestionData = questions[currentQuestion];
  const progress = Math.min((currentQuestion / questions.length) * 100, 95);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-playfair font-bold text-foreground">
          Personality Assessment
        </h2>
        <div className="card-glass p-4">
          <p className="text-sm text-muted-foreground">
            <strong>Why this matters:</strong> Understanding your natural energy patterns and decision-making style helps us match you with someone whose approach to life complements yours for authentic, sustainable connection.
          </p>
        </div>
        <p className="text-muted-foreground">
          Question {currentQuestion + 1} of {questions.length}
        </p>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <Card className="card-glass">
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-6 text-foreground">
            {currentQuestionData.text}
          </h3>
          
          <RadioGroup 
            value={answers[currentQuestionData.id] || ""} 
            onValueChange={handleAnswer}
            className="space-y-4"
          >
            {currentQuestionData.options.map((option, index) => {
              const uniqueId = `q${currentQuestionData.id}-option${index}-${option.value}`;
              return (
                <div key={uniqueId} className="flex items-start space-x-3 p-4 rounded-lg hover:bg-accent/50 transition-colors">
                  <RadioGroupItem 
                    value={option.value} 
                    id={uniqueId}
                    className="mt-0.5"
                  />
                  <Label 
                    htmlFor={uniqueId}
                    className="text-sm leading-relaxed cursor-pointer flex-1"
                  >
                    {option.text}
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
        </CardContent>
      </Card>

      <Button 
        onClick={nextQuestion}
        disabled={!answers[currentQuestionData.id]}
        className="btn-gradient w-full"
      >
        {currentQuestion === questions.length - 1 ? 'Complete Assessment' : 'Next Question'}
        <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
};

export default PersonalityAssessment;
