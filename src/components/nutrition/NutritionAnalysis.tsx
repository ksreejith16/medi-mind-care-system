
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, PieChart } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RPieChart, Pie, Cell } from "recharts";
import { geneticVariants } from "@/data/foodData";

interface NutritionData {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface NutritionAnalysisProps {
  geneticProfile?: Record<string, string>;
}

const sampleData: NutritionData[] = [
  { name: "Mon", calories: 2100, protein: 150, carbs: 200, fat: 70 },
  { name: "Tue", calories: 2300, protein: 160, carbs: 220, fat: 75 },
  { name: "Wed", calories: 1900, protein: 140, carbs: 180, fat: 65 },
  { name: "Thu", calories: 2200, protein: 155, carbs: 210, fat: 72 },
  { name: "Fri", calories: 2000, protein: 145, carbs: 190, fat: 68 },
];

const NutritionAnalysis = ({ geneticProfile = {} }: NutritionAnalysisProps) => {
  const [activeVariants, setActiveVariants] = useState<Array<{name: string, description: string, value: number}>>([]);
  
  const hasGeneticData = Object.keys(geneticProfile).length > 0;
  
  useEffect(() => {
    // Process genetic profile data for visualization
    if (hasGeneticData) {
      const variants = Object.entries(geneticProfile)
        .filter(([gene, variant]) => variant === "Heterozygous" || variant === "Homozygous")
        .map(([gene, variant]) => ({
          name: gene,
          description: geneticVariants[gene as keyof typeof geneticVariants] || "Unknown variant",
          value: variant === "Homozygous" ? 2 : 1, // Higher value for homozygous
        }));
      setActiveVariants(variants);
    }
  }, [geneticProfile, hasGeneticData]);

  // Calculate daily averages
  const averageCalories = sampleData.reduce((sum, day) => sum + day.calories, 0) / sampleData.length;
  const averageProtein = sampleData.reduce((sum, day) => sum + day.protein, 0) / sampleData.length;
  const averageCarbs = sampleData.reduce((sum, day) => sum + day.carbs, 0) / sampleData.length;
  const averageFat = sampleData.reduce((sum, day) => sum + day.fat, 0) / sampleData.length;

  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
  
  // Prepare data for pie chart
  const pieData = [
    { name: 'Protein', value: averageProtein * 4 }, // 4 calories per gram of protein
    { name: 'Carbs', value: averageCarbs * 4 },     // 4 calories per gram of carbs
    { name: 'Fat', value: averageFat * 9 },         // 9 calories per gram of fat
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Nutrition Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {hasGeneticData ? (
            <div className="bg-secondary/20 p-4 rounded-lg mb-4">
              <h3 className="text-lg font-semibold mb-2">Genetic Profile Insights</h3>
              {activeVariants.length > 0 ? (
                <div className="space-y-3">
                  {activeVariants.map((variant, index) => (
                    <div key={index} className="border-l-4 border-primary pl-3">
                      <p className="font-medium">{variant.name}</p>
                      <p className="text-sm text-muted-foreground">{variant.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No significant genetic variants detected that impact nutrition.</p>
              )}
            </div>
          ) : null}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Calorie Tracking</h3>
              <div className="w-full overflow-x-auto">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={sampleData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="calories" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Macronutrient Distribution</h3>
              <div className="w-full overflow-x-auto">
                <ResponsiveContainer width="100%" height={300}>
                  <RPieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value} calories`} />
                  </RPieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="bg-secondary/10 p-4 rounded-lg">
              <h4 className="font-semibold text-lg mb-2">Calories</h4>
              <p className="text-2xl font-bold">{averageCalories.toFixed(0)}</p>
              <p className="text-sm text-muted-foreground">Daily Average</p>
            </div>
            <div className="bg-secondary/10 p-4 rounded-lg">
              <h4 className="font-semibold text-lg mb-2">Protein</h4>
              <p className="text-2xl font-bold">{averageProtein.toFixed(0)}g</p>
              <p className="text-sm text-muted-foreground">Daily Average</p>
            </div>
            <div className="bg-secondary/10 p-4 rounded-lg">
              <h4 className="font-semibold text-lg mb-2">Carbs</h4>
              <p className="text-2xl font-bold">{averageCarbs.toFixed(0)}g</p>
              <p className="text-sm text-muted-foreground">Daily Average</p>
            </div>
          </div>

          {hasGeneticData && activeVariants.length > 0 && (
            <div className="mt-4 border-t pt-4">
              <h3 className="text-lg font-semibold mb-2">Nutrigenomics Recommendations</h3>
              <ul className="space-y-2">
                {activeVariants.some(v => v.name === "MTHFR") && (
                  <li className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-green-500 flex-shrink-0 mt-1"></div>
                    <div>
                      <p className="font-medium">Increase folate-rich foods</p>
                      <p className="text-sm text-muted-foreground">Leafy greens, legumes, and fortified foods</p>
                    </div>
                  </li>
                )}
                {activeVariants.some(v => v.name === "APOE") && (
                  <li className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-blue-500 flex-shrink-0 mt-1"></div>
                    <div>
                      <p className="font-medium">Monitor saturated fat intake</p>
                      <p className="text-sm text-muted-foreground">Focus on unsaturated fats from plant sources</p>
                    </div>
                  </li>
                )}
                {activeVariants.some(v => v.name === "FTO") && (
                  <li className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-purple-500 flex-shrink-0 mt-1"></div>
                    <div>
                      <p className="font-medium">Higher protein diet may be beneficial</p>
                      <p className="text-sm text-muted-foreground">Help manage appetite and satiety</p>
                    </div>
                  </li>
                )}
                {activeVariants.some(v => v.name === "TCF7L2") && (
                  <li className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-amber-500 flex-shrink-0 mt-1"></div>
                    <div>
                      <p className="font-medium">Monitor carbohydrate intake</p>
                      <p className="text-sm text-muted-foreground">Focus on low-glycemic index foods</p>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NutritionAnalysis;
