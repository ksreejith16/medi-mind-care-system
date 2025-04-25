
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
              <GeneticQuiz onSubmit={handleQuizSubmit} />
            </TabsContent>
            
            <TabsContent value="tracker" className="mt-6">
              <FoodTracker />
            </TabsContent>
            
            <TabsContent value="analysis" className="mt-6">
              <NutritionAnalysis />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default NutritionPage;
