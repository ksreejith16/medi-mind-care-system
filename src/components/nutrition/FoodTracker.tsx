
import React, { useState } from "react";
import { foodDatabase } from "@/data/foodData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Plus } from "lucide-react";

interface FoodLogEntry {
  date: string;
  food: string;
  mealType: string;
  servings: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

const FoodTracker = () => {
  const [foodLog, setFoodLog] = useState<FoodLogEntry[]>([]);
  const [selectedFood, setSelectedFood] = useState("");
  const [servings, setServings] = useState(1);
  const [mealType, setMealType] = useState("breakfast");

  const handleAddFood = () => {
    const foodItem = foodDatabase.foods.find(f => f.name === selectedFood);
    if (!foodItem) return;

    const newEntry: FoodLogEntry = {
      date: new Date().toISOString().split('T')[0],
      food: selectedFood,
      mealType,
      servings,
      calories: foodItem.calories * servings,
      protein: foodItem.protein * servings,
      carbs: foodItem.carbs * servings,
      fat: foodItem.fat * servings
    };

    setFoodLog([...foodLog, newEntry]);
    setSelectedFood("");
    setServings(1);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Food Tracker
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Select value={selectedFood} onValueChange={setSelectedFood}>
              <SelectTrigger>
                <SelectValue placeholder="Select food" />
              </SelectTrigger>
              <SelectContent>
                {foodDatabase.foods.map(food => (
                  <SelectItem key={food.name} value={food.name}>
                    {food.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={mealType} onValueChange={setMealType}>
              <SelectTrigger>
                <SelectValue placeholder="Select meal type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="breakfast">Breakfast</SelectItem>
                <SelectItem value="lunch">Lunch</SelectItem>
                <SelectItem value="dinner">Dinner</SelectItem>
                <SelectItem value="snack">Snack</SelectItem>
              </SelectContent>
            </Select>

            <Input
              type="number"
              min={0.25}
              max={5}
              step={0.25}
              value={servings}
              onChange={(e) => setServings(Number(e.target.value))}
              placeholder="Servings"
            />

            <Button onClick={handleAddFood} className="flex items-center gap-2">
              <Plus className="h-4 w-4" /> Add Food
            </Button>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Food Log</h3>
            <div className="space-y-2">
              {foodLog.map((entry, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-secondary/10 rounded-md">
                  <div>
                    <span className="font-medium">{entry.food}</span>
                    <span className="text-sm text-muted-foreground ml-2">
                      ({entry.servings} serving{entry.servings !== 1 ? 's' : ''})
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {entry.calories} kcal
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FoodTracker;
