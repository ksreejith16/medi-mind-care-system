
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface GeneticQuizProps {
  onSubmit: (results: Record<string, string>) => void;
}

const GeneticQuiz = ({ onSubmit }: GeneticQuizProps) => {
  const [responses, setResponses] = useState({
    folate: 3,
    fat: 3,
    hunger: 3,
    carb: 3,
    caffeine: 3,
    stress: 3,
    vitd: 3,
  });

  const questions = {
    folate: "I often feel fatigued even with adequate sleep",
    fat: "Fatty foods seem to affect me more than others",
    hunger: "I often feel hungry shortly after eating",
    carb: "I notice significant energy crashes after eating carbohydrates",
    caffeine: "Caffeine strongly affects my sleep, even when consumed early in the day",
    stress: "I tend to crave specific foods when stressed",
    vitd: "I have issues with bone density or vitamin D levels",
  };

  const tooltips = {
    folate: "Related to MTHFR gene and B vitamin metabolism",
    fat: "Related to APOE gene and fat metabolism",
    hunger: "Related to FTO gene and appetite regulation",
    carb: "Related to TCF7L2 gene and insulin response",
    caffeine: "Related to CYP1A2 gene and caffeine metabolism",
    stress: "Related to COMT gene and stress response",
    vitd: "Related to VDR gene and vitamin D absorption",
  };

  const handleSubmit = () => {
    // Simple estimation logic based on quiz responses
    const estimatedProfile: Record<string, string> = {};
    
    if (responses.folate >= 4) estimatedProfile.MTHFR = "Heterozygous";
    if (responses.fat >= 4) estimatedProfile.APOE = "Heterozygous";
    if (responses.hunger >= 4) estimatedProfile.FTO = "Heterozygous";
    if (responses.carb >= 4) estimatedProfile.TCF7L2 = "Heterozygous";
    if (responses.caffeine >= 4) estimatedProfile.CYP1A2 = "Homozygous";
    if (responses.stress >= 4) estimatedProfile.COMT = "Heterozygous";
    if (responses.vitd >= 4) estimatedProfile.VDR = "Heterozygous";
    
    onSubmit(estimatedProfile);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Genetic Assessment Quiz</CardTitle>
        <CardDescription>
          Rate how much each statement applies to you, from 1 (Not at all) to 5 (Very much)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {Object.entries(questions).map(([key, question]) => (
          <div key={key} className="space-y-2">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium">{question}</p>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full p-0">
                    <Info className="h-3 w-3" />
                    <span className="sr-only">Info</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{tooltips[key as keyof typeof tooltips]}</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Not at all</span>
              <Slider
                value={[responses[key as keyof typeof responses]]}
                min={1}
                max={5}
                step={1}
                onValueChange={(value) => 
                  setResponses(prev => ({ ...prev, [key]: value[0] }))
                }
                className="flex-1"
              />
              <span className="text-sm text-muted-foreground">Very much</span>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} className="w-full">
          Calculate Genetic Profile
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GeneticQuiz;
