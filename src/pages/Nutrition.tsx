
import { useState } from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Apple, User } from "lucide-react";
import GeneticQuiz from "@/components/nutrition/GeneticQuiz";
import FoodTracker from "@/components/nutrition/FoodTracker";
import NutritionAnalysis from "@/components/nutrition/NutritionAnalysis";
import { foodDatabase, type Food } from "@/data/foodData";

const NutritionPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [geneticProfile, setGeneticProfile] = useState<Record<string, string>>({});
  const [recommendations, setRecommendations] = useState<Food[]>([]);

  const handleQuizSubmit = (results: Record<string, string>) => {
    setGeneticProfile(results);
    generateRecommendations(results);
  };

  const generateRecommendations = (profile: Record<string, string>) => {
    const recommendedFoods = foodDatabase.foods.filter(food => {
      return food.geneticMatches.some(gene => profile[gene] === "Heterozygous" || profile[gene] === "Homozygous");
    });
    
    setRecommendations(recommendedFoods);
  };

  return (
    <Layout>
      <div className="page-container">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Nutrition Dashboard</h1>
            <p className="mt-4 text-xl text-gray-500">
              Track your nutrition, get personalized recommendations, and analyze your progress
            </p>
          </div>
          
          <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="tracker">
                <div className="flex items-center space-x-2">
                  <Apple className="h-4 w-4" />
                  <span>Food Tracker</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="analysis">
                <div className="flex items-center space-x-2">
                  <Activity className="h-4 w-4" />
                  <span>Analysis</span>
                </div>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="mt-6">
              <div className="space-y-6">
                {Object.keys(geneticProfile).length > 0 ? (
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h3 className="text-lg font-medium text-green-800">Genetic Profile Saved</h3>
                    <p className="text-green-700 mt-1">Your genetic information has been saved. Visit the Analysis tab to see personalized nutrition insights.</p>
                    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                      {Object.entries(geneticProfile).map(([gene, variant]) => (
                        variant !== "Unknown" && (
                          <div key={gene} className="bg-white p-2 rounded text-sm">
                            <span className="font-medium">{gene}:</span> {variant}
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 italic">Complete the quiz below to generate your genetic profile...</p>
                )}
                <GeneticQuiz onSubmit={handleQuizSubmit} />
              </div>
            </TabsContent>
            
            <TabsContent value="tracker" className="mt-6">
              <FoodTracker />
            </TabsContent>
            
            <TabsContent value="analysis" className="mt-6">
              <NutritionAnalysis geneticProfile={geneticProfile} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default NutritionPage;
