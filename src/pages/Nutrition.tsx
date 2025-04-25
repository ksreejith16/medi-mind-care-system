
import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Apple, Settings, User, Activity } from "lucide-react";
import GeneticQuiz from "@/components/nutrition/GeneticQuiz";
import { foodDatabase, geneticVariants, type Food } from "@/data/foodData";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const NutritionPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [geneticProfile, setGeneticProfile] = useState<Record<string, string>>({});
  const [recommendations, setRecommendations] = useState<Food[]>([]);

  const handleQuizSubmit = (results: Record<string, string>) => {
    setGeneticProfile(results);
    generateRecommendations(results);
  };

  const generateRecommendations = (profile: Record<string, string>) => {
    // Simple recommendation logic based on genetic matches
    const recommendedFoods: Food[] = foodDatabase.foods.filter(food => {
      return food.geneticMatches.some(gene => profile[gene] === "Heterozygous" || profile[gene] === "Homozygous");
    });
    
    setRecommendations(recommendedFoods);
  };

  return (
    <Layout>
      <div className="page-container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Food Recommendation System</h1>
            <p className="mt-4 text-xl text-gray-500">
              Get personalized nutrition recommendations based on your health profile
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
              <TabsTrigger value="recommendations">
                <div className="flex items-center space-x-2">
                  <Apple className="h-4 w-4" />
                  <span>Recommendations</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="tracking">
                <div className="flex items-center space-x-2">
                  <Activity className="h-4 w-4" />
                  <span>Meal Tracking</span>
                </div>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="mt-6">
              <GeneticQuiz onSubmit={handleQuizSubmit} />
            </TabsContent>
            
            <TabsContent value="recommendations" className="mt-6">
              {recommendations.length > 0 ? (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Your Recommended Foods</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {recommendations.map((food) => (
                      <div key={food.name} className="p-4 rounded-lg border">
                        <h4 className="font-semibold">{food.name}</h4>
                        <p className="text-sm text-gray-600">Nutrients: {food.nutrients}</p>
                        <div className="mt-2 text-sm">
                          <p>Calories: {food.calories}</p>
                          <p>Protein: {food.protein}g</p>
                          <p>Carbs: {food.carbs}g</p>
                          <p>Fat: {food.fat}g</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Settings className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-4 text-gray-500">Complete the genetic quiz to get personalized recommendations</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="tracking" className="mt-6">
              <MealTracking />
            </TabsContent>
          </Tabs>
          
          <div className="mt-12 bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Integration Notes</h3>
            <p className="mt-2 text-gray-600">
              This is where you'll integrate your Streamlit application for nutrition recommendations. 
              The interface collects user profile data, provides food recommendations, and allows for meal tracking.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const UserProfileForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Health Profile</CardTitle>
        <CardDescription>Enter your details for personalized nutrition recommendations</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input id="age" type="number" placeholder="Enter your age" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select>
              <SelectTrigger id="gender">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="height">Height (cm)</Label>
            <Input id="height" type="number" placeholder="Enter your height" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input id="weight" type="number" placeholder="Enter your weight" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="activity">Activity Level</Label>
            <Select>
              <SelectTrigger id="activity">
                <SelectValue placeholder="Select activity level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sedentary">Sedentary</SelectItem>
                <SelectItem value="light">Lightly Active</SelectItem>
                <SelectItem value="moderate">Moderately Active</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="very-active">Very Active</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="goal">Health Goal</Label>
            <Select>
              <SelectTrigger id="goal">
                <SelectValue placeholder="Select your goal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weight-loss">Weight Loss</SelectItem>
                <SelectItem value="weight-gain">Weight Gain</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                <SelectItem value="heart-health">Heart Health</SelectItem>
                <SelectItem value="diabetes-management">Diabetes Management</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="allergies">Food Allergies or Restrictions</Label>
          <Input id="allergies" placeholder="E.g., gluten, nuts, dairy" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="conditions">Health Conditions</Label>
          <Input id="conditions" placeholder="E.g., diabetes, hypertension" />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Save Profile</Button>
      </CardFooter>
    </Card>
  );
};

const FoodRecommendations = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Personalized Food Recommendations</CardTitle>
          <CardDescription>Based on your health profile and nutritional needs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Settings className="mx-auto h-12 w-12 text-gray-400 animate-spin" />
            <p className="mt-4 text-gray-500">Please complete your health profile to get personalized recommendations</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">Refresh Recommendations</Button>
        </CardFooter>
      </Card>
      
      <Card className="bg-medical-50 border-medical-200">
        <CardHeader>
          <CardTitle className="text-medical-700">Did you know?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-medical-700">
            Proper nutrition can significantly impact your overall health and well-being. 
            Our AI-powered recommendation engine analyzes your health data to suggest foods 
            that can help you achieve your specific health goals.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

const MealTracking = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Meal Tracking & Analysis</CardTitle>
        <CardDescription>Monitor your nutritional intake and progress</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12">
          <Activity className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-4 text-gray-500">This feature will be available after you complete your profile and receive recommendations</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button disabled className="w-full">Start Tracking</Button>
      </CardFooter>
    </Card>
  );
};

export default NutritionPage;
