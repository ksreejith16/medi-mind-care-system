
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, PieChart } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

interface NutritionData {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

const sampleData: NutritionData[] = [
  { name: "Mon", calories: 2100, protein: 150, carbs: 200, fat: 70 },
  { name: "Tue", calories: 2300, protein: 160, carbs: 220, fat: 75 },
  { name: "Wed", calories: 1900, protein: 140, carbs: 180, fat: 65 },
  { name: "Thu", calories: 2200, protein: 155, carbs: 210, fat: 72 },
  { name: "Fri", calories: 2000, protein: 145, carbs: 190, fat: 68 },
];

const NutritionAnalysis = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Nutrition Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="w-full overflow-x-auto">
            <LineChart width={600} height={300} data={sampleData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="calories" stroke="#8884d8" />
              <Line type="monotone" dataKey="protein" stroke="#82ca9d" />
            </LineChart>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="bg-secondary/10 p-4 rounded-lg">
              <h4 className="font-semibold text-lg mb-2">Calories</h4>
              <p className="text-2xl font-bold">2,100</p>
              <p className="text-sm text-muted-foreground">Daily Average</p>
            </div>
            <div className="bg-secondary/10 p-4 rounded-lg">
              <h4 className="font-semibold text-lg mb-2">Protein</h4>
              <p className="text-2xl font-bold">150g</p>
              <p className="text-sm text-muted-foreground">Daily Average</p>
            </div>
            <div className="bg-secondary/10 p-4 rounded-lg">
              <h4 className="font-semibold text-lg mb-2">Carbs</h4>
              <p className="text-2xl font-bold">200g</p>
              <p className="text-sm text-muted-foreground">Daily Average</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NutritionAnalysis;
