
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

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
            <p className="text-sm font-medium">{question}</p>
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
